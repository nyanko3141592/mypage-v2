import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { LuLayers, LuNewspaper, LuPenLine, LuChartNoAxesColumn, LuSearch } from 'react-icons/lu'
import Nav from './components/Nav'
import ProjectModal from './components/ProjectModal'
import HomePage from './pages/Home'
import WorksPage from './pages/Works'
import AnalyticsHome from './pages/Analytics'
import TweetsPage from './pages/Tweets'
import BlogPage from './pages/Blog'
import BlogPostPage from './pages/BlogPost'
import MediaPage from './pages/Media'
import LinksPage from './pages/Links'
import { translations } from './data/translations'
import { awards } from './data/profile'
import { linksData } from './data/links'

function RightPanel({ lang, t }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const label = (ja, en) => lang === 'ja' ? ja : en
  const primaryLinks = ['SmartGlasses', 'Substack', 'X (Twitter)', 'GitHub', 'Note']
  const allLinks = linksData.flatMap(category => category.items)
  return <aside className="right-panel">
    <form className="panel-search" onSubmit={event => { event.preventDefault(); navigate(`/works?q=${encodeURIComponent(query.trim())}`) }}>
      <LuSearch size={18} aria-hidden="true" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={label('検索', 'Search')} aria-label={label('作品を検索', 'Search works')} />
    </form>
    <section className="right-card"><h2>{label('プロフィール', 'Profile')}</h2>
      <div className="panel-fact"><strong>{label('仕事', 'Work')}</strong><p>{t.profDesc}</p></div>
      <div className="panel-fact"><strong>{t.awardsTitle}</strong><p>{awards.slice(0, 3).map((award, index) => <span key={award.titleEn}>{index > 0 ? ' · ' : ''}{lang === 'ja' ? award.titleJa : award.titleEn}</span>)}</p></div>
      <div className="panel-fact"><strong>{label('やっていること', 'Now')}</strong><p>{t.interestsDesc}</p></div>
      <div className="panel-fact"><strong>{label('リンク', 'Links')}</strong><p><a href="https://smartglasses.fyi" target="_blank" rel="noopener noreferrer">{t.glassesTitle}</a> · <a href="https://naokitakahashi1.substack.com" target="_blank" rel="noopener noreferrer">{t.newsletterTitle}</a></p></div>
    </section>
    <section className="right-card panel-links"><h2>{label('リンク', 'Links')}</h2>{primaryLinks.map(name => { const item = allLinks.find(link => link.name === name); return item && <a key={name} href={item.url} target="_blank" rel="noopener noreferrer">{name}<span>↗</span></a> })}</section>
    <small className="panel-copyright">© 2026 Naoki Takahashi</small>
  </aside>
}

function App() {
  const [lang, setLang] = useState('ja')
  const [selectedWork, setSelectedWork] = useState(null)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const t = translations[lang]

  const toggleTheme = () => setTheme(current => {
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    return next
  })

  return (
    <Router>
      <div className="app-shell">
        <Nav lang={lang} setLang={setLang} theme={theme} onToggleTheme={toggleTheme} />
        <div className="timeline">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
            <Route path="/works" element={<WorksPage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
            <Route path="/x" element={<AnalyticsHome lang={lang} t={t} />} />
            <Route path="/x/:year" element={<TweetsPage lang={lang} t={t} />} />
            <Route path="/media" element={<MediaPage lang={lang} t={t} />} />
            <Route path="/links" element={<LinksPage t={t} />} />
            <Route path="/blog" element={<BlogPage t={t} />} />
            <Route path="/blog/:slug" element={<BlogPostPage t={t} />} />
          </Routes>
          <footer className="site-footer">
            <p className="footer-copy">{t.stayBrutal}</p>
            <div className="footer-links">
              <Link to="/works" className="icon-btn" aria-label={t.navWorks} title={t.navWorks}><LuLayers size={18} /></Link>
              <Link to="/media" className="icon-btn" aria-label={t.navMedia} title={t.navMedia}><LuNewspaper size={18} /></Link>
              <Link to="/blog" className="icon-btn" aria-label={t.navBlog} title={t.navBlog}><LuPenLine size={18} /></Link>
              <Link to="/x" className="icon-btn" aria-label={t.analyticsTitle} title={t.analyticsTitle}><LuChartNoAxesColumn size={18} /></Link>
            </div>
          </footer>
        </div>
        <RightPanel lang={lang} t={t} />
      </div>
      <ProjectModal work={selectedWork} lang={lang} t={t} onClose={() => setSelectedWork(null)} />
    </Router>
  )
}

export default App
