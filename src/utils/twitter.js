import Papa from 'papaparse';

export const fetchTweets = (year) => {
    return new Promise((resolve, reject) => {
        fetch(`/tweets_${year}.csv`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load CSV')
                return res.text()
            })
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsed = results.data.map(tw => ({
                            ...tw,
                            dateObj: new Date(tw['Date']),
                            likesCount: parseInt(tw['Likes']?.replace(/,/g, '') || '0', 10),
                            impCount: parseInt(tw['Impressions']?.replace(/,/g, '') || '0', 10),
                            engCount: parseInt(tw['Engagements']?.replace(/,/g, '') || '0', 10),
                            tweetId: tw['Post id'] || tw['Post Link']?.split('/').pop()
                        }))
                        resolve(parsed)
                    },
                    error: (err) => reject(err)
                })
            })
            .catch(err => {
                console.error(err)
                resolve([]) // Return empty on error
            })
    })
}
