import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LuEye, LuHeart, LuBookmark, LuRepeat2, LuImage } from 'react-icons/lu'
import { fetchTweets } from '../utils/twitter'
import TwitterEmbed from '../components/TwitterEmbed'
import { BackLink } from '../components/Ui'

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
                <BackLink to="/x" label={t.back} />
                <h1>{year}</h1>
            </div>

            <div className="toolbar">
                <input
                    type="search"
                    placeholder={t.search}
                    className="flat-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label={t.search}
                />
                <select
                    className="flat-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label={t.sort}
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
                                    className="icon-btn"
                                    aria-label={t.loadEmbed}
                                    title={t.loadEmbed}
                                    onClick={(e) => toggleEmbed(tw.tweetId, e)}
                                >
                                    <LuImage size={18} />
                                </button>
                            </>
                        )}
                        <div className="tweet-stats">
                            <div className="stat-item" title={t.sortImpressions}><LuEye size={16} aria-hidden="true" /> {tw['Impressions']}</div>
                            <div className="stat-item" title={t.sortLikes}><LuHeart size={16} aria-hidden="true" /> {tw['Likes']}</div>
                            <div className="stat-item" title="Bookmarks"><LuBookmark size={16} aria-hidden="true" /> {tw['Bookmarks']}</div>
                            <div className="stat-item" title="Reposts"><LuRepeat2 size={16} aria-hidden="true" /> {tw['Reposts']}</div>
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
