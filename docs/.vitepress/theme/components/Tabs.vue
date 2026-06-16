<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

export interface TabItem {
  label: string
  content?: string
}

const props = withDefaults(defineProps<{
  tabs: TabItem[]
  defaultActive?: number
}>(), {
  defaultActive: 0,
})

const emit = defineEmits<{
  switch: [index: number]
}>()

const activeIndex = ref(props.defaultActive)
const barRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ left: '0px', width: '0px' })

function updateIndicator() {
  const bar = barRef.value
  if (!bar) return
  const buttons = bar.querySelectorAll<HTMLElement>('.vp-tab')
  const active = buttons[activeIndex.value]
  if (!active) return
  const barRect = bar.getBoundingClientRect()
  const btnRect = active.getBoundingClientRect()
  const btnW = btnRect.width
  const indW = Math.max(btnW * 0.55, 18)
  const offsetL = (btnW - indW) / 2
  indicatorStyle.value = {
    left: `${btnRect.left - barRect.left + offsetL}px`,
    width: `${indW}px`,
  }
}

function switchTab(index: number) {
  if (index === activeIndex.value) return
  const btn = barRef.value?.querySelectorAll<HTMLElement>('.vp-tab')[index]
  btn?.focus()
  activeIndex.value = index
  emit('switch', index)
}

function onKeydown(e: KeyboardEvent) {
  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const len = props.tabs.length
  let i = (activeIndex.value + dir + len) % len
  switchTab(i)
}

onMounted(() => {
  updateIndicator()
})

watch(activeIndex, () => {
  nextTick(updateIndicator)
})
</script>

<template>
  <div class="vp-tabs">
    <!-- Tab Bar -->
    <div
      ref="barRef"
      class="vp-tabs-bar"
      role="tablist"
      aria-label="内容标签"
    >
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="vp-tab"
        :class="{ active: activeIndex === i }"
        :aria-selected="activeIndex === i"
        :tabindex="activeIndex === i ? 0 : -1"
        role="tab"
        @click="switchTab(i)"
        @keydown="onKeydown"
      >
        {{ tab.label }}
      </button>
      <div
        class="vp-tab-indicator"
        :style="indicatorStyle"
        aria-hidden="true"
      />
    </div>

    <!-- Tab Panels -->
    <div class="vp-tabs-panels">
      <Transition name="tab-slide" mode="out-in">
        <div
          :key="activeIndex"
          class="vp-tab-panel"
          role="tabpanel"
        >
          <div v-if="tabs[activeIndex]?.content" v-html="tabs[activeIndex].content" />
          <slot v-else :name="`tab-${activeIndex}`" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.vp-tabs {
  margin: 28px 0;
}

/* ===== Tab Bar ===== */
.vp-tabs-bar {
  position: relative;
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.vp-tabs-bar::-webkit-scrollbar {
  display: none;
}

.vp-tab {
  position: relative;
  z-index: 1;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
  border-radius: 6px 6px 0 0;
  user-select: none;
  -webkit-user-select: none;
}
.vp-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-brand-soft);
}
.vp-tab.active {
  color: var(--vp-c-brand-1);
}
.vp-tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

/* ===== Sliding Pill Indicator ===== */
.vp-tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2.5px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
  box-shadow: 0 0 10px color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

/* ===== Panel Area ===== */
.vp-tabs-panels {
  position: relative;
  padding: 24px 0;
}

.vp-tab-panel {
  line-height: 1.75;
  color: var(--vp-c-text-1);
}

/* ===== Rich content inside panel ===== */
.vp-tab-panel :deep(p) {
  margin: 0 0 16px;
}
.vp-tab-panel :deep(ul),
.vp-tab-panel :deep(ol) {
  padding-left: 20px;
  margin: 0 0 16px;
}
.vp-tab-panel :deep(li) {
  margin: 4px 0;
}
.vp-tab-panel :deep(blockquote) {
  margin: 0 0 20px;
  padding: 12px 20px;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 0 8px 8px 0;
  color: var(--vp-c-text-1);
  font-style: italic;
}
.vp-tab-panel :deep(h3) {
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}
.vp-tab-panel :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.vp-tab-panel :deep(a:hover) {
  text-decoration: underline;
}

/* ===== Transition ===== */
.tab-slide-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tab-slide-enter-active {
  transition: opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s;
}
.tab-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.tab-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* ===== Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
  .vp-tab-indicator {
    transition: none;
  }
  .tab-slide-leave-active,
  .tab-slide-enter-active {
    transition: none;
  }
}
</style>
