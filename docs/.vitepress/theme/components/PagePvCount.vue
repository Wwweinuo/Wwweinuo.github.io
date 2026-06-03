<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  path: string
}>()

const count = ref<number | null>(null)
const error = ref(false)

onMounted(() => {
  const callbackName = 'busuanzi_cb_' + Math.random().toString(36).slice(2)
  const script = document.createElement('script')
  script.async = true

  ;(window as any)[callbackName] = (data: { page_pv: number }) => {
    delete (window as any)[callbackName]
    script.remove()
    if (data && typeof data.page_pv === 'number') {
      count.value = data.page_pv
    } else {
      error.value = true
    }
  }

  script.onerror = () => {
    delete (window as any)[callbackName]
    script.remove()
    error.value = true
  }

  // 用当前页面的 origin 拼接完整 URL，避免 localhost 串数据
  const fullUrl = `${window.location.origin}${props.path}`
  script.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}&type=page_pv&url=${encodeURIComponent(fullUrl)}`
  document.head.appendChild(script)
})
</script>

<template>
  <span v-if="count !== null" class="pv-count">{{ count }}</span>
  <span v-else-if="error" class="pv-count pv-error">-</span>
  <span v-else class="pv-count pv-loading">…</span>
</template>

<style scoped>
.pv-count {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pv-loading {
  color: var(--vp-c-text-3);
}

.pv-error {
  color: var(--vp-c-text-3);
}
</style>
