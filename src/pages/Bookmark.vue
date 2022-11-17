<template>
  <div class="w-full min-h-screen bg-slate-200 overflow-x-hidden">
    <h1 data-aos="slide-right" class="w-full text-3xl text-gray-700 pt-6 pl-4">
      Saved Recipes
    </h1>
    <div
      v-if="loading"
      class="text-2xl w-full flex-1 items-center text-center justify-center mt-5"
    >
      <Loading class="mx-auto" />
      <p>Loading...</p>
    </div>
    <div v-else-if="bookmarks.length == 0">
      <div class="w-full text-center font-light mt-40 text-2xl text-gray-400">
        There Is No Saved Recipe
      </div>
      
    </div>
    <div
      v-else
      class="rounded-sm overflow-y-visible p-4 pt-6 grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-t-2xl drop-shadow-md"
    >
      <FavoriteBookmarkCard
        v-for="item in bookmarks"
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
import { useStore } from "vuex";
import { GET_BOOKMARKS } from "../composables/queries";

const store = useStore();

const { result, variables, loading, fetchMore } = useQuery(GET_BOOKMARKS);
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

const bookmarks = computed(() => result.value?.get_bookmarks_by_id ?? []);
</script>
<style></style>
