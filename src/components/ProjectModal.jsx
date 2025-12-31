import React from 'react';
import TwitterEmbed from './TwitterEmbed';

const ProjectModal = ({ work, lang, t, onClose }) => {
    if (!work) return null;
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
                {work.twitterId && <TwitterEmbed tweetId={work.twitterId} />}
                {!work.twitterId && work.image && (
                    <img src={work.image} alt={work.title} style={{ width: '100%', border: '4px solid black', marginTop: '1rem' }} />
                )}
            </div>
        </div>
    );
};

export default ProjectModal;
