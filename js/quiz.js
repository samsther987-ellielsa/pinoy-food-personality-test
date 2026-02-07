const questionBank = {
    EI: [
        { en: "I feel energized when I'm at a party with many people.", tl: "Ganado ako pag nasa party na maraming tao.", invert: false },
        { en: "I usually start conversations first.", tl: "Ako madalas ang nauunang makipag-usap.", invert: false },
        { en: "I enjoy being alone more than going out.", tl: "Mas gusto kong mapag-isa kaysa lumabas.", invert: true },
        { en: "I prefer a small group of friends over a big crowd.", tl: "Mas gusto ko ang onting tropa kesa sa malaking barkada.", invert: true }
    ],
    SN: [
        { en: "I trust facts and experience more than theories.", tl: "Mas naniniwala ako sa experience kaysa sa theories.", invert: false },
        { en: "I focus on the present rather than the future.", tl: "Mas focus ako sa ngayon kaysa sa future.", invert: false },
        { en: "I often daydream and imagine 'what if'.", tl: "Madalas akong managinip ng gising.", invert: true },
        { en: "I love discussing abstract ideas and meanings.", tl: "Mahilig ako sa malalim na usapan.", invert: true }
    ],
    TF: [
        { en: "I follow logic more than my heart.", tl: "Mas sinusunod ko ang utak ko kaysa puso.", invert: false },
        { en: "Being honest is more important than not hurting feelings.", tl: "Mas okay nang prangka.", invert: false },
        { en: "I make decisions based on emotions.", tl: "Nagde-decide ako base sa nararamdaman.", invert: true },
        { en: "I prioritize harmony over being right.", tl: "Mas mahalaga sakin na walang away.", invert: true }
    ],
    JP: [
        { en: "I like to have a detailed plan before traveling.", tl: "Gusto ko may itinerary bago bumyahe.", invert: false },
        { en: "I finish work way before the deadline.", tl: "Tinatappos ko ang trabaho nang maaga.", invert: false },
        { en: "I am spontaneous and flexible.", tl: "Biglaan ang mga lakad ko at flexible ako.", invert: true },
        { en: "I work better under pressure at the last minute.", tl: "Mas magaling ako gumawa pag cramming.", invert: true }
    ]
};

let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
let qIndex = 0;
let activeQuestions = [];
let answerHistory = [];

window.onload = function() {
    scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    qIndex = 0;
    activeQuestions = [];
    answerHistory = [];

    ['EI', 'SN', 'TF', 'JP'].forEach(type => {
        const shuffled = [...questionBank[type]].sort(() => Math.random() - 0.5);
        activeQuestions.push(...shuffled.slice(0, 4));
    });

    activeQuestions.sort(() => Math.random() - 0.5);
    showQuestion();
};

function showQuestion() {
    let q = activeQuestions[qIndex];
    document.getElementById('q-counter').innerText = `Q${qIndex + 1} / 16`;
    document.getElementById('question-text').innerText = (curLang === 'en') ? q.en : q.tl;
    
    const opts = uiText[curLang].options;
    for(let i=0; i<4; i++) {
        document.getElementById(`opt-${i}`).innerText = opts[i];
    }
    
    let percent = (qIndex / 16) * 100;
    document.getElementById('progress').style.width = percent + "%";
    document.getElementById('back-btn').style.display = (qIndex > 0) ? 'flex' : 'none';
}

function nextQuestion(point) {
    let currentQuestion = activeQuestions[qIndex];
    answerHistory.push({ qIndex, point, invert: currentQuestion.invert });

    let typeChars = ['EI', 'SN', 'TF', 'JP'][Math.floor(qIndex / 4)].split('');
    let finalPoint = currentQuestion.invert ? -point : point;

    if (finalPoint > 0) scores[typeChars[0]] += Math.abs(finalPoint);
    else scores[typeChars[1]] += Math.abs(finalPoint);

    qIndex++;
    if (qIndex < 16) {
        showQuestion();
    } else {
        goToLoading();
    }
}

function prevQuestion() {
    if (qIndex > 0) {
        qIndex--;
        const lastAnswer = answerHistory.pop();
        
        let typeChars = ['EI', 'SN', 'TF', 'JP'][Math.floor(qIndex / 4)].split('');
        let finalPoint = lastAnswer.invert ? -lastAnswer.point : lastAnswer.point;

        if (finalPoint > 0) scores[typeChars[0]] -= Math.abs(finalPoint);
        else scores[typeChars[1]] -= Math.abs(finalPoint);

        showQuestion();
    }
}

function goToLoading() {
    const scoresJson = encodeURIComponent(JSON.stringify(scores));
    window.location.href = `loading.html?scores=${scoresJson}`;
}
