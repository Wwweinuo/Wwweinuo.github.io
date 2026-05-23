<script setup lang="ts">
import { ref } from 'vue'
import { data as allPosts } from '../../../blog/posts.data.ts'

const posts = allPosts.slice(0, 5)

const quotes = [
  'Stay hungry, stay foolish.',
  '简单是可靠的前提。',
  '任何足够先进的技术都与魔法无异。',
  '种一棵树最好的时间是十年前，其次是现在。',
  '优秀的代码本身就是最好的文档。',
  '先让它跑起来，再让它跑得快。',
  '你不需要很厉害才能开始，但你需要开始才能很厉害。',
  '编程不是打字，是思考。',
  '在自己的节奏里，慢慢成为更好的人。',
]

const quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
</script>

<template>
  <div class="vp-home-hero">
    <div class="avatar">
      <img src="https://github.com/Wwweinuo.png" alt="avatar" />
    </div>
    <h1>你好，我是 Wwweinuo</h1>
    <p class="tagline">一名热爱技术、喜欢写作的开发者</p>

    <div class="signature">
      <div class="signature-quote">
        <span class="signature-mark">"</span>
        <span class="signature-text">{{ quote }}</span>
        <span class="signature-mark">"</span>
      </div>
    </div>

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
