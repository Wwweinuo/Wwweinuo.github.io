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
        let dateStr = ''
        try {
          const filePath = resolve(docsDir, `.${page.url}.md`)
          dateStr = statSync(filePath).mtime.toISOString().slice(0, 10)
        } catch {
          // ignore
        }
        const rawDate = page.frontmatter.date
        const publishDate = rawDate instanceof Date
          ? rawDate.toISOString().slice(0, 10)
          : String(rawDate || dateStr)
        return {
          title: page.frontmatter.title || '',
          url: page.url,
          date: publishDate,
          summary: page.frontmatter.summary || '',
          tags: page.frontmatter.tags || [],
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  },
})
