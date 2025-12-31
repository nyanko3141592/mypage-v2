import React, { useState, useEffect } from 'react'

const LinkPreview = ({ url }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOgp = async () => {
            try {
                const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
                const json = await res.json()
                if (json.status === 'success' && json.data) {
                    setData({
                        title: json.data.title || url,
                        description: json.data.description || '',
                        image: json.data.image?.url || null,
                        favicon: json.data.logo?.url || null,
                        hostname: new URL(url).hostname
                    })
                }
            } catch {
                // Fallback to basic info
                setData({
                    title: url,
                    description: '',
                    image: null,
                    favicon: null,
                    hostname: new URL(url).hostname
                })
            }
            setLoading(false)
        }
        fetchOgp()
    }, [url])

    if (loading) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-simple">
                Loading...
            </a>
        )
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-card">
            {data?.image && (
                <div className="link-preview-image">
                    <img src={data.image} alt="" />
                </div>
            )}
            <div className="link-preview-content">
                <div className="link-preview-title">{data?.title || url}</div>
                {data?.description && (
                    <div className="link-preview-description">{data.description}</div>
                )}
                <div className="link-preview-hostname">
                    {data?.favicon && <img src={data.favicon} alt="" className="link-preview-favicon" />}
                    {data?.hostname}
                </div>
            </div>
        </a>
    )
}

export default LinkPreview
