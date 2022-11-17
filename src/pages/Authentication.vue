<template>
  <div
    data-aos="slide-down"
    class="grid grid-cols-1 md:grid-cols-2 min-h-screen py-16 shadow-2xl h-full bg-slate-200 px-10"
  >
    <div
      ref="formRef"
      class="bg-slate-50 transition-all duration-500 p-2 rounded-xl"
    >
      <Login v-if="firstCome" />
      <SignUp v-else />
    </div>
    <!-- <div class=""></div> -->
    
    <div
      ref="sideRef"
      class="md:bg-slate-300 bg-inherit h-full flex flex-col items-center justify-center transition-all duration-500 rounded-xl"
    >
      <div class="flex gap-3 md:flex-col mt-2 md:mt-0">
        <h1 class="text-lg font-bold text-black">
          {{
            firstCome ? "Don't Have An Account?" : "Already Have An Account?"
          }}
        </h1>
        <button
          @click="swapPos"
          class="hover:underline text-gray-700 md:px-5 md:py-1 md:bg-gray-100 md:hover:bg-gray-200 md:w-fit md:mx-auto md:rounded-md md:hover:no-underline transition-all duration-300"
        >
          {{ firstCome ? "Sign Up" : "Sign In" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
const firstCome = ref(true);
const formRef = ref(null);
const sideRef = ref(null);

function swapPos() {
  if (formRef.value.classList.contains("md:translate-x-[100%]")) {
    formRef.value.classList.remove("md:translate-x-[100%]");
    sideRef.value.classList.remove("md:-translate-x-[100%]");
  } else {
    formRef.value.classList.add("md:translate-x-[100%]");
    sideRef.value.classList.add("md:-translate-x-[100%]");
  }
  firstCome.value = !firstCome.value;
}
</script>
