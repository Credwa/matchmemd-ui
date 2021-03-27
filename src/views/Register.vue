<template>
  <LayoutDefault>
    <div class="w-screen px-3 mt-12 overflow-y-hidden">
      <header class="sm:mx-auto sm:w-full sm:max-w-md sm:mt-16">
        <img class="mx-auto h-9 sm:h-10 sm:mb-12 w-auto" src="/logo.svg" alt="MatchMeMD" />
        <h1
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.registerScreen.title') }}
        </h1>
      </header>

      <main class="mt-2 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit="onSubmit">
            <div class="pb-1 flex flex-col">
              <div class="pb-1 flex flex-row space-x-3">
                <div>
                  <label v-show="false" for="firstName">First name</label>
                  <input
                    name="firstName"
                    type="text"
                    id="firstName"
                    :placeholder="$t('locale.registerScreen.placeholderFirstName')"
                    autocomplete="firstName"
                    v-model="firstName"
                    :class="[
                      !firstNameMeta.dirty || firstNameMeta.valid
                        ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                        : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                    ]"
                    class="appearance-none block w-full px-3 py-2 border text-gray-700 bg-gray-50 sm:bg-white focus:border-pacific-500 border-gray-300 focus:ring-pacific-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label v-show="false" for="lastName">Last name</label>
                  <input
                    name="lastName"
                    type="text"
                    id="lastName"
                    :placeholder="$t('locale.registerScreen.placeholderLastName')"
                    autocomplete="lastName"
                    v-model="lastName"
                    :class="[
                      !lastNameMeta.dirty || lastNameMeta.valid
                        ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                        : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                    ]"
                    class="appearance-none block w-full px-3 border text-gray-700 bg-gray-50 focus:border-pacific-500 border-gray-300 focus:ring-pacific-500 sm:bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
              <div
                v-if="
                  (firstName.length > 0 || lastName.length > 0) &&
                  (!firstNameMeta.valid || !lastNameMeta.valid)
                "
              >
                <span
                  v-if="firstName.length > 0 && !firstNameMeta.valid"
                  class="text-coral-600 text-xs font-medium px-1"
                  >{{ firstNameError }}</span
                >
                <br
                  v-if="
                    !firstNameMeta.valid &&
                    !lastNameMeta.valid &&
                    firstName.length > 0 &&
                    lastName.length > 0
                  "
                />
                <span
                  v-if="lastName.length > 0 && !lastNameMeta.valid"
                  class="text-coral-600 text-xs font-medium px-1"
                  >{{ lastNameError }}</span
                >
              </div>
            </div>

            <div class="pb-1">
              <label v-show="false" for="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                :placeholder="$t('locale.registerScreen.placeholderEmail')"
                autocomplete="email"
                v-model="email"
                :class="[
                  !emailMeta.dirty || emailMeta.valid
                    ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                    : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                ]"
                class="appearance-none block w-full px-3 py-2 border text-gray-700 bg-gray-50 sm:bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />
              <span
                v-if="email.length > 0 && !emailMeta.valid"
                class="text-coral-600 text-xs font-medium px-1"
                >{{ emailError }}</span
              >
            </div>

            <div class="mb-2 relative rounded-md">
              <label v-show="false" for="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                v-model="password"
                :placeholder="$t('locale.registerScreen.placeholderPassword')"
                autocomplete="current-password"
                :class="[
                  !passwordMeta.dirty || passwordMeta.valid
                    ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                    : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                ]"
                class="appearance-none block w-full px-3 py-2 border bg-gray-50 text-gray-700 sm:bg-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pacific-500 focus:border-pacific-500"
              />
              <span
                v-if="password.length > 0 && !passwordMeta.valid"
                class="text-coral-600 text-xs font-medium px-1"
                >{{ passwordError }}</span
              >
            </div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center">
                <p class="text-sm leading-5 text-center font-sans">
                  {{ $t('locale.registerScreen.signUpAcceptance.main') }}
                  <router-link
                    to="/terms"
                    class="font-medium text-sm text-center text-pacific-500 hover:text-pacific-600"
                  >
                    {{ $t('locale.registerScreen.signUpAcceptance.terms') }}
                  </router-link>
                  {{ $t('locale.registerScreen.signUpAcceptance.and') }}
                  <router-link
                    to="/policy"
                    class="font-medium text-sm text-center text-pacific-500 hover:text-pacific-600"
                  >
                    {{ $t('locale.registerScreen.signUpAcceptance.policy') }}
                  </router-link>
                </p>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting || !registerEnabled"
                  class="has-tooltip w-full disabled:bg-gray-400 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-pacific-50 bg-pacific-500 hover:bg-pacific-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pacific-500"
                >
                  <img v-if="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-else>{{ $t('locale.registerScreen.cta') }}</div>
                  <span
                    v-if="!registerEnabled"
                    class="tooltip rounded shadow-md p-2 bg-white text-pacific-500 mt-8"
                    >{{ $t('locale.registerScreen.tooltip') }}</span
                  >
                </button>
              </div>

              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-pacific-50 sm:bg-white text-gray-500">
                      {{ $t('locale.registerScreen.continue') }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-2">
                  <div>
                    <a
                      href="#"
                      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:bg-white text-sm font-medium text-gray-500 sm:hover:bg-gray-50 hover:bg-gray-100"
                    >
                      <span class="sr-only">{{ $t('locale.registerScreen.withGoogle') }}</span>
                      <img
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/google-logo.svg"
                        alt="Google sign in"
                      />
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:bg-white text-sm font-medium text-gray-500 sm:hover:bg-gray-50 hover:bg-gray-100"
                    >
                      <span class="sr-only">{{ $t('locale.registerScreen.withFacebook') }}</span>
                      <img
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/facebook-logo.svg"
                        alt="Facebook sign in"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div class="flex justify-center flex-row sm:mt-12 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.registerScreen.noAccount') }}
            </p>
            <router-link
              to="/login"
              class="text-sm ml-1 py-3 font-medium text-pacific-500 sm:py-1 hover:text-pacific-600 cursor-pointer"
            >
              {{ $t('locale.registerScreen.goToLogin') }}
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Register',
  setup() {
    // Define a validation schema
    const registerSchema = {
      email(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterEmail')
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return t('locale.registerScreen.enterValidEmail')
        }
        return true
      },
      password(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterPassword')
        }
        if (!/^(?=.*[a-zA-Z]).{8,24}$/i.test(value)) {
          return t('locale.registerScreen.enterValidPassword')
        } else if (!/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)\S{8,}$/.test(value)) {
          return t('locale.registerScreen.enterValidComplexPassword')
        }
        return true
      },
      firstName(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterFirstName')
        }
        if (!/^([^0-9]+).{1,30}$/i.test(value)) {
          return t('locale.registerScreen.enterValidFirstName')
        }
        return true
      },
      lastName(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterLastName')
        }
        if (!/^([^0-9]+).{1,30}$/i.test(value)) {
          return t('locale.registerScreen.enterValidLastName')
        }
        return true
      }
    }
    const loading = ref(false)
    const { t } = useI18n()
    const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: registerSchema })
    const onSubmit = handleSubmit((values) => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        alert(JSON.stringify(values, null, 2))
      }, 2000)
    })

    const { errorMessage: emailError, value: email, meta: emailMeta } = useField<string>(
      'email',
      undefined,
      {
        initialValue: ''
      }
    )

    const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>(
      'password',
      undefined,
      {
        initialValue: ''
      }
    )

    const {
      errorMessage: firstNameError,
      value: firstName,
      meta: firstNameMeta
    } = useField<string>('firstName', undefined, {
      initialValue: ''
    })

    const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>(
      'lastName',
      undefined,
      {
        initialValue: ''
      }
    )

    const registerEnabled = computed(
      () => firstNameMeta.valid && lastNameMeta.valid && emailMeta.valid && passwordMeta.valid
    )

    return {
      onSubmit,
      isSubmitting,
      errors,
      email,
      emailError,
      emailMeta,
      password,
      passwordError,
      passwordMeta,
      firstName,
      firstNameError,
      firstNameMeta,
      lastName,
      lastNameError,
      lastNameMeta,
      registerEnabled,
      loading
    }
  }
}
</script>
