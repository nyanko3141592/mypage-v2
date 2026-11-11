import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaReddit, FaMastodon, FaGlasses } from 'react-icons/fa'
import { SiWantedly, SiQiita, SiZenn, SiMisskey, SiSubstack } from 'react-icons/si'
import { IoDocumentText } from 'react-icons/io5' // For Note as there isn't a direct SiNote icon always available
import profileIcon from '../assets/icon.svg'
import { allWorksData } from '../data/works'
import { linksData } from '../data/links'
import { workExperience, awards } from '../data/profile'
import { mediaItems } from '../data/media'
import { getPosts } from '../utils/posts'
import ProjectImage from '../components/ProjectImage'

// Random rotation for card hover effect
const getRandomRotation = () => {
    const rotation = (Math.random() - 0.5) * 4 // -2deg to 2deg
    return { '--card-rotate': `${rotation}deg` }
}

function HomePage({ lang, t, onWorkClick }) {
    // Blog posts state
    const [recentPosts, setRecentPosts] = useState([])

    useEffect(() => {
        getPosts().then(posts => {
            setRecentPosts(posts.slice(0, 3))
        })
    }, [])

    // Select featured works manually or top N
    // Prioritize visual/high-impact ones: azooKey, Zenzai, PaperSwipe, Hiroyuki, CoeFont, KeySpec
    const featuredIds = ["inspiration-cat", "azookey-macos", "paperswipe", "zenzai", "smartglasses", "coefont-interpreter"]
    const featured = allWorksData.filter(w => featuredIds.includes(w.id))

    // Define social links order explicitly
    const targetSocials = [
        "X (Twitter)", "GitHub", "LinkedIn", "Wantedly",
        "Note", "Substack", "SmartGlasses", "Qiita", "Zenn",
        "YouTube", "Misskey.io", "Mastodon", "Reddit"
    ]

    // Icon mapping
    const iconMap = {
        "X (Twitter)": <FaTwitter size={24} />,
        "GitHub": <FaGithub size={24} />,
        "LinkedIn": <FaLinkedin size={24} />,
        "Wantedly": <SiWantedly size={24} />,
        "Note": <IoDocumentText size={24} />,
        "Substack": <SiSubstack size={24} />,
        "SmartGlasses": <FaGlasses size={24} />,
        "Qiita": <SiQiita size={24} />,
        "Zenn": <SiZenn size={24} />,
        "YouTube": <FaYoutube size={24} />,
        "Misskey.io": <SiMisskey size={24} />,
        "Mastodon": <FaMastodon size={24} />,
        "Reddit": <FaReddit size={24} />
    }

    // Flatten links and sort based on targetSocials
    const allLinksFlat = linksData.flatMap(c => c.items)
    const socialLinks = targetSocials.map(name => {
        const item = allLinksFlat.find(i => i.name === name)
        return item ? { ...item, iconComponent: iconMap[name] } : null
    }).filter(Boolean)

    return (
        <div>
            <div className="marquee">
                <div>{t.marquee}{t.marquee}</div>
            </div>
            <header>
                <div className="container profile-section">
                    <div className="profile-img-container">
                        <img src={profileIcon} alt="Profile" className="profile-img" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 'min(4rem, 10vw)', lineHeight: '1' }}>Naoki Takahashi</h1>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                            {t.handle}
                        </p>
                        <nav className="site-nav" aria-label="pages">
                            <Link to="/works" className="brutal-btn nav-link">{t.navWorks}</Link>
                            <Link to="/media" className="brutal-btn nav-link">{t.navMedia}</Link>
                            <Link to="/blog" className="brutal-btn nav-link">{t.navBlog}</Link>
                            <Link to="/x" className="brutal-btn nav-link">/x</Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container">
                <div className="brutal-card" style={{ background: '#2ecc71', color: 'black' }}>
                    <h2>{t.heroTitle}</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{t.heroBody}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Link to="/media" className="brutal-btn">{t.navMedia}</Link>
                        <Link to="/blog/2025-recap" className="brutal-btn" style={{ background: 'white', color: 'black' }}>2025 Recap</Link>
                    </div>
                </div>

                <section style={{ margin: '2.5rem 0 0' }}>
                    <h2>{t.nowTitle}</h2>
                    <div className="grid">
                        <a href="https://smartglasses.fyi" target="_blank" rel="noopener noreferrer" className="brutal-card" style={{ background: 'var(--secondary-color)', color: 'black', textDecoration: 'none' }}>
                            <h3>{t.glassesTitle}</h3>
                            <p>{t.glassesBody}</p>
                            <span className="brutal-btn" style={{ background: 'white', color: 'black' }}>{t.glassesCta}</span>
                        </a>
                        <a href="https://naokitakahashi1.substack.com" target="_blank" rel="noopener noreferrer" className="brutal-card" style={{ background: 'var(--yellow)', color: 'black', textDecoration: 'none' }}>
                            <h3>{t.newsletterTitle}</h3>
                            <p>{t.newsletterBody}</p>
                            <span className="brutal-btn" style={{ background: 'black', color: 'white' }}>{t.newsletterCta}</span>
                        </a>
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <h2>Socials</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {socialLinks.map(item => {
                            const socialKey = item.name.toLowerCase().replace(/[^a-z]/g, '').replace('xtwitter', 'twitter').replace('misskeyio', 'misskey')
                            return (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="brutal-btn social-icon-btn"
                                    data-social={socialKey}
                                    style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50px', minHeight: '50px', background: 'white', color: 'black' }}
                                    title={item.name}
                                >
                                    {item.iconComponent}
                                </a>
                            )
                        })}
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <h2>{t.profile}</h2>
                    <div className="grid">
                        <div className="brutal-card" style={getRandomRotation()}><h3>{t.whoTitle}</h3><p>{t.whoDesc}</p></div>
                        <div className="brutal-card" style={getRandomRotation()}><h3>{t.profTitle}</h3><p>{t.profDesc}</p></div>
                        <div className="brutal-card" style={getRandomRotation()}><h3>{t.interestsTitle}</h3><p>{t.interestsDesc}</p></div>
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div>
                            <h2 style={{ borderBottom: '4px solid black', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>{t.experienceTitle}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {workExperience.map((job, i) => (
                                    <div key={i} className="brutal-card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{lang === 'ja' ? job.companyJa : job.companyEn}</h3>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', background: 'var(--yellow)', padding: '0.2rem 0.5rem', border: '2px solid black' }}>{lang === 'ja' ? job.periodJa : job.periodEn}</span>
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{lang === 'ja' ? job.roleJa : job.roleEn}</div>
                                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{lang === 'ja' ? job.descriptionJa : job.descriptionEn}</p>
                                        {job.url && (
                                            <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textDecoration: 'underline' }}>
                                                {t.sourceLink}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 style={{ borderBottom: '4px solid black', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>{t.awardsTitle}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {awards.map((award, i) => (
                                    <div key={i} className="brutal-card" style={{ padding: '1.5rem', borderLeft: '8px solid var(--accent-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'ja' ? award.titleJa : award.titleEn}</h3>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{lang === 'ja' ? award.dateJa : award.dateEn}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{lang === 'ja' ? award.descriptionJa : award.descriptionEn}</p>
                                        {award.url && (
                                            <a href={award.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textDecoration: 'underline' }}>
                                                {t.sourceLink}: {lang === 'ja' ? (award.sourceJa || award.url) : (award.sourceEn || award.url)}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: 0 }}>{t.projectsTitle}</h2>
                        <Link to="/works" className="brutal-btn" style={{ fontSize: '0.9rem' }}>{t.allWorks} →</Link>
                    </div>
                    <div className="grid">
                        {featured.map((p, i) => (
                            <div key={i} className="brutal-card" style={getRandomRotation()} onClick={() => onWorkClick(p)}>
                                <div className="project-img-container"><ProjectImage src={p.image} title={p.title} githubUrl={p.githubUrl} /></div>
                                <div>{p.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}</div>
                                <h3 style={{ marginTop: '1rem' }}>{p.title}</h3>
                                <p style={{ marginBottom: '1.5rem', minHeight: '4.5rem' }}>{lang === 'ja' ? p.descJa : p.descEn}</p>
                                <button className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t.viewProject}</button>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
                        <h2 style={{ marginBottom: 0 }}>{t.mediaTitle}</h2>
                        <Link to="/media" className="brutal-btn" style={{ fontSize: '0.9rem' }}>{t.allMedia} →</Link>
                    </div>
                    <div className="grid">
                        {mediaItems.slice(0, 3).map((item) => (
                            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="brutal-card media-card">
                                <div className="media-card-top">
                                    <span className="brutal-tag">{item.outlet}</span>
                                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{item.date.slice(0, 7).replace('-', '.')}</span>
                                </div>
                                <h3 style={{ marginTop: '0.8rem' }}>{lang === 'ja' ? item.titleJa : item.titleEn}</h3>
                                <p>{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
                            </a>
                        ))}
                    </div>
                </section>

                <section style={{ margin: '4rem 0' }}>
                    <h2>{t.blogTitle}</h2>
                    {recentPosts.length > 0 ? (
                        <div className="grid">
                            {recentPosts.map(post => (
                                <Link key={post.slug} to={`/blog/${post.slug}`} className="brutal-card" style={{ textDecoration: 'none', color: 'black', ...getRandomRotation() }}>
                                    <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', color: '#666' }}>{new Date(post.date).toLocaleDateString()}</span>
                                    <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{post.title}</h3>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        {post.tags && post.tags.slice(0, 2).map(tag => (
                                            <span key={tag} style={{ fontSize: '0.7rem', border: '1px solid black', padding: '0.1rem 0.3rem', marginRight: '0.3rem', borderRadius: '4px' }}>{tag}</span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="brutal-card"><p>{t.blogComing}</p></div>
                    )}
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/blog" className="brutal-btn">{t.readBlog}</Link>
                        <a href="https://note.com/electrical_cat" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ background: 'white', color: 'black' }}>{t.visitNote}</a>
                        <Link to="/x" className="brutal-btn" style={{ background: 'black', color: 'white' }}>/x (Analytics)</Link>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage
