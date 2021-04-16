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
          {{ $t('locale.registerScreen.title') }}
        </h1>
      </header>

      <main class="mt-2 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <div
            class="py-1 px-2 mb-8 rounded m-auto w-full bg-salmon-600 text-pacific-50"
            v-if="registerError"
          >
            <div
              class="flex items-center"
              v-if="registerErrorObject.code === 'auth/email-already-in-use'"
            >
              <p class="leading-7 text-pacific-50 text-center">
                {{ $t('locale.registerScreen.emailInUse.main') }}
                <router-link
                  class="matchmemd-text-link text-pacific-200 hover:text-pacific-100 font-normal"
                  to="/login"
                  >{{ $t('locale.registerScreen.emailInUse.login') }}</router-link
                >
                {{ $t('locale.registerScreen.emailInUse.or') }}
                <router-link
                  class="matchmemd-text-link text-pacific-200 hover:text-pacific-100 font-normal"
                  to="/forgot-password"
                  >{{ $t('locale.registerScreen.emailInUse.resetPassword') }}</router-link
                >
              </p>
            </div>

            <p v-else>{{ registerErrorObject.message }}</p>
          </div>
          <form class="space-y-6" @submit="onSubmit">
            <div class="pb-1 flex flex-col">
              <div class="pb-1 flex flex-row space-x-3">
                <div class="relative w-full">
                  <label v-show="false" for="firstName">{{
                    $t('locale.registerScreen.placeholderFirstName')
                  }}</label>
                  <input
                    name="firstName"
                    type="text"
                    id="firstName"
                    :placeholder="$t('locale.registerScreen.placeholderFirstName')"
                    autocomplete="firstName"
                    v-model.trim="firstName"
                    :class="{
                      'matchmemd-input-error': !(!firstNameMeta.dirty || firstNameMeta.valid),
                      'matchmemd-input-success': firstNameMeta.valid
                    }"
                    class="matchmemd-input w-full"
                  />
                  <Tick :shown="firstNameMeta.valid" />
                </div>

                <div class="relative w-full">
                  <label v-show="false" for="lastName">{{
                    $t('locale.registerScreen.placeholderLastName')
                  }}</label>
                  <input
                    name="lastName"
                    type="text"
                    id="lastName"
                    :placeholder="$t('locale.registerScreen.placeholderLastName')"
                    autocomplete="lastName"
                    v-model.trim="lastName"
                    :class="{
                      'matchmemd-input-error': !(!lastNameMeta.dirty || lastNameMeta.valid),
                      'matchmemd-input-success': lastNameMeta.valid
                    }"
                    class="matchmemd-input w-full"
                  />
                  <Tick :shown="lastNameMeta.valid" />
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
                  class="matchmemd-text-error px-1"
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
                  class="matchmemd-text-error px-1"
                  >{{ lastNameError }}</span
                >
              </div>
            </div>

            <div class="pb-1">
              <div class="relative">
                <label v-show="false" for="email">{{
                  $t('locale.registerScreen.placeholderEmail')
                }}</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  :placeholder="$t('locale.registerScreen.placeholderEmail')"
                  autocomplete="email"
                  v-model.trim="email"
                  :class="{
                    'matchmemd-input-error': !(!emailMeta.dirty || emailMeta.valid),
                    'matchmemd-input-success': emailMeta.valid
                  }"
                  class="matchmemd-input w-full"
                />
                <Tick :shown="emailMeta.valid" />
              </div>

              <span v-if="email.length > 0 && !emailMeta.valid" class="matchmemd-text-error px-1">{{
                emailError
              }}</span>
            </div>

            <div class="mb-2 relative rounded-md">
              <label v-show="false" for="password">{{
                $t('locale.registerScreen.placeholderPassword')
              }}</label>
              <input
                name="password"
                type="password"
                id="password"
                v-model.trim="password"
                :placeholder="$t('locale.registerScreen.placeholderPassword')"
                autocomplete="current-password"
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
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center">
                <p class="text-sm leading-5 text-center">
                  {{ $t('locale.registerScreen.signUpAcceptance.main') }}
                  <router-link to="/terms" class="text-sm text-center matchmemd-text-link">
                    {{ $t('locale.registerScreen.signUpAcceptance.terms') }}
                  </router-link>
                  {{ $t('locale.registerScreen.signUpAcceptance.and') }}
                  <router-link to="/policy" class="text-sm text-center matchmemd-text-link">
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
                  class="matchmemd-button has-tooltip w-full"
                >
                  <img v-show="loading" class="h-full w-5" src="/Loader.svg" />
                  <div v-show="!loading">{{ $t('locale.registerScreen.cta') }}</div>
                  <span v-if="!registerEnabled" class="tooltip p-2 mt-8">{{
                    $t('locale.registerScreen.tooltip')
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
                      {{ $t('locale.registerScreen.continue') }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-2">
                  <div>
                    <a href="#" class="matchmemd-social-button">
                      <span class="sr-only">{{ $t('locale.registerScreen.withGoogle') }}</span>
                      <img
                        height="20"
                        width="20"
                        class="mx-auto h-5 sm:h-5 w-auto"
                        src="/google-logo.svg"
                        alt="Google sign in"
                      />
                    </a>
                  </div>

                  <div>
                    <a href="#" class="matchmemd-social-button">
                      <span class="sr-only">{{ $t('locale.registerScreen.withFacebook') }}</span>
                      <img
                        height="20"
                        width="20"
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
              {{ $t('locale.registerScreen.accountExists') }}
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
import Tick from '@/components/Tick.vue'
import { RegisterKeys, RegisterValues } from '../types/'
import { useStore } from 'vuex'
import { Action } from '../store/actions'
import { REGISTRATION_FAILED } from '../services/mixpanel-events'
import { verify } from 'node:crypto'
import { verifyEmailRequest } from '../services/api'

export default {
  name: 'Register',
  components: { Tick },
  setup() {
    const store = useStore()
    const { t } = useI18n()
    const loading = ref(false)
    const registerError = ref(false)
    let registerErrorObject: Record<string, any> = ref({})
    document.title = t('locale.registerScreen.meta.title')
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
    const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: registerSchema })

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

    const onSubmit = handleSubmit((values: Record<RegisterKeys, RegisterValues>) => {
      loading.value = true
      store
        .dispatch(Action.REGISTER, values)
        .then(() => {
          loading.value = false
          verifyEmailRequest(values.email, values.firstName)
        })
        .catch((e) => {
          let failedResults: Record<string, unknown> = { ...values, reason: e.code }
          delete failedResults.password
          registerError.value = true
          mixpanel.track(REGISTRATION_FAILED, failedResults)
          registerErrorObject.value = e
          loading.value = false
        })
    })

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
      loading,
      registerError,
      registerErrorObject
    }
  }
}
</script>
