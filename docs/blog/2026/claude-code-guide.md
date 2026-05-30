---
title: Claude Code 使用指南与命令手册
date: 2026-05-30
tags: [Claude Code, AI编程, 开发工具, 效率提升, Claude]
summary: 全面深入的 Claude Code 使用指南，涵盖安装配置、命令手册、核心功能、Git集成、高级技巧及实战案例，帮助 Java/前端/全栈开发者用 AI 提升编码效率。
head:
  - - meta
    - name: description
      content: Claude Code 使用指南与命令手册——从入门到精通的全方位教程，涵盖 CLI 命令、配置详解、实战案例与最佳实践
---

# Claude Code 使用指南与命令手册

> **目标读者**：Java 后端开发工程师、前端开发工程师、全栈开发工程师、AI 编程初学者。
>
> **阅读建议**：第 1-3 章适合入门了解；第 4-6 章适合日常查阅；第 7-9 章适合进阶提升；第 10 章 FAQ 可遇到问题时按需查阅。

---

[[TOC]]

---

## 第1章 Claude Code 简介

### 1.1 什么是 Claude Code

**Claude Code** 是 Anthropic 推出的一款**命令行 AI 编程助手**（CLI Agent），它将 Claude 大模型的能力直接集成到终端中，让开发者可以在命令行环境下与 AI 进行自然语言交互，完成代码理解、编写、重构、调试等任务。

Claude Code 的核心设计理念是 **"Agentic Coding"（智能体编程）**——它不仅是一个被动的问答工具，而是一个能够主动理解项目结构、读取文件、执行命令、修改代码的智能体。

```bash
# Claude Code 的最简使用方式
claude "帮我分析这个 Spring Boot 项目的架构"
```

> **工作原理**：Claude Code 启动后，会自动扫描当前目录的项目结构，构建项目上下文，然后将你的问题连同项目信息一起发送给 Claude 模型。Claude 模型理解你的意图后，可以直接读取文件、搜索代码、执行命令，并给出具体的代码修改建议或直接帮你修改文件。

### 1.2 Claude Code 与 ChatGPT 的区别

| 维度 | Claude Code | ChatGPT |
|------|-------------|---------|
| **定位** | 命令行 AI 编程智能体 | 通用对话式 AI 助手 |
| **交互方式** | 终端 CLI，深度集成开发环境 | Web/App 聊天界面 |
| **项目感知** | 自动分析项目结构、读取文件、执行命令 | 需手动粘贴代码，无项目上下文 |
| **代码修改** | 可直接编辑文件、创建文件 | 仅在聊天中输出代码，需手动复制 |
| **终端操作** | 可执行 shell 命令、git 操作 | 不支持终端操作 |
| **模型** | Claude（Anthropic） | GPT（OpenAI） |
| **上下文窗口** | 极大（200K tokens） | 取决于版本 |
| **适用场景** | 专业开发工作流 | 通用问答、学习、简单代码片段 |

**通俗理解**：ChatGPT 是一个"聊天搭子"——你问它答，代码需要你手动复制粘贴到项目中。Claude Code 是一个"结对编程搭档"——它能直接看你的项目、改你的文件、跑你的命令。

### 1.3 Claude Code 与 Cursor 的区别

| 维度 | Claude Code | Cursor |
|------|-------------|--------|
| **产品形态** | CLI 命令行工具 | VS Code 深度定制的 IDE |
| **使用界面** | 终端文本界面 | 完整的图形化 IDE 界面 |
| **安装方式** | npm 全局安装 | 独立应用下载安装 |
| **项目感知** | 整个项目目录 | 工作区目录 |
| **代码编辑** | 终端内交互式编辑 | IDE 原生编辑器 + AI 内联补全 |
| **学习曲线** | 需要熟悉终端操作 | 接近 VS Code，上手快 |
| **灵活性** | 极高——任何终端环境都可用 | 依赖 Cursor IDE |
| **价格** | Claude API 按量计费 | 订阅制 |
| **适用人群** | 喜欢终端、追求灵活性的开发者 | 习惯 IDE 图形界面的开发者 |

> **补充说明**：两者不是互斥的，很多开发者同时使用 Cursor 做日常编码（利用其 AI Tab 补全），用 Claude Code 处理更复杂的跨文件重构、项目分析等任务。

### 1.4 Claude Code 与 GitHub Copilot 的区别

| 维度 | Claude Code | GitHub Copilot |
|------|-------------|----------------|
| **产品形态** | CLI 命令行智能体 | IDE 插件 |
| **工作方式** | 对话式，理解复杂任务 | 代码补全 + Chat 面板 |
| **主动性** | 主动读文件、改文件、执行命令 | 被动建议，等待开发者操作 |
| **任务复杂度** | 复杂多文件重构、架构分析 | 行级/函数级代码补全 |
| **上下文** | 全项目上下文 | 打开的文件 + 相邻 tab |
| **安装** | npm install -g | IDE 插件市场安装 |

### 1.5 Claude Code 适用场景

Claude Code 最适合以下场景：

1. **新项目快速搭建**：用自然语言描述需求，快速生成项目骨架
2. **代码理解与探索**：接手遗留代码时，让 AI 帮你梳理架构
3. **Bug 定位**：描述错误现象，Claude Code 自动搜索、定位、修复
4. **代码重构**：跨文件、跨模块的大规模重构
5. **测试编写**：为现有代码自动生成单元测试
6. **文档生成**：根据代码自动生成 API 文档、README
7. **Git 操作辅助**：自动生成 commit message、分析合并冲突
8. **终端自动化**：复杂的 shell 脚本生成和执行

### 1.6 Claude Code 核心能力

```
┌─────────────────────────────────────────────────┐
│                  Claude Code                     │
├─────────────────────────────────────────────────┤
│  📖 文件读取    │  读取任意项目文件作为上下文        │
│  ✏️  文件编辑    │  精确修改文件内容（字符串替换）    │
│  📝 文件创建    │  创建新文件                      │
│  🔍 代码搜索    │  ripgrep 驱动的全文搜索           │
│  🖥️  命令执行    │  执行 shell 命令并获取结果        │
│  🌐 网页搜索    │  在线搜索最新技术文档             │
│  📋 Git 集成    │  分支、提交、PR 全流程辅助         │
│  🤖 Agent 模式  │  Plan → Execute → Review 工作流  │
│  🧠 项目记忆    │  CLAUDE.md 持久化项目规则         │
└─────────────────────────────────────────────────┘
```

---

## 第2章 Claude Code 安装与配置

### 2.1 环境要求

#### 通用要求

- **Node.js**：>= 18.x（推荐 20.x LTS 或更高）
- **npm**：>= 9.x（随 Node.js 一起安装）
- **网络**：能够访问 `api.anthropic.com`
- **终端**：支持交互式 TTY 的终端模拟器

#### 各平台具体要求

| 平台 | 要求 |
|------|------|
| **Windows** | Windows 10 及以上；推荐使用 Windows Terminal 或 Git Bash，**不建议使用 cmd.exe** |
| **Linux** | 内核 3.10+；glibc 2.28+；支持 x64 和 arm64 |
| **macOS** | macOS 12 (Monterey) 及以上；支持 Intel 和 Apple Silicon |

### 2.2 安装流程

#### 步骤一：安装 Node.js

**Windows（推荐方式）**：

```bash
# 方式一：使用 WinGet（推荐）
winget install OpenJS.NodeJS.LTS

# 方式二：使用官方安装包
# 访问 https://nodejs.org 下载 LTS 版本安装
```

**macOS**：

```bash
# 使用 Homebrew
brew install node@20
```

**Linux（Ubuntu/Debian）**：

```bash
# 使用 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**验证安装**：

```bash
node --version   # 应输出 v20.x.x 或更高
npm --version    # 应输出 10.x.x 或更高
```

#### 步骤二：安装 Claude Code

```bash
# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

> **输出示例**：
> ```
> Claude Code v2.x.x
> Node.js v20.x.x
> ```

#### 步骤三：登录认证

```bash
# 交互式登录
claude login
```

登录流程：

1. 终端会显示一个一次性验证链接和验证码
2. 在浏览器中打开链接，输入验证码
3. 关联你的 Anthropic 账户（需要 API 额度或订阅）
4. 登录成功后终端显示 "Successfully authenticated"

```bash
# 输出示例
Opening a one-time login page in your browser...
If the browser doesn't open, visit:
  https://claude.ai/code/login?code=XXXX-XXXX

✓ Successfully authenticated as <your-email>
```

### 2.3 常见安装问题

#### 问题1：网络问题（中国大陆用户）

**现象**：

```
npm ERR! network timeout
npm ERR! network This is a problem related to network connectivity.
```

**解决方案**：

```bash
# 方式一：配置 npm 镜像源
npm config set registry https://registry.npmmirror.com

# 方式二：使用代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 重新安装
npm install -g @anthropic-ai/claude-code
```

#### 问题2：登录失败

**现象**：

```
Error: Authentication failed
```

**常见原因与解决方案**：

| 原因 | 解决方案 |
|------|----------|
| API 额度不足 | 检查 Anthropic Console 余额 |
| 网络无法访问 api.anthropic.com | 配置代理或 VPN |
| 浏览器未自动打开 | 手动复制终端中显示的链接到浏览器 |
| 账户未激活 Claude Code 权限 | 确认账户已开通 API 访问 |

```bash
# 查看当前登录状态
claude whoami

# 如果登录过期，重新登录
claude logout
claude login
```

#### 问题3：权限问题（Linux/macOS）

**现象**：

```
Error: EACCES: permission denied
```

**解决方案**：

```bash
# 方式一：修改 npm 全局目录权限
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 然后重新安装
npm install -g @anthropic-ai/claude-code
```

#### 问题4：Windows PowerShell 执行策略

**现象**：

```
File cannot be loaded because running scripts is disabled on this system.
```

**解决方案**：

```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 确认更改
Get-ExecutionPolicy -Scope CurrentUser
# 输出：RemoteSigned
```

---

## 第3章 Claude Code 配置文件详解

### 3.1 配置文件体系

Claude Code 的配置文件分为三个层级，优先级从高到低：

```
┌──────────────────────────────────────┐
│  项目级配置                           │  优先级最高
│  .claude/settings.json               │  仅对当前项目生效
├──────────────────────────────────────┤
│  用户级配置                           │
│  ~/.claude/settings.json             │  对所有项目生效
├──────────────────────────────────────┤
│  系统默认配置                         │  优先级最低
│  内置默认值                          │
└──────────────────────────────────────┘
```

### 3.2 .claude 目录结构

在一个项目中，`.claude/` 目录包含以下内容：

```
项目根目录/
└── .claude/
    ├── settings.json          # 项目级配置文件
    ├── CLAUDE.md              # 自定义指令（项目规则）
    ├── memory/                # 持久化记忆目录
    │   └── *.md              # 每条记忆一个文件
    ├── plans/                 # Plan 模式生成的计划文件
    ├── workflows/             # 自定义 Workflow 脚本
    ├── worktrees/             # git worktree 隔离目录
    └── scheduled_tasks.json   # 持久化定时任务
```

### 3.3 用户级配置详解（~/.claude/settings.json）

用户级配置文件位于用户主目录下的 `.claude/settings.json`，对所有项目生效。

#### 完整配置示例

```json
{
  "model": "claude-sonnet-4-6",
  "theme": "dark",
  "hasCompletedOnboarding": true,
  "permissions": {
    "allow": [
      "Bash(npm test)",
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(git diff *)",
      "Bash(git status)",
      "Bash(git log *)",
      "Bash(node --version)",
      "Bash(ls *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push *)",
      "Bash(git push --force *)"
    ]
  },
  "autoApprove": false,
  "customInstructions": ""
}
```

### 3.4 项目级配置详解（.claude/settings.json）

项目级配置与用户级格式相同，但只对当前项目生效，且优先级更高。

```json
{
  "model": "claude-opus-4-8",
  "permissions": {
    "allow": [
      "Bash(mvn *)",
      "Bash(npm *)",
      "Bash(java *)"
    ]
  }
}
```

### 3.5 配置项详细说明

#### model

指定使用的 Claude 模型。

```json
{
  "model": "claude-sonnet-4-6"
}
```

| 可选值 | 说明 | 适用场景 |
|--------|------|----------|
| `claude-sonnet-4-6` | 默认模型，速度快、成本低 | 日常开发 |
| `claude-opus-4-8` | 最强大的模型，推理能力最强 | 复杂重构、架构分析 |
| `claude-haiku-4-5-20251001` | 最快的模型 | 简单任务、批量处理 |

#### permissions

控制 Claude Code 可以执行哪些操作。

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test)",
      "Bash(git diff *)",
      "WebSearch(* search *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  }
}
```

**权限类型**：

| 权限 | 说明 |
|------|------|
| `Bash(command)` | 允许/禁止执行特定 shell 命令 |
| `WebSearch(query)` | 允许/禁止网络搜索 |
| `WebFetch(url)` | 允许/禁止抓取网页 |
| `Read(path)` | 允许/禁止读取文件 |
| `Edit(path)` | 允许/禁止编辑文件 |
| `Write(path)` | 允许/禁止写入文件 |

**通配符支持**：使用 `*` 匹配任意字符。

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",          // 允许所有 git 命令
      "Bash(npm *)",          // 允许所有 npm 命令
      "Bash(npm test *)"      // 允许 npm test 及其子命令
    ]
  }
}
```

#### theme

设置终端界面主题。

```json
{
  "theme": "dark"
}
```

| 可选值 | 说明 |
|--------|------|
| `dark` | 深色主题（默认） |
| `light` | 浅色主题 |
| `system` | 跟随系统设置 |

#### hasCompletedOnboarding

是否已完成新手引导。

```json
{
  "hasCompletedOnboarding": true
}
```

设为 `true` 后，首次启动时不再显示引导信息。

#### autoApprove

是否自动批准所有操作（**不推荐在生产环境开启**）。

```json
{
  "autoApprove": false
}
```

> **⚠️ 安全警告**：开启 `autoApprove` 意味着 Claude Code 可以自动执行任何命令——包括 `rm -rf`、`git push --force` 等危险操作。仅在安全的沙箱环境中考虑使用。

#### customInstructions

自定义指令，会被附加到每次对话的 system prompt 中。

```json
{
  "customInstructions": "使用中文回答。遵循 Google Java Style Guide。所有代码需要添加中文注释。"
}
```

### 3.6 配置文件最佳实践

**推荐配置策略**：

```
用户级 settings.json  ← 放通用配置（model, theme, 通用 allow 规则）
       │
       ▼
项目级 settings.json  ← 放项目专用配置（项目特定 allow/deny 规则）
       │
       ▼
项目 CLAUDE.md       ← 放项目规则和编码规范（不受 settings.json 影响）
```

```json
// 推荐的用户级 ~/.claude/settings.json
{
  "model": "claude-sonnet-4-6",
  "theme": "dark",
  "hasCompletedOnboarding": true,
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(ls *)",
      "Bash(node --version)",
      "Bash(npm --version)",
      "Bash(java --version)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Bash(sudo *)"
    ]
  }
}
```

---

## 第4章 Claude Code 命令手册

本章是 Claude Code 所有 CLI 命令的完整参考手册。每个命令包含：功能说明、语法格式、参数说明、使用示例、输出示例、适用场景。

### 4.1 claude —— 主命令

**功能说明**：启动 Claude Code 交互式会话，或执行单次查询。不带参数时进入 REPL（交互式循环）模式；带参数时执行单次查询并返回结果。

**语法格式**：

```bash
claude [options] [prompt]
```

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| `prompt` | string（可选） | 直接提出的问题或任务描述 |
| `--version`, `-v` | flag | 显示版本号 |
| `--help`, `-h` | flag | 显示帮助信息 |
| `--model` | string | 指定使用的模型 |
| `--cwd` | string | 指定工作目录 |
| `--output-format` | string | 输出格式（`text`、`json`、`stream-json`） |
| `--max-turns` | number | 最大交互轮次 |
| `--verbose` | flag | 详细输出模式 |
| `-p`, `--print` | flag | 非交互式输出 |

**使用示例**：

```bash
# 进入交互式会话
claude

# 单次查询
claude "这个项目用了哪些依赖？"

# 指定工作目录
claude --cwd /path/to/project "分析项目结构"

# 指定模型
claude --model claude-opus-4-8 "重构这个模块"

# 非交互式输出
claude -p "列出所有 Java 文件"

# JSON 格式输出
claude --output-format json "分析项目结构" > analysis.json
```

**适用场景**：

- 日常开发中的所有 AI 交互——从代码理解到 Bug 修复
- 进入交互式会话 → 适合多轮对话、复杂任务
- 单次查询模式 → 适合 CI/CD 集成、脚本调用

---

### 4.2 claude login —— 登录认证

**功能说明**：登录 Anthropic 账户，将 Claude Code 与你的 API 额度关联。

**语法格式**：

```bash
claude login [options]
```

**使用示例**：

```bash
# 标准登录（交互式）
claude login

# 使用 API Key 直接登录（非交互式）
claude login --api-key sk-ant-api03-xxxxxxxxxxxxx

# 使用 OAuth 登录
claude login --oauth
```

**登录流程输出示例**：

```
Opening a one-time login page in your browser...
If the browser doesn't open, visit:
  https://claude.ai/code/login?code=ABCD-EFGH

✓ Successfully authenticated as user@example.com
  Organization: MyOrg
  API credits remaining: $25.00
```

**适用场景**：

- 首次安装后
- 登录状态过期后重新认证
- 切换账户

**注意事项**：

- API Key 登录适用于 CI/CD 环境（设置 `ANTHROPIC_API_KEY` 环境变量为不交互方式）
- 交互式登录生成的 token 有有效期，过期需重新登录

---

### 4.3 claude logout —— 登出

**功能说明**：清除本地存储的登录凭证。

**语法格式**：

```bash
claude logout
```

**使用示例**：

```bash
# 登出当前账户
claude logout

# 输出示例
✓ Successfully logged out
```

**适用场景**：

- 切换 Anthropic 账户
- 在公用/共享机器上清理凭证

---

### 4.4 claude update —— 更新

**功能说明**：检查并更新 Claude Code 到最新版本。

**语法格式**：

```bash
claude update [options]
```

**参数说明**：

| 参数 | 说明 |
|------|------|
| `--check` | 仅检查是否有更新，不安装 |

**使用示例**：

```bash
# 检查并更新到最新版
claude update

# 仅检查（不更新）
claude update --check

# 输出示例（有更新时）
Found new version: v2.5.0 (current: v2.4.1)
Installing update...
✓ Successfully updated to v2.5.0
```

**适用场景**：

- 定期检查新功能
- 遇到 bug 时确认是否为版本问题

**注意事项**：

- 更新过程中 Claude Code 会暂时不可用
- 建议在非工作时更新，或先用 `--check` 确认

---

### 4.5 claude config —— 配置管理

**功能说明**：查看和修改 Claude Code 的配置项。支持用户级和项目级配置。

**语法格式**：

```bash
claude config [command] [options]
```

**子命令**：

| 子命令 | 说明 |
|--------|------|
| `claude config list` | 列出所有当前配置 |
| `claude config get <key>` | 获取特定配置项的值 |
| `claude config set <key> <value>` | 设置配置项 |
| `claude config unset <key>` | 删除配置项 |
| `claude config edit` | 在编辑器中打开配置文件 |

**使用示例**：

```bash
# 列出当前所有配置
claude config list

# 获取当前模型设置
claude config get model

# 设置模型为 Opus
claude config set model claude-opus-4-8

# 在编辑器中打开用户级配置文件
claude config edit

# 编辑项目级配置
claude config edit --project

# 添加允许的命令
claude config set permissions.allow '["Bash(npm *)", "Bash(git *)"]'
```

**输出示例**：

```bash
$ claude config list
┌─────────────────────────────┬──────────────────────┬──────────┐
│ Key                         │ Value                │ Source   │
├─────────────────────────────┼──────────────────────┼──────────┤
│ model                       │ claude-sonnet-4-6    │ user     │
│ theme                       │ dark                 │ user     │
│ hasCompletedOnboarding      │ true                 │ user     │
│ autoApprove                 │ false                │ default  │
└─────────────────────────────┴──────────────────────┴──────────┘
```

**适用场景**：

- 调整模型（日常用 Sonnet、复杂任务用 Opus）
- 配置权限规则
- 切换主题

---

### 4.6 claude doctor —— 诊断工具

**功能说明**：诊断 Claude Code 的运行环境，检查 Node.js 版本、网络连接、认证状态、配置文件等。

**语法格式**：

```bash
claude doctor [options]
```

**使用示例**：

```bash
# 运行完整诊断
claude doctor

# 仅检查网络连接
claude doctor --network

# 输出为 JSON 格式（方便 CI 集成）
claude doctor --json
```

**输出示例**：

```
Claude Code Doctor
==================

✓ Node.js: v20.12.0
✓ npm: v10.5.0
✓ Authentication: Logged in as user@example.com
✓ Network: api.anthropic.com reachable (latency: 85ms)
✓ Config: ~/.claude/settings.json valid
✓ Git: git version 2.44.0
✓ OS: Linux 6.5.0 (x64)

All checks passed! Claude Code is ready to use.
```

**适用场景**：

- 安装后验证环境
- 排查无法连接或认证问题
- CI/CD 环境前置检查

---

### 4.7 claude help —— 帮助

**功能说明**：显示 Claude Code 的帮助信息，包括可用命令和快速入门指引。

**语法格式**：

```bash
claude help [command]
```

**使用示例**：

```bash
# 显示总体帮助
claude help

# 显示特定命令帮助
claude help config

# 显示快捷键帮助
claude help shortcuts
```

---

### 4.8 claude whoami —— 查看当前用户

**功能说明**：查看当前登录的用户信息。

**语法格式**：

```bash
claude whoami
```

**输出示例**：

```
Logged in as: user@example.com
Organization: MyOrg (org_xxxxxxxxxxxxx)
API credits: $18.42 remaining
```

**适用场景**：

- 确认当前登录账户
- 检查 API 余额

---

### 4.9 claude mcp —— MCP 服务器管理

**功能说明**：管理 Model Context Protocol (MCP) 服务器——Claude Code 通过 MCP 可扩展额外的工具和数据源。

**语法格式**：

```bash
claude mcp [command]
```

**子命令**：

| 子命令 | 说明 |
|--------|------|
| `claude mcp add <name> <command>` | 添加 MCP 服务器 |
| `claude mcp remove <name>` | 移除 MCP 服务器 |
| `claude mcp list` | 列出所有 MCP 服务器 |
| `claude mcp get <name>` | 查看 MCP 服务器详情 |

**使用示例**：

```bash
# 添加一个本地 MCP 服务器
claude mcp add filesystem npx @anthropic-ai/mcp-server-filesystem /path/to/data

# 列出所有 MCP 服务器
claude mcp list

# 查看详情
claude mcp get filesystem

# 移除
claude mcp remove filesystem
```

**适用场景**：

- 需要 Claude Code 访问数据库（PostgreSQL MCP server）
- 需要访问外部 API（如 GitHub MCP server）
- 扩展文件系统访问范围

---

### 4.10 终端内快捷键速查

在交互模式（REPL）中，支持以下快捷键：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 中断当前操作 |
| `Ctrl + D` | 退出 Claude Code |
| `Ctrl + L` | 清屏 |
| `Ctrl + R` | 搜索历史命令 |
| `↑ / ↓` | 浏览历史命令 |
| `Tab` | 自动补全文件路径 |
| `Ctrl + O` | 在编辑器中打开对话 |
| `Esc` | 退出当前模式（如文件预览） |
| `Enter` | 发送消息（单行模式） |
| `Alt + Enter` | 换行（多行输入） |

### 4.11 交互模式内置命令（Slash Commands）

在交互式 REPL 会话中，除了 CLI 命令行参数外，Claude Code 还提供了一套 **斜杠命令（Slash Commands）**，以 `/` 开头，在对话中直接输入即可触发特定功能。

#### /help —— 帮助

**功能说明**：显示交互模式下的所有可用命令和快捷键。

**语法格式**：

```bash
/help
```

**适用场景**：忘记某个命令时快速查阅。

---

#### /clear —— 清空上下文

**功能说明**：清除当前会话的所有对话历史，释放上下文窗口。**注意：不会影响文件修改结果，只清空对话记忆。**

**语法格式**：

```bash
/clear
```

**使用示例**：

```
你：/clear
Claude Code：
✓ 上下文已清空。CLAUDE.md 将在下次对话中重新加载。
```

**适用场景**：

- 话题完全切换（如从 Bug 修复转到新功能开发）
- 上下文变长导致响应变慢时
- 之前给了错误引导信息需要"重来"

**注意事项**：

- `/clear` 后项目修改仍然保留（文件不会被撤销）
- CLAUDE.md 内容会在下次对话中重新注入
- 不会清除 `/memory` 保存的持久化记忆

---

#### /plan —— 计划模式

**功能说明**：进入 **Plan 模式（只读模式）**。在此模式下，Claude Code 只能分析和规划，**不能修改任何文件或执行任何写操作**。适合制定方案后由人工审核再执行。

**语法格式**：

```bash
/plan
```

**使用示例**：

```
你：/plan 我需要将单体应用拆分为微服务，帮我制定迁移方案。

Claude Code：[进入 Plan 模式]
[只读分析项目结构]
[输出详细计划但不修改任何代码]

## 微服务拆分方案

### 第一阶段：引入 Spring Cloud 基础设施
- 添加依赖：spring-cloud-starter-gateway, nacos...
- 创建 gateway 模块...

### 第二阶段：数据库拆分
- order_db 独立部署
- user_db 独立部署...

是否批准此方案？批准后我将开始执行。
```

**适用场景**：

- 大规模重构前需要方案审核
- 不确定 AI 方案是否合理时先让 AI 出 Plan
- 团队协作时先沟通方案再动手

**注意事项**：

- 在 Plan 模式下 Claude Code 使用只读工具（Read、Grep、Glob）
- 退出 Plan 模式后才会执行写操作
- 最佳实践：`/plan` → 人工审核 → 批准执行 → `/review`

---

#### /compact —— 压缩上下文

**功能说明**：将当前长对话进行**摘要压缩**，把历史对话内容总结成一个紧凑的摘要文本，释放上下文窗口空间，同时保留关键信息。

**语法格式**：

```bash
/compact
```

**工作原理**：Claude Code 将之前的对话历史发送给模型进行总结提炼，然后将原文替换为摘要文本。这样在 token 限制内能容纳更长的有效工作历史。

**使用示例**：

```
你：/compact
Claude Code：
✓ 上下文已压缩。
  压缩前：~85,000 tokens
  压缩后：~12,000 tokens
  释放空间：~73,000 tokens

摘要保留的关键信息：
- 项目是 Spring Boot 2.7 订单服务
- 正在重构 Service 层为异步实现
- 已完成 AsyncConfig 配置、OrderService 改造
- 当前进度：待完成 Controller 层适配
```

**适用场景**：

- 长时间对话后 token 接近上限时
- 既想保留上下文连续性又想继续新任务
- 在 `/clear` 太重（丢失所有上下文）和完全不清理之间做折中

**注意事项**：

- 压缩可能丢失细节信息，关键决策点建议在压缩前手动记录
- 压缩后模型仍知道"之前做了什么"，但具体细节可能模糊
- 和 `/clear` 的区别：`/compact` 保留摘要，`/clear` 全部丢弃

---

#### /memory —— 持久化记忆

**功能说明**：打开记忆管理界面，保存/查看/删除持久化的项目或个人偏好记忆。这些记忆会跨会话保留。

**语法格式**：

```bash
/memory
```

**使用示例**：

```
你：/memory

Claude Code：
[显示记忆管理界面]

📝 已保存的记忆：

1. user-preference (2026-05-22)
   "用户偏好使用中文回答，代码注释也用中文"

2. project-arch (2026-05-23)
   "order-service 是 Spring Boot 2.7 项目，分层架构"

3. db-config (2026-05-25)
   "开发环境数据库连接：localhost:3306/order_db"

[选项] 添加 / 查看 / 删除 / 退出
```

**适用场景**：

- 记录项目特有的非代码知识（架构决策、环境配置等）
- 保存用户偏好（语言、风格、工具选择）
- 跨会话共享上下文信息

**注意事项**：

- 记忆存储在 `.claude/memory/` 目录下，每个记忆一个 `.md` 文件
- 持久化记忆会跨会话保留，直到手动删除
- 与 CLAUDE.md 的区别：`/memory` 是对话中动态添加的；CLAUDE.md 是预先写好的静态规则

---

#### /config —— 配置管理

**功能说明**：在交互模式中查看和修改 Claude Code 配置，等效于 `claude config` 命令。

**语法格式**：

```bash
/config [action] [key] [value]
```

**使用示例**：

```
你：/config list

Claude Code：
┌──────────────────────┬───────────────────┬──────────┐
│ Key                  │ Value             │ Source   │
├──────────────────────┼───────────────────┼──────────┤
│ model                │ claude-sonnet-4-6 │ user     │
│ theme                │ dark              │ user     │
│ hasCompletedOnboarding│ true             │ user     │
└──────────────────────┴───────────────────┴──────────┘

你：/config set model claude-opus-4-8
Claude Code：
✓ model 已设置为 claude-opus-4-8（用户级配置）
```

**适用场景**：在交互会话中临时切换模型或调整权限。

---

#### /cost —— 用量统计

**功能说明**：查看当前会话的 **Token 消耗和 API 费用**。

**语法格式**：

```bash
/cost
```

**输出示例**：

```
你：/cost

Claude Code：
📊 当前会话用量
┌──────────────┬──────────┬──────────┐
│              │ 本次会话  │ 总计     │
├──────────────┼──────────┼──────────┤
│ 输入 tokens  │ 45,230   │ 128,500  │
│ 输出 tokens  │ 12,800   │ 38,200   │
│ 总 tokens    │ 58,030   │ 166,700  │
│ 估算费用     │ $0.48    │ $1.35    │
└──────────────┴──────────┴──────────┘
```

**适用场景**：

- 控制 API 使用成本
- 评估任务复杂度（复杂任务消耗更多 token）
- 决定是否需要 `/compact` 或 `/clear`

---

#### /doctor —— 环境诊断

**功能说明**：在交互模式中运行环境诊断（等效于 `claude doctor`）。

**语法格式**：

```bash
/doctor
```

**适用场景**：Claude Code 行为异常时排查环境问题。

---

#### /model —— 模型切换

**功能说明**：查看或切换当前使用的 Claude 模型。

**语法格式**：

```bash
/model [model-name]
```

**使用示例**：

```
你：/model

Claude Code：
当前模型：claude-sonnet-4-6
可用模型：
  - claude-haiku-4-5-20251001 (最快)
  - claude-sonnet-4-6 (推荐，日常开发)
  - claude-opus-4-8 (最强推理)

你：/model claude-opus-4-8
Claude Code：
✓ 已切换到 claude-opus-4-8（仅本次会话生效）
```

**适用场景**：

- 遇到复杂问题需要更强推理能力时临时切 Opus
- 简单任务切 Haiku 以降低成本

**注意事项**：

- 交互模式中 `/model` 切换**仅对当前会话生效**
- 永久切换使用 `claude config set model` 或在 settings.json 中设置

---

#### /init —— 项目初始化

**功能说明**：为当前项目自动生成 `CLAUDE.md` 文件，分析项目结构后填入项目规则和编码规范。

**语法格式**：

```bash
/init
```

**使用示例**：

```
你：/init

Claude Code：
[扫描项目结构...]
[分析 pom.xml、application.yml、包结构...]

✓ 已创建 CLAUDE.md，包含以下内容：
  - 项目概述（Spring Boot 2.7 订单服务）
  - 技术栈（MyBatis Plus + Redis + MySQL）
  - 编码规范（分层架构、命名约定）
  - 推荐工作流

文件位置：d:\code\github.io\CLAUDE.md
是否需要编辑？(y/n)
```

**适用场景**：

- 首次在项目中使用 Claude Code
- 为新项目快速建立 AI 工作规则

---

#### /permissions —— 权限管理

**功能说明**：在交互模式中管理工具权限，临时的 allow/deny 规则（仅对当前会话生效）。

**语法格式**：

```bash
/permissions [action] [tool]
```

**使用示例**：

```
你：/permissions allow "Bash(npm test)"
Claude Code：
✓ 已临时允许：Bash(npm test)（仅本次会话有效）

你：/permissions list
Claude Code：
当前会话临时权限：
  ✓ Bash(npm test)      [临时允许]
  ✓ Bash(git status)    [用户配置]
  ✗ Bash(rm -rf *)      [用户配置]
```

**适用场景**：需要在当前会话中临时执行某个被全局禁止的命令。

**注意事项**：

- 交互模式中的 `/permissions` 修改仅对当前会话有效
- 永久修改使用 `claude config set permissions.allow` 或编辑 settings.json

---

#### /add-dir —— 添加工作目录

**功能说明**：向当前工作区添加额外的目录，让 Claude Code 能够跨多个项目目录工作。

**语法格式**：

```bash
/add-dir <directory-path>
```

**使用示例**：

```
你：/add-dir ../user-service

Claude Code：
✓ 已添加 ../user-service 到工作区。
  当前工作区目录：
    - d:\code\order-service (主目录)
    - d:\code\user-service (已添加)
```

**适用场景**：

- 跨服务/跨项目分析代码依赖关系
- 微服务项目中需要同时查看多个服务的代码

---

#### /ide —— IDE 集成

**功能说明**：管理与 IDE（VS Code、JetBrains）的集成状态。

**语法格式**：

```bash
/ide
```

**适用场景**：在 VS Code 或 JetBrains IDE 中使用 Claude Code 时管理集成状态。

---

#### /status —— 会话状态

**功能说明**：显示当前会话的完整状态信息——模型、工作目录、上下文窗口使用量、Git 分支、后台任务等。

**语法格式**：

```bash
/status
```

**输出示例**：

```
你：/status

Claude Code：
📊 会话状态
┌─────────────────────┬──────────────────────────────┐
│ 模型                │ claude-sonnet-4-6            │
│ 工作目录            │ d:\code\order-service        │
│ Git 分支            │ feature/order-refactor       │
│ 上下文使用          │ 58,030 / 200,000 tokens (29%)│
│ 消息数              │ 24                           │
│ 后台任务            │ 0                            │
│ 会话时长            │ 18 分钟                      │
└─────────────────────┴──────────────────────────────┘
```

**适用场景**：

- 查看上下文窗口还剩多少空间
- 确认当前模型和工作目录
- 检查是否有未完成的后台任务

---

#### /tasks —— 后台任务

**功能说明**：查看当前会话中正在运行的**后台任务**（异步执行的 shell 命令或 agent）。

**语法格式**：

```bash
/tasks
```

**使用示例**：

```
你：/tasks

Claude Code：
🔧 后台任务 (2)
┌────────────────────┬──────────┬─────────────┐
│ 任务               │ 状态     │ 运行时间     │
├────────────────────┼──────────┼─────────────┤
│ npm run build      │ 运行中   │ 45s         │
│ git fetch origin   │ 已完成   │ 12s         │
└────────────────────┴──────────┴─────────────┘
```

**适用场景**：

- 查看异步构建/测试任务的进度
- 管理长时间运行的后台命令

---

#### /review —— 代码审查

**功能说明**：对当前未提交的代码变更（暂存区或工作区）进行代码审查，检查潜在的 Bug、性能问题和安全隐患。

**语法格式**：

```bash
/review
```

**使用示例**：

```
你：/review

Claude Code：
[分析 git diff...]

## 代码审查报告

### 🔴 严重问题 (1)
- OrderService.java:145 — updateStock方法缺少事务注解
  → 可能导致库存数据不一致

### 🟡 建议优化 (3)
- AsyncConfig.java:18 — 线程池队列容量过大(1000)，建议降低
- OrderMapper.java — 分页查询未使用索引，建议添加复合索引
- OrderController.java:67 — 缺少参数校验

### 🟢 通过项
- 命名规范 ✓
- 异常处理 ✓
- 日志记录 ✓
```

**适用场景**：

- 提交代码前的最后检查
- Pull Request 前的自查
- 团队 Code Review 的辅助工具

**注意事项**：

- 默认审查工作区未暂存的变更
- 可通过参数指定审查范围（如 `/review HEAD~3..HEAD`）
- 配合 `/code-review` 技能使用可获得更详细的分析

---

#### /skills —— 技能列表

**功能说明**：列出当前可用的 Claude Code **技能（Skills）**——技能是预设的专业化工作流程，可以通过 `/skill-name` 触发。

**语法格式**：

```bash
/skills
```

**输出示例**：

```
你：/skills

Claude Code：
📦 可用技能
┌──────────────────────────┬──────────────────────────────────────┐
│ 技能                     │ 说明                                 │
├──────────────────────────┼──────────────────────────────────────┤
│ code-review              │ 对代码变更进行深度审查                 │
│ frontend-design          │ 创建高质量前端界面                     │
│ deep-research            │ 多源深度研究报告                       │
│ claude-api               │ Claude API 开发与调试                  │
│ security-review          │ 安全漏洞审查                           │
│ init                     │ 初始化项目 CLAUDE.md                  │
│ verify                   │ 验证代码变更效果                       │
└──────────────────────────┴──────────────────────────────────────┘
```

**适用场景**：查看有哪些可用的专业工作流可以调用。

---

#### /agents —— 子代理

**功能说明**：列出可用的**子代理类型（Agent Types）**及其能力描述。

**语法格式**：

```bash
/agents
```

**适用场景**：了解可用的专业化子代理（Plan、Explore、general-purpose 等）来委派复杂任务。

---

#### /workflows —— 工作流

**功能说明**：查看自定义或多代理编排的 **Workflow 状态**。

**语法格式**：

```bash
/workflows
```

**适用场景**：监控多代理编排任务（Workflow）的执行进度。

---

#### /mcp —— MCP 管理

**功能说明**：在交互模式中管理 MCP（Model Context Protocol）服务器。

**语法格式**：

```bash
/mcp [list|add|remove]
```

**使用示例**：

```
你：/mcp list

Claude Code：
📡 MCP 服务器 (2)
┌──────────────┬──────────┬──────────────────────────────────┐
│ 名称         │ 状态     │ 命令                             │
├──────────────┼──────────┼──────────────────────────────────┤
│ filesystem   │ ✓ 运行中 │ npx @anthropic-ai/mcp-server-... │
│ postgres     │ ✓ 运行中 │ npx @anthropic-ai/mcp-server-... │
└──────────────┴──────────┴──────────────────────────────────┘
```

**适用场景**：管理数据库连接、外部 API 集成等 MCP 扩展。

---

#### 交互模式命令速查表

| 命令 | 用途 | 持久性 |
|------|------|--------|
| `/help` | 显示帮助 | — |
| `/clear` | 清空对话上下文 | 仅本次 |
| `/plan` | 进入只读规划模式 | 仅本次 |
| `/compact` | 压缩对话历史 | 仅本次 |
| `/memory` | 管理持久化记忆 | **跨会话** |
| `/config` | 查看/修改配置 | 永久 |
| `/cost` | 查看 Token 用量 | — |
| `/doctor` | 环境诊断 | — |
| `/model` | 切换模型 | 仅本次 |
| `/init` | 初始化 CLAUDE.md | 永久 |
| `/permissions` | 临时权限管理 | 仅本次 |
| `/add-dir` | 添加工作目录 | 仅本次 |
| `/ide` | IDE 集成管理 | — |
| `/status` | 查看会话状态 | — |
| `/tasks` | 查看后台任务 | — |
| `/review` | 代码审查 | — |
| `/skills` | 列出可用技能 | — |
| `/agents` | 列出子代理类型 | — |
| `/workflows` | 工作流状态 | — |
| `/mcp` | MCP 管理 | 永久 |

---

## 第5章 Claude Code 核心功能

### 5.1 项目分析

**工作原理**：Claude Code 启动时会扫描项目目录，识别项目类型（Maven、Gradle、npm 等），构建文件索引。当你提出分析请求时，Claude Code 使用 ripgrep 搜索相关代码、读取关键文件，然后将这些上下文连同你的问题一起发送给 Claude 模型，生成结构化的分析报告。

**实战案例：分析 Spring Boot 项目架构**

```bash
# 在 Spring Boot 项目根目录下启动 Claude Code
cd ~/projects/order-service
claude
```

对话示例：

```
你：请分析这个 Spring Boot 项目的架构，包括：
    1. 整体模块结构
    2. 各层的职责
    3. 核心依赖
    4. 可能存在的问题

Claude Code：
[读取 pom.xml、application.yml、主启动类、各层关键文件]

这个项目采用经典的 分层架构（Layered Architecture）：

## 1. 模块结构

order-service/
├── controller/     # 接口层：处理 HTTP 请求
│   ├── OrderController.java
│   └── OrderQueryController.java
├── service/        # 业务层：核心业务逻辑
│   ├── OrderService.java
│   └── impl/
│       └── OrderServiceImpl.java
├── mapper/         # 持久层：MyBatis 接口
│   └── OrderMapper.java
├── entity/         # 实体类
│   └── Order.java
├── dto/            # 数据传输对象
│   ├── OrderCreateDTO.java
│   └── OrderQueryDTO.java
├── config/         # 配置类
│   ├── RedisConfig.java
│   └── SwaggerConfig.java
└── exception/      # 全局异常处理
    └── GlobalExceptionHandler.java

## 2. 各层职责

Controller → Service → Mapper → Database
    ↓           ↓
   DTO        Entity

## 3. 核心依赖

- Spring Boot 2.7.x
- MyBatis Plus 3.5.x
- Redis (Lettuce 客户端)
- MySQL 8.0

## 4. 潜在问题

1. OrderService 过于臃肿（1500+ 行），建议拆分
2. 缺少 Service 层单元测试
3. pom.xml 中存在版本冲突
```

> **最佳实践**：分析前先用 `/clear` 清空上下文，然后在一次对话中集中提问，获得更连贯的分析结果。

---

### 5.2 代码生成

**工作原理**：Claude Code 通过理解你的需求描述、参考项目中已有的代码风格，生成符合项目规范的代码。它先读取相关文件了解模式，再生成代码并通过 `Write` 或 `Edit` 工具创建/修改文件。

**实战案例：生成 CRUD 接口**

在 Spring Boot 项目中为一个新的 `Product`（商品）实体生成完整的 CRUD 接口：

```
你：帮我创建一个 Product 实体的完整 CRUD，包含：
    - 实体类（id, name, price, stock, category, createTime）
    - Mapper 接口（继承 MyBatis Plus BaseMapper）
    - Service 层
    - Controller（RESTful API）
    - 请求/响应 DTO
    请遵循项目中已有的代码风格。

Claude Code：
[先读取已有的 Order 相关代码学习风格]
[然后依次生成以下文件]
```

生成的文件结构：

```
└── src/main/java/com/example/order/
    ├── entity/
    │   └── Product.java          ← 新增
    ├── mapper/
    │   └── ProductMapper.java    ← 新增
    ├── dto/
    │   ├── ProductCreateDTO.java ← 新增
    │   └── ProductVO.java        ← 新增
    ├── service/
    │   ├── ProductService.java   ← 新增
    │   └── impl/
    │       └── ProductServiceImpl.java ← 新增
    └── controller/
        └── ProductController.java ← 新增
```

> **最佳实践**：明确说明"遵循已有代码风格"，Claude Code 会先阅读既有代码再生成，保证风格一致性。

---

### 5.3 Bug 排查

**工作原理**：你描述问题现象 → Claude Code 搜索相关日志和代码 → 分析调用链路 → 定位根因 → 提出修复方案。这背后是 ripgrep 全文搜索 + 文件读取 + 模型推理的组合。

**实战案例：定位 Redis 连接异常**

场景：Spring Boot 应用启动后间歇性报 Redis 连接超时。

```
你：应用启动后偶发 Redis 连接超时，日志显示：
    "RedisConnectionFailureException: Unable to connect to Redis"
    帮我排查原因。

Claude Code：
[搜索 Redis 相关配置]
[读取 application.yml、RedisConfig.java、pom.xml]
[分析依赖版本]

## 分析结果

### 问题根因
Lettuce 客户端版本与 Spring Boot 版本不兼容。

### 详细分析
1. pom.xml 中显式指定了 lettuce-core 6.2.0
2. Spring Boot 2.7.12 内置管理的是 lettuce 6.1.10
3. 6.2.0 的 Adaptive 拓扑刷新机制在 Redis 集群模式下有已知 bug

### 修复方案
方案一（推荐）：移除显式版本声明，交给 Spring Boot 管理
方案二：升级 Spring Boot 到 2.7.18+，再升级 lettuce 到 6.2.6+

### 代码修改
```

```xml
<!-- 修改前 -->
<dependency>
    <groupId>io.lettuce</groupId>
    <artifactId>lettuce-core</artifactId>
    <version>6.2.0</version>  <!-- 删除此行 -->
</dependency>

<!-- 修改后 -->
<dependency>
    <groupId>io.lettuce</groupId>
    <artifactId>lettuce-core</artifactId>
</dependency>
```

> **最佳实践**：排查 Bug 时尽可能提供完整的错误日志/堆栈信息，Claude Code 定位问题会更精准。

---

### 5.4 重构代码

**工作原理**：Claude Code 会先理解现有代码的结构和逻辑，然后用精确的字符串替换（Edit tool）进行修改，确保不破坏其他功能。对于跨文件的重构，它会按依赖顺序处理文件。

**实战案例：将同步代码改造成异步实现**

```
你：将 OrderService 中的下单流程从同步改造成异步（使用 @Async），
    确保事务边界正确，并处理异步异常。

Claude Code：
[读取 OrderService 相关代码]
[分析事务边界和调用链]

## 重构方案

### 1. 开启异步支持
### 2. 改造 Service 层方法
### 3. 添加异步异常处理器
### 4. 配置线程池
```

改造后的关键代码：

```java
// 配置异步线程池
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean("orderExecutor")
    public Executor orderExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("order-async-");
        executor.setRejectedExecutionHandler(
            new CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
}

// Service 层：将非核心操作异步化
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private NotificationService notificationService;

    @Override
    @Transactional
    public OrderVO createOrder(OrderCreateDTO dto) {
        // 1. 核心流程：同步执行
        Order order = saveOrder(dto);
        
        // 2. 非核心流程：异步执行
        inventoryService.deductStockAsync(order);

        // 3. 通知：异步执行
        notificationService.sendOrderNotificationAsync(order);

        return OrderVO.from(order);
    }
}

// 异步异常处理器
@Slf4j
@Component
public class AsyncExceptionHandler
        implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(
            Throwable ex, Method method, Object... params) {
        log.error("异步方法执行异常 - 方法: {}, 参数: {}",
            method.getName(), params, ex);
        // 发送告警、记录到异常表
    }
}
```

> **最佳实践**：大重构分步骤执行——先让 Claude Code 制定 Plan，审查后再执行，每完成一步就验证编译通过。

---

### 5.5 单元测试生成

**工作原理**：Claude Code 读取源码的方法签名、业务逻辑和依赖关系，自动生成覆盖正常路径、异常路径、边界条件的测试用例，采用项目已有的测试框架（JUnit 5、Mockito 等）。

**实战案例：JUnit 5 测试生成**

```
你：为 OrderServiceImpl 的 createOrder 方法生成单元测试，
    使用 JUnit5 + Mockito，覆盖正常场景和异常场景。
```

生成的测试代码：

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderMapper orderMapper;

    @Mock
    private InventoryService inventoryService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private OrderServiceImpl orderService;

    private OrderCreateDTO validDTO;

    @BeforeEach
    void setUp() {
        validDTO = new OrderCreateDTO();
        validDTO.setUserId(1L);
        validDTO.setProductId(100L);
        validDTO.setQuantity(2);
        validDTO.setAddress("北京市朝阳区");
    }

    @Test
    @DisplayName("正常创建订单 → 返回订单VO")
    void createOrder_whenValidDTO_shouldReturnOrderVO() {
        // Given
        when(orderMapper.insert(any(Order.class)))
            .thenReturn(1);
        doNothing().when(inventoryService)
            .deductStockAsync(any(Order.class));
        doNothing().when(notificationService)
            .sendOrderNotificationAsync(any(Order.class));

        // When
        OrderVO result = orderService.createOrder(validDTO);

        // Then
        assertNotNull(result);
        assertEquals(validDTO.getUserId(), result.getUserId());
        verify(orderMapper, times(1)).insert(any(Order.class));
    }

    @Test
    @DisplayName("库存不足 → 抛出 InsufficientStockException")
    void createOrder_whenStockInsufficient_shouldThrowException() {
        // Given
        doThrow(new InsufficientStockException("库存不足"))
            .when(inventoryService)
            .deductStockAsync(any(Order.class));

        // When & Then
        assertThrows(InsufficientStockException.class,
            () -> orderService.createOrder(validDTO));
    }

    @Test
    @DisplayName("DTO 参数为空 → 抛出 ValidationException")
    void createOrder_whenDTOIsNull_shouldThrowException() {
        assertThrows(ValidationException.class,
            () -> orderService.createOrder(null));
    }
}
```

> **最佳实践**：告诉 Claude Code 你要覆盖的具体场景（正常、异常、边界），它会生成更全面的测试。

---

### 5.6 文档生成

**工作原理**：Claude Code 扫描代码中的注释、方法签名、注解（如 Swagger 的 `@ApiOperation`），结合代码逻辑生成结构化文档。对于 API 文档，还会解析 Controller 的路由映射。

**实战案例：自动生成 API 文档**

```
你：根据所有 Controller 类的代码，生成一份 OpenAPI 3.0 规范的 API 文档。
```

Claude Code 会：遍历所有 Controller → 解析路由、参数、返回值 → 生成标准 OpenAPI 文档。

> **最佳实践**：在代码中使用标准的 JavaDoc/Swagger 注解，生成的文档质量更高。

---

## 第6章 Claude Code 与 Git

### 6.1 Git 状态查看

**功能说明**：Claude Code 可以直接执行 `git status`、`git diff`、`git log` 等命令，并用自然语言解释当前的 Git 状态。

```
你：帮我看看当前的 git 状态，用中文解释。

Claude Code：

当前 Git 状态分析：

📊 分支：feature/order-refactor（基于 origin/master）

📝 已修改文件：
- src/main/java/.../OrderService.java（+120行, -45行）
  重构了下单流程的同步方法为异步实现

➕ 新增文件：
- src/main/java/.../AsyncConfig.java
  新增异步线程池配置
- src/test/java/.../OrderServiceTest.java
  新增 OrderService 单元测试

🔍 未跟踪文件：无
```

### 6.2 Commit 生成

**功能说明**：Claude Code 分析代码变更内容，自动生成符合 Conventional Commits 规范的 commit message。

```bash
# 在 Claude Code 对话中
你：帮我生成一个规范的 commit message，基于当前的暂存区变更。

Claude Code：
[执行 git diff --staged 查看变更]

建议的 commit message：

feat(order): 将下单流程改造为异步实现

- 新增 AsyncConfig 异步线程池配置
- OrderService 非核心操作改为 @Async 异步执行
- 新增 AsyncExceptionHandler 统一处理异步异常
- 新增 OrderService 单元测试

Breaking Changes: 无
Related Issues: #42

要执行这个 commit 吗？

你：执行

Claude Code：
git commit -m "feat(order): 将下单流程改造为异步实现

- 新增 AsyncConfig 异步线程池配置
- OrderService 非核心操作改为 @Async 异步执行
- 新增 AsyncExceptionHandler 统一处理异步异常
- 新增 OrderService 单元测试"
```

### 6.3 PR 说明生成

**功能说明**：分析当前分支与目标分支的差异，生成结构化的 Pull Request 说明。

```
你：帮我生成 PR 说明。目标分支是 master。

Claude Code：
[执行 git diff origin/master...HEAD --stat]
[执行 git log origin/master..HEAD --oneline]
[分析变更内容]

## Pull Request 说明

### 📋 概述
将 OrderService 下单流程从同步实现重构为异步实现，
提升系统吞吐量和用户体验。

### 🎯 目标
- 下单核心流程保持同步，保证数据一致性
- 库存扣减、消息通知等非核心操作异步化
- 异步操作异常不影响主流程

### 🔄 变更内容

| 文件 | 变更 | 说明 |
|------|------|------|
| AsyncConfig.java | 新增 | 异步线程池配置 |
| OrderServiceImpl.java | 修改 | 核心方法异步化改造 |
| AsyncExceptionHandler.java | 新增 | 异步异常统一处理 |
| OrderServiceTest.java | 新增 | 单元测试 |

### ✅ 测试
- [x] 单元测试全部通过
- [ ] 集成测试
- [ ] 性能测试

### ⚠️ 注意事项
- 需要配置线程池参数（core=5, max=10）
- 异步方法异常不会回滚主事务，需监控告警
```

### 6.4 Branch 管理

```bash
# 创建功能分支
你：基于 master 创建一个分支 feature/user-auth

Claude Code：
git checkout master
git pull origin master
git checkout -b feature/user-auth
```

### 6.5 Merge 冲突分析

```
你：合并 master 时出现了冲突，帮我分析并给出解决建议。

Claude Code：
[读取冲突文件，展示冲突内容]
[分析两个分支的修改意图]

文件：src/main/java/.../OrderService.java

冲突位置 1（第 45-58 行）：
  HEAD（当前分支）：
    添加了异步库存扣减逻辑
  master（目标分支）：
    添加了库存预占逻辑

建议：两部分逻辑都需要保留，需要按顺序执行：
  1. 先执行库存预占（master 的变更）
  2. 再异步扣减库存（当前分支的变更）
```

---

## 第7章 Claude Code 高级技巧

### 7.1 自定义指令：CLAUDE.md

**工作原理**：`CLAUDE.md` 是放在项目根目录（或 `.claude/` 目录下）的 Markdown 文件。Claude Code 每次启动时会自动读取 `CLAUDE.md`，将其内容注入到系统提示中，相当于给 AI 设定了"项目专属规则"。

**CLAUDE.md 示例**：

```markdown
# CLAUDE.md

## 项目概述
这是一个 Spring Boot 2.7 的订单微服务项目。

## 编码规范
- 遵循 Google Java Style Guide
- Controller 层只做参数校验和路由，不含业务逻辑
- Service 层必须使用接口-实现类模式
- 所有数据库操作使用 MyBatis Plus
- 异常统一使用 GlobalExceptionHandler 处理
- 日志使用 Lombok 的 @Slf4j

## 禁止事项
- 不要在 Controller 中写业务逻辑
- 不要使用 field injection（@Autowired 在字段上）
- 不要直接返回 Entity，使用 DTO/VO
- 不要忽略异常

## 测试要求
- 使用 JUnit 5 + Mockito
- Service 层单元测试覆盖率 > 80%
- Controller 层使用 @WebMvcTest

## 项目依赖
- Spring Boot 2.7.12
- MyBatis Plus 3.5.3
- Redis（Lettuce）
- MySQL 8.0
```

> **最佳实践**：
> - `CLAUDE.md` 放在项目根目录，CLI 会优先读取根目录的，fallback 到 `.claude/` 目录
> - 不需要在 `CLAUDE.md` 中重复显而易见的内容（如 "代码要有缩进"）
> - 聚焦于项目特有的规范和约束
> - 定期更新，保持与项目实际状况一致

### 7.2 Prompt Engineering 技巧

**高质量提示词的 6 个原则**：

#### 原则一：明确角色和上下文

```
# ❌ 差
帮我写个接口

# ✅ 好
你是一个资深 Java 后端工程师。请为电商系统的订单模块
编写创建订单的 RESTful API，遵循 RESTful 规范。
```

#### 原则二：指定输入和输出格式

```
# ❌ 差
分析这个文件

# ✅ 好
分析 OrderService.java，输出格式：
1. 方法列表（方法名、参数、返回值）
2. 依赖的外部服务
3. 潜在的性能问题
4. 改进建议（按优先级排序）
```

#### 原则三：分步骤分解复杂任务

```
# ❌ 差
帮我重构整个订单模块

# ✅ 好
重构订单模块，分三步执行：
步骤一：先分析现有代码，输出重构计划让我审核
步骤二：重构 Service 层
步骤三：重构 Controller 层
现在开始步骤一。
```

#### 原则四：提供正例和反例

```
请按照以下风格写注释：
✅ 好的注释风格：
/**
 * 根据用户ID查询订单列表。
 * <p>如果用户不存在，返回空列表而非抛出异常。</p>
 *
 * @param userId 用户ID，不能为 null
 * @param page   分页参数，默认第1页
 * @return 订单列表，按创建时间降序排列
 */

❌ 不好的注释风格：
// 查询订单
// userId: 用户ID
```

#### 原则五：设定约束条件

```
生成代码时遵守以下约束：
- 使用 Java 17 语法
- 不引入新的 Maven 依赖
- 类名和方法名必须与现有代码风格一致
- 所有 public 方法必须有 JavaDoc
```

#### 原则六：用好 @ 文件引用

```
你：@OrderService.java @OrderMapper.java
    这两个文件耦合太紧，帮我设计解耦方案。
```

### 7.3 Agent 工作模式

Claude Code 支持三种 Agent 工作模式，形成 "Plan → Execute → Review" 的完整开发闭环。

#### Plan 模式

**触发方式**：输入 `/plan` 或让 Claude Code 先制定计划。

**功能**：Claude Code 进入只读模式，只分析和规划，不修改任何文件。

```
你：/plan 我需要将单体应用拆分为微服务架构，帮我制定迁移计划。

Claude Code：
[只读分析项目结构]
[生成详细迁移计划]
[不修改任何文件]

## 微服务拆分计划

### 第一阶段：基础设施准备
1. 引入 Spring Cloud 依赖
2. 搭建 Nacos 注册中心
3. 配置 API 网关（Gateway）

### 第二阶段：数据库拆分
1. 订单表独立为 order_db
2. 用户表独立为 user_db
3. 配置分布式事务（Seata）

### 第三阶段：服务拆分
1. 拆分 Order Service
2. 拆分 User Service
3. 拆分 Product Service
```

#### Execute 模式

对审核通过的计划进行实施。

```
你：按刚才审核通过的 Plan，从阶段一开始执行。

Claude Code：
[依次执行计划中的每个步骤]
[每步执行后展示结果]
```

#### Review 模式

**触发方式**：输入 `/review` 或使用 `/code-review` 技能。

```
你：/code-review 审查最近的变更。

Claude Code：
[分析 diff]
[检查潜在 bug、性能问题、安全漏洞]
[输出审查报告]
```

> **通用工作流**：
> ```
> /plan (制定计划) → 人工审核 → 执行计划 → /review (代码审查)
> ```

### 7.4 多文件重构技巧

**策略**：一次只改一个关注点，分多个会话完成。

```
会话1：重构数据层（Entity → Mapper）
会话2：重构业务层（Service）
会话3：重构接口层（Controller）
会话4：统一修改引用和测试
```

**实用技巧**：

```bash
# 重构前创建检查点
git checkout -b refactor/step-1
git add -A && git commit -m "checkpoint: 重构前"

# 使用 @ 引用多个文件缩小关注范围
你：@OrderService.java @OrderMapper.java 只重构这两个文件的业务逻辑

# 每完成一步就验证
你：编译项目检查是否有错误
```

### 7.5 大型项目分析技巧

1. **从宏观到微观**：先分析模块结构 → 再深入具体模块 → 最后到单个文件

2. **利用 @ 文件引用精准提问**：
   ```
   你：@pom.xml 这个项目有哪些可以升级的依赖，当前版本和最新版本分别是什么？
   ```

3. **分模块理解**：
   ```
   你：只看 order-service 模块，分析它的数据流。
   ```

---

## 第8章 Claude Code 实战案例

### 案例一：Spring Boot 后台管理系统开发

**场景**：从零搭建一个包含用户管理、角色管理、菜单管理的后台系统。

**技术栈**：Spring Boot 2.7 + MyBatis Plus + MySQL + Redis + JWT

**开发过程**：

```
# 会话1：项目初始化
你：创建一个 Spring Boot 2.7 项目，包含以下模块：
    - 用户管理（CRUD + 分页查询）
    - 角色管理（CRUD + 权限分配）
    - 菜单管理（树形结构）
    使用 MyBatis Plus + MySQL + Redis + JWT 认证。

Claude Code：
[生成项目结构]
[创建所有必要的文件：pom.xml、application.yml、启动类、配置类等]

# 会话2：用户管理模块
你：实现用户管理的完整功能，包括：
    - 用户 CRUD
    - 分页查询 + 多条件搜索
    - 密码加密存储（BCrypt）
    - JWT 登录/登出

# 会话3：角色与权限
你：实现 RBAC 权限模型：
    - 角色管理 CRUD
    - 用户-角色关联
    - 角色-菜单关联
    - 权限拦截器

# 会话4：菜单管理
你：实现菜单管理的树形结构：
    - 菜单 CRUD（支持父子关系）
    - 前端路由生成
    - 按钮级权限控制
```

**最终产出**：一个可运行的后台管理系统骨架，包含约 20 个 Java 文件。

> **经验总结**：按模块分会话开发，每个会话聚焦一个模块，上下文更清晰，生成代码质量更高。

---

### 案例二：Vue 3 前端项目开发

**场景**：为上述后台管理系统开发 Vue 3 前端界面。

**技术栈**：Vue 3 + TypeScript + Element Plus + Axios + Pinia

```
你：为后台管理系统创建 Vue 3 前端项目，使用 Element Plus 组件库。
    第一个页面：用户管理页面，包含表格、搜索、分页、新增/编辑弹窗。

Claude Code：
[创建 Vue 3 项目]
[配置 Element Plus、Axios、Pinia]
[生成用户管理页面组件]
```

核心组件结构：

```typescript
// stores/user.ts —— Pinia 状态管理
export const useUserStore = defineStore('user', () => {
  const list = ref<User[]>([])
  const total = ref(0)
  const loading = ref(false)

  async function fetchUsers(params: UserQueryParams) {
    loading.value = true
    try {
      const res = await userApi.list(params)
      list.value = res.data.records
      total.value = res.data.total
    } finally {
      loading.value = false
    }
  }

  return { list, total, loading, fetchUsers }
})
```

```vue
<!-- UserList.vue —— 用户管理主页面 -->
<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <el-form :model="query" inline>
      <el-form-item label="用户名">
        <el-input v-model="query.username" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="userStore.list" border stripe>
      <!-- 列定义... -->
    </el-table>
  </div>
</template>
```

---

### 案例三：Redis 缓存功能实现

**场景**：为商品查询接口添加 Redis 缓存，减少数据库压力。

```
你：为商品查询接口添加 Redis 缓存：
    1. 使用 Spring Cache + Redis
    2. 缓存 key 策略：product:{id}
    3. 过期时间：30 分钟
    4. 更新/删除商品时自动清除缓存
    5. 缓存穿透保护（布隆过滤器）
```

Claude Code 生成的关键代码：

```java
@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private BloomFilterService bloomFilter;

    @Override
    @Cacheable(value = "product", key = "#id", unless = "#result == null")
    public ProductVO getById(Long id) {
        // 布隆过滤器防止缓存穿透
        if (!bloomFilter.mightContain("product", id)) {
            log.warn("布隆过滤器拦截：商品 {} 不存在", id);
            return null;
        }
        Product product = productMapper.selectById(id);
        if (product == null) {
            return null;
        }
        return ProductVO.from(product);
    }

    @Override
    @CacheEvict(value = "product", key = "#dto.id")
    @Transactional
    public void update(ProductUpdateDTO dto) {
        Product product = Product.from(dto);
        productMapper.updateById(product);
        // 更新布隆过滤器
        bloomFilter.add("product", dto.getId());
    }
}
```

---

### 案例四：MyBatis Plus 项目开发

**场景**：使用 MyBatis Plus 的高级特性——逻辑删除、自动填充、分页插件。

```
你：为项目配置 MyBatis Plus 的以下特性：
    1. 逻辑删除（deleted 字段）
    2. 自动填充（createTime、updateTime）
    3. 分页插件
    4. 乐观锁
    5. 多租户隔离
```

生成的关键配置：

```java
@Configuration
@MapperScan("com.example.mapper")
public class MybatisPlusConfig {

    // 分页插件
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        // 分页
        interceptor.addInnerInterceptor(
            new PaginationInnerInterceptor(DbType.MYSQL));

        // 乐观锁
        interceptor.addInnerInterceptor(
            new OptimisticLockerInnerInterceptor());

        // 多租户
        interceptor.addInnerInterceptor(
            new TenantLineInnerInterceptor(
                new TenantLineHandler() {
                    @Override
                    public Expression getTenantId() {
                        return new LongValue(
                            TenantContext.getCurrentTenantId());
                    }
                    @Override
                    public String getTenantIdColumn() {
                        return "tenant_id";
                    }
                    @Override
                    public boolean ignoreTable(String tableName) {
                        return "sys_config".equals(tableName);
                    }
                }
            ));

        return interceptor;
    }
}

// 自动填充处理器
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject,
            "createTime", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject,
            "updateTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject,
            "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
}
```

---

### 案例五：微服务项目重构

**场景**：将单体 Spring Boot 应用重构为 Spring Cloud 微服务架构。

```
你：制定将单体应用拆分为微服务的详细方案，包括：
    1. 服务划分建议
    2. 通信方式（Feign/消息队列）
    3. 配置中心（Nacos）
    4. 网关路由（Spring Cloud Gateway）
    5. 分布式事务方案（Seata）
```

Claude Code 产出的架构图（文字版）：

```
                   ┌─────────────┐
                   │  Nginx LB   │
                   └──────┬──────┘
                          │
                   ┌──────▼──────┐
                   │   Gateway   │  ← Spring Cloud Gateway
                   └──┬──┬───┬──┘
                      │  │   │
          ┌───────────┘  │   └───────────┐
          ▼              ▼               ▼
    ┌──────────┐  ┌──────────┐   ┌──────────┐
    │  Order   │  │   User   │   │ Product  │
    │ Service  │  │  Service │   │ Service  │
    └────┬─────┘  └────┬─────┘   └────┬─────┘
         │             │              │
    ┌────▼─────┐  ┌───▼──────┐  ┌───▼──────┐
    │ order_db │  │ user_db  │  │ prod_db  │
    └──────────┘  └──────────┘  └──────────┘
              │             │              │
         ┌────▼─────────────▼──────────────▼──┐
         │        Seata (分布式事务)           │
         └───────────────────────────────────┘
```

---

## 第9章 Claude Code 最佳实践

### 9.1 如何提高回答质量

1. **提供充分的上下文**：

```bash
# 差

你：这段代码有问题

# 好
你：@OrderService.java:45-80 createOrder方法在高并发下偶发
    死锁。并发场景：每秒100+请求，多个线程同时扣减同一商品的库存。
    数据库是MySQL 8.0，隔离级别 READ_COMMITTED。
    请分析死锁原因并给出修复方案。
```

2. **使用角色设定**：

```
你是一位资深 Java 性能优化专家。请分析...
```

3. **分步骤提问**：复杂问题拆成多个简单问题，每次只问一件事。

4. **确认理解**：

```
在生成代码之前，请先描述你理解的需求，我确认后再动手。
```

### 9.2 如何降低 Token 消耗

1. **使用 `/clear` 清空上下文**：当话题切换时，清空之前的对话上下文

2. **使用 `-p` 非交互模式处理简单查询**：

```bash
# 交互模式（消耗更多 Token）
claude
# vs
# 单次查询（消耗更少 Token）
claude -p "这个文件有什么问题？"
```

3. **合理选择模型**：

| 任务类型 | 推荐模型 | Token 成本 |
|----------|----------|-----------|
| 简单问答、代码补全 | Haiku | 极低 |
| 日常开发 | Sonnet | 中等 |
| 复杂重构、架构分析 | Opus | 较高 |

4. **使用 `.gitignore` 排除无关文件**：Claude Code 会扫描项目目录，排除 `node_modules` 等可以减少上下文噪音。

5. **缩小文件引用范围**：

```
# 广泛引用（消耗大）
你：分析整个项目的问题

# 精准引用（消耗小）
你：@OrderService.java:45-80 这个方法有什么问题？
```

### 9.3 如何管理上下文

1. **一个会话一个主题**：不要在一个会话中混合多个不相关的任务

2. **使用阶段性总结**：

```
你：总结我们到目前为止讨论的架构方案，我确认无误后继续。
```

3. **善用 checkpoint commit**：

```bash
# 每次完成一个任务后提交
git add -A && git commit -m "checkpoint: 完成 Service 层重构"
```

### 9.4 如何管理大型代码库

1. **创建项目级别 CLAUDE.md**：包含模块说明、常用命令、架构图

2. **模块化提问**：

```
你：只分析 user-service 模块，忽略其他模块。
```

3. **使用 MCP 工具扩展能力**：通过 MCP 连接数据库、API 等外部资源

### 9.5 如何与 Git 配合

```bash
# 黄金工作流
# 1. 每次 AI 修改前创建分支
git checkout -b feature/xxx

# 2. AI 修改完成后查看差异
git diff

# 3. 分次提交而非一次全部提交
git add src/main/java/.../Service.java
git commit -m "refactor: 重构 Service 层"
git add src/main/java/.../Controller.java
git commit -m "refactor: 重构 Controller 层"

# 4. 不满意可以随时回滚
git checkout -- .
```

### 9.6 如何与 Cursor 配合

两种工具的互补使用策略：

| 场景 | 使用工具 |
|------|----------|
| 日常编码、行级补全 | Cursor |
| 复杂多文件重构 | Claude Code |
| 新功能快速原型 | Claude Code |
| UI 调整、样式微调 | Cursor |
| 项目分析、架构评审 | Claude Code |
| 代码审查、Commit 生成 | Claude Code |

```bash
# 同一项目中无缝切换
# Cursor 中编辑代码 → 终端中打开 Claude Code 审查
cd your-project
claude "审查刚才的修改，检查是否有性能问题和安全隐患"
```

---

## 第10章 常见问题 FAQ

### 安装与登录

**Q1：安装时报 `npm ERR! code EACCES`**

```bash
# 原因：npm 全局目录权限不足
# 解决方案：
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Q2：`claude login` 后浏览器没有自动打开**

手动复制终端中显示的链接（如 `https://claude.ai/code/login?code=XXXX-XXXX`）到浏览器中打开。

**Q3：登录后提示 "No API credits"**

访问 [Anthropic Console](https://console.anthropic.com) 充值或确认订阅状态。

**Q4：公司网络环境下无法登录**

原因可能是防火墙拦截了 `api.anthropic.com`。

```bash
# 配置代理
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# 或者设置 npm 代理
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

**Q5：如何卸载 Claude Code？**

```bash
npm uninstall -g @anthropic-ai/claude-code
# 清理配置（可选）
rm -rf ~/.claude
```

### API 与额度

**Q6：如何查看剩余 API 额度？**

```bash
claude whoami
# 输出中会显示 API credits remaining
```

**Q7：API 调用太贵了怎么办？**

- 日常开发使用 Sonnet 模型（`claude config set model claude-sonnet-4-6`）
- 简单任务使用 Haiku 模型
- 使用 `-p` 模式代替交互模式处理简单问答
- 避免让 Claude Code 重复读取整个项目

**Q8：可以使用自己的 API Key 吗？**

可以。设置环境变量：

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

或者在 `.bashrc`/`.zshrc` 中添加。

**Q9：API 调用频率限制是多少？**

取决于你的 Anthropic 账户的 Tier 等级。可以在 [Anthropic Console](https://console.anthropic.com) 查看具体限制。

### 模型与配置

**Q10：Sonnet 和 Opus 到底差别有多大？**

| 维度 | Sonnet | Opus |
|------|--------|------|
| 速度 | 快 | 较慢 |
| 价格 | 中等 | 较高 |
| 代码理解 | 优秀 | 卓越 |
| 复杂推理 | 良好 | 卓越 |
| 日常编码 | ✅ 推荐 | 杀鸡用牛刀 |
| 架构设计 | 尚可 | ✅ 推荐 |

**Q11：如何切换模型？**

```bash
# 临时切换（仅本次会话）
claude --model claude-opus-4-8

# 永久切换
claude config set model claude-opus-4-8
```

**Q12：配置文件在哪里？**

- 用户级：`~/.claude/settings.json`（Linux/macOS）或 `C:\Users\<用户名>\.claude\settings.json`（Windows）
- 项目级：`<项目根目录>/.claude/settings.json`

**Q13：settings.json 改了没生效？**

```bash
# 检查配置文件格式是否正确
claude config list

# 如果配置有语法错误，Claude Code 会使用默认值
# 可以用 JSON 校验工具检查
```

**Q14：如何重置所有配置？**

```bash
# 备份后删除
cp -r ~/.claude ~/.claude.backup
rm -rf ~/.claude

# 重新运行初始化
claude
```

### 命令执行与权限

**Q15：为什么执行命令总是问我确认？**

这是安全设计。你可以将常用命令添加到允许列表：

```bash
claude config set permissions.allow '["Bash(npm *)", "Bash(git *)"]'
```

**Q16：如何禁止 Claude Code 执行危险命令？**

```bash
claude config set permissions.deny '["Bash(rm -rf *)", "Bash(sudo *)", "Bash(git push --force *)"]'
```

**Q17：Claude Code 能访问网络吗？**

可以。它内置了 `WebSearch` 和 `WebFetch` 工具，可以搜索和获取网页内容。

```bash
# 需要权限允许
claude config set permissions.allow '["WebSearch(* *)", "WebFetch(* *)"]'
```

**Q18：如何让 Claude Code 自动批准所有操作？**

```bash
# ⚠️ 不推荐，有安全风险
claude config set autoApprove true
```

### Git 相关

**Q19：Claude Code 能直接 push 代码吗？**

默认情况下不能，需要权限允许。建议始终手动 push，并在 push 前 review 代码。

**Q20：Claude Code 改坏了代码怎么回退？**

```bash
# 查看 Claude Code 修改了什么
git diff

# 回退单个文件
git checkout -- path/to/file.java

# 回退所有修改
git checkout -- .
```

**Q21：如何让 Claude Code 遵循 Conventional Commits 规范？**

在 `CLAUDE.md` 中添加：

```markdown
## Commit 规范
- 遵循 Conventional Commits
- 格式：type(scope): description
- 类型：feat/fix/refactor/docs/test/chore
```

### 项目使用

**Q22：Claude Code 支持哪些语言？**

当前主要支持所有主流编程语言，包括但不限于：Java、Python、JavaScript/TypeScript、Go、Rust、C/C++、Kotlin、Swift、Ruby、PHP 等。

**Q23：Claude Code 支持多模块 Maven 项目吗？**

完全支持。Claude Code 会识别多模块 Maven/Gradle 项目结构，可以通过 `@` 引用子模块中的文件。

**Q24：如何在大型项目中减少上下文噪音？**

- 使用 `.gitignore` 排除 `node_modules`、`target` 等目录
- 使用 `@` 精准引用文件，而非让 AI 扫描整个项目
- 在 `CLAUDE.md` 中明确模块边界

**Q25：Claude Code 能正确理解中文注释和文档吗？**

可以。Claude 模型是 multilingual 的，对中文有很好的理解能力。

### 故障排查

**Q26：`claude` 命令找不到？**

```bash
# 检查 npm 全局安装路径是否在 PATH 中
npm list -g --depth=0
npm config get prefix

# 将 npm 全局 bin 目录添加到 PATH
echo 'export PATH=$(npm config get prefix)/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Q27：Claude Code 运行很慢？**

可能原因：
- 模型选择（Opus 比 Sonnet 慢）
- 项目太大（考虑添加 `.gitignore` 排除无关文件）
- 网络延迟（检查到 `api.anthropic.com` 的延迟）

```bash
# 诊断
claude doctor

# 检查网络延迟
curl -o /dev/null -s -w "time_total: %{time_total}s\n" https://api.anthropic.com
```

**Q28：终端显示乱码？**

确保终端使用 UTF-8 编码：

```bash
# 检查 locale
locale

# 如果不是 UTF-8，设置
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

**Q29：Claude Code 修改文件后项目编译报错？**

```
你：刚才的修改导致编译错误，请检查错误并修复。
[粘贴错误信息]

Claude Code：
[读取错误信息]
[定位问题文件]
[修复]
```

**Q30：Windows 下中文输入乱码？**

推荐使用 Windows Terminal 而非 cmd.exe，Windows Terminal 对 UTF-8 和中文支持更好。

### 进阶问题

**Q31：什么是 MCP？我需要用它吗？**

MCP（Model Context Protocol）是 Claude Code 的插件系统，允许你扩展 Claude Code 的能力——比如连接数据库、访问外部 API 等。

如果你是个人开发者，默认功能通常足够。如果是团队开发，可以通过 MCP 集成 Jira、GitHub Issues、数据库等。

**Q32：CLAUDE.md 和 settings.json 的 customInstructions 有什么区别？**

- `CLAUDE.md`：放在项目根目录，版本控制的一部分（团队成员共享）
- `settings.json` 中的 `customInstructions`：个人配置，不影响其他成员

**Q33：如何让 Claude Code 只读不改？**

使用 `/plan` 模式，或者明确告诉它：

```
你：只分析，不要修改任何文件。
```

**Q34：Claude Code 能记住之前的对话吗？**

同一个会话内可以。退出 Claude Code 再重新进入，之前的历史不会保留。如需持久化记忆，使用 `/memory` 命令。

**Q35：如何在 CI/CD 中使用 Claude Code？**

```bash
# 非交互模式，适合 CI
claude -p "审查最近的代码变更" --output-format json > review.json

# 使用 API Key 认证
export ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }}
claude -p "运行代码审查"
```

**Q36：Claude Code 支持 SSH 远程开发吗？**

是的。SSH 到远程服务器后，在终端中使用 Claude Code 即可。

**Q37：多个项目可以有不同的 CLAUDE.md 吗？**

当然可以。每个项目使用自己的 `CLAUDE.md`（放在项目根目录），Claude Code 在不同项目目录下会读取对应的文件。

**Q38：`/clear` 后 CLAUDE.md 还在吗？**

`/clear` 只清除本对话的消息历史，CLAUDE.md 的内容会在下一次对话中重新注入。CLAUDE.md 是持久化的项目规则。

**Q39：如何导出对话记录？**

```bash
# 使用 --output-format 参数
claude --output-format json "分析项目架构" > session_output.json
```

**Q40：Claude Code 能生成图片吗？**

Claude Code 本身是文本工具，不支持直接生成图片。但可以生成 SVG 代码、Mermaid 图表语法、PlantUML 等，你可以用其他工具渲染。

**Q41：如何让 Claude Code 遵循团队编码规范？**

将团队规范写入项目根目录的 `CLAUDE.md`：

```markdown
## 团队编码规范
- 使用 Lombok 减少 boilerplate 代码
- 类名使用 PascalCase，方法名使用 camelCase
- Controller 方法上必须标注 @ApiOperation
- 禁止在循环中执行数据库查询（N+1 问题）
```

**Q42：Claude Code 的上下文窗口多大？**

Claude Code 使用的 Claude 模型拥有 200K tokens 的上下文窗口，足以容纳整个中大型项目的核心代码。

**Q43：什么时候应该开新会话？**

- 话题完全切换时（如从 Bug 修复跳到新功能开发）
- 上下文变长、响应变慢时
- 之前给了错误的引导信息导致 AI "跑偏" 时

**Q44：Claude Code 和 Claude.ai 网页版有什么区别？**

| 维度 | Claude Code | Claude.ai |
|------|-------------|-----------|
| 界面 | CLI 终端 | 网页聊天 |
| 项目集成 | 深度集成（读文件、执行命令） | 无 |
| 适用场景 | 专业开发 | 通用聊天、文档分析 |
| 代码操作 | 直接编辑+创建文件 | 仅文本输出 |

**Q45：Claude Code 支持 Windows cmd.exe 吗？**

技术上可以运行，但体验不佳。强烈建议使用 Windows Terminal、Git Bash 或 PowerShell 7+。

**Q46：如何查看 Claude Code 的版本更新日志？**

访问 [Claude Code 发布页面](https://github.com/anthropics/claude-code/releases) 或运行：

```bash
npm info @anthropic-ai/claude-code versions --json
```

**Q47：Claude Code 会收集我的代码吗？**

参考 [Anthropic 的隐私政策](https://www.anthropic.com/legal/privacy)。API 调用会发送代码到 Anthropic 服务器用于生成回复，但 Anthropic 不会使用 API 用户的输入输出训练模型。

**Q48：如何反馈 Bug 或建议？**

- GitHub Issues：[claude-code 仓库](https://github.com/anthropics/claude-code/issues)
- 在 Claude Code 中直接反馈：`claude "我有一个建议..."`

**Q49：Claude Code 支持离线使用吗？**

不支持。Claude Code 需要访问 `api.anthropic.com` 才能调用 Claude 模型。

**Q50：使用 Claude Code 需要科学上网吗？**

中国大陆用户访问 `api.anthropic.com` 可能需要通过代理。可以在终端中设置 HTTP 代理环境变量，或使用 VPN。

---

## 附录：速查表

### CLI 命令速查

| 命令 | 用途 |
|------|------|
| `claude` | 启动交互式会话 |
| `claude "..."` | 单次查询 |
| `claude -p "..."` | 非交互输出 |
| `claude login` | 登录 |
| `claude logout` | 登出 |
| `claude update` | 更新版本 |
| `claude config list` | 查看配置 |
| `claude config set` | 设置配置 |
| `claude doctor` | 环境诊断 |
| `claude whoami` | 当前用户信息 |
| `claude help` | 帮助信息 |
| `claude mcp list` | MCP 服务器列表 |

### 交互模式命令速查

| 命令 | 用途 |
|------|------|
| `/help` | 显示帮助 |
| `/clear` | 清空对话上下文 |
| `/plan` | 进入只读规划模式 |
| `/compact` | 压缩对话历史释放 token |
| `/memory` | 管理持久化记忆 |
| `/config` | 查看/修改配置 |
| `/cost` | 查看 Token 消耗和费用 |
| `/doctor` | 环境诊断 |
| `/model` | 切换模型（仅本次会话） |
| `/init` | 初始化项目 CLAUDE.md |
| `/permissions` | 管理临时权限 |
| `/add-dir` | 添加工作目录 |
| `/status` | 查看会话状态 |
| `/tasks` | 查看后台任务 |
| `/review` | 代码审查 |
| `/skills` | 列出可用技能 |
| `/agents` | 列出子代理类型 |
| `/workflows` | 工作流状态 |
| `/mcp` | MCP 服务器管理 |

### 模型选择速查

| 模型 | 适合 | 速度 | 成本 |
|------|------|------|------|
| Haiku | 简单问答、代码补全 | 极快 | $ |
| Sonnet | **日常开发（推荐）** | 快 | $$ |
| Opus | 复杂重构、架构分析 | 中等 | $$$ |

### 快捷键速查

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 中断操作 |
| `Ctrl + D` | 退出 Claude Code |
| `Ctrl + L` | 清屏 |
| `Ctrl + R` | 搜索历史 |
| `↑ / ↓` | 浏览历史 |
| `Tab` | 文件路径补全 |

---

> **结语**：Claude Code 正在重新定义开发者的工作方式——它不只是代码补全工具，而是一个真正的 AI 编程伙伴。本指南涵盖了从入门安装到高级技巧的完整内容，希望能帮助你充分利用 Claude Code 提升开发效率。
>
> 技术发展日新月异，建议定期运行 `claude update` 获取最新功能，并关注 Anthropic 的官方动态。

---

*本文约 2 万字，最后更新于 2026 年 5 月 30 日。如有错误或建议，欢迎在评论区指出。*
