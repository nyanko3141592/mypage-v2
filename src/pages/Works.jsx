import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { allWorksData } from '../data/works'
import ProjectImage from '../components/ProjectImage'

function WorksPage({ lang, t, onWorkClick }) {
    const [filter, setFilter] = useState('All')
    const categories = ['All', 'Software', 'Hardware', 'Research']
    const filteredWorks = filter === 'All' ? allWorksData : allWorksData.filter(w => w.category === filter)
    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
            <h1 style={{ fontSize: '3.5rem' }}>{t.worksTitle}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>{t.worksSubtitle}</p>
            <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button key={cat} className="brutal-btn" onClick={() => setFilter(cat)} style={{ background: filter === cat ? 'var(--yellow)' : 'white', color: 'black', padding: '0.5rem 1rem' }}>{cat}</button>
                ))}
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {filteredWorks.map((work) => (
                    <div key={work.id} className="brutal-card" onClick={() => onWorkClick(work)}>
                        <div className="project-img-container"><ProjectImage src={work.image} title={work.title} githubUrl={work.githubUrl} /></div>
                        <div>
                            <span className="brutal-tag" style={{ background: 'black', color: 'white' }}>{work.category}</span>
                            {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
                        </div>
                        <h3 style={{ marginTop: '1rem' }}>{work.title}</h3>
                        <p style={{ marginBottom: '1.5rem', minHeight: '4.5rem' }}>{lang === 'ja' ? work.descJa : work.descEn}</p>
                        <button className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t.viewProject}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorksPage
