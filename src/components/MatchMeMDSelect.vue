<template>
  <div>
    <label :id="inputKey" class="matchmemd-input-label">
      {{ label }}
    </label>
    <div class="mt-1 relative">
      <button
        @click="toggleSelectState"
        @blur="toggleSelectState(false)"
        type="button"
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pacific-500 focus:border-pacific-500 sm:text-base"
        aria-haspopup="listbox"
        aria-expanded="true"
        :aria-labelledby="inputKey"
      >
        <span v-if="!isDefaultOptionSelected" class="text-pacific-900 sm:text-base">
          {{ selectedOption }}
        </span>
        <span class="text-gray-500 sm:text-base" v-else>{{ selectedOption }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <transition
        enter-active-class="transition ease-in duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-250"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          v-show="selectState"
          class="z-50 absolute mt-1 w-full bg-white shadow-lg sm:max-h-96 max-h-72 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-base"
          tabindex="-1"
          role="listbox"
          :aria-labelledby="inputKey"
          aria-activedescendant="listbox-option-3"
        >
          <li
            v-for="option in options"
            :key="option"
            @click="onOptionChange(option)"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-pacific-500"
            id="listbox-option-0"
            role="option"
          >
            <span :class="{ selectedState: 'font-semibold' }" class="font-normal block truncate">
              {{ option }}
            </span>

            <span
              v-show="option === selectedOption"
              class="text-pacific-500 absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <svg
                class="h-5 w-5"
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
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  props: {
    label: String,
    inputKey: String,
    defaultSelectedOption: String
  },
  setup(props, { emit }) {
    const options = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua & Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia & Herzegovina',
      'Botswana',
      'Brazil',
      'British Virgin Islands',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Cape Verde',
      'Cayman Islands',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      'Cote D Ivoire',
      'Croatia',
      'Cruise Ship',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'France',
      'French Polynesia',
      'French West Indies',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Isle of Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kuwait',
      'Kyrgyz Republic',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Namibia',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Pierre & Miquelon',
      'Samoa',
      'San Marino',
      'Satellite',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'South Africa',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'St Kitts & Nevis',
      'St Lucia',
      'St Vincent',
      'St. Lucia',
      'Sudan',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      "Timor L'Este",
      'Togo',
      'Tonga',
      'Trinidad & Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks & Caicos',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States of America',
      'Uruguay',
      'Uzbekistan',
      'Venezuela',
      'Vietnam',
      'Virgin Islands (US)',
      'Yemen',
      'Zambia',
      'Zimbabwe'
    ]
    const { t } = useI18n()
    const selectState = ref(false)
    const selectedOption = ref(props.defaultSelectedOption as string)

    const isDefaultOptionSelected = computed(() => !options.includes(selectedOption.value))

    function toggleSelectState(val?: boolean) {
      selectState.value = val !== undefined ? val : !selectState.value
    }

    function onOptionChange(option: string) {
      selectedOption.value = option
      toggleSelectState(false)
      emit('optionChanged', option)
    }

    return {
      selectState,
      toggleSelectState,
      selectedOption,
      options,
      isDefaultOptionSelected,
      onOptionChange
    }
  }
}
</script>

<style scoped>
/* START CUSTOM SCROLLBAR */
/* width */
::-webkit-scrollbar {
  width: 0.4rem;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #108c9f;
  border-radius: 1rem;
  height: 2rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #15555f;
}
/* END CUSTOM SCROLLBAR */
</style>
