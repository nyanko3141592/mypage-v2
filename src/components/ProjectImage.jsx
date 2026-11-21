import React, { useState } from 'react';

const ProjectImage = ({ src, title, githubUrl }) => {
    const [portrait, setPortrait] = useState(false)
    const getGitHubOGP = () => {
        if (!githubUrl || !githubUrl.startsWith('https://github.com/')) return null;
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;
        return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
    };

    const ogpImage = !src && getGitHubOGP();

    if (!src && !ogpImage) {
        return (
            <div className="project-img brutalist-placeholder">
                <span>{title}</span>
            </div>
        )
    }

    return <img src={src || ogpImage} alt={title} className={'project-img' + (portrait ? ' is-portrait' : '')} onLoad={event => setPortrait(event.currentTarget.naturalHeight > event.currentTarget.naturalWidth * 1.1)} />
}

export default ProjectImage;
