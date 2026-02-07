const resultsData = {
    "INTJ": { 
        food: "Kapeng Barako", emoji: "☕", 
        enDesc: "Just like pure Kapeng Barako, you are bold, intense, and strong. You are not for everyone, and you don't try to be. You value efficiency and intellect over popularity. You wake people up with your hard truths and deep insights. While you may seem cold on the outside, you are extremely reliable and of premium quality.", 
        tlDesc: "Parang Kapeng Barako, matapang ka at seryoso. Hindi ka para sa lahat, at okay lang yun sayo. Mas gusto mo ang quality at talino kaysa maging sikat.", 
        kstar: "G-Dragon (BigBang), Kageyama (Haikyuu)", 
        enAct: "🎯 Design your 5-year master plan. Break it into quarterly milestones. Your strategic mind thrives on long-term vision - use it to build your empire, one calculated move at a time.", 
        tlAct: "🎯 Gumawa ng 5-year master plan. I-break into quarterly goals. Ang strategic mind mo ay perfect para sa long-term vision." 
    },
    "INTP": { 
        food: "Balut", emoji: "🥚", 
        enDesc: "You are unique, complex, and full of surprises, just like Balut. Many people might misunderstand you at first glance, but those who are brave enough to get to know you find a hidden gem.", 
        tlDesc: "Kakaiba ka at puno ng surpresa, parang Balut. Maraming hindi ka agad naiintindihan, pero special ka talaga.", 
        kstar: "Jin (BTS), Kenma (Haikyuu)", 
        enAct: "🧠 Deep dive into one topic that fascinates you today. Take notes. Connect dots others can't see. Your genius lies in understanding complexity - feed your curious mind.", 
        tlAct: "🧠 Mag-deep dive sa isang topic na interesting sayo. Mag-notes. Ang genius mo ay sa pag-intindi ng complexity." 
    },
    "ENTJ": { 
        food: "Lechon", emoji: "👑", 
        enDesc: "You are the Lechon: the star of the feast and the center of attention. You are a natural-born leader who demands respect.", 
        tlDesc: "Ikaw ang Lechon: ang bida sa handaan. Pinanganak kang leader.", 
        kstar: "Ko Moon-young (It's Okay to Not Be Okay)", 
        enAct: "👑 Start that project you've been planning. Stop waiting for perfect conditions - create them. Your leadership isn't just a trait, it's your responsibility. The world needs what only you can build.", 
        tlAct: "👑 Simulan na yang project. Huwag maghintay ng perfect timing - ikaw ang gagawa nun. Lead na!" 
    },
    "ENTP": { 
        food: "Sisig", emoji: "🌶️", 
        enDesc: "Sizzling, spicy, and exciting! Like Sisig, you love mixing things up. You hate boredom and love a good debate.", 
        tlDesc: "Mainit, maanghang, at exciting! Ayaw mo ng boring.", 
        kstar: "Jay Park, Ryuk (Death Note)", 
        enAct: "💡 Challenge one assumption you've been taking for granted. Play devil's advocate with yourself. Innovation starts when you question 'the way it's always been done.'", 
        tlAct: "💡 I-challenge ang isang assumption mo. Mag-isip ng bago. Innovation starts sa questioning." 
    },
    "INFJ": { 
        food: "Kare-Kare", emoji: "🥜", 
        enDesc: "You are Kare-Kare: rich, complex, and deep. You are not a simple dish; you have layers of flavor.", 
        tlDesc: "Ikaw ay Kare-Kare: mayaman sa lasa at malalim. Marami kang layers.", 
        kstar: "IU, Elsa (Frozen)", 
        enAct: "✨ Journal about one person you'd like to help or inspire. Map out how your unique insights could make a difference. Your empathy is your superpower - use it intentionally.", 
        tlAct: "✨ Mag-journal tungkol sa taong gusto mong tulungan. Ang empathy mo ay superpower - gamitin mo intentionally." 
    },
    "INFP": { 
        food: "Champorado", emoji: "🍫", 
        enDesc: "Sweet, warm, and comforting. Like Champorado on a rainy day, you heal people's souls. You are a dreamer with a soft heart.", 
        tlDesc: "Matamis at mainit. Dreamer ka at malambot ang puso.", 
        kstar: "V (BTS), Jennie (Blackpink)", 
        enAct: "🌙 Spend 30 minutes on something creative with zero pressure to 'produce' anything. Paint, write, daydream. Your authenticity shines when you stop performing and just *be*.", 
        tlAct: "🌙 Gumawa ng creative na walang pressure. Paint, write, daydream. Shine ka when you just *be*." 
    },
    "ENFJ": { 
        food: "Taho", emoji: "🥤", 
        enDesc: "You are Taho: the sweet start to everyone's day. You are encouraging, warm, and loved by all.", 
        tlDesc: "Ikaw ang Taho: ang matamis na simula ng araw. Encouraging ka at love ng lahat.", 
        kstar: "Jimin (BTS), Tanjiro (Demon Slayer)", 
        enAct: "💝 Send genuine appreciation to 3 people who've shaped your journey. But also: write one affirmation for YOURSELF. You can't pour from an empty cup - fill yours first.", 
        tlAct: "💝 Mag-send ng appreciation sa 3 tao. Pero mag-sulat din ng affirmation para sa SARILI mo. Fill your cup first." 
    },
    "ENFP": { 
        food: "Halo-Halo", emoji: "🌈", 
        enDesc: "You are the ultimate mix! Colorful, chaotic, and sweet like Halo-Halo. You are the life of the party and full of endless possibilities.", 
        tlDesc: "Ikaw ang ultimate mix! Makulay, magulo, at matamis. Life of the party!", 
        kstar: "Sana (Twice), Spider-Man", 
        enAct: "🎨 Pick ONE scattered idea and give it structure today. Your creativity is magic, but follow-through makes it real. Channel that beautiful chaos into something tangible.", 
        tlAct: "🎨 Pumili ng ISANG idea at bigyan ng structure. Ang creativity mo ay magic - gawin mong real." 
    },
    "ISTJ": { 
        food: "Adobo", emoji: "🥘", 
        enDesc: "You are Adobo: the timeless classic. You are reliable, consistent, and practical. Trends may come and go, but you stay strong.", 
        tlDesc: "Ikaw ang Adobo: ang classic. Reliable at consistent ka.", 
        kstar: "Irene (Red Velvet), Captain America", 
        enAct: "📋 Optimize one system in your life today. Your strength is creating order from chaos. Small improvements compound - make one that'll save you time every day.", 
        tlAct: "📋 I-optimize ang isang system sa buhay mo. Ang strength mo ay creating order. Small improvements = big results." 
    },
    "ISFJ": { 
        food: "Sinigang", emoji: "🍲", 
        enDesc: "A warm hug in a bowl. You are Sinigang: comforting and essential. You are very empathetic and sense when people are sad.", 
        tlDesc: "Isang mainit na yakap. Comforting ka at kailangan ng lahat.", 
        kstar: "Dahyun (Twice), Cinderella", 
        enAct: "🫂 Do something kind for someone, but also: set ONE boundary you've been avoiding. Caring for others is beautiful, but self-care isn't selfish - it's necessary.", 
        tlAct: "🫂 Gumawa ng something kind, pero mag-set din ng boundary. Self-care is not selfish - it's necessary." 
    },
    "ESTJ": { 
        food: "Pancit Canton", emoji: "🍜", 
        enDesc: "Symbol of long life and order. Like Pancit at a birthday, you are essential for gatherings. You are organized, efficient, and take charge.", 
        tlDesc: "Simbolo ng long life. Organisado ka at efficient.", 
        kstar: "BamBam (GOT7), Hermione Granger)", 
        enAct: "⚡ Tackle your hardest task FIRST today. No warm-up, no procrastination. Your execution skills are unmatched - prove it by conquering what others avoid.", 
        tlAct: "⚡ Gawin ang hardest task FIRST. Walang warm-up. Ang execution skills mo ay unmatched - prove it!" 
    },
    "ESFJ": { 
        food: "Lumpia", emoji: "🌯", 
        enDesc: "Everyone's favorite! You are Lumpia: you fit in at every occasion, from simple dinners to grand fiestas.", 
        tlDesc: "Favorite ng lahat! Friendly ka at sikat.", 
        kstar: "J-Hope (BTS), SpongeBob", 
        enAct: "🎉 Plan a gathering (even virtual!), but also: schedule 'you' time this week. Your energy lights up rooms, but remember to recharge so you can keep shining.", 
        tlAct: "🎉 Mag-plan ng gathering, pero mag-schedule din ng 'you' time. Recharge para you can keep shining." 
    },
    "ISTP": { 
        food: "Kinilaw", emoji: "🐟", 
        enDesc: "Fresh, raw, and cool. Like Kinilaw, you don't need heat (drama) to be great. You are practical, realistic, and skilled.", 
        tlDesc: "Fresh at cool. Praktikal ka at madiskarte.", 
        kstar: "Suga (BTS), Hawkeye", 
        enAct: "🔧 Fix, build, or improve something with your hands today. Your problem-solving through action is therapy. Create something tangible - it grounds your brilliant mind.", 
        tlAct: "🔧 Mag-fix, build, o improve ng something. Ang problem-solving mo through action ay therapy. Create!" 
    },
    "ISFP": { 
        food: "Buko Pie", emoji: "🥥", 
        enDesc: "You are Buko Pie: hard on the outside (crust) but soft and sweet on the inside. You are artistic and aesthetic.", 
        tlDesc: "Matigas sa labas, malambot sa loob. Artistic ka.", 
        kstar: "Jungkook (BTS), Harry Potter", 
        enAct: "🎨 Create something beautiful with zero judgment. Art, music, photos - whatever speaks to you. Your sensitivity is a gift. Express it without apology.", 
        tlAct: "🎨 Gumawa ng something beautiful without judgment. Ang sensitivity mo ay gift - express it!" 
    },
    "ESTP": { 
        food: "Isaw", emoji: "🍢", 
        enDesc: "Street-smart and risky. You are Isaw: addictive and everywhere! You love taking risks and living on the edge.", 
        tlDesc: "Madiskarte at matapang. Mahilig ka sa risk.", 
        kstar: "Jimin (BTS), Thor", 
        enAct: "🏃 Do ONE thing that scares you today. Your growth happens at the edge of your comfort zone. Take the leap - you always land on your feet anyway.", 
        tlAct: "🏃 Gawin ang ONE thing na nakakakaba. Growth happens sa edge ng comfort zone. Jump - you always land on your feet!" 
    },
    "ESFP": { 
        food: "Crispy Pata", emoji: "🍖", 
        enDesc: "Loud, crunchy, and sinful! You are Crispy Pata: the ultimate treat. You love being the center of attention and entertaining others.", 
        tlDesc: "Maingay at masarap! Gusto mong nag-eentertain.", 
        kstar: "Rain, Luffy (One Piece)", 
        enAct: "💃 Dance, sing, or perform TODAY. Even if it's just in your room. Your joy is contagious - share it. The world is better when you're being your authentic, vibrant self.", 
        tlAct: "💃 Sumayaw, kumanta, perform! Kahit sa room lang. Ang joy mo ay contagious - share it. Be your vibrant self!" 
    }
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
        alert((curLang === 'en') ? "Result link copied to clipboard!" : "Na-copy na ang link!");
    });
}

function shareToFacebook() {
    const urlParams = new URLSearchParams(window.location.search);
    const mbti = urlParams.get('mbti');
    const shareUrl = window.location.origin + `/result.html?mbti=${mbti}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
}
