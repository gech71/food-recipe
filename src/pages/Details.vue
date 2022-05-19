<template>
  <div
    v-if="loading"
    class="text-2xl w-full flex-1 items-center text-center justify-center mt-5"
  >
    <Loading class="mx-auto" />
    <p>Loading...</p>
  </div>

  <div
    v-else-if="error"
    class="text-2xl w-full flex-1 items-center text-center justify-center"
  >
    {{ error }}
  </div>
  <div v-else class="flex bg-slate-200 min-h-screen flex-col p-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div class="flex flex-col gap-8">
        <RecipeDetailImages :images="images" />
        <RecipeDetailDesc
          :title="title"
          :createdby="createdby"
          :description="description"
          :duration="duration"
          :ingredientCount="ingredients.length"
          :stepsCount="directions.length"
          :data="response_desc_var"
          :refresh="refech_var"
        />
        <div
          class="grid grid-cols-1 gap-2 bg-slate-200 drop-shadow-md p-4 rounded-xl"
          data-aos="slide-up"
        >
          <RecipeDetailRating
            :data="response_rating_var"
            :refresh="refetch_rating"
            :comment_refresher="refetch_comment"
          />
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <RecipeDetailDirections
          :steps="directions"
          :ingredients="ingredients"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-4 rounded-xl w-5/6 mx-auto"
    ></div>
    <!--  -->
    <div class="grid grid-cols-1 gap-4 p-4" data-aos="slide-up">
      <RecipeDetailComments
        :data="all_reviews"
        :refresh="refetch_comment"
        :refresh_comment="refech_var"
      />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app_bar
</route>
<script setup>
import { GET_RECIPE_DETAIL } from "../composables/queries";
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted, ref, watchEffect } from "vue";
import { store } from "../store/store";
import { useRoute } from "vue-router";
import router from "../routes";
import {
  GET_RECIPE_VARS,
  RATING_VAR,
  GET_COMMENTS_AND_REVIEWS,
} from "../composables/queries";
import gql from "graphql-tag";
const route = useRoute();

const { result, error, variables, loading, refetch } =
  useQuery(GET_RECIPE_DETAIL);
variables.value = {
  recipeid: route.query.id,
};
const recipesResult = computed(() => result.value?.get_recipe_by_id ?? []);

const images = ref([]);
const title = ref("");
const createdby = ref("");
const description = ref("");
const duration = ref("");
const ingredients = ref([]);
const directions = ref([]);

let rProp = ref({});

watchEffect(() => {
  const resArray = [...recipesResult.value];

  if (resArray.length !== 0) {
    rProp.value = resArray[0];
    images.value.push(rProp.value.image);
    if (rProp.value.images.length !== 0)
      for (
        let index = 0;
        index < rProp.value.images[0].images.length;
        index++
      ) {
        images.value.push(rProp.value.images[0].images[index]);
      }
    title.value = rProp.value.title;
    createdby.value = rProp.value.createdby;
    description.value = rProp.value.description;
    duration.value = rProp.value.duration;
    directions.value = [...rProp.value.get_directions[0].steps];
    ingredients.value = [...rProp.value.get_ingredients[0].ingredients];
  }
});

const {
  result: result_var,
  variables: variable_var,
  refetch: refech_var,
} = useQuery(GET_RECIPE_VARS);
variable_var.value = {
  recipeid: route.query.id,
  userid: store.state.user?.id ?? null,
};

const response_desc_var = computed(
  () => result_var.value?.get_recipe_by_id ?? []
);

// Review Part  ////////////////////////

const {
  result: rating_res,
  variables: rating_vars,
  refetch: refetch_rating,
} = useQuery(RATING_VAR);

rating_vars.value = {
  recipeid: route.query.id,
  userid: store.state.user?.id ?? null,
};

const response_rating_var = computed(
  () => rating_res.value?.get_recipe_by_id ?? []
);

// Comment Part

const {
  result: comment_res,
  variables: comment_var,
  refetch: refetch_comment,
} = useQuery(GET_COMMENTS_AND_REVIEWS);
comment_var.value = {
  recipeid: route.query.id,
};
const all_reviews = computed(() => comment_res.value?.get_review ?? []);

onMounted(() => {
  if (route.query.id == null) {
    router.replace("/");
  }
});
</script>
<style></style>
<route lang="yaml">
meta: layout: app_bar
</route>
