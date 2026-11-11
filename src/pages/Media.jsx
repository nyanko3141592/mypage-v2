import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mediaItems } from '../data/media'

const kindOrder = ['all', 'interview', 'news', 'profile']

function formatDate(item, lang) {
    const label = lang === 'ja' ? item.dateLabelJa : item.dateLabelEn
    if (label) return label
    if (!item.date) return ''
    const [year, month, day] = item.date.split('-')
    return year + '.' + month + '.' + day
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
        <div className="container">
            <div className="page-header">
                <Link to="/" className="back-link">← {t.back}</Link>
                <h1>{t.mediaTitle}</h1>
                <p className="page-subtitle">{t.mediaSubtitle}</p>
            </div>
            <div className="filter-row">
                {kindOrder.map((kind) => (
                    <button
                        key={kind}
                        type="button"
                        className={'chip' + (filter === kind ? ' is-active' : '')}
                        onClick={() => setFilter(kind)}
                    >
                        {kind === 'all' ? t.mediaAll : kindLabel[kind]}
                    </button>
                ))}
            </div>
            <div>
                {visible.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="list-row media-card"
                    >
                        <div className="row-meta media-card-top">
                            <span>{kindLabel[item.kind]}</span>
                            <span>·</span>
                            <span>{item.outlet}</span>
                            <span>·</span>
                            <span>{formatDate(item, lang)}</span>
                        </div>
                        <h2 className="row-title">{lang === 'ja' ? item.titleJa : item.titleEn}</h2>
                        <p className="row-body muted">{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
                        <p className="section-link" style={{ marginTop: 8 }}>{t.readArticle}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MediaPage
