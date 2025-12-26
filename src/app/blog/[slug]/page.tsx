import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { MDXComponents } from '@/components/blog/MDXComponents'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/seo-config'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = getBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        return {}
    }

    return {
        title: `${post.title} | TitanCode Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: post.coverImage ? [post.coverImage] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: post.coverImage ? [post.coverImage] : undefined,
        },
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    // Schema.org structured data for BlogPosting
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        datePublished: post.date,
        image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/blog/${post.slug}`,
        },
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Wróć do bloga
                </Link>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Header */}
                <header className="space-y-6 mb-12 border-b border-border pb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXRemote source={post.content} components={MDXComponents} />
                </div>

                {/* Recent Posts */}
                <div className="mt-20 pt-12 border-t border-border">
                    <h3 className="text-2xl font-bold mb-8">Czytaj dalej</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {getBlogPosts()
                            .filter((p) => p.slug !== post.slug)
                            .slice(0, 3)
                            .map((recentPost) => (
                                <Link
                                    key={recentPost.slug}
                                    href={`/blog/${recentPost.slug}`}
                                    className="group block"
                                >
                                    <div className="space-y-3">
                                        {/* Thumbnail */}
                                        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                                            {recentPost.coverImage ? (
                                                <img
                                                    src={recentPost.coverImage}
                                                    alt={recentPost.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                                                    <span className="text-4xl">📄</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Info */}
                                        <div>
                                            <h4 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                {recentPost.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {recentPost.description}
                                            </p>
                                            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                                                <span>{recentPost.date}</span>
                                                <span>•</span>
                                                <span>{recentPost.readingTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* CTA Footer */}
                <div className="mt-20 p-8 rounded-2xl bg-muted/50 border border-border text-center space-y-6">
                    <h3 className="text-2xl font-bold">Potrzebujesz strony internetowej?</h3>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Skontaktuj się z nami i otrzymaj darmową wycenę swojego projektu.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="px-8 font-semibold">
                            Darmowa Wycena
                        </Button>
                    </Link>
                </div>
            </article>
        </div>
    )
}
