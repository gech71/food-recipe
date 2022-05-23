<template>
  <div data-aos="slide-up" @click="gotoDetailPage" class="">
    <div
      class="group relative hover:cursor-pointer transition-all duration-500 flex flex-col items-center rounded-md bg-slate-100 hover:drop-shadow-2xl"
    >
      <img :src="image" alt="" class="object-cover h-36 w-full rounded-t-md" />
      <h1 class="pb-2 bg-gray-100 w-full text-center rounded-b-md truncate">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  image: String,
  recipeId: String,
});

const router = useRouter();
function gotoDetailPage() {
  router.push(`/Details?id=${props.recipeId}`);
}
</script>
