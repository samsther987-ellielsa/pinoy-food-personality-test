const mbtiText = {
    en: {
        title: "About MBTI",
        intro: "The Myers-Briggs Type Indicator (MBTI) is a self-report personality assessment developed by Katharine Cook Briggs and her daughter Isabel Briggs Myers, based on Carl Jung's theory of psychological types. It categorizes individuals into 16 personality types through four dichotomies: Extraversion (E) vs. Introversion (I), Sensing (S) vs. Intuition (N), Thinking (T) vs. Feeling (F), and Judging (J) vs. Perceiving (P).",
        componentsTitle: "Core Components",
        featuresTitle: "Key Features & Applications",
        selfUnderstanding: "Self-Understanding & Communication:",
        selfText: "Helps understand your own tendencies and appreciate differences in others for better communication.",
        applications: "Applications:",
        appText: "Used in career counseling, relationships, team building, and personal development.",
        limitations: "Limitations:",
        limitText: "As a self-report test, results depend on honest responses. Some critics question its scientific validity.",
        typesTitle: "16 Personality Types",
        backHome: "Back to Test 🍛"
    },
    tl: {
        title: "Tungkol sa MBTI",
        intro: "Ang Myers-Briggs Type Indicator (MBTI) ay isang self-report personality test na ginawa ni Katharine Cook Briggs at ng kanyang anak na si Isabel Briggs Myers, batay sa teorya ng psychological types ni Carl Jung. Kinaklasipika nito ang mga tao sa 16 personality types gamit ang apat na dikotomiya: Extraversion (E) vs. Introversion (I), Sensing (S) vs. Intuition (N), Thinking (T) vs. Feeling (F), at Judging (J) vs. Perceiving (P).",
        componentsTitle: "Mga Pangunahing Bahagi",
        featuresTitle: "Mga Tampok at Paggamit",
        selfUnderstanding: "Pag-unawa sa Sarili at Komunikasyon:",
        selfText: "Nakakatulong na maintindihan ang iyong sariling ugali at pahalagahan ang pagkakaiba ng iba para sa mas mahusay na komunikasyon.",
        applications: "Mga Paggamit:",
        appText: "Ginagamit sa career counseling, relasyon, team building, at personal development.",
        limitations: "Mga Limitasyon:",
        limitText: "Bilang self-report test, nakadepende ang resulta sa tapat na pagsagot. May ilang kritiko na nagtatanong sa scientific validity nito.",
        typesTitle: "16 Personality Types",
        backHome: "Balik sa Test 🍛"
    }
};

function updateMBTILang() {
    const t = mbtiText[curLang];
    document.getElementById('mbti-title').innerText = t.title;
    document.getElementById('intro').innerText = t.intro;
    document.getElementById('components-title').innerText = t.componentsTitle;
    document.getElementById('features-title').innerText = t.featuresTitle;
    document.getElementById('self-understanding').innerText = t.selfUnderstanding;
    document.getElementById('self-text').innerText = t.selfText;
    document.getElementById('applications').innerText = t.applications;
    document.getElementById('app-text').innerText = t.appText;
    document.getElementById('limitations').innerText = t.limitations;
    document.getElementById('limit-text').innerText = t.limitText;
    document.getElementById('types-title').innerText = t.typesTitle;
    document.getElementById('back-home').innerText = t.backHome;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateMBTILang);
} else {
    updateMBTILang();
}
