---
title: About
---

> 在自己的节奏里，慢慢成为更好的人。

<script setup>
import { ref } from 'vue'

const tabs = ref([
  {
    label: '个人简介',
    content: `<p>主要专注于 Java 后端开发方向，具备较为扎实的 Java 基础以及后端项目开发经验。熟悉 Spring Boot、MyBatis-Plus、MySQL、Redis 等主流技术，同时具备一定的 Vue3 前端开发能力，能够完成基础的前后端联调与全栈项目开发。</p>
<p>持续学习 JVM、并发编程、Linux、计算机网络、数据结构与算法等计算机基础，关注微服务、AI 应用开发、系统架构设计等方向，希望逐步成长为具备系统设计能力的后端工程师。</p>`,
  },
  {
    label: '技术栈',
    content: `<h3>后端开发</h3>
<ul>
<li>Java 基础、集合框架、多线程与并发编程、JVM、IO 与网络编程、Lambda 与 Stream API</li>
<li>Spring / Spring MVC / Spring Boot</li>
<li>MyBatis / MyBatis-Plus</li>
<li>Maven</li>
<li>RESTful API 开发</li>
</ul>
<h3>数据库与缓存</h3>
<ul>
<li>MySQL</li>
<li>Redis</li>
<li>数据库表设计、SQL 优化、缓存应用场景</li>
</ul>
<h3>前端技术</h3>
<ul>
<li>Vue3</li>
<li>Element Plus</li>
<li>HTML / CSS / JavaScript</li>
<li>Axios</li>
<li>前后端分离开发</li>
</ul>
<h3>开发与部署环境</h3>
<ul>
<li>Linux / Docker</li>
<li>Git / GitHub</li>
<li>IntelliJ IDEA / VS Code / Postman</li>
</ul>
<h3>其他</h3>
<ul>
<li>邮件通知系统</li>
<li>AI 辅助开发</li>
</ul>`,
  },
])
</script>

<Tabs :tabs="tabs" />
