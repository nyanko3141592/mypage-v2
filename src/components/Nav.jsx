import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', labelJa: 'ホーム', labelEn: 'Home', end: true },
    { to: '/works', labelJa: '作品', labelEn: 'Works' },
    { to: '/media', labelJa: 'メディア', labelEn: 'Media' },
    { to: '/blog', labelJa: 'ブログ', labelEn: 'Blog' },
    { to: '/x', labelJa: 'Analytics', labelEn: 'Analytics' },
]

const Nav = ({ lang, setLang }) => (
    <nav className="site-sidebar" aria-label="site">
        <div className="sidebar-inner">
            <NavLink to="/" className="sidebar-brand" end>
                nya3neko2
            </NavLink>
            <ul className="sidebar-links">
                {links.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}
                        >
                            {lang === 'ja' ? link.labelJa : link.labelEn}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="lang-switcher" role="group" aria-label="language">
                <button type="button" className={'lang-btn' + (lang === 'ja' ? ' is-active' : '')} onClick={() => setLang('ja')}>JA</button>
                <button type="button" className={'lang-btn' + (lang === 'en' ? ' is-active' : '')} onClick={() => setLang('en')}>EN</button>
            </div>
        </div>
    </nav>
)

export default Nav
