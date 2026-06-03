---
title: Blog
description: 所有文章列表
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

<div class="blog-page">
  <h1>Blog</h1>
  <div class="post-list" style="padding: 0;">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <div class="post-date">
        <span>{{ post.date }}</span>
        <span class="post-meta-pv">📖 <PagePvCount :path="post.url" /></span>
      </div>
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
</div>
