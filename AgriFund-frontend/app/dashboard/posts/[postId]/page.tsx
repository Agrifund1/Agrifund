import {
    getSortedPostsData,
    getPostData
} from "@/lib/blogs/post"
import { notFound } from "next/navigation"
import Link from "next/link"
import getFormattedDate from "@/components/ui/getFormattedDate"
import { DashboardLayout } from "@/components/dashboard/layout"
import ProtectedRoute from "@/components/ProtectedRoute"

export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}

export function generateMetadata({ params }:
    { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }:
    { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    if (!posts.find(post => post.id === postId)) notFound()

    const { title, date, contentHtml } = await getPostData(postId)

    const pubDate = getFormattedDate(date)

    return (
        <ProtectedRoute redirectTo="/">
            <DashboardLayout userType="investor">
                <div className="space-y-6">
                    <div className="px-6 prose prose-xl prose-green  mx-auto space-y-6">
                        <div>
                            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
                            <p className="mt-0">
                                {pubDate}
                            </p>
                        </div>
                        <article>
                            {/* <section className="space-y-4" dangerouslySetInnerHTML={{
                                __html: contentHtml
                            }} /> */}
                            <div className="space-y-4" dangerouslySetInnerHTML={{ __html: contentHtml}} />
                            {/* <p>
                                <Link href="/">← Back to home</Link>
                            </p> */}
                        </article>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}