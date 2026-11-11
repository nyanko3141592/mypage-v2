import { Link } from 'react-router-dom'
import { linksData } from '../data/links'

function LinksPage({ t }) {
    return (
        <div className="container">
            <div className="page-header">
                <Link to="/" className="back-link">← {t.back}</Link>
                <h1>Links</h1>
                <p className="page-subtitle">Bento.me is sunsetting, so I moved my links here.</p>
            </div>
            {linksData.map((category, i) => (
                <section key={i} className="section">
                    <div className="section-header">
                        <h2>{category.category}</h2>
                    </div>
                    {category.items.map((item, j) => (
                        <a key={j} href={item.url} target="_blank" rel="noopener noreferrer" className="list-row">
                            <h3 className="row-title">{item.name}</h3>
                            <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>{item.url}</p>
                        </a>
                    ))}
                </section>
            ))}
        </div>
    )
}

export default LinksPage
