// =============================================================
// Stavningsord — ett ord per task-ID, grupperade per årskurs.
// Varje ord är en egen underkategori i categories.js.
// Svårigheten ökar per årskurs: ljudenliga ord → dubbelteckning
// → tj/sj/hj/lj-ljud → svårstavade vardagsord → låneord.
// =============================================================

const defineWords = (grade, gradeLabel, entries) =>
    Object.fromEntries(entries.map(([slug, word, meaning]) => [
        `stav_ak${grade}_${slug}`,
        { name: word, gradeLabel, words: [{ word, meaning }] }
    ]));

export const SPELLING_TASKS = {

    ...defineWords(1, 'Åk 1', [
        ['sol', 'sol', 'Solen lyser på himlen.'],
        ['hus', 'hus', 'Man bor i ett hus.'],
        ['bok', 'bok', 'En bok har många sidor.'],
        ['bil', 'bil', 'En bil har fyra hjul.'],
        ['mus', 'mus', 'En liten grå gnagare.'],
        ['fisk', 'fisk', 'Ett djur som simmar i vattnet.'],
        ['hund', 'hund', 'Ett husdjur som skäller.'],
        ['katt', 'katt', 'Ett husdjur som jamar.'],
        ['boll', 'boll', 'Man kastar och studsar en boll.'],
        ['tag', 'tåg', 'Tåget åker på räls.'],
    ]),

    ...defineWords(2, 'Åk 2', [
        ['klocka', 'klocka', 'Klockan visar vad tiden är.'],
        ['sommar', 'sommar', 'Årstiden när det är varmast.'],
        ['vinter', 'vinter', 'Årstiden när det snöar.'],
        ['flicka', 'flicka', 'Ett annat ord för tjej.'],
        ['pojke', 'pojke', 'Ett annat ord för kille.'],
        ['vatten', 'vatten', 'Man dricker vatten när man är törstig.'],
        ['apple', 'äpple', 'En rund frukt som kan vara röd eller grön.'],
        ['glass', 'glass', 'En kall och söt efterrätt.'],
        ['hoppa', 'hoppa', 'Man kan hoppa högt med benen.'],
        ['kvall', 'kväll', 'Tiden på dygnet innan natten.'],
    ]),

    ...defineWords(3, 'Åk 3', [
        ['hjul', 'hjul', 'Runda saker som bilen rullar på.'],
        ['ljus', 'ljus', 'Man tänder ett ljus på tårtan.'],
        ['kjol', 'kjol', 'Ett plagg som snurrar fint när man dansar.'],
        ['tjuv', 'tjuv', 'En person som stjäl saker.'],
        ['stjarna', 'stjärna', 'Lyser på natthimlen.'],
        ['skjorta', 'skjorta', 'Ett plagg med knappar och krage.'],
        ['sjuk', 'sjuk', 'När man har feber är man sjuk.'],
        ['garna', 'gärna', 'Jag vill gärna ha en glass.'],
        ['hjalpa', 'hjälpa', 'Att göra något snällt för någon annan.'],
        ['choklad', 'choklad', 'En söt, brun godis.'],
    ]),

    ...defineWords(4, 'Åk 4', [
        ['manniska', 'människa', 'En person, en av oss.'],
        ['hjarta', 'hjärta', 'Pumpar blodet runt i kroppen.'],
        ['mycket', 'mycket', 'Motsatsen till lite.'],
        ['alltid', 'alltid', 'Varje gång, utan undantag.'],
        ['kanske', 'kanske', 'Det är inte säkert, bara möjligt.'],
        ['folja', 'följa', 'Att gå efter någon.'],
        ['hoger', 'höger', 'Motsatsen till vänster.'],
        ['vanster', 'vänster', 'Motsatsen till höger.'],
        ['hungrig', 'hungrig', 'När magen kurrar är man hungrig.'],
        ['beratta', 'berätta', 'Att tala om vad som har hänt.'],
    ]),

    ...defineWords(5, 'Åk 5', [
        ['tillsammans', 'tillsammans', 'När man gör något ihop med andra.'],
        ['egentligen', 'egentligen', 'I själva verket.'],
        ['intressant', 'intressant', 'Något som är spännande att lära sig om.'],
        ['forsiktig', 'försiktig', 'Att vara varsam så inget går sönder.'],
        ['hemlighet', 'hemlighet', 'Något man inte berättar för någon.'],
        ['upptacka', 'upptäcka', 'Att hitta något nytt.'],
        ['tjanst', 'tjänst', 'Att göra någon en tjänst är att hjälpa till.'],
        ['skylt', 'skylt', 'En tavla med information, till exempel vid vägen.'],
        ['gymnastik', 'gymnastik', 'Ett ämne i skolan där man rör på sig.'],
        ['nastan', 'nästan', 'Inte helt, men nära.'],
    ]),

    ...defineWords(6, 'Åk 6', [
        ['restaurang', 'restaurang', 'En plats där man betalar för att äta mat.'],
        ['chauffor', 'chaufför', 'En person som kör bil eller buss som yrke.'],
        ['ingenjor', 'ingenjör', 'En person som konstruerar och bygger saker.'],
        ['journalist', 'journalist', 'En person som skriver nyheter.'],
        ['biljett', 'biljett', 'Den behöver du för att åka tåg eller gå på bio.'],
        ['succe', 'succé', 'När något går riktigt, riktigt bra.'],
        ['terrass', 'terrass', 'En uteplats vid ett hus.'],
        ['professionell', 'professionell', 'Någon som är riktigt skicklig på sitt jobb.'],
        ['tillfalle', 'tillfälle', 'En chans eller ett läge att göra något.'],
        ['definitivt', 'definitivt', 'Helt säkert, utan tvekan.'],
    ]),
};

// Lookup: get a task's word list by task ID
export const getSpellingTask = (taskId) => SPELLING_TASKS[taskId] || null;

// All spelling task IDs for a grade, e.g. getSpellingTaskIdsForGrade(3)
export const getSpellingTaskIdsForGrade = (grade) =>
    Object.keys(SPELLING_TASKS).filter(id => id.startsWith(`stav_ak${grade}_`));
