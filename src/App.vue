<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <ReloadPrompt />
  </div>
</template>

<script lang="ts">
import ReloadPrompt from '@/components/ReloadPrompt.vue'

export default {
  components: { ReloadPrompt }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
