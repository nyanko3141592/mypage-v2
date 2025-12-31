import React from 'react'
import Microlink from '@microlink/react'

const LinkPreview = ({ url, style = {} }) => {
    return (
        <div style={{ margin: '2rem 0', ...style }}>
            <Microlink
                url={url}
                size="large"
                style={{ width: '100%', fontFamily: 'var(--font-sans)' }}
            />
        </div>
    )
}

export default LinkPreview
