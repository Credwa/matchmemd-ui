<template>
  <div>
    <label :id="inputKey" class="block font-normal text-gray-700 sm:text-xs"> {{ label }} </label>
    <div class="mt-1 relative">
      <button
        @click="toggleDatePickerState"
        @blur="toggleDatePickerState(false)"
        type="button"
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pacific-500 focus:border-pacific-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        :aria-labelledby="inputKey"
      >
        <span>
          <div class="text-gray-500 block truncate sm:text-xs" v-if="!isDateSelected">
            {{ $t('locale.onboardScreen.defaultSelectedBirthday') }}
          </div>
          <div class="text-gray-700 block truncate sm:text-xs" v-else>{{ date }}</div>
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
        </span>
      </button>
      <transition
        enter-active-class="transition ease-in duration-100"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <v-date-picker
          :max-date="new Date()"
          :min-date="new Date(new Date().getFullYear() - 90, 1, 1)"
          :is-required="true"
          class="z-50 absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm right-0 top-10"
          v-show="datePickerState"
          :model-config="modelConfig"
          v-model="date"
          color="teal"
          @dayclick="onDateChange"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  props: {
    label: String,
    inputKey: String
  },
  setup(_, { emit }) {
    const { t } = useI18n()
    const firstDateValueAlreadyChanged = ref(false)
    const datePickerState = ref(false)
    const selectedOption = ref(t('locale.onboardScreen.defaultSelectedOption'))
    const date = ref(new Date(1995, 0, 1))
    const isDateSelected = ref(false)
    const inputValue = ref()
    const modelConfig = ref({
      type: 'string',
      mask: 'MM/DD/YYYY' // Uses 'iso' if missing
    })

    function toggleDatePickerState(val?: boolean) {
      datePickerState.value = val !== undefined ? val : !datePickerState.value
    }

    function onDateChange(e: any) {
      // fix v-cal issue when deselecting first date
      if (
        e.year === 1995 &&
        e.week === 1 &&
        e.month === 1 &&
        e.day === 1 &&
        firstDateValueAlreadyChanged
      ) {
        date.value = e.date.toLocaleDateString(_, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      } else {
        firstDateValueAlreadyChanged.value = true
      }
      isDateSelected.value = true
      toggleDatePickerState(false)
      emit('dateChanged', date)
    }

    return {
      datePickerState,
      toggleDatePickerState,
      selectedOption,
      date,
      modelConfig,
      isDateSelected,
      inputValue,
      onDateChange
    }
  }
}
</script>
