<template>
  <LayoutDefault>
    <div class="w-screen px-3 mt-12">
      <header class="sm:mx-auto sm:w-full sm:max-w-md sm:mt-16">
        <a
          href="https://matchmemd.com
        "
        >
          <img
            height="40"
            width="210"
            class="mx-auto h-9 sm:h-10 sm:mb-12 w-auto"
            src="/logo.svg"
            alt="MatchMeMD"
        /></a>
        <h1
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.loginScreen.title') }}
        </h1>
      </header>

      <main class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <div
            class="py-1 px-2 mb-8 rounded m-auto w-full bg-salmon-600 text-pacific-50"
            v-if="loginError"
          >
            <div class="flex items-center">
              <p class="leading-7 text-pacific-50 text-center">
                {{ $t('locale.loginScreen.loginError.main') }}
                <router-link
                  class="matchmemd-text-link text-pacific-200 hover:text-pacific-100 font-normal"
                  to="/forgot-password"
                  >{{ $t('locale.loginScreen.loginError.resetPassword') }}</router-link
                >
              </p>
            </div>
          </div>
          <form class="space-y-6" @submit="onSubmit">
            <div class="pb-1">
              <label v-show="false" for="email">{{
                $t('locale.loginScreen.placeholderEmail')
              }}</label>
              <input
                name="email"
                type="email"
                id="email"
                :placeholder="$t('locale.loginScreen.placeholderEmail')"
                autocomplete="email"
                v-model.trim="email"
                class="matchmemd-input w-full"
              />
            </div>

            <div class="pb-2">
              <label v-show="false" for="password">{{
                $t('locale.loginScreen.placeholderPassword')
              }}</label>
              <input
                name="password"
                type="password"
                id="password"
                v-model.trim="password"
                :placeholder="$t('locale.loginScreen.placeholderPassword')"
                autocomplete="current-password"
                class="matchmemd-input w-full"
              />
            </div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  v-model="rememberMe"
                  class="matchmemd-checkbox"
                />
                <label for="remember_me" class="cursor-pointer ml-2 block text-sm text-gray-700">
                  {{ $t('locale.loginScreen.rememberMe') }}
                </label>
              </div>

              <div class="text-sm">
                <router-link
                  to="/forgot-password"
                  class="font-medium text-pacific-500 hover:text-pacific-600"
                >
                  {{ $t('locale.loginScreen.forgotPassword') }}
                </router-link>
              </div>
            </div>

            <div>
              <div>
                <button
                  :disabled="isSubmitting || !loginEnabled"
                  type="submit"
                  class="matchmemd-button has-tooltip w-full"
                >
                  <img v-show="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-show="!loading">{{ $t('locale.loginScreen.cta') }}</div>
                  <span v-if="!loginEnabled" class="tooltip p-2 mt-8">{{
                    $t('locale.loginScreen.tooltip')
                  }}</span>
                </button>
              </div>

              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-gray-100 sm:bg-white text-gray-500">
                      {{ $t('locale.loginScreen.continue') }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-2">
                  <div>
                    <button @click="loginWithGoogle" class="matchmemd-social-button focus:ring-0">
                      <span class="sr-only">{{ $t('locale.loginScreen.withGoogle') }}</span>
                      <img
                        height="20"
                        width="20"
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/google-logo.svg"
                        alt="Google login"
                      />
                    </button>
                  </div>

                  <div>
                    <button @click="loginWithFacebook" class="matchmemd-social-button focus:ring-0">
                      <span class="sr-only">{{ $t('locale.loginScreen.withFacebook') }}</span>
                      <img
                        height="20"
                        width="20"
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/facebook-logo.svg"
                        alt="Facebook login"
                      />
                    </button>
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
              class="matchmemd-text-link text-sm ml-1 font-medium py-3 sm:py-1"
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
import { useStore } from 'vuex'
import { LoginKeys, LoginValues } from '../types/'
import { Action } from '../store/actions'
import { LOGIN_FAILED } from '../services/mixpanel-events'
import { verifyEmailRequest } from '../services/api'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const { t } = useI18n()
    const loginError = ref(false)
    const rememberMe = ref(false)
    document.title = t('locale.loginScreen.meta.title')
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
    let loading = ref(false)
    const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: loginSchema })

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

    const storage_remembered_value = localStorage.getItem('remember_email')

    if (storage_remembered_value) {
      rememberMe.value = Boolean(storage_remembered_value)
      email.value = storage_remembered_value
    }

    const onSubmit = handleSubmit((values: Record<LoginKeys, LoginValues>) => {
      loading.value = true
      loginError.value = false
      store
        .dispatch(Action.LOGIN, values)
        .then(() => {
          loading.value = false
          if (rememberMe.value) {
            localStorage.setItem('remember_email', email.value)
          } else {
            localStorage.removeItem('remember_email')
          }
        })
        .catch((e) => {
          let failedResults: Record<string, unknown> = { ...values, reason: e.code }
          delete failedResults.password
          loginError.value = true
          mixpanel.track(LOGIN_FAILED, failedResults)
          loading.value = false
        })
    })

    const loginWithFacebook = () => {
      store
        .dispatch(Action.LOGIN_WITH_PROVIDER, 'facebook')
        .then((data) => {})
        .catch((e) => {
          console.log(e)
        })
    }

    const loginWithGoogle = () => {
      store
        .dispatch(Action.LOGIN_WITH_PROVIDER, 'google')
        .then((data) => {})
        .catch((e) => {
          console.log(e)
        })
    }

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
      loading,
      loginError,
      rememberMe,
      loginWithFacebook,
      loginWithGoogle
    }
  }
}
</script>
