import type { FeedOptions, Item } from 'feed'
import { join } from 'node:path'
import fg from 'fast-glob'
import { Feed } from 'feed'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

// --- YOUR SITE CONFIG ---
const DOMAIN = 'https://asquare.blog' // change if you deploy under a different domain
const AUTHOR = {
  name: 'Anshuman Agrawal',
  email: 'asquare567@gmail.com', // optional — remove if you don’t want email in the feed
  link: DOMAIN,
}
// ------------------------

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function run() {
  await buildBlogRSS()
}

async function buildBlogRSS() {
  const files = await fg('pages/posts/*.md')

  const options: FeedOptions = {
    title: 'Anshuman Agrawal',
    description: 'Notes, projects, and research logs',
    id: `${DOMAIN}/`,
    link: `${DOMAIN}/`,
    copyright: 'CC BY-NC-SA 4.0',
    feedLinks: {
      json: `${DOMAIN}/feed.json`,
      atom: `${DOMAIN}/feed.atom`,
      rss: `${DOMAIN}/feed.xml`,
    },
  }

  const posts: Item[] = (
    await Promise.all(
      files
        .filter(i => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)

          // skip drafts and non-English posts (adjust as needed)
          if (data?.draft)
            return
          if (data?.lang && data.lang !== 'en')
            return

          const html = markdown.render(content)
            // convert root-relative asset paths to absolute
            .replace(/src="\//g, `src="${DOMAIN}/`)

          if (data?.image?.startsWith?.('/'))
            data.image = DOMAIN + data.image

          // derive canonical link from file path: pages/posts/foo.md -> /posts/foo
          const link = `${DOMAIN}${i.replace(/^pages(\/.+)\.md$/, '$1')}`

          return {
            ...data,
            date: data?.date ? new Date(data.date) : new Date(),
            content: html,
            author: [AUTHOR],
            link,
          } as Item
        }),
    )
  ).filter(Boolean) as Item[]

  posts.sort((a, b) => +new Date(b.date as any) - +new Date(a.date as any))

  await writeFeed('feed', options, posts)
}

async function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = AUTHOR
  options.image = `${DOMAIN}/avatar.png` // ensure these exist in /public
  options.favicon = `${DOMAIN}/asquare_black.png`

  const feed = new Feed(options)
  items.forEach(item => feed.addItem(item))

  // write into /public so Vite copies them into /dist
  await fs.ensureDir('public')
  await fs.writeFile(join('public', `${name}.xml`), feed.rss2(), 'utf-8')
  await fs.writeFile(join('public', `${name}.atom`), feed.atom1(), 'utf-8')
  await fs.writeFile(join('public', `${name}.json`), feed.json1(), 'utf-8')
}

run()
