import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          The TitanCode Blog
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Insights, tutorials, and thoughts on modern web development.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
            <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="relative h-40 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <CardTitle className="mt-4 text-xl font-bold">{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}