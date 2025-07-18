import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const post = await getPostData(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: [
          {
            url: `https://titancode.pl${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [`https://titancode.pl${post.image}`],
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'This post could not be found.',
    };
  }
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  let post;
  try {
    post = await getPostData(slug);
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: `https://titancode.pl${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TitanCode',
      logo: {
        '@type': 'ImageObject',
        url: 'https://titancode.pl/apple-touch-icon.png',
      },
    },
    description: post.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Back to all posts
              </Button>
            </Link>

            <article className="rounded-lg bg-card shadow-lg">
              <div className="p-6 md:p-8 lg:p-10">
                <header className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    {post.title}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground">
                    {post.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </header>

                <div className="my-8">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                  </div>
                </div>

                <div 
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed prose-a:text-primary hover:prose-a:underline prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>

            <footer className="mt-12 rounded-lg bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <Link href="/blog">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
                
                <div className="text-sm text-muted-foreground">
                  Share this article
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}