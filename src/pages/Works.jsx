import { useState } from 'react'
import { allWorksData } from '../data/works'
import ProjectImage from '../components/ProjectImage'
import { BackLink, TagList } from '../components/Ui'

function WorksPage({ lang, t, onWorkClick }) {
    const [filter, setFilter] = useState('All')
    const categories = ['All', 'Software', 'Hardware', 'Research', 'Media']
    const filteredWorks = filter === 'All' ? allWorksData : allWorksData.filter(w => w.category === filter)
    return (
        <div className="container">
            <div className="page-header">
                <BackLink to="/" label={t.back} />
                <h1>{t.worksTitle}</h1>
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
                            <h3 className="row-title">{work.title}</h3>
                            <p className="row-body muted">{lang === 'ja' ? work.descJa : work.descEn}</p>
                            <TagList tags={work.tags} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorksPage
