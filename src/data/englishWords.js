// =============================================================
// Engelska glosor per årskurs. Varje ord övas i fyra lägen:
// eng→sve och sve→eng, som fritext eller fyra alternativ.
// Task-ID: eng_ak{n}_{ensv|sven}_{txt|val}_{slug}
// =============================================================

export const ENGLISH_WORDS = {
    3: [
        // Djur
        { en: 'dog', sv: 'hund' },
        { en: 'cat', sv: 'katt' },
        { en: 'horse', sv: 'häst' },
        { en: 'cow', sv: 'ko' },
        { en: 'pig', sv: 'gris' },
        { en: 'sheep', sv: 'får' },
        { en: 'bird', sv: 'fågel' },
        { en: 'fish', sv: 'fisk' },
        { en: 'mouse', sv: 'mus' },
        { en: 'rabbit', sv: 'kanin' },
        // Färger
        { en: 'red', sv: 'röd' },
        { en: 'blue', sv: 'blå' },
        { en: 'green', sv: 'grön' },
        { en: 'yellow', sv: 'gul' },
        { en: 'black', sv: 'svart' },
        { en: 'white', sv: 'vit' },
        { en: 'brown', sv: 'brun' },
        { en: 'pink', sv: 'rosa' },
        // Siffror
        { en: 'one', sv: 'ett' },
        { en: 'two', sv: 'två' },
        { en: 'three', sv: 'tre' },
        { en: 'four', sv: 'fyra' },
        { en: 'five', sv: 'fem' },
        { en: 'six', sv: 'sex' },
        { en: 'seven', sv: 'sju' },
        { en: 'eight', sv: 'åtta' },
        { en: 'nine', sv: 'nio' },
        { en: 'ten', sv: 'tio' },
        // Familj
        { en: 'mother', sv: 'mamma' },
        { en: 'father', sv: 'pappa' },
        { en: 'sister', sv: 'syster' },
        { en: 'brother', sv: 'bror' },
        { en: 'friend', sv: 'vän' },
        { en: 'family', sv: 'familj' },
        // Kroppen
        { en: 'head', sv: 'huvud' },
        { en: 'eye', sv: 'öga' },
        { en: 'ear', sv: 'öra' },
        { en: 'nose', sv: 'näsa' },
        { en: 'mouth', sv: 'mun' },
        { en: 'leg', sv: 'ben' },
        { en: 'foot', sv: 'fot' },
        { en: 'hair', sv: 'hår' },
        // Mat & dryck
        { en: 'apple', sv: 'äpple' },
        { en: 'bread', sv: 'bröd' },
        { en: 'milk', sv: 'mjölk' },
        { en: 'cheese', sv: 'ost' },
        { en: 'egg', sv: 'ägg' },
        { en: 'water', sv: 'vatten' },
        { en: 'banana', sv: 'banan' },
        { en: 'cake', sv: 'tårta' },
        { en: 'sausage', sv: 'korv' },
        { en: 'soup', sv: 'soppa' },
        { en: 'butter', sv: 'smör' },
        { en: 'tea', sv: 'te' },
        // Hemmet
        { en: 'house', sv: 'hus' },
        { en: 'door', sv: 'dörr' },
        { en: 'window', sv: 'fönster' },
        { en: 'table', sv: 'bord' },
        { en: 'chair', sv: 'stol' },
        { en: 'bed', sv: 'säng' },
        { en: 'lamp', sv: 'lampa' },
        { en: 'kitchen', sv: 'kök' },
        { en: 'garden', sv: 'trädgård' },
        { en: 'key', sv: 'nyckel' },
        // Skolan
        { en: 'school', sv: 'skola' },
        { en: 'book', sv: 'bok' },
        { en: 'pen', sv: 'penna' },
        { en: 'teacher', sv: 'lärare' },
        { en: 'bag', sv: 'väska' },
        { en: 'paper', sv: 'papper' },
        { en: 'scissors', sv: 'sax' },
        { en: 'ruler', sv: 'linjal' },
        // Kläder
        { en: 'shoe', sv: 'sko' },
        { en: 'sock', sv: 'strumpa' },
        { en: 'hat', sv: 'hatt' },
        { en: 'jacket', sv: 'jacka' },
        { en: 'dress', sv: 'klänning' },
        { en: 'trousers', sv: 'byxor' },
        { en: 'shirt', sv: 'skjorta' },
        { en: 'sweater', sv: 'tröja' },
        // Natur & väder
        { en: 'sun', sv: 'sol' },
        { en: 'moon', sv: 'måne' },
        { en: 'star', sv: 'stjärna' },
        { en: 'rain', sv: 'regn' },
        { en: 'snow', sv: 'snö' },
        { en: 'tree', sv: 'träd' },
        { en: 'flower', sv: 'blomma' },
        { en: 'sky', sv: 'himmel' },
        { en: 'sea', sv: 'hav' },
        { en: 'stone', sv: 'sten' },
        // Verb
        { en: 'run', sv: 'springa' },
        { en: 'jump', sv: 'hoppa' },
        { en: 'eat', sv: 'äta' },
        { en: 'drink', sv: 'dricka' },
        { en: 'sleep', sv: 'sova' },
        { en: 'play', sv: 'leka' },
        { en: 'read', sv: 'läsa' },
        { en: 'write', sv: 'skriva' },
        { en: 'sing', sv: 'sjunga' },
        { en: 'swim', sv: 'simma' },
    ],
};

// De fyra övningslägena
export const ENGLISH_MODES = [
    { key: 'ensv_txt', name: 'Engelska → Svenska (skriv)' },
    { key: 'sven_txt', name: 'Svenska → Engelska (skriv)' },
    { key: 'ensv_val', name: 'Engelska → Svenska (välj)' },
    { key: 'sven_val', name: 'Svenska → Engelska (välj)' },
];

export const getEnglishWordsForGrade = (grade) => ENGLISH_WORDS[grade] || [];

export const englishWordSlug = (word) => word.toLowerCase().replace(/[^a-z0-9]+/g, '_');

export const getEnglishWordBySlug = (grade, slug) =>
    getEnglishWordsForGrade(grade).find(w => englishWordSlug(w.en) === slug) || null;
