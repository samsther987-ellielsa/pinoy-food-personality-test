let curLang = 'en'; 
let curTheme = 'light';

const uiText = {
    en: {
        subtitle: "Discover your MBTI, Filipino soul food & K-Pop twin!",
        startBtn: "Start the MBTI Test",
        options: ["Super Agree! 😍", "Agree 🙂", "Disagree 😕", "Super Disagree! 🙅‍♂️"],
        analyzing: "Analyzing your taste...",
        loadingSub: "Comparing with K-Pop Stars...",
        resultLabel: "YOUR SOUL FOOD",
        shareBtn: "Share Result 📤",
        retryBtn: "Try Again 🔄"
    },
    tl: {
        subtitle: "Alamin ang iyong MBTI, Filipino Soul Food at K-Pop Twin!",
        startBtn: "Simulan ang MBTI Test",
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
    document.documentElement.lang = curLang;
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.hidden = el.dataset.lang !== curLang;
    });
    document.querySelectorAll('[data-en][data-tl]').forEach(el => {
        el.textContent = el.dataset[curLang];
    });
    
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

// Optional analytics is loaded only after an explicit choice. Advertising is disabled.
function initPrivacyChoices() {
    const analyticsId = 'G-2SJWW8WS8Y';
    const storageKey = 'pinoy-analytics-consent';
    let choice;
    try { choice = localStorage.getItem(storageKey); } catch { /* No persistent preference when storage is unavailable. */ }
    window['ga-disable-' + analyticsId] = choice !== 'granted';

    const controls = document.createElement('details');
    controls.className = 'privacy-choices';
    controls.innerHTML = `
        <summary data-en="Privacy choices" data-tl="Mga pagpipilian sa privacy">Privacy choices</summary>
        <p data-en="Optional Google Analytics helps us understand visits. It stays off until you allow it. Your quiz works either way. You can change this choice here at any time."
           data-tl="Nakakatulong ang opsyonal na Google Analytics para maunawaan ang mga pagbisita. Hindi ito gagana hangga't hindi mo pinapayagan. Gagana pa rin ang quiz sa alinmang pagpili. Maaari mong baguhin ang pagpili rito anumang oras.">Optional Google Analytics helps us understand visits. It stays off until you allow it. Your quiz works either way. You can change this choice here at any time.</p>
        <p class="privacy-status" role="status"></p>
        <div class="privacy-actions">
            <button type="button" data-choice="denied" data-en="Keep analytics off" data-tl="Huwag payagan ang analytics">Keep analytics off</button>
            <button type="button" data-choice="granted" data-en="Allow analytics" data-tl="Payagan ang analytics">Allow analytics</button>
        </div>`;
    document.body.appendChild(controls);

    function applyChoice(next) {
        choice = next;
        const allowed = next === 'granted';
        window['ga-disable-' + analyticsId] = !allowed;
        if (allowed || window.gtag) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
            window.gtag('consent', window.__pinoyAnalyticsLoaded ? 'update' : 'default', {
                analytics_storage: allowed ? 'granted' : 'denied',
                ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
            });
        }
        if (allowed && !window.__pinoyAnalyticsLoaded) {
            window.__pinoyAnalyticsLoaded = true;
            window.gtag('js', new Date());
            window.gtag('config', analyticsId, { allow_google_signals: false, allow_ad_personalization_signals: false });
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
            document.head.appendChild(script);
        }
        if (!allowed) {
            // Remove first-party GA cookies as well as disabling subsequent measurement.
            document.cookie.split(';').forEach(cookie => {
                const name = cookie.split('=')[0].trim();
                if (!/^_ga(?:_|$)/.test(name)) return;
                for (const domain of ['', location.hostname, '.' + location.hostname]) {
                    document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
                }
            });
        }
        const status = controls.querySelector('.privacy-status');
        status.dataset.en = allowed ? 'Analytics is on.' : 'Analytics is off.';
        status.dataset.tl = allowed ? 'Naka-on ang analytics.' : 'Naka-off ang analytics.';
        status.textContent = status.dataset[curLang];
    }
    controls.querySelectorAll('[data-choice]').forEach(button => {
        button.addEventListener('click', () => {
            try { localStorage.setItem(storageKey, button.dataset.choice); } catch { /* This choice still applies to the current page. */ }
            applyChoice(button.dataset.choice);
        });
    });
    applyChoice(choice === 'granted' ? 'granted' : 'denied');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrivacyChoices);
} else {
    initPrivacyChoices();
}

// 페이지 로드시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUIText);
} else {
    updateUIText();
}

// MBTI 페이지 언어 전환
if (typeof updateMBTILang === 'function') {
    const originalToggleLang2 = toggleLang;
    toggleLang = function() {
        originalToggleLang2();
        updateMBTILang();
    };
}
