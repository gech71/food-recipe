<template>
  <p
    v-if="msg"
    class="absolute opacity-70 px-2 py1 rounded-md bottom-[1px] right-0 left-0 mx-5 text-xs text-red-900 font-bold"
  >
    {{ msg }}
  </p>
</template>
<script setup>
defineProps({
  msg: String,
});
</script>
<style></style>
