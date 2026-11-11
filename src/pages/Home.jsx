import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaReddit, FaMastodon, FaGlasses } from 'react-icons/fa'
import { SiWantedly, SiQiita, SiZenn, SiMisskey, SiSubstack } from 'react-icons/si'
import { IoDocumentText } from 'react-icons/io5'
import { LuArrowUpRight } from 'react-icons/lu'
import profileIcon from '../assets/icon.svg'
import { allWorksData } from '../data/works'
import { linksData } from '../data/links'
import { workExperience, awards } from '../data/profile'
import { mediaItems } from '../data/media'
import { getPosts } from '../utils/posts'
import ProjectImage from '../components/ProjectImage'
import { Favicon, TagList } from '../components/Ui'

function nickname(handle) {
    return (handle || '').replace(/[\[\]]/g, '').trim()
}

function HomePage({ lang, t, onWorkClick }) {
    const [recentPosts, setRecentPosts] = useState([])

    useEffect(() => {
        getPosts().then(posts => {
            setRecentPosts(posts.slice(0, 3))
        })
    }, [])

    const featuredIds = ["inspiration-cat", "azookey-macos", "paperswipe", "zenzai", "smartglasses", "coefont-interpreter"]
    const featured = allWorksData.filter(w => featuredIds.includes(w.id))

    const targetSocials = [
        "X (Twitter)", "GitHub", "LinkedIn", "Wantedly",
        "Note", "Substack", "SmartGlasses", "Qiita", "Zenn",
        "YouTube", "Misskey.io", "Mastodon", "Reddit"
    ]

    const iconMap = {
        "X (Twitter)": <FaTwitter size={18} />,
        "GitHub": <FaGithub size={18} />,
        "LinkedIn": <FaLinkedin size={18} />,
        "Wantedly": <SiWantedly size={18} />,
        "Note": <IoDocumentText size={18} />,
        "Substack": <SiSubstack size={18} />,
        "SmartGlasses": <FaGlasses size={18} />,
        "Qiita": <SiQiita size={18} />,
        "Zenn": <SiZenn size={18} />,
        "YouTube": <FaYoutube size={18} />,
        "Misskey.io": <SiMisskey size={18} />,
        "Mastodon": <FaMastodon size={18} />,
        "Reddit": <FaReddit size={18} />
    }

    const allLinksFlat = linksData.flatMap(c => c.items)
    const socialLinks = targetSocials.map(name => {
        const item = allLinksFlat.find(i => i.name === name)
        return item ? { ...item, iconComponent: iconMap[name] } : null
    }).filter(Boolean)

    return (
        <div>
            <div className="profile-banner" aria-hidden="true" />
            <header className="profile-header">
                <div className="profile-avatar-wrap">
                    <img src={profileIcon} alt="Profile" className="profile-img" />
                </div>
                <h1 className="profile-name">Naoki Takahashi</h1>
                <p className="profile-handle">{nickname(t.handle)} · @nya3_neko2</p>
                <p className="profile-headline">{t.heroTitle}</p>
                <p className="profile-bio">{t.heroBody}</p>
                <p className="profile-actions">
                    <Link to="/blog/2025-recap" className="quiet-link">2025 Recap</Link>
                </p>
                <div className="social-row">
                    {socialLinks.map(item => {
                        const socialKey = item.name.toLowerCase().replace(/[^a-z]/g, '').replace('xtwitter', 'twitter').replace('misskeyio', 'misskey')
                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn"
                                data-social={socialKey}
                                title={item.name}
                                aria-label={item.name}
                            >
                                {item.iconComponent}
                            </a>
                        )
                    })}
                </div>
            </header>

            <section className="section">
                <a href="https://smartglasses.fyi" target="_blank" rel="noopener noreferrer" className="list-row ext-row">
                    <div className="work-row-body">
                        <h3 className="row-title">{t.glassesTitle}</h3>
                        <p className="row-body muted">{t.glassesBody}</p>
                    </div>
                    <LuArrowUpRight size={18} className="row-affordance" aria-hidden="true" />
                </a>
                <a href="https://naokitakahashi1.substack.com" target="_blank" rel="noopener noreferrer" className="list-row ext-row">
                    <div className="work-row-body">
                        <h3 className="row-title">{t.newsletterTitle}</h3>
                        <p className="row-body muted">{t.newsletterBody}</p>
                    </div>
                    <LuArrowUpRight size={18} className="row-affordance" aria-hidden="true" />
                </a>
            </section>

            <section className="section">
                <div className="list-row">
                    <h3 className="row-title">{t.whoTitle}</h3>
                    <p className="row-body muted">{t.whoDesc}</p>
                </div>
                <div className="list-row">
                    <h3 className="row-title">{t.profTitle}</h3>
                    <p className="row-body muted">{t.profDesc}</p>
                </div>
                <div className="list-row">
                    <h3 className="row-title">{t.interestsTitle}</h3>
                    <p className="row-body muted">{t.interestsDesc}</p>
                </div>
            </section>

            <section className="section">
                {workExperience.map((job, i) => {
                    const company = lang === 'ja' ? job.companyJa : job.companyEn
                    const title = job.url ? (
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="row-title-link">
                            {company}
                            <LuArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    ) : (
                        <h3 className="row-title">{company}</h3>
                    )
                    return (
                        <div key={i} className="list-row">
                            <div className="row-meta">
                                <span>{lang === 'ja' ? job.periodJa : job.periodEn}</span>
                            </div>
                            {title}
                            <p className="row-body" style={{ fontWeight: 600 }}>{lang === 'ja' ? job.roleJa : job.roleEn}</p>
                            <p className="row-body muted">{lang === 'ja' ? job.descriptionJa : job.descriptionEn}</p>
                        </div>
                    )
                })}
            </section>

            <section className="section">
                {awards.map((award, i) => {
                    const title = lang === 'ja' ? award.titleJa : award.titleEn
                    const source = lang === 'ja' ? (award.sourceJa || '') : (award.sourceEn || '')
                    return (
                        <div key={i} className="list-row">
                            <div className="row-meta">
                                <span>{lang === 'ja' ? award.dateJa : award.dateEn}</span>
                                {source && (
                                    <>
                                        <span>·</span>
                                        {award.url ? (
                                            <a href={award.url} target="_blank" rel="noopener noreferrer">{source}</a>
                                        ) : (
                                            <span>{source}</span>
                                        )}
                                    </>
                                )}
                            </div>
                            {award.url && !source ? (
                                <a href={award.url} target="_blank" rel="noopener noreferrer" className="row-title-link">
                                    <span className="row-title">{title}</span>
                                    <LuArrowUpRight size={16} aria-hidden="true" />
                                </a>
                            ) : (
                                <h3 className="row-title">{title}</h3>
                            )}
                            <p className="row-body muted">{lang === 'ja' ? award.descriptionJa : award.descriptionEn}</p>
                        </div>
                    )
                })}
            </section>

            <section className="section">
                {featured.map((p) => (
                    <div key={p.id} className="list-row work-row" onClick={() => onWorkClick(p)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onWorkClick(p) }}>
                        <div className="work-thumb">
                            <ProjectImage src={p.image} title={p.title} githubUrl={p.githubUrl} />
                        </div>
                        <div className="work-row-body">
                            <h3 className="row-title">{p.title}</h3>
                            <p className="row-body muted">{lang === 'ja' ? p.descJa : p.descEn}</p>
                            <TagList tags={p.tags} />
                        </div>
                    </div>
                ))}
            </section>

            <section className="section">
                {mediaItems.slice(0, 3).map((item) => (
                    <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="list-row media-card">
                        <div className="row-meta">
                            <Favicon url={item.url} />
                            <span>{item.outlet}</span>
                            <span>·</span>
                            <span>{item.date.slice(0, 7).replace('-', '.')}</span>
                        </div>
                        <h3 className="row-title">{lang === 'ja' ? item.titleJa : item.titleEn}</h3>
                        <p className="row-body muted">{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
                    </a>
                ))}
            </section>

            <section className="section">
                {recentPosts.length > 0 ? (
                    recentPosts.map(post => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="list-row">
                            <div className="row-meta">{new Date(post.date).toLocaleDateString()}</div>
                            <h3 className="row-title">{post.title}</h3>
                            <TagList tags={post.tags && post.tags.slice(0, 2)} />
                        </Link>
                    ))
                ) : (
                    <div className="list-row"><p className="muted">{t.blogComing}</p></div>
                )}
            </section>
        </div>
    )
}

export default HomePage
