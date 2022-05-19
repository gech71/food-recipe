<template>
  <div class="w-full min-h-screen bg-slate-200">
    <h1 class="w-full text-3xl text-gray-700 pt-6 pl-4" data-aos="slide-right">
      Favorite Recipes
    </h1>
    <div
      v-if="loading"
      class="text-2xl w-full flex-1 items-center text-center justify-center mt-5"
    >
      <Loading class="mx-auto" />
      <p>Loading...</p>
    </div>
    <div v-else-if="favorites.length == 0">
      <div class="w-full text-center font-light mt-40 text-2xl text-gray-400">
        No Favorite Recipes To Show
      </div>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] sm:w-[95%] mx-auto transition-all duration-300 py-5 drop-shadow-md"
    >
      <FavoriteBookmarkCard
        v-for="item in favorites"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :recipeId="item.id"
      />
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app_bar
</route>
<script setup>
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { gql } from "graphql-tag";
import { useStore } from "vuex";

const store = useStore();
const getFavorites = gql`
  query ($userId: uuid) {
    get_favorites_by_id(args: { user_id: $userId }) {
      title
      image
      id
    }
  }
`;

const { result, variables, loading, refetch, fetchMore } =
  useQuery(getFavorites);
variables.value = {
  userId: store.state.user.id,
};

onMounted(() => {
  fetchMore({
    variables: {
      userId: store.state.user.id,
    },
  });
});

const favorites = computed(() => result.value?.get_favorites_by_id ?? []);
</script>
<style></style>
