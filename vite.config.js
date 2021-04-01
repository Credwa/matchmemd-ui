import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      'v-calendar': 'v-calendar/lib/cjs/index.js',
      vue: 'vue/dist/vue.cjs.js'
    }
  },
  define: {
    _APP_VERSION: JSON.stringify(pkg.version)
  },
  build: {
    chunkSizeWarningLimit: 1000
  }
})
