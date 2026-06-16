import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import HomePage from './components/HomePage.vue'
import BackToTop from './components/BackToTop.vue'
import Tabs from './components/Tabs.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('Tabs', Tabs)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop),
    })
  },
} satisfies Theme
