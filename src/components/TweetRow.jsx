import profileIcon from '../assets/avatar.svg'
import TwitterEmbed from './TwitterEmbed'
import { LuBookmark, LuChartNoAxesColumn, LuHeart, LuImage, LuMessageCircle, LuRepeat2, LuShare } from 'react-icons/lu'

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

function displayDate(value) {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) return String(value || '')
    const monthDay = new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date)
    return date.getUTCFullYear() === new Date().getFullYear() ? monthDay : `${date.getUTCFullYear()}年${monthDay}`
}

function count(tweet, column, parsed) {
    const raw = tweet[column]
    if (raw === undefined || raw === null || raw === '') return null
    const value = parsed ? tweet[parsed] : Number(String(raw).replace(/,/g, ''))
    return Number.isFinite(value) ? compact.format(value) : null
}

function Action({ icon: Icon, value, label, tone, onClick, title }) {
    return <button type="button" className={`tweet-action${tone ? ` tweet-action-${tone}` : ''}`} onClick={onClick} aria-label={label} title={title || label}>
        <span className="tweet-action-icon"><Icon size={18} aria-hidden="true" /></span>{value !== null && <span>{value}</span>}
    </button>
}

export default function TweetRow({ tweet, expanded = false, onToggleEmbed, t = {} }) {
    const postLink = tweet['Post Link']
    const openPost = () => postLink && window.open(postLink, '_blank', 'noopener,noreferrer')
    const stop = event => event.stopPropagation()

    return <article className="tweet-row" onClick={openPost} role={postLink ? 'link' : undefined} tabIndex={postLink ? 0 : undefined}
        onKeyDown={event => { if (event.key === 'Enter') openPost() }} aria-label={postLink ? 'Open post on X' : undefined}>
        <img className="tweet-avatar" src={profileIcon} alt="" />
        <div className="tweet-content">
            <div className="tweet-author"><strong>電電猫猫</strong><span>@nya3_neko2 · {displayDate(tweet.dateObj || tweet.Date)}</span></div>
            <div className="tweet-body">{tweet['Post text']}</div>
            {expanded && <div className="tweet-embed" onClick={stop}><TwitterEmbed tweetId={tweet.tweetId} /></div>}
            <div className="tweet-actions" onClick={stop}>
                <Action icon={LuMessageCircle} value={count(tweet, 'Replies')} label={t.reply || '返信'} tone="blue" />
                <Action icon={LuRepeat2} value={count(tweet, 'Reposts', null)} label={t.repost || 'リポスト'} tone="green" />
                <Action icon={LuHeart} value={count(tweet, 'Likes', 'likesCount')} label={t.sortLikes || 'いいね'} tone="pink" />
                <Action icon={LuChartNoAxesColumn} value={count(tweet, 'Impressions', 'impCount')} label={t.sortImpressions || '表示回数'} tone="blue" />
                <Action icon={LuBookmark} value={count(tweet, 'Bookmarks')} label={t.bookmarks || 'ブックマーク'} />
                <Action icon={LuShare} value={count(tweet, 'Shares')} label={t.share || '共有'} />
                <button type="button" className={'tweet-embed-toggle' + (expanded ? ' is-active' : '')} aria-label={t.loadEmbed || 'ポストを展開'} title={t.loadEmbed || 'ポストを展開'} onClick={event => { stop(event); onToggleEmbed?.(tweet.tweetId, event) }}><LuImage size={17} /></button>
            </div>
        </div>
    </article>
}
