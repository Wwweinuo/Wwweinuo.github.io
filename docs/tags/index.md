---
title: Tags
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
  <h1>Tags</h1>
  <div class="tag-cloud">
    <a
      v-for="[tag, data] in tags"
      :key="tag"
      :href="`#${tag}`"
      class="tag-item"
    >{{ tag }} ({{ data.count }})</a>
  </div>

  <div v-for="[tag, data] in tags" :key="tag" class="tag-section">
    <h2 :id="tag" class="tag-heading">{{ tag }} <span class="tag-count">{{ data.count }}</span></h2>
    <div class="tag-posts">
      <a
        v-for="post in data.posts"
        :key="post.url"
        :href="post.url"
        class="tag-post"
      >
        <span class="tag-post-date">{{ post.date }}</span>
        <span class="tag-post-title">{{ post.title }}</span>
      </a>
    </div>
  </div>
</div>
