import zenzaiImg from '../assets/projects/zenzai.png'
import paperswipeImg from '../assets/projects/paperswipe.webp'
import azookeyImg from '../assets/projects/azookeyOnMacOS.png'
import coefontImg from '../assets/projects/coefont.avif'
import keyspecImg from '../assets/projects/keyspec_generator.jpeg'
import autoShakerImg from '../assets/projects/auto_shaker.png'
import opticalFlowImg from '../assets/projects/optical_flow.webp'
import hiroyukiImg from '../assets/projects/hiroyuki.webp'
import monakaImg from '../assets/projects/monaka.webp'
import hhkbImg from '../assets/projects/hhkb.webp'
import noteTakerImg from '../assets/projects/note-taker.webp'
import photo2textImg from '../assets/projects/photo2text.webp'
import menulensImg from '../assets/projects/menulens.webp'

export const allWorksData = [
    {
        id: "azookey-macos",
        title: "azooKey on macOS",
        category: "Software",
        tags: ["MITOH IT 2024", "IME", "Personalization"],
        descJa: "未踏IT人材育成事業の成果。macOS向けの個人最適化されたIMEで、賢い変換エンジンや「いい感じ変換」を搭載。",
        descEn: "Result of MITOH IT program. Personalized IME for macOS featuring a smart conversion engine and 'Good Feel' conversion.",
        image: azookeyImg,
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
        image: opticalFlowImg,
        twitterId: "1987771440914161770"
    },
    {
        id: "menu-finder",
        title: "Menu Photo Search",
        category: "Software",
        tags: ["SNS", "AI", "Frontend"],
        descJa: "飲食店等のメニューを撮ると、各料理の写真を自動補完して表示する。SNSで話題に。",
        descEn: "Automatically complements and displays food photos when menu images are captured. Went viral on social media.",
        image: menulensImg,
        twitterId: "1917039386258247815"
    },

    {
        id: "keyspec-gen",
        title: "KeySpec Generator",
        category: "Software",
        tags: ["Keyboards", "Generator", "React"],
        descJa: "自作キーボードのスペックを綺麗に表示・生成できるウェブサイト。",
        descEn: "A website for generating and beautifully displaying custom keyboard specifications.",
        image: keyspecImg,
        twitterId: "1994649692265976259"
    },
    {
        id: "filetree",
        title: "filetree",
        category: "Software",
        tags: ["TUI", "Rust", "Vim"],
        descJa: "Vimキーバインドを持つ高速で軽量なファイルエクスプローラーTUI。",
        descEn: "A fast, lightweight file explorer TUI with Vim keybindings.",
        image: null,
        twitterId: null,
        url: null,
        githubUrl: "https://github.com/nyanko3141592/filetree"
    },
    {
        id: "auto-shaker",
        title: "Auto Shaker",
        category: "Hardware",
        tags: ["Protocols", "Electronics"],
        descJa: "プロテイン等を自動で混ぜる、実用的な自作ハードウェア。",
        descEn: "A practical custom hardware device for automatically shaking protein and other beverages.",
        image: autoShakerImg,
        twitterId: null
    },
    {
        id: "hhkb-keycaps",
        title: "HHKB Custom Keycaps",
        category: "Hardware",
        tags: ["HHKB", "Eng-Layout", "Custom"],
        descJa: "HHKB日本語配列を英語配列感覚で使用するためのカスタムキーキャップ。",
        descEn: "Custom keycaps for using HHKB Japanese layout with an English layout feel.",
        image: hhkbImg,
        twitterId: "1897174600175518045"
    },
    {
        id: "monaka-keyboard",
        title: "Monaka Keyboard",
        category: "Hardware",
        tags: ["Keyboards", "Split", "Custom"],
        descJa: "チョコモナカジャンボサイズのモナカキーボード。2つで分割キーボードとして利用可能。",
        descEn: "Choco Monaka Jumbo-sized monaka keyboard. Can be used as a split keyboard with two units.",
        image: monakaImg,
        twitterId: "1828667479348146179"
    },
    {
        id: "coefont-interpreter",
        title: "CoeFont Interpreter",
        category: "Software",
        tags: ["Voice AI", "Real-time", "Business"],
        descJa: "リアルタイムでAI音声通訳を行うサービス。",
        descEn: "Real-time AI voice translation service.",
        image: coefontImg,
        twitterId: null,
        url: "https://www.businessinsider.jp/article/2510-coefont-live-interpretation-start-up/"
    },
    {
        id: "textbook-scan",
        title: "Textbook Scanner",
        category: "Software",
        tags: ["iOS", "LLM", "Structure"],
        descJa: "撮影した教科書の内容を、LLMが扱いやすい構造化テキストに変換するカメラアプリ。",
        descEn: "Camera app that converts captured textbook content into structured text optimized for LLMs.",
        image: photo2textImg,
        twitterId: "1940724006417846692"
    },
    {
        id: "noise-detector-web",
        title: "Noise Detector Web",
        category: "Software",
        tags: ["Web", "AI", "Image Processing"],
        descJa: "画像の隠れたノイズやアーティファクトを検出・可視化するWebツール。",
        descEn: "Web tool for detecting and visualizing hidden noise and artifacts in images.",
        image: null,
        twitterId: null,
        url: "https://noise-detector.pages.dev",
        githubUrl: "https://github.com/nyanko3141592/noise-detector-web"
    },
    {
        id: "x-vertical-picture",
        title: "XVerticalPicture",
        category: "Software",
        tags: ["Web", "Social Media", "Image Processing"],
        descJa: "X(Twitter)で縦長画像を4枚投稿するための画像分割ツール。",
        descEn: "Image splitting tool for posting vertical images in 4 parts on X(Twitter).",
        image: null,
        twitterId: null,
        url: "https://x-vertical-picture.pages.dev",
        githubUrl: "https://github.com/nyanko3141592/XVerticalPicture"
    },
    {
        id: "ccperm",
        title: "CCPerm",
        category: "Software",
        tags: ["TUI", "Rust", "Developer Tools"],
        descJa: "Claude Codeの権限設定を管理するTUIビューアー/エディター。",
        descEn: "TUI viewer/editor for Claude Code permission settings.",
        image: null,
        twitterId: null,
        url: null,
        githubUrl: "https://github.com/nyanko3141592/ccperm"
    },
    {
        id: "obsidian-tui",
        title: "ObsidianTUI",
        category: "Software",
        tags: ["TUI", "Go", "Note-taking"],
        descJa: "Obsidian vault用TUIクライアント。グラフビュー、タグ、バックリンク等をサポート。",
        descEn: "TUI client for Obsidian vaults. Supports graph view, tags, backlinks, and more.",
        image: null,
        twitterId: null,
        url: null,
        githubUrl: "https://github.com/nyanko3141592/ObsidianTUI"
    },
    {
        id: "auto-notetaker",
        title: "Auto Note-taker",
        category: "Software",
        tags: ["Mathematics", "Digitalization", "OCR"],
        descJa: "数学等の講義で、板書内容を効率的にデジタル化・記録するための自作用ツール。",
        descEn: "A custom tool for efficiently digitalizing and recording lecture notes, especially for mathematics.",
        image: noteTakerImg,
        twitterId: "2002267317816996287"
    },
    {
        id: "oshaberi-hiroyuki",
        title: "おしゃべりひろゆきメーカー",
        category: "Software",
        tags: ["CoeFont", "AI", "Viral"],
        descJa: "ひろゆき氏のAI音声で好きな言葉を喋らせることができるジェネレーター。CoeFontの技術を活用。",
        descEn: "A generator that lets you make Hiroyuki's AI voice say anything. Powered by CoeFont technology.",
        image: hiroyukiImg,
        twitterId: null,
        url: "http://coefont.cloud/maker/hiroyuki"
    },
    {
        id: "quick-calendar",
        title: "QuickCalendar",
        category: "Software",
        tags: ["iOS", "Productivity"],
        descJa: "素早く予定を入力・確認できるiOSカレンダーアプリ。",
        descEn: "iOS calendar app for quick schedule entry and viewing.",
        image: null,
        twitterId: null,
        url: "https://apps.apple.com/jp/app/quickcalendar/id6739865507",
        githubUrl: "https://github.com/nyanko3141592/QuickCalendar"
    },
    {
        id: "easy-screen-record",
        title: "EasyScreenRecord",
        category: "Software",
        tags: ["macOS", "Screen Recording", "Utility"],
        descJa: "スマートズーム機能を備えたmacOS画面録画アプリ。",
        descEn: "macOS screen recording app with Smart Zoom feature.",
        image: null,
        twitterId: null,
        url: "https://nyanko3141592.github.io/EasyScreenRecord",
        githubUrl: "https://github.com/nyanko3141592/EasyScreenRecord"
    },
    {
        id: "digital-hourglass",
        title: "DigitalHourglass",
        category: "Software",
        tags: ["iOS", "Utility"],
        descJa: "デジタル砂時計アプリ。",
        descEn: "Digital hourglass app for iOS.",
        image: null,
        twitterId: "1798648437732479397",
        url: "https://apps.apple.com/us/app/digitalhourglass/id6642703958",
        githubUrl: "https://github.com/nyanko3141592/DigitalHourglass"
    },
    {
        id: "shukatsu-pocket",
        title: "就活ポケット",
        category: "Software",
        tags: ["iOS", "Job Hunting"],
        descJa: "就職活動のスケジュールやメモを管理するアプリ。",
        descEn: "App for managing job hunting schedules and notes.",
        image: null,
        twitterId: null,
        url: "https://apps.apple.com/us/app/%E5%B0%B1%E6%B4%BB%E3%83%9D%E3%82%B1%E3%83%83%E3%83%88/id6599845519"
    },
    {
        id: "aistylist",
        title: "AiStylist",
        category: "Software",
        tags: ["AI", "Media"],
        descJa: "ニュースも日常も、私らしい視点で。",
        descEn: "News and daily life from a personal perspective.",
        image: null,
        twitterId: null,
        url: "https://play.google.com/store/apps/details?id=com.shunsukeshoji.aistyllist_android&hl=ja"
    }
]
