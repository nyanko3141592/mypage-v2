import React from 'react';

const ProjectImage = ({ src, title }) => {
    if (!src) {
        return (
            <div className="project-img brutalist-placeholder">
                <span>NO IMAGE</span>
            </div>
        )
    }
    return <img src={src} alt={title} className="project-img" />
}

export default ProjectImage;
