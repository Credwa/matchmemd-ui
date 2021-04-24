<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bg-gray-50 right-0 bottom-0 py-4 px-4 m-4 shadow-md rounded-lg hidden sm:block"
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

    setTimeout(() => {
      close()
    }, 6000)

    const close = async () => {
      offlineReady.value = false
      needRefresh.value = false
    }
    return { updateServiceWorker, close, offlineReady, needRefresh }
  }
}
</script>
