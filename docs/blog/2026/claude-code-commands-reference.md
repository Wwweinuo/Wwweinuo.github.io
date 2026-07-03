---
title: Claude Code 命令大全 - 完整参考手册
date: 2026-07-03
tags: [Claude Code, AI编程, 开发工具, 效率提升, 命令行, 速查表]
summary: Claude Code 全命令参考手册，包含所有 CLI 命令参数、交互模式斜杠命令、键盘快捷键、环境变量、配置文件键值、工具权限语法等完整速查信息，适合日常快速查阅。
head:
  - - meta
    - name: description
      content: Claude Code 命令大全——包含所有 CLI 命令、斜杠命令、快捷键、环境变量、配置项的完整速查手册
---

# Claude Code 命令大全 — 完整参考手册

> **本手册定位**：纯命令速查参考，不包含安装教程与使用案例。适合已熟悉 Claude Code 的开发者快速查阅命令参数和语法。
>
> **相关指南**：[Claude Code 使用指南与命令手册](/blog/2026/claude-code-guide)（入门教程）、[Claude Code Skill 编写指南](/blog/2026/claude-code-skill-guide)（技能开发）

---

[[TOC]]

---

## 一、CLI 命令（终端命令行）

### 1.1 claude —— 主命令

启动交互式 REPL 会话，或执行单次查询。

```bash
# 语法
claude [options] [prompt]

# 进入交互式 REPL 会话（最常用）
claude

# 单次查询：执行后退出
claude "分析项目结构"

# 非交互式输出（无 spinner，适合脚本/CI）
claude -p "列出所有 PHP 文件"
```

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `prompt` | string | 直接传入的问题或任务描述 | `claude "重构这个模块"` |
| `-p`, `--print` | flag | 非交互式输出模式，适合脚本调用 | `claude -p "..."` |
| `--model` | string | 指定模型（临时覆盖 settings） | `--model claude-opus-4-8` |
| `--cwd` | string | 指定工作目录 | `--cwd /path/to/project` |
| `--output-format` | enum | 输出格式 | `text`(默认) / `json` / `stream-json` |
| `--max-turns` | number | 最大交互轮次（默认自动） | `--max-turns 50` |
| `--verbose` | flag | 详细输出模式，显示更多日志 | `--verbose` |
| `-v`, `--version` | flag | 显示版本号 | `claude --version` |
| `-h`, `--help` | flag | 显示帮助信息 | `claude --help` |

### 1.2 claude login —— 登录认证

```bash
# 语法
claude login [options]

# 交互式登录（浏览器 OAuth）
claude login

# API Key 直接登录（非交互式，适合 CI）
claude login --api-key sk-ant-api03-xxxxxxxxxxxxx

# OAuth 登录显式指定
claude login --oauth
```

| 参数 | 说明 |
|------|------|
| `--api-key <key>` | 使用 API Key 直接认证 |
| `--oauth` | 使用 OAuth 流程登录 |

> **CI/CD 环境**：设置环境变量 `ANTHROPIC_API_KEY` 可免登录直接使用。

### 1.3 claude logout —— 登出

```bash
claude logout
```

清除本地存储的登录凭证。

### 1.4 claude update —— 更新

```bash
# 语法
claude update [options]

# 检查并更新到最新版本
claude update

# 仅检查版本，不升级
claude update --check
```

| 参数 | 说明 |
|------|------|
| `--check` | 仅检查是否有新版本，不安装 |

### 1.5 claude config —— 配置管理

```bash
# 语法
claude config <command> [key] [value] [options]
```

| 子命令 | 说明 |
|--------|------|
| `list` | 列出所有当前配置（含来源层级） |
| `get <key>` | 获取特定配置项值 |
| `set <key> <value>` | 设置配置项 |
| `unset <key>` | 删除配置项 |
| `edit` | 在编辑器中打开用户级配置 |
| `edit --project` | 在编辑器中打开项目级配置 |

```bash
# 示例
claude config list
claude config get model
claude config set model claude-opus-4-8
claude config set permissions.allow '["Bash(npm *)", "Bash(git *)"]'
claude config unset permissions.allow
```

### 1.6 claude doctor —— 环境诊断

```bash
# 语法
claude doctor [options]

# 完整诊断
claude doctor

# 仅检查网络连接
claude doctor --network

# JSON 格式输出（适合 CI 集成）
claude doctor --json
```

| 参数 | 说明 |
|------|------|
| `--network` | 仅检查网络连通性 |
| `--json` | JSON 格式输出 |

检查项：Node.js 版本、npm 版本、认证状态、网络连接、配置文件有效性、Git 版本、操作系统。

### 1.7 claude whoami —— 查看用户信息

```bash
claude whoami
```

输出：登录邮箱、组织 ID、API 剩余额度。

### 1.8 claude help —— 帮助

```bash
claude help [command]
```

| 参数 | 说明 |
|------|------|
| `help` | 总帮助信息 |
| `help <command>` | 特定命令帮助，如 `claude help config` |
| `help shortcuts` | 快捷键帮助 |

### 1.9 claude mcp —— MCP 服务器管理

```bash
# 语法
claude mcp <command> [name] [options]

# 列出所有 MCP 服务器
claude mcp list

# 添加 MCP 服务器
claude mcp add filesystem npx @anthropic-ai/mcp-server-filesystem /data

# 查看 MCP 服务器详情
claude mcp get filesystem

# 移除 MCP 服务器
claude mcp remove filesystem
```

| 子命令 | 说明 |
|--------|------|
| `list` | 列出所有已配置的 MCP 服务器 |
| `add <name> <command> [args...]` | 添加 MCP 服务器 |
| `get <name>` | 查看指定 MCP 服务器的详细信息 |
| `remove <name>` | 移除 MCP 服务器 |

---

## 二、交互模式斜杠命令（Slash Commands）

在交互式 REPL 会话中，以 `/` 开头的内置命令。

### 2.1 会话管理

| 命令 | 语法 | 说明 | 持久性 |
|------|------|------|--------|
| `/help` | `/help` | 显示交互模式帮助信息 | — |
| `/clear` | `/clear` | 清空当前对话历史，释放上下文窗口 | 仅本次会话 |
| `/compact` | `/compact` | 压缩对话历史为摘要，释放 token 空间 | 仅本次会话 |
| `/status` | `/status` | 显示当前会话完整状态（模型、目录、上下文用量等） | — |
| `/cost` | `/cost` | 查看当前会话 Token 消耗和 API 费用 | — |
| `/model` | `/model [name]` | 查看或临时切换模型（仅本次会话） | 仅本次会话 |
| `/fast` | `/fast` | 切换快速模式开关（Opus 快速输出） | 仅本次会话 |

**`/model` 可用模型值：**
- `claude-haiku-4-5-20251001` — 最快，成本最低
- `claude-sonnet-4-6` — 默认，推荐日常开发
- `claude-opus-4-8` — 最强推理，适合复杂任务
- `claude-fable-5` — 最新 Fable 模型

### 2.2 项目与代码

| 命令 | 语法 | 说明 | 持久性 |
|------|------|------|--------|
| `/plan` | `/plan` | 进入只读规划模式，只分析不修改文件 | 仅本次会话 |
| `/init` | `/init` | 自动扫描项目生成 `CLAUDE.md` | 永久（创建文件） |
| `/review` | `/review` | 审查当前未提交的代码变更（git diff） | — |
| `/add-dir` | `/add-dir <path>` | 添加额外工作目录到当前上下文 | 仅本次会话 |

**`/plan` 模式特点：** 只读模式，Claude 只能使用 Read、Grep、Glob 等分析工具，
不可执行 Edit、Write 等写操作。适合制定方案供人工审核。

### 2.3 配置与权限

| 命令 | 语法 | 说明 | 持久性 |
|------|------|------|--------|
| `/config` | `/config <action> [key] [value]` | 查看/修改配置 | 永久 |
| `/permissions` | `/permissions <action> [tool]` | 管理临时工具权限 | 仅本次会话 |
| `/memory` | `/memory` | 管理持久化记忆（保存/查看/删除） | **跨会话** |

**`/config` 子命令：**
- `/config list` — 列出配置
- `/config get <key>` — 获取配置项
- `/config set <key> <value>` — 设置配置项
- `/config unset <key>` — 删除配置项

**`/permissions` 子命令：**
- `/permissions allow "<pattern>"` — 临时允许
- `/permissions deny "<pattern>"` — 临时禁止
- `/permissions list` — 查看当前权限状态

### 2.4 诊断与工具

| 命令 | 语法 | 说明 |
|------|------|------|
| `/doctor` | `/doctor` | 运行环境诊断（等效 `claude doctor`） |
| `/mcp` | `/mcp [list\|add\|remove]` | 管理 MCP 服务器 |
| `/ide` | `/ide` | 管理 IDE（VS Code/JetBrains）集成状态 |
| `/worktree` | `/worktree` | 管理 git worktree 隔离工作区 |
| `/design-sync` | `/design-sync` | 同步 Claude Design 设计系统项目 |

### 2.5 任务与工作流

| 命令 | 语法 | 说明 |
|------|------|------|
| `/tasks` | `/tasks` | 查看当前会话的后台任务状态 |
| `/workflows` | `/workflows` | 查看多代理编排 Workflow 执行进度 |
| `/skills` | `/skills` | 列出所有可用的 Skill（技能） |
| `/agents` | `/agents` | 列出可用的子代理类型 |
| `/loop` | `/loop <interval> <command>` | 按间隔重复执行命令或提示 |

**`/loop` 语法：**
```bash
/loop 5m /status          # 每 5 分钟执行一次 /status
/loop 30s "检查服务器状态"  # 每 30 秒运行一次提示
/loop                       # 无参数进入动态自定节奏循环
```

---

## 三、全局 CLI 选项速查

### 3.1 模型选项

| 选项 | 模型 ID | 适用场景 |
|------|---------|----------|
| `--model claude-haiku-4-5-20251001` | Haiku 4.5 | 简单问答、批量处理 |
| `--model claude-sonnet-4-6` | Sonnet 4.6 | **日常开发（默认推荐）** |
| `--model claude-opus-4-8` | Opus 4.8 | 复杂重构、架构分析 |
| `--model claude-fable-5` | Fable 5 | 最新旗舰模型 |

### 3.2 输出格式选项

| 选项 | 说明 | 适用场景 |
|------|------|----------|
| `--output-format text` | 纯文本输出（默认） | 终端交互 |
| `--output-format json` | JSON 格式输出，包含所有消息 | CI 集成、日志记录 |
| `--output-format stream-json` | SSE 风格的流式 JSON | 实时处理场景 |

### 3.3 其他全局选项

| 选项 | 说明 |
|------|------|
| `--cwd <path>` | 设置工作目录（不改变 CWD，仅用于项目检测） |
| `--max-turns <n>` | 限制最大交互轮次（自动停止） |
| `--verbose` | 开启详细日志输出，显示每个工具调用的细节 |
| `-p`, `--print` | 非交互模式：直接输出结果，不进入 REPL |
| `-v`, `--version` | 打印版本号后退出 |
| `-h`, `--help` | 打印帮助信息后退出 |

---

## 四、环境变量参考

| 环境变量 | 说明 | 示例 |
|----------|------|------|
| `ANTHROPIC_API_KEY` | API 密钥认证（优先级高于 login） | `sk-ant-api03-xxx` |
| `ANTHROPIC_BASE_URL` | 自定义 API 端点地址 | `https://api.example.com` |
| `HTTP_PROXY` | HTTP 代理地址 | `http://127.0.0.1:7890` |
| `HTTPS_PROXY` | HTTPS 代理地址 | `http://127.0.0.1:7890` |
| `NO_PROXY` | 不走代理的地址白名单 | `localhost,127.0.0.1` |
| `CLAUDE_CWD` | 默认工作目录 | `/path/to/project` |
| `CLAUDE_MODEL` | 默认模型（不推荐，建议用 settings.json） | `claude-sonnet-4-6` |
| `CLAUDE_AUTO_APPROVE` | 自动批准所有操作（`true`/`false`） | `true` |
| `HOME` / `USERPROFILE` | 用户主目录（配置文件位置） | `C:\Users\username` |

> **优先级**：CLI 参数 > 环境变量 > settings.json

---

## 五、配置文件 settings.json 完整字段

### 5.1 所有配置项一览

配置层级（优先级从高到低）：**项目级 `.claude/settings.json` > 用户级 `~/.claude/settings.json` > 系统默认**

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `model` | string | `claude-sonnet-4-6` | 使用的 Claude 模型 ID |
| `theme` | string | `dark` | 终端主题：`dark` / `light` / `system` |
| `hasCompletedOnboarding` | boolean | `false` | 是否完成新手引导 |
| `autoApprove` | boolean | `false` | 是否自动批准所有操作（⚠️ 安全风险） |
| `customInstructions` | string | `""` | 自定义指令，附加到 system prompt |
| `permissions.allow` | string[] | `[]` | 允许的工具权限模式列表 |
| `permissions.deny` | string[] | `[]` | 拒绝的工具权限模式列表 |
| `interactive.multiLine` | boolean | `false` | 始终使用多行输入模式 |

### 5.2 完整配置示例

```json
{
  "model": "claude-sonnet-4-6",
  "theme": "dark",
  "hasCompletedOnboarding": true,
  "autoApprove": false,
  "customInstructions": "使用中文回答。代码注释使用中文。",
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(node --version)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push --force *)"
    ]
  },
  "interactive": {
    "multiLine": true
  }
}
```

---

## 六、工具权限语法

### 6.1 权限模式格式

```
<tool-name>(<pattern>)
```

| 工具名 | 说明 | 权限模式示例 |
|--------|------|-------------|
| `Bash` | Shell 命令执行 | `Bash(npm *)`、`Bash(git:*)` |
| `Read` | 文件读取 | `Read(src/**)` |
| `Write` | 文件写入 | `Write(src/**/*.java)` |
| `Edit` | 文件编辑（字符串替换） | `Edit(src/**)` |
| `Grep` | 代码搜索 | `Grep(*)` |
| `Glob` | 文件模式匹配 | `Glob(*)` |
| `WebSearch` | 网络搜索 | `WebSearch(* *)` |
| `WebFetch` | 网页抓取 | `WebFetch(* *)` |

### 6.2 通配符规则

- `*` — 匹配任意非分隔符字符（单层）
- `**` — 匹配任意路径（跨目录）
- `:` 分隔 — 仅匹配特定命令前缀（Bash 专用）

```json
{
  "permissions": {
    "allow": [
      "Bash(git:*)",            // 仅允许以 git 开头的命令
      "Bash(npm:*)",            // 仅允许 npm 命令
      "Bash(mvn:*)",            // 仅允许 Maven 命令
      "Read(src/**)",            // 允许读取 src 目录下所有文件
      "Edit(src/**/*.java)",    // 允许编辑 src 下的 Java 文件
      "WebSearch(* *)"          // 允许所有网络搜索
    ]
  }
}
```

---

## 七、键盘快捷键

### 7.1 通用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 发送消息（单行模式） |
| `Alt + Enter` | 换行（多行输入） |
| `Shift + Enter` | 换行（同 Alt+Enter） |
| `Ctrl + C` | 中断当前操作（取消模型响应或工具执行） |
| `Ctrl + D` | 退出 Claude Code REPL |
| `Ctrl + L` | 清屏 |
| `Ctrl + R` | 搜索对话历史 |
| `Ctrl + O` | 在编辑器中打开当前对话 |
| `Esc` | 退出预览模式 / 取消当前操作 |
| `↑` / `↓` | 浏览命令历史 |
| `Tab` | 文件路径自动补全 |

### 7.2 VS Code / JetBrains IDE 快捷键

当 Claude Code 在 IDE 中集成使用时：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Shift + I` | 打开 Claude Code 内联对话 |
| `Ctrl + Shift + P` → `Claude Code` | 调出命令面板中的 Claude Code 命令 |
| `Ctrl + I` | 打开内联编辑（VS Code） |

### 7.3 自定义快捷键

通过 `~/.claude/keybindings.json` 可自定义快捷键：

```json
{
  "keybindings": {
    "ctrl+s": "提交信息生成",
    "ctrl+shift+r": "/review",
    "ctrl+shift+p": "/plan",
    "alt+c": "/clear"
  }
}
```

---

## 八、CLAUDE.md 指令语法

虽非命令，但 `CLAUDE.md` 是 Claude Code 行为控制的核心手段。

### 8.1 文件位置（按优先级）

1. **项目根目录** `/CLAUDE.md`（推荐，建议入版本控制）
2. **`.claude/` 目录** `/.claude/CLAUDE.md`

### 8.2 建议内容结构

```markdown
# CLAUDE.md

## 项目概述
简述项目用途、技术栈、架构风格。

## 编码规范
- 遵循的语言和框架规范
- 命名约定、包结构
- 必须/禁止使用的模式

## 工作流
- 推荐的开发流程
- 测试要求
- Commit 规范

## 常用命令
- 构建命令
- 测试命令
- 运行命令

## Gotchas（容易出错的地方）
- 项目特有的陷阱
- 常见的误解
```

---

## 九、.claude 目录结构

```
项目根目录/
└── .claude/
    ├── settings.json            # 项目级配置
    ├── CLAUDE.md                # 项目规则（备选位置）
    ├── memory/                  # 持久化记忆
    │   ├── MEMORY.md            # 记忆索引
    │   └── *.md                 # 单条记忆文件
    ├── plans/                   # /plan 生成的计划
    ├── workflows/               # Workflow 脚本
    │   └── *.js                 # 多代理编排脚本
    ├── worktrees/               # /worktree 创建的隔离工作区
    ├── skills/                  # 项目级 Skill
    │   └── skill-name/
    │       └── SKILL.md
    └── scheduled_tasks.json     # 持久化定时任务
```

---

## 十、MCP 服务器配置概览

MCP 服务器可在 settings.json 中配置（也可通过 `claude mcp add` 命令添加）：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/allowed/dir"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": [
        "@anthropic-ai/mcp-server-postgres",
        "postgresql://user:pass@localhost/db"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "@anthropic-ai/mcp-server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

---

## 十一、技能（Skill）调用速查

| 操作 | 命令/方式 |
|------|-----------|
| 列出所有可用技能 | `/skills` |
| 手动调用技能 | `/skill-name`（如 `/code-review`） |
| 触发技能配置文件 | `.claude/skills/<name>/SKILL.md` |
| 全局技能目录 | `~/.claude/skills/` |
| 项目技能目录 | `项目根目录/.claude/skills/` |

**常用内置技能参考：**

| 技能名 | 功能 | 调用方式 |
|--------|------|----------|
| `code-review` | 深度代码审查 | `/code-review` |
| `security-review` | 安全漏洞审查 | `/security-review` |
| `frontend-design` | 前端 UI 设计指导 | `/frontend-design` |
| `deep-research` | 多源深度研究 | `/deep-research` |
| `verify` | 验证代码变更效果 | `/verify` |
| `simplify` | 代码简化/重构 | `/simplify` |
| `claude-api` | Claude API 开发参考 | `/claude-api` |
| `init` | 初始化 CLAUDE.md | `/init` |
| `loop` | 重复执行任务 | `/loop` |
| `fewer-permission-prompts` | 减少权限提示 | `/fewer-permission-prompts` |

---

## 十二、Hook 配置参考

Hooks 在 `settings.json` 中配置，用于在特定事件前后自动触发操作：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint:check ${FILE}"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "skill",
            "skill": "code-formatter",
            "timeout": 10000
          }
        ]
      }
    ]
  }
}
```

| Hook 类型 | 触发时机 | 用途 |
|-----------|----------|------|
| `PreToolUse` | 工具调用前 | 前置检查、lint、权限验证 |
| `PostToolUse` | 工具调用后 | 格式化、测试、后处理 |
| `PostMessage` | 消息处理后 | 日志、通知、统计 |

---

## 附录 A：命令速查表

### CLI 命令速查

```bash
claude                              # 启动交互式 REPL
claude "问句"                       # 单次查询
claude -p "问句"                    # 非交互式输出
claude --model opus "问句"          # 指定模型
claude --cwd /path "问句"           # 指定目录
claude --output-format json "问句"  # JSON 输出
claude login                        # 登录
claude logout                       # 登出
claude update                       # 更新
claude update --check               # 检查更新
claude config list                  # 查看配置
claude config set <k> <v>           # 设置配置
claude config get <k>               # 获取配置
claude config edit                  # 编辑配置文件
claude doctor                       # 环境诊断
claude whoami                       # 用户信息
claude mcp list                     # MCP 列表
claude mcp add <n> <cmd>            # 添加 MCP
claude mcp remove <n>               # 移除 MCP
```

### 交互命令速查

```bash
/help              # 帮助
/clear             # 清空上下文
/compact           # 压缩历史
/status            # 会话状态
/cost              # Token 费用
/model [name]      # 切换模型
/fast              # 快速模式
/plan              # 规划模式
/init              # 初始化 CLAUDE.md
/review            # 代码审查
/add-dir <path>    # 添加目录
/config            # 配置管理
/permissions       # 权限管理
/memory            # 持久化记忆
/doctor            # 环境诊断
/mcp               # MCP 管理
/tasks             # 后台任务
/workflows         # 工作流状态
/skills            # 技能列表
/agents            # 代理列表
/loop <n> <cmd>    # 循环执行
/worktree          # 工作区隔离
/design-sync       # 设计同步
/ide               # IDE 集成
```

### 快捷键速查

```
Enter        发送消息          Ctrl+C      中断操作
Alt+Enter    换行输入          Ctrl+D      退出
Ctrl+L       清屏              Ctrl+R      搜索历史
Ctrl+O       编辑器中打开      ↑ / ↓       历史命令
Tab          路径补全          Esc         退出预览
```

---

## 附录 B：版本兼容性说明

| 特性 | 最低版本 | 说明 |
|------|----------|------|
| `/skills` | 2.0+ | Skill 系统 |
| `/workflows` | 2.3+ | 多代理工作流 |
| `/design-sync` | 2.4+ | Claude Design 同步 |
| `/loop` | 2.2+ | 循环执行 |
| `/fast` | 2.5+ | 快速模式 |
| `claude-fable-5` | 2.6+ | Fable 5 模型支持 |
| `claude-mcp` | 2.0+ | MCP 服务器管理 |
| `--output-format stream-json` | 2.1+ | 流式 JSON 输出 |

> **检查版本**：`claude --version` | **更新**：`claude update`

---

*本文最后更新于 2026 年 7 月 3 日。命令和参数可能随版本更新变化，建议定期运行 `claude update` 并关注 Anthropic 官方文档。*
