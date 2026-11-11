import { useState } from 'react'
import { mediaItems } from '../data/media'
import { BackLink, Favicon } from '../components/Ui'

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
                <BackLink to="/" label={t.back} />
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
                            <Favicon url={item.url} />
                            <span>{item.outlet}</span>
                            <span>·</span>
                            <span>{formatDate(item, lang)}</span>
                        </div>
                        <h2 className="row-title">{lang === 'ja' ? item.titleJa : item.titleEn}</h2>
                        <p className="row-body muted">{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MediaPage
