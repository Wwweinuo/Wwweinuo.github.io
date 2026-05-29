---
title: WinGet — Windows 包管理器完全指南
date: 2026-05-29
tags: [WinGet, Windows, 包管理器, 效率工具]
summary: 全面介绍 Windows 官方包管理器 WinGet 的安装、配置与日常使用，涵盖软件搜索安装、批量管理、导出导入等实用技巧，助你告别手动下载安装的繁琐流程。
head:
  - - meta
    - name: description
      content: WinGet Windows 包管理器完全指南——从安装配置到批量管理的完整教程
---

# WinGet — Windows 包管理器完全指南

在 Linux 世界里，`apt`、`yum`、`pacman` 等包管理器早已成为标配——一条命令就能完成软件的搜索、安装、升级和卸载。而在 Windows 上，用户长期依赖手动下载 `.exe`/`.msi` 安装包，然后一路 "Next" 的落后方式。

**WinGet（Windows Package Manager）** 的出现彻底改变了这一状况。这是微软官方推出的开源包管理器，让你在 Windows 上也能享受到命令行一键安装软件的便捷体验。

## WinGet 是什么

WinGet 是微软于 2020 年发布、2021 年正式推出的 Windows 官方包管理器。它的核心功能可以概括为一句话：

> 在终端中输入一行命令，自动完成软件的搜索、下载、安装和配置。

**WinGet 的核心理念：**

- **官方维护**：由微软主导开发，与 Windows 深度集成
- **开源社区驱动**：代码托管在 [GitHub](https://github.com/microsoft/winget-cli)，社区贡献软件清单
- **海量软件库**：社区维护的 [winget-pkgs](https://github.com/microsoft/winget-pkgs) 仓库已收录数万个常用软件
- **命令行优先**：为开发者和效率控量身打造，也支持图形界面

## WinGet 与其他包管理器的对比

| 特性 | WinGet | Chocolatey | Scoop |
|------|--------|------------|-------|
| **维护方** | 微软官方 | 社区 | 社区 |
| **内置** | Windows 10/11 自带 | 需安装 | 需安装 |
| **安装权限** | 可静默安装 | 需要管理员 | 用户态安装 |
| **软件数量** | 数万+ | 数万+ | 数千 |
| **GUI 支持** | 无（仅 CLI） | 有（收费） | 无 |
| **安装路径** | 软件默认路径 | 软件默认路径 | `~/scoop/` 用户目录 |

> **小结**：如果你追求原生、官方支持，选 WinGet；如果需要更强的包管理能力和商业支持，选 Chocolatey；如果偏好便携式和用户态安装，选 Scoop。

## 安装与启用 WinGet

### Windows 10/11 用户

Windows 10 1809+ 和 Windows 11 已经内置了 WinGet。你可以通过以下命令检查是否已安装：

```bash
winget --version
```

如果显示版本号，说明已就绪。

### 手动安装 / 更新到最新版

如果系统没有自带，或者想升级到最新版本，有两种方式：

**方式一：通过 Microsoft Store 安装/更新**

搜索 "App Installer" 并安装/更新即可——WinGet 随 "App Installer" 分发。

**方式二：通过 GitHub Release 安装**

```bash
# 访问 GitHub Release 页面，下载最新的 .msixbundle 文件
# https://github.com/microsoft/winget-cli/releases
# 双击安装即可
```

## 基础使用教程

### 搜索软件

```bash
# 搜索软件（支持模糊匹配）
winget search vscode

# 搜索结果示例：
# 名称                    ID                          版本          源
# Microsoft Visual Studio Code  XP9K7LF86LQDNJ   1.98.0        winget
```

```bash
# 精确搜索（按 ID）
winget search --id Microsoft.VisualStudioCode

# 搜索指定源
winget search vscode --source winget
```

### 安装软件

```bash
# 安装最新版
winget install Microsoft.VisualStudioCode

# 指定版本安装
winget install Microsoft.VisualStudioCode --version 1.97.0

# 静默安装（无交互）
winget install Microsoft.VisualStudioCode --silent

# 安装到指定路径
winget install Microsoft.VisualStudioCode --location D:\Apps\VSCode
```

### 查看已安装软件

```bash
# 列出所有已安装（WinGet 管理的 + 系统已有的）
winget list

# 只列出可通过 WinGet 升级的
winget list --upgrade-available
```

### 升级软件

```bash
# 升级指定软件
winget upgrade Microsoft.VisualStudioCode

# 升级所有可升级的软件
winget upgrade --all

# 排除某些软件不升级
winget upgrade --all --exclude "Docker.DockerDesktop"
```

### 卸载软件

```bash
# 卸载软件
winget uninstall Microsoft.VisualStudioCode

# 完全卸载（包括配置文件等）
winget uninstall Microsoft.VisualStudioCode --purge
```

## 进阶技巧

### 查看软件详细信息

```bash
# 查看软件详情（描述、主页、许可证等）
winget show Microsoft.VisualStudioCode
```

### 导出与导入软件清单

这是换电脑或重装系统时最有用的功能——一键还原所有软件。

```bash
# 导出已安装软件列表到 JSON 文件
winget export -o my-apps.json

# 查看导出的文件内容
cat my-apps.json
```

导出的 JSON 文件示例：

```json
{
  "$schema": "https://aka.ms/winget-settings-export.schema.json",
  "Sources": [
    {
      "Packages": [
        { "PackageIdentifier": "Microsoft.VisualStudioCode" },
        { "PackageIdentifier": "Git.Git" },
        { "PackageIdentifier": "Google.Chrome" },
        { "PackageIdentifier": "Mozilla.Firefox" },
        { "PackageIdentifier": "7zip.7zip" }
      ],
      "SourceDetails": {
        "Argument": "https://cdn.winget.microsoft.com/cache",
        "Identifier": "Microsoft.Winget.Source_8wekyb3d8bbwe",
        "Name": "winget",
        "Type": "Microsoft.PreIndexed.Package"
      }
    }
  ]
}
```

```bash
# 在新电脑上批量安装
winget import -i my-apps.json

# 忽略不存在的包，继续安装
winget import -i my-apps.json --ignore-unavailable

# 静默导入，不接受任何协议
winget import -i my-apps.json --accept-package-agreements
```

### 配置 WinGet

WinGet 的配置文件默认位于 `%LOCALAPPDATA%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\settings.json`。

```json
{
  "$schema": "https://aka.ms/winget-settings.schema.json",
  "source": {
    "autoUpdateIntervalInMinutes": 5
  },
  "visual": {
    "progressBar": "rainbow"
  },
  "installBehavior": {
    "preferences": {
      "scope": "user"
    }
  },
  "experimentalFeatures": {
    "dependencies": true,
    "directMSI": true,
    "zipInstall": true
  }
}
```

常用配置项说明：

| 配置项 | 说明 |
|--------|------|
| `source.autoUpdateIntervalInMinutes` | 软件源自动更新间隔（分钟） |
| `visual.progressBar` | 进度条样式：`rainbow`（彩虹）/ `accent`（强调色）/ `plain`（朴素） |
| `installBehavior.preferences.scope` | 安装范围：`user`（当前用户）/ `machine`（所有用户） |
| `experimentalFeatures.dependencies` | 启用依赖自动安装 |
| `experimentalFeatures.directMSI` | 启用 MSI 直接安装 |
| `experimentalFeatures.zipInstall` | 启用 .zip 便携版安装支持 |

### 批量操作实战

```bash
# 一次性安装多个软件
winget install Git.Git Google.Chrome 7zip.7zip Mozilla.Firefox

# 根据搜索结果批量安装
winget search "browser" | winget install

# 查看哪些软件有可用更新
winget upgrade

# 升级所有软件（一键搞定）
winget upgrade --all
```

## 常用软件安装命令速查

```bash
# === 开发工具 ===
winget install Git.Git                          # Git
winget install Microsoft.VisualStudioCode       # VS Code
winget install OpenJS.NodeJS.LTS                # Node.js LTS
winget install Python.Python.3.12              # Python 3.12
winget install Microsoft.PowerShell             # PowerShell 7
winget install Microsoft.WindowsTerminal        # Windows Terminal

# === 浏览器 ===
winget install Google.Chrome                    # Chrome
winget install Mozilla.Firefox                  # Firefox

# === 效率工具 ===
winget install 7zip.7zip                       # 7-Zip
winget install Notepad++.Notepad++             # Notepad++
winget install AgileBits.1Password             # 1Password
winget install Obsidian.Obsidian                # Obsidian

# === 通讯协作 ===
winget install Discord.Discord                  # Discord
winget install SlackTechnologies.Slack          # Slack
winget install Tencent.WeChat                   # 微信
winget install Spotify.Spotify                  # Spotify
```

## 常见问题与排错

### 搜索不到需要的软件？

```bash
# 尝试更新软件源
winget source update

# 查看当前使用的源
winget source list

# 添加额外的第三方源
winget source add -n MySource https://example.com/source
```

### 安装失败怎么办？

```bash
# 查看详细安装日志
winget install <PackageId> --verbose-logs

# 日志文件位置
# %LOCALAPPDATA%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\DiagOutputDir\
```

常见失败原因：
1. **网络问题**：部分软件安装包托管在 GitHub，国内网络可能受限
2. **权限不足**：某些软件需要管理员权限，以管理员身份运行终端
3. **安装包哈希不匹配**：运行 `winget source update` 更新软件源后重试

### 如何为自己的软件添加 WinGet 支持？

将你的软件的安装清单提交到 [microsoft/winget-pkgs](https://github.com/microsoft/winget-pkgs) 仓库即可。社区审核通过后，全球用户就能通过 `winget install` 安装你的软件了。

## 总结

WinGet 让 Windows 终于拥有了和 Linux 同等水平的包管理体验。对于开发者、运维人员和注重效率的用户来说，它的价值不言而喻：

- ✅ **一条命令搞定软件安装**，告别手动下载和安装向导
- ✅ **一键升级所有软件**，避免安全漏洞
- ✅ **导出/导入配置**，换电脑无痛迁移
- ✅ **完全免费开源**，微软官方背书

试试打开终端，输入 `winget upgrade --all`，看看有多少软件可以一键更新吧！

---

**参考链接：**

- [WinGet 官方文档](https://learn.microsoft.com/zh-cn/windows/package-manager/)
- [WinGet CLI GitHub 仓库](https://github.com/microsoft/winget-cli)
- [WinGet 软件包清单仓库](https://github.com/microsoft/winget-pkgs)
