// MBTI별 SEO 메타데이터 (공감형 버전)
const mbtiMetaData = {
    "INTJ": {
        title: "INTJ - Kapeng Barako | Pinoy Food Personality Test",
        description: "You're the Kapeng Barako that wakes everyone up - not with sugar-coated words, but with pure, unfiltered truth. People either love your intensity or can't handle it, and honestly? You're okay with that. Your mind is your kingdom, and small talk is your kryptonite.",
        keywords: "INTJ, Kapeng Barako, personality test, MBTI, Filipino food, strategic thinker"
    },
    "INTP": {
        title: "INTP - Balut | Pinoy Food Personality Test",
        description: "Like Balut, people don't get you at first glance - but those brave enough to look deeper find something fascinating. You live in your head, building theories and ideas that most people won't understand for another 5 years. Your brain never stops, even at 3 AM.",
        keywords: "INTP, Balut, personality test, MBTI, Filipino food, deep thinker"
    },
    "ENTJ": {
        title: "ENTJ - Lechon | Pinoy Food Personality Test",
        description: "You're the Lechon - everyone's waiting for you to arrive. You walk into a room and things start happening. Settling for 'good enough' isn't in your vocabulary. You're here to win, lead, and honestly? The world needs your energy.",
        keywords: "ENTJ, Lechon, personality test, MBTI, Filipino food, natural leader"
    },
    "ENTP": {
        title: "ENTP - Sisig | Pinoy Food Personality Test",
        description: "Sisig - chaotic, spicy, impossible to ignore. You're the friend who turns 'let's get coffee' into a 4-hour philosophical debate about existence. Boredom is your enemy, routine is your nightmare, and you wouldn't have it any other way.",
        keywords: "ENTP, Sisig, personality test, MBTI, Filipino food, innovative debater"
    },
    "INFJ": {
        title: "INFJ - Kare-Kare | Pinoy Food Personality Test",
        description: "You're Kare-Kare - layers upon layers of depth that people rarely fully understand. You feel everything intensely, see patterns others miss, and carry the weight of wanting to save everyone. Rare, misunderstood, but absolutely unforgettable.",
        keywords: "INFJ, Kare-Kare, personality test, MBTI, Filipino food, empathetic counselor"
    },
    "INFP": {
        title: "INFP - Champorado | Pinoy Food Personality Test",
        description: "Champorado on a rainy day - that's you. You're the friend who writes poetry at midnight, cries at songs, and feels like you don't quite fit in this world. Your heart is soft, your dreams are big, and you're more beautiful than you think.",
        keywords: "INFP, Champorado, personality test, MBTI, Filipino food, idealistic dreamer"
    },
    "ENFJ": {
        title: "ENFJ - Taho | Pinoy Food Personality Test",
        description: "You're Taho - the sweetness people need to start their day. You genuinely care if people are okay, remember small details about their lives, and somehow make everyone feel seen. Your superpower? Making people believe in themselves.",
        keywords: "ENFJ, Taho, personality test, MBTI, Filipino food, inspiring teacher"
    },
    "ENFP": {
        title: "ENFP - Halo-Halo | Pinoy Food Personality Test",
        description: "Halo-Halo - because you're literally everything at once and it somehow WORKS. You're the chaos everyone secretly loves. Your energy is contagious, your ideas are wild, and life with you is never, ever boring. Keep shining, you beautiful mess.",
        keywords: "ENFP, Halo-Halo, personality test, MBTI, Filipino food, enthusiastic campaigner"
    },
    "ISTJ": {
        title: "ISTJ - Adobo | Pinoy Food Personality Test",
        description: "Adobo - the reliable classic that's been there through generations. While others chase trends, you're the one people actually count on. You might not be flashy, but you're the backbone everyone leans on when things get real.",
        keywords: "ISTJ, Adobo, personality test, MBTI, Filipino food, dependable logistician"
    },
    "ISFJ": {
        title: "ISFJ - Sinigang | Pinoy Food Personality Test",
        description: "Sinigang - the warm hug people need after a hard day. You remember birthdays, notice when someone's off, and somehow always know what to say. You give so much of yourself that sometimes you forget you matter too. (You do.)",
        keywords: "ISFJ, Sinigang, personality test, MBTI, Filipino food, nurturing defender"
    },
    "ESTJ": {
        title: "ESTJ - Pancit Canton | Pinoy Food Personality Test",
        description: "Pancit Canton - structured, essential, gets things DONE. While everyone's still discussing the plan, you've already executed it. You're the project manager friend, the one who actually reads the instructions. Chaos fears you.",
        keywords: "ESTJ, Pancit Canton, personality test, MBTI, Filipino food, efficient executive"
    },
    "ESFJ": {
        title: "ESFJ - Lumpia | Pinoy Food Personality Test",
        description: "Lumpia - literally everyone's favorite. You're the glue of your friend group, the one who plans gatherings and makes sure nobody feels left out. Your love language is feeding people and making sure they're happy. You're a treasure.",
        keywords: "ESFJ, Lumpia, personality test, MBTI, Filipino food, caring consul"
    },
    "ISTP": {
        title: "ISTP - Kinilaw | Pinoy Food Personality Test",
        description: "Kinilaw - fresh, no-nonsense, surprisingly complex. You're the friend who can fix anything, stays cool under pressure, and doesn't waste time on drama. You speak in actions, not words. Underestimated? Always. Capable? Absolutely.",
        keywords: "ISTP, Kinilaw, personality test, MBTI, Filipino food, practical virtuoso"
    },
    "ISFP": {
        title: "ISFP - Buko Pie | Pinoy Food Personality Test",
        description: "Buko Pie - quiet on the outside, sweet and artistic on the inside. You see beauty where others don't, feel deeply but rarely show it, and express yourself through creativity. You're softer than you let on, and that's your superpower.",
        keywords: "ISFP, Buko Pie, personality test, MBTI, Filipino food, artistic adventurer"
    },
    "ESTP": {
        title: "ESTP - Isaw | Pinoy Food Personality Test",
        description: "Isaw - street-smart, bold, living on the edge. You're the 'let's just do it' friend who makes life an adventure. Risk-taker, thrill-seeker, and the first one to jump into the unknown. Life's too short for boring, right?",
        keywords: "ESTP, Isaw, personality test, MBTI, Filipino food, energetic entrepreneur"
    },
    "ESFP": {
        title: "ESFP - Crispy Pata | Pinoy Food Personality Test",
        description: "Crispy Pata - loud, proud, and impossible to ignore! You're the life of EVERY party, the friend who turns a regular Tuesday into a celebration. You live for the moment, make people smile, and honestly? The world is brighter with you in it.",
        keywords: "ESFP, Crispy Pata, personality test, MBTI, Filipino food, spontaneous entertainer"
    }
};

// 동일한 setDynamicMetaTags 함수...
function setDynamicMetaTags() {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get('mbti');
    
    if (mbti && mbtiMetaData[mbti]) {
        const meta = mbtiMetaData[mbti];
        document.title = meta.title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', meta.description);
        
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', meta.keywords);
        
        setOGTag('og:title', meta.title);
        setOGTag('og:description', meta.description);
        setOGTag('og:url', window.location.href);
        setOGTag('og:image', `${window.location.origin}/share-image.png`);
        
        setOGTag('twitter:card', 'summary_large_image');
        setOGTag('twitter:title', meta.title);
        setOGTag('twitter:description', meta.description);
        setOGTag('twitter:image', `${window.location.origin}/share-image.png`);
    }
}

function setOGTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setDynamicMetaTags);
} else {
    setDynamicMetaTags();
}
