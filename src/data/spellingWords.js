// =============================================================
// Stavningsord — ordlistor grupperade per årklass och tema
// Varje task-grupp är ett eget "task ID" som registreras i categories.js
// Meningar är inkluderade för framtida bruk
// =============================================================

export const SPELLING_TASKS = {

    // ──────────────────────────────────────────────
    // ÅK 1-3 — Lågstadiet
    // ──────────────────────────────────────────────

    stav_ak1_djur: {
        name: 'Djur',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'katt', meaning: 'Ett litet husdjur som jamar.' },
            { word: 'hund', meaning: 'Ett husdjur som skäller.' },
            { word: 'fisk', meaning: 'Ett djur som lever i vatten.' },
            { word: 'fågel', meaning: 'Ett djur med vingar som kan flyga.' },
            { word: 'häst', meaning: 'Ett stort djur som man kan rida på.' },
            { word: 'ko', meaning: 'Ett djur på gården som ger mjölk.' },
            { word: 'gris', meaning: 'Ett rosa djur på gården.' },
            { word: 'anka', meaning: 'En fågel som simmar på sjön.' },
            { word: 'björn', meaning: 'Ett stort vilt djur i skogen.' },
            { word: 'räv', meaning: 'Ett listigt djur med röd päls.' },
        ]
    },

    stav_ak1_kropp: {
        name: 'Kroppen',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'arm', meaning: 'Du har två armar.' },
            { word: 'ben', meaning: 'Du har två ben att gå på.' },
            { word: 'hand', meaning: 'Du skriver med din hand.' },
            { word: 'fot', meaning: 'Du har en fot i varje sko.' },
            { word: 'öga', meaning: 'Du ser med dina ögon.' },
            { word: 'öra', meaning: 'Du hör med dina öron.' },
            { word: 'näsa', meaning: 'Du andas och luktar med näsan.' },
            { word: 'mun', meaning: 'Du pratar och äter med munnen.' },
            { word: 'tand', meaning: 'Du tuggar mat med tänderna.' },
            { word: 'huvud', meaning: 'Din hjärna sitter i huvudet.' },
        ]
    },

    stav_ak1_mat: {
        name: 'Mat & dryck',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'bröd', meaning: 'Man bakar bröd av mjöl och vatten.' },
            { word: 'mjölk', meaning: 'Mjölk kommer från kon.' },
            { word: 'ägg', meaning: 'Hönan lägger ägg.' },
            { word: 'äpple', meaning: 'En röd eller grön frukt.' },
            { word: 'smör', meaning: 'Man smörjer smör på brödet.' },
            { word: 'ost', meaning: 'Ost görs av mjölk.' },
            { word: 'fisk', meaning: 'Man kan äta fisk till middag.' },
            { word: 'soppa', meaning: 'En varm maträtt du dricker.' },
            { word: 'juice', meaning: 'En dryck gjord av frukt.' },
            { word: 'vatten', meaning: 'Man dricker vatten för att inte bli törstig.' },
        ]
    },

    stav_ak1_natur: {
        name: 'Natur & väder',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'sol', meaning: 'Solen lyser på dagen.' },
            { word: 'måne', meaning: 'Månen lyser på natten.' },
            { word: 'moln', meaning: 'Moln kan ge regn.' },
            { word: 'regn', meaning: 'Det regnar vatten från himlen.' },
            { word: 'snö', meaning: 'Snö är vitt och kallt.' },
            { word: 'vind', meaning: 'Vinden blåser i träden.' },
            { word: 'träd', meaning: 'Träd har rötter, stam och grenar.' },
            { word: 'blomma', meaning: 'Blommor blommar på våren.' },
            { word: 'sten', meaning: 'En hård bit av berg.' },
            { word: 'sjö', meaning: 'En sjö är fylld med sötvatten.' },
        ]
    },

    stav_ak1_hem: {
        name: 'Hemmet',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'hus', meaning: 'Man bor i ett hus.' },
            { word: 'rum', meaning: 'Ett hus har många rum.' },
            { word: 'säng', meaning: 'Man sover i en säng.' },
            { word: 'stol', meaning: 'Man sitter på en stol.' },
            { word: 'bord', meaning: 'Man äter vid ett bord.' },
            { word: 'lampa', meaning: 'Lampan lyser upp rummet.' },
            { word: 'dörr', meaning: 'Du öppnar dörren för att gå in.' },
            { word: 'fönster', meaning: 'Genom fönstret ser du ut.' },
            { word: 'kök', meaning: 'Man lagar mat i köket.' },
            { word: 'soffa', meaning: 'Man sitter och vilar i soffan.' },
        ]
    },

    stav_ak1_skola: {
        name: 'Skolan',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'penna', meaning: 'Man skriver med en penna.' },
            { word: 'bok', meaning: 'En bok har många sidor.' },
            { word: 'väska', meaning: 'Man har böcker i väskan.' },
            { word: 'lärare', meaning: 'Läraren undervisar i skolan.' },
            { word: 'klass', meaning: 'En grupp elever kallas klass.' },
            { word: 'tavla', meaning: 'Läraren skriver på tavlan.' },
        ]
    },

    stav_ak1_kläder: {
        name: 'Kläder',
        gradeLabel: 'ÅK 1–3',
        words: [
            { word: 'byxor', meaning: 'Man har byxor på benen.' },
            { word: 'tröja', meaning: 'En tröja håller dig varm.' },
            { word: 'jacka', meaning: 'Du tar på dig jacka när det är kallt.' },
            { word: 'mössa', meaning: 'Mössan håller huvudet varmt.' },
            { word: 'skor', meaning: 'Man har skor på fötterna.' },
            { word: 'strumpa', meaning: 'Strumpor har man inuti skorna.' },
        ]
    },

    // ──────────────────────────────────────────────
    // ÅK 4-6 — Mellanstadiet
    // ──────────────────────────────────────────────

    stav_ak4_samhalle: {
        name: 'Samhälle',
        gradeLabel: 'ÅK 4–6',
        words: [
            { word: 'bibliotek', meaning: 'Du lånar böcker på biblioteket.' },
            { word: 'sjukhus', meaning: 'På sjukhuset jobbar läkare och sjuksköterskor.' },
            { word: 'station', meaning: 'Du åker tåg från stationen.' },
            { word: 'apotek', meaning: 'Du köper medicin på apoteket.' },
            { word: 'affär', meaning: 'Man handlar mat i en affär.' },
            { word: 'skola', meaning: 'Barn lär sig saker i skolan.' },
            { word: 'kyrka', meaning: 'Många ber i kyrkan.' },
            { word: 'museum', meaning: 'På museet kan man lära sig historia.' },
            { word: 'teater', meaning: 'Man ser pjäser på teatern.' },
            { word: 'stadshus', meaning: 'Politikerna möts i stadshuset.' },
        ]
    },

    stav_ak4_natur: {
        name: 'Natur & geografi',
        gradeLabel: 'ÅK 4–6',
        words: [
            { word: 'kontinent', meaning: 'Jorden har sju kontinenter.' },
            { word: 'ocean', meaning: 'En ocean är ett mycket stort hav.' },
            { word: 'vulkan', meaning: 'En vulkan sprutar lava.' },
            { word: 'halvö', meaning: 'En halvö är omgiven av hav på tre sidor.' },
            { word: 'öken', meaning: 'En öken är torr och het.' },
            { word: 'skog', meaning: 'En skog är full av träd.' },
            { word: 'flod', meaning: 'En flod rinner mot havet.' },
            { word: 'fjäll', meaning: 'Ett fjäll är ett högt berg.' },
            { word: 'kust', meaning: 'Kusten är landet vid havet.' },
            { word: 'klimat', meaning: 'Klimatet är vädret under lång tid.' },
        ]
    },

    stav_ak4_kropp: {
        name: 'Kropp & hälsa',
        gradeLabel: 'ÅK 4–6',
        words: [
            { word: 'hjärta', meaning: 'Hjärtat pumpar blodet i kroppen.' },
            { word: 'lunga', meaning: 'Lungorna andas in syre.' },
            { word: 'hjärna', meaning: 'Hjärnan styr hela kroppen.' },
            { word: 'muskler', meaning: 'Muskler gör att vi kan röra oss.' },
            { word: 'skelett', meaning: 'Skelettet är kroppens stöd.' },
            { word: 'blod', meaning: 'Blodet transporterar syre.' },
            { word: 'nerv', meaning: 'Nerver skickar signaler i kroppen.' },
            { word: 'vitamin', meaning: 'Vitaminer håller oss friska.' },
        ]
    },
};

// Lookup: get a task's word list by task ID
export const getSpellingTask = (taskId) => SPELLING_TASKS[taskId] || null;
