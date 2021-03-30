<template>
  <LayoutDefault>
    <div class="w-full">
      <header class="w-full flex justify-center space-between px-4 pt-6">
        <p
          to="/onboarding
        "
          class="text-xs leading-6 text-gray-600 py-2"
        >
          1 of 2
        </p>
        <img
          height="40"
          width="210"
          class="mx-auto h-9 sm:h-10 sm:mb-12 w-auto"
          src="/matchmemd-icon.svg"
          alt="MatchMeMD"
        />
        <p class="py-2 matchmemd-text-link font-normal" @click="skipOnboarding">
          {{ $t('locale.onboardScreen.skip') }}
        </p>
      </header>
      <div>
        <section class="py-8 space-y-4 flex flex-col justify-center items-center">
          <h1 class="text-2xl text-center leading-8 font-bold text-gray-700">
            {{ $t('locale.onboardScreen.completeProfile') }}
          </h1>
          <p class="text-center text-gray-600 text-lg leading-6">
            {{ $t('locale.onboardScreen.completeProfileDetailsOne') }}
          </p>
          <div class="w-full align-center flex justify-center pt-6">
            <input
              class="hidden"
              type="file"
              id="profilePicture"
              name="profilePicture"
              @change="previewFiles"
            />
            <label for="profilePicture">
              <div class="flex flex-col justify-center items-center" v-if="!previewedPhoto">
                <img :src="previewedPhoto.name" alt="profile picture" />
                <p class="leading-6 text-gray-600">
                  {{ previewedPhoto.name }}
                </p>
              </div>
              <div class="flex flex-col justify-center items-center" v-else>
                <span class="inline-block relative">
                  <span
                    class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500"
                  >
                    <span class="text-xl font-medium leading-none text-pacific-50">{{
                      initials
                    }}</span>
                  </span>
                  <span class="absolute -top-2 right-0 block h-7 w-7 rounded-full">
                    <svg
                      class="text-pacific-600"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="25"
                        height="25"
                        rx="12.5"
                        fill="currentColor"
                        stroke="currentColor"
                      />
                      <path
                        d="M8.05133 11.2564C8.05133 10.5483 8.62532 9.97435 9.33338 9.97435H9.9293C10.358 9.97435 10.7583 9.76011 10.996 9.40345L11.5169 8.62217C11.7547 8.2655 12.155 8.05127 12.5836 8.05127H15.0575C15.4862 8.05127 15.8865 8.2655 16.1242 8.62217L16.6451 9.40345C16.8829 9.76011 17.2832 9.97435 17.7118 9.97435H18.3077C19.0158 9.97435 19.5898 10.5483 19.5898 11.2564V17.0256C19.5898 17.7337 19.0158 18.3077 18.3077 18.3077H9.33338C8.62532 18.3077 8.05133 17.7337 8.05133 17.0256V11.2564Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.7436 13.8205C15.7436 14.8826 14.8826 15.7436 13.8206 15.7436C12.7585 15.7436 11.8975 14.8826 11.8975 13.8205C11.8975 12.7584 12.7585 11.8974 13.8206 11.8974C14.8826 11.8974 15.7436 12.7584 15.7436 13.8205Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </span>
                <p class="leading-6 text-gray-600">
                  {{ $t('locale.onboardScreen.addPhoto') }}
                </p>
              </div>
            </label>
          </div>
        </section>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Onboard',
  setup() {
    const router = useRouter()
    const store = useStore()
    const userProfile = store.getters.getUserProfile
    const previewedPhoto = ref({})
    const initials = computed(
      () => userProfile.firstName[0].toUpperCase() + userProfile.lastName[0].toUpperCase()
    )

    function previewFiles(event) {
      console.log(event.target.files)
      previewedPhoto.value = event.target.files[0]
    }

    function skipOnboarding() {
      console.log(router)
      router.push('/dashboard')
    }

    return { skipOnboarding, initials, previewFiles, previewedPhoto }
  }
}
</script>
