import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaReddit, FaMastodon, FaGlasses } from 'react-icons/fa'
import { SiWantedly, SiQiita, SiZenn, SiMisskey, SiSubstack } from 'react-icons/si'
import { IoDocumentText } from 'react-icons/io5'
import profileIcon from '../assets/icon.svg'
import { allWorksData } from '../data/works'
import { linksData } from '../data/links'
import { workExperience, awards } from '../data/profile'
import { talks } from '../data/talks'
import { mediaItems } from '../data/media'
import { getPosts } from '../utils/posts'
import { TagList } from '../components/Ui'

function HomePage({ lang, t, onWorkClick }) {
    const [recentPosts, setRecentPosts] = useState([])

    useEffect(() => {
        getPosts().then(posts => setRecentPosts(posts.slice(0, 3)))
    }, [])

    const featuredIds = ['inspiration-cat', 'azookey-macos', 'paperswipe', 'zenzai', 'smartglasses', 'coefont-interpreter']
    const featured = allWorksData.filter(work => featuredIds.includes(work.id))
    const targetSocials = ['X (Twitter)', 'GitHub', 'LinkedIn', 'Wantedly', 'Note', 'Substack', 'SmartGlasses', 'Qiita', 'Zenn', 'YouTube', 'Misskey.io', 'Mastodon', 'Reddit']
    const iconMap = {
        'X (Twitter)': <FaTwitter size={18} />, GitHub: <FaGithub size={18} />, LinkedIn: <FaLinkedin size={18} />,
        Wantedly: <SiWantedly size={18} />, Note: <IoDocumentText size={18} />, Substack: <SiSubstack size={18} />,
        SmartGlasses: <FaGlasses size={18} />, Qiita: <SiQiita size={18} />, Zenn: <SiZenn size={18} />,
        YouTube: <FaYoutube size={18} />, 'Misskey.io': <SiMisskey size={18} />, Mastodon: <FaMastodon size={18} />, Reddit: <FaReddit size={18} />,
    }
    const allLinks = linksData.flatMap(category => category.items)
    const socialLinks = targetSocials.map(name => {
        const item = allLinks.find(link => link.name === name)
        return item ? { ...item, iconComponent: iconMap[name] } : null
    }).filter(Boolean)
    const label = (ja, en) => lang === 'ja' ? ja : en

    return <div>
        <header className="profile-header">
            <img src={profileIcon} alt="Profile" className="profile-img" />
            <div className="profile-identity">
                <h1 className="profile-name">Naoki Takahashi</h1>
                <p className="profile-handle">@nya3_neko2</p>
            </div>
            <p className="profile-bio">{t.heroBody}</p>
        </header>

        <section className="profile-facts" aria-label={label('プロフィール', 'Profile')}>
            <div className="profile-fact"><p><strong>{label('肩書き', 'Work')}</strong>{t.profDesc}</p></div>
            <div className="profile-fact"><p><strong>{label('受賞', 'Awards')}</strong>{awards.slice(0, 3).map((award, index) => <span key={award.titleEn}>{index > 0 ? '、' : ''}{lang === 'ja' ? award.titleJa : award.titleEn}{index === 0 ? ' Distinguished Winner' : ''}{index === 1 ? '' : ''}</span>)}</p></div>
            <div className="profile-fact"><p><strong>{label('今', 'Now')}</strong>{t.interestsDesc}</p></div>
            <div className="profile-fact"><p><strong>{label('リンク', 'Links')}</strong><a href="https://smartglasses.fyi" target="_blank" rel="noopener noreferrer">{t.glassesTitle}</a> · <a href="https://naokitakahashi1.substack.com" target="_blank" rel="noopener noreferrer">{t.newsletterTitle}</a></p></div>
            <div className="social-row">
                {socialLinks.map(item => {
                    const socialKey = item.name.toLowerCase().replace(/[^a-z]/g, '').replace('xtwitter', 'twitter').replace('misskeyio', 'misskey')
                    return <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="social-icon-btn" data-social={socialKey} title={item.name} aria-label={item.name}>{item.iconComponent}</a>
                })}
            </div>
        </section>

        <nav className="section-nav" aria-label={label('ページ内リンク', 'On this page')}>
            <a href="#experience">{label('経歴', 'Experience')}</a>
            <a href="#awards">{t.awardsTitle}</a>
            <a href="#talks">{t.talksTitle}</a>
            <a href="#works">{label('主な作品', 'Selected Works')}</a>
            <a href="#media">{t.mediaTitle}</a>
            <a href="#blog">{t.blogTitle}</a>
        </nav>

        <section className="section" id="experience">
            <div className="section-header"><h2>{label('経歴', 'Experience')}</h2></div>
            {workExperience.map((job, index) => <div key={index} className="list-row">
                <div className="row-meta">{lang === 'ja' ? job.periodJa : job.periodEn}</div>
                <h3 className="row-title">{job.url ? <a href={job.url} target="_blank" rel="noopener noreferrer">{lang === 'ja' ? job.companyJa : job.companyEn}</a> : (lang === 'ja' ? job.companyJa : job.companyEn)}</h3>
                <p className="row-body"><strong>{lang === 'ja' ? job.roleJa : job.roleEn}</strong></p>
                <p className="row-body muted">{lang === 'ja' ? job.descriptionJa : job.descriptionEn}</p>
            </div>)}
        </section>

        <section className="section" id="awards">
            <div className="section-header"><h2>{t.awardsTitle}</h2></div>
            {awards.map((award, index) => <div key={index} className="list-row">
                <div className="row-meta">{lang === 'ja' ? award.dateJa : award.dateEn}</div>
                <h3 className="row-title">{lang === 'ja' ? award.titleJa : award.titleEn}</h3>
                <p className="row-body muted">{lang === 'ja' ? award.descriptionJa : award.descriptionEn}{award.url && <> <a href={award.url} target="_blank" rel="noopener noreferrer">{lang === 'ja' ? (award.sourceJa || '出典') : (award.sourceEn || 'Source')}</a></>}</p>
            </div>)}
        </section>

        <section className="section" id="talks">
            <div className="section-header"><h2>{t.talksTitle}</h2></div>
            {talks.map((talk, index) => <div key={index} className="list-row">
                <div className="row-meta">{lang === 'ja' ? talk.dateJa : talk.dateEn} · {lang === 'ja' ? talk.kindJa : talk.kindEn}</div>
                <h3 className="row-title">{lang === 'ja' ? talk.titleJa : talk.titleEn}</h3>
                <p className="row-body muted">{lang === 'ja' ? talk.descriptionJa : talk.descriptionEn}{talk.url && <> <a href={talk.url} target="_blank" rel="noopener noreferrer">{lang === 'ja' ? (talk.sourceJa || '出典') : (talk.sourceEn || 'Source')}</a></>}</p>
            </div>)}
        </section>

        <section className="section" id="works">
            <div className="section-header"><h2>{label('主な作品', 'Selected Works')}</h2><Link className="section-link" to="/works">{t.worksTitle}</Link></div>
            {featured.map(work => <div key={work.id} className="list-row work-row text-work-row" onClick={() => onWorkClick(work)} role="button" tabIndex={0} onKeyDown={event => { if (event.key === 'Enter') onWorkClick(work) }}>
                <div className="work-row-body"><h3 className="row-title">{work.title}</h3><p className="row-body muted">{lang === 'ja' ? work.descJa : work.descEn}</p><TagList tags={work.tags} /></div>
            </div>)}
        </section>

        <section className="section" id="media">
            <div className="section-header"><h2>{t.mediaTitle}</h2><Link className="section-link" to="/media">{label('掲載をすべて見る', 'See all coverage')}</Link></div>
            {mediaItems.slice(0, 3).map(item => <div key={item.id} className="list-row">
                <div className="row-meta">{item.outlet} · {item.date.slice(0, 7).replace('-', '.')}</div>
                <h3 className="row-title"><a href={item.url} target="_blank" rel="noopener noreferrer">{lang === 'ja' ? item.titleJa : item.titleEn}</a></h3>
                <p className="row-body muted">{lang === 'ja' ? item.summaryJa : item.summaryEn}</p>
            </div>)}
        </section>

        <section className="section" id="blog">
            <div className="section-header"><h2>{t.blogTitle}</h2><Link className="section-link" to="/blog">{label('すべて見る', 'See all')}</Link></div>
            {recentPosts.length ? recentPosts.map(post => <Link key={post.slug} to={`/blog/${post.slug}`} className="list-row">
                <div className="row-meta">{new Date(post.date).toLocaleDateString()}</div><h3 className="row-title">{post.title}</h3>
            </Link>) : <div className="list-row"><p className="muted">{t.blogComing}</p></div>}
        </section>
    </div>
}

export default HomePage
