import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
    slug: string
    title: string
    description: string
    date: string
    author: string
    tags: string[]
    content: string
    readingTime: string
    coverImage?: string
}

export function getBlogPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                author: data.author,
                tags: data.tags || [],
                content,
                readingTime: readingTime(content).text,
                coverImage: data.coverImage || data.image,
            } as BlogPost
        })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            tags: data.tags || [],
            content,
            readingTime: readingTime(content).text,
            coverImage: data.coverImage || data.image,
        } as BlogPost
    } catch (e) {
        return null
    }
}

export function getAllBlogSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            return {
                params: {
                    slug: fileName.replace(/\.mdx$/, ''),
                },
            }
        })
}
