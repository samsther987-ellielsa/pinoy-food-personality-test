let curLang = 'en'; 
let curTheme = 'light';

const uiText = {
    en: {
        subtitle: "Discover your soul food & K-Pop twin!",
        startBtn: "Let's Eat! (Start)",
        options: ["Super Agree! 😍", "Agree 🙂", "Disagree 😕", "Super Disagree! 🙅‍♂️"],
        analyzing: "Analyzing your taste...",
        loadingSub: "Comparing with K-Pop Stars...",
        resultLabel: "YOUR SOUL FOOD",
        shareBtn: "Share Result 📤",
        retryBtn: "Try Again 🔄"
    },
    tl: {
        subtitle: "Alamin ang iyong Soul Food at K-Pop Twin!",
        startBtn: "Tara Kain! (Simula)",
        options: ["Sobrang Agree! 😍", "Pwede 🙂", "Di masyado 😕", "Sobrang Hindi! 🙅‍♂️"],
        analyzing: "Ina-analyze ang iyong personality...",
        loadingSub: "Hinahanap ang iyong K-Pop match...",
        resultLabel: "ANG SOUL FOOD MO AY",
        shareBtn: "I-share ang Resulta 📤",
        retryBtn: "Ulitin ang Quiz 🔄"
    }
};

function toggleLang() {
    curLang = (curLang === 'en') ? 'tl' : 'en';
    document.getElementById('lang-btn').innerText = (curLang === 'en') ? '🇺🇸 Eng' : '🇵🇭 Tagalog';
    
    // 즉시 업데이트
    updateUIText();
    
    // 퀴즈 화면이면 질문도 업데이트
    if (typeof showQuestion === 'function') {
        showQuestion();
    }
    
    // 결과 화면이면 결과도 업데이트
    if (typeof updateResultLang === 'function') {
        updateResultLang();
    }
}

function toggleTheme() {
    curTheme = (curTheme === 'light') ? 'dark' : 'light';
    document.body.setAttribute('data-theme', curTheme);
    document.getElementById('theme-btn').innerText = (curTheme === 'light') ? '🌙 Dark' : '☀️ Light';
}

function updateUIText() {
    const t = uiText[curLang];
    
    // 기본 요소들
    const subtitleEl = document.getElementById('subtitle-text');
    if (subtitleEl) subtitleEl.innerText = t.subtitle;
    
    const startBtnEl = document.getElementById('start-btn');
    if (startBtnEl) startBtnEl.innerText = t.startBtn;
    
    // 로딩 화면
    const analyzingEl = document.getElementById('analyzing-text');
    if (analyzingEl) analyzingEl.innerText = t.analyzing;
    
    const loadingSubEl = document.getElementById('loading-sub');
    if (loadingSubEl) loadingSubEl.innerText = t.loadingSub;
    
    // 결과 화면
    const resultLabelEl = document.getElementById('result-label');
    if (resultLabelEl) resultLabelEl.innerText = t.resultLabel;
    
    const shareBtnEl = document.getElementById('share-btn');
    if (shareBtnEl) shareBtnEl.innerText = t.shareBtn;
    
    const retryBtnEl = document.getElementById('retry-btn');
    if (retryBtnEl) retryBtnEl.innerText = t.retryBtn;
}

// 페이지 로드시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUIText);
} else {
    updateUIText();
}
