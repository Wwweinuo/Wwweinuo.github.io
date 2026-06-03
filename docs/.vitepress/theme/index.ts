import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomePage from './components/HomePage.vue'
import PageViews from './components/PageViews.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(PageViews),
    })
  },
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('PageViews', PageViews)
  },
} satisfies Theme
