---
title: 归档
---

<script setup>
import { data as posts } from '../blog/posts.data.ts'

function groupByYear(posts) {
  const map = {}
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (!map[year]) map[year] = []
    map[year].push(post)
  }
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]))
}

const archives = groupByYear(posts)
</script>

<div class="archives-page">
  <h1>归档</h1>
  <template v-for="[year, posts] in archives" :key="year">
    <h2 class="archive-year">{{ year }}</h2>
    <div v-for="post in posts" :key="post.url" class="archive-item">
      <span class="archive-date">{{ post.date }}</span>
      <span class="archive-title">
        <a :href="post.url">{{ post.title }}</a>
      </span>
    </div>
  </template>
</div>
