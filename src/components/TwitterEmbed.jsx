import React, { useEffect, useRef } from 'react';

const TwitterEmbed = ({ tweetId }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const loadWidget = () => {
            if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.load(containerRef.current);
            }
        };

        if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
            const script = document.createElement("script");
            script.setAttribute("src", "https://platform.twitter.com/widgets.js");
            script.setAttribute("async", "true");
            script.onload = loadWidget;
            document.head.appendChild(script);
        } else if (window.twttr && window.twttr.widgets) {
            loadWidget();
        } else {
            // Script is loading but not ready yet
            const checkReady = setInterval(() => {
                if (window.twttr && window.twttr.widgets) {
                    clearInterval(checkReady);
                    loadWidget();
                }
            }, 100);
            return () => clearInterval(checkReady);
        }
    }, [tweetId]);

    return (
        <div className="twitter-embed-container" ref={containerRef}>
            <blockquote className="twitter-tweet" data-lang="ja">
                <a href={`https://twitter.com/nya3_neko2/status/${tweetId}`}>Loading tweet...</a>
            </blockquote>
        </div>
    );
};

export default TwitterEmbed;
