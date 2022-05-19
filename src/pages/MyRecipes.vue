<template>
  <div class="w-full min-h-screen bg-slate-200 overflow-y-hidden">
    <div class="flex items-center px-3 pt-4">
      <h1 class="text-3xl text-gray-700 flex-1" data-aos="slide-right">
        My Recipes
      </h1>
      <CustomButton
        @click="goToCreatePage"
        btnName="Add New Recipe"
        data-aos="slide-left"
      />
    </div>

    <div
      v-if="loading"
      class="text-2xl w-full flex-1 items-center text-center justify-center mt-5"
    >
      <Loading class="mx-auto" />
      <p>Loading...</p>
    </div>
    <div v-else-if="my_recipes.length == 0">
      <div
        class="w-full text-center font-light mt-40 text-2xl text-gray-400 px-8"
      >
        There Is No Recipe Of Yours Go. and
        <span
          @click="goToCreatePage"
          class="hover:text-gray-600 hover:cursor-pointer"
          >Create One</span
        >
      </div>
    </div>
    <div
      v-else
      class="rounded-sm overflow-y-visible p-4 pt-6 grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-t-2xl drop-shadow-md"
    >
      <div
        v-for="item in my_recipes"
        :key="item.id"
        data-aos="slide-up"
        class=""
      >
        <div
          class="group relative hover:cursor-pointer transition-all duration-500 flex flex-col items-center rounded-md bg-slate-100 hover:drop-shadow-2xl"
        >
          <img
            @click="gotoDetailPage(item.id)"
            :src="item.image"
            alt=""
            class="object-cover h-36 w-full rounded-t-md"
          />
          <div
            class="flex items-center py-2 px-5 bg-gray-100 rounded-b-md w-full gap-4"
          >
            <h1 @click="gotoDetailPage(item.id)" class="flex-1 truncate">
              {{ item.title }}
            </h1>
            <CustomButton
              @click="handleDelete(item.id, item.title)"
              btn-name="Detele"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app_bar
</route>
<script setup>
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { computed, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { DELETE_MY_RECIPE } from "../composables/mutations";
import { GET_MY_RECIPES } from "../composables/queries";
const router = useRouter();

const store = useStore();

const { mutate: deleteRecipe } = useMutation(DELETE_MY_RECIPE);

const { result, variables, refetch, loading, fetchMore } =
  useQuery(GET_MY_RECIPES);

variables.value = { userid: store.state.user.id };

onMounted(() => {
  fetchMore({
    variables: {
      userid: store.state.user.id,
    },
  });
});

const my_recipes = computed(() => result.value?.get_my_recipes ?? []);

const handleDelete = (id, title) => {
  const warnMesg = confirm(
    `Are you Sure You Want To Delete "${title}" This Can't Be Undone!`
  );

  if (warnMesg) {
    deleteRecipe({
      recipeid: id,
    }).then((res) => {
      refetch();
    });
  }
};

const gotoDetailPage = (id) => {
  router.push(`/Details?id=${id}`);
};

const goToCreatePage = () => {
  router.push("/CreateRecipe");
};
</script>
<style></style>
