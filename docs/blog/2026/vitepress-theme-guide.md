---
title: VitePress 主题定制指南
date: 2026-05-20
tags: [VitePress, 前端]
summary: 深入探讨 VitePress 自定义主题的方法，包括布局扩展、CSS 变量覆盖和组件开发。
head:
  - - meta
    - name: description
      content: VitePress 自定义主题的完整指南
---

# VitePress 主题定制指南

VitePress 提供了灵活的主题定制能力，本文介绍几种常用的定制方式。

## CSS 变量覆盖

VitePress 使用 CSS 自定义属性来控制样式，覆盖这些变量是最简单的定制方式：

```css
:root {
  --vp-c-brand-1: #3451b2;
  --vp-c-brand-2: #4b6bc9;
  --vp-c-brand-3: #5b7fff;
}
```

## 自定义主题

可以通过扩展默认主题来添加自定义组件：

```typescript
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CustomComponent from './components/CustomComponent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomComponent', CustomComponent)
  },
} satisfies Theme
```

## 自定义首页

VitePress 支持在 Markdown 中使用 Vue 组件，可以轻松创建自定义首页布局。

## 总结

VitePress 的主题系统设计精良，既保持了简洁性，又提供了足够的扩展空间。
