import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allWorksData } from '../data/works'
import ProjectImage from '../components/ProjectImage'

function WorksPage({ lang, t, onWorkClick }) {
    const [filter, setFilter] = useState('All')
    const categories = ['All', 'Software', 'Hardware', 'Research', 'Media']
    const filteredWorks = filter === 'All' ? allWorksData : allWorksData.filter(w => w.category === filter)
    return (
        <div className="container">
            <div className="page-header">
                <Link to="/" className="back-link">← {t.back}</Link>
                <h1>{t.worksTitle}</h1>
                <p className="page-subtitle">{t.worksSubtitle}</p>
            </div>
            <div className="filter-row">
                {categories.map(cat => (
                    <button
                        key={cat}
                        type="button"
                        className={'chip' + (filter === cat ? ' is-active' : '')}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div>
                {filteredWorks.map((work) => (
                    <div
                        key={work.id}
                        className="list-row work-row"
                        onClick={() => onWorkClick(work)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') onWorkClick(work) }}
                    >
                        <div className="work-thumb">
                            <ProjectImage src={work.image} title={work.title} githubUrl={work.githubUrl} />
                        </div>
                        <div className="work-row-body">
                            <div className="row-meta">
                                <span className="brutal-tag">{work.category}</span>
                                {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
                            </div>
                            <h3 className="row-title">{work.title}</h3>
                            <p className="row-body muted">{lang === 'ja' ? work.descJa : work.descEn}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorksPage
