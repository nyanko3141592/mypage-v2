import React, { useEffect } from 'react';

const TwitterEmbed = ({ tweetId }) => {
    useEffect(() => {
        if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
            const script = document.createElement("script");
            script.setAttribute("src", "https://platform.twitter.com/widgets.js");
            script.setAttribute("async", "true");
            document.head.appendChild(script);
        } else if (window.twttr) {
            window.twttr.widgets.load();
        }
    }, [tweetId]);

    return (
        <div className="twitter-embed-container">
            <blockquote className="twitter-tweet" data-lang="ja">
                <a href={`https://twitter.com/nya3_neko2/status/${tweetId}`}>Loading tweet...</a>
            </blockquote>
        </div>
    );
};

export default TwitterEmbed;
