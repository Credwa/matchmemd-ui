<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <nav class="bg-white shadow w-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/dashboard"
                ><img class="block lg:hidden h-8 w-auto" src="/matchmemd-icon.svg" alt="MatchMeMD"
              /></router-link>
              <router-link to="/dashboard">
                <img class="hidden lg:block h-8 w-auto" src="/logo.svg" alt="MatchMeMD"
              /></router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Current: "border-pacific-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <router-link
                to="/dashboard"
                class="border-pacific-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- Profile dropdown -->
            <div class="ml-3 relative" @click="toggleMenu">
              <div>
                <button
                  type="button"
                  class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pacific-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <span class="inline-block relative">
                    <span
                      v-if="!profilePhotoRef.file"
                      class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
                    >
                      <span class="text-base font-medium leading-none text-pacific-50">{{
                        initials
                      }}</span>
                    </span>
                    <img
                      v-else
                      ref="profilePictureRef"
                      class="h-8 w-8 rounded-full"
                      :src="profilePhotoRef.dataURL"
                    />
                  </span>
                </button>
              </div>

              <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-show="showMenu"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div
                    @click="logout"
                    class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button
              @click="toggleMenu"
              @blur="toggleMenu(false)"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pacific-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div class="sm:hidden" id="mobile-menu" v-show="showMenu">
          <div class="pt-2 pb-3 space-y-1">
            <!-- Current: "bg-pacific-50 border-pacific-500 text-pacific-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
            <router-link
              to="/dashboard"
              class="bg-pacific-50 border-pacific-500 text-pacific-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >Dashboard</router-link
            >
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <span class="inline-block relative">
                  <span
                    v-if="!profilePhotoRef.file"
                    class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500"
                  >
                    <span class="text-base font-medium leading-none text-pacific-50">{{
                      initials
                    }}</span>
                  </span>
                  <img
                    v-else
                    ref="profilePictureRef"
                    class="h-10 w-10 rounded-full"
                    :src="profilePhotoRef.dataURL"
                  />
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">
                  {{ userProfile.firstName + ' ' + userProfile.lastName }}
                </div>
                <div class="text-sm font-medium text-gray-500">{{ userProfile.email }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <div
                @click="logout"
                class="cursor-pointer block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <div class="w-full pt-24 text-center px-2 sm:mt-20">
      <div class="">
        <h1 class="text-2xl sm:text-4xl sm:leading-8 font-bold text-gray-600">Welcome Craig!</h1>

        <p class="text-lg sm:text-2xl sm:leading-8 text-gray-600 pt-6 sm:mt-4">
          We’re still wrapping things up for our website. We’ll send an email when things are ready
          for you :)
        </p>

        <p class="text-lg sm:text-2xl sm:leading-8 text-gray-600 pt-12 sm:pt-6">
          While you’re waiting you can check your inbox to
          <span class="text-pacific-500">verify your email</span> or
          <span
            @click="onReviewProfile"
            class="text-pacific-500 cursor-pointer hover:text-pacific-600"
            >click here review your profile</span
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { UserProfile } from '../types'
import { Action } from '../store'
import { useRouter } from 'vue-router'
import { DASHBOARD_REVIEW_PROFILE, LOGOUT } from '../services/mixpanel-events'
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t } = useI18n()
    document.title = 'Dashboard'
    const router = useRouter()
    const profilePhotoRef = ref({})
    const store = useStore<UserProfile>()
    const showMenu = ref(false)
    const userProfile: UserProfile = store.getters.getUserProfile
    const initials = computed<string>(
      () => userProfile.firstName[0].toUpperCase() + userProfile.lastName[0].toUpperCase()
    )

    // load profile picture
    store.dispatch(Action.DOWNLOAD_PROFILE_PICTURE).then((data: string | null) => {
      if (typeof data == 'string') {
        profilePhotoRef.value = { dataURL: data, file: { type: 'image' } }
      }
    })

    function logout() {
      store.dispatch(Action.LOGOUT).then(() => {
        mixpanel.track(LOGOUT)
      })
    }

    function toggleMenu(e: Event, val: boolean) {
      showMenu.value = val !== undefined ? val : !showMenu.value
    }

    function onReviewProfile() {
      store
        .dispatch(Action.UPDATE_USER_PROFILE, {
          registrationComplete: false
        })
        .then(() => {
          mixpanel.track(DASHBOARD_REVIEW_PROFILE)
          router.push('/onboarding')
        })
    }

    return { logout, showMenu, toggleMenu, userProfile, onReviewProfile, initials, profilePhotoRef }
  }
}
</script>
