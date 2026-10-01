const urlParams = new URLSearchParams(window.location.search);
let scores;
try { scores = JSON.parse(urlParams.get('scores') || 'null'); } catch { scores = null; }
if (!scores || !['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].every(key =>
    Number.isInteger(scores[key]) && scores[key] >= 0 && scores[key] <= 12)) {
    scores = null;
    window.location.replace('quiz.html');
}

const loadingMessages = {
    en: [
        "🍽️ Tasting your personality...",
        "🧠 Analyzing your food preferences...",
        "🎤 Finding your K-Pop soulmate...",
        "✨ Mixing the perfect recipe...",
        "🎯 Finalizing your soul food..."
    ],
    tl: [
        "🍽️ Tini-test ang personality mo...",
        "🧠 Ina-analyze ang food preferences mo...",
        "🎤 Hinahanap ang K-Pop match mo...",
        "✨ Ginagawa ang perfect recipe...",
        "🎯 Finalizing ang soul food mo..."
    ]
};

let currentLang = curLang || 'en';
let percent = 0;
let messageIndex = 0;

function startLoading() {
    if (!scores) return;
    const percentEl = document.getElementById('percentage');
    const fillEl = document.getElementById('loader-fill');
    const messageEl = document.getElementById('loading-messages');
    const messages = loadingMessages[currentLang];
    
    const duration = 3000;
    const steps = 100;
    const interval = duration / steps;
    
    const loadingInterval = setInterval(() => {
        percent++;
        percentEl.innerText = percent + "%";
        fillEl.style.width = percent + "%";
        
        if (percent === 20 || percent === 40 || percent === 60 || percent === 80) {
            messageIndex++;
            if (messageIndex < messages.length) {
                messageEl.innerText = messages[messageIndex];
                messageEl.style.animation = 'fadeIn 0.5s ease-out';
            }
        }
        
        if (percent >= 100) {
            clearInterval(loadingInterval);
            
            let mbti = "";
            mbti += (scores.E >= scores.I) ? "E" : "I";
            mbti += (scores.S >= scores.N) ? "S" : "N";
            mbti += (scores.T >= scores.F) ? "T" : "F";
            mbti += (scores.J >= scores.P) ? "J" : "P";
            
            // 결과 저장
            try {
                localStorage.setItem('lastMBTI', mbti);
                localStorage.setItem('lastTestDate', new Date().toISOString());
            } catch { /* The quiz still completes when browser storage is unavailable. */ }

            setTimeout(() => {
                window.location.href = `results/${mbti.toLowerCase()}.html`;
            }, 500);
        }
    }, interval);
}

window.onload = function() {
    const messageEl = document.getElementById('loading-messages');
    messageEl.innerText = loadingMessages[currentLang][0];
    startLoading();
};
