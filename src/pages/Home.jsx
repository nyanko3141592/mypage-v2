import React from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../assets/icon.svg'
import { allWorksData } from '../data/works'
import ProjectImage from '../components/ProjectImage'

function HomePage({ lang, t, onWorkClick }) {
    const featured = allWorksData.slice(0, 4)
    const socials = [
        { name: "X (Twitter)", url: "https://twitter.com/nya3_neko2", color: "var(--primary-color)" },
        { name: "GitHub", url: "https://github.com/nyanko3141592", color: "var(--secondary-color)" },
        { name: "Note", url: "https://note.com/electrical_cat", color: "var(--accent-color)" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/naoki-takahashi-143774225/", color: "var(--green)" }
    ]

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
                    </div>
                </div>
            </header>
            <main className="container">
                <div className="brutal-card" style={{ background: '#2ecc71', color: 'black' }}>
                    <h2>Engineering & Mathematics</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                        {lang === 'ja'
                            ? "ソフトウェア、ハードウェア、そして数学の境界線で活動しています。CoeFontでのプロダクト開発と並行し、大学では数学の学問に励んでいます。2025年には共著の言語処理研究で若手奨励賞を受賞しました。"
                            : "Working at the intersection of software, hardware, and mathematics. Balancing product development at CoeFont while pursuing mathematical studies at Waseda University. In 2025, co-authored NLP research received a Young Researcher Award."}
                    </p>
                    <a href="https://note.com/electrical_cat/n/n34039325f3a2" target="_blank" rel="noopener noreferrer" className="brutal-btn">2025 Recap</a>
                </div>
                <section style={{ margin: '4rem 0' }}>
                    <h2>{t.profile}</h2>
                    <div className="grid">
                        <div className="brutal-card"><h3>{t.whoTitle}</h3><p>{t.whoDesc}</p></div>
                        <div className="brutal-card"><h3>{t.profTitle}</h3><p>{t.profDesc}</p></div>
                        <div className="brutal-card"><h3>{t.interestsTitle}</h3><p>{t.interestsDesc}</p></div>
                    </div>
                </section>
                <section style={{ margin: '4rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: 0 }}>{t.projectsTitle}</h2>
                        <Link to="/works" className="brutal-btn" style={{ fontSize: '0.9rem' }}>{t.allWorks} →</Link>
                    </div>
                    <div className="grid">
                        {featured.map((p, i) => (
                            <div key={i} className="brutal-card" onClick={() => onWorkClick(p)}>
                                <div className="project-img-container"><ProjectImage src={p.image} title={p.title} /></div>
                                <div>{p.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}</div>
                                <h3 style={{ marginTop: '1rem' }}>{p.title}</h3>
                                <p style={{ marginBottom: '1.5rem', minHeight: '4.5rem' }}>{lang === 'ja' ? p.descJa : p.descEn}</p>
                                <button className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t.viewProject}</button>
                            </div>
                        ))}
                    </div>
                </section>
                <section style={{ margin: '4rem 0' }}>
                    <h2>{t.connect}</h2>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {socials.map((s, i) => (
                            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="brutal-card" style={{ textAlign: 'center', background: s.color, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '150px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{s.name}</span>
                            </a>
                        ))}
                    </div>
                </section>
                <section style={{ margin: '4rem 0' }}>
                    <h2>{t.blogTitle}</h2>
                    <div className="brutal-card">
                        <p>{t.blogComing}</p>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/blog" className="brutal-btn">{t.readBlog}</Link>
                            <a href="https://note.com/electrical_cat" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ background: 'white', color: 'black' }}>{t.visitNote}</a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage
