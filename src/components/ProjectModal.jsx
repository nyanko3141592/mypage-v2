import TwitterEmbed from './TwitterEmbed'

const ProjectModal = ({ work, lang, t, onClose }) => {
    if (!work) return null

    const getGitHubOGP = () => {
        if (!work.githubUrl || !work.githubUrl.startsWith('https://github.com/')) return null
        const match = work.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
        if (!match) return null
        return `https://opengraph.githubassets.com/${match[1]}/${match[2]}`
    }

    const ogpImage = !work.image && getGitHubOGP()

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button type="button" className="modal-close" onClick={onClose}>{t.close}</button>
                <h2 className="row-title" style={{ fontSize: '1.5rem', paddingRight: 48 }}>{work.title}</h2>
                <div style={{ margin: '12px 0 16px' }}>
                    <span className="brutal-tag">{work.category}</span>
                    {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
                </div>
                <p className="row-body" style={{ marginBottom: 24 }}>
                    {lang === 'ja' ? work.descJa : work.descEn}
                </p>
                {(work.url || work.githubUrl) && (
                    <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {work.url && (
                            <a href={work.url} target="_blank" rel="noopener noreferrer" className="brutal-btn">
                                {work.url.startsWith('https://github.com/') ? 'GitHub' : 'Website'}
                            </a>
                        )}
                        {work.githubUrl && (
                            <a href={work.githubUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn btn-secondary">
                                GitHub
                            </a>
                        )}
                    </div>
                )}
                {work.twitterId && <TwitterEmbed tweetId={work.twitterId} />}
                {!work.twitterId && (work.image || ogpImage) && (
                    <img src={work.image || ogpImage} alt={work.title} />
                )}
            </div>
        </div>
    )
}

export default ProjectModal
