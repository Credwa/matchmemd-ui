<template>
  <nav aria-label="Progress">
    <ol class="overflow-hidden">
      <li class="relative pb-10">
        <div
          class="-ml-px absolute mt-0.5 top-4 left-2.5 w-0.5 h-full bg-pacific-600"
          aria-hidden="true"
        ></div>
        <!-- Complete Step -->
        <div class="relative flex items-start group cursor-default">
          <span class="h-9 flex items-center">
            <span
              class="relative z-10 w-5 h-5 flex items-center justify-center bg-pacific-600 rounded-full"
            >
              <!-- Heroicon name: solid/check -->
              <svg
                class="w-3 h-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </span>
          <span class="ml-4 mt-2 min-w-0 flex flex-col">
            <span class="text-xs leading-5 font-semibold tracking-wide">Account created</span>
          </span>
        </div>
      </li>

      <li class="relative pb-10">
        <div
          class="-ml-px absolute mt-0.5 top-4 left-2.5 w-0.5 h-full bg-gray-300"
          aria-hidden="true"
        ></div>
        <!-- Current Step -->
        <div
          :class="[!isPageTwo ? 'cursor-default' : 'cursor-pointer']"
          class="relative flex items-start group"
          aria-current="step"
        >
          <span class="h-9 flex items-center" aria-hidden="true">
            <span
              v-if="!isPageTwo"
              class="relative z-10 w-5 h-5 flex items-center justify-center bg-white border-2 border-pacific-600 rounded-full hover:border-pacific-700"
            >
              <span class="h-2 w-2 bg-pacific-600 rounded-full hover:bg-pacific-700"></span>
            </span>

            <span v-else class="h-9 flex items-center">
              <span
                class="relative z-10 w-5 h-5 flex items-center justify-center bg-pacific-600 rounded-full"
              >
                <!-- Heroicon name: solid/check -->
                <svg
                  class="w-3 h-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </span>

          <span class="ml-4 mt-2 min-w-0 flex flex-col">
            <span class="text-xs leading-5 font-semibold tracking-wide text-pacific-600"
              >About you</span
            >
          </span>
        </div>
      </li>

      <li class="relative pb-10">
        <!-- Upcoming Step -->
        <div
          :class="[isPageTwo ? 'cursor-default' : 'cursor-pointer']"
          class="relative flex items-start group"
          @click="isPageTwo = isPageTwo = true"
        >
          <span v-if="!isPageTwo" class="h-9 flex items-center" aria-hidden="true">
            <span
              class="relative z-10 w-5 h-5 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
            >
              <span class="h-2 w-2 bg-transparent rounded-full group-hover:bg-gray-300"></span>
            </span>
          </span>
          <span
            v-else
            class="relative z-10 mt-2 w-5 h-5 flex items-center justify-center bg-white border-2 border-pacific-600 rounded-full hover:border-pacific-700"
          >
            <span class="h-2 w-2 bg-pacific-600 rounded-full hover:bg-pacific-700"></span>
          </span>
          <span class="ml-4 mt-2 min-w-0 flex flex-col">
            <span class="text-xs leading-5 font-semibold tracking-wide text-gray-500"
              >Medical interests</span
            >
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default {
  props: {
    isPageTwo: Boolean
  }
}
</script>
