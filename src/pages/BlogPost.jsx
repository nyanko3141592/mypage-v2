import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost } from '../utils/posts'

function BlogPostPage({ t }) {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPost(slug).then(p => {
            setPost(p)
            setLoading(false)
        })
    }, [slug])

    if (loading) return <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}><h2>LOADING...</h2></div>
    if (!post) return <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}><h2>POST NOT FOUND</h2></div>

    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/blog" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>

            <article className="brutal-card" style={{ padding: '3rem 2rem' }}>
                <header style={{ marginBottom: '3rem', borderBottom: '4px solid black', paddingBottom: '2rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: '#666', marginBottom: '0.5rem' }}>
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <h1 style={{ fontSize: 'min(3rem, 10vw)', lineHeight: 1.2, marginBottom: '1rem' }}>{post.title}</h1>
                    <div>
                        {post.tags && post.tags.map(tag => (
                            <span key={tag} className="brutal-tag">{tag}</span>
                        ))}
                    </div>
                </header>

                <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.body}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    )
}

export default BlogPostPage
