/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { createI18n } from 'vue-i18n'
import { createApp, App as VueApp } from 'vue'
import { en_locale, ja_locale } from './services/locales'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import App from './App.vue'
import { Action, store } from './store'
import './index.css'
import router from './router'
import { auth } from './services/firebase'
import { APP_LOADED } from './services/mixpanel-events'

const locales = {
  ...en_locale,
  ...ja_locale
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales
})

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN as string)
mixpanel.track<null>(APP_LOADED)

function bootstrapApp(app: VueApp<Element>) {
  app = createApp(App)
  app.component('LayoutDefault', LayoutDefault)
  app.use(i18n).use(router).use(store).mount('#app')
  return app
}

let app: VueApp<Element>
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(Action.FETCH_USER_PROFILE, user).then(() => {
      if (!app) {
        app = bootstrapApp(app)
      }
    })
  } else if (!app) {
    app = bootstrapApp(app)
  }
})
