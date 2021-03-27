<template>
  <LayoutDefault>
    <div class="w-screen px-3 mt-12">
      <header class="sm:mx-auto sm:w-full sm:max-w-md sm:mt-16">
        <img class="mx-auto h-9 sm:h-10 w-auto sm:mb-12" src="/logo.svg" alt="MatchMeMD" />
        <h1
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.loginScreen.title') }}
        </h1>
      </header>

      <main class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit="onSubmit">
            <div class="pb-1">
              <label v-show="false" for="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                :placeholder="$t('locale.loginScreen.placeholderEmail')"
                autocomplete="email"
                v-model="email"
                class="appearance-none block w-full px-3 py-2 border text-gray-700 bg-gray-50 sm:bg-white rounded-md shadow-sm focus:border-pacific-500 border-gray-300 focus:ring-pacific-500 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div class="pb-2">
              <label v-show="false" for="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                v-model="password"
                :placeholder="$t('locale.loginScreen.placeholderPassword')"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border bg-gray-50 text-gray-700 sm:bg-white border-gray-300 'focus:border-pacific-500 focus:ring-pacific-500' rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pacific-500 focus:border-pacific-500"
              />
            </div>

            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  class="h-4 w-4 text-pacific-500 focus:ring-pacific-500 border-gray-300 rounded"
                />
                <label for="remember_me" class="ml-2 block text-sm text-gray-700">
                  {{ $t('locale.loginScreen.rememberMe') }}
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-pacific-500 hover:text-pacific-600">
                  {{ $t('locale.loginScreen.forgotPassword') }}
                </a>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting || !loginEnabled"
                  class="has-tooltip w-full disabled:bg-gray-400 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-pacific-50 bg-pacific-500 hover:bg-pacific-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pacific-500"
                >
                  <img v-if="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-else>{{ $t('locale.loginScreen.cta') }}</div>
                  <span
                    v-if="!loginEnabled"
                    class="tooltip rounded shadow-md p-2 bg-white text-pacific-500 mt-8"
                    >{{ $t('locale.loginScreen.tooltip') }}</span
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
                      {{ $t('locale.loginScreen.continue') }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-2">
                  <div>
                    <a
                      href="#"
                      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:bg-white text-sm font-medium text-gray-500 sm:hover:bg-gray-50 hover:bg-gray-100"
                    >
                      <span class="sr-only">{{ $t('locale.loginScreen.withGoogle') }}</span>
                      <img
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/google-logo.svg"
                        alt="Google login"
                      />
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:bg-white text-sm font-medium text-gray-500 sm:hover:bg-gray-50 hover:bg-gray-100"
                    >
                      <span class="sr-only">{{ $t('locale.loginScreen.withFacebook') }}</span>
                      <img
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/facebook-logo.svg"
                        alt="Facebook login"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="flex justify-center flex-row sm:mt-12 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.loginScreen.noAccount') }}
            </p>
            <router-link
              to="/register"
              class="text-sm ml-1 font-medium py-3 text-pacific-500 sm:py-1 hover:text-pacific-600 cursor-pointer"
            >
              {{ $t('locale.loginScreen.goToRegister') }}
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
  name: 'Login',
  setup() {
    // Define a validation schema
    const loginSchema = {
      email(value: string) {
        if (!value) {
          return t('locale.loginScreen.enterEmail')
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return t('locale.loginScreen.enterValidEmail')
        }
        return true
      },
      password(value: string) {
        if (!value) {
          return t('locale.loginScreen.enterPassword')
        }
        if (!/^(?=.*[a-zA-Z]).{1,24}$/i.test(value)) {
          return t('locale.loginScreen.enterValidPassword')
        }
        return true
      }
    }
    const { t } = useI18n()
    let loading = ref(false)
    const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: loginSchema })
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

    const loginEnabled = computed(() => emailMeta.valid && passwordMeta.valid)

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
      loginEnabled,
      loading
    }
  }
}
</script>
