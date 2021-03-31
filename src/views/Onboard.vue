<template>
  <LayoutDefault>
    <div class="w-full">
      <header class="sm:absolute w-full flex justify-center space-between px-4 pt-6 sm:pt-2">
        <p
          to="/onboarding
        "
          class="overflow- text-xs leading-6 text-gray-600 py-2 sm:hidden"
        >
          {{ $t('locale.onboardScreen.firstPage') }}
        </p>
        <a
          class="hidden sm:block"
          href="https://matchmemd.com
        "
        >
          <img height="40" width="210" class="mx-auto h-6 w-auto" src="/logo.svg" alt="MatchMeMD"
        /></a>
        <img
          height="40"
          width="210"
          class="mx-auto h-9 sm:h-10 sm:mb-12 w-auto cursor-pointer sm:invisible"
          src="/matchmemd-icon.svg"
          alt="MatchMeMD"
        />
        <p class="py-2 matchmemd-text-link font-normal sm:text-xs" @click="skipOnboarding">
          {{ $t('locale.onboardScreen.skip') }}
        </p>
      </header>
      <div class="sm:grid sm:grid-rows-3 sm:grid-cols-12 sm:gap-4 sm:h-full">
        <section
          class="sm:col-span-4 pt-8 sm:pt-0 sm:px-4 space-y-4 flex flex-col justify-center items-center sm:items-start sm:justify-start sm:bg-gray-200 sm:h-screen"
        >
          <div class="sm:mt-56 space-y-4">
            <h1 class="text-2xl text-center sm:text-left leading-8 font-bold text-gray-700">
              <p class="text-lg leading-10 font-normal">
                {{ $t('locale.onboardScreen.welcome') }} {{ userProfile.firstName }}!
              </p>
              <p>
                {{ $t('locale.onboardScreen.completeProfile') }}
              </p>
            </h1>
            <p
              class="text-center sm:text-left sm:text-sm text-gray-600 text-lg leading-6 px-2 sm:px-0"
            >
              {{ $t('locale.onboardScreen.completeProfileDetailsOne') }}
            </p>
          </div>
        </section>

        <main class="sm:col-span-8 sm:row-span-3 mt-1 px-4 sm:mt-20">
          <div class="">
            <div class="w-full align-center flex justify-center py-6">
              <input
                class="hidden"
                type="file"
                id="profilePicture"
                name="profilePicture"
                @change="previewFiles"
                accept="image/*"
              />
              <label for="profilePicture">
                <div
                  class="flex sm:space-y-1.5 flex-col justify-center items-center cursor-pointer"
                  v-show="previewedPhoto.file"
                >
                  <div class="inline-block relative">
                    <img
                      ref="profilePictureRef"
                      class="h-16 w-16 rounded-full"
                      :src="previewedPhoto.dataURL"
                    />
                    <span class="absolute -top-2 right-0 block h-7 w-7 rounded-full">
                      <CameraSVG />
                    </span>
                  </div>

                  <p class="leading-6 text-gray-600 sm:text-gray-500 sm:text-xs">
                    {{ previewedPhoto?.file?.name || $t('locale.onboardScreen.addPhoto') }}
                  </p>
                </div>
                <div
                  class="flex sm:space-y-1.5 flex-col justify-center items-center cursor-pointer"
                  v-show="!previewedPhoto.file"
                >
                  <span class="inline-block relative">
                    <span
                      class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500"
                    >
                      <span class="text-xl font-medium leading-none text-pacific-50">{{
                        initials
                      }}</span>
                    </span>
                    <span
                      class="absolute -top-2 right-0 block h-7 w-7 sm:h-5 sm:w-5 sm:-top-1 rounded-full"
                    >
                      <CameraSVG />
                    </span>
                  </span>
                  <p class="leading-6 sm:text-xs text-gray-600 sm:text-gray-500">
                    {{ $t('locale.onboardScreen.addPhoto') }}
                  </p>
                </div>
              </label>
            </div>
            <form class="space-y- pt-2 max-w-xs m-auto" @submit="onSubmit">
              <div class="space-y-4 pt-2">
                <div class="space-y-3">
                  <MatchMeMDSelect
                    inputKey="location"
                    v-on:optionChanged="onLocationChange"
                    :defaultSelectedOption="$t('locale.onboardScreen.defaultSelectedCountryOption')"
                    :label="$t('locale.onboardScreen.inputLabels.location')"
                  />
                  <MatchMeMDDatePicker
                    v-on:dateChanged="onBirthdayChange"
                    :label="$t('locale.onboardScreen.inputLabels.birthday')"
                  />
                </div>
                <div>
                  <div role="group" aria-labelledby="label-notifications">
                    <div class="">
                      <div>
                        <div
                          class="block font-normal text-gray-600 sm:text-xs"
                          id="label-notifications"
                        >
                          {{ $t('locale.onboardScreen.inputLabels.gender.title') }}
                        </div>
                      </div>

                      <div>
                        <div class="max-w-lg">
                          <div class="mt-2 space-y-4">
                            <div class="flex items-center">
                              <input
                                id="gender_male"
                                name="gender"
                                v-model="gender"
                                value="male"
                                type="radio"
                                class="focus:ring-pacific-500 h-4 w-4 text-pacific-500 border-gray-300"
                              />
                              <label
                                for="gender_male"
                                class="ml-3 block text-sm font-medium leading-5 text-gray-600 sm:text-xs"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.gender.male') }}
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                v-model="gender"
                                id="gender_female"
                                name="gender"
                                value="female"
                                type="radio"
                                class="focus:ring-pacific-500 h-4 w-4 text-pacific-500 border-gray-300"
                              />
                              <label
                                for="gender_female"
                                class="ml-3 block text-sm font-medium leading-5 text-gray-600 sm:text-xs"
                              >
                                {{ $t('locale.onboardScreen.inputLabels.gender.female') }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-6">
                  <button
                    @click.prevent="nextPage"
                    class="matchmemd-button sm:text-xs has-tooltip w-full"
                  >
                    <div>{{ $t('locale.onboardScreen.next') }}</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CameraSVG from '@/components/CameraSVG.vue'
import MatchMeMDSelect from '@/components/MatchMeMDSelect.vue'
import MatchMeMDDatePicker from '@/components/MatchMeMDDatePicker.vue'
import {
  ONBOARDING_SKIP,
  ONBOARDING_BEGIN,
  ONBOARDING_NEXT,
  ONBOARDING_BACK,
  COUNTRY_SELECTED,
  BIRTHDAY_SELECTED
} from '../services/mixpanel-events'

export default {
  name: 'Onboard',
  components: { CameraSVG, MatchMeMDSelect, MatchMeMDDatePicker },
  setup() {
    mixpanel.track(ONBOARDING_BEGIN)
    const router = useRouter()
    const store = useStore()
    const profilePictureCanvasRef = ref()
    const isPageTwo = ref(false)
    const profilePictureRef = ref()
    const userProfile = store.getters.getUserProfile
    const previewedPhoto = ref({})
    const gender = ref()
    const initials = computed(
      () => userProfile.firstName[0].toUpperCase() + userProfile.lastName[0].toUpperCase()
    )

    function previewFiles(event) {
      const reader = new FileReader()
      const uploadedFile = event.target.files[0]
      reader.onload = () => {
        previewedPhoto.value = { dataURL: reader.result, file: uploadedFile }
      }
      if (uploadedFile) {
        reader.readAsDataURL(uploadedFile)
      }
    }

    function skipOnboarding() {
      mixpanel.track(ONBOARDING_SKIP)
      router.push('/dashboard')
    }

    function onLocationChange(e) {
      mixpanel.track(COUNTRY_SELECTED)
      console.log(e)
    }

    function onBirthdayChange(e) {
      console.log(e)
      mixpanel.track(BIRTHDAY_SELECTED)
    }

    function nextPage() {
      mixpanel.track(ONBOARDING_NEXT)
      isPageTwo.value = true
    }

    function back() {
      mixpanel.track(ONBOARDING_BACK)
      isPageTwo.value = false
    }

    return {
      skipOnboarding,
      initials,
      previewFiles,
      previewedPhoto,
      userProfile,
      profilePictureCanvasRef,
      profilePictureRef,
      onLocationChange,
      onBirthdayChange,
      nextPage,
      gender
    }
  }
}
</script>
