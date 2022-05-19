<template>
  <button
    class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-lg shadow mx-auto transition-all duration-500 active:bg-slate-200 text-sm"
  >
    {{ btnName }}
  </button>
</template>
<script setup>
defineProps({
  btnName: String,
});
</script>
<style></style>
