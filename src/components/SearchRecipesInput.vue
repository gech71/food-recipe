<template>
  <div class="relative">
    <select
      v-model="searchby"
      class="form-select pl-3 pr-3 py-1.5 font-normal text-gray-500 text-sm mr-4 border-2 border-b-gray-300 focus:outline-none focus:border-gray-300 transition ease-in-out delay-150 bg-white"
    >
      <option value="title">Title</option>
      <option value="duration">Recipes Duration</option>
      <option value="ingredient">Ingredient</option>
    </select>
  </div>
  <div class="relative">
    <input
      v-model="search_value"
      class="peer border-2 border-b-gray-300 bg-white h-10 px-7 pr-16 text-sm text-black focus:outline-none focus:border-gray-300 transition ease-in-out delay-150 w-full pl-10"
      type="text"
      placeholder="Search Recipes"
    />
    <svg
      class="peer-focus:fill-black w-5 h-5 absolute top-[0.6rem] left-3 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170 fill-gray-400"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="SearchIcon"
      tabindex="-1"
      title="Search"
    >
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const emits = defineEmits(["searchBy", "searchValue"]);

const searchby = ref("title");
const search_value = ref("");
watchEffect(() => {
  emits("searchBy", searchby.value);
  emits("searchValue", search_value.value);
});
</script>
