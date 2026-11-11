import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchTweets } from '../utils/twitter'

function AnalyticsHome({ lang, t }) {
    const [stats, setStats] = useState({
        2025: { loading: true, totalImp: 0, topTweet: null },
        2024: { loading: true, totalImp: 0, topTweet: null }
    })
    const navigate = useNavigate()

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
            <div className="list-row year-block">
                <h2>{year}</h2>
                <div className="stat-block">
                    <div className="stat-label">{t.totalImp}</div>
                    <div className="stat-value">{formatter.format(yearStats.totalImp)}</div>
                </div>
                {yearStats.topTweet && (
                    <div className="stat-block">
                        <div className="stat-label">{t.mostViral} · {formatter.format(yearStats.topTweet.impCount)}</div>
                        <p className="tweet-text muted">{yearStats.topTweet['Post text']}</p>
                    </div>
                )}
                <button
                    type="button"
                    className="brutal-btn"
                    onClick={() => navigate(`/x/${year}`)}
                    style={{ marginTop: 16 }}
                >
                    {t.exploreYear}
                </button>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="page-header">
                <Link to="/" className="back-link">← {t.back}</Link>
                <h1>{t.analyticsTitle}</h1>
                <p className="page-subtitle">{t.analyticsSubtitle}</p>
            </div>
            {renderYearCard(2025)}
            {renderYearCard(2024)}
        </div>
    )
}

export default AnalyticsHome
