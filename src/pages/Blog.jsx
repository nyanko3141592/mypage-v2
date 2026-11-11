import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../utils/posts'

function BlogPage({ t }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosts().then(p => {
            setPosts(p)
            setLoading(false)
        })
    }, [])

    return (
        <div className="container">
            <div className="page-header">
                <Link to="/" className="back-link">← {t.back}</Link>
                <h1>{t.blogPageTitle}</h1>
                <p className="page-subtitle">{t.blogPageSubtitle}</p>
            </div>

            {loading ? (
                <div className="empty-state">
                    <p className="muted">Loading…</p>
                </div>
            ) : (
                posts.map(post => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="list-row">
                        <div className="row-meta">{new Date(post.date).toLocaleDateString()}</div>
                        <h2 className="row-title">{post.title}</h2>
                        <p className="row-body muted">{post.description}</p>
                        <div className="row-meta" style={{ marginTop: 8 }}>
                            {post.tags && post.tags.map(tag => (
                                <span key={tag} className="brutal-tag">{tag}</span>
                            ))}
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default BlogPage
