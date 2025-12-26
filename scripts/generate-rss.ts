import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { getBlogPosts } from '../src/lib/blog';

async function generateRssFeed() {
  const siteUrl = 'https://titancode.pl';

  const feed = new RSS({
    title: 'TitanCode Blog',
    description: 'Insights, tutorials, and thoughts on modern web development.',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/og-image.png`,
    language: 'pl',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} TitanCode`,
  });

  const posts = getBlogPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      guid: `${siteUrl}/blog/${post.slug}`,
      date: post.date,
      author: post.author,
    });
  });

  const rssXml = feed.xml({ indent: true });
  const publicPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(publicPath, rssXml);
  console.log(`✅ Generated RSS feed at ${publicPath}`);
}

generateRssFeed();