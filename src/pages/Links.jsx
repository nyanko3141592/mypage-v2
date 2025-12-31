import React from 'react'
import { Link } from 'react-router-dom'
import { linksData } from '../data/links'
import LinkPreview from '../components/LinkPreview'

function LinksPage({ t }) {
    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Links</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>
                Bento.me is sunsetting, so I moved my links here.
            </p>

            {linksData.map((category, i) => (
                <section key={i} style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', borderBottom: '4px solid black', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                        {category.category}
                    </h2>
                    <div className="grid">
                        {category.items.map((item, j) => (
                            <div key={j} className="brutal-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '1rem', borderBottom: '4px solid black', background: 'var(--yellow)', fontWeight: 'bold' }}>
                                    {item.name}
                                </div>
                                <div style={{ padding: '1rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4' }}>
                                    <LinkPreview url={item.url} />
                                </div>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ textAlign: 'center', border: 'none', borderTop: '4px solid black', width: '100%' }}>
                                    Visit →
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

export default LinksPage
