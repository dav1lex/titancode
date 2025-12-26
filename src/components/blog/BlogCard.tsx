import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogCardProps {
    post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group bg-card">
                <CardHeader className="p-0">
                    {/* Cover Image Placeholder or Actual Image */}
                    <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
                        {post.coverImage ? (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                                <span className="text-4xl">📄</span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs font-medium">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                        {post.description}
                    </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between text-sm text-muted-foreground mt-auto">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </CardFooter>
            </Card>
        </Link>
    )
}
