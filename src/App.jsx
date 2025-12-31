import React, { useState } from 'react'
import profileIcon from './assets/icon.svg'
import zenzaiImg from './assets/projects/zenzai.png'
import paperswipeImg from './assets/projects/paperswipe.webp'
import hourglassImg from './assets/projects/hourglass.jpeg'

const translations = {
  ja: {
    handle: "[ 電電猫猫 ]",
    marquee: "WASEDA UNIV • MATHEMATICS • IOS/VISIONOS ENGINEER • MITOH IT 2024 • COEFONT • CUSTOM KEYBOARDS • ",
    profile: "プロフィール",
    whoTitle: "自分について",
    whoDesc: "早稲田大学 基幹理工学部 数学科 3年生。2年間の休学を経て復学し、2026年3月の卒業を目指しています。",
    profTitle: "プロフェッショナル",
    profDesc: "株式会社CoeFontの初期メンバー（在籍約4年）。iOS/visionOSエンジニアとして、リアルタイム音声アプリケーションや開発者体験を専門としています。",
    interestsTitle: "興味・関心",
    interestsDesc: "プログラミング、電子回路、自作キーボード、数学的モデリング。",
    projectsTitle: "主なプロジェクト",
    viewProject: "プロジェクトを見る",
    connect: "繋がる",
    blogTitle: "ブログ",
    blogComing: "準備中... (現在はNoteで発信しています)",
    visitNote: "Note.comを訪ねる",
    stayBrutal: "© 2025 NAOKI TAKAHASHI. STAY BRUTAL."
  },
  en: {
    handle: "[ electrical_cat ]",
    marquee: "WASEDA UNIV • MATHEMATICS • IOS/VISIONOS ENGINEER • MITOH IT 2024 • COEFONT • CUSTOM KEYBOARDS • ",
    profile: "Profile",
    whoTitle: "Who I Am",
    whoDesc: "3rd-year student at Waseda University, Faculty of Science and Engineering, Department of Mathematics. Returned after a 2-year leave of absence, aiming for graduation in March 2026.",
    profTitle: "Professional",
    profDesc: "Early member at CoeFont Co., Ltd. (approx. 4 years). iOS/visionOS Engineer specializing in real-time voice applications and developer experience.",
    interestsTitle: "Interests",
    interestsDesc: "Programming, Electronic Circuits, Custom Keyboards, and Mathematical modeling.",
    projectsTitle: "Featured Projects",
    viewProject: "View Project",
    connect: "Connect",
    blogTitle: "Blog",
    blogComing: "Coming soon... (Currently posting on Note)",
    visitNote: "Visit Note.com",
    stayBrutal: "© 2025 NAOKI TAKAHASHI. STAY BRUTAL."
  }
}

const ProjectImage = ({ src, title }) => {
  if (!src) {
    return (
      <div className="project-img brutalist-placeholder">
        <span>NO IMAGE</span>
      </div>
    )
  }
  return <img src={src} alt={title} className="project-img" />
}

function App() {
  const [lang, setLang] = useState('ja')
  const t = translations[lang]

  const projects = [
    {
      title: "Zenzai",
      tags: ["MITOH IT 2024", "NLP", "RESEARCH"],
      description: lang === 'ja'
        ? "ニューラル言語モデルを用いたパーソナライズ可能な日本語入力システム（未踏IT2024採択プロジェクト）。共著者としてNLP2025若手奨励賞を受賞。"
        : "Personalized Japanese input system using neural language models (MITOH IT 2024 project). Co-authored research received the NLP2025 Young Researcher Award.",
      link: "https://github.com/nyanko3141592/Zenzai",
      image: zenzaiImg
    },
    {
      title: "CoeFont Interpreter",
      tags: ["iOS", "VISION OS", "VOICE AI"],
      description: lang === 'ja'
        ? "リアルタイム音声翻訳サービスおよびそのiOS/iPadOSアプリケーション。"
        : "Real-time voice translation service and its iOS/iPadOS application.",
      link: "https://coefont.cloud/interpreter",
      image: null // Placeholder test
    },
    {
      title: "PaperSwipe",
      tags: ["iOS", "AI", "RESEARCH"],
      description: lang === 'ja'
        ? "論文版Tinder。AI翻訳を活用してarXivなどの論文をスワイプでチェック。"
        : "Tinder for academic papers. Swipe through arXiv papers with AI translation.",
      link: "https://github.com/nyanko3141592/PaperSwipe",
      image: paperswipeImg
    },
    {
      title: "Digital Hourglass",
      tags: ["HARDWARE", "CIRCUITS"],
      description: lang === 'ja'
        ? "LEDを用いたハードウェアおよびソフトウェアによる砂時計プロジェクト。"
        : "A hardware/software project involving an LED-based hourglass.",
      link: "#",
      image: hourglassImg
    }
  ]

  const socials = [
    { name: "X (Twitter)", url: "https://twitter.com/nya3_neko2", color: "var(--primary-color)" },
    { name: "GitHub", url: "https://github.com/nyanko3141592", color: "var(--secondary-color)" },
    { name: "Note", url: "https://note.com/electrical_cat", color: "var(--accent-color)" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/naoki-takahashi-143774225/", color: "var(--green)" }
  ]

  return (
    <div>
      <div className="lang-switcher">
        <button className="brutal-btn" onClick={() => setLang('ja')} style={{ padding: '0.2rem 0.5rem', background: lang === 'ja' ? 'var(--yellow)' : 'white', color: 'black' }}>JA</button>
        <button className="brutal-btn" onClick={() => setLang('en')} style={{ padding: '0.2rem 0.5rem', background: lang === 'en' ? 'var(--yellow)' : 'white', color: 'black' }}>EN</button>
      </div>

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
        {/* Engineering Bio Card */}
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
            <div className="brutal-card">
              <h3>{t.whoTitle}</h3>
              <p>{t.whoDesc}</p>
            </div>
            <div className="brutal-card">
              <h3>{t.profTitle}</h3>
              <p>{t.profDesc}</p>
            </div>
            <div className="brutal-card">
              <h3>{t.interestsTitle}</h3>
              <p>{t.interestsDesc}</p>
            </div>
          </div>
        </section>

        <section style={{ margin: '4rem 0' }}>
          <h2>{t.projectsTitle}</h2>
          <div className="grid">
            {projects.map((p, i) => (
              <div key={i} className="brutal-card">
                <div className="project-img-container">
                  <ProjectImage src={p.image} title={p.title} />
                </div>
                <div>
                  {p.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
                </div>
                <h3 style={{ marginTop: '1rem' }}>{p.title}</h3>
                <p style={{ marginBottom: '1.5rem', minHeight: '4.5rem' }}>{p.description}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t.viewProject}</a>
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
          <div className="brutal-card" style={{ borderStyle: 'dashed' }}>
            <p>{t.blogComing}</p>
            <div style={{ marginTop: '1rem' }}>
              <a href="https://note.com/electrical_cat" target="_blank" rel="noopener noreferrer" className="brutal-btn">{t.visitNote}</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-mono)' }}>{t.stayBrutal}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
