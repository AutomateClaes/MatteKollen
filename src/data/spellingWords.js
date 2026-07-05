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

        // j-ljud (hj, dj, lj, gj)
        ['hjalte', 'hjälte', 'En modig person.', 'Brandmannen blev en hjälte när han räddade katten.'],
        ['hjalm', 'hjälm', 'Skyddar huvudet när du cyklar.', 'Ta på dig din hjälm innan du cyklar.'],
        ['hjort', 'hjort', 'Ett skogsdjur med horn.', 'En hjort sprang över vägen.'],
        ['djur', 'djur', 'Hundar, katter och kor är olika djur.', 'På bondgården finns många djur.'],
        ['djup', 'djup', 'Motsatsen till grund.', 'Sjön är väldigt djup på mitten.'],
        ['djarv', 'djärv', 'Modig och vågad.', 'Det var en djärv idé att klättra högst upp.'],
        ['ljud', 'ljud', 'Något man hör.', 'Ett konstigt ljud hördes från källaren.'],
        ['ljuga', 'ljuga', 'Att inte tala sanning.', 'Man ska inte ljuga för sina vänner.'],
        ['ljummen', 'ljummen', 'Varken varm eller kall.', 'Soppan var bara ljummen när vi åt.'],
        ['gjorde', 'gjorde', 'Dåtid av att göra.', 'Vi gjorde en snögubbe igår.'],

        // sj-ljud (sj, skj, stj)
        ['sju', 'sju', 'Talet efter sex.', 'Min lillebror fyller sju år idag.'],
        ['sjunga', 'sjunga', 'Att göra musik med rösten.', 'Vi ska sjunga i kören på fredag.'],
        ['sjunka', 'sjunka', 'Att åka nedåt i vattnet.', 'Stenen började sjunka mot botten.'],
        ['sjo', 'sjö', 'Vatten omgivet av land.', 'Vi badar i en sjö på sommaren.'],
        ['sjalv', 'själv', 'Utan hjälp av någon annan.', 'Jag knöt skorna helt själv.'],
        ['sjal', 'sjal', 'Ett tygstycke man har runt halsen.', 'Mormor stickade en varm sjal.'],
        ['sjoman', 'sjöman', 'En person som arbetar på båt.', 'En sjöman ser många hav.'],
        ['skjuta', 'skjuta', 'Att knuffa något framåt.', 'Kan du skjuta på kärran?'],
        ['skjuts', 'skjuts', 'Att få åka med någon.', 'Vi fick skjuts till träningen av pappa.'],
        ['skjul', 'skjul', 'En liten enkel byggnad.', 'Cyklarna står i ett skjul på gården.'],
        ['stjala', 'stjäla', 'Att ta något som inte är ens eget.', 'Det är fel att stjäla.'],
        ['stjalk', 'stjälk', 'Blommans stam.', 'Tulpanen har en lång grön stjälk.'],

        // tj-ljud (tj, k)
        ['tjock', 'tjock', 'Motsatsen till smal.', 'Boken var tjock som en tegelsten.'],
        ['tjata', 'tjata', 'Att upprepa samma sak om och om igen.', 'Sluta tjata, jag kommer snart!'],
        ['tjana', 'tjäna', 'Att få pengar för arbete.', 'Man kan tjäna pengar på att klippa gräs.'],
        ['tjugo', 'tjugo', 'Talet efter nitton.', 'Det går tjugo elever i klassen.'],
        ['kedja', 'kedja', 'Länkar som sitter ihop.', 'Cykelns kedja hoppade av.'],
        ['kikare', 'kikare', 'Används för att se långt bort.', 'Med en kikare ser du fåglarna nära.'],
        ['kampa', 'kämpa', 'Att försöka riktigt hårt.', 'Laget fick kämpa hela matchen.'],
        ['kanna', 'känna', 'Att uppleva något, eller veta vem någon är.', 'Jag vill känna sanden mellan tårna.'],

        // ng- och gn-ljud
        ['manga', 'många', 'Ett stort antal.', 'Det var många barn i parken.'],
        ['pengar', 'pengar', 'Det man betalar med.', 'Jag sparar pengar i en burk.'],
        ['langta', 'längta', 'Att vilja något väldigt mycket.', 'Vi brukar längta efter sommarlovet.'],
        ['kung', 'kung', 'Landets kungliga ledare.', 'Slottet byggdes av en kung.'],
        ['tunga', 'tunga', 'Sitter i munnen och känner smak.', 'Glassen fastnade nästan på min tunga.'],
        ['springa', 'springa', 'Att röra sig snabbt med benen.', 'Vi fick springa för att hinna med bussen.'],
        ['vagn', 'vagn', 'Något med hjul som dras eller skjuts.', 'Bebisen sover i sin vagn.'],
        ['regn', 'regn', 'Vatten som faller från molnen.', 'Efter regn kommer solsken.'],
        ['lugn', 'lugn', 'Stilla och utan oro.', 'Han är alltid lugn före en match.'],
        ['ugn', 'ugn', 'Där man gräddar mat.', 'Bullarna gräddas i en varm ugn.'],

        // vanliga småord
        ['ocksa', 'också', 'Dessutom, likaså.', 'Jag vill också följa med!'],
        ['ibland', 'ibland', 'Då och då.', 'Vi äter tacos ibland på fredagar.'],
        ['ganska', 'ganska', 'Rätt så.', 'Filmen var ganska spännande.'],
        ['genast', 'genast', 'Med en gång.', 'Kom hit genast!'],
        ['eftersom', 'eftersom', 'Därför att.', 'Vi stannade inne eftersom det regnade.'],
        ['framfor', 'framför', 'På framsidan av något.', 'Bilen står parkerad framför huset.'],
        ['bredvid', 'bredvid', 'Vid sidan av.', 'Jag sitter bredvid min bästa vän.'],
        ['mellan', 'mellan', 'I mitten av två saker.', 'Bollen rullade in mellan träden.'],
        ['tillbaka', 'tillbaka', 'Åter till samma plats.', 'Vi går tillbaka hem före mörkret.'],
        ['fortfarande', 'fortfarande', 'Ännu, inte färdigt.', 'Det snöar fortfarande ute.'],

        // å-ord
        ['mandag', 'måndag', 'Veckans första dag.', 'På måndag börjar skolan igen.'],
        ['fraga', 'fråga', 'Något man vill ha svar på.', 'Räck upp handen om du har en fråga.'],
        ['lada', 'låda', 'En behållare med lock.', 'Leksakerna ligger i en låda.'],
        ['forlat', 'förlåt', 'Det man säger när man ångrar sig.', 'Säg förlåt om du råkar knuffas.'],
        ['vaning', 'våning', 'Ett plan i ett hus.', 'Huset har en övre våning.'],
        ['aska', 'åska', 'Muller och blixtar på himlen.', 'Hunden gömmer sig när det är åska.'],
        ['alder', 'ålder', 'Hur gammal någon är.', 'Vi är i samma ålder, båda tio år.'],
        ['bada', 'båda', 'Två stycken tillsammans.', 'Vi vann båda matcherna.'],

        // ä-ord
        ['aventyr', 'äventyr', 'En spännande upplevelse.', 'Utflykten blev ett riktigt äventyr.'],
        ['vader', 'väder', 'Sol, regn, vind och snö.', 'Vilket fint väder det är idag!'],
        ['fardig', 'färdig', 'Klar med något.', 'Jag är färdig med läxan.'],
        ['harlig', 'härlig', 'Riktigt skön eller god.', 'Det var en härlig dag på stranden.'],
        ['saker', 'säker', 'Helt övertygad, eller trygg.', 'Jag är säker på att jag låste dörren.'],
        ['tavling', 'tävling', 'När man gör upp om vem som vinner.', 'Vår klass vann en tävling i matte.'],
        ['farg', 'färg', 'Rött, blått och gult är olika färger.', 'Vilken färg gillar du mest?'],
        ['marke', 'märke', 'Ett tecken eller en fläck.', 'Bollen lämnade ett märke i väggen.'],
        ['varld', 'värld', 'Hela jorden.', 'Det finns många länder i vår värld.'],
        ['karlek', 'kärlek', 'Att tycka väldigt mycket om någon.', 'Farmor kramar oss med stor kärlek.'],

        // skola och vardag
        ['larare', 'lärare', 'Undervisar elever i skolan.', 'Vår lärare läser högt varje fredag.'],
        ['telefon', 'telefon', 'Man ringer med den.', 'Mamma pratar i telefon med moster.'],
        ['dator', 'dator', 'En maskin man skriver och spelar på.', 'Vi skriver berättelser på en dator i skolan.'],
        ['fonster', 'fönster', 'Man ser ut genom det.', 'Öppna ett fönster och vädra!'],
        ['present', 'present', 'Något man ger bort.', 'Jag slog in en present till kalaset.'],
        ['kalas', 'kalas', 'En fest, ofta med tårta.', 'Alla i klassen var bjudna på kalas.'],
        ['semester', 'semester', 'Ledighet från jobbet.', 'Pappa har semester hela juli.'],
        ['bibliotek', 'bibliotek', 'Där man lånar böcker.', 'Vi lånade fem böcker på ett bibliotek.'],
        ['sjukhus', 'sjukhus', 'Där sjuka får vård.', 'Ambulansen körde till ett sjukhus.'],
        ['idrott', 'idrott', 'Sport och rörelse.', 'Min favoritlektion i skolan är idrott.'],
        ['ryggsack', 'ryggsäck', 'Väska man bär på ryggen.', 'Packa din ryggsäck kvällen innan.'],
        ['klassrum', 'klassrum', 'Rummet där klassen har lektion.', 'Vårt klassrum ligger på andra våningen.'],

        // sch-ljud och låneord
        ['schema', 'schema', 'Visar när lektionerna är.', 'Enligt vårt schema slutar vi klockan tre.'],
        ['dusch', 'dusch', 'Där man tvättar sig stående.', 'Efter träningen tar jag en dusch.'],
        ['match', 'match', 'En tävling mellan två lag.', 'Vi såg en spännande match i helgen.'],
        ['mustasch', 'mustasch', 'Hår på överläppen.', 'Farfar har en grå mustasch.'],
        ['garage', 'garage', 'Där bilen står inomhus.', 'Bilen står i vårt garage om natten.'],

        // fler viktiga ord
        ['nyckel', 'nyckel', 'Låser upp dörren.', 'Jag glömde min nyckel hemma.'],
        ['cykel', 'cykel', 'Fordon med två hjul och pedaler.', 'Min cykel har fått punktering.'],
        ['siffra', 'siffra', 'Tecken för tal, som 5 eller 9.', 'Skriv varje siffra tydligt.'],
        ['spegel', 'spegel', 'Man ser sig själv i den.', 'Jag kammar mig framför en spegel.'],
        ['fagel', 'fågel', 'Ett djur med vingar och fjädrar.', 'En fågel byggde bo i vår brevlåda.'],
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
