import { useState, useEffect } from 'react'
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

    if (loading) return <div className="empty-state"><p className="muted">Loading…</p></div>
    if (!post) return <div className="empty-state"><p className="muted">Post not found</p></div>

    const renderLink = (href) => {
        if (href.match(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+/)) {
            const id = href.split('/').pop().split('?')[0]
            return <TwitterEmbed tweetId={id} />
        }
        return <LinkPreview url={href} />
    }

    const components = {
        a: ({ href, children }) => {
            const getTextContent = (c) => {
                if (typeof c === 'string') return c
                if (Array.isArray(c)) return c.map(getTextContent).join('')
                return ''
            }
            const textContent = getTextContent(children)
            const isAutoLink = textContent === href || textContent.startsWith('http')

            if (href && href.match(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+/) && isAutoLink) {
                const id = href.split('/').pop().split('?')[0]
                return <TwitterEmbed tweetId={id} />
            }

            if (isAutoLink && href) {
                return <LinkPreview url={href} />
            }

            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
        },
        p: ({ children }) => {
            if (children && children.length === 1 && typeof children[0] === 'string') {
                const text = children[0].trim()
                if (text.match(/^https?:\/\/\S+$/)) {
                    return renderLink(text)
                }
            }
            return <p>{children}</p>
        },
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
        )
    }

    return (
        <div className="container">
            <div className="page-header">
                <Link to="/blog" className="back-link">← {t.back}</Link>
            </div>
            <article>
                <header className="article-header">
                    <div className="row-meta" style={{ marginBottom: 8 }}>
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <h1 className="profile-name" style={{ fontSize: 'clamp(1.4rem, 6vw, 1.9rem)' }}>{post.title}</h1>
                    <div style={{ marginTop: 12 }}>
                        {post.tags && post.tags.map(tag => (
                            <span key={tag} className="brutal-tag">{tag}</span>
                        ))}
                    </div>
                </header>
                <div className="markdown-content article-body">
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
