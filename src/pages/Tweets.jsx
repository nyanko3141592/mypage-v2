import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchTweets } from '../utils/twitter'
import TwitterEmbed from '../components/TwitterEmbed'

function TweetsPage({ lang, t }) {
    const { year } = useParams()
    const [tweets, setTweets] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState('Date')
    const [expandedTweets, setExpandedTweets] = useState({})

    useEffect(() => {
        setLoading(true)
        fetchTweets(year).then(data => {
            setTweets(data)
            setLoading(false)
        })
    }, [year])

    const filteredTweets = useMemo(() => {
        let result = tweets

        if (searchTerm) {
            result = result.filter(tw =>
                tw['Post text']?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        result.sort((a, b) => {
            if (sortBy === 'Likes') return b.likesCount - a.likesCount
            if (sortBy === 'Impressions') return b.impCount - a.impCount
            if (sortBy === 'Engagements') return b.engCount - a.engCount
            return b.dateObj - a.dateObj
        })

        return result
    }, [tweets, searchTerm, sortBy])

    const toggleEmbed = (id, e) => {
        e.stopPropagation()
        setExpandedTweets(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="container">
            <div className="page-header">
                <Link to="/x" className="back-link">← {t.back}</Link>
                <h1>Tweets {year}</h1>
            </div>

            <div className="toolbar">
                <input
                    type="text"
                    placeholder={t.search}
                    className="flat-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="flat-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="Date">{t.sortDate}</option>
                    <option value="Likes">{t.sortLikes}</option>
                    <option value="Impressions">{t.sortImpressions}</option>
                    <option value="Engagements">{t.sortEngagements}</option>
                </select>
                <Link to="/x/2025" className={'chip' + (year === '2025' ? ' is-active' : '')}>2025</Link>
                <Link to="/x/2024" className={'chip' + (year === '2024' ? ' is-active' : '')}>2024</Link>
            </div>

            {loading ? (
                <div className="empty-state"><p className="muted">Loading…</p></div>
            ) : (
                filteredTweets.map((tw, i) => (
                    <div key={i} className="list-row tweet-card" onClick={() => window.open(tw['Post Link'], '_blank')}>
                        <div className="tweet-date">{tw['Date']}</div>
                        {expandedTweets[tw.tweetId] ? (
                            <div onClick={(e) => e.stopPropagation()}>
                                <TwitterEmbed tweetId={tw.tweetId} />
                            </div>
                        ) : (
                            <>
                                <div className="tweet-text">{tw['Post text']}</div>
                                <button
                                    type="button"
                                    className="brutal-btn btn-secondary"
                                    style={{ width: 'fit-content' }}
                                    onClick={(e) => toggleEmbed(tw.tweetId, e)}
                                >
                                    {t.loadEmbed}
                                </button>
                            </>
                        )}
                        <div className="tweet-stats">
                            <div className="stat-item"><span>🚀</span> {tw['Impressions']}</div>
                            <div className="stat-item"><span>❤️</span> {tw['Likes']}</div>
                            <div className="stat-item"><span>📑</span> {tw['Bookmarks']}</div>
                            <div className="stat-item"><span>🔄</span> {tw['Reposts']}</div>
                        </div>
                    </div>
                ))
            )}

            {!loading && filteredTweets.length === 0 && (
                <div className="empty-state"><p className="muted">{t.noTweets}</p></div>
            )}
        </div>
    )
}

export default TweetsPage
