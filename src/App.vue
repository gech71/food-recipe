<template>
  <!-- <PageLoading v-if="store.state.pageLoading" /> -->
  <RouterView />
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";

import { store } from "./store/store";
import useRefresh from "./composables/useRefresh";
import { privateRoutes } from "./composables/data";
const refresh = useRefresh();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  setInterval(async () => {
    const result = await refresh();
    if (store.state.user !== result.user) {
      store.dispatch("SET_USER", result.user);
    }
    if (result.user === null) {
      if (privateRoutes.includes(route.path)) {
        router.push("/");
      }
    }
    // Reresh Access Token in 10 Mins
    store.dispatch("SET_ACCESS_TOKEN", result.accessToken);
  }, 600000);
});
</script>
