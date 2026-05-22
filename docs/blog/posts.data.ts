import { createContentLoader } from 'vitepress'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface Post {
  title: string
  url: string
  date: string
  summary: string
  tags: string[]
}

const docsDir = resolve(fileURLToPath(import.meta.url), '../..')

export default createContentLoader('blog/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(raw): Post[] {
    return raw
      .filter((page) => page.url !== '/blog/')
      .map((page) => {
        let mtime = String(page.frontmatter.date || '')
        try {
          const filePath = resolve(docsDir, `.${page.url}.md`)
          mtime = statSync(filePath).mtime.toISOString().slice(0, 10)
        } catch {
          // 读取文件时间失败则回退到 frontmatter date
        }
        return {
          title: page.frontmatter.title || '',
          url: page.url,
          date: mtime,
          summary: page.frontmatter.summary || '',
          tags: page.frontmatter.tags || [],
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  },
})
