<template>
  <div class="flex min-h-screen bg-slate-300 items-center">
    <div class="h-96 w-4/5 mx-auto flex flex-col items-center justify-center">
      <h1 class="text-3xl mb-12">
        !Opps... The Path '{{ errorMsg }}' Is Not Found
      </h1>
      <div>
        <custom-button @click="backToHome" btnName="Back To Home" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const errorMsg = ref("");

onMounted(() => {
  errorMsg.value = route.path;
});

function backToHome() {
  router.push("/");
}
</script>

<style></style>
