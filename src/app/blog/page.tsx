import { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { createMetadata } from '@/lib/seo-config'

export const metadata: Metadata = createMetadata('blog')

export default function BlogIndexPage() {
    const posts = getBlogPosts()

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Blog <span className="text-primary">TitanCode</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Wiedza, poradniki i nowości ze świata technologii webowych.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">Brak wpisów. Zajrzyj wkrótce!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
