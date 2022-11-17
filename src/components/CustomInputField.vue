<template>
  <input
    accept="image/*"
    multiple="true"
    ref="inputRef"
    :type="type"
    class="px-3 py-2 w-full border-[1px] rounded-xl mb-4 outline-none border-gray-400 focus:border-gray-600 bg-slate-50 file:bg-inherit file:border-none file:text-gray-400 transition-all duration-300"
    :placeholder="placeholder"
    v-model="value"
    :name="name"
    :id="name == 'r_images' ? 'multi-file-input' : name"
    min="1"
  />

  <ErrorIndicator class="z-10" :msg="errorMessage" />
</template>

<script setup>
import { onUpdated, ref } from "@vue/runtime-core";
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  placeholder: String,
  type: String,
});

const { value, errorMessage } = useField(props.name);

const inputRef = ref(null);

onUpdated(() => {
  if (
    errorMessage.value &&
    !inputRef.value.classList.contains("border-red-600")
  ) {
    inputRef.value.classList.add("border-red-600");
    inputRef.value.classList.remove("focus:border-gray-400");
  } else if (!errorMessage.value) {
    inputRef.value.classList.remove("border-red-600");
    inputRef.value.classList.add("focus:border-gray-400");
  }
});
</script>
