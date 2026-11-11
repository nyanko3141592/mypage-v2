import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
      <Nav lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
        <Route path="/works" element={<WorksPage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
        <Route path="/x" element={<AnalyticsHome lang={lang} t={t} />} />
        <Route path="/x/:year" element={<TweetsPage lang={lang} t={t} />} />
        <Route path="/media" element={<MediaPage lang={lang} t={t} />} />
        <Route path="/blog" element={<BlogPage t={t} />} />
        <Route path="/blog/:slug" element={<BlogPostPage t={t} />} />
      </Routes>
      <ProjectModal work={selectedWork} lang={lang} t={t} onClose={() => setSelectedWork(null)} />
      <footer style={{ marginTop: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', margin: 0 }}>{t.stayBrutal}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/works" className="footer-link">/works</Link>
            <Link to="/media" className="footer-link">/media</Link>
            <Link to="/blog" className="footer-link">/blog</Link>
            <Link to="/x" className="footer-link">/x</Link>
          </div>
        </div>
      </footer>
    </Router>
  )
}

export default App
