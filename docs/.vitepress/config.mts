import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Wwweinuo',
  description: '个人技术博客 - 记录学习与思考',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
  ],

  themeConfig: {
    logo: null,
    search: {
      provider: 'local',
    },
    nav: [
      { text: '博客', link: '/blog/' },
      { text: '归档', link: '/archives/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Wwweinuo' },
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: `© ${new Date().getFullYear()} Wwweinuo`,
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    outline: {
      label: '目录',
      level: [2, 3],
    },
    lastUpdated: {
      text: '最后更新于',
    },
    notFound: {
      title: '页面未找到',
      quote: '你访问的页面不存在，或许可以看看其他文章。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
  },
})
