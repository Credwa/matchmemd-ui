import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'MatchMeMD',
        short_name: 'MatchMeMD',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#f1f9fa',
        theme_color: '#14acbd',
        description: 'MatchMeMD web application',
        icons: [
          {
            src: '/matchmemd-icon48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/matchmemd-icon72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/matchmemd-icon96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/matchmemd-icon144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/matchmemd-icon168.png',
            sizes: '168x168',
            type: 'image/png'
          },
          {
            src: '/matchmemd-icon192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/matchmemd-vert-logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
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
