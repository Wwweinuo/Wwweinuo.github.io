---
title: Git 工作流最佳实践
date: 2026-05-22
tags: [Git, DevOps]
summary: 从分支策略到 commit 规范，附带可执行的命令示例，帮助你建立清晰高效的 Git 工作流。
head:
  - - meta
    - name: description
      content: Git 工作流最佳实践分享
---

# Git 工作流最佳实践

高效的 Git 工作流是团队协作和项目管理的基础。本文涵盖分支策略、commit 规范、常用操作和常见问题处理，每个场景都附带可执行的命令示例。

## 分支策略

### 主干开发模型

适合个人项目和小团队，分支简单、合并成本低：

```
master ──●──●──●──●──●──●──● (始终可部署)
          \     /
feat/xxx   ●───●
```

规则：
- `master` 始终可部署，不直接在上面提交
- 每个功能或修复从 `master` 分出独立分支
- 完成后合并回 `master`，删除特性分支

示例：

```bash
# 从 master 创建功能分支
git checkout master
git pull origin master
git checkout -b feat/user-auth

# 开发过程中提交
git add src/auth/login.ts
git commit -m "feat: 添加登录页面"

git add src/auth/register.ts
git commit -m "feat: 添加注册页面"

# 开发完成，合并回 master
git checkout master
git pull origin master          # 先拉取最新代码
git merge feat/user-auth
git push origin master
git branch -d feat/user-auth    # 删除本地分支
```

### 多环境分支模型

适合需要预发布验证的项目：

```
master    ──●──────────────●──── (生产)
             \            /
develop      ●──●──●──●──●──── (开发/测试)
                  \    /
feat/xxx           ●──●
```

分支角色：
- `master`：生产环境，只接受来自 `develop` 或 hotfix 的合并
- `develop`：开发主线，所有功能分支合并到这里
- `feat/xxx`：独立功能开发
- `fix/xxx`：从 `develop` 分出的 bug 修复
- `hotfix/xxx`：紧急修复，从 `master` 分出，合并回 `master` 和 `develop`

### 分支命名约定

| 前缀 | 用途 | 示例 |
|------|------|------|
| `feat/` | 新功能 | `feat/user-login`、`feat/search-filter` |
| `fix/` | Bug 修复 | `fix/navbar-flicker`、`fix/memory-leak` |
| `docs/` | 文档更新 | `docs/api-reference`、`docs/readme` |
| `refactor/` | 重构 | `refactor/auth-module` |
| `chore/` | 杂项（构建、依赖） | `chore/update-deps`、`chore/ci-setup` |
| `hotfix/` | 紧急线上修复 | `hotfix/payment-crash` |

## Commit 规范

### 约定式提交 (Conventional Commits)

格式：`<type>(<scope>): <subject>`

```
feat(auth): 添加 JWT 登录功能
fix(navbar): 修复移动端菜单闪烁问题
docs(api): 补充接口文档
refactor(utils): 提取公共日期处理函数
chore(deps): 升级 VitePress 到 1.6.4
```

**type 必须使用以下之一：**

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（既非新功能也非修复） |
| `perf` | 性能优化 |
| `test` | 添加或修改测试 |
| `chore` | 构建、依赖、工具配置 |
| `ci` | CI 配置变更 |

**scope 是可选的**，表示影响范围（模块、组件名）。**subject** 使用现在时，首字母小写，不加句号。

### 推荐 commit 习惯

**每次 commit 只做一件事：**

```bash
# 好
git add src/auth/login.ts
git commit -m "feat(auth): 添加登录页面 UI"

git add src/auth/login.test.ts
git commit -m "test(auth): 添加登录页面单元测试"

# 不好
git add .
git commit -m "feat: 登录页面、测试、修改配置、修了个小 bug"
```

**commit 之前查看改动：**

```bash
git diff            # 查看未暂存的改动
git diff --staged   # 查看已暂存的改动
git add -p          # 交互式暂存，选择性提交
```

## 常用操作

### 分支管理

```bash
# 创建并切换到新分支
git checkout -b feat/search

# 查看本地分支列表
git branch

# 查看本地和远程所有分支
git branch -a

# 删除本地分支（已合并）
git branch -d feat/search

# 强制删除本地分支（未合并）
git branch -D feat/search

# 删除远程分支
git push origin --delete feat/search

# 推送本地分支到远程，并建立追踪
git push -u origin feat/search
```

### 合并与变基

```bash
# 普通合并（保留分支历史）
git checkout master
git merge feat/search

# Squash 合并（所有 commit 压缩为一个）
git checkout master
git merge --squash feat/search
git commit -m "feat(search): 添加全文搜索功能"

# 交互式变基（整理本地 commit）
git rebase -i HEAD~3
# 在弹出的编辑器中：pick / squash / reword / drop

# 变基同步上游（保持线性历史）
git checkout feat/search
git rebase master
# 解决冲突后：
git add .
git rebase --continue
# 或放弃变基：
git rebase --abort
```

**变基 vs 合并选择建议：**
- 个人分支 → `rebase`，保持历史线性干净
- 合并到主分支 → `merge`，保留完整上下文
- 已经推送到远程的分支 → 不要 rebase

### 撤销操作

```bash
# 撤销工作区改动（未暂存）
git restore <file>

# 撤销暂存区改动
git restore --staged <file>

# 修改最近一次 commit 信息
git commit --amend -m "feat(auth): 添加 OAuth2.0 登录"

# 补充遗漏的文件到最近一次 commit
git add forgotten-file.ts
git commit --amend --no-edit

# 撤回最近一次 commit（保留改动）
git reset --soft HEAD~1

# 撤回最近一次 commit（丢弃改动）
git reset --hard HEAD~1
```

### Stash 暂存

```bash
# 暂存当前工作区改动
git stash

# 暂存并添加描述
git stash push -m "WIP: 搜索功能未完成"

# 查看 stash 列表
git stash list

# 恢复最近的 stash（保留 stash 记录）
git stash apply

# 恢复最近的 stash（删除 stash 记录）
git stash pop

# 恢复指定 stash
git stash apply stash@{2}

# 删除指定 stash
git stash drop stash@{1}

# 清空所有 stash
git stash clear
```

### 查看历史

```bash
# 简洁的一行日志
git log --oneline

# 带分支图的日志
git log --oneline --graph --all

# 查看文件的改动历史
git log -p <file>

# 查看某行代码是谁改的
git blame <file>

# 查看两次 commit 之间的差异
git diff HEAD~3..HEAD
git diff master..feat/search
```

## 常见问题处理

### 解决合并冲突

```bash
# 1. 发生冲突时，查看冲突文件
git status

# 2. 手动编辑冲突文件，删除冲突标记 (<<<<<<<, =======, >>>>>>>)

# 3. 标记为已解决
git add <conflicted-file>

# 4. 完成合并
git commit
```

### 不小心提交到了错误的分支

```bash
# 1. 在错误分支记下 commit hash
git log --oneline -1     # 假设是 abc1234

# 2. 切换到正确分支
git checkout feat/correct-branch

# 3. 把那个 commit 摘过来
git cherry-pick abc1234

# 4. 回到错误分支，撤回那次 commit
git checkout feat/wrong-branch
git reset --soft HEAD~1  # 保留代码改动
```

### 远程分支已被他人更新

```bash
# pull 时产生分叉：
#   你的本地:  A---B---C
#   远程:      A---B---D

# 方式一：rebase 保持线性
git pull --rebase origin master

# 方式二：merge 保留分叉历史
git pull origin master
```

如果已经 `git pull` 产生了一个多余的分叉 merge commit，可以通过 `git reset` 撤回后重新用 `--rebase` 拉取。

### 误删分支恢复

```bash
# 1. 找被删分支最后的 commit hash
git reflog

# 2. 从那个 commit 恢复分支
git checkout -b recovered-branch abc1234
```

## 常用别名配置

在 `~/.gitconfig` 中配置别名简化高频操作：

```ini
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  lg = log --oneline --graph --all -20
  unstage = restore --staged
  uncommit = reset --soft HEAD~1
  amend = commit --amend --no-edit
  pf = push --force-with-lease
```

此后 `git st` 等价于 `git status`，`git lg` 显示带图的日志，`git pf` 安全强制推送（不会覆盖他人提交）。

## 总结

- **分支命名**：用 `feat/`、`fix/`、`docs/` 前缀区分类型
- **Commit 信息**：遵循 `type(scope): subject` 格式，每次只做一件事
- **个人分支用 rebase** 保持线性历史，合并到主分支用 merge
- **遇到问题先用 `git status` 和 `git reflog`** 确认当前状态再操作
- **频繁提交、善于 stash**，避免一次 commit 包含过多改动