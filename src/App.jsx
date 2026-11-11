import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LuLayers, LuNewspaper, LuPenLine, LuChartNoAxesColumn } from 'react-icons/lu'
import Nav from './components/Nav'
import ProjectModal from './components/ProjectModal'
import HomePage from './pages/Home'
import WorksPage from './pages/Works'
import AnalyticsHome from './pages/Analytics'
import TweetsPage from './pages/Tweets'
import BlogPage from './pages/Blog'
import BlogPostPage from './pages/BlogPost'
import MediaPage from './pages/Media'
import { translations } from './data/translations'

function App() {
  const [lang, setLang] = useState('ja')
  const [selectedWork, setSelectedWork] = useState(null)
  const t = translations[lang]

  return (
    <Router>
      <div className="app-shell">
        <Nav lang={lang} setLang={setLang} />
        <div className="timeline">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
            <Route path="/works" element={<WorksPage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
            <Route path="/x" element={<AnalyticsHome lang={lang} t={t} />} />
            <Route path="/x/:year" element={<TweetsPage lang={lang} t={t} />} />
            <Route path="/media" element={<MediaPage lang={lang} t={t} />} />
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
      </div>
      <ProjectModal work={selectedWork} lang={lang} t={t} onClose={() => setSelectedWork(null)} />
    </Router>
  )
}

export default App
