import { Link } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'

export const ICON = 18

export function BackLink({ to, label }) {
    return (
        <Link to={to} className="icon-btn" aria-label={label} title={label}>
            <LuArrowLeft size={20} />
        </Link>
    )
}

export function Favicon({ url }) {
    let src = ''
    try {
        src = 'https://www.google.com/s2/favicons?domain=' + new URL(url).hostname + '&sz=32'
    } catch {
        return null
    }
    return <img className="favicon" src={src} alt="" width={16} height={16} />
}

export function hostnameOf(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

export function TagList({ tags }) {
    if (!tags || !tags.length) return null
    return <p className="tag-list">{tags.join(' · ')}</p>
}
