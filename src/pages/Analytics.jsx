import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowLeft, LuCircleDollarSign, LuTriangleAlert } from 'react-icons/lu'
import { fetchTweets } from '../utils/twitter'
import TweetRow from '../components/TweetRow'
import { revenue } from '../data/revenue'

const currency = amount => `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`
const payoutDate = date => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))

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
        <section className="x-year-section x-rev-section">
            <h2 className="x-rev-heading">{t.revTitle}</h2>
            <div className="x-rev-total"><strong>{currency(revenue.totalPayouts)}</strong><span>{t.revTotal}</span></div>
            {revenue.programs.map(program => <article className="x-rev-program" key={program.id}>
                <div className="x-rev-program-heading">
                    <h3>{program.name}</h3>
                    <span className={`x-rev-status x-rev-status-${program.status}`}>{t[`rev${program.status[0].toUpperCase()}${program.status.slice(1)}`]}</span>
                </div>
                {program.totalPayouts !== null && <p className="x-rev-program-total">{currency(program.totalPayouts)}</p>}
                {program.nextPayout && <p className="x-rev-next">{t.revNextPayout} {payoutDate(program.nextPayout)}</p>}
                {program.payouts.length > 0 && <>
                    <h4 className="x-rev-payouts-heading">{t.revPayouts}</h4>
                    <ul className="x-rev-payouts">{program.payouts.map((payout, index) => <li className="x-rev-payout" key={`${payout.date || payout.period}-${index}`}>
                        {payout.amount === null
                            ? <LuTriangleAlert className="x-rev-payout-icon x-rev-payout-icon-muted" size={22} aria-hidden="true" />
                            : <LuCircleDollarSign className="x-rev-payout-icon" size={22} aria-hidden="true" />}
                        <div className="x-rev-payout-detail">
                            <strong>{payout.amount === null ? t.revBelowMin : currency(payout.amount)}</strong>
                            <span>{payout.date ? payoutDate(payout.date) : payout.period}</span>
                        </div>
                    </li>)}</ul>
                </>}
            </article>)}
            <div className="x-rev-data">
                <h3>{t.revData}</h3>
                <a href="/tweets_2026.csv" download>tweets_2026.csv</a>
                <a href="/account_overview_analytics.csv" download>account_overview_analytics.csv</a>
                <a href="/video_overview_analytics.csv" download>video_overview_analytics.csv</a>
            </div>
            <p className="x-rev-source">{t.revSource}</p>
        </section>
    </div>
}

export default AnalyticsHome
