import React from 'react';

const ProjectImage = ({ src, title, githubUrl }) => {
    const getGitHubOGP = () => {
        if (!githubUrl || !githubUrl.startsWith('https://github.com/')) return null;
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;
        return `https://opengraph.githubassets.com/${match[1]}/${match[2]}`;
    };

    const ogpImage = !src && getGitHubOGP();

    if (!src && !ogpImage) {
        return (
            <div className="project-img brutalist-placeholder">
                <span>NO IMAGE</span>
            </div>
        )
    }

    return <img src={src || ogpImage} alt={title} className="project-img" />
}

export default ProjectImage;
