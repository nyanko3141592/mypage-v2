import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'
import { fetchTweets } from '../utils/twitter'
import TweetRow from '../components/TweetRow'

function AnalyticsHome({ t }) {
    const [stats, setStats] = useState({})

    useEffect(() => {
        let active = true
        Promise.all(['2026', '2025', '2024'].map(async year => [year, await fetchTweets(year)])).then(entries => {
            if (!active) return
            setStats(Object.fromEntries(entries.map(([year, tweets]) => [year, {
                tweets,
                totalImp: tweets.reduce((sum, tweet) => sum + (tweet.impCount || 0), 0),
                totalLikes: tweets.reduce((sum, tweet) => sum + (tweet.likesCount || 0), 0),
                topTweet: tweets.reduce((top, tweet) => tweet.impCount > (top?.impCount ?? -1) ? tweet : top, null)
            }])))
        })
        return () => { active = false }
    }, [])

    return <div className="container x-page">
        <header className="x-sticky-header"><Link to="/" className="x-back" aria-label={t.back}><LuArrowLeft size={20} /></Link><div><h1>{t.analyticsTitle === 'Twitter Analytics' ? 'アナリティクス' : t.analyticsTitle}</h1><p>@nya3_neko2</p></div></header>
        {['2026', '2025', '2024'].map(year => {
            const data = stats[year]
            return <section className="x-year-section" key={year}>
                <Link to={`/x/${year}`} className="x-year-heading"><h2>{year}</h2><span>{t.sortDate || 'ポストを見る'} →</span></Link>
                {!data ? <p className="x-loading muted">Loading…</p> : <>
                    <div className="x-summary">
                        <div className="x-summary-primary"><strong>{new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(data.totalImp)}</strong><span>総インプレッション</span></div>
                        <div><strong>{new Intl.NumberFormat('en').format(data.tweets.length)}</strong><span>ポスト</span></div>
                        <div><strong>{new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(data.totalLikes)}</strong><span>総いいね数</span></div>
                    </div>
                    <h3 className="x-top-label">トップポスト</h3>
                    {data.topTweet && <TweetRow tweet={data.topTweet} t={t} />}
                </>}
            </section>
        })}
    </div>
}

export default AnalyticsHome
