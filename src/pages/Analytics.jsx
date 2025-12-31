import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchTweets } from '../utils/twitter'

function AnalyticsHome({ lang, t }) {
    const [stats, setStats] = useState({
        2025: { loading: true, totalImp: 0, topTweet: null },
        2024: { loading: true, totalImp: 0, topTweet: null }
    })
    const navigate = useNavigate()

    useEffect(() => {
        // 2025 Data
        fetchTweets('2025').then(data => {
            const totalImp = data.reduce((acc, curr) => acc + curr.impCount, 0)
            const topTweet = data.reduce((max, curr) => curr.impCount > (max?.impCount || 0) ? curr : max, null)
            setStats(prev => ({ ...prev, 2025: { loading: false, totalImp, topTweet } }))
        })

        // 2024 Data
        fetchTweets('2024').then(data => {
            const totalImp = data.reduce((acc, curr) => acc + curr.impCount, 0)
            const topTweet = data.reduce((max, curr) => curr.impCount > (max?.impCount || 0) ? curr : max, null)
            setStats(prev => ({ ...prev, 2024: { loading: false, totalImp, topTweet } }))
        })
    }, [])

    const renderYearCard = (year, color) => {
        const yearStats = stats[year]
        if (yearStats.loading) {
            return (
                <div className="brutal-card" style={{ background: color, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '2rem' }}>LOADING...</h2>
                </div>
            )
        }

        // Format numbers like 4.2M, 500K etc.
        const formatter = Intl.NumberFormat('en', { notation: "compact" })

        return (
            <div className="brutal-card" style={{ background: color, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '4rem', marginBottom: '0', lineHeight: '1' }}>{year}</h2>

                <div style={{ background: 'white', padding: '1rem', border: '3px solid black' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-mono)' }}>{t.totalImp}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{formatter.format(yearStats.totalImp)}</div>
                </div>

                {yearStats.topTweet && (
                    <div style={{ background: 'white', padding: '1rem', border: '3px solid black', flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{t.mostViral} 🚀 {formatter.format(yearStats.topTweet.impCount)}</div>
                        <div className="tweet-text" style={{ fontSize: '0.9rem', maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {yearStats.topTweet['Post text']}
                        </div>
                    </div>
                )}

                <button
                    className="brutal-btn"
                    onClick={() => navigate(`/x/${year}`)}
                    style={{ width: '100%', textAlign: 'center', background: 'black', color: 'white', marginTop: 'auto' }}
                >
                    {t.exploreYear}
                </button>
            </div>
        )
    }

    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
            <h1 style={{ fontSize: '3.5rem' }}>{t.analyticsTitle}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>{t.analyticsSubtitle}</p>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {renderYearCard(2025, 'var(--yellow)')}
                {renderYearCard(2024, 'var(--primary-color)')}
            </div>
        </div>
    )
}

export default AnalyticsHome
