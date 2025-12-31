import fm from 'front-matter'

export const getPosts = async () => {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' })
    const posts = await Promise.all(
        Object.entries(modules).map(async ([path, loader]) => {
            const markdown = await loader()
            const { attributes, body } = fm(markdown)
            const slug = path.split('/').pop().replace('.md', '')
            return {
                slug,
                ...attributes,
                body
            }
        })
    )
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPost = async (slug) => {
    // In a real app we might dynamic import just the one file, but this is simple enough
    const posts = await getPosts()
    return posts.find(p => p.slug === slug)
}
