<template>
  <LayoutDefault>
    <div class="w-screen px-3 mt-12">
      <header class="sm:mx-auto sm:w-full sm:max-w-md sm:mt-16">
        <router-link to="/login">
          <img
            height="40"
            width="210"
            class="mx-auto h-9 sm:h-10 sm:mb-12 w-auto"
            src="/logo.svg"
            alt="MatchMeMD"
        /></router-link>
        <h1
          v-if="!passwordResetSuccess"
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.forgotPasswordScreen.title') }}
        </h1>
        <h1
          v-if="passwordResetSuccess"
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.forgotPasswordScreen.resetSuccessTitle') }}
        </h1>
      </header>

      <main class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <div
            class="py-1 px-2 mb-8 rounded m-auto w-full bg-salmon-600 text-pacific-50"
            v-if="resetError"
          >
            <div class="flex items-center">
              <p class="leading-7 text-pacific-50 text-center">
                {{ $t('locale.forgotPasswordScreen.resetError.main') }}
              </p>
            </div>
          </div>
          <form v-if="!passwordResetSuccess" class="space-y-6" @submit="onSubmit">
            <div class="pb-1">
              <label v-show="false" for="email">{{
                $t('locale.forgotPasswordScreen.placeholderEmail')
              }}</label>
              <input
                name="email"
                type="email"
                id="email"
                :placeholder="$t('locale.forgotPasswordScreen.placeholderEmail')"
                autocomplete="email"
                v-model.trim="email"
                class="matchmemd-input w-full"
              />
            </div>

            <div>
              <div>
                <button
                  :disabled="isSubmitting || !resetEnabled"
                  type="submit"
                  class="matchmemd-button has-tooltip w-full"
                >
                  <img v-show="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-show="!loading">{{ $t('locale.forgotPasswordScreen.cta') }}</div>
                  <span v-if="!resetEnabled" class="tooltip p-2 mt-8">{{
                    $t('locale.forgotPasswordScreen.tooltip')
                  }}</span>
                </button>
              </div>
            </div>
          </form>
          <div v-else>
            <p class="text-center text-gray-700">
              {{ $t('locale.forgotPasswordScreen.successMessage') }}
            </p>
          </div>
          <div v-if="!passwordResetSuccess" class="flex justify-center flex-row sm:mt-8 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.forgotPasswordScreen.noAccount') }}
            </p>
            <router-link
              to="/register"
              class="matchmemd-text-link text-sm ml-1 font-medium py-3 sm:py-1"
            >
              {{ $t('locale.forgotPasswordScreen.goToRegister') }}
            </router-link>
          </div>

          <div v-else class="flex justify-center flex-row sm:mt-8 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.forgotPasswordScreen.accountExists') }}
            </p>
            <router-link to="/login" class="matchmemd-text-link text-sm ml-1 py-3 sm:py-1">
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
import { LoginKeys, LoginValues } from '../types/'
import { RESET_PASSWORD_REQUEST } from '../services/mixpanel-events'
import { auth } from '../services/firebase'
import { passwordResetRequest } from '../services/api'

export default {
  name: 'ForgotPassword',
  setup() {
    const { t } = useI18n()
    const resetError = ref(false)
    const passwordResetSuccess = ref(false)
    document.title = t('locale.forgotPasswordScreen.meta.title')
    // Define a validation schema
    const passwordResetSchema = {
      email(value: string) {
        if (!value) {
          return t('locale.forgotPasswordScreen.enterEmail')
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return t('locale.forgotPasswordScreen.enterValidEmail')
        }
        return true
      }
    }
    let loading = ref(false)
    const { handleSubmit, isSubmitting, errors } = useForm({
      validationSchema: passwordResetSchema
    })

    const { value: email, meta: emailMeta } = useField<string>('email', undefined, {
      initialValue: ''
    })

    const resetEnabled = computed(() => emailMeta.valid)

    const onSubmit = handleSubmit((values: Record<LoginKeys, LoginValues>) => {
      loading.value = true
      resetError.value = false
      const resetPassword = async () => {
        try {
          const res = await passwordResetRequest(values.email)
          loading.value = false
          passwordResetSuccess.value = true
          resetError.value = false
        } catch (err) {
          loading.value = false
          resetError.value = true
          passwordResetSuccess.value = false
        }
      }

      resetPassword().then(() => {
        mixpanel.track(RESET_PASSWORD_REQUEST)
      })
    })

    return {
      onSubmit,
      isSubmitting,
      errors,
      email,
      emailMeta,
      resetEnabled,
      loading,
      resetError,
      passwordResetSuccess
    }
  }
}
</script>
