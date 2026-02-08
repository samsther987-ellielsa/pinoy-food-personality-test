const questionBank = {
    EI: [
        { en: "I feel energized when I'm at a party with many people.", tl: "Ganado ako pag nasa party na maraming tao.", invert: false },
        { en: "I usually start conversations first.", tl: "Ako madalas ang nauunang makipag-usap.", invert: false },
        { en: "I enjoy being alone more than going out.", tl: "Mas gusto kong mapag-isa kaysa lumabas.", invert: true },
        { en: "I prefer a small group of friends over a big crowd.", tl: "Mas gusto ko ang onting tropa kesa sa malaking barkada.", invert: true },
        { en: "I'm the first one to introduce myself in new situations.", tl: "Ako palagi ang una na mag-introduce sa bagong lugar.", invert: false },
        { en: "I need alone time to recharge after socializing.", tl: "Kailangan ko ng alone time after makipag-socialize.", invert: true },
        { en: "I make friends easily wherever I go.", tl: "Madali akong makakuha ng kaibigan kahit saan.", invert: false },
        { en: "I prefer texting over calling.", tl: "Mas gusto ko mag-text kaysa tumawag.", invert: true },
        { en: "I love being the center of attention.", tl: "Gusto ko na attention sa akin.", invert: false },
        { en: "Group activities drain my energy.", tl: "Ang group activities ay nakaka-drain sa akin.", invert: true },
        { en: "I talk to strangers without hesitation.", tl: "Nakikipag-usap ako sa strangers walang hesitation.", invert: false },
        { en: "I think deeply before speaking.", tl: "Malalim ang iniisip ko bago magsalita.", invert: true }
    ],

    SN: [
        { en: "I trust facts and experience more than theories.", tl: "Mas naniniwala ako sa experience kaysa sa theories.", invert: false },
        { en: "I focus on the present rather than the future.", tl: "Mas focus ako sa ngayon kaysa sa future.", invert: false },
        { en: "I often daydream and imagine 'what if'.", tl: "Madalas akong managinip ng gising.", invert: true },
        { en: "I love discussing abstract ideas and meanings.", tl: "Mahilig ako sa malalim na usapan.", invert: true },
        { en: "I prefer detailed, step-by-step instructions.", tl: "Gusto ko ng detalyado at step-by-step na instructions.", invert: false },
        { en: "I see patterns and connections others miss.", tl: "Nakikita ko ang patterns na hindi nakikita ng iba.", invert: true },
        { en: "I trust what I can see, hear, and touch.", tl: "Naniniwala ako sa nakikita, naririnig, at nahihipong ko.", invert: false },
        { en: "I think about future possibilities more than current reality.", tl: "Iniisip ko ang future possibilities kaysa current reality.", invert: true },
        { en: "I'm very practical and realistic.", tl: "Praktikal at realistic ako.", invert: false },
        { en: "I love exploring new theories and concepts.", tl: "Mahilig ako mag-explore ng bagong theories at concepts.", invert: true },
        { en: "I rely on proven methods over experimental ones.", tl: "Umaasa ako sa proven methods kaysa experimental.", invert: false },
        { en: "I'm always thinking about what could be, not what is.", tl: "Palagi kong iniisip ang 'what could be' hindi 'what is'.", invert: true }
    ],

    TF: [
        { en: "I follow logic more than my heart.", tl: "Mas sinusunod ko ang utak ko kaysa puso.", invert: false },
        { en: "Being honest is more important than not hurting feelings.", tl: "Mas okay nang prangka.", invert: false },
        { en: "I make decisions based on emotions.", tl: "Nagde-decide ako base sa nararamdaman.", invert: true },
        { en: "I prioritize harmony over being right.", tl: "Mas mahalaga sakin na walang away.", invert: true },
        { en: "I analyze situations objectively, not emotionally.", tl: "Nag-aanalyze ako objectively, hindi emotionally.", invert: false },
        { en: "I can easily sense when someone is upset.", tl: "Ramdam ko agad pag may upset na tao.", invert: true },
        { en: "I value truth over tact.", tl: "Mas mahalaga sakin ang truth kaysa tact.", invert: false },
        { en: "I avoid conflict to maintain relationships.", tl: "Iniiwasan ko ang conflict para sa relationships.", invert: true },
        { en: "I'm often called 'too blunt' or 'too direct'.", tl: "Madalas akong tawagin na 'too blunt' o 'direkta'.", invert: false },
        { en: "I make decisions based on how others will feel.", tl: "Nagde-decide ako base sa nararamdaman ng iba.", invert: true },
        { en: "Efficiency matters more than feelings.", tl: "Mas mahalaga ang efficiency kaysa feelings.", invert: false },
        { en: "I cry easily during movies or emotional moments.", tl: "Madali akong umiyak sa movies o emotional moments.", invert: true }
    ],

    JP: [
        { en: "I like to have a detailed plan before traveling.", tl: "Gusto ko may itinerary bago bumyahe.", invert: false },
        { en: "I finish work way before the deadline.", tl: "Tinatappos ko ang trabaho nang maaga.", invert: false },
        { en: "I am spontaneous and flexible.", tl: "Biglaan ang mga lakad ko at flexible ako.", invert: true },
        { en: "I work better under pressure at the last minute.", tl: "Mas magaling ako gumawa pag cramming.", invert: true },
        { en: "I keep my workspace clean and organized.", tl: "Laging maayos ang workspace ko.", invert: false },
        { en: "I prefer to keep my options open.", tl: "Gusto ko open ang options ko.", invert: true },
        { en: "I make to-do lists and follow them strictly.", tl: "Gumagawa ako ng to-do list at sinusunod ko strictly.", invert: false },
        { en: "I change plans frequently at the last moment.", tl: "Madalas akong magbago ng plans last moment.", invert: true },
        { en: "I feel uncomfortable with unfinished tasks.", tl: "Uncomfortable ako pag may unfinished tasks.", invert: false },
        { en: "I enjoy going with the flow and seeing what happens.", tl: "Enjoy ko ang go with the flow at tingnan kung ano mangyayari.", invert: true },
        { en: "I plan my day in advance.", tl: "Pinapaplano ko ang araw ko in advance.", invert: false },
        { en: "I thrive in unpredictable environments.", tl: "Okay ako sa unpredictable environments.", invert: true }
    ]
};

let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
let qIndex = 0;
let activeQuestions = [];
let answerHistory = [];

// 최적화: 페이지 로드 후 천천히 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    setTimeout(initQuiz, 100); // 100ms 딜레이
}

function initQuiz() {
    scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    qIndex = 0;
    activeQuestions = [];
    answerHistory = [];

    // 질문 선택 (requestAnimationFrame으로 부드럽게)
    requestAnimationFrame(() => {
        ['EI', 'SN', 'TF', 'JP'].forEach(type => {
            const shuffled = [...questionBank[type]].sort(() => Math.random() - 0.5);
            activeQuestions.push(...shuffled.slice(0, 4));
        });

        activeQuestions.sort(() => Math.random() - 0.5);
        showQuestion();
    });
}

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

    let questionType = '';
    for (let type in questionBank) {
        if (questionBank[type].includes(currentQuestion)) {
            questionType = type;
            break;
        }
    }

    let typeChars = questionType.split('');
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

        let currentQuestion = activeQuestions[qIndex];
        let questionType = '';
        for (let type in questionBank) {
            if (questionBank[type].includes(currentQuestion)) {
                questionType = type;
                break;
            }
        }

        let typeChars = questionType.split('');
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
