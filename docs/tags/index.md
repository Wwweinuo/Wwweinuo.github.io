---
title: 标签
---

<script setup>
import { data as posts } from '../blog/posts.data.ts'

function getTagMap(posts) {
  const map = {}
  for (const post of posts) {
    for (const tag of (post.tags || [])) {
      if (!map[tag]) map[tag] = { count: 0, posts: [] }
      map[tag].count++
      map[tag].posts.push(post)
    }
  }
  return Object.entries(map).sort((a, b) => b[1].count - a[1].count)
}

const tags = getTagMap(posts)

const activeTag = typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : ''
</script>

<div class="blog-page">
  <h1>标签</h1>
  <div class="tag-cloud">
    <a
      v-for="[tag, data] in tags"
      :key="tag"
      :href="`#${tag}`"
      class="tag-item"
    >{{ tag }} ({{ data.count }})</a>
  </div>

  <div v-for="[tag, data] in tags" :key="tag">
    <h2 :id="tag" style="margin-top: 32px; font-size: 20px; font-weight: 600;">
      {{ tag }}
    </h2>
    <div class="post-list" style="padding: 0;">
      <div v-for="post in data.posts" :key="post.url" class="post-item">
        <div class="post-date">{{ post.date }}</div>
        <div class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </div>
      </div>
    </div>
  </div>
</div>
