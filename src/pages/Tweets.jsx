import React, { useState, useEffect, useMemo } from 'react'
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
        <div className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/x" className="brutal-btn">← {t.back}</Link>
                <h1 style={{ fontSize: 'min(3rem, 10vw)', margin: 0 }}>Tweets {year}</h1>
            </div>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder={t.search}
                    className="brutal-card"
                    style={{ flex: 1, minWidth: '200px', padding: '1rem', fontSize: '1.2rem', border: '4px solid black' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="brutal-card"
                    style={{ padding: '0 1rem', fontSize: '1rem', border: '4px solid black', minWidth: '150px', background: 'white' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="Date">{t.sortDate}</option>
                    <option value="Likes">{t.sortLikes}</option>
                    <option value="Impressions">{t.sortImpressions}</option>
                    <option value="Engagements">{t.sortEngagements}</option>
                </select>
                <Link to="/x/2025" className="brutal-btn" style={{ textDecoration: 'none', background: year === '2025' ? 'var(--yellow)' : 'white' }}>2025</Link>
                <Link to="/x/2024" className="brutal-btn" style={{ textDecoration: 'none', background: year === '2024' ? 'var(--primary-color)' : 'white', color: year === '2024' ? 'white' : 'black' }}>2024</Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-mono)' }}>LOADING TWEETS...</h2>
                </div>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {filteredTweets.map((tw, i) => (
                        <div key={i} className="brutal-card tweet-card" onClick={() => window.open(tw['Post Link'], '_blank')}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="tweet-date">{tw['Date']}</div>
                            </div>

                            {expandedTweets[tw.tweetId] ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <TwitterEmbed tweetId={tw.tweetId} />
                                </div>
                            ) : (
                                <>
                                    <div className="tweet-text">{tw['Post text']}</div>
                                    <button
                                        className="brutal-btn"
                                        style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem', marginTop: '0.5rem', width: 'fit-content' }}
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
                    ))}
                </div>
            )}

            {!loading && filteredTweets.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <p>{t.noTweets}</p>
                </div>
            )}
        </div>
    )
}

export default TweetsPage
