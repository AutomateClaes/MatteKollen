// =============================================================
// Stavningsord — ett ord per task-ID, grupperade per årskurs.
// Varje ord är en egen underkategori i categories.js.
// `sentence` innehåller ordet exakt som det stavas — spelet byter
// ut det mot __ för att sätta ordet i ett sammanhang.
// Svårigheten ökar per årskurs: ljudenliga ord → dubbelteckning
// → tj/sj/hj/lj-ljud → svårstavade vardagsord → låneord.
// =============================================================

const defineWords = (grade, gradeLabel, entries) =>
    Object.fromEntries(entries.map(([slug, word, meaning, sentence]) => [
        `stav_ak${grade}_${slug}`,
        { name: word, gradeLabel, words: [{ word, meaning, sentence }] }
    ]));

export const SPELLING_TASKS = {

    ...defineWords(1, 'Åk 1', [
        ['sol', 'sol', 'Solen lyser på himlen.', 'På himlen lyser en gul sol.'],
        ['hus', 'hus', 'Man bor i ett hus.', 'Vi bor i ett rött hus.'],
        ['bok', 'bok', 'En bok har många sidor.', 'Jag läser en spännande bok.'],
        ['bil', 'bil', 'En bil har fyra hjul.', 'Pappa kör en blå bil.'],
        ['mus', 'mus', 'En liten grå gnagare.', 'En liten mus pilar över golvet.'],
        ['fisk', 'fisk', 'Ett djur som simmar i vattnet.', 'I sjön simmar en fisk.'],
        ['hund', 'hund', 'Ett husdjur som skäller.', 'Min hund älskar att leka med bollen.'],
        ['katt', 'katt', 'Ett husdjur som jamar.', 'Vår katt jamar när den är hungrig.'],
        ['boll', 'boll', 'Man kastar och studsar en boll.', 'Vi kastar en boll på rasten.'],
        ['tag', 'tåg', 'Tåget åker på räls.', 'Vi åker tåg till mormor.'],
    ]),

    ...defineWords(2, 'Åk 2', [
        ['klocka', 'klocka', 'Klockan visar vad tiden är.', 'På väggen hänger en klocka.'],
        ['sommar', 'sommar', 'Årstiden när det är varmast.', 'I sommar ska vi bada varje dag.'],
        ['vinter', 'vinter', 'Årstiden när det snöar.', 'I vinter ska vi åka skridskor.'],
        ['flicka', 'flicka', 'Ett annat ord för tjej.', 'En flicka i klassen hoppar hopprep.'],
        ['pojke', 'pojke', 'Ett annat ord för kille.', 'En pojke cyklar förbi skolan.'],
        ['vatten', 'vatten', 'Man dricker vatten när man är törstig.', 'Jag dricker ett glas vatten.'],
        ['apple', 'äpple', 'En rund frukt som kan vara röd eller grön.', 'Jag äter ett rött äpple.'],
        ['glass', 'glass', 'En kall och söt efterrätt.', 'På sommaren äter vi glass.'],
        ['hoppa', 'hoppa', 'Man kan hoppa högt med benen.', 'Kaninen kan hoppa högt.'],
        ['kvall', 'kväll', 'Tiden på dygnet innan natten.', 'I kväll ska vi titta på film.'],
    ]),

    ...defineWords(3, 'Åk 3', [
        ['hjul', 'hjul', 'Runda saker som bilen rullar på.', 'Cykeln har fått ett nytt hjul.'],
        ['ljus', 'ljus', 'Man tänder ett ljus på tårtan.', 'Vi tänder ett ljus på tårtan.'],
        ['kjol', 'kjol', 'Ett plagg som snurrar fint när man dansar.', 'Hon snurrar i sin nya kjol.'],
        ['tjuv', 'tjuv', 'En person som stjäl saker.', 'Polisen jagade en tjuv.'],
        ['stjarna', 'stjärna', 'Lyser på natthimlen.', 'En stjärna blinkar på natthimlen.'],
        ['skjorta', 'skjorta', 'Ett plagg med knappar och krage.', 'Han stryker sin fina skjorta.'],
        ['sjuk', 'sjuk', 'När man har feber är man sjuk.', 'Jag stannar hemma när jag är sjuk.'],
        ['garna', 'gärna', 'Jag vill gärna ha en glass.', 'Jag vill gärna följa med till badet.'],
        ['hjalpa', 'hjälpa', 'Att göra något snällt för någon annan.', 'Kan du hjälpa mig med läxan?'],
        ['choklad', 'choklad', 'En söt, brun godis.', 'Vi smälter choklad till efterrätten.'],
    ]),

    ...defineWords(4, 'Åk 4', [
        ['manniska', 'människa', 'En person, en av oss.', 'Varje människa är unik.'],
        ['hjarta', 'hjärta', 'Pumpar blodet runt i kroppen.', 'Mitt hjärta slår fortare när jag springer.'],
        ['mycket', 'mycket', 'Motsatsen till lite.', 'Det ligger mycket snö på taket.'],
        ['alltid', 'alltid', 'Varje gång, utan undantag.', 'Vi borstar alltid tänderna före läggdags.'],
        ['kanske', 'kanske', 'Det är inte säkert, bara möjligt.', 'Vi går kanske till parken efter skolan.'],
        ['folja', 'följa', 'Att gå efter någon.', 'Hunden vill följa med på promenaden.'],
        ['hoger', 'höger', 'Motsatsen till vänster.', 'Sväng till höger vid affären.'],
        ['vanster', 'vänster', 'Motsatsen till höger.', 'Jag skriver med vänster hand.'],
        ['hungrig', 'hungrig', 'När magen kurrar är man hungrig.', 'Efter träningen är jag alltid hungrig.'],
        ['beratta', 'berätta', 'Att tala om vad som har hänt.', 'Farmor ska berätta en saga.'],
    ]),

    ...defineWords(5, 'Åk 5', [
        ['tillsammans', 'tillsammans', 'När man gör något ihop med andra.', 'Vi löser uppgiften tillsammans.'],
        ['egentligen', 'egentligen', 'I själva verket.', 'Jag ville egentligen sova en stund till.'],
        ['intressant', 'intressant', 'Något som är spännande att lära sig om.', 'Boken om rymden var väldigt intressant.'],
        ['forsiktig', 'försiktig', 'Att vara varsam så inget går sönder.', 'Var försiktig när du klipper med saxen.'],
        ['hemlighet', 'hemlighet', 'Något man inte berättar för någon.', 'Jag viskade en hemlighet till min vän.'],
        ['upptacka', 'upptäcka', 'Att hitta något nytt.', 'Vi kan upptäcka nya stigar i skogen.'],
        ['tjanst', 'tjänst', 'Att göra någon en tjänst är att hjälpa till.', 'Kan du göra mig en tjänst och öppna dörren?'],
        ['skylt', 'skylt', 'En tavla med information, till exempel vid vägen.', 'En skylt visar vägen till stationen.'],
        ['gymnastik', 'gymnastik', 'Ett ämne i skolan där man rör på sig.', 'Vi har gymnastik på fredagar.'],
        ['nastan', 'nästan', 'Inte helt, men nära.', 'Klockan är nästan tre.'],
    ]),

    ...defineWords(6, 'Åk 6', [
        ['restaurang', 'restaurang', 'En plats där man betalar för att äta mat.', 'Vi firade mamma på en restaurang.'],
        ['chauffor', 'chaufför', 'En person som kör bil eller buss som yrke.', 'Bussens chaufför hälsade glatt.'],
        ['ingenjor', 'ingenjör', 'En person som konstruerar och bygger saker.', 'En ingenjör ritade den nya bron.'],
        ['journalist', 'journalist', 'En person som skriver nyheter.', 'En journalist intervjuade rektorn.'],
        ['biljett', 'biljett', 'Den behöver du för att åka tåg eller gå på bio.', 'Jag köpte en biljett till bion.'],
        ['succe', 'succé', 'När något går riktigt, riktigt bra.', 'Skolans musikal blev en stor succé.'],
        ['terrass', 'terrass', 'En uteplats vid ett hus.', 'Vi åt frukost på husets terrass.'],
        ['professionell', 'professionell', 'Någon som är riktigt skicklig på sitt jobb.', 'Hon är en professionell fotbollsspelare.'],
        ['tillfalle', 'tillfälle', 'En chans eller ett läge att göra något.', 'Det här är ett perfekt tillfälle att träna.'],
        ['definitivt', 'definitivt', 'Helt säkert, utan tvekan.', 'Det var definitivt den bästa glassen i stan.'],
    ]),
};

// Lookup: get a task's word list by task ID
export const getSpellingTask = (taskId) => SPELLING_TASKS[taskId] || null;

// All spelling task IDs for a grade, e.g. getSpellingTaskIdsForGrade(3)
export const getSpellingTaskIdsForGrade = (grade) =>
    Object.keys(SPELLING_TASKS).filter(id => id.startsWith(`stav_ak${grade}_`));
