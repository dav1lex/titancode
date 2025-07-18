import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
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
  } catch (error) {
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
  const { slug } = await params;
  let post;
  try {
    post = await getPostData(slug);
  } catch (error) {
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
      <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <article className="prose prose-lg mx-auto dark:prose-invert">
          <div className="space-y-4 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime}</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
            <div className="relative my-8 h-64 w-full md:h-96">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}