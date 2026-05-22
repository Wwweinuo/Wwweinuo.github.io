---
title: GitHub Pages 使用指南
date: 2026-05-22
tags: [GitHub Pages, VitePress, CI/CD]
summary: 全面介绍 GitHub Pages 的两种部署方式、站点类型、自定义域名配置以及与静态站点生成器的集成。
---

# GitHub Pages 使用指南

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，适合部署博客、文档站点、项目主页和个人作品集。

## 站点类型

GitHub Pages 有两种站点类型，创建方式和使用方式有所不同：

| 类型 | 仓库名 | 访问地址 |
|------|--------|----------|
| **用户站点** | `username.github.io` | `https://username.github.io/` |
| **项目站点** | 任意名称 | `https://username.github.io/repo-name/` |

- **用户站点**：每个账号只能有一个，仓库名必须与用户名匹配，部署在根路径
- **项目站点**：每个仓库都可以开启，部署在 `/repo-name/` 子路径下

## 创建 GitHub Pages 站点

### 创建用户站点

```bash
# 1. 在 GitHub 上创建仓库，名称必须为 username.github.io
# 2. 克隆到本地
git clone git@github.com:username/username.github.io.git
cd username.github.io
```

### 创建项目站点

在任意已有仓库的 Settings → Pages 中启用即可，无需创建新仓库。

## 部署方式

GitHub Pages 支持两种部署方式：

### 方式一：从分支部署（简单）

直接将静态文件推送到指定分支，GitHub Pages 自动托管。适合纯 HTML 或已构建好的静态文件。

配置路径：**Settings → Pages → Source → Deploy from a branch**

- 选择分支（如 `master` 或 `main`）
- 选择目录：
  - `/` — 仓库根目录
  - `/docs` — 仓库的 docs 目录

适合场景：
- 不需要构建步骤的纯静态站点
- 使用 Jekyll 的项目（GitHub Pages 内置 Jekyll 支持）

### 方式二：GitHub Actions 部署（推荐）

使用 CI 流水线自动构建和部署，灵活度最高。

配置路径：**Settings → Pages → Source → GitHub Actions**

优势：
- 支持任意静态站点生成器（VitePress、Next.js、Hugo 等）
- Node.js、Python、Ruby 等运行时均可使用
- 构建过程完全可控
- 可以添加测试、lint 等步骤

## 使用 GitHub Actions 部署 VitePress

以下是一个完整的部署工作流，文件路径为 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

### 适配不同静态站点生成器

只需要修改工作流中的构建步骤即可适配其他框架：

| 生成器 | 构建命令 | 输出目录 |
|--------|----------|----------|
| VitePress | `npm run build` | `docs/.vitepress/dist` |
| Next.js | `npm run build` | `out/` |
| Hugo | `hugo` | `public/` |
| Jekyll | `jekyll build` | `_site/` |
| Astro | `npm run build` | `dist/` |

修改 `upload-pages-artifact` 的 `path` 参数为对应的输出目录即可。

### VitePress base 配置

VitePress 的 `base` 需要与站点类型匹配：

```ts
// 用户站点 — 根路径
export default defineConfig({ base: '/' })

// 项目站点 — 仓库名作为子路径
export default defineConfig({ base: '/repo-name/' })
```

## 自定义域名

GitHub Pages 支持绑定自定义域名：

1. 在域名 DNS 中添加记录：
   - A 记录指向 GitHub Pages IP（`185.199.108.153` 等）
   - 或 CNAME 记录指向 `username.github.io`

2. 在 Settings → Pages → Custom domain 中填入域名并保存

3. GitHub 会自动创建 `CNAME` 文件，确保你的构建流程不要覆盖此文件

## 仓库设置检查清单

部署前确认以下设置：

- [ ] **Pages → Source**：选择 "GitHub Actions"（如果使用 CI 部署）
- [ ] **Actions → General → Workflow permissions**：设为 "Read and write permissions"
- [ ] `.gitignore` 中排除构建产物目录（如 `dist/`、`**/.vitepress/dist/`）

## 环境对齐建议

本地开发环境与 CI 环境对齐可避免构建差异：

- `node-version` 与本地 `node --version` 保持一致
- 使用 `npm ci` 而非 `npm install`，严格按 lock 文件安装依赖
- 使用 `npm ci` 的前提是 `package-lock.json` 已提交到仓库

## 部署其他类型静态站点

GitHub Pages 不限于博客，还可以部署：

- **项目文档**：使用 VitePress、Docusaurus、MkDocs
- **个人作品集**：纯 HTML/CSS 或使用 Astro、Hugo
- **单页应用**：配置 404 页面处理客户端路由
- **API 文档**：配合 OpenAPI/Swagger 使用

只要最终产物是静态文件（HTML、CSS、JS），都可以部署到 GitHub Pages。

## 常见问题

### 1. 样式丢失，控制台报 MIME type 错误

**现象**：页面无样式，控制台报错：

```
Failed to load module script: Expected a JavaScript-or-Wasm module script
but the server responded with a MIME type of "text/html".
```

**原因**：`base` 配置与站点类型不匹配，所有 JS/CSS 资源路径错误。浏览器请求 `/repo-name/assets/app.js` 时，服务器返回 404 HTML 页面，浏览器拿到 HTML 而非 JS，触发 MIME 检查。

**排查**：打开页面源代码，搜索 `__VP_SITE_DATA__`，查看 `base` 字段：

```html
<script>window.__VP_SITE_DATA__=JSON.parse("{...\"base\":\"/xxx/\",...}")</script>
```

如果用户站点显示 `"base":"/repo-name/"` 或项目站点显示 `"base":"/"`，就是配反了。

**解决**：在 VitePress 配置中修正 `base` 值，重新构建部署。

### 2. GitHub Actions 推送后部署未更新

**现象**：推送了代码但线上仍然是旧版本。

**排查步骤**：

1. 打开仓库 **Actions** 标签页，确认最新 workflow 是否运行成功（绿色勾）
2. 如果没触发 —— 检查 workflow 的 `on.push.branches` 是否包含当前分支
3. 如果触发了但部署未生效 —— 检查 **Settings → Pages → Source** 是否设为 "GitHub Actions"，而不是 "Deploy from a branch"
4. 如果 workflow 失败 —— 点击失败的 run 查看具体错误日志

**注意**：Pages Source 设为 "Deploy from a branch" 时，GitHub Actions 即使构建成功也不会更新页面。两种部署方式互斥。

### 3. 浏览器缓存导致看到旧版本

**现象**：无痕窗口显示正常，普通窗口有问题；或者改了代码但页面没变化。

**解决**：

- 普通缓存：`Ctrl + Shift + R` 硬刷新，或 `Ctrl + Shift + Delete` 清除缓存
- Service Worker 缓存（部分 VitePress 插件会注册 SW）：DevTools → **Application → Service Workers → Unregister**，再清除站点数据
- CDN 缓存：GitHub Pages 使用 Fastly CDN，偶尔会有几秒延迟，通常刷新即可

### 4. cleanUrls 与分支部署不兼容

**现象**：使用分支部署时，访问 `/blog/` 这样的干净 URL 返回 404。

**原因**：GitHub Pages 分支部署不会自动将 `/blog/` 映射到 `/blog/index.html` 或 `/blog.html`。

**解决**（二选一）：

- 改用 GitHub Actions 部署（不存在此问题）
- 在 VitePress 配置中关闭 `cleanUrls`

### 5. 本地正常，CI 构建失败

**常见原因**：

- **Node 版本不一致**：CI 中 `node-version` 与本地不同，某些依赖需要特定版本。用 `node --version` 确认本地版本后更新 workflow
- **依赖未锁定**：使用了 `npm install` 而非 `npm ci`，或 `package-lock.json` 未提交到仓库
- **构建输出路径错误**：`upload-pages-artifact` 的 `path` 与实际输出目录不一致
