let curLang = 'en'; 
        let curTheme = 'light';
        let currentMbti = ""; // Global variable to store the MBTI result

        const uiText = {
            en: {
                subtitle: "Discover your soul food & K-Pop twin!", startBtn: "Let's Eat! (Start)",
                analyzing: "Analyzing your personality...", loadingSub: "Finding your K-Pop soulmate...",
                resultLabel: "YOUR SOUL FOOD IS", shareBtn: "Share Result 📤", retryBtn: "Try Again 🔄",
                options: ["Super Agree! 😍", "Agree 🙂", "Disagree 😕", "Super Disagree! 🙅‍♂️"],
                contactBtn: "✉️ Contact", contactTitle: "Inquiry / Partnership",
                contactSubtitle: "Please fill out the form below and we'll get back to you soon.",
                contactName: "Your Name", contactEmail: "Your Email", contactMessage: "Your Message",
                contactSubmit: "Send Inquiry", contactBack: "Back to Home",
                facebookShare: "Share in Facebook 📘", instagramShare: "Share in Instagram 📸",
                privacyBtn: "🔒 Privacy", privacyTitle: "Privacy Policy", privacyBack: "Back to Home",
                termsBtn: "📝 Terms", termsTitle: "Terms of Service", termsBack: "Back to Home",
                aboutBtn: "ℹ️ About", aboutTitle: "About This Test", aboutBack: "Back to Home"
            },
            tl: {
                subtitle: "Alamin ang iyong Soul Food at K-Pop Twin!", startBtn: "Tara Kain! (Simula)",
                analyzing: "Ina-analyze ang iyong personality...", loadingSub: "Hinahanap ang iyong K-Pop match...",
                resultLabel: "ANG SOUL FOOD MO AY", shareBtn: "I-share ang Resulta 📤", retryBtn: "Ulitin ang Quiz 🔄",
                options: ["Sobrang Agree! 😍", "Pwede 🙂", "Di masyado 😕", "Sobrang Hindi! 🙅‍♂️"],
                contactBtn: "✉️ Makipag-ugnayan", contactTitle: "Inquiry / Partnership",
                contactSubtitle: "Punan ang form sa ibaba at babalikan ka namin.",
                contactName: "Pangalan mo", contactEmail: "Email mo", contactMessage: "Mensahe mo",
                contactSubmit: "Ipadala ang Inquiry", contactBack: "Bumalik sa Home",
                facebookShare: "I-share sa Facebook 📘", instagramShare: "I-share sa Instagram 📸",
                privacyBtn: "🔒 Privacy", privacyTitle: "Patakaran sa Pagkapribado", privacyBack: "Bumalik sa Home",
                termsBtn: "📝 Tuntunin ng Serbisyo", termsTitle: "Mga Tuntunin ng Serbisyo", termsBack: "Bumalik sa Home",
                aboutBtn: "ℹ️ Tungkol", aboutTitle: "Tungkol sa Test na Ito", aboutBack: "Bumalik sa Home"
            }
        };

        const questionBank = {
            EI: [
                { en: "I feel energized when I'm at a party with many people.", tl: "Ganado ako pag nasa party na maraming tao.", invert: false, type: "EI" },
                { en: "I usually start conversations first.", tl: "Ako madalas ang nauunang makipag-usap.", invert: false, type: "EI" },
                { en: "I enjoy being alone more than going out.", tl: "Mas gusto kong mapag-isa kaysa lumabas.", invert: true, type: "EI" },
                { en: "I prefer a small group of friends over a big crowd.", tl: "Mas gusto ko ang onting tropa kesa sa malaking barkada.", invert: true, type: "EI" },
                { en: "I am often the center of attention in a group.", tl: "Madalas akong sentro ng atensyon sa grupo.", invert: false, type: "EI" },
                { en: "I think before I speak.", tl: "Nag-iisip muna ako bago magsalita.", invert: true, type: "EI" },
                { en: "I get lonely easily if I don't meet people.", tl: "Madali akong malungkot pag walang kausap.", invert: false, type: "EI" },
                { en: "I need time alone to recharge after work.", tl: "Kailangan ko mapag-isa para mag-recharge.", invert: true, type: "EI" }
            ],
            SN: [
                { en: "I trust facts and experience more than theories.", tl: "Mas naniniwala ako sa experience kaysa sa theories.", invert: false, type: "SN" },
                { en: "I focus on the present rather than the future.", tl: "Mas focus ako sa ngayon kaysa sa future.", invert: false, type: "SN" },
                { en: "I often daydream and imagine 'what if'.", tl: "Madalas akong managinip ng gising (daydream).", invert: true, type: "SN" },
                { en: "I love discussing abstract ideas and meanings.", tl: "Mahilig ako sa mga malalim na usapan at ideas.", invert: true, type: "SN" },
                { en: "I prefer clear instructions over improvisation.", tl: "Gusto ko ng malinaw na utos kaysa manghula.", invert: false, type: "SN" },
                { en: "I look for hidden meanings in things.", tl: "Naghahanap ako ng hidden meaning sa mga bagay.", invert: true, type: "SN" },
                { en: "I am very practical and realistic.", tl: "Praktikal ako at makatotohanan.", invert: false, type: "SN" },
                { en: "I have a vivid imagination.", tl: "Malawak ang imahinasyon ko.", invert: true, type: "SN" }
            ],
            TF: [
                { en: "I follow logic more than my heart.", tl: "Mas sinusunod ko ang utak ko kaysa puso.", invert: false, type: "TF" },
                { en: "Being honest is more important than not hurting feelings.", tl: "Mas okay nang prangka kaysa maging plastic.", invert: false, type: "TF" },
                { en: "I make decisions based on emotions.", tl: "Nagde-decide ako base sa nararamdaman", invert: true, type: "TF" },
                { en: "I prioritize harmony over being right.", tl: "Mas mahalaga sakin na walang away kaysa ako ang tama.", invert: true, type: "TF" },
                { en: "I am often described as 'cold' or 'rational'.", tl: "Sabi nila 'cold' daw ako o masyadong lohikal.", invert: false, type: "TF" },
                { en: "I easily empathize with other people's problems.", tl: "Madali akong maawa sa 문제의 다른 요소.", invert: true, type: "TF" },
                { en: "Efficiency is more important than cooperation.", tl: "Mas mahalaga ang bilis kaysa samahan.", invert: false, type: "TF" },
                { en: "I try not to hurt anyone's feelings.", tl: "Iniiwasan akong makasakit ng damdamin.", invert: true, type: "TF" }
            ],
            JP: [
                { en: "I like to have a detailed plan before traveling.", tl: "Gusto ko may itinerary bago bumyahe.", invert: false, type: "JP" },
                { en: "I finish work way before the deadline.", tl: "Tinatappos ko ang trabaho nang maaga sa deadline.", invert: false, type: "JP" },
                { en: "I am spontaneous and flexible.", tl: "Biglaan ang mga lakad ko at flexible ako.", invert: true, type: "JP" },
                { en: "I work better under pressure at the last minute.", tl: "Mas magaling ako gumawa pag cramming.", invert: true, type: "JP" },
                { en: "I like to keep my room and desk organized.", tl: "Gusto ko laging maayos ang gamit ko.", invert: false, type: "JP" },
                { en: "I often change my plans at the last moment.", tl: "Madalas akong magbago ng isip last minute.", invert: true, type: "JP" },
                { en: "I make to-do lists for everything.", tl: "Gumagawa ako ng to-do list para sa lahat.", invert: false, type: "JP" },
                { en: "Rules and schedules are meant to be broken.", tl: "Ang rules at schedule ay pwedeng baliin.", invert: true, type: "JP" }
            ]
        };

        const resultsData = {
            "INTJ": { 
                food: "Kapeng Barako", emoji: "☕",
                enDesc: "Just like pure Kapeng Barako, you are bold, intense, and strong. You are not for everyone, and you don't try to be. You value efficiency and intellect over popularity. You wake people up with your hard truths and deep insights. While you may seem cold on the outside, you are extremely reliable and of premium quality.", 
                tlDesc: "Parang Kapeng Barako, matapang ka at seryoso. Hindi ka para sa lahat, at okay lang yun sayo. Mas gusto mo ang quality at talino kaysa maging sikat. Ginugulat mo ang mga tao sa talas ng isip mo. Mukha kang masungit minsan, pero ikaw ang pinaka-reliable at 'premium' na tao sa barkada.", 
                kstar: "G-Dragon (BigBang), Kageyama (Haikyuu)", enAct: "Plan your next 5-year goal today.", tlAct: "Planuhin mo na ang goals mo for next 5 years." 
            },
            "INTP": { 
                food: "Balut", emoji: "🥚",
                enDesc: "You are unique, complex, and full of surprises, just like Balut. Many people might misunderstand you at first glance, but those who are brave enough to get to know you find a hidden gem. You live in your own world of theories and ideas. You are unconventional and always thinking outside the box.", 
                tlDesc: "Kakaiba ka at puno ng surpresa, parang Balut. Maraming hindi ka agad naiintindihan sa unang tingin, pero ang mga tunay na nakakakilala sayo ay alam na special ka. May sarili mong mundo. Hindi ka sumusunod sa uso, at lagi kang may kakaibang ideas na ikaw lang ang nakakaisip.", 
                kstar: "Jin (BTS), Kenma (Haikyuu)", enAct: "Watch a documentary or learn a weird fact.", tlAct: "Manood ng documentary o mag-research ng weird facts." 
            },
            "ENTJ": { 
                food: "Lechon", emoji: "👑",
                enDesc: "You are the Lechon: the star of the feast and the center of attention. You are a natural-born leader who demands respect. You are ambitious, confident, and high-value. A party isn't complete without you, but you can be high-maintenance. You know what you want, and you know exactly how to get it.", 
                tlDesc: "Ikaw ang Lechon: ang bida sa handaan at center of attention. Pinanganak kang leader at nirerespeto ng lahat. Mataas ang pangarap mo at confident ka. Hindi kumpleto ang party pag wala ka. Alam mo ang gusto mo, at gagawin mo ang lahat para makuha yun.", 
                kstar: "Ko Moon-young (It's Okay to Not Be Okay)", enAct: "Start a new project or lead a group chat.", tlAct: "Mag-umpisa ng bagong project o ikaw mag-aya sa GC." 
            },
            "ENTP": { 
                food: "Sisig", emoji: "🌶️",
                enDesc: "Sizzling, spicy, and exciting! Like Sisig, you love mixing things up. You hate boredom and love a good debate. You are adaptable and can fit in anywhere, from street food stalls to fancy dinners. You bring the 'spice' to life and are always ready for a new adventure or argument.", 
                tlDesc: "Mainit, maanghang, at exciting! Parang Sisig, ayaw mo ng boring. Mahilig ka sa debate at thrill. Bagay ka kahit saan, mapakalsada man o hotel. Ikaw ang nagbibigay ng anghang at saya sa barkada. Laging handa sa adventure o diskusyon.", 
                kstar: "Jay Park, Ryuk (Death Note)", enAct: "Debate with a friend about something random.", tlAct: "Makipag-debate sa tropa tungkol sa kahit ano." 
            },
            "INFJ": { 
                food: "Kare-Kare", emoji: "🥜",
                enDesc: "You are Kare-Kare: rich, complex, and deep. You are not a simple dish; you have layers of flavor. You are quiet but have a very rich inner world. You need your 'bagoong' (close friends) to truly feel complete. You are rare and special, and people appreciate your depth once they understand you.", 
                tlDesc: "Ikaw ay Kare-Kare: mayaman sa lasa at malalim. Hindi ka simple; marami kang layers. Tahimik ka lang pero sobrang lalim ng iniisip mo. Kailangan mo ng 'bagoong' (tunay na kaibigan) para kumpleto ang araw mo. Special ka at rare, kaya swerte ang nakakakilala sayo.", 
                kstar: "IU, Elsa (Frozen)", enAct: "Write in your journal or meditate.", tlAct: "Magsulat sa diary o mag-mediate." 
            },
            "INFP": { 
                food: "Champorado", emoji: "🍫",
                enDesc: "Sweet, warm, and comforting. Like Champorado on a rainy day, you heal people's souls. You are a dreamer with a soft heart. You value authenticity and feelings. You might be a bit slow to open up, but you are incredibly sweet once you trust someone. You live in your own cozy world.", 
                tlDesc: "Matamis at mainit. Parang Champorado sa tag-ulan, ikaw ang comfort food ng lahat. Dreamer ka at malambot ang puso. Mahalaga sayo ang totoong nararamdaram. 메디요 마히야인 카 사 우나, Pero sobrang tamis mo magmahal. 메이 사릴리 캉 코지 나 문도.", 
                kstar: "V (BTS), Jennie (Blackpink)", enAct: "Listen to sad songs and look at the sky.", tlAct: "Makinig sa sad songs habang nakatingin sa langit." 
            },
            "ENFJ": { 
                food: "Taho", emoji: "🥤",
                enDesc: "You are Taho: the sweet start to everyone's day. You are encouraging, warm, and loved by all. You are soft (like tofu) but sweet (like arnibal). You genuinely care about people and want everyone to be happy. You are the cheerleader of your group, always shouting 'Good Morning!' to the world.", 
                tlDesc: "Ikaw ang Taho: ang matamis na simula ng araw. Encouraging ka, warm, at love ng lahat. Malambot ang puso mo (tofu) pero sweet (arnibal). Gusto mo laging masaya ang iba. Ikaw ang cheerleader ng barkada na laging bumabati ng 'Good Morning!'", 
                kstar: "Jimin (BTS), Tanjiro (Demon Slayer)", enAct: "Send a compliment to 3 friends.", tlAct: "Mag-send ng compliment sa 3 friends." 
            },
            "ENFP": { 
                food: "Halo-Halo", emoji: "🌈",
                enDesc: "You are the ultimate mix! Colorful, chaotic, and sweet like Halo-Halo. You are the life of the party and full of endless possibilities. You can't be defined by just one ingredient. You are creative, free-spirited, and bring energy wherever you go. Life is never boring with you around.", 
                tlDesc: "Ikaw ang ultimate mix! Makulay, magulo, at matamis parang Halo-Halo. Ikaw ang bumubuhay sa party. Hindi ka pwedeng ikahon sa iisang bagay lang. Creative ka at malaya. Hinding-hindi magiging boring ang buhay kapag kasama ka.", 
                kstar: "Sana (Twice), Spider-Man", enAct: "Try a new hobby or go somewhere new.", tlAct: "Subukan ang bagong hobby o pumunta sa bagong lugar." 
            },
            "ISTJ": { 
                food: "Adobo", emoji: "🥘",
                enDesc: "You are Adobo: the timeless classic. You are reliable, consistent, and practical. Trends may come and go, but you stay strong. You value tradition and rules. You are the pillar of your family and friends. You might not be the flashiest, but you are the one that lasts the longest.", 
                tlDesc: "Ikaw ang Adobo: ang classic na hindi nalalaos. Maasahan ka at consistent. Maraming uso ang dumadaan, pero ikaw matatag pa rin. Respetado mo ang rules at tradition. Ikaw ang pundasyon ng pamilya. Hindi ka man papampam, pero ikaw ang pinaka-tumatagal.", 
                kstar: "Irene (Red Velvet), Captain America", enAct: "Organize your room or workspace.", tlAct: "Ligpitin ang kwarto o workspace." 
            },
            "ISFJ": { 
                food: "Sinigang", emoji: "🍲",
                enDesc: "A warm hug in a bowl. You are Sinigang: comforting and essential. You are very empathetic and sense when people are sad. You might be a bit 'sour' (honest/strict) sometimes, but it comes from a place of care. You are the healer of the group who takes care of everyone.", 
                tlDesc: "Isang mainit na yakap. Ikaw ang Sinigang: comforting at kailangan ng lahat. Ramdam mo agad pag malungkot ang iba. Minsan 'maasim' ka (masungit), pero dahil lang yun sa pagmamalasakit. Ikaw ang taga-alaga at healer ng barkada.", 
                kstar: "Dahyun (Twice), Cinderella", enAct: "Cook something nice for your family.", tlAct: "Ipagluto ng masarap ang pamilya." 
            },
            "ESTJ": { 
                food: "Pancit Canton", emoji: "🍜",
                enDesc: "Symbol of long life and order. Like Pancit at a birthday, you are essential for gatherings. You are organized, efficient, and take charge of situations. You make sure everything runs smoothly. You are hardworking and traditional, ensuring that no one is left behind.", 
                tlDesc: "Simbolo ng long life at kaayusan. Parang Pancit sa birthday, kailangan ka sa handaan. Organisado ka at magaling mag-manage. Sinisigurado mong maayos ang takbo ng lahat. Masipag ka at tradisyunal, ikaw ang bahala sa lahat.", 
                kstar: "BamBam (GOT7), Hermione Granger", enAct: "Make a To-Do list and finish it all.", tlAct: "Gumawa ng To-Do list at tapusin lahat." 
            },
            "ESFJ": { 
                food: "Lumpia", emoji: "🌯",
                enDesc: "Everyone's favorite! You are Lumpia: you fit in at every occasion, from simple dinners to grand fiestas. You are social, friendly, and popular. People literally fight over you because you are so nice. You go to great lengths to make others feel welcome and happy.", 
                tlDesc: "Favorite ng lahat! Ikaw ang Lumpia: bagay ka sa lahat ng okasyon, simple man o fiesta. Friendly ka at sikat. Pinag-aagawan ka ng mga tao kasi sobrang bait mo. Ginagawa mo ang lahat para maging komportable at masaya ang mga kasama mo.", 
                kstar: "J-Hope (BTS), SpongeBob", enAct: "Call a friend you haven't seen in a while.", tlAct: "Tawagan ang friend na matagal mo nang di nakikita." 
            },
            "ISTP": { 
                food: "Kinilaw", emoji: "🐟",
                enDesc: "Fresh, raw, and cool. Like Kinilaw, you don't need heat (drama) to be great. You are practical, realistic, and skilled. You adapt to situations quickly and solve problems with cool logic. You are straightforward and prefer action over long words.", 
                tlDesc: "Fresh at cool. Parang Kinilaw, di mo kailangan ng apoy (drama) para maging astig. Praktikal ka at madiskarte. Mabilis kang mag-adjust sa sitwasyon at magaling lumutas ng problema. Diretso ka kung kumilos at ayaw mo ng paligoy-ligoy.", 
                kstar: "Suga (BTS), Hawkeye", enAct: "Fix something broken or do sports.", tlAct: "Mag-ayos ng sirang gamit o mag-exercise." 
            },
            "ISFP": { 
                food: "Buko Pie", emoji: "🥥",
                enDesc: "You are Buko Pie: hard on the outside (crust) but soft and sweet on the inside. You are artistic and aesthetic. You don't show your feelings easily to strangers, but you are deeply caring to those you love. You have a unique style and appreciate the simple beauties of life.", 
                tlDesc: "Ikaw ang Buko Pie: matigas sa labas (crust) pero malambot at matamis sa loob. Artistic ka. Hindi mo agad pinapakita ang feelings ko sa iba, pero sobrang bait mo sa mga mahal mo. May sarili kang style at na-aappreciate mo ang ganda ng buhay.", 
                kstar: "Jungkook (BTS), Harry Potter", enAct: "Draw, paint, or take aesthetic photos.", tlAct: "Mag-drawing o kumuha ng aesthetic na photos." 
            },
            "ESTP": { 
                food: "Isaw", emoji: "🍢",
                enDesc: "Street-smart and risky. You are Isaw: addictive and everywhere! You love taking risks and living on the edge. You are action-oriented and hate sitting still. You are the life of the street party, always ready for the next spontaneous adventure.", 
                tlDesc: "Madiskarte at matapang. Ikaw ang Isaw: nakaka-addict at laging present! Mahilig ka sa risk at adventure. Ayaw mong nakatengga lang. Ikaw ang bida sa kalye, laging handa sa biglaang gala at saya.", 
                kstar: "Jimin (BTS), Thor", enAct: "Go on a spontaneous trip or adventure.", tlAct: "Mag-roadtrip o gumala nang biglaan." 
            },
            "ESFP": { 
                food: "Crispy Pata", emoji: "🍖",
                enDesc: "Loud, crunchy, and sinful! You are Crispy Pata: the ultimate treat. You love being the center of attention and entertaining others. You live for the moment and want to enjoy life to the fullest. You are generous, fun, and make everyone smile.", 
                tlDesc: "Maingay, crunchy, at masarap! Ikaw ang Crispy Pata: ang ultimate treat. Gusto mong nag-eentertain ng tao. Ini-enjoy mo ang bawat moment ng buhay. Galante ka, masaya kasama, at napapangiti mo ang lahat.", 
                kstar: "Rain, Luffy (One Piece)", enAct: "Dance to your favorite song.", tlAct: "Sumayaw sa favorite mong kanta." 
            }
        };

        let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
        let qIndex = 0;
        let activeQuestions = [];
        let answerHistory = []; // Stores { questionIndex, point, type, invert } for going back
        
        // ✨ Audio Objects ✨
        const clickSound = document.getElementById('audio-click');
        const resultSoundE = document.getElementById('audio-result-e'); // Fanfare
        const resultSoundI = document.getElementById('audio-result-i'); // Magic Chime
        const resultSoundS = document.getElementById('audio-result-s'); // Placeholder for Sensing sound
        const resultSoundN = document.getElementById('audio-result-n'); // Placeholder for Intuition sound

        function playClick() {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log("Audio play blocked by browser"));
        }

        function playResult(mbti) {
            // Play E/I sound first
            if (mbti.includes('E')) {
                resultSoundE.currentTime = 0;
                resultSoundE.play().catch(e => console.log("Audio play blocked (E)"));
            } else if (mbti.includes('I')) {
                resultSoundI.currentTime = 0;
                resultSoundI.play().catch(e => console.log("Audio play blocked (I)"));
            }

            // Play S/N sound after a short delay
            setTimeout(() => {
                if (mbti.includes('S')) {
                    resultSoundS.currentTime = 0;
                    resultSoundS.play().catch(e => console.log("Audio play blocked (S)"));
                } else if (mbti.includes('N')) {
                    resultSoundN.currentTime = 0;
                    resultSoundN.play().catch(e => console.log("Audio play blocked (N)"));
                }
            }, 200); // 200ms delay for the second sound
        }

        function toggleLang() {
            playClick();
            curLang = (curLang === 'en') ? 'tl' : 'en';
            document.getElementById('lang-btn').innerText = (curLang === 'en') ? '🇺🇸 Eng' : '🇵🇭 Tagalog';
            updateUIText();
        }

        function toggleTheme() {
            playClick();
            curTheme = (curTheme === 'light') ? 'dark' : 'light';
            document.body.setAttribute('data-theme', curTheme);
            document.getElementById('theme-btn').innerText = (curTheme === 'light') ? '🌙 Dark' : '☀️ Light';
        }

        function updateUIText() {
            const t = uiText[curLang];
            document.getElementById('subtitle-text').innerText = t.subtitle;
            document.getElementById('start-btn').innerText = t.startBtn;
            
            // Update texts for the loading screen
            document.getElementById('analyzing-text').innerText = t.analyzing;
            document.getElementById('loading-sub').innerText = t.loadingSub;

            // Update result screen main action buttons
            document.getElementById('share-btn').innerText = t.shareBtn;
            document.getElementById('retry-btn').innerText = t.retryBtn;
            if (document.getElementById('facebook-share-btn')) { 
                document.getElementById('facebook-share-btn').innerText = t.facebookShare;
            }

            // Update texts based on active screen
            if(document.getElementById('quiz-screen').classList.contains('active')) {
                 showQuestion(false);
            } else if (document.getElementById('result-screen').classList.contains('active') && currentMbti) {
                const r = resultsData[currentMbti];
                if (curLang === 'en') {
                    document.getElementById('food-desc').innerText = r.enDesc;
                    document.getElementById('mission-text').innerText = r.enAct;
                } else {
                    document.getElementById('food-desc').innerText = r.tlDesc;
                    document.getElementById('mission-text').innerText = r.tlAct;
                }
                document.getElementById('result-label').innerText = t.resultLabel; // Update result label
            } else if (document.getElementById('contact-screen').classList.contains('active')) {
                document.getElementById('contact-title').innerText = t.contactTitle;
                document.getElementById('contact-subtitle').innerText = t.contactSubtitle;
                document.getElementById('contact-name').placeholder = t.contactName;
                document.getElementById('contact-email').placeholder = t.contactEmail;
                document.getElementById('contact-message').placeholder = t.contactMessage;
                document.getElementById('contact-submit').innerText = t.contactSubmit;
                document.getElementById('contact-back').innerText = t.contactBack; 
            } else if (document.getElementById('about-screen').classList.contains('active')) {
                document.getElementById('about-title').innerText = t.aboutTitle;
                if (curLang === 'tl') { // Only update content if language is Tagalog
                    document.getElementById('about-content').innerHTML = `<p>Maligayang pagdating sa <strong>Pinoy Food Personality Test</strong>! Ang interactive na pagsusulit na ito ay higit pa sa simpleng libangan; ito ay isang <strong>Propesyonal na Proyektong Pangkultura</strong> na naglalayong ipakita ang mayaman at sari-saring culinaryong pamana ng Pilipinas. Sa pamamagitan ng paghahalo ng kamangha-manghang mundo ng mga uri ng personalidad ng MBTI sa masasarap na lasa ng lutuing Pilipino, nag-aalok kami sa mga gumagamit ng isang natatanging personalized na kultural na karanasan.</p>
                    <p><strong>Ang Aming Misyon:</strong> Naniniwala kami na ang pagkain ay isang makapangyarihang daan patungo sa kultura. Ang pagsusulit na ito ay nagsisilbing isang nakakaengganyong plataporma upang ipakilala ang pandaigdigang madla sa lalim at iba't ibang uri ng mga pagkaing Pilipino, na nag-uugnay sa kanila sa kanilang sariling personalidad sa isang malalim at di malilimutang paraan. Tuklasin kung ang iyong mga katangian ay umaayon sa matapang na esensya ng <em>Kapeng Barako</em>, ang nakakapagpagaan na init ng <em>Champorado</em>, o ang dinamikong pinaghalong <em>Halo-Halo</em>.</p>
                    <p>Ang proyektong ito ay nilikha upang itaguyod ang mas malalim na pagpapahalaga sa gastronomiya at kultura ng Pilipinas, na nagbibigay ng isang edukasyonal ngunit hindi kapani-paniwalang masayang paglalakbay ng pagtuklas sa sarili. Ibahagi ang iyong natatanging personalidad ng pagkain ng Pinoy at K-Pop twin sa mundo!</p>`;
                }
                document.getElementById('about-back').innerText = t.aboutBack;
            } else if (document.getElementById('privacy-screen').classList.contains('active')) {
                document.getElementById('privacy-title').innerText = t.privacyTitle;
                document.getElementById('privacy-back').innerText = t.privacyBack;
            } else if (document.getElementById('terms-screen').classList.contains('active')) {
                document.getElementById('terms-title').innerText = t.termsTitle;
                document.getElementById('terms-back').innerText = t.termsBack;
            }
        }


        function startQuiz() {
            playClick();
            scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
            qIndex = 0;
            activeQuestions = [];
            answerHistory = []; // Clear history for a new quiz

            // Randomly select 4 questions from each type
            ['EI', 'SN', 'TF', 'JP'].forEach(type => {
                const shuffled = [...questionBank[type]].sort(() => Math.random() - 0.5);
                activeQuestions.push(...shuffled.slice(0, 4));
            });

            activeQuestions.sort(() => Math.random() - 0.5);

            document.getElementById('start-screen').classList.remove('active');
            document.getElementById('result-screen').classList.remove('active');
            document.getElementById('quiz-screen').classList.add('active');
            showQuestion(true);
            document.getElementById('back-btn').style.display = 'none'; // Hide back button initially
        }

        function showQuestion(resetOptions = true) {
            let q = activeQuestions[qIndex];
            document.getElementById('q-counter').innerText = `Q${qIndex + 1} / 16`;
            document.getElementById('question-text').innerText = (curLang === 'en') ? q.en : q.tl;
            
            const opts = uiText[curLang].options;
            for(let i=0; i<4; i++) {
                document.getElementById(`opt-${i}`).innerText = opts[i];
            }
            
            let percent = (qIndex / 16) * 100;
            document.getElementById('progress').style.width = percent + "%";

            // Show/hide back button
            document.getElementById('back-btn').style.display = (qIndex > 0) ? 'flex' : 'none';
        }

        function nextQuestion(point) {
            playClick(); // ✨ 클릭 소리 재생

            // Store current question's state before moving on
            let currentQuestion = activeQuestions[qIndex];
            answerHistory.push({
                qIndex: qIndex,
                point: point,
                type: currentQuestion.type,
                invert: currentQuestion.invert
            });

            let typeChars = currentQuestion.type.split('');
            let finalPoint = currentQuestion.invert ? -point : point;

            if (finalPoint > 0) scores[typeChars[0]] += Math.abs(finalPoint);
            else scores[typeChars[1]] += Math.abs(finalPoint);

            qIndex++;
            if (qIndex < 16) showQuestion();
            else showLoading();
        }

        function showLoading() {
            document.getElementById('quiz-screen').classList.remove('active');
            document.getElementById('loading-screen').classList.add('active');
            
            let percent = 0;
            const percentEl = document.getElementById('percentage');
            const fillEl = document.getElementById('loader-fill');
            
            const interval = setInterval(() => {
                percent++;
                percentEl.innerText = percent + "%";
                fillEl.style.width = percent + "%";
                
                if (percent >= 100) {
                    clearInterval(interval);
                    setTimeout(calculateResult, 500);
                }
            }, 30);
        }

        // New function to display result screen given an MBTI type
        function showResultScreen(mbtiType) {
            hideAllScreens();
            document.getElementById('result-screen').classList.add('active');
            playResult(mbtiType); // Play sound for result

            // Clear previous content of food-desc and mission-text
            document.getElementById('food-desc').innerText = "";
            document.getElementById('mission-text').innerText = "";

            const r = resultsData[mbtiType];
            
            document.getElementById('mbti-result').innerText = mbtiType; 
            document.getElementById('food-name').innerText = `${r.food} ${r.emoji}`;
            
            if (curLang === 'en') {
                document.getElementById('food-desc').innerText = r.enDesc;
                document.getElementById('mission-text').innerText = r.enAct;
                
                // Update new privacy and terms button text
                if (document.getElementById('privacy-btn')) {
                    document.getElementById('privacy-btn').innerText = uiText[curLang].privacyBtn;
                }
                if (document.getElementById('terms-btn')) {
                    document.getElementById('terms-btn').innerText = uiText[curLang].termsBtn;
                }

                if (document.getElementById('privacy-screen').classList.contains('active')) {
                    document.getElementById('privacy-title').innerText = uiText[curLang].privacyTitle;
                    document.getElementById('privacy-back').innerText = uiText[curLang].contactBack;
                } else if (document.getElementById('terms-screen').classList.contains('active')) {
                    document.getElementById('terms-title').innerText = uiText[curLang].termsTitle;
                    document.getElementById('terms-back').innerText = uiText[curLang].contactBack;
                }


            } else {
                document.getElementById('food-desc').innerText = r.tlDesc;
                document.getElementById('mission-text').innerText = r.tlAct;

                // Update new privacy and terms button text
                if (document.getElementById('privacy-btn')) {
                    document.getElementById('privacy-btn').innerText = uiText[curLang].privacyBtn;
                }
                if (document.getElementById('terms-btn')) {
                    document.getElementById('terms-btn').innerText = uiText[curLang].termsBtn;
                }

                if (document.getElementById('privacy-screen').classList.contains('active')) {
                    document.getElementById('privacy-title').innerText = uiText[curLang].privacyTitle;
                    document.getElementById('privacy-back').innerText = uiText[curLang].contactBack;
                } else if (document.getElementById('terms-screen').classList.contains('active')) {
                    document.getElementById('terms-title').innerText = uiText[curLang].termsTitle;
                    document.getElementById('terms-back').innerText = uiText[curLang].contactBack;
                }
            }
            
            document.getElementById('k-match').innerText = r.kstar;

            // Also update result-specific texts in case language was just switched
            updateUIText(); 
        }

        // Modified calculateResult to use showResultScreen
        function calculateResult() {
            document.getElementById('loading-screen').classList.remove('active');
            // document.getElementById('result-screen').classList.add('active'); // No longer needed here

            let mbti = "";
            mbti += (scores.E >= scores.I) ? "E" : "I";
            mbti += (scores.S >= scores.N) ? "S" : "N";
            mbti += (scores.T >= scores.F) ? "T" : "F";
            mbti += (scores.J >= scores.P) ? "J" : "P";
            currentMbti = mbti; // Store MBTI globally
            
            showResultScreen(currentMbti); // Call new function to display result
        }

        // Modified shareResult to copy the specific result link
        function shareResult() {
             playClick();
             const shareUrl = window.location.origin + window.location.pathname + '?mbti=' + currentMbti;
             navigator.clipboard.writeText(shareUrl).then(() => {
                 alert((curLang === 'en') ? "Result link copied to clipboard!" : "Na-copy na ang link ng 결과!");
             });
        }
        
        // --- Social Sharing Functions ---
        function shareToFacebook() {
            playClick();
            if (!currentMbti) {
                alert((curLang === 'en') ? "Please complete the test first to share your result!" : "Paki-kumpleto muna ang test bago mag-share ng resulta!");
                return;
            }
            const shareUrl = window.location.origin + window.location.pathname + '?mbti=' + currentMbti;
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        }

        function prevQuestion() {
            playClick();
            if (qIndex > 0) {
                qIndex--;
                const lastAnswer = answerHistory.pop(); // Remove the last answer from history

                // Revert score changes
                let typeChars = lastAnswer.type.split('');
                let finalPoint = lastAnswer.invert ? -lastAnswer.point : lastAnswer.point;

                if (finalPoint > 0) scores[typeChars[0]] -= Math.abs(finalPoint);
                else scores[typeChars[1]] -= Math.abs(finalPoint);

                showQuestion();
            }
        }

        // New function to check for MBTI in URL and display result
        function displayResultFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const mbtiFromUrl = urlParams.get('mbti');
            if (mbtiFromUrl && resultsData[mbtiFromUrl]) {
                currentMbti = mbtiFromUrl;
                showResultScreen(currentMbti);
            } else {
                // If no MBTI in URL or invalid, show start screen
                showStartScreen();
            }
        }

// --- Screen Navigation Functions ---
        function hideAllScreens() {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
        }

        function showScreen(screenId) {
            hideAllScreens();
            document.getElementById(screenId).classList.add('active');
            playClick();
        }

        function showStartScreen() {
            showScreen('start-screen');
            updateUIText(); // Update UI text when returning to start screen
        }

        function showAbout() {
            const modal = document.getElementById('about-modal') || document.getElementById('about-screen');
            if (modal) {
                hideAllScreens();
                modal.style.display = 'flex';
            }
        }
        function hideAbout() {
            const modal = document.getElementById('about-modal') || document.getElementById('about-screen');
            if (modal) {
                modal.style.display = 'none';
                showStartScreen(); // Go back to start screen after hiding
            }
        }

        function showContactScreen() {
            showScreen('contact-screen');
            updateUIText(); // Update UI text for contact screen
        }
        
        function showPrivacyScreen() {
            showScreen('privacy-screen');
            updateUIText();
        }

        function showTermsScreen() {
            showScreen('terms-screen');
            updateUIText();
        }

        // Call this on page load to check for share links
        displayResultFromUrl();