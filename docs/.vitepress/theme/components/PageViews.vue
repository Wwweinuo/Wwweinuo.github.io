<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'page-only' | 'site-only' | 'full'
  }>(),
  { type: 'page-only' },
)
</script>

<template>
  <div class="pv-counter" :class="`pv-${props.type}`">
    <!-- 站点总访问量 -->
    <span
      v-if="props.type === 'site-only' || props.type === 'full'"
      class="pv-item pv-site"
    >
      <span class="pv-icon">👁</span>
      <span class="pv-label">总访问量 </span>
      <span class="pv-value" id="busuanzi_value_site_pv">-</span>
      <span class="pv-divider">·</span>
      <span class="pv-icon">👥</span>
      <span class="pv-label">访客 </span>
      <span class="pv-value" id="busuanzi_value_site_uv">-</span>
    </span>

    <!-- 单页阅读量 -->
    <span
      v-if="props.type === 'page-only' || props.type === 'full'"
      class="pv-item pv-page"
    >
      <span class="pv-icon">📖</span>
      <span class="pv-label">阅读量 </span>
      <span class="pv-value" id="busuanzi_value_page_pv">-</span>
    </span>
  </div>
</template>

<style scoped>
.pv-counter {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.pv-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pv-icon {
  font-size: 14px;
}

.pv-label {
  color: var(--vp-c-text-2);
}

.pv-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pv-divider {
  margin: 0 8px;
  color: var(--vp-c-divider);
}

/* 全站统计：更突出的样式 */
.pv-full {
  justify-content: center;
  padding: 8px 0;
}

.pv-full .pv-value {
  color: var(--vp-c-brand-1);
}

/* 单页统计：轻量样式 */
.pv-page-only {
  padding: 4px 0;
}
</style>
