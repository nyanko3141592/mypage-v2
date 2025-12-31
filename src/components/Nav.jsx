import React from 'react';

const Nav = ({ lang, setLang }) => (
    <div className="lang-switcher">
        <button className="brutal-btn" onClick={() => setLang('ja')} style={{ padding: '0.2rem 0.5rem', background: lang === 'ja' ? 'var(--yellow)' : 'white', color: 'black' }}>JA</button>
        <button className="brutal-btn" onClick={() => setLang('en')} style={{ padding: '0.2rem 0.5rem', background: lang === 'en' ? 'var(--yellow)' : 'white', color: 'black' }}>EN</button>
    </div>
)

export default Nav;
