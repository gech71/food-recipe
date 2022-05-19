<template>
  <div class="relative min-h-screen bg-slate-200 flex flex-col">
    <div
      class="absolute h-[17rem] bg-[url(https://ibb.co/yNyxK8r)] bg-bottom bg-cover top-0 w-full"
    ></div>
    <div class="h-full flex flex-row relative">
      <div class="h-full flex-grow ease-in-out">
        <div class="flex flex-col">
          <h1
            class="text-center text-3xl font-bold text-white flex-grow pt-1 mt-14"
          >
            Discover Just-for-you Recipes
          </h1>

          <div
            class="flex items-center justify-center m-4 p-1 my-10 text-cyan-500"
          >
            <SearchRecipesInput
              @search-by="handleSearchBy"
              @search-value="handleSearchValue"
            />
          </div>

          <div
            class="mt-[4rem] w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto bg-white flex items-center border-[1px] border-gray-300 rounded-full overflow-hidden drop-shadow-sm"
          >
            <SelectCategory @category-name="handleCategoryName" />
          </div>

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
          <div v-else-if="recipesResult.length == 0">
            <div
              class="w-full text-center font-light mt-40 text-2xl text-gray-400"
            >
              No Recipes To Show
            </div>
          </div>
          <div
            v-else
            class="rounded-sm overflow-y-visible p-4 pt-6 grid gap-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 rounded-t-2xl drop-shadow-md"
          >
            <div v-for="(item, index) in recipesResult" :key="index">
              <FoodRecipesCard :foodProperty="item" />
            </div>
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
import { useRouter } from "vue-router";
import { GET_FILTERED_RECIPES } from "../composables/queries";
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted, ref, watchEffect } from "vue";

const { result, error, variables, loading, fetchMore } =
  useQuery(GET_FILTERED_RECIPES);
const recipesResult = computed(() => result.value?.get_filtered_recipes ?? []);

const searchBy = ref("");
const categoryName = ref("All");
const searchValue = ref("");

onMounted(() => {
  fetchMore({
    variables: {
      category_name: categoryName.value,
      search_by: searchBy.value,
      search_value: searchValue.value,
    },
  });
});

const handleSearchBy = (search_by) => (searchBy.value = search_by);
const handleCategoryName = (category_name) =>
  (categoryName.value = category_name);
const handleSearchValue = (search_value) => (searchValue.value = search_value);
watchEffect(() => {
  setVariables(categoryName.value, searchBy.value, searchValue.value);
});
function setVariables(_cat, _seBy, _seVa) {
  variables.value = {
    category_name: _cat,
    search_by: _seBy,
    search_value: _seVa,
  };
}

const router = useRouter();

const showDetailPage = () => {
  router.push("/details");
};
</script>
