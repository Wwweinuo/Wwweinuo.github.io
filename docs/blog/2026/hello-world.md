---
title: Hello World —— 博客开篇
date: 2026-05-22
tags: [VitePress, GitHub Pages]
summary: 这是本博客的第一篇文章，记录了我搭建这个博客的过程和技术选型的思考。
head:
  - - meta
    - name: description
      content: 使用 VitePress 搭建个人博客的经验分享
---

# Hello World —— 博客开篇

欢迎来到我的个人博客！这是第一篇正式文章。

## 为什么要写博客

一直以来都想拥有一个属于自己的技术博客空间，用来记录学习心得、分享技术经验。写博客的理由很简单：

- **知识沉淀**：把学到的东西写成文章，加深理解
- **技术分享**：帮助遇到相同问题的其他人
- **个人品牌**：展示自己的技术积累

## 为什么选择 VitePress

在选型时比较了几个主流的静态站点生成器：

| 框架 | 优点 | 缺点 |
|------|------|------|
| **VitePress** | Vite 驱动，构建极快，Markdown 原生支持 | 生态相对 Hexo 较小 |
| **Hexo** | 成熟稳定，插件多，主题丰富 | 构建速度慢，基于 Webpack |
| **Hugo** | 构建最快，Go 语言编写 | 模板语法学习成本高 |
| **Gatsby** | React 生态，插件丰富 | 太重量级 |

最终选择 VitePress 的原因：

1. **构建速度快** —— 基于 Vite，开发体验极好
2. **Vue 3 支持** —— 可以内嵌 Vue 组件，扩展性强
3. **简洁优雅** —— 默认主题就很美观，减少定制成本
4. **默认功能齐全** —— 搜索、深色模式、代码高亮开箱即用

## 搭建过程

整个搭建过程用了不到一小时：

```bash
# 1. 初始化项目
npm init -y
npm install -D vitepress vue

# 2. 创建配置文件
mkdir -p docs/.vitepress
touch docs/.vitepress/config.mts

# 3. 启动开发服务器
npx vitepress dev docs
```

## 接下来的计划

- 完善标签系统和归档页面
- 接入 Giscus 评论系统
- 配置 GitHub Actions 自动部署
- 持续输出高质量技术文章

感谢阅读，敬请期待更多内容！
