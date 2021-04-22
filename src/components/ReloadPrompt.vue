<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed right-0 bottom-0 py-4 px-4 m-4 shadow-md rounded-lg hidden sm:block"
    role="alert"
  >
    <div class="mb-4 text-pacific-900">
      <span class="text-base" v-if="offlineReady">
        {{ $t('locale.components.prompt.readyOffline') }}
      </span>
      <span class="text-base" v-else>
        {{ $t('locale.components.prompt.newContent') }}
      </span>
    </div>
    <div class="flex space-x-4">
      <button
        v-if="needRefresh"
        class="border-transparent rounded-md shadow-sm text-pacific-800 bg-pacific-100 hover:bg-pacific-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pacific-300 text-sm font-medium flex justify-center py-2 px-4"
        @click="updateServiceWorker()"
      >
        {{ $t('locale.components.prompt.reload') }}
      </button>
      <button
        class="border-transparent rounded-md shadow-sm text-salmon-800 bg-salmon-100 hover:bg-salmon-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-salmon-500 text-sm font-medium flex justify-center py-2 px-4"
        @click="close"
      >
        {{ $t('locale.components.prompt.close') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
    const close = async () => {
      offlineReady.value = false
      needRefresh.value = false
    }
    return { updateServiceWorker, close, offlineReady, needRefresh }
  }
}
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}
</style>
