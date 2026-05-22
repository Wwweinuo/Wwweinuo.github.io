import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: string
  summary: string
  tags: string[]
}

export default createContentLoader('blog/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(raw): Post[] {
    return raw
      .filter((page) => page.url !== '/blog/')
      .map((page) => ({
        title: page.frontmatter.title || '',
        url: page.url,
        date: String(page.frontmatter.date || ''),
        summary: page.frontmatter.summary || '',
        tags: page.frontmatter.tags || [],
      }))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  },
})
