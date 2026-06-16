---
title: Claude Code Skill 编写完全指南
date: 2026-06-16
tags: [Claude Code, AI编程, 开发工具, 效率提升, Claude, Skill]
summary: 全面深入的 Claude Code Skill 编写指南，涵盖 Skill 架构、Frontmatter 配置、Description 编写艺术、Body 指令最佳实践、激活机制、Anthropic 官方经验以及部署前检查清单，帮助你从零开始编写高质量 Skill。
head:
  - - meta
    - name: description
      content: Claude Code Skill 编写完全指南——从架构设计到部署检查的全方位教程，涵盖 Frontmatter、Description、Body 指令、激活机制及 Anthropic 官方实践经验
---

# Claude Code Skill 编写完全指南

> 基于 Anthropic 官方文档、社区最佳实践及实际项目经验整理
>
> **目标读者**：希望扩展 Claude Code 能力的开发者、团队技术负责人、AI 工具链开发者。
>
> **阅读建议**：第 1-2 章适合入门了解；第 3-5 章是核心编写指南；第 6-8 章适合进阶提升；第 9-10 章可作为部署前的参考检查。

---

[[TOC]]

---

## 1. 什么是 Skill

Skill 是 Claude Code 的一种扩展机制——本质上是一个包含 `SKILL.md` 文件的文件夹，放在 `.claude/skills/` 目录下。当用户的任务与 Skill 的 `description` 匹配时，Claude 会自动加载该 Skill 的指令来指导自身行为。

### Skill vs 其他扩展方式

| 维度 | Skill | MCP Server | Plugin |
|------|-------|------------|--------|
| 定位 | 行为指导 / 指令集 | 外部工具 / 数据源 | 完整扩展包 |
| 复杂度 | 低，一个 Markdown 文件 | 中，需要运行服务 | 高，完整目录结构 |
| 上下文开销 | 仅加载指令文本 | 按需调用 | 中等 |
| 适用场景 | 规范化编码、文档写作、代码审查 | 数据库查询、文件操作、API 调用 | 需要多组件协作的复杂场景 |
| 触发方式 | 自动匹配 / 手动 `/skill-name` | 工具调用 | 自动加载 |

### Skill 的三种形态

1. **全局 Skill**：放在 `~/.claude/skills/`，所有项目可见
2. **项目 Skill**：放在 `项目根目录/.claude/skills/`，仅当前项目可见
3. **插件 Skill**：通过 Plugin 系统分发，命名空间为 `/plugin-name:skill-name`

---

## 2. Skill 架构与文件结构

一个 Skill 由以下部分组成：

```
skill-name/
├── SKILL.md           ← 必需：核心指令文件（YAML frontmatter + Markdown body）
├── references/        ← 可选：按需加载的详细文档、示例、参考
│   ├── deep-dive.md
│   └── examples.md
├── scripts/           ← 可选：可执行脚本（Shell/Python 等）
│   └── validate.sh
└── assets/            ← 可选：模板、图片等输出资源
    └── template.md
```

### 文件职责

| 路径 | 职责 | 关键原则 |
|------|------|----------|
| `SKILL.md` | 行为规则、核心流程、关键指令 | **必须行为自足**——不读 references 也能正确执行 |
| `references/` | 深度内容、详细示例、API 文档 | 仅用于深化，不包含关键规则 |
| `scripts/` | 确定性任务脚本 | 避免每次重写，可被 Claude 调用执行 |
| `assets/` | 输出模板、静态资源 | 供 Claude 读取并作为输出参考 |

### 文件大小建议

| 层级 | 内容 | 建议上限 |
|------|------|----------|
| 1. Frontmatter | name + description | ~100 词 |
| 2. SKILL.md body | 核心指令 | < 500 行 / < 3000 词 |
| 3. references/ | 按需加载的深度内容 | 无硬性限制 |

**核心原则**：如果跳过 references 会导致 Claude 输出错误的内容，说明这部分应该放进 SKILL.md。

---

## 3. Frontmatter 完全指南

Frontmatter 是 SKILL.md 顶部的 YAML 元数据块，用 `---` 包裹。

### 完整字段一览

```yaml
---
# === 必需字段 ===
name: my-skill                        # Skill 名称（也是 /command-name）
description: >-
  这个技能做什么以及在什么时候被触发。

# === 工具权限 ===
allowed-tools:                        # 预授权工具列表（避免权限弹窗）
  - Read
  - Grep
  - Bash
  - Edit
  - Write

# === 行为控制 ===
disable-model-invocation: false       # true = 仅手动调用，不自动触发
user-invocable: true                  # 是否出现在 / 命令菜单中
context: fork                         # fork = 子代理隔离运行（实验性）
strict: false                         # 严格模式

# === 模型配置 ===
model: claude-sonnet-4-6              # 指定运行模型
effort: high                          # high / medium（投入程度）

# === 元信息 ===
version: 1.0.0                        # 版本号
author: team-awesome                  # 作者/团队
---
```

### 各字段详解

#### name（必需）

Skill 的唯一标识符，也是手动调用时的命令名。

```yaml
name: doc-coauthoring
# 手动调用：/doc-coauthoring
```

- 使用小写字母和连字符
- 保持简短（建议 2-3 个词）
- 与目录名保持一致

#### description（必需）

**最重要的字段**。决定了 Claude 何时自动激活该 Skill。详见第 4 节。

#### allowed-tools（强烈推荐）

预授权工具列表，避免每次执行都需要用户确认权限。

```yaml
allowed-tools:
  - Read                     # 全部授权
  - Grep
  - Bash(git:*)              # 仅 git 命令
  - Edit                      # 全部授权
  - Write                     # 全部授权
```

支持细粒度限制：`Bash(git:*)` 表示仅允许以 `git` 开头的 Bash 命令。

#### disable-model-invocation

```yaml
disable-model-invocation: true   # 仅通过 /command-name 手动调用
```

何时使用：
- 处理敏感操作（部署、提交、删除）
- 仅在你明确调用时才想运行的场景
- 不希望自动干扰 Claude 正常行为的场合

#### context: fork

将 Skill 放在隔离的子代理中运行，主会话不受影响。适合：
- 需要大量上下文但不想污染主会话的任务
- 高风险操作需要隔离执行
- 长时间运行的后台任务

#### effort

```yaml
effort: high      # 让 Claude 投入更多思考
effort: medium    # 默认级别
```

---

## 4. Description 编写艺术

`description` 是让 Claude **知道何时使用这个 Skill** 的唯一渠道。写好它，Skill 才能在正确的时机被触发。

### 黄金公式

```
描述 = 功能说明 + 触发场景 + 具体触发短语
```

### 好的描述

```yaml
description: >-
  为代码变更生成符合 Conventional Commits 规范的结构化提交信息。
  当用户想要提交变更、需要格式规范的提交信息时使用。
  可被以下请求触发："写提交信息"、"commit my changes"、
  "总结暂存区变更"、"commit message"、
  "帮我写提交信息"、"changelog"。
```

这个描述之所以好：
- 第一句清晰说明**做什么**
- 第二句说明**什么时候用**
- 第三句列出**用户可能怎么说**，覆盖不同表达方式

### 糟糕的描述

```yaml
description: 生成提交信息。        # ❌ 太模糊，难以匹配
description: 帮助编码              # ❌ 过于宽泛，处处误触发
description: 一个提交信息生成器    # ❌ 像功能标签，不是触发指令
description: Use this for commits  # ❌ 英文混杂，且缺乏触发词
```

### 编写原则

#### 1. 先说功能，再说触发

第一句就应该让 Claude 知道这个 Skill 是干什么的，不要用口号式的开头。

```yaml
# ✅ 好：直接说明功能
description: >-
  对 Pull Request 进行代码审查，检查安全性、性能和代码风格。

# ❌ 差：不知所云
description: >-
  质量就是生命，代码需要被认真对待。
```

#### 2. 广撒网，覆盖各种表达

用户不会用标准术语说需求——他们会用各种自然的表达方式。

```yaml
description: >-
  在以下场景触发：审查/检查/审阅/CR/看看代码/有没有问题/
  需要您看一下/能不能过一遍/review/audit
```

#### 3. 精准匹配领域

不要怕 description 太长，但要确保每个词都有意义。

```yaml
# 针对特定框架的技能
description: >-
  处理 React/Next.js 项目的路由、组件、服务端渲染相关任务。
  涉及 pages/ app/ 目录时触发。
```

#### 4. 用第三人称

官方推荐用「This skill should be used when...」而非「Use this skill when...」。

```yaml
description: >-
  This skill should be used when writing documentation,
  creating proposals, or drafting technical specs.
```

#### 5. 实测反馈：description 的局限性

根据社区实测数据：
- **无钩子 / 简单描述**：约 20-50% 激活率
- **带关键词描述**：约 40-60% 激活率
- **LLM 预评估钩子**：约 80% 激活率
- **手动 `/skill-name` 调用**：100%

结论：description 重要但不可完全依赖。对于关键 Skill，考虑配合 hooks 使用或直接手动调用。

---

## 5. Body 指令编写最佳实践

### 5.1 使用祈使句

指令应该告诉 Claude **做什么**，而不是**应该做什么**。

```markdown
# ✅ 正确：祈使句
- 使用 str_replace 进行编辑，不要重印整个文档
- 每次编辑后提供 artifact 链接
- 每节不超过 500 行

# ❌ 错误：建议/描述
- 你应该使用 str_replace 来编辑
- 我们需要确保每节不超过 500 行
- 可以的话，请提供 artifact 链接
```

### 5.2 指令布局策略（U 型注意力曲线）

研究表明，LLM 对指令的注意力呈 U 型分布——开头和结尾最有效。

```
┌─────────────────────────────────────┐
│  ▲ 前 20%（首因区）                 │
│  │ 身份声明、哲学、关键约束规则     │
│  │                                  │
│  │ 中间 60%                         │
│  │ 主题分组、详细规则、示例、路由    │
│  │                                  │
│  │ 后 20%（近因区）                 │
│  │ 强化关键规则、检查清单           │
│  ▼                                  │
└─────────────────────────────────────┘
```

**双重放置策略**：对于必须遵守的规则，在顶部说明原则，在底部用检查清单形式再次强化。

### 5.3 声明式优先

| 场景 | 推荐格式 |
|------|----------|
| 无顺序的规则、约束、约定 | 项目符号列表（声明式） |
| 严格顺序的多步流程 | 编号列表（程序式，≤ 15 步） |
| 独立条目（路由表、配置项） | KV 列表 |
| 二维比较、决策矩阵 | 表格 |
| 复杂逻辑分支 | 流程图描述 + 步骤 |

### 5.4 每条指令必须证明自己存在

**删除测试**：如果删除某条规则后，Claude 的输出质量不变，则移除它。

不要保留"以防万一"的指令——它们只会稀释真正重要的指令。

### 5.5 定义精确的输出格式

不要只说"写一个好的提交信息"，要精确说明：

```markdown
## 输出格式

提交信息必须遵循以下结构：

<type>(<scope>): <description>

<body>

<footer>

类型（type）必须是以下之一：feat | fix | docs | style | refactor | test | chore
描述（description）不超过 72 字符，祈使句、小写开头
正文（body）可选，每行不超过 72 字符
```

### 5.6 提供输入输出示例

示例是让 Claude 快速理解预期的最有效方式。

```markdown
## 示例

**输入：** "帮我审查这段代码"
\`\`\`python
def process(data):
    return eval(data)
\`\`\`

**输出：**
- ⚠️ 使用 `eval()` 存在代码注入风险
- 建议改用 `ast.literal_eval()` 或结构化解析
```

### 5.7 构建 "Gotchas" 章节

记录 Claude 在特定任务中经常犯错的地方。这是 Anthropic 内部最推崇的技巧之一。

```markdown
## 常见的坑

- 不要直接修改 lock 文件——应该通过包管理器更新
- 测试文件路径使用 `__tests__/` 而非 `test/`
- 不要删除看起来"无用"的 CSS 类——可能是第三方依赖需要的
- 这个项目的时区统一用 UTC，不要在代码中做本地时区转换
```

### 5.8 使用引用语法引用外部文件

```markdown
## 参考资料

- **[项目规范]** — \${CLAUDE_SKILL_DIR}/references/project-standards.md
  包含完整的编码规范、命名约定和目录结构说明。

- **[API 文档]** — \${CLAUDE_SKILL_DIR}/references/api-docs.md
  涵盖所有内部服务的 API 签名和调用示例。
```

`${CLAUDE_SKILL_DIR}` 会在运行时自动替换为 Skill 目录的实际路径。

---

## 6. 内容架构与渐进式披露

### 6.1 三层披露模型

```
第 1 层 ── Metadata (frontmatter)
  │  name + description
  │  ~100 词，始终在上下文中
  ▼
第 2 层 ── SKILL.md body
  │  核心行为规则和流程
  │  < 500 行 / < 3000 词
  ▼
第 3 层 ── references/ scripts/ assets/
  │  按需加载的深度内容
  │  无硬性限制
  ▼
```

### 6.2 内容放置决策树

```
某条信息是否重要？
├── 是：Claude 始终需要知道 → SKILL.md
├── 是：但太详细 → references/
│   ├── 示例代码、完整用例 → references/examples.md
│   ├── API 文档、配置表 → references/api.md
│   └── 边缘情况处理 → references/edge-cases.md
├── 否：偶尔需要 → 写在 references/ 里按需加载
└── 否：几乎不用 → 不写
```

### 6.3 结构化数据格式选择

| 数据类型 | 推荐格式 | 示例 |
|----------|----------|------|
| 路由表、工具引用 | KV 列表 | `pyright → ./venv/bin/pyright` |
| 决策矩阵、配置对比 | 表格 | 列：方案 / 优点 / 缺点 |
| 严格顺序的步骤 | 编号列表 | 1. 安装 → 2. 配置 → 3. 运行 |
| 无顺序规则 | 项目符号 | - 使用 2 空格缩进 |
| 复杂逻辑 | 流程图 + 文字描述 | if X then Y else Z |

---

## 7. 激活机制与可靠性

### 7.1 激活流程

```
用户输入 ──→ Claude 解析 ──→ 匹配 Skill description ──→ 加载 SKILL.md ──→ 执行指令
                  │
                  └── 未匹配 ──→ 正常处理，不加载 Skill
```

### 7.2 激活方式对比

| 方式 | 可靠性 | 适用场景 |
|------|--------|----------|
| 自动匹配（description） | 20-60% | 通用辅助 Skill，非关键路径 |
| 手动 `/skill-name` | 100% | 关键操作、复杂任务 |
| Hook（Pre/Post 钩子） | 80-100% | 必须执行的规则（代码风格、安全检查） |

### 7.3 提高激活率的技巧

1. **description 覆盖多种表达**——不要只写标准术语
2. **关键词堆叠**——在 description 中列出所有可能的触发词
3. **避免过度激活**——如果 Skill 频繁在不该触发的时候触发，缩小描述范围
4. **关键 Skill 使用 hooks**——对于必须执行的规则，配置 PostToolUse hook

### 7.4 何时该用 Hook 而非 Skill

| 场景 | 推荐方式 |
|------|----------|
| "提交前帮我检查代码格式" | PreToolUse Hook |
| "写一个技术方案文档" | Skill（自动匹配） |
| "每次编辑后运行测试" | PostToolUse Hook |
| "审查这个 PR" | Skill（手动调用） |
| "永远不要提交 .env 文件" | PreToolUse Hook |

---

## 8. Anthropic 官方实践经验

根据 Anthropic 团队成员 Thariq Shihipar 的分享，以下是他们内部使用 Skill 的实践总结。

### 8.1 九大 Skill 类别

Anthropic 内部将 Skill 分为以下 9 类：

| 类别 | 用途 | 示例 |
|------|------|------|
| **Library/API 参考** | 团队快速查阅框架或库的正确用法 | React 最佳实践、Pandas 常用模式 |
| **产品验证** | 发布前检查产品完整性和质量 | 检查登录流程、验证付款链路 |
| **数据获取** | 从监控/日志工具拉取数据 | 查询 Grafana 面板、分析日志 |
| **业务流程自动化** | 标准化重复性手动操作 | 创建 Jira 工单、更新 OnCall 轮值 |
| **代码脚手架** | 快速生成标准代码模板 | 新建组件、添加 API 路由 |
| **代码质量/审查** | 自动化代码审查和问题检测 | 安全审查、性能审查、风格检查 |
| **CI/CD** | 运维 CI/CD 管道 | 触发构建、回滚部署 |
| **Runbooks** | 处理已知的运维流程 | 数据库迁移、证书轮换、故障排查 |
| **基础设施** | 管理和配置基础设施 | Kubernetes 操作、Terraform 管理 |

### 8.2 关键经验

1. **描述要写"霸道"一点**——Claude 天然的倾向是不触发 Skill，所以描述要略 aggressive
2. **不要用 Skill 做显而易见的事**——Skip 不需要指导的基础能力
3. **Gotchas 章节**是 Anthropic 的最爱——记录容易出错的地方
4. **不让 Skill 过度约束 Claude**——Skill 是指导不是死命令，给 Claude 留判断空间
5. **日志让 Skill 拥有记忆**——通过读写日志文件，Skill 可以跨会话记住状态
6. **脚本优先于指令**——能写成脚本的逻辑就不要写成自然语言指令
7. **为模型写描述，不是给人看**——description 的目标读者是模型的语义匹配系统

---

## 9. 常见错误与陷阱

### 9.1 描述相关

| 错误 | 后果 | 修复 |
|------|------|------|
| description 太模糊 | 从不触发或处处误触发 | 加具体触发词和场景说明 |
| description 像产品说明 | 语义匹配度低 | 用第三人称 + 触发短语 |
| 只写英文触发词（中文用户） | 用户说中文时不触发 | 中英文触发词都覆盖 |

### 9.2 内容相关

| 错误 | 后果 | 修复 |
|------|------|------|
| 一个 Skill 塞太多功能 | 指令混乱，输出不可控 | 拆分为多个专注的 Skill |
| 关键规则放在 references/ 里 | Claude 不读 references 时出错 | 关键规则放 SKILL.md |
| 指令全是"你应该" | 过于委婉，Claude 容易忽略 | 用祈使句直接下指令 |
| 输出格式不明确 | 每次结果不一致 | 精确指定输出结构和示例 |
| SKILL.md 超过 500 行 | 核心指令可能被截断 | 详细内容移入 references/ |

### 9.3 权限相关

| 错误 | 后果 | 修复 |
|------|------|------|
| 没有设置 allowed-tools | 每次执行弹权限确认 | 预授权常用工具 |
| allowed-tools 过于宽泛 | 存在安全隐患 | 最小权限原则 |
| 在 Skill 中嵌入密钥 | 密钥泄露 | 使用环境变量或 MCP |

### 9.4 维护相关

| 错误 | 后果 | 修复 |
|------|------|------|
| 没有版本号 | 无法追踪变更 | 使用 version 字段 |
| 没有示例 | Claude 输出不稳定 | 至少提供一个 I/O 示例 |
| 从不更新 | 随 SDK 升级失效 | 定期审查和更新 |
| 没有测试 | 生产环境意外行为 | 写 2-3 个测试场景 |

---

## 10. 部署前检查清单

```markdown
## □ 基础结构
  □ name 匹配目录名（小写、连字符）
  □ description 以功能说明开头（非口号）
  □ description 覆盖多种触发场景
  □ allowed-tools 已设置（最小必要权限）
  □ 无密钥/敏感信息

## □ 内容质量
  □ SKILL.md 行为自足（关键规则不在 references 中）
  □ 指令使用祈使句
  □ 每条指令通过"删除测试"
  □ 至少有一个输入/输出示例
  □ 不超过 500 行（知识型可适当超出）

## □ 内容架构
  □ 关键规则位于顶部 20% 和/或底部 20%
  □ references 仅包含深化材料
  □ 结构化数据使用了正确格式
  □ 无重复内容

## □ 测试验证
  □ 手动 `/skill-name` 调用正常工作
  □ 自动触发在不同表述下表现一致
  □ references 路径引用正确
  □ 工具权限足够完成任务
```

---

## 11. 进阶技巧

### 11.1 通过日志实现跨会话记忆

```markdown
## 会话记忆

本技能使用 \${CLAUDE_SKILL_DIR}/scripts/skill.log 记录会话状态。
每次执行时，先读取日志了解历史上下文。
执行完毕后，将关键决策和状态写入日志。
```

### 11.2 Skill 组合与编排

```markdown
## 工作流编排

1. 首先调用 \`/code-review\` 进行代码审查
2. 根据审查结果，调用 \`/commit-writer\` 生成提交信息
3. 最后调用 \`/changelog\` 更新变更日志

每个步骤的输入输出通过文件传递：
  - 审查结果 → \${PROJECT_DIR}/.claude/review-output.md
  - 提交信息 → 传递给 git commit
```

### 11.3 使用 allowed-tools 的细粒度控制

```yaml
allowed-tools:
  - Read
  - Grep
  - Bash(git:*)         # 只允许 git 命令
  - Bash(npm:*)         # 只允许 npm 命令
  - Bash(cargo:*)       # 只允许 cargo 命令
```

### 11.4 为插件市场发布准备

```yaml
---
name: my-skill
description: >-
  ...
version: 1.0.0
author: team-name
license: MIT
---
```

加上版本和作者信息，便于通过 Plugin 系统分发。

### 11.5 Hooks 集成示例

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "skill",
      "skill": "code-formatter",
      "timeout": 10000
    }]
  }]
}
```

每次文件写入或编辑后，自动触发 `code-formatter` Skill。

---

## 12. 总结

### 核心原则

1. **精准描述**——description 是 Skill 的生命线，用功能说明 + 触发场景 + 关键词公式
2. **行为自足**——SKILL.md 不依赖外部文件也能正确执行
3. **渐进披露**——核心指令放 SKILL.md，深度内容放 references/
4. **单一职责**——一个 Skill 只做一件事，做好它
5. **声明式优先**——用规则和约束指导 Claude，而非冗长的步骤
6. **每行都要有意义**——删除测试，淘汰不重要的指令
7. **持续迭代**——Skill 是活的文档，根据实际使用反馈持续优化

### 一句话建议

> **写 Skill 不是写文档——是在教另一个工程师做你的工作，只是这个工程师恰好是 AI。**

---

## 参考资源

- [Anthropic Skills 官方仓库](https://github.com/anthropics/skills)
- [Claude Code 官方文档 - Plugins](https://code.claude.com/docs/en/plugins)
- [Lessons from building Claude Code: How we use skills — Anthropic Blog](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)
- [Claude Code Skills MD — Ultimate Guide (skywork.ai)](https://skywork.ai/blog/claude-code-skills-md-ultimate-guide/)
- [How to Build Your Own Claude Code Skill (freeCodeCamp)](https://www.freecodecamp.org/news/how-to-build-your-own-claude-code-skill/)
- [Claude Code Skills vs MCP vs Plugins (morphllm.com)](https://www.morphllm.com/claude-code-skills-mcp-plugins)

---

*本文整理自 Claude Code Skill 编写指南，最后更新于 2026 年 6 月 16 日。*
