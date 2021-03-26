// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

const app = createApp(App)
app.component('LayoutDefault', LayoutDefault)
app.use(i18n).use(router).use(store).mount('#app')
