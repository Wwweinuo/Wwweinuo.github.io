<script setup lang="ts">
import { data as allPosts } from '../../../blog/posts.data.ts'

const posts = allPosts.slice(0, 5)
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
