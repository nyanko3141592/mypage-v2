import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuEye } from 'react-icons/lu'
import { fetchTweets } from '../utils/twitter'
import { BackLink } from '../components/Ui'

function AnalyticsHome({ lang, t }) {
    const [stats, setStats] = useState({
        2025: { loading: true, totalImp: 0, topTweet: null },
        2024: { loading: true, totalImp: 0, topTweet: null }
    })

    useEffect(() => {
        fetchTweets('2025').then(data => {
            const totalImp = data.reduce((acc, curr) => acc + curr.impCount, 0)
            const topTweet = data.reduce((max, curr) => curr.impCount > (max?.impCount || 0) ? curr : max, null)
            setStats(prev => ({ ...prev, 2025: { loading: false, totalImp, topTweet } }))
        })

        fetchTweets('2024').then(data => {
            const totalImp = data.reduce((acc, curr) => acc + curr.impCount, 0)
            const topTweet = data.reduce((max, curr) => curr.impCount > (max?.impCount || 0) ? curr : max, null)
            setStats(prev => ({ ...prev, 2024: { loading: false, totalImp, topTweet } }))
        })
    }, [])

    const renderYearCard = (year) => {
        const yearStats = stats[year]
        if (yearStats.loading) {
            return (
                <div className="list-row year-block">
                    <p className="muted">Loading…</p>
                </div>
            )
        }

        const formatter = Intl.NumberFormat('en', { notation: "compact" })

        return (
            <Link to={`/x/${year}`} className="list-row year-block">
                <h2>{year}</h2>
                <div className="stat-inline">
                    <LuEye size={16} aria-label={t.totalImp} title={t.totalImp} />
                    <span className="stat-value">{formatter.format(yearStats.totalImp)}</span>
                </div>
                {yearStats.topTweet && (
                    <p className="tweet-text muted">{yearStats.topTweet['Post text']}</p>
                )}
            </Link>
        )
    }

    return (
        <div className="container">
            <div className="page-header">
                <BackLink to="/" label={t.back} />
                <h1>{t.analyticsTitle}</h1>
            </div>
            {renderYearCard(2025)}
            {renderYearCard(2024)}
        </div>
    )
}

export default AnalyticsHome
