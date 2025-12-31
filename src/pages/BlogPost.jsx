import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost } from '../utils/posts'
import TwitterEmbed from '../components/TwitterEmbed'
import LinkPreview from '../components/LinkPreview'

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

    const renderLink = (href) => {
        // Twitter Embed Detection
        if (href.match(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+/)) {
            const id = href.split('/').pop().split('?')[0]
            return <TwitterEmbed tweetId={id} />
        }
        // Link Preview for other URLs
        return <LinkPreview url={href} />
    }

    const components = {
        a: ({ href, children }) => {
            // Check if this is an autolink (URL displayed as-is)
            const getTextContent = (c) => {
                if (typeof c === 'string') return c
                if (Array.isArray(c)) return c.map(getTextContent).join('')
                return ''
            }
            const textContent = getTextContent(children)
            const isAutoLink = textContent === href || textContent.startsWith('http')

            // Twitter Embed Detection - standalone Twitter URLs become embeds
            if (href && href.match(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+/) && isAutoLink) {
                const id = href.split('/').pop().split('?')[0]
                return <TwitterEmbed tweetId={id} />
            }

            // Link Preview for other standalone URLs
            if (isAutoLink && href) {
                return <LinkPreview url={href} />
            }

            return <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--primary-color)', fontWeight: 'bold' }}>{children}</a>
        },
        p: ({ children }) => {
            // Check if paragraph contains only a URL string
            if (children && children.length === 1 && typeof children[0] === 'string') {
                const text = children[0].trim()
                if (text.match(/^https?:\/\/\S+$/)) {
                    return renderLink(text)
                }
            }
            return <p>{children}</p>
        },
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ width: '100%', height: 'auto', border: '4px solid black', margin: '2rem 0' }} />
        )
    }

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
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                    >
                        {post.body}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    )
}

export default BlogPostPage
