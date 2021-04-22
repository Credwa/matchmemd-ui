<template>
  <LayoutDefault>
    <div class="mx-3 space-y-10">
      <div class="flex-col space-y-12 mt-6">
        <div class="space-y-6 sm:space-y-16">
          <router-link to="/">
            <img class="block h-auto w-auto m-auto" src="/logo.svg" alt="MatchMeMD"
          /></router-link>

          <img
            class="block h-auto w-80 sm:max-w-lg sm:w-auto m-auto"
            src="/404-medicine.svg"
            alt="Doctors medicine image"
          />
        </div>
      </div>
      <div class="text-center space-y-4">
        <h1 class="text-2xl sm:text-4xl text-pacific-900 font-medium">
          {{ $t('locale.notFoundScreen.pageNotFound') }}
        </h1>
        <p class="text-pacific-800 text-lg sm:text-xl">
          {{ $t('locale.notFoundScreen.pageNotFoundDetails') }}
          {{ $t('locale.notFoundScreen.pageNotFoundDetailsTwo') }} {{ location }}?
        </p>
      </div>

      <router-link to="/" class="matchmemd-button w-full max-w-xs m-auto">
        <div>{{ $t('locale.notFoundScreen.goBack') }}</div>
      </router-link>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Login',
  setup() {
    const location = ref(window.location.href)

    console.log(window.location.href)
    return {
      location
    }
  }
}
</script>
