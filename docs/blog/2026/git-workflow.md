---
title: Git 工作流最佳实践
date: 2026-05-18
tags: [Git, DevOps]
summary: 分享日常开发中常用的 Git 工作流，包括分支策略、commit 规范和协作技巧。
head:
  - - meta
    - name: description
      content: Git 工作流最佳实践分享
---

# Git 工作流最佳实践

高效的 Git 工作流是团队协作的基础。本文分享我日常开发中的一些实践。

## 分支策略

我推荐使用简洁的分支模型：

- **main**：主分支，保持稳定可部署
- **feat/xxx**：功能分支，从 main 分出
- **fix/xxx**：修复分支

## Commit 规范

推荐使用约定式提交 (Conventional Commits)：

```
feat: 添加搜索功能
fix: 修复导航栏闪烁问题
docs: 更新 README
refactor: 重构用户模块
```

格式：`<type>: <description>`

## 常用操作

```bash
# 创建功能分支
git checkout -b feat/search

# 交互式变基整理 commit
git rebase -i HEAD~3

# 合并到 main
git checkout main
git merge --squash feat/search
```

## 总结

好的 Git 习惯能让项目历史保持清晰可读，值得从一开始就养成。
