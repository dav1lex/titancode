import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      image: data.image,
      tags: data.tags,
      readingTime: readingTime(content).text,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<Post> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if file exists to prevent crashes
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Unknown',
      description: data.description || '',
      image: data.image || '/og-image.png',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: readingTime(content).text,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    throw error;
  }
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}