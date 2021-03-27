/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
import { createApp } from 'vue'
import { en_locale, ja_locale } from './services/locales'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import App from './App.vue'
import { store } from './store'
import './index.css'
import router from './router'

const locales = {
  ...en_locale,
  ...ja_locale
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales
})

// mixpanel.track('App loaded', { genre: 'hip-hop', 'duration in seconds': 42 })
// const USER_ID = '12148'
// mixpanel.identify(USER_ID)
// const USER_SIGNUP_DATE = '2020-01-02T21:07:03Z'

// mixpanel.people.set({
//   $email: 'jsmith@example.com', // only reserved properties need the $
//   'Sign up date': USER_SIGNUP_DATE, // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
//   USER_ID: USER_ID, // use human-readable names
//   credits: 150 // ...or numbers
// })
const app = createApp(App)
app.component('LayoutDefault', LayoutDefault)
app.use(i18n).use(router).use(store).mount('#app')
