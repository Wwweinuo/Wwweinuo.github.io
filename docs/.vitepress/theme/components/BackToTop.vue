<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
let scrollTimer: number | null = null

function onScroll() {
  if (scrollTimer) return
  scrollTimer = window.setTimeout(() => {
    visible.value = window.scrollY > 300
    scrollTimer = null
  }, 80)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<template>
  <Transition name="btt">
    <button
      v-if="visible"
      class="back-to-top"
      title="回到顶部"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 48px;
  right: 32px;
  z-index: 999;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
}

.back-to-top:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(5, 150, 105, 0.45);
}

.back-to-top:active {
  transform: translateY(-1px);
}

.btt-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.btt-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
