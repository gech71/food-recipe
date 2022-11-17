<template>
  <div class="px-3 py-1.5 bg-slate-100"><h1>Catagories</h1></div>
  <div class="flex-grow">
    <select
      v-model="category_name"
      :onchange="handleChange"
      class="form-select appearance-none px-3 py-1.5 text-base font-normal text-gray-700 bg-slate-50 focus:outline-none transition ease-in-out delay-150 w-full"
    >
      <option value="All">All</option>
      <option
        v-for="category in categorys"
        :key="category"
        :value="category.name"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
  <div class="px-3 py-1.5 bg-slate-100"><h1>{{countedCategory.length}} {{countedCategory.length>1? 'Recipes':'Recipe'}}</h1></div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { categorys } from "../composables/data";
import { useQuery } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { computed, watchEffect } from "@vue/runtime-core";

const emits = defineEmits(["categoryName"]);
const category_name = ref("All");

const countComment = gql`
  query ($cat: String) {
    category_count(args: { category_name: $cat }) {
      id
    }
  }
`;
const { result: commentCount_result, variables: comment_count_var } =
  useQuery(countComment);

  const countedCategory = computed(()=>commentCount_result.value?.category_count??[]);
  
  
watchEffect(() => {
  comment_count_var.value = {
    cat: category_name.value,
  };
});

const handleChange = () => {
  emits("categoryName", category_name.value);
};
</script>
