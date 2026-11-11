import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mediaItems } from '../data/media'

const kindOrder = ['all', 'interview', 'news', 'profile']

function formatDate(item, lang) {
    const label = lang === 'ja' ? item.dateLabelJa : item.dateLabelEn
    if (label) return label
    if (!item.date) return ''
    const [year, month, day] = item.date.split('-')
    return `${year}.${month}.${day}`
}

function MediaPage({ lang, t }) {
    const [filter, setFilter] = useState('all')
    const visible = filter === 'all' ? mediaItems : mediaItems.filter((item) => item.kind === filter)
    const kindLabel = {
        interview: t.kindInterview,
        news: t.kindNews,
        profile: t.kindProfile,
    }

    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
            <h1 style={{ fontSize: '3.5rem' }}>{t.mediaTitle}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', maxWidth: '40rem' }}>
                {t.mediaSubtitle}
            </p>
            <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {kindOrder.map((kind) => (
                    <button
                        key={kind}
                        className="brutal-btn"
                        onClick={() => setFilter(kind)}
                        style={{ background: filter === kind ? 'var(--yellow)' : 'white', color: 'black', padding: '0.5rem 1rem' }}
                    >
                        {kind === 'all' ? t.mediaAll : kindLabel[kind]}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {visible.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-card media-card"
                    >
                        <div className="media-card-top">
                            <span className="brutal-tag" style={{ background: 'black', color: 'white' }}>{kindLabel[item.kind]}</span>
                            <span className="brutal-tag">{item.outlet}</span>
                            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{formatDate(item, lang)}</span>
                        </div>
                        <h2 style={{ fontSize: '1.6rem', margin: '0.75rem 0' }}>{lang === 'ja' ? item.titleJa : item.titleEn}</h2>
                        <p style={{ margin: 0, fontSize: '1.05rem' }}>{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
                        <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{t.readArticle} →</div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MediaPage
