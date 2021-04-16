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
          {{ $t('locale.emailActionsScreen.titles.reset') }}
        </h1>
        <h1
          v-if="passwordResetSuccess"
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.emailActionsScreen.resetSuccessTitle') }}
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
                {{ $t('locale.emailActionsScreen.resetCodeExpired') }}
                <router-link
                  class="matchmemd-text-link text-pacific-200 hover:text-pacific-100 font-normal"
                  to="/forgot-password"
                  >{{ $t('locale.emailActionsScreen.resendPasswordReset') }}</router-link
                >
                {{ $t('locale.registerScreen.emailInUse.or') }}
                <router-link
                  class="matchmemd-text-link text-pacific-200 hover:text-pacific-100 font-normal"
                  to="/login"
                  >{{ $t('locale.emailActionsScreen.login') }}</router-link
                >
              </p>
            </div>
          </div>
          <form v-if="!passwordResetSuccess" class="space-y-6" @submit="onSubmit">
            <div class="mb-2 relative rounded-md">
              <label v-show="false" for="password">{{
                $t('locale.emailActionsScreen.placeholderPassword')
              }}</label>
              <input
                name="password"
                type="password"
                id="password"
                v-model.trim="password"
                :placeholder="$t('locale.emailActionsScreen.placeholderPassword')"
                autocomplete="password"
                :class="{
                  'matchmemd-input-error': !(!passwordMeta.dirty || passwordMeta.valid),
                  'matchmemd-input-success': passwordMeta.valid
                }"
                class="matchmemd-input w-full"
              />
              <Tick :shown="passwordMeta.valid" />
              <span
                v-if="password.length > 0 && !passwordMeta.valid"
                class="matchmemd-text-error px-1"
                >{{ passwordError }}</span
              >
            </div>

            <div class="mb-2 relative rounded-md">
              <label v-show="false" for="confirm password">{{
                $t('locale.emailActionsScreen.placeholderPasswordConfirm')
              }}</label>
              <input
                name="confirm password"
                type="password"
                id="confirm-password"
                v-model.trim="confirmPassword"
                :placeholder="$t('locale.emailActionsScreen.placeholderPasswordConfirm')"
                :class="{
                  'matchmemd-input-error': !(confirmPassword === password),
                  'matchmemd-input-success':
                    confirmPassword === password && confirmPasswordMeta.dirty
                }"
                class="matchmemd-input w-full"
              />
              <Tick :shown="confirmPassword === password && confirmPasswordMeta.dirty" />
              <span
                v-if="confirmPassword !== password && confirmPasswordMeta.dirty"
                class="matchmemd-text-error px-1"
                >{{ $t('locale.emailActionsScreen.confirmPasswordError') }}</span
              >
            </div>

            <div>
              <div>
                <button
                  :disabled="isSubmitting || !resetEnabled"
                  type="submit"
                  class="matchmemd-button has-tooltip w-full"
                >
                  <img v-if="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-else>{{ $t('locale.emailActionsScreen.cta') }}</div>
                  <span v-if="!resetEnabled" class="tooltip p-2 mt-8">{{
                    $t('locale.emailActionsScreen.tooltip')
                  }}</span>
                </button>
              </div>
            </div>
          </form>
          <div v-else>
            <p class="text-center text-gray-700">
              {{ $t('locale.emailActionsScreen.successMessage') }}
            </p>
          </div>
          <div v-if="!passwordResetSuccess" class="flex justify-center flex-row sm:mt-8 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.emailActionsScreen.rememberedPassword') }}
            </p>
            <router-link
              to="/register"
              class="matchmemd-text-link text-sm ml-1 font-medium py-3 sm:py-1"
            >
              {{ $t('locale.emailActionsScreen.goToLogin') }}
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
import Tick from '@/components/Tick.vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { LoginKeys, LoginValues } from '../types'
import { RESET_PASSWORD_REQUEST } from '../services/mixpanel-events'
import { auth } from '../services/firebase'

export default {
  name: 'EmailActions',
  components: { Tick },
  setup() {
    const { t } = useI18n()
    const resetError = ref(false)
    const passwordResetSuccess = ref(false)
    const route = useRoute()
    const router = useRouter()
    const { mode, oobCode, contineuUrl } = route.query

    if (mode === 'resetPassword') {
      document.title = t('locale.emailActionsScreen.meta.titleReset')
    } else if (mode === 'verifyEmail') {
      document.title = t('locale.emailActionsScreen.meta.titleVerify')
    } else {
      router.replace('/login')
    }
    // Define a validation schema
    const passwordResetSchema = {
      password(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterPassword')
        }
        if (!/^.{8,24}$/i.test(value)) {
          return t('locale.registerScreen.enterValidPassword')
        } else if (!/^(?=\S*\d)\S{8,24}$/.test(value)) {
          return t('locale.registerScreen.enterValidPasswordNumber')
        } else if (!/^(?=\S*[a-z])\S{8,}$/.test(value)) {
          return t('locale.registerScreen.enterValidPasswordLowercase')
        } else if (!/^(?=\S*[A-Z])\S{8,}$/.test(value)) {
          return t('locale.registerScreen.enterValidPasswordUppercase')
        }
        return true
      },
      confirmPassword(value: string) {
        if (!value) {
          return t('locale.registerScreen.enterPassword')
        }
        return true
      }
    }

    let loading = ref(false)
    const { handleSubmit, isSubmitting, errors } = useForm({
      validationSchema: passwordResetSchema
    })

    const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>(
      'password',
      undefined,
      {
        initialValue: ''
      }
    )

    const {
      errorMessage: confirmPasswordError,
      value: confirmPassword,
      meta: confirmPasswordMeta
    } = useField<string>('confirmPassword', undefined, {
      initialValue: ''
    })

    const resetEnabled = computed(() => passwordMeta.valid)

    const onSubmit = handleSubmit((values: Record<LoginKeys, LoginValues>) => {
      loading.value = true
      const resetPassword = async () => {
        auth
          //@ts-ignore
          .verifyPasswordResetCode(oobCode)
          .then((email) => {
            const accountEmail = email
            const newPassword = password.value

            //@ts-ignore
            auth.confirmPasswordReset(oobCode, newPassword).then((resp) => {
              loading.value = false
              passwordResetSuccess.value = true
              setTimeout(() => {
                router.push('/login')
              }, 3000)
            })
          })
          .catch((error) => {
            loading.value = false
            resetError.value = true
            console.log(error)
            passwordResetSuccess.value = false
          })
      }

      resetPassword().then(() => {
        mixpanel.track(RESET_PASSWORD_REQUEST)
      })
    })

    return {
      onSubmit,
      isSubmitting,
      errors,
      password,
      passwordMeta,
      passwordError,
      confirmPassword,
      confirmPasswordMeta,
      confirmPasswordError,
      resetEnabled,
      loading,
      resetError,
      passwordResetSuccess,
      mode
    }
  }
}
</script>
