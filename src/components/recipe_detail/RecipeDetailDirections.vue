<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="bg-slate-200 drop-shadow-md rounded-xl pb-4"
      data-aos="slide-up"
    >
      <h1 class="text-3xl font-semibold flex-1 text-slate-600 pt-3 mb-3 ml-5">
        Ingredients
      </h1>
      <div
        v-for="(ing, index) in ingredients"
        :key="index"
        class="'bg-slate-100 flex flex-col gap-1 mx-5 px-2 rounded-sm"
      >
        <div class="flex">
          <svg
            class="w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170 fill-red-600"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="NumbersIcon"
            tabindex="-1"
            title="Numbers"
          >
            <path
              d="m20.5 10 .5-2h-4l1-4h-2l-1 4h-4l1-4h-2L9 8H5l-.5 2h4l-1 4h-4L3 16h4l-1 4h2l1-4h4l-1 4h2l1-4h4l.5-2h-4l1-4h4zm-7 4h-4l1-4h4l-1 4z"
            ></path>
          </svg>
          <p
            class="font-semibold text-gray-700 flex flex-col w-full px-5 py-[0.1rem] rounded-md text-sm"
          >
            {{ ing }}
          </p>
        </div>
        <pre></pre>
      </div>
    </div>
    <div
      class="bg-slate-200 drop-shadow-md rounded-xl pb-4"
      data-aos="slide-up"
    >
      <h1 class="text-3xl font-semibold flex-1 text-slate-600 pt-3 mb-3 ml-5">
        Steps
      </h1>

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-slate-200 flex flex-col gap-[0.1rem] items-center mx-1 px-2 rounded-sm"
      >
        <div class="flex flex-col w-full px-5 py-[0.1rem] rounded-md">
          <p class="font-bold mr-3 text-green-400">Step {{ index + 1 }}</p>

          <p class="font-semibold text-gray-700 indent-2">
            {{ step }}
          </p>
        </div>
        <pre></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: Object,
  ingredients: Object,
});
</script>
