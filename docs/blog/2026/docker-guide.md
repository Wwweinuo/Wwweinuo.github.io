---
title: Docker 入门与实践指南
date: 2026-05-23
tags: [Docker, DevOps, 容器]
summary: 从核心概念到实战部署，涵盖 Dockerfile 编写、Docker Compose 多容器编排、镜像优化等完整内容，帮助你快速掌握容器化技术。
head:
  - - meta
    - name: description
      content: Docker 入门与实践指南——从安装配置到容器化部署的完整教程
---

# Docker 入门与实践指南

Docker 是现代软件开发中不可或缺的容器化工具。本文将带你从零开始，系统学习 Docker 的核心概念、常用命令、Dockerfile 编写以及 Docker Compose 多容器编排。

## Docker 是什么

Docker 是一个开源的容器化平台，它允许你将应用程序及其所有依赖打包到一个轻量级、可移植的**容器**中，然后在任何支持 Docker 的环境中运行。

与传统虚拟机不同，Docker 容器共享宿主机的操作系统内核，因此启动更快（秒级 vs 分钟级）、资源占用更少（MB 级 vs GB 级）。

**容器 vs 虚拟机对比：**

| 特性 | Docker 容器 | 传统虚拟机 |
|------|------------|-----------|
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | MB 级 | GB 级 |
| 隔离级别 | 进程级 | 系统级 |
| 内核 | 共享宿主机内核 | 独立内核 |
| 可移植性 | 极高 | 一般 |

## 安装 Docker

### Windows / macOS

直接从 [Docker 官网](https://docs.docker.com/get-docker/) 下载 **Docker Desktop** 安装即可，图形化界面开箱即用。

### Linux (Ubuntu)

```bash
# 卸载旧版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# 安装依赖
sudo apt-get update
sudo apt-get install ca-certificates curl

# 添加 Docker 官方 GPG 密钥
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 添加 Docker APT 源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 验证安装

```bash
docker run hello-world
```

看到 "Hello from Docker!" 说明安装成功。

## 核心概念

### 镜像

**镜像**是一个只读模板，包含运行应用程序所需的一切——代码、运行时、系统工具、库和配置。可以把镜像理解为容器的"蓝图"或"快照"。

镜像采用**分层结构**，每一层代表 Dockerfile 中的一条指令。这种分层设计带来了两个关键优势：

- **层复用**：多个镜像可以共享相同的底层（如 `node:20-alpine`），节省磁盘空间
- **构建缓存**：重新构建时，未改动的层直接使用缓存，显著加快构建速度

### 容器

**容器**是镜像的运行实例。一个镜像可以启动多个容器，每个容器相互隔离，拥有独立的文件系统、网络和进程空间。

容器的核心特性是**不可变性**——容器停止或删除后，其内部的文件系统变更也会丢失。需要持久化的数据应存储在**卷**中。

### 仓库

**仓库**用于存储和分发镜像。最常见的公共仓库是 [Docker Hub](https://hub.docker.com)，你也可以搭建私有仓库。

```bash
# 从仓库拉取镜像
docker pull nginx:latest

# 给镜像打标签（准备推送）
docker tag my-app:latest username/my-app:v1.0

# 推送到仓库
docker push username/my-app:v1.0
```

## 常用命令速查

### 镜像管理

```bash
docker pull nginx:latest         # 拉取镜像
docker image ls                  # 列出本地镜像
docker image ls -a               # 包括中间层镜像
docker rmi nginx:latest          # 删除镜像
docker rmi $(docker image ls -q) # 删除所有镜像
docker image prune               # 清理未使用的镜像
```

### 容器生命周期

```bash
# 启动容器
docker run -d --name my-nginx -p 8080:80 nginx:latest

# 常用 run 参数：
#   -d              后台运行
#   --name          指定容器名称
#   -p 8080:80      端口映射（宿主机:容器）
#   -v /data:/data  挂载卷（宿主机:容器）
#   -e KEY=VALUE    设置环境变量
#   --rm            退出时自动删除容器
#   --restart=always 容器退出时自动重启
#   --network=host  使用宿主机网络

docker ps                        # 查看运行中的容器
docker ps -a                     # 查看所有容器（包括已停止）
docker stop my-nginx             # 停止容器
docker start my-nginx            # 启动已停止的容器
docker restart my-nginx          # 重启容器
docker rm my-nginx               # 删除容器
docker rm -f my-nginx            # 强制删除运行中的容器
```

### 调试与日志

```bash
docker logs my-nginx             # 查看容器日志
docker logs -f my-nginx          # 持续跟踪日志
docker logs --tail 50 my-nginx   # 查看最近 50 行日志

docker exec -it my-nginx bash    # 进入容器交互式终端
docker exec my-nginx ls /app     # 在容器中执行命令

docker inspect my-nginx          # 查看容器详细信息
docker stats                     # 查看容器资源占用（CPU、内存）
docker top my-nginx              # 查看容器内进程

docker cp my-nginx:/app/log.txt . # 从容器拷贝文件到宿主机
```

### 清理空间

```bash
docker system prune              # 清理停止的容器、未使用的网络、悬空镜像
docker system prune -a           # 清理所有未使用的镜像（更彻底）
docker system prune -a --volumes # 同时清理未使用的卷
docker container prune           # 仅清理停止的容器
docker image prune               # 仅清理未使用的镜像
docker volume prune              # 仅清理未使用的卷
```

## Dockerfile 编写指南

**Dockerfile** 是一个文本文件，包含构建镜像所需的所有指令。下面是一个完整的示例：

```dockerfile
# 1. 指定基础镜像
FROM node:20-alpine

# 2. 设置工作目录
WORKDIR /app

# 3. 先复制依赖文件（利用层缓存）
COPY package.json package-lock.json* ./

# 4. 安装依赖
RUN npm ci --production

# 5. 复制应用代码
COPY . .

# 6. 暴露端口（声明性，实际映射在 docker run -p 时指定）
EXPOSE 3000

# 7. 设置环境变量
ENV NODE_ENV=production

# 8. 创建非 root 用户并切换
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# 9. 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# 10. 启动命令
CMD ["node", "server.js"]
```

### 常用指令说明

| 指令 | 说明 | 示例 |
|------|------|------|
| `FROM` | 指定基础镜像 | `FROM python:3.12-slim` |
| `WORKDIR` | 设置工作目录 | `WORKDIR /app` |
| `RUN` | 构建时执行命令 | `RUN apt-get update && apt-get install -y curl` |
| `COPY` | 复制文件到镜像 | `COPY . /app` |
| `ADD` | 复制文件（支持 URL 和自动解压 tar） | `ADD archive.tar.gz /app` |
| `ENV` | 设置环境变量 | `ENV NODE_ENV=production` |
| `ARG` | 构建参数（构建时可用） | `ARG VERSION=1.0` |
| `EXPOSE` | 声明容器监听端口 | `EXPOSE 8080` |
| `CMD` | 容器默认启动命令 | `CMD ["python", "app.py"]` |
| `ENTRYPOINT` | 容器入口点（不可被覆盖） | `ENTRYPOINT ["nginx"]` |
| `VOLUME` | 创建挂载点 | `VOLUME /data` |
| `USER` | 切换用户 | `USER nodejs` |
| `HEALTHCHECK` | 健康检查 | `HEALTHCHECK CMD curl -f http://localhost/ || exit 1` |

### CMD vs ENTRYPOINT

- `CMD`：提供默认命令，`docker run` 后的参数可以完全覆盖它
- `ENTRYPOINT`：定义容器入口点，`docker run` 后的参数会**追加**到它后面

```dockerfile
# CMD 模式：默认运行 bash
CMD ["bash"]
# 可被覆盖：docker run my-image python app.py

# ENTRYPOINT 模式：固定运行 nginx
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
# docker run my-image -t  → 等价于 nginx -t
```

### 多阶段构建

多阶段构建可以将构建环境和运行环境分离，显著减小最终镜像体积：

```dockerfile
# 阶段 1：构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 阶段 2：运行阶段（只保留构建产物）
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

构建阶段包含完整的编译工具链和源代码，但最终镜像只包含运行时必要的文件，体积可以减少 70% 以上。

### .dockerignore

在项目根目录创建 `.dockerignore`，排除不需要发送到构建上下文的文件：

```
node_modules
.git
.env
dist
*.log
Dockerfile
docker-compose.yml
```

## Docker Compose 多容器编排

当应用需要多个服务（如 Web + 数据库 + 缓存）协同工作时，使用 Docker Compose 可以一键管理所有服务。

### 示例：Node.js + PostgreSQL + Redis

**docker-compose.yml：**

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:password@db:5432/mydb
      REDIS_URL: redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_healthy
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
  redisdata:
```

### Compose 常用命令

```bash
docker compose up -d              # 启动所有服务（后台运行）
docker compose up -d --build      # 重新构建镜像并启动
docker compose down               # 停止并删除所有服务
docker compose down -v            # 同时删除卷（注意数据丢失）
docker compose ps                 # 查看服务状态
docker compose logs -f web        # 查看指定服务日志
docker compose exec web bash      # 进入指定服务容器
docker compose restart web        # 重启指定服务
docker compose pull               # 拉取最新镜像
docker compose up -d --scale web=3  # 启动 3 个 web 实例
```

## 实战示例

### 示例 1：运行 Nginx 静态网站

```bash
# 在本地目录创建一个简单的 HTML 文件
mkdir my-site && cd my-site
echo '<h1>Hello Docker!</h1>' > index.html

# 运行 Nginx 挂载当前目录
docker run -d --name my-site -p 8080:80 -v $PWD:/usr/share/nginx/html nginx:alpine

# 访问 http://localhost:8080 即可看到页面
```

### 示例 2：容器化 Python 应用

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t my-python-app .
docker run -d --name api -p 8000:8000 my-python-app
```

### 示例 3：快速搭建开发环境

使用 Docker Compose 一行命令启动 WordPress + MySQL：

```yaml
# docker-compose.yml
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: secret
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_data:/var/www/html

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: root-secret
    volumes:
      - db_data:/var/lib/mysql

volumes:
  wp_data:
  db_data:
```

```bash
docker compose up -d
# 打开 http://localhost:8080 即可安装 WordPress
```

## 最佳实践

### 镜像优化

- **选择轻量基础镜像**：优先使用 `alpine` 变体（如 `node:20-alpine` 仅 ~50MB，而完整版 ~350MB）
- **多阶段构建**：分离构建环境和运行环境，最终镜像只保留必要产物
- **合并 RUN 指令**：减少镜像层数

```dockerfile
# 不好：每行一个 RUN，产生多层
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN rm -rf /var/lib/apt/lists/*

# 好：合并为一条，且清理缓存
RUN apt-get update && \
    apt-get install -y curl git && \
    rm -rf /var/lib/apt/lists/*
```

- **利用层缓存**：把变化频率低的指令放前面（先 COPY 依赖文件，再 COPY 源码）

```dockerfile
# 好：依赖文件独立一层，代码改动时不用重新安装依赖
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
```

### 安全加固

- **不要以 root 用户运行**：在 Dockerfile 中创建专用用户并切换
- **使用固定版本标签**：避免使用 `latest`，锁定具体版本如 `node:20.11.1-alpine`
- **扫描镜像漏洞**：使用 `docker scout quickview <image>` 检查安全问题
- **不硬编码敏感信息**：通过环境变量或 Docker Secrets 传递密钥

### 日志管理

容器日志默认保存在宿主机，长时间运行会占用大量磁盘空间：

```bash
# 启动时限制日志大小
docker run -d \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  nginx:alpine
```

### 网络模式

| 模式 | 说明 | 使用场景 |
|------|------|---------|
| `bridge`（默认） | 容器通过虚拟网桥通信 | 一般容器间通信 |
| `host` | 直接使用宿主机网络栈 | 高性能网络需求 |
| `none` | 禁用网络 | 安全隔离场景 |
| `overlay` | 跨宿主机容器通信 | Docker Swarm 集群 |

```bash
# 创建自定义网络（推荐，支持 DNS 服务发现）
docker network create my-net

# 将容器加入同一网络（可通过容器名互相访问）
docker run -d --name app --network my-net my-app
docker run -d --name db --network my-net postgres:16-alpine
# app 容器可以通过 "db" 直接访问数据库
```

## 常用镜像速查

| 镜像 | 用途 | 拉取命令 |
|------|------|---------|
| Nginx | Web 服务器 / 反向代理 | `docker pull nginx:alpine` |
| MySQL | 关系型数据库 | `docker pull mysql:8.0` |
| PostgreSQL | 关系型数据库 | `docker pull postgres:16-alpine` |
| Redis | 缓存 / 消息队列 | `docker pull redis:7-alpine` |
| Node.js | JavaScript 运行时 | `docker pull node:20-alpine` |
| Python | Python 运行时 | `docker pull python:3.12-slim` |
| MongoDB | NoSQL 数据库 | `docker pull mongo:7` |
| RabbitMQ | 消息队列 | `docker pull rabbitmq:3-management-alpine` |

## 总结

- **镜像**是静态蓝图，**容器**是运行实例，**仓库**是镜像分发中心
- Dockerfile 利用**分层缓存**和**多阶段构建**来优化构建速度和镜像体积
- **Docker Compose** 用声明式 YAML 管理多容器应用，一个命令启停整个服务栈
- 生产环境中优先使用 **alpine/slim 变体**，锁定版本号，不以 root 运行
- 定期执行 `docker system prune` 清理磁盘空间
