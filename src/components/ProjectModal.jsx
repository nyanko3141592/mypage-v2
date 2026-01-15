import React from 'react';
import TwitterEmbed from './TwitterEmbed';

const ProjectModal = ({ work, lang, t, onClose }) => {
    if (!work) return null;

    const getGitHubOGP = () => {
        if (!work.githubUrl || !work.githubUrl.startsWith('https://github.com/')) return null;
        const match = work.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;
        return `https://opengraph.githubassets.com/${match[1]}/${match[2]}`;
    };

    const ogpImage = !work.image && getGitHubOGP();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>{t.close} [X]</button>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{work.title}</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                    <span className="brutal-tag" style={{ background: 'black', color: 'white' }}>{work.category}</span>
                    {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
                </div>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    {lang === 'ja' ? work.descJa : work.descEn}
                </p>
                {(work.url || work.githubUrl) && (
                    <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {work.url && (
                            <a href={work.url} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                <span>🌐</span>
                                <span>{work.url.startsWith('https://github.com/') ? 'GitHub' : 'Website'}</span>
                            </a>
                        )}
                        {work.githubUrl && (
                            <a href={work.githubUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                <span>🔗</span>
                                <span>GitHub</span>
                            </a>
                        )}
                    </div>
                )}
                {work.twitterId && <TwitterEmbed tweetId={work.twitterId} />}
                {!work.twitterId && (work.image || ogpImage) && (
                    <img src={work.image || ogpImage} alt={work.title} style={{ width: '100%', border: '4px solid black', marginTop: '1rem' }} />
                )}
            </div>
        </div>
    );
};

export default ProjectModal;
