import { NavLink } from 'react-router-dom'
import { LuHouse, LuLayers, LuNewspaper, LuPenLine, LuChartNoAxesColumn } from 'react-icons/lu'

const links = [
    { to: '/', labelJa: 'ホーム', labelEn: 'Home', end: true, icon: LuHouse },
    { to: '/works', labelJa: '作品', labelEn: 'Works', icon: LuLayers },
    { to: '/media', labelJa: 'メディア', labelEn: 'Media', icon: LuNewspaper },
    { to: '/blog', labelJa: 'ブログ', labelEn: 'Blog', icon: LuPenLine },
    { to: '/x', labelJa: 'Analytics', labelEn: 'Analytics', icon: LuChartNoAxesColumn },
]

const Nav = ({ lang, setLang }) => (
    <nav className="site-sidebar" aria-label="site">
        <div className="sidebar-inner">
            <NavLink to="/" className="sidebar-brand" end aria-label="nya3neko2" title="nya3neko2">
                nya3neko2
            </NavLink>
            <ul className="sidebar-links">
                {links.map((link) => {
                    const Icon = link.icon
                    const label = lang === 'ja' ? link.labelJa : link.labelEn
                    return (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}
                                aria-label={label}
                                title={label}
                            >
                                <Icon size={22} />
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            <div className="lang-switcher" role="group" aria-label="language">
                <button type="button" className={'lang-btn' + (lang === 'ja' ? ' is-active' : '')} onClick={() => setLang('ja')} title="日本語" aria-label="日本語">JA</button>
                <button type="button" className={'lang-btn' + (lang === 'en' ? ' is-active' : '')} onClick={() => setLang('en')} title="English" aria-label="English">EN</button>
            </div>
        </div>
    </nav>
)

export default Nav
