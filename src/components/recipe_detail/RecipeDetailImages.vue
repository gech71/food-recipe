<template>
  <div class="relative" data-aos="zoom-out">
    <img
      v-if="imgIndex > 0"
      @click="bBtn"
      ref="bArrow"
      src="/images/backward-disabled.png"
      alt=""
      class="absolute -left-0 top-[50%] hover:cursor-pointer"
    />

    <img
      v-for="(image, index) in images"
      :key="image"
      :src="images[index]"
      alt=""
      :class="index == imgIndex ? 'inline' : 'hidden'"
      class="md:w-full w-screen h-96 md:h-[20rem] object-cover mx-auto overflow-hidden"
    />
    <!-- <img
      :src="images[imgIndex]"
      alt=""
      class="md:w-full w-screen h-96 md:h-[20rem] object-cover mx-auto"
    /> -->
    <img
      v-if="imgIndex < images.length - 1"
      @click="fBtn"
      ref="fArrow"
      src="/images/forward-disabled.png"
      alt=""
      class="absolute -right-0 top-[50%] hover:cursor-pointer"
    />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const props = defineProps({
  images: Object,
});

const imgIndex = ref(0);

let images = ref([]);

watchEffect(() => {
  images.value = [...props.images];
});

const fBtn = () => {
  if (imgIndex.value < images.value.length - 1) {
    imgIndex.value += 1;
  }
};
const bBtn = () => {
  if (imgIndex.value > 0) {
    imgIndex.value -= 1;
  }
};
</script>
