---
title: Friends
description: 友情链接
---

<script setup>
const friends = [
  {
    name: '帝皇',
    avatar: '/avatars/dihuang.jpg',
    desc: '果金',
    url: '',
  },
  {
    name: '安卓',
    avatar: '/avatars/anzhuo.jpg',
    desc: '耶耶韦斯特',
    url: '',
  },
  {
    name: '香肠',
    avatar: '/avatars/xiangchang.jpg',
    desc: '憂鬱的烏龜',
    url: '',
  },
  {
    name: '裤衩',
    avatar: '/avatars/kucha.jpg',
    desc: '世界倒数第一欧巴（收血仆）',
    url: '',
  },
]
</script>

<div class="friends-page">
  <h1>Friends</h1>
  <p class="friends-intro">欢迎互加友链，<a href="https://github.com/Wwweinuo/Wwweinuo.github.io/issues">点击这里</a> 留言交换。</p>
  <div class="friends-grid">
    <component
      v-for="friend in friends"
      :key="friend.name"
      :is="friend.url ? 'a' : 'div'"
      :href="friend.url || undefined"
      :target="friend.url ? '_blank' : undefined"
      :rel="friend.url ? 'noopener' : undefined"
      class="friend-card"
    >
      <div class="friend-avatar">
        <img v-if="friend.avatar" :src="friend.avatar" :alt="friend.name" loading="lazy" />
        <span v-else class="friend-avatar-placeholder">{{ friend.name[0] }}</span>
      </div>
      <div class="friend-info">
        <span class="friend-name">{{ friend.name }}</span>
        <span v-if="friend.desc" class="friend-desc">{{ friend.desc }}</span>
      </div>
    </component>
  </div>
</div>
