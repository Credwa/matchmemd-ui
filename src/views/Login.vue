<template>
  <LayoutDefault>
    <div class="w-screen px-3 mt-12">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-9 sm:h-10 w-auto" src="@/assets/logo.svg" alt="MatchMeMD" />
        <h2
          class="mt-8 text-center text-xl leading-7 font-bold sm:text-3xl sm:leading-9 sm:font-extrabold text-gray-900"
        >
          {{ $t('locale.loginScreen.title') }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="sm:bg-white py-8 px-2 sm:shadow sm:rounded-lg sm:px-10">
          <Form class="space-y-6" @submit="onSubmit">
            <div class="pb-1">
              <input
                name="email"
                type="email"
                id="email"
                :placeholder="$t('locale.loginScreen.placeholderEmail')"
                autocomplete="email"
                v-model="email"
                :class="[
                  !emailMeta.dirty || emailMeta.valid
                    ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                    : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                ]"
                class="appearance-none block w-full px-3 py-2 border text-gray-700 bg-gray-50 sm:bg-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none sm:text-sm"
              />
              <span v-if="emailError" class="text-coral-600 text-xs font-medium px-1 py-1">{{
                emailError
              }}</span>
            </div>

            <div class="pb-2">
              <input
                name="password"
                type="password"
                id="password"
                v-model="password"
                :placeholder="$t('locale.loginScreen.placeholderPassword')"
                autocomplete="current-password"
                :class="[
                  !passwordMeta.dirty || passwordMeta.valid
                    ? 'focus:border-pacific-500 border-gray-300 focus:ring-pacific-500'
                    : 'focus:border-coral-600 border-coral-600 focus:ring-coral-600'
                ]"
                class="appearance-none block w-full px-3 py-2 border bg-gray-50 text-gray-700 sm:bg-white border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pacific-500 focus:border-pacific-500 sm:text-sm"
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
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-pacific-50 bg-pacific-500 hover:bg-pacific-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pacific-500"
              >
                {{ $t('locale.loginScreen.signIn') }}
              </button>

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
                        src="@/assets/google-logo.svg"
                        alt="MatchMeMD"
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
                        src="@/assets/facebook-logo.svg"
                        alt="MatchMeMD"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Form>

          <div class="flex justify-center flex-row sm:mt-12 mt-10">
            <p class="text-sm py-3 sm:py-1 text-gray-600">
              {{ $t('locale.loginScreen.noAccount') }}
            </p>
            <router-link
              to="/register"
              class="text-sm ml-1 py-3 text-pacific-500 sm:py-1 hover:text-pacific-600 cursor-pointer"
            >
              {{ $t('locale.loginScreen.register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
// import * as yup from 'yup'

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
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
          return t('locale.loginScreen.enterEmail')
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return t('locale.loginScreen.enterValidEmail')
        }
        return true
      }
    }
    const { t } = useI18n()
    const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: loginSchema })
    console.log(useForm({ validationSchema: loginSchema }))
    const onSubmit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2))
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

    console.log('email :>> ', email)
    console.log('emailError :>> ', errors)

    return {
      onSubmit,
      isSubmitting,
      errors,
      email,
      emailError,
      emailMeta,
      password,
      passwordError,
      passwordMeta
    }
  }
}
</script>
