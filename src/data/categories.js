import { SPELLING_TASKS, getSpellingTaskIdsForGrade } from './spellingWords.js';

// Bygger Stavning-kategorin för en årskurs: varje ord är en egen underkategori
const spellingCategory = (grade, color) => ({
    id: `stavning_ak${grade}`,
    name: 'Stavning',
    color,
    subcategories: getSpellingTaskIdsForGrade(grade).map(taskId => ({
        id: taskId,
        name: SPELLING_TASKS[taskId].name,
        tasks: [{ id: taskId, name: SPELLING_TASKS[taskId].name }]
    }))
});

export const GRADE_LEVELS = [
    {
        id: "ak1",
        name: "Åk 1",
        categories: [
            {
                id: "matematik_ak1",
                name: "Matematik",
                color: "#FF6B6B",
                subcategories: [
                    { id: "talraden_0_10", name: "Talraden 0–10", tasks: [{ id: "talraden_0_10", name: "Talraden 0–10" }] },
                    { id: "dela_upp_tal", name: "Dela upp tal / 10-kamrater", tasks: [{ id: "dela_upp_tal", name: "Dela upp tal / 10-kamrater" }] },
                    {
                        id: "addition_0_10",
                        name: "Addition 0–10",
                        tasks: [
                            { id: "addition_0_10", name: "Sifferräkning" },
                            { id: "addition_0_10_ord", name: "Textuppgifter" }
                        ]
                    },
                    { id: "subtraktion_0_10", name: "Subtraktion 0–10", tasks: [{ id: "subtraktion_0_10", name: "Subtraktion 0–10" }] },
                    {
                        id: "dubbelt_halften",
                        name: "Dubbelt och hälften",
                        tasks: [
                            { id: "dubbelt_halften_dubbelt", name: "Dubbelt" },
                            { id: "dubbelt_halften_halften", name: "Hälften" }
                        ]
                    },
                    {
                        id: "udda_jamna",
                        name: "Udda och jämna tal",
                        tasks: [
                            { id: "udda_jamna_jamna", name: "Jämna tal" },
                            { id: "udda_jamna_udda", name: "Udda tal" }
                        ]
                    },
                    { id: "likhetstecknet", name: "Likhetstecknets betydelse (=)", tasks: [{ id: "likhetstecknet", name: "Likhetstecknets betydelse (=)" }] },
                    { id: "2D_former", name: "2D-former", tasks: [{ id: "2D_former", name: "2D-former" }] },
                    { id: "klockan_hel", name: "Klockan (Hel)", tasks: [{ id: "klockan_hel", name: "Klockan (Hel)" }] },
                    { id: "sortera_data", name: "Sortera data", tasks: [{ id: "sortera_data", name: "Sortera data" }] }
                ]
            },
            spellingCategory(1, "#20B2AA")
        ]
    },
    {
        id: "ak2",
        name: "Åk 2",
        categories: [
            {
                id: "matematik_ak2",
                name: "Matematik",
                color: "#FF8C00",
                subcategories: [
                    { id: "talraden_0_20", name: "Talraden 0–20", tasks: [{ id: "talraden_0_20", name: "Talraden 0–20" }] },
                    { id: "addition_0_20", name: "Addition 0–20", tasks: [{ id: "addition_0_20", name: "Addition 0–20" }] },
                    { id: "subtraktion_0_20", name: "Subtraktion 0–20", tasks: [{ id: "subtraktion_0_20", name: "Subtraktion 0–20" }] },
                    {
                        id: "del_av_helhet",
                        name: "Del av helhet",
                        tasks: [
                            { id: "del_av_helhet_halv", name: "Halva (1/2)" },
                            { id: "del_av_helhet_fjardedel", name: "Fjärdedel (1/4)" }
                        ]
                    },
                    { id: "monster_tal", name: "Mönster i talföljder", tasks: [{ id: "monster_tal", name: "Mönster i talföljder" }] },
                    { id: "geometriska_monster", name: "Geometriska mönster", tasks: [{ id: "geometriska_monster", name: "Geometriska mönster" }] },
                    { id: "3D_former", name: "3D-former", tasks: [{ id: "3D_former", name: "3D-former" }] },
                    { id: "klockan_halv", name: "Klockan (Halv)", tasks: [{ id: "klockan_halv", name: "Klockan (Halv)" }] },
                    { id: "mata_langd", name: "Mäta längd", tasks: [{ id: "mata_langd", name: "Mäta längd" }] },
                    { id: "avlasa_tabeller", name: "Avläsa tabeller och diagram", tasks: [{ id: "avlasa_tabeller", name: "Avläsa tabeller och diagram" }] },
                    {
                        id: "raknehandelser",
                        name: "Räknehändelser / Textuppgifter",
                        tasks: [
                            { id: "raknehandelser_addition", name: "Textuppgifter (Addition)" },
                            { id: "raknehandelser_subtraktion", name: "Textuppgifter (Subtraktion)" }
                        ]
                    }
                ]
            },
            spellingCategory(2, "#20B2AA")
        ]
    },
    {
        id: "ak3",
        name: "Åk 3",
        categories: [
            {
                id: "matematik_ak3",
                name: "Matematik",
                color: "#F9A826",
                subcategories: [
                    { id: "positionssystemet", name: "Positionssystemet", tasks: [{ id: "positionssystemet", name: "Positionssystemet" }] },
                    { id: "multiplikation_0_100", name: "Multiplikation (Små tal)", tasks: [{ id: "multiplikation_sma", name: "Multiplikation (Små tal)" }] },
                    { id: "division_sma", name: "Division (Små tal)", tasks: [{ id: "division_sma", name: "Division (Små tal)" }] },
                    { id: "huvudrakning", name: "Huvudräkning", tasks: [{ id: "huvudrakning", name: "Huvudräkning" }] },
                    { id: "rimlighetsbedomning", name: "Rimlighetsbedömning", tasks: [{ id: "rimlighetsbedomning", name: "Rimlighetsbedömning" }] },
                    { id: "obekanta_tal", name: "Obekanta tal", tasks: [{ id: "obekanta_tal", name: "Obekanta tal" }] },
                    { id: "instruktioner", name: "Enkla instruktioner", tasks: [{ id: "instruktioner", name: "Enkla instruktioner" }] },
                    { id: "symmetri", name: "Symmetri", tasks: [{ id: "symmetri", name: "Symmetri" }] },
                    { id: "klockan_kvart_20", name: "Klockan (Kvart & 20)", tasks: [{ id: "klockan_kvart_20", name: "Klockan (Kvart & 20)" }] },
                    { id: "klockan_5_iover", name: "Klockan (5 i/över & 10 i/över)", tasks: [{ id: "klockan_5_iover", name: "Klockan (5 i/över & 10 i/över)" }] },
                    { id: "mata_volym", name: "Mäta volym", tasks: [{ id: "mata_volym", name: "Mäta volym" }] },
                    { id: "mata_vikt", name: "Mäta massa/vikt", tasks: [{ id: "mata_vikt", name: "Mäta massa/vikt" }] },
                    { id: "skapa_diagram", name: "Skapa enkla diagram", tasks: [{ id: "skapa_diagram", name: "Skapa enkla diagram" }] },
                    {
                        id: "valja_raknesatt",
                        name: "Välja räknesätt",
                        tasks: [
                            { id: "valja_raknesatt_addition", name: "Välja räknesätt (Addition)" },
                            { id: "valja_raknesatt_subtraktion", name: "Välja räknesätt (Subtraktion)" }
                        ]
                    }
                ]
            },
            spellingCategory(3, "#20B2AA")
        ]
    },
    {
        id: "ak4",
        name: "Åk 4",
        categories: [
            {
                id: "matematik_ak4",
                name: "Matematik",
                color: "#4ECDC4",
                subcategories: [
                    { id: "brak_vardagen", name: "Bråktal i vardagen", tasks: [{ id: "rationella_tal_brak", name: "Bråktal i vardagen" }] },
                    { id: "decimaltal", name: "Positionssystemet (Decimaltal)", tasks: [{ id: "decimaltal", name: "Positionssystemet (Decimaltal)" }] },
                    { id: "multiplikation_stora", name: "Multiplikation (Stora tal)", tasks: [{ id: "multiplikation_stora", name: "Multiplikation (Stora tal)" }] },
                    { id: "division_stora", name: "Division (Stora tal)", tasks: [{ id: "division_stora", name: "Division (Stora tal)" }] },
                    { id: "berakningsmetoder", name: "Skriftliga beräkningsmetoder", tasks: [{ id: "berakningsmetoder", name: "Skriftliga beräkningsmetoder" }] },
                    { id: "ekvationer", name: "Likhetstecknet och enkla ekvationer", tasks: [{ id: "ekvationer", name: "Likhetstecknet och enkla ekvationer" }] },
                    { id: "nya_objekt", name: "Geometriska objekt (Polygoner, osv)", tasks: [{ id: "nya_objekt", name: "Geometriska objekt (Polygoner, osv)" }] },
                    { id: "enhetsbyten", name: "Mätning och enhetsbyten", tasks: [{ id: "enhetsbyten", name: "Mätning och enhetsbyten" }] },
                    { id: "area_omkrets", name: "Area och omkrets", tasks: [{ id: "area_omkrets", name: "Area och omkrets" }] },
                    { id: "linjediagram", name: "Tabeller och avancerade diagram", tasks: [{ id: "linjediagram", name: "Tabeller och avancerade diagram" }] },
                    { id: "koordinatsystem", name: "Koordinatsystem", tasks: [{ id: "koordinatsystem", name: "Koordinatsystem" }] },
                    { id: "strategier", name: "Strategier för problem", tasks: [{ id: "strategier", name: "Strategier för problem" }] }
                ]
            },
            spellingCategory(4, "#20B2AA")
        ]
    },
    {
        id: "ak5",
        name: "Åk 5",
        categories: [
            {
                id: "matematik_ak5",
                name: "Matematik",
                color: "#6A5ACD",
                subcategories: [
                    {
                        id: "brak_add_sub",
                        name: "Addition och subtraktion av bråk",
                        tasks: [
                            { id: "brak_addition", name: "Addition av bråk" },
                            { id: "brak_subtraktion", name: "Subtraktion av bråk" }
                        ]
                    },
                    { id: "negativa_tal", name: "Negativa tal", tasks: [{ id: "rationella_tal_negativa", name: "Negativa tal" }] },
                    { id: "procent", name: "Procent", tasks: [{ id: "procent", name: "Procent" }] },
                    { id: "prioriteringsregler", name: "Prioriteringsregler och räknelagar", tasks: [{ id: "prioriteringsregler", name: "Prioriteringsregler och räknelagar" }] },
                    { id: "variabler", name: "Variabler", tasks: [{ id: "variabler", name: "Variabler" }] },
                    { id: "uttrycka_monster", name: "Uttrycka mönster", tasks: [{ id: "uttrycka_monster", name: "Uttrycka mönster" }] },
                    { id: "skala", name: "Skala", tasks: [{ id: "skala", name: "Skala" }] },
                    { id: "konstruktion", name: "Konstruktion av objekt", tasks: [{ id: "konstruktion", name: "Konstruktion av objekt" }] },
                    { id: "sannolikhet", name: "Sannolikhet, chans och risk", tasks: [{ id: "sannolikhet", name: "Sannolikhet, chans och risk" }] },
                    { id: "lagesmatt", name: "Lägesmått (Medel, Median, Typ)", tasks: [{ id: "lagesmatt", name: "Lägesmått (Medel, Median, Typ)" }] },
                    { id: "proportionalitet", name: "Proportionalitet", tasks: [{ id: "proportionalitet", name: "Proportionalitet" }] },
                    { id: "historiska_talsystem", name: "Historiska talsystem", tasks: [{ id: "historiska_talsystem", name: "Historiska talsystem" }] }
                ]
            },
            spellingCategory(5, "#20B2AA")
        ]
    },
    {
        id: "ak6",
        name: "Åk 6",
        categories: [
            {
                id: "matematik_ak6",
                name: "Matematik",
                color: "#D65DB1",
                subcategories: [
                    {
                        id: "brak_mult_div",
                        name: "Multiplikation och division av bråk",
                        tasks: [
                            { id: "brak_multiplikation", name: "Multiplikation av bråk" },
                            { id: "brak_division", name: "Division av bråk" }
                        ]
                    },
                    { id: "ekvationslosning", name: "Ekvationslösning", tasks: [{ id: "ekvationslosning", name: "Ekvationslösning" }] },
                    { id: "algoritmer", name: "Programmering och algoritmer", tasks: [{ id: "algoritmer", name: "Programmering och algoritmer" }] },
                    { id: "tessellation", name: "Symmetri och tessellation", tasks: [{ id: "tessellation", name: "Symmetri och tessellation" }] },
                    { id: "kombinatorik", name: "Kombinatorik", tasks: [{ id: "kombinatorik", name: "Kombinatorik" }] },
                    { id: "grafer", name: "Grafer", tasks: [{ id: "grafer", name: "Grafer" }] },
                    { id: "digitala_verktyg", name: "Digitala verktyg för beräkning", tasks: [{ id: "digitala_verktyg", name: "Digitala verktyg för beräkning" }] },
                    { id: "komplex_rimlighet", name: "Rimlighetsbedömning i komplexa beräkningar", tasks: [{ id: "komplex_rimlighet", name: "Rimlighetsbedömning i komplexa beräkningar" }] },
                    { id: "formulera_problem", name: "Formulera matematiska frågeställningar", tasks: [{ id: "formulera_problem", name: "Formulera matematiska frågeställningar" }] }
                ]
            },
            spellingCategory(6, "#20B2AA")
        ]
    }
];

// Helper to get all categories flat
export const getAllCategories = () => Object.values(GRADE_LEVELS).flatMap(g => g.categories);

// Helper to get all subcategory IDs
export const getAllSubcategoryIds = () => {
    return getAllCategories().flatMap(cat => cat.subcategories.map(sub => sub.id));
};

// Helper to get all task IDs
export const getAllTaskIds = () => {
    return getAllCategories().flatMap(cat =>
        cat.subcategories.flatMap(sub =>
            sub.tasks.map(task => task.id)
        )
    );
};

// Task IDs per grade, in grade order — used for progression (lowest grade first)
export const getGradeTaskIdSequence = () => GRADE_LEVELS.map(grade => ({
    gradeId: grade.id,
    taskIds: grade.categories.flatMap(cat =>
        cat.subcategories.flatMap(sub => sub.tasks.map(task => task.id))
    )
}));
