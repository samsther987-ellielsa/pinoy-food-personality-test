const resultsData = {
    "INTJ": { food: "Kapeng Barako", emoji: "☕", enDesc: "Just like pure Kapeng Barako, you are bold, intense, and strong.", tlDesc: "Parang Kapeng Barako, matapang ka at seryoso.", kstar: "G-Dragon (BigBang)", enAct: "Plan your next 5-year goal today.", tlAct: "Planuhin mo na ang goals mo." },
    "INTP": { food: "Balut", emoji: "🥚", enDesc: "You are unique, complex, and full of surprises.", tlDesc: "Kakaiba ka at puno ng surpresa.", kstar: "Jin (BTS)", enAct: "Watch a documentary.", tlAct: "Manood ng documentary." },
    "ENTJ": { food: "Lechon", emoji: "👑", enDesc: "You are the star of the feast.", tlDesc: "Ikaw ang bida sa handaan.", kstar: "Ko Moon-young", enAct: "Start a new project.", tlAct: "Mag-umpisa ng project." },
    "ENTP": { food: "Sisig", emoji: "🌶️", enDesc: "Sizzling, spicy, and exciting!", tlDesc: "Mainit, maanghang, at exciting!", kstar: "Jay Park", enAct: "Debate with a friend.", tlAct: "Makipag-debate." },
    "INFJ": { food: "Kare-Kare", emoji: "🥜", enDesc: "Rich, complex, and deep.", tlDesc: "Mayaman sa lasa at malalim.", kstar: "IU", enAct: "Write in your journal.", tlAct: "Magsulat sa diary." },
    "INFP": { food: "Champorado", emoji: "🍫", enDesc: "Sweet, warm, and comforting.", tlDesc: "Matamis at mainit.", kstar: "V (BTS)", enAct: "Listen to sad songs.", tlAct: "Makinig sa sad songs." },
    "ENFJ": { food: "Taho", emoji: "🥤", enDesc: "The sweet start to everyone's day.", tlDesc: "Ang matamis na simula ng araw.", kstar: "Jimin (BTS)", enAct: "Send compliments to friends.", tlAct: "Mag-send ng compliment." },
    "ENFP": { food: "Halo-Halo", emoji: "🌈", enDesc: "Colorful, chaotic, and sweet.", tlDesc: "Makulay, magulo, at matamis.", kstar: "Sana (Twice)", enAct: "Try a new hobby.", tlAct: "Subukan ang bagong hobby." },
    "ISTJ": { food: "Adobo", emoji: "🥘", enDesc: "The timeless classic.", tlDesc: "Ang classic na hindi nalalaos.", kstar: "Irene (Red Velvet)", enAct: "Organize your room.", tlAct: "Ligpitin ang kwarto." },
    "ISFJ": { food: "Sinigang", emoji: "🍲", enDesc: "A warm hug in a bowl.", tlDesc: "Isang mainit na yakap.", kstar: "Dahyun (Twice)", enAct: "Cook for your family.", tlAct: "Ipagluto ng masarap." },
    "ESTJ": { food: "Pancit Canton", emoji: "🍜", enDesc: "Symbol of long life and order.", tlDesc: "Simbolo ng long life.", kstar: "BamBam (GOT7)", enAct: "Finish your To-Do list.", tlAct: "Tapusin ang To-Do list." },
    "ESFJ": { food: "Lumpia", emoji: "🌯", enDesc: "Everyone's favorite!", tlDesc: "Favorite ng lahat!", kstar: "J-Hope (BTS)", enAct: "Call a friend.", tlAct: "Tawagan ang friend." },
    "ISTP": { food: "Kinilaw", emoji: "🐟", enDesc: "Fresh, raw, and cool.", tlDesc: "Fresh at cool.", kstar: "Suga (BTS)", enAct: "Fix something broken.", tlAct: "Mag-ayos ng sirang gamit." },
    "ISFP": { food: "Buko Pie", emoji: "🥥", enDesc: "Hard outside, soft inside.", tlDesc: "Matigas sa labas, malambot sa loob.", kstar: "Jungkook (BTS)", enAct: "Draw or paint.", tlAct: "Mag-drawing." },
    "ESTP": { food: "Isaw", emoji: "🍢", enDesc: "Street-smart and risky.", tlDesc: "Madiskarte at matapang.", kstar: "Jimin (BTS)", enAct: "Go on an adventure.", tlAct: "Mag-roadtrip." },
    "ESFP": { food: "Crispy Pata", emoji: "🍖", enDesc: "Loud, crunchy, and sinful!", tlDesc: "Maingay at masarap!", kstar: "Rain", enAct: "Dance to your favorite song.", tlAct: "Sumayaw." }
};

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get('mbti');

    if (mbti && resultsData[mbti]) {
        const r = resultsData[mbti];
        document.getElementById('mbti-result').innerText = mbti;
        document.getElementById('food-name').innerText = `${r.food} ${r.emoji}`;
        document.getElementById('food-desc').innerText = (curLang === 'en') ? r.enDesc : r.tlDesc;
        document.getElementById('k-match').innerText = r.kstar;
        document.getElementById('mission-text').innerText = (curLang === 'en') ? r.enAct : r.tlAct;
    }
};

function shareResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get('mbti');
    const shareUrl = window.location.origin + `/result.html?mbti=${mbti}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Result link copied!");
    });
}

function shareToFacebook() {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get('mbti');
    const shareUrl = window.location.origin + `/result.html?mbti=${mbti}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
}
