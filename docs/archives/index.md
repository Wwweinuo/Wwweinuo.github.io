---
title: Archives
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
  // 年份倒序
  const sortedEntries = Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]))
  // 每年内文章按日期倒序
  for (const [, posts] of sortedEntries) {
    posts.sort((a, b) => b.date.localeCompare(a.date))
  }
  return sortedEntries
}

const archives = groupByYear(posts)
</script>

<div class="archives-page">
  <h1>Archives</h1>
  <template v-for="[year, posts] in archives" :key="year">
    <h2 class="archive-year">{{ year }} <span class="archive-count">{{ posts.length }}</span></h2>
    <div class="archive-posts">
      <a
        v-for="post in posts"
        :key="post.url"
        :href="post.url"
        class="archive-post"
      >
        <span class="archive-post-date">{{ post.date }}</span>
        <span class="archive-post-title">{{ post.title }}</span>
      </a>
    </div>
  </template>
</div>
