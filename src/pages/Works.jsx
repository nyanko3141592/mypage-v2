import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { allWorksData } from '../data/works'
import ProjectImage from '../components/ProjectImage'
import { BackLink, TagList } from '../components/Ui'

function WorksPage({ lang, t, onWorkClick }) {
    const [filter, setFilter] = useState('All')
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const categories = ['All', 'Software', 'Hardware', 'Research', 'Media']
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const filteredWorks = allWorksData.filter(work =>
        (filter === 'All' || work.category === filter) &&
        (!normalizedQuery || `${work.title} ${work.tags.join(' ')}`.toLocaleLowerCase().includes(normalizedQuery))
    )
    return (
        <div className="container">
            <div className="page-header">
                <BackLink to="/" label={t.back} />
                <h1>{t.worksTitle}</h1>
            </div>
            <input className="works-search" type="search" value={query} onChange={event => setSearchParams(event.target.value ? { q: event.target.value } : {})} placeholder={t.search} aria-label={t.search} />
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
            <div className="works-grid">
                {filteredWorks.map((work) => (
                    <div
                        key={work.id}
                        className="work-tile"
                        onClick={() => onWorkClick(work)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') onWorkClick(work) }}
                    >
                        <div className="work-tile-image">
                            <ProjectImage src={work.image} title={work.title} githubUrl={work.githubUrl} />
                        </div>
                        <div className="work-tile-content">
                            <h3 className="row-title">{work.title}</h3>
                            <TagList tags={work.tags} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorksPage
