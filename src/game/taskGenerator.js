
import { getSpellingTask } from '../data/spellingWords.js';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateOptions = (correctAnswer, minOpt, maxOpt, count = 4) => {
    const options = new Set([correctAnswer]);
    while (options.size < count) {
        let opt = correctAnswer + randomInt(-4, 4);
        if (opt < minOpt) opt = minOpt;
        if (opt > maxOpt) opt = maxOpt;
        options.add(opt);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
};

export const generateTask = (taskId) => {
    const id = Date.now().toString() + randomInt(1, 1000);
    let tags = [];
    let equation = '';
    let text = '';
    let correctAnswer = 0;
    let options = [];
    let clockTime = null;

    // --- Category 1: Taluppfattning ---
    if (taskId === 'talraden_0_10') {
        const start = randomInt(1, 7);
        const seq = [start, start + 1, start + 2, start + 3];
        const hiddenIndex = randomInt(0, 3);
        correctAnswer = seq[hiddenIndex];
        seq[hiddenIndex] = '__';
        tags = ['Talraden', '0-10'];
        equation = seq.join(', ');
        text = 'Vilket tal saknas?';
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'talraden_0_20') {
        const start = randomInt(10, 17);
        const seq = [start, start + 1, start + 2, start + 3];
        const hiddenIndex = randomInt(0, 3);
        correctAnswer = seq[hiddenIndex];
        seq[hiddenIndex] = '__';
        tags = ['Talraden', '0-20'];
        equation = seq.join(', ');
        text = 'Vilket tal saknas?';
        options = generateOptions(correctAnswer, 10, 20, 4);
    }
    else if (taskId === 'dela_upp_tal') {
        const part = randomInt(0, 10);
        correctAnswer = 10 - part;
        tags = ['10-kamrater', 'Dela upp'];
        equation = `${part} + __ = 10`;
        text = 'Vem är 10-kamraten?';
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'dubbelt_halften_dubbelt') {
        const base = randomInt(1, 5);
        correctAnswer = base * 2;
        tags = ['Dubbelt'];
        equation = `${base} + ${base} = __`;
        text = `Vad är dubbelt av ${base}?`;
        options = generateOptions(correctAnswer, 2, 10, 4);
    }
    else if (taskId === 'dubbelt_halften_halften') {
        const base = randomInt(1, 5) * 2;
        correctAnswer = base / 2;
        tags = ['Hälften'];
        equation = `Hälften av ${base}`;
        text = `Vad är hälften av ${base}?`;
        options = generateOptions(correctAnswer, 1, 5, 4);
    }
    else if (taskId === 'udda_jamna_jamna') {
        correctAnswer = randomInt(1, 4) * 2;
        tags = ['Jämna tal'];
        equation = 'Jämnt tal';
        text = `Vilket tal är jämnt?`;
        options = [correctAnswer, randomInt(1, 4) * 2 + 1, randomInt(5, 8) * 2 + 1, randomInt(0, 2) * 2 + 1].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'udda_jamna_udda') {
        correctAnswer = randomInt(1, 4) * 2 + 1;
        tags = ['Udda tal'];
        equation = 'Udda tal';
        text = `Vilket tal är udda?`;
        options = [correctAnswer, randomInt(1, 4) * 2, randomInt(5, 8) * 2, randomInt(0, 2) * 2].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'positionssystemet') {
        const tiotal = randomInt(1, 9);
        const ental = randomInt(1, 9);
        correctAnswer = tiotal * 10 + ental;
        tags = ['Positionssystemet', '10-tal & Ental'];
        equation = `${tiotal} tiotal, ${ental} ental`;
        text = `Vilket tal är detta?`;
        options = generateOptions(correctAnswer, 10, 99, 4);
    }
    else if (taskId === 'del_av_helhet_halv') {
        correctAnswer = 2;
        tags = ['Del av helhet'];
        equation = 'En halv';
        text = `Hur många delar delas tårtan i?`;
        options = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'del_av_helhet_fjardedel') {
        correctAnswer = 4;
        tags = ['Del av helhet'];
        equation = 'En fjärdedel';
        text = `Hur många delar delas tårtan i?`;
        options = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
    }

    // --- Category 2: Aritmetik ---
    else if (taskId === 'addition_0_10') {
        const a = randomInt(0, 8);
        const b = randomInt(0, 10 - a);
        correctAnswer = a + b;
        tags = ['Addition', '0-10'];
        equation = `${a} + ${b} = __`;
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'addition_0_10_ord') {
        const a = randomInt(0, 8);
        const b = randomInt(0, 10 - a);
        correctAnswer = a + b;
        tags = ['Addition', 'Problemlösning'];
        equation = `${a} + ${b} = __`;
        const names = ['Ali', 'Ida', 'Leo', 'Maja', 'Tim'];
        const currentName = names[randomInt(0, names.length - 1)];
        text = `${currentName} har ${a} äpplen och får ${b} till. Hur många har ${currentName} nu?`;
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'addition_0_20') {
        const a = randomInt(5, 15);
        const b = randomInt(1, 20 - a);
        correctAnswer = a + b;
        tags = ['Addition', '0-20'];
        equation = `${a} + ${b} = __`;
        options = generateOptions(correctAnswer, 0, 20, 4);
    }
    else if (taskId === 'subtraktion_0_10') {
        const a = randomInt(1, 10);
        const b = randomInt(0, a);
        correctAnswer = a - b;
        tags = ['Subtraktion', '0-10'];
        equation = `${a} - ${b} = __`;
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'subtraktion_0_20') {
        const a = randomInt(10, 20);
        const b = randomInt(0, 10);
        correctAnswer = a - b;
        tags = ['Subtraktion', '0-20'];
        equation = `${a} - ${b} = __`;
        options = generateOptions(correctAnswer, 0, 20, 4);
    }
    else if (taskId === 'multiplikation_sma') {
        const a = randomInt(1, 10);
        const b = randomInt(1, 10);
        correctAnswer = a * b;
        tags = ['Multiplikation', '1-10'];
        equation = `${a} × ${b} = __`;
        options = generateOptions(correctAnswer, 1, 100, 4);
    }
    else if (taskId === 'division_sma') {
        const a = randomInt(1, 10);
        const b = randomInt(1, 10);
        const c = a * b;
        correctAnswer = a;
        tags = ['Division'];
        equation = `${c} ÷ ${b} = __`;
        options = generateOptions(correctAnswer, 1, 10, 4);
    }
    else if (taskId === 'huvudrakning') {
        const a = randomInt(5, 10);
        const b = randomInt(5, 10);
        correctAnswer = a + b;
        tags = ['Huvudräkning', 'Addition'];
        equation = `${a} + ${b} = __`;
        text = 'Räkna i huvudet!';
        options = generateOptions(correctAnswer, 10, 20, 4);
    }
    else if (taskId === 'rimlighetsbedomning') {
        const est = randomInt(10, 20);
        correctAnswer = est;
        tags = ['Rimlighetsbedömning'];
        equation = `5 + 6 = ?`;
        text = `Är svaret ungefär 10 eller 100?`;
        options = [10, 100, 20, 50].sort(() => Math.random() - 0.5);
        correctAnswer = 10;
    }

    // --- Category 3: Algebra ---
    else if (taskId === 'likhetstecknet') {
        const a = randomInt(1, 4);
        const b = randomInt(1, 4);
        const sum = a + b;
        const c = randomInt(1, sum - 1);
        correctAnswer = sum - c;
        tags = ['Algebra', 'Likhetstecknet'];
        equation = `${a} + ${b} = ${c} + __`;
        text = 'Gör så det blir lika mycket på båda sidor.';
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'obekanta_tal') {
        const a = randomInt(1, 5);
        const sum = randomInt(a + 1, 10);
        correctAnswer = sum - a;
        tags = ['Algebra', 'Obekanta tal'];
        equation = `${a} + 🔲 = ${sum}`;
        text = 'Vilket tal gömmer sig i lådan?';
        options = generateOptions(correctAnswer, 0, 10, 4);
    }
    else if (taskId === 'monster_tal') {
        const start = randomInt(2, 4);
        const step = 2; // Hoppa 2 steg 
        correctAnswer = start + step * 3;
        tags = ['Mönster i tal', 'Hoppa'];
        equation = `${start}, ${start + step}, ${start + step * 2}, __`;
        text = 'Vilket tal kommer sen i mönstret?';
        options = generateOptions(correctAnswer, 0, 20, 4);
    }
    else if (taskId === 'geometriska_monster') {
        const shapesList = [["🔴", "🔵", "🟡", "🟢"], ["🟥", "🟦", "🟨", "🟩"], ["🔺", "🔻", "🔹", "🔸"], ["⭐", "🌙", "☁️", "☀️"]];
        const shapes = shapesList[randomInt(0, shapesList.length - 1)];
        const a = shapes[0];
        const b = shapes[1];
        correctAnswer = a;
        tags = ['Geometri', 'Mönster'];
        equation = `${a} ${b} ${a} ${b} __`;
        text = 'Vilken form kommer sen?';
        options = shapes.sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'instruktioner') {
        const fram = randomInt(2, 5);
        const bak = randomInt(1, fram - 1);
        correctAnswer = fram + bak;
        tags = ['Programmering', 'Instruktioner'];
        equation = `Gå ${fram} steg fram, gå ${bak} steg bak`;
        text = `Hur många steg rör du dig totalt?`;
        options = generateOptions(correctAnswer, fram, fram + bak + 2, 4);
    }

    // --- Category 4: Geometri ---
    else if (taskId === '2D_former') {
        const shapes = [
            { s: 'Cirkel', icon: '🔵' },
            { s: 'Kvadrat', icon: '🟥' },
            { s: 'Triangel', icon: '🔺' },
            { s: 'Rektangel', icon: '📏' },
            { s: 'Stjärna', icon: '⭐' }
        ];
        const shape = shapes[randomInt(0, shapes.length - 1)];
        correctAnswer = shape.s;
        tags = ['Geometri', '2D-former'];
        equation = shape.icon;
        text = 'Vilken form är detta?';

        const wrongOpt = shapes.filter(x => x.s !== shape.s).map(x => x.s).sort(() => Math.random() - 0.5).slice(0, 3);
        options = [correctAnswer, ...wrongOpt].sort(() => Math.random() - 0.5);
    }
    else if (taskId === '3D_former') {
        const shapes = ['Klot', 'Kub', 'Cylinder', 'Kon'];
        correctAnswer = shapes[randomInt(0, shapes.length - 1)];
        tags = ['Geometri', '3D-former'];
        equation = `📦 ⚽ 🥫 🍦`;
        text = `Vilket objekt är ett ${correctAnswer}?`;
        options = ['⚽', '📦', '🥫', '🍦'].sort(() => Math.random() - 0.5);
        if (correctAnswer === 'Klot') correctAnswer = '⚽';
        if (correctAnswer === 'Kub') correctAnswer = '📦';
        if (correctAnswer === 'Cylinder') correctAnswer = '🥫';
        if (correctAnswer === 'Kon') correctAnswer = '🍦';
    }
    else if (taskId === 'symmetri') {
        const sym = ['Fjäril 🦋', 'Hjärta ❤️', 'Snöflinga ❄️', 'Cirkel 🔵'];
        const asym = ['Bil 🚙', 'Sko 👟', 'Gitarr 🎸', 'Buss 🚌', 'Nyckel 🔑'];

        correctAnswer = sym[randomInt(0, sym.length - 1)];
        const w1 = asym[randomInt(0, asym.length - 1)];
        const w2 = asym.filter(x => x !== w1)[randomInt(0, asym.length - 2)];
        const w3 = asym.filter(x => x !== w1 && x !== w2)[randomInt(0, asym.length - 3)];

        tags = ['Geometri', 'Symmetri'];
        equation = [correctAnswer, w1, w2, w3].map(x => x.split(' ')[1]).join(' ');
        text = 'Vilken bild är mest symmetrisk (lika på båda sidor)?';
        options = [correctAnswer, w1, w2, w3].sort(() => Math.random() - 0.5);
    }

    // --- Category 5: Mätning och tid ---
    else if (taskId === 'klockan_hel') {
        const timme = randomInt(1, 12);
        correctAnswer = `${timme}:00`;
        tags = ['Tid', 'Klockan'];
        equation = `🕒`;
        text = `Vad är klockan?`;

        let minOpt = timme - 2;
        if (minOpt < 1) minOpt = 1;

        const optionsSet = new Set([correctAnswer]);
        while (optionsSet.size < 4) {
            let fakeHour = timme + randomInt(-3, 3);
            if (fakeHour < 1) fakeHour = fakeHour + 12;
            if (fakeHour > 12) fakeHour = fakeHour - 12;
            optionsSet.add(`${fakeHour}:00`);
        }

        options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
        clockTime = correctAnswer;
    }
    else if (taskId === 'klockan_halv') {
        const timme = randomInt(1, 12);
        const nextTimme = timme === 12 ? 1 : timme + 1;
        correctAnswer = `Halv ${nextTimme}`;
        tags = ['Tid', 'Klockan'];
        equation = `🕒`;
        text = `Vad är klockan?`;
        clockTime = `${timme}:30`;

        const optionsSet = new Set([correctAnswer]);
        while (optionsSet.size < 4) {
            let fakeHour = nextTimme + randomInt(-3, 3);
            if (fakeHour < 1) fakeHour = fakeHour + 12;
            if (fakeHour > 12) fakeHour = fakeHour - 12;
            optionsSet.add(`Halv ${fakeHour}`);
        }
        options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'klockan_kvart_20') {
        const timme = randomInt(1, 12);
        const nextTimme = timme === 12 ? 1 : timme + 1;

        const typer = [
            { min: "15", txt: `Kvart över ${timme}` },
            { min: "45", txt: `Kvart i ${nextTimme}` },
            { min: "20", txt: `20 över ${timme}` },
            { min: "40", txt: `20 i ${nextTimme}` }
        ];
        const val = typer[randomInt(0, typer.length - 1)];

        correctAnswer = val.txt;
        clockTime = `${timme}:${val.min}`;
        tags = ['Tid', 'Klockan'];
        equation = `🕒`;
        text = 'Vad är klockan?';

        const wrongOptions = [
            `Kvart över ${nextTimme}`,
            `Kvart i ${timme}`,
            `20 över ${nextTimme}`,
            `20 i ${timme}`,
            `Halv ${nextTimme}`
        ].sort(() => Math.random() - 0.5);

        options = [correctAnswer, wrongOptions[0], wrongOptions[1], wrongOptions[2]].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'klockan_5_iover') {
        const timme = randomInt(1, 12);
        const nextTimme = timme === 12 ? 1 : timme + 1;

        const typer = [
            { min: "05", txt: `5 över ${timme}` },
            { min: "55", txt: `5 i ${nextTimme}` },
            { min: "10", txt: `10 över ${timme}` },
            { min: "50", txt: `10 i ${nextTimme}` },
            { min: "25", txt: `5 i halv ${nextTimme}` },
            { min: "35", txt: `5 över halv ${nextTimme}` }
        ];
        const val = typer[randomInt(0, typer.length - 1)];

        correctAnswer = val.txt;
        clockTime = `${timme}:${val.min}`;
        tags = ['Tid', 'Klockan'];
        equation = `🕒`;
        text = 'Vad är klockan?';

        const wrongOptions = [
            `5 över ${nextTimme}`,
            `5 i ${timme}`,
            `10 över ${nextTimme}`,
            `10 i ${timme}`,
            `5 i halv ${timme}`,
            `5 över halv ${timme}`,
            `Kvart över ${timme}`
        ].sort(() => Math.random() - 0.5);

        options = [correctAnswer, wrongOptions[0], wrongOptions[1], wrongOptions[2]].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'mata_langd') {
        const a = randomInt(1, 5);
        const b = randomInt(6, 12);
        correctAnswer = b > a ? 'Den blåa' : 'Den röda';
        tags = ['Mätning', 'Längd'];
        equation = `Röd: ${a} cm, Blå: ${b} cm`;
        text = 'Vilken penna är längst?';
        options = ['Den röda', 'Den blåa'].sort(() => Math.random() - 0.5).concat(['Lika långa', 'Går ej veta']);
    }
    else if (taskId === 'mata_volym') {
        const largest = [{ n: 'Hink 🪣', v: 10 }, { n: 'Badkar 🛁', v: 100 }, { n: 'Tunna 🛢️', v: 50 }];
        const small = ['Glas 🥤', 'Skål 🥣', 'Sked 🥄', 'Kopp ☕', 'Mugg 🥛'];

        const ans = largest[randomInt(0, largest.length - 1)];
        correctAnswer = ans.n;
        tags = ['Mätning', 'Volym'];

        const w1 = small[randomInt(0, small.length - 1)];
        const w2 = small.filter(x => x !== w1)[randomInt(0, small.length - 2)];
        const w3 = small.filter(x => x !== w1 && x !== w2)[randomInt(0, small.length - 3)];

        equation = [correctAnswer, w1, w2, w3].map(x => x.split(' ')[1]).sort(() => Math.random() - 0.5).join(' ');
        text = 'Vilken rymmer mest vatten?';
        options = [correctAnswer, w1, w2, w3].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'mata_vikt') {
        const heavy = ['Elefant 🐘', 'Björn 🐻', 'Ko 🐄', 'Val 🐳'];
        const light = ['Hund 🐕', 'Katt 🐈', 'Mus 🐭', 'Fågel 🐦', 'Kanin 🐇'];

        correctAnswer = heavy[randomInt(0, heavy.length - 1)];
        tags = ['Mätning', 'Vikt'];

        const w1 = light[randomInt(0, light.length - 1)];
        const w2 = light.filter(x => x !== w1)[randomInt(0, light.length - 2)];
        const w3 = light.filter(x => x !== w1 && x !== w2)[randomInt(0, light.length - 3)];

        equation = [correctAnswer, w1, w2, w3].map(x => x.split(' ')[1]).sort(() => Math.random() - 0.5).join(' ');
        text = 'Vilket djur är tyngst?';
        options = [correctAnswer, w1, w2, w3].sort(() => Math.random() - 0.5);
    }

    // --- Category 6: Statistik ---
    else if (taskId === 'avlasa_tabeller') {
        const frukter = [
            { n: 'Äpple 🍎', c: randomInt(3, 8) },
            { n: 'Banan 🍌', c: randomInt(1, 5) },
            { n: 'Päron 🍐', c: randomInt(4, 9) },
            { n: 'Apelsin 🍊', c: randomInt(2, 6) }
        ].sort(() => Math.random() - 0.5).slice(0, 2);

        const f = frukter[randomInt(0, 1)];
        correctAnswer = f.c;
        tags = ['Statistik', 'Avläsa'];
        equation = `${frukter[0].n.split(' ')[1]} = ${frukter[0].c}, ${frukter[1].n.split(' ')[1]} = ${frukter[1].c}`;
        text = `Hur många gillar ${f.n.split(' ')[0]}?`;
        options = [frukter[0].c, frukter[1].c, frukter[0].c + 1, frukter[1].c + 1].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'skapa_diagram' || taskId === 'sortera_data') {
        const a = randomInt(2, 5);
        const b = randomInt(1, 4);
        correctAnswer = a + b;
        tags = ['Statistik', 'Räkna antal'];
        equation = `Röda bilar: ${a}, Blåa bilar: ${b}`;
        text = 'Hur många bilar är det sammanlagt?';
        options = generateOptions(correctAnswer, 0, 10, 4);
    }

    // --- Category 7: Problemlösning ---
    else if (taskId === 'raknehandelser_addition' || taskId === 'valja_raknesatt_addition') {
        const start = randomInt(5, 10);
        const change = randomInt(1, 4);
        correctAnswer = start + change;
        equation = `Sammanlagt`;
        text = `Leo har ${start} mynt. Han hittar ${change} till. Hur många har han nu?`;
        tags = ['Problemlösning', 'Addition'];
        options = generateOptions(correctAnswer, 0, 15, 4);
    }
    else if (taskId === 'raknehandelser_subtraktion' || taskId === 'valja_raknesatt_subtraktion') {
        const start = randomInt(5, 10);
        const change = randomInt(1, 4);
        correctAnswer = start - change;
        equation = `Hur många kvar?`;
        text = `Maja har ${start} kakor. Hon äter upp ${change}. Hur många finns kvar?`;
        tags = ['Problemlösning', 'Subtraktion'];
        options = generateOptions(correctAnswer, 0, 15, 4);
    }

    // ==============================================
    // --- MELLANSTADIET (ÅK 4-6) CATEGORIES ---
    // ==============================================

    // --- AK4: Taluppfattning ---
    else if (taskId === 'rationella_tal_brak') {
        const scenarios = [
            { iconMatch: '🍕', iconOther: '🍽️', text: (tal, nev) => `En pizza delas i ${nev} bitar. ${tal} bitar ligger på tallriken. Hur stor del visar tallriken?` },
            { iconMatch: '🍎', iconOther: '🍏', text: (tal, nev) => `Du har ${nev} frukter. Hur stor del av alla frukter är RÖDA äpplen?` },
            { iconMatch: '🔮', iconOther: '🎾', text: (tal, nev) => `Du har ${nev} bollar. Hur stor del är lila glaskulor?` },
            { iconMatch: '🍫', iconOther: '⬜', text: (tal, nev) => `En chokladkaka har ${nev} bitar. ${tal} är kvar. Hur stor del är choklad?` }
        ];

        const nev = randomInt(3, 8); // Keep it max 8 so emojis fit well on screen
        const tal = randomInt(1, nev - 1);
        const sc = scenarios[randomInt(0, scenarios.length - 1)];

        correctAnswer = `${tal}/${nev}`;
        tags = ['Bråk', 'Vardagsproblem'];

        let eq = '';
        for (let i = 0; i < tal; i++) eq += sc.iconMatch;
        for (let i = 0; i < nev - tal; i++) eq += sc.iconOther;

        equation = eq;
        text = sc.text(tal, nev);

        let wrongOpts = new Set([`${tal + 1}/${nev}`, `1/${nev}`, `${tal}/${nev + 1}`, `${tal - 1}/${nev}`, `${tal}/${nev - 1}`]);
        wrongOpts.delete(correctAnswer);
        let opts = Array.from(wrongOpts).filter(o => {
            let parts = o.split('/');
            return parseInt(parts[0]) > 0 && parseInt(parts[1]) > 0 && parseInt(parts[0]) < parseInt(parts[1]);
        });

        while (opts.length < 3) {
            let rTop = randomInt(1, 9);
            let rBot = randomInt(rTop + 1, 10);
            if (`${rTop}/${rBot}` !== correctAnswer && !opts.includes(`${rTop}/${rBot}`)) {
                opts.push(`${rTop}/${rBot}`);
            }
        }

        options = [correctAnswer, opts[0], opts[1], opts[2]].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'brak_addition' || taskId === 'brak_subtraktion') {
        const isAddition = taskId === 'brak_addition';
        const denoms = [4, 5, 8, 10, 100];
        const nev = denoms[randomInt(0, denoms.length - 1)];
        let a, b;

        if (isAddition) {
            a = randomInt(1, Math.floor(nev / 2));
            b = randomInt(1, Math.floor(nev / 2));
            correctAnswer = `${a + b}/${nev}`;
            equation = `${a}/${nev} + ${b}/${nev} = __`;
            tags = ['Bråk', 'Addition'];
            options = [`${a + b}/${nev}`, `${a + b + 1}/${nev}`, `${a + b - 1}/${nev > 4 ? nev : nev + 1}`, `${Math.abs(a - b)}/${nev}`].sort(() => Math.random() - 0.5);
        } else {
            a = randomInt(Math.floor(nev / 2), nev - 1);
            b = randomInt(1, a - 1);
            correctAnswer = `${a - b}/${nev}`;
            equation = `${a}/${nev} - ${b}/${nev} = __`;
            tags = ['Bråk', 'Subtraktion'];
            options = [`${a - b}/${nev}`, `${a - b + 1}/${nev}`, `${a + b}/${nev}`, `${Math.abs(a - b - 1)}/${nev}`].sort(() => Math.random() - 0.5);
        }
        text = isAddition ? 'Addera bråken' : 'Subtrahera bråken';
    }
    else if (taskId === 'brak_multiplikation') {
        const aTop = randomInt(1, 4);
        const aBot = randomInt(2, 5);
        const bTop = randomInt(1, 4);
        const bBot = randomInt(2, 5);
        correctAnswer = `${aTop * bTop}/${aBot * bBot}`;
        tags = ['Bråk', 'Multiplikation'];
        equation = `${aTop}/${aBot} × ${bTop}/${bBot} = __`;
        text = 'Multiplicera bråken';

        const simplify = (str) => {
            if (!str.includes('/')) return str;
            const [t, b] = str.split('/');
            return t === b ? '1' : str;
        };

        correctAnswer = simplify(correctAnswer);

        const opts = new Set([
            correctAnswer,
            simplify(`${aTop * bBot}/${aBot * bTop}`), // common mistake, flipped
            simplify(`${aTop + bTop}/${aBot + bBot}`), // common mistake, adding
            simplify(`${aTop * bTop}/${aBot + bBot}`)  // common mistake
        ]);

        while (opts.size < 4) {
            let filler = `${randomInt(1, 10)}/${randomInt(2, 20)}`;
            opts.add(simplify(filler));
        }
        options = Array.from(opts).slice(0, 4).sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'brak_division') {
        const aTop = randomInt(1, 4);
        const aBot = randomInt(2, 5);
        const bTop = randomInt(1, 4);
        const bBot = randomInt(2, 5);
        correctAnswer = `${aTop * bBot}/${aBot * bTop}`;
        tags = ['Bråk', 'Division'];
        equation = `${aTop}/${aBot} ÷ ${bTop}/${bBot} = __`;
        text = 'Dividera bråken';

        const simplify = (str) => {
            if (!str.includes('/')) return str;
            const [t, b] = str.split('/');
            return t === b ? '1' : str;
        };

        correctAnswer = simplify(correctAnswer);

        const opts = new Set([
            correctAnswer,
            simplify(`${aTop * bTop}/${aBot * bBot}`), // common mistake, direct multiply
            simplify(`${aTop + bTop}/${aBot + bBot}`),
            simplify(`${aBot * bBot}/${aTop * bTop}`)
        ]);

        while (opts.size < 4) {
            let filler = `${randomInt(1, 10)}/${randomInt(2, 20)}`;
            opts.add(simplify(filler));
        }
        options = Array.from(opts).slice(0, 4).sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'multiplikation_stora') {
        const a = randomInt(10, 50);
        const b = randomInt(2, 10);
        correctAnswer = a * b;
        tags = ['Multiplikation', 'Stora tal'];
        equation = `${a} × ${b} = __`;
        options = generateOptions(correctAnswer, correctAnswer - 50, correctAnswer + 50, 4);
    }
    else if (taskId === 'division_stora') {
        const b = randomInt(2, 10);
        const maxA = Math.floor(100 / b); // Ensure c (a * b) <= 100
        const a = randomInt(2, maxA);
        const c = a * b;
        correctAnswer = a;
        tags = ['Division', 'Upp till 100'];
        equation = `${c} ÷ ${b} = __`;
        const minOpt = Math.max(1, a - 5);
        options = generateOptions(correctAnswer, minOpt, a + 5, 4);
    }
    else if (taskId === 'rationella_tal_negativa') {
        const base = randomInt(-10, -1);
        const add = randomInt(5, 15);
        correctAnswer = base + add;
        tags = ['Negativa tal'];
        equation = `${base} + ${add} = __`;
        text = `Det är ${base} grader ute. Temperaturen stiger med ${add} grader. Hur varmt blir det?`;
        options = generateOptions(correctAnswer, -10, 10, 4);
    }
    else if (taskId === 'procent') {
        const full = [100, 200, 500][randomInt(0, 2)];
        const proc = [10, 25, 50][randomInt(0, 2)];
        correctAnswer = (full * proc) / 100;
        tags = ['Procent'];
        equation = `${proc}% av ${full}`;
        text = `Hur mycket är ${proc} procent av ${full} kr?`;
        options = generateOptions(correctAnswer, 0, full, 4);
    }
    else if (taskId === 'decimaltal') {
        const a = (randomInt(1, 9) + randomInt(1, 9) / 10).toFixed(1);
        const b = (randomInt(1, 9) + randomInt(1, 9) / 10).toFixed(1);
        correctAnswer = (parseFloat(a) + parseFloat(b)).toFixed(1);
        tags = ['Decimaltal'];
        equation = `${a} + ${b} = __`;
        text = `Addera decimaltalen!`;
        options = [(parseFloat(a) + parseFloat(b) + 1).toFixed(1), (parseFloat(a) + parseFloat(b) - 1).toFixed(1), (parseFloat(a) + parseFloat(b) + 0.5).toFixed(1), correctAnswer].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'historiska_talsystem') {
        const rome = [{ r: 'I', a: 1 }, { r: 'V', a: 5 }, { r: 'X', a: 10 }, { r: 'L', a: 50 }, { r: 'C', a: 100 }];
        const choice = rome[randomInt(0, rome.length - 1)];
        correctAnswer = choice.r;
        tags = ['Romerska siffror'];
        equation = `I = 1, V = 5, X = 10, L = 50, C = 100`;
        text = `Vilken romersk siffra betyder ${choice.a}?`;

        const wrongOpt = rome.filter(x => x.r !== choice.r).map(x => x.r).sort(() => Math.random() - 0.5).slice(0, 3);
        options = [correctAnswer, ...wrongOpt].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'prioriteringsregler') {
        const a = randomInt(2, 5);
        const b = randomInt(2, 5);
        const c = randomInt(2, 5);
        correctAnswer = a + (b * c);
        tags = ['Prioritering'];
        equation = `${a} + ${b} × ${c} = __`;
        text = `Kom ihåg att multiplikation räknas före addition!`;
        options = generateOptions(correctAnswer, 5, 30, 4);
        if (!options.includes((a + b) * c)) {
            const wrongIndex = options.findIndex(opt => opt !== correctAnswer);
            if (wrongIndex !== -1) {
                options[wrongIndex] = (a + b) * c; // Inject common mistake
                options = options.sort(() => Math.random() - 0.5);
            }
        }
    }
    else if (taskId === 'berakningsmetoder' || taskId === 'digitala_verktyg') {
        const a = randomInt(150, 400);
        const b = randomInt(150, 400);
        correctAnswer = a + b;
        tags = ['Algoritmer (Uppställning)'];
        equation = `${a} + ${b} = __`;
        text = `Större tals addition`;
        options = generateOptions(correctAnswer, 300, 800, 4);
    }
    else if (taskId === 'komplex_rimlighet') {
        const aBase = randomInt(1, 4) * 100;
        const bBase = randomInt(1, 4) * 100;
        const a = aBase + randomInt(-5, 5);
        const b = bBase + randomInt(-5, 5);

        correctAnswer = aBase + bBase;
        tags = ['Överslagsräkning'];
        equation = `${a} + ${b} ≈ ?`;
        text = `Kräver inte exakt svar. Vad är det ungefär?`;

        const w1 = correctAnswer - 100 > 0 ? correctAnswer - 100 : correctAnswer + 300;
        const w2 = correctAnswer + 100;
        const w3 = correctAnswer + 200;
        options = [correctAnswer, w1, w2, w3].sort(() => Math.random() - 0.5);
    }

    // --- AK4: Algebra ---
    else if (taskId === 'ekvationer' || taskId === 'ekvationslosning') {
        const x = randomInt(2, 10);
        const multiplier = randomInt(2, 4);
        correctAnswer = x;
        tags = ['Ekvation'];
        equation = `${multiplier}x = ${multiplier * x}`;
        text = `Vad är x?`;
        options = generateOptions(correctAnswer, 1, 15, 4);
    }
    else if (taskId === 'variabler') {
        const x = randomInt(2, 5);
        const y = x * 2 + 1;
        correctAnswer = y;
        tags = ['Variabler'];
        equation = `y = 2x + 1. Om x = ${x}, vad är y?`;
        text = `Sätt in x i uttrycket!`;
        options = generateOptions(correctAnswer, 0, 15, 4);
    }
    else if (taskId === 'uttrycka_monster') {
        const f = randomInt(1, 4);
        correctAnswer = f * 16;
        tags = ['Talföljd'];
        equation = `${f}, ${f * 2}, ${f * 4}, ${f * 8}, __`;
        text = `Vilket tal kommer sen?`;
        options = generateOptions(correctAnswer, 10, 70, 4);
    }
    else if (taskId === 'algoritmer') {
        correctAnswer = 4;
        tags = ['Programmering (Loopar)'];
        equation = `Repetera 4 gånger: (Gå fram 1 steg)`;
        text = `Hur många steg går roboten framåt?`;
        options = [1, 2, 4, 8].sort(() => Math.random() - 0.5);
    }

    // --- AK4: Geometri ---
    else if (taskId === 'nya_objekt') {
        const objs = [
            { n: "Cylinder", text: "En form med två runda lock och en böjd sida." },
            { n: "Klot", text: "En helt rund form, utan hörn eller kanter." },
            { n: "Kub", text: "Ett objekt med sex lika stora kvadratiska sidor." },
            { n: "Pyramid", text: "En bas i botten och sidor som möts i en spets." }
        ];
        const val = objs[randomInt(0, objs.length - 1)];
        correctAnswer = val.n;
        tags = ['Objekt'];
        equation = val.text;
        text = `Vilket objekt beskrivs?`;
        options = ["Kub", "Pyramid", "Cylinder", "Klot"].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'konstruktion') {
        const types = [
            { n: "90°", t: "Rät", eq: "L" },
            { n: "Mindre än 90°", t: "Spetsig", eq: "∠" },
            { n: "Mer än 90°", t: "Trubbig", eq: "\\_" }
        ];
        const val = types[randomInt(0, types.length - 1)];
        correctAnswer = val.n;
        tags = ['Vinklar'];
        equation = val.eq;
        text = `Hur stor är en ${val.t.toLowerCase()} vinkel?`;
        options = ["90°", "Mindre än 90°", "Mer än 90°", "180°"].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'enhetsbyten') {
        const m = randomInt(1, 5);
        correctAnswer = m * 100;
        tags = ['Enhetsbyten'];
        equation = `${m} meter = __ cm`;
        text = `Hur många centimeter går det på ${m} meter?`;
        options = [m * 10, m * 100, m * 1000, m].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'area_omkrets') {
        const b = randomInt(3, 8);
        const h = randomInt(2, 6);
        correctAnswer = b * h;
        tags = ['Area'];
        equation = `Rektangel: Bas = ${b} cm, Höjd = ${h} cm`;
        text = `Vad är arean? (b × h)`;
        options = generateOptions(correctAnswer, 5, 50, 4);
    }
    else if (taskId === 'skala') {
        correctAnswer = 1000;
        tags = ['Skala'];
        equation = `Skala 1:100. Modellen är 10 cm.`;
        text = `Hur lång är den i verkligheten (i cm)?`;
        options = [10, 100, 1000, 10000].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'tessellation') {
        correctAnswer = "Ja";
        tags = ['Symmetri'];
        equation = `Tessellation (Mönster)`;
        text = `Kan pusselbitar som är exakt likadana kvadrater täcka en yta utan mellanrum?`;
        options = ["Ja", "Nej"].sort(() => Math.random() - 0.5);
    }

    // --- AK4: Statistik ---
    else if (taskId === 'sannolikhet') {
        const targ = randomInt(1, 6);
        correctAnswer = "1/6";
        tags = ['Sannolikhet'];
        equation = `Du kastar en vanlig tärning 🎲`;
        text = `Vad är chansen att slå en ${targ}:a?`;
        options = ["1/2", "1/4", "1/6", "1/10"].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'kombinatorik') {
        const scenarios = [
            { i1: "Tröjor", i2: "Byxor" },
            { i1: "Glassmaker", i2: "Toppings" },
            { i1: "Bilar", i2: "Färger" }
        ];
        const sc = scenarios[randomInt(0, scenarios.length - 1)];
        const a = randomInt(2, 4);
        const b = randomInt(2, 4);
        correctAnswer = a * b;
        tags = ['Kombinatorik'];
        equation = `${a} ${sc.i1}, ${b} ${sc.i2}`;
        text = `Hur många olika kombinationer kan du göra?`;
        options = generateOptions(correctAnswer, 4, 16, 4);
    }
    else if (taskId === 'linjediagram') {
        const d1 = randomInt(5, 15);
        const d2 = randomInt(5, 15);
        const d3 = randomInt(5, 15);
        correctAnswer = d3;
        tags = ['Diagram'];
        equation = `Dag 1: ${d1}° | Dag 2: ${d2}° | Dag 3: ${d3}°`;
        text = `Enligt datan, vad var temperaturen Dag 3?`;
        options = Array.from(new Set([d3, d1, d2, d3 + 2, d3 - 2])).slice(0, 4).sort(() => Math.random() - 0.5);
        if (options.length < 4) {
            options = generateOptions(correctAnswer, 0, 20, 4);
        }
    }
    else if (taskId === 'lagesmatt') {
        const a = randomInt(1, 5);
        const b = randomInt(1, 5);
        const c = randomInt(1, 5);
        const sum = a + b + c;
        correctAnswer = sum / 3;
        tags = ['Medelvärde'];
        equation = `Tal: ${a}, ${b}, ${c}. Bli tre tal samma om vi delar summan lika?`;
        text = `Vad är medelvärdet av talen?`;
        // if not clean division, fallback to simple integer
        if (sum % 3 !== 0) {
            correctAnswer = 4;
            equation = `Tal: 3, 4, 5`;
        }
        options = generateOptions(correctAnswer, 1, 10, 4);
    }

    // --- AK4: Samband och förändring ---
    else if (taskId === 'proportionalitet') {
        const p = randomInt(5, 12);
        correctAnswer = p * 3;
        tags = ['Proportionalitet'];
        equation = `1 äpple kostar ${p} kr.`;
        text = `Vad kostar 3 äpplen?`;
        options = generateOptions(correctAnswer, 10, 40, 4);
    }
    else if (taskId === 'koordinatsystem') {
        const isXAxis = randomInt(0, 1) === 0;
        const typ = isXAxis ? "x-axeln (vågräta)" : "y-axeln (lodräta)";
        correctAnswer = isXAxis ? "Hur långt åt höger" : "Hur långt upp";
        tags = ['Koordinatsystem'];
        equation = `Punkt (x, y)`;
        text = `Vad anges på ${typ}?`;
        options = ["Hur långt upp", "Hur långt åt höger", "Djupet", "Färgen"].sort(() => Math.random() - 0.5);
    }
    else if (taskId === 'grafer') {
        const types = [
            { t: "Proportionellt samband", ans: "En rät linje genom origo" },
            { t: "Inget samband", ans: "Slumpmässiga punkter" }
        ];
        const val = types[randomInt(0, types.length - 1)];
        correctAnswer = val.ans;
        tags = ['Grafer'];
        equation = val.t;
        text = `Hur ser detta ut på ett grafpapper?`;
        options = ["En rät linje genom origo", "Slumpmässiga punkter", "En cirkel", "En zick-zack linje"].sort(() => Math.random() - 0.5);
    }

    // --- AK4: Problemlösning ---
    else if (taskId === 'strategier' || taskId === 'formulera_problem') {
        const pris = randomInt(10, 20);
        const fickpengar = randomInt(50, 100);
        correctAnswer = Math.floor(fickpengar / pris);
        tags = ['Problemlösning (Flersteg)'];
        equation = `Film kostar ${pris} kr. Fickpengar: ${fickpengar} kr.`;
        text = `Hur många biljetter har du råd med? (Avrunda neråt)`;
        options = generateOptions(correctAnswer, 1, 10, 4);
    }

    // --- Stavning ---
    else if (taskId.startsWith('stav_')) {
        const spellingTask = getSpellingTask(taskId);
        if (spellingTask && spellingTask.words.length > 0) {
            const wordEntry = spellingTask.words[randomInt(0, spellingTask.words.length - 1)];
            correctAnswer = wordEntry.word;
            tags = ['Stavning', spellingTask.name];
            equation = '';
            text = 'Hur stavas ordet?';
            options = [];
            return {
                id,
                taskId,
                tags,
                text,
                equation,
                correctAnswer,
                options,
                clockTime: null,
                type: 'spelling',
                wordToSpeak: wordEntry.word,
                wordMeaning: wordEntry.meaning,
            };
        }
    }

    // --- Fallback for unknown task IDs ---
    if (!equation && !correctAnswer) {
        const a = randomInt(1, 3);
        const b = randomInt(1, 3);
        correctAnswer = a + b;
        tags = ['Matematik'];
        equation = `${a} + ${b} = __`;
        options = generateOptions(correctAnswer, 0, 6, 4);
    }

    return { id, taskId, tags, text, equation, correctAnswer, options, clockTime };
};
