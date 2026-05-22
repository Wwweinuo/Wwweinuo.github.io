<script setup lang="ts">
interface Post {
  title: string
  date: string
  url: string
  summary: string
  tags: string[]
}

const posts: Post[] = [
  {
    title: 'Hello World —— 博客开篇',
    date: '2026-05-22',
    url: '/blog/2026/hello-world',
    summary: '这是本博客的第一篇文章，记录了我搭建这个博客的过程和技术选型的思考。',
    tags: ['VitePress', 'GitHub Pages'],
  },
  {
    title: 'VitePress 主题定制指南',
    date: '2026-05-20',
    url: '/blog/2026/vitepress-theme-guide',
    summary: '深入探讨 VitePress 自定义主题的方法，包括布局扩展、CSS 变量覆盖和组件开发。',
    tags: ['VitePress', '前端'],
  },
  {
    title: 'Git 工作流最佳实践',
    date: '2026-05-18',
    url: '/blog/2026/git-workflow',
    summary: '分享日常开发中常用的 Git 工作流，包括分支策略、commit 规范和协作技巧。',
    tags: ['Git', 'DevOps'],
  },
]
</script>

<template>
  <div class="vp-home-hero">
    <div class="avatar">
      <img src="https://github.com/Wwweinuo.png" alt="avatar" />
    </div>
    <h1>你好，我是 Wwweinuo</h1>
    <p class="tagline">一名热爱技术、喜欢写作的开发者</p>
    <div class="actions">
      <a href="/blog/" class="btn btn-primary">查看博客</a>
      <a href="/about/" class="btn btn-secondary">关于我</a>
    </div>
  </div>

  <div class="post-list">
    <h2 class="section-title">最新文章</h2>
    <div v-for="post in posts" :key="post.url" class="post-item">
      <div class="post-date">{{ post.date }}</div>
      <div class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </div>
      <p class="post-summary">{{ post.summary }}</p>
      <div class="post-tags">
        <a
          v-for="tag in post.tags"
          :key="tag"
          :href="`/tags/#${tag}`"
          class="post-tag"
        >#{{ tag }}</a>
      </div>
    </div>
  </div>
</template>
