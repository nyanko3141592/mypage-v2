import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import profileIcon from './assets/icon.svg'
import zenzaiImg from './assets/projects/zenzai.png'
import paperswipeImg from './assets/projects/paperswipe.webp'
import hourglassImg from './assets/projects/hourglass.jpeg'

const translations = {
  ja: {
    back: "戻る",
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
    viewProject: "詳細を見る",
    allWorks: "全作品を見る",
    connect: "繋がる",
    blogTitle: "ブログ",
    blogComing: "準備中... (現在はNoteで発信しています)",
    visitNote: "Note.comを訪ねる",
    stayBrutal: "© 2025 NAOKI TAKAHASHI. STAY BRUTAL.",
    worksTitle: "作品一覧",
    worksSubtitle: "ソフトウェア、ハードウェア、そして研究の軌跡",
    close: "閉じる"
  },
  en: {
    back: "Back",
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
    viewProject: "View Detail",
    allWorks: "View All Works",
    connect: "Connect",
    blogTitle: "Blog",
    blogComing: "Coming soon... (Currently posting on Note)",
    visitNote: "Visit Note.com",
    stayBrutal: "© 2025 NAOKI TAKAHASHI. STAY BRUTAL.",
    worksTitle: "Works",
    worksSubtitle: "Software, Hardware, and Research Journey",
    close: "Close"
  }
}

const allWorksData = [
  {
    id: "azookey-macos",
    title: "azooKey on macOS",
    category: "Software",
    tags: ["MITOH IT 2024", "IME", "Personalization"],
    descJa: "未踏IT人材育成事業の成果。macOS向けの個人最適化されたIMEで、賢い変換エンジンや「いい感じ変換」を搭載。",
    descEn: "Result of MITOH IT program. Personalized IME for macOS featuring a smart conversion engine and 'Good Feel' conversion.",
    image: "https://assets.st-note.com/img/1767062871-krgH94TYvLqxzjoSE1eif7Bw.png?width=1200",
    twitterId: "1891025933802361228"
  },
  {
    id: "zenzai",
    title: "Zenzai",
    category: "Research",
    tags: ["NLP2025", "Neural Network"],
    descJa: "ニューラルかな漢字変換システム。言語処理学会(NLP2025)にて共著で若手奨励賞を受賞。",
    descEn: "Neural Kana-Kanji conversion system. Co-authored research received the Young Researcher Award at NLP2025.",
    image: zenzaiImg,
    twitterId: null
  },
  {
    id: "paperswipe",
    title: "PaperSwipe",
    category: "Software",
    tags: ["iOS", "AI", "arXiv"],
    descJa: "arXivなどの新着論文をTinder形式でスワイプしてチェックできるiOSアプリ。App Storeストーリーにも掲載。",
    descEn: "Tinder-style iOS app for swiping through new research papers. Featured on App Store Story.",
    image: paperswipeImg,
    twitterId: "1937473208443371919"
  },
  {
    id: "iphone-mouse",
    title: "iPhone Optical Mouse",
    category: "Software",
    tags: ["iOS", "Camera", "Utility"],
    descJa: "iPhoneのカメラを活用し、デバイス自体を光学マウスとして動作させるアプリ。",
    descEn: "An app that turns your iPhone into an optical mouse using its camera.",
    image: null,
    twitterId: "1987771440914161770"
  },
  {
    id: "menu-finder",
    title: "Menu Photo Search",
    category: "Software",
    tags: ["SNS", "AI", "Frontend"],
    descJa: "飲食店等のメニューを撮ると、各料理の写真を自動補完して表示する。SNSで話題に。",
    descEn: "Automatically complements and displays food photos when menu images are captured. Went viral on social media.",
    image: null,
    twitterId: "1917039386258247815"
  },
  {
    id: "keyspec-gen",
    title: "KeySpec Generator",
    category: "Software",
    tags: ["Keyboards", "Generator", "React"],
    descJa: "自作キーボードのスペックを綺麗に表示・生成できるウェブサイト。",
    descEn: "A website for generating and beautifully displaying custom keyboard specifications.",
    image: null,
    twitterId: "1994649692265976259"
  },
  {
    id: "auto-shaker",
    title: "Auto Shaker",
    category: "Hardware",
    tags: ["Protocols", "Electronics"],
    descJa: "プロテイン等を自動で混ぜる、実用的な自作ハードウェア。",
    descEn: "A practical custom hardware device for automatically shaking protein and other beverages.",
    image: null,
    twitterId: null
  },
  {
    id: "hhkb-keycaps",
    title: "HHKB Custom Keycaps",
    category: "Hardware",
    tags: ["HHKB", "Eng-Layout", "Custom"],
    descJa: "HHKB日本語配列を英語配列感覚で使用するためのカスタムキーキャップ。",
    descEn: "Custom keycaps for using HHKB Japanese layout with an English layout feel.",
    image: null,
    twitterId: "1897174600175518045"
  },
  {
    id: "coefont-interpreter",
    title: "CoeFont Interpreter",
    category: "Software",
    tags: ["Voice AI", "Real-time", "Business"],
    descJa: "リアルタイムでAI音声通訳を行うサービス。開発およびPresidentとして主導。",
    descEn: "Real-time AI voice translation service. Led development as President.",
    image: "https://assets.st-note.com/img/1767060845-ka4ImKExWUuFHqsjTGb3YvS2.png?width=1200",
    twitterId: null
  },
  {
    id: "textbook-scan",
    title: "Textbook Scanner",
    category: "Software",
    tags: ["iOS", "LLM", "Structure"],
    descJa: "撮影した教科書の内容を、LLMが扱いやすい構造化テキストに変換するカメラアプリ。",
    descEn: "Camera app that converts captured textbook content into structured text optimized for LLMs.",
    image: null,
    twitterId: null
  },
  {
    id: "auto-notetaker",
    title: "Auto Note-taker",
    category: "Software",
    tags: ["Mathematics", "Digitalization", "OCR"],
    descJa: "数学等の講義で、板書内容を効率的にデジタル化・記録するための自作用ツール。",
    descEn: "A custom tool for efficiently digitalizing and recording lecture notes, especially for mathematics.",
    image: null,
    twitterId: "2001091428571865400"
  }
]

const TwitterEmbed = ({ tweetId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.head.appendChild(script);
  }, [tweetId]);

  return (
    <div className="twitter-embed-container">
      <blockquote className="twitter-tweet" data-lang="ja">
        <a href={`https://twitter.com/nya3_neko2/status/${tweetId}`}>Loading tweet...</a>
      </blockquote>
    </div>
  );
};

const ProjectModal = ({ work, lang, t, onClose }) => {
  if (!work) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>{t.close} [X]</button>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{work.title}</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="brutal-tag" style={{ background: 'black', color: 'white' }}>{work.category}</span>
          {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
        </div>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          {lang === 'ja' ? work.descJa : work.descEn}
        </p>
        {work.twitterId && <TwitterEmbed tweetId={work.twitterId} />}
        {!work.twitterId && work.image && (
          <img src={work.image} alt={work.title} style={{ width: '100%', border: '4px solid black', marginTop: '1rem' }} />
        )}
      </div>
    </div>
  );
};

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

const Nav = ({ lang, setLang }) => (
  <div className="lang-switcher">
    <button className="brutal-btn" onClick={() => setLang('ja')} style={{ padding: '0.2rem 0.5rem', background: lang === 'ja' ? 'var(--yellow)' : 'white', color: 'black' }}>JA</button>
    <button className="brutal-btn" onClick={() => setLang('en')} style={{ padding: '0.2rem 0.5rem', background: lang === 'en' ? 'var(--yellow)' : 'white', color: 'black' }}>EN</button>
  </div>
)

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
          <div className="brutal-card" style={{ borderStyle: 'dashed' }}>
            <p>{t.blogComing}</p>
            <div style={{ marginTop: '1rem' }}><a href="https://note.com/electrical_cat" target="_blank" rel="noopener noreferrer" className="brutal-btn">{t.visitNote}</a></div>
          </div>
        </section>
      </main>
    </div>
  )
}

function WorksPage({ lang, t, onWorkClick }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Software', 'Hardware', 'Research']
  const filteredWorks = filter === 'All' ? allWorksData : allWorksData.filter(w => w.category === filter)
  return (
    <div className="container" style={{ paddingTop: '5rem' }}>
      <Link to="/" className="brutal-btn" style={{ marginBottom: '2rem' }}>← {t.back}</Link>
      <h1 style={{ fontSize: '3.5rem' }}>{t.worksTitle}</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>{t.worksSubtitle}</p>
      <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} className="brutal-btn" onClick={() => setFilter(cat)} style={{ background: filter === cat ? 'var(--yellow)' : 'white', color: 'black', padding: '0.5rem 1rem' }}>{cat}</button>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {filteredWorks.map((work) => (
          <div key={work.id} className="brutal-card" onClick={() => onWorkClick(work)}>
            <div className="project-img-container"><ProjectImage src={work.image} title={work.title} /></div>
            <div>
              <span className="brutal-tag" style={{ background: 'black', color: 'white' }}>{work.category}</span>
              {work.tags.map(tag => <span key={tag} className="brutal-tag">{tag}</span>)}
            </div>
            <h3 style={{ marginTop: '1rem' }}>{work.title}</h3>
            <p style={{ marginBottom: '1.5rem', minHeight: '4.5rem' }}>{lang === 'ja' ? work.descJa : work.descEn}</p>
            <button className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t.viewProject}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('ja')
  const [selectedWork, setSelectedWork] = useState(null)
  const t = translations[lang]

  return (
    <Router>
      <Nav lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
        <Route path="/works" element={<WorksPage lang={lang} t={t} onWorkClick={setSelectedWork} />} />
      </Routes>
      <ProjectModal work={selectedWork} lang={lang} t={t} onClose={() => setSelectedWork(null)} />
      <footer style={{ marginTop: '4rem' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-mono)' }}>{t.stayBrutal}</p>
        </div>
      </footer>
    </Router>
  )
}

export default App
