<template>
  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-4 w-4 text-pacific-500"
      stroke="currentColor"
      v-show="shown"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    shown: Boolean
  }
}
</script>

<style></style>
