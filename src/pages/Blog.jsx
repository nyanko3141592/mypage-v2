import React, { useState, useEffect } from 'react'
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
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
            <h1 style={{ fontSize: '3.5rem' }}>{t.blogPageTitle}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>{t.blogPageSubtitle}</p>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <h2>LOADING...</h2>
                </div>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                    {posts.map(post => (
                        <div key={post.slug} className="brutal-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', color: '#666' }}>{new Date(post.date).toLocaleDateString()}</span>
                                <div>
                                    {post.tags && post.tags.map(tag => (
                                        <span key={tag} className="brutal-tag" style={{ fontSize: '0.7rem' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{post.title}</h2>
                            <p style={{ marginBottom: '1.5rem' }}>{post.description}</p>
                            <Link to={`/blog/${post.slug}`} className="brutal-btn">{t.readMore}</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BlogPage
