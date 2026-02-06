let curLang = 'en';
let curTheme = 'light';

const uiText = {
    en: {
        subtitle: "Discover your soul food & K-Pop twin!",
        startBtn: "Let's Eat! (Start)",
        options: ["Super Agree! 😍", "Agree 🙂", "Disagree 😕", "Super Disagree! 🙅‍♂️"]
    },
    tl: {
        subtitle: "Alamin ang iyong Soul Food at K-Pop Twin!",
        startBtn: "Tara Kain! (Simula)",
        options: ["Sobrang Agree! 😍", "Pwede 🙂", "Di masyado 😕", "Sobrang Hindi! 🙅‍♂️"]
    }
};

function toggleLang() {
    curLang = (curLang === 'en') ? 'tl' : 'en';
    document.getElementById('lang-btn').innerText = (curLang === 'en') ? '🇺🇸 Eng' : '🇵🇭 Tagalog';
    updateUIText();
}

function toggleTheme() {
    curTheme = (curTheme === 'light') ? 'dark' : 'light';
    document.body.setAttribute('data-theme', curTheme);
    document.getElementById('theme-btn').innerText = (curTheme === 'light') ? '🌙 Dark' : '☀️ Light';
}

function updateUIText() {
    const t = uiText[curLang];
    const subtitleEl = document.getElementById('subtitle-text');
    if (subtitleEl) subtitleEl.innerText = t.subtitle;

    const startBtnEl = document.getElementById('start-btn');
    if (startBtnEl) startBtnEl.innerText = t.startBtn;
}
