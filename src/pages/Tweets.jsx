import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LuArrowLeft, LuSearch } from 'react-icons/lu'
import { fetchTweets } from '../utils/twitter'
import TweetRow from '../components/TweetRow'

function TweetsPage({ t }) {
    const { year } = useParams()
    const [tweets, setTweets] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState('Date')
    const [expandedTweets, setExpandedTweets] = useState({})

    useEffect(() => {
        let active = true
        setLoading(true)
        fetchTweets(year).then(data => { if (active) { setTweets(data); setLoading(false) } })
        return () => { active = false }
    }, [year])

    const filteredTweets = useMemo(() => {
        const result = tweets.filter(tweet => tweet['Post text']?.toLowerCase().includes(searchTerm.toLowerCase()))
        return result.sort((a, b) => {
            if (sortBy === 'Likes') return b.likesCount - a.likesCount
            if (sortBy === 'Impressions') return b.impCount - a.impCount
            if (sortBy === 'Engagements') return b.engCount - a.engCount
            return b.dateObj - a.dateObj
        })
    }, [tweets, searchTerm, sortBy])

    const sortOptions = [
        ['Date', t.sortDate || '日付順'], ['Likes', t.sortLikes || 'いいね順'],
        ['Impressions', t.sortImpressions || 'インプレッション順'], ['Engagements', t.sortEngagements || 'エンゲージメント順']
    ]

    return <div className="container x-page">
        <header className="x-sticky-header"><Link to="/x" className="x-back" aria-label={t.back}><LuArrowLeft size={20} /></Link><div><h1>ポスト</h1><p>{loading ? '…' : `${new Intl.NumberFormat('ja-JP').format(tweets.length)} 件のポスト`}</p></div></header>
        <nav className="x-year-tabs" aria-label="年">
            {['2026', '2025', '2024'].map(item => <Link key={item} to={`/x/${item}`} className={'x-year-tab' + (year === item ? ' is-active' : '')}>{item}</Link>)}
        </nav>
        <div className="x-controls">
            <label className="x-search"><LuSearch size={18} /><input type="search" placeholder={t.search} value={searchTerm} onChange={event => setSearchTerm(event.target.value)} aria-label={t.search} /></label>
            <div className="x-sort-tabs" aria-label={t.sort}>{sortOptions.map(([value, label]) => <button key={value} type="button" className={sortBy === value ? 'is-active' : ''} onClick={() => setSortBy(value)}>{label}</button>)}</div>
        </div>
        {loading ? <div className="empty-state"><p className="muted">Loading…</p></div> : filteredTweets.map(tweet => <TweetRow key={tweet.tweetId} tweet={tweet} expanded={!!expandedTweets[tweet.tweetId]} onToggleEmbed={id => setExpandedTweets(previous => ({ ...previous, [id]: !previous[id] }))} t={t} />)}
        {!loading && filteredTweets.length === 0 && <div className="empty-state"><p className="muted">{t.noTweets}</p></div>}
    </div>
}

export default TweetsPage
