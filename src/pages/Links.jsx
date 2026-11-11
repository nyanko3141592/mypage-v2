import { linksData } from '../data/links'
import { BackLink, Favicon, hostnameOf } from '../components/Ui'

function LinksPage({ t }) {
    return (
        <div className="container">
            <div className="page-header">
                <BackLink to="/" label={t.back} />
                <h1>Links</h1>
            </div>
            {linksData.map((category, i) => (
                <section key={i} className="section">
                    {category.items.map((item, j) => (
                        <a key={j} href={item.url} target="_blank" rel="noopener noreferrer" className="list-row">
                            <div className="row-meta">
                                <Favicon url={item.url} />
                                <span>{hostnameOf(item.url)}</span>
                            </div>
                            <h3 className="row-title">{item.name}</h3>
                        </a>
                    ))}
                </section>
            ))}
        </div>
    )
}

export default LinksPage
