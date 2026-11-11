import { LuX, LuGithub, LuGlobe } from 'react-icons/lu'
import TwitterEmbed from './TwitterEmbed'
import { TagList } from './Ui'

const ProjectModal = ({ work, lang, t, onClose }) => {
    if (!work) return null

    const getGitHubOGP = () => {
        if (!work.githubUrl || !work.githubUrl.startsWith('https://github.com/')) return null
        const match = work.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
        if (!match) return null
        return `https://opengraph.githubassets.com/${match[1]}/${match[2]}`
    }

    const ogpImage = !work.image && getGitHubOGP()
    const websiteIsGithub = work.url && work.url.startsWith('https://github.com/')

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button type="button" className="modal-close icon-btn" onClick={onClose} aria-label={t.close} title={t.close}>
                    <LuX size={20} />
                </button>
                <h2 className="row-title" style={{ fontSize: '1.5rem', paddingRight: 48 }}>{work.title}</h2>
                <div style={{ margin: '8px 0 16px' }}>
                    <TagList tags={work.tags} />
                </div>
                <p className="row-body muted" style={{ marginBottom: 24 }}>
                    {lang === 'ja' ? work.descJa : work.descEn}
                </p>
                {(work.url || work.githubUrl) && (
                    <div style={{ marginBottom: 24, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {work.url && (
                            <a href={work.url} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={websiteIsGithub ? 'GitHub' : 'Website'} title={websiteIsGithub ? 'GitHub' : 'Website'}>
                                {websiteIsGithub ? <LuGithub size={20} /> : <LuGlobe size={20} />}
                            </a>
                        )}
                        {work.githubUrl && (
                            <a href={work.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" title="GitHub">
                                <LuGithub size={20} />
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
