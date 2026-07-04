import { SPELLING_TASKS } from './spellingWords.js';

export const GRADE_LEVELS = [
    {
        id: "ak1_3",
        name: "Lågstadiet (ÅK 1-3)",
        categories: [
            {
                id: "taluppfattning",
                name: "Taluppfattning och tals användning",
                color: "#FF6B6B",
                subcategories: [
                    { id: "talraden_0_10", name: "Talraden 0–10", tasks: [{ id: "talraden_0_10", name: "Talraden 0–10" }] },
                    { id: "talraden_0_20", name: "Talraden 0–20", tasks: [{ id: "talraden_0_20", name: "Talraden 0–20" }] },
                    { id: "dela_upp_tal", name: "Dela upp tal / 10-kamrater", tasks: [{ id: "dela_upp_tal", name: "Dela upp tal / 10-kamrater" }] },
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
                    { id: "positionssystemet", name: "Positionssystemet", tasks: [{ id: "positionssystemet", name: "Positionssystemet" }] },
                    {
                        id: "del_av_helhet",
                        name: "Del av helhet",
                        tasks: [
                            { id: "del_av_helhet_halv", name: "Halva (1/2)" },
                            { id: "del_av_helhet_fjardedel", name: "Fjärdedel (1/4)" }
                        ]
                    }
                ]
            },
            {
                id: "aritmetik",
                name: "De fyra räknesätten (Aritmetik)",
                color: "#4ECDC4",
                subcategories: [
                    {
                        id: "addition_0_10",
                        name: "Addition 0–10",
                        tasks: [
                            { id: "addition_0_10", name: "Sifferräkning" },
                            { id: "addition_0_10_ord", name: "Textuppgifter" }
                        ]
                    },
                    { id: "addition_0_20", name: "Addition 0–20", tasks: [{ id: "addition_0_20", name: "Addition 0–20" }] },
                    { id: "subtraktion_0_10", name: "Subtraktion 0–10", tasks: [{ id: "subtraktion_0_10", name: "Subtraktion 0–10" }] },
                    { id: "subtraktion_0_20", name: "Subtraktion 0–20", tasks: [{ id: "subtraktion_0_20", name: "Subtraktion 0–20" }] },
                    { id: "multiplikation_0_100", name: "Multiplikation (Små tal)", tasks: [{ id: "multiplikation_sma", name: "Multiplikation (Små tal)" }] },
                    { id: "division_sma", name: "Division (Små tal)", tasks: [{ id: "division_sma", name: "Division (Små tal)" }] },
                    { id: "huvudrakning", name: "Huvudräkning", tasks: [{ id: "huvudrakning", name: "Huvudräkning" }] },
                    { id: "rimlighetsbedomning", name: "Rimlighetsbedömning", tasks: [{ id: "rimlighetsbedomning", name: "Rimlighetsbedömning" }] }
                ]
            },
            {
                id: "algebra",
                name: "Algebra",
                color: "#FFE66D",
                subcategories: [
                    { id: "likhetstecknet", name: "Likhetstecknets betydelse (=)", tasks: [{ id: "likhetstecknet", name: "Likhetstecknets betydelse (=)" }] },
                    { id: "obekanta_tal", name: "Obekanta tal", tasks: [{ id: "obekanta_tal", name: "Obekanta tal" }] },
                    { id: "monster_tal", name: "Mönster i talföljder", tasks: [{ id: "monster_tal", name: "Mönster i talföljder" }] },
                    { id: "geometriska_monster", name: "Geometriska mönster", tasks: [{ id: "geometriska_monster", name: "Geometriska mönster" }] },
                    { id: "instruktioner", name: "Enkla instruktioner", tasks: [{ id: "instruktioner", name: "Enkla instruktioner" }] }
                ]
            },
            {
                id: "geometri",
                name: "Geometri",
                color: "#6A5ACD",
                subcategories: [
                    { id: "2D_former", name: "2D-former", tasks: [{ id: "2D_former", name: "2D-former" }] },
                    { id: "3D_former", name: "3D-former", tasks: [{ id: "3D_former", name: "3D-former" }] },
                    { id: "symmetri", name: "Symmetri", tasks: [{ id: "symmetri", name: "Symmetri" }] }
                ]
            },
            {
                id: "matning",
                name: "Mätning och tid",
                color: "#FF8C00",
                subcategories: [
                    { id: "klockan_hel", name: "Klockan (Hel)", tasks: [{ id: "klockan_hel", name: "Klockan (Hel)" }] },
                    { id: "klockan_halv", name: "Klockan (Halv)", tasks: [{ id: "klockan_halv", name: "Klockan (Halv)" }] },
                    { id: "klockan_kvart_20", name: "Klockan (Kvart & 20)", tasks: [{ id: "klockan_kvart_20", name: "Klockan (Kvart & 20)" }] },
                    { id: "klockan_5_iover", name: "Klockan (5 i/över & 10 i/över)", tasks: [{ id: "klockan_5_iover", name: "Klockan (5 i/över & 10 i/över)" }] },
                    { id: "mata_langd", name: "Mäta längd", tasks: [{ id: "mata_langd", name: "Mäta längd" }] },
                    { id: "mata_volym", name: "Mäta volym", tasks: [{ id: "mata_volym", name: "Mäta volym" }] },
                    { id: "mata_vikt", name: "Mäta massa/vikt", tasks: [{ id: "mata_vikt", name: "Mäta massa/vikt" }] }
                ]
            },
            {
                id: "statistik",
                name: "Sannolikhet och statistik",
                color: "#20B2AA",
                subcategories: [
                    { id: "avlasa_tabeller", name: "Avläsa tabeller och diagram", tasks: [{ id: "avlasa_tabeller", name: "Avläsa tabeller och diagram" }] },
                    { id: "skapa_diagram", name: "Skapa enkla diagram", tasks: [{ id: "skapa_diagram", name: "Skapa enkla diagram" }] },
                    { id: "sortera_data", name: "Sortera data", tasks: [{ id: "sortera_data", name: "Sortera data" }] }
                ]
            },
            {
                id: "problemlosning",
                name: "Problemlösning",
                color: "#FF1493",
                subcategories: [
                    {
                        id: "raknehandelser",
                        name: "Räknehändelser / Textuppgifter",
                        tasks: [
                            { id: "raknehandelser_addition", name: "Textuppgifter (Addition)" },
                            { id: "raknehandelser_subtraktion", name: "Textuppgifter (Subtraktion)" }
                        ]
                    },
                    {
                        id: "valja_raknesatt",
                        name: "Välja räknesätt",
                        tasks: [
                            { id: "valja_raknesatt_addition", name: "Välja räknesätt (Addition)" },
                            { id: "valja_raknesatt_subtraktion", name: "Välja räknesätt (Subtraktion)" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "ak4_6",
        name: "Mellanstadiet (ÅK 4-6)",
        categories: [
            {
                id: "ak4_taluppfattning",
                name: "Taluppfattning och tals användning",
                color: "#E27D60",
                subcategories: [
                    {
                        id: "rationella_tal",
                        name: "Rationella och negativa tal",
                        tasks: [
                            { id: "rationella_tal_brak", name: "Bråktal i vardagen" },
                            { id: "brak_addition", name: "Addition av bråk" },
                            { id: "brak_subtraktion", name: "Subtraktion av bråk" },
                            { id: "brak_multiplikation", name: "Multiplikation av bråk" },
                            { id: "brak_division", name: "Division av bråk" },
                            { id: "rationella_tal_negativa", name: "Negativa tal" }
                        ]
                    },
                    { id: "multiplikation_stora", name: "Multiplikation (Stora tal)", tasks: [{ id: "multiplikation_stora", name: "Multiplikation (Stora tal)" }] },
                    { id: "division_stora", name: "Division (Stora tal)", tasks: [{ id: "division_stora", name: "Division (Stora tal)" }] },
                    { id: "procent", name: "Procent", tasks: [{ id: "procent", name: "Procent" }] },
                    { id: "decimaltal", name: "Positionssystemet (Decimaltal)", tasks: [{ id: "decimaltal", name: "Positionssystemet (Decimaltal)" }] },
                    { id: "historiska_talsystem", name: "Historiska talsystem", tasks: [{ id: "historiska_talsystem", name: "Historiska talsystem" }] },
                    { id: "prioriteringsregler", name: "Prioriteringsregler och räknelagar", tasks: [{ id: "prioriteringsregler", name: "Prioriteringsregler och räknelagar" }] },
                    { id: "berakningsmetoder", name: "Skriftliga beräkningsmetoder", tasks: [{ id: "berakningsmetoder", name: "Skriftliga beräkningsmetoder" }] },
                    { id: "digitala_verktyg", name: "Digitala verktyg för beräkning", tasks: [{ id: "digitala_verktyg", name: "Digitala verktyg för beräkning" }] },
                    { id: "komplex_rimlighet", name: "Rimlighetsbedömning i komplexa beräkningar", tasks: [{ id: "komplex_rimlighet", name: "Rimlighetsbedömning i komplexa beräkningar" }] }
                ]
            },
            {
                id: "ak4_algebra",
                name: "Algebra",
                color: "#E8A87C",
                subcategories: [
                    { id: "ekvationer", name: "Likhetstecknet och enkla ekvationer", tasks: [{ id: "ekvationer", name: "Likhetstecknet och enkla ekvationer" }] },
                    { id: "variabler", name: "Variabler", tasks: [{ id: "variabler", name: "Variabler" }] },
                    { id: "ekvationslosning", name: "Ekvationslösning", tasks: [{ id: "ekvationslosning", name: "Ekvationslösning" }] },
                    { id: "uttrycka_monster", name: "Uttrycka mönster", tasks: [{ id: "uttrycka_monster", name: "Uttrycka mönster" }] },
                    { id: "algoritmer", name: "Programmering och algoritmer", tasks: [{ id: "algoritmer", name: "Programmering och algoritmer" }] }
                ]
            },
            {
                id: "ak4_geometri",
                name: "Geometri",
                color: "#C38D9E",
                subcategories: [
                    { id: "nya_objekt", name: "Geometriska objekt (Polygoner, osv)", tasks: [{ id: "nya_objekt", name: "Geometriska objekt (Polygoner, osv)" }] },
                    { id: "konstruktion", name: "Konstruktion av objekt", tasks: [{ id: "konstruktion", name: "Konstruktion av objekt" }] },
                    { id: "enhetsbyten", name: "Mätning och enhetsbyten", tasks: [{ id: "enhetsbyten", name: "Mätning och enhetsbyten" }] },
                    { id: "area_omkrets", name: "Area och omkrets", tasks: [{ id: "area_omkrets", name: "Area och omkrets" }] },
                    { id: "skala", name: "Skala", tasks: [{ id: "skala", name: "Skala" }] },
                    { id: "tessellation", name: "Symmetri och tessellation", tasks: [{ id: "tessellation", name: "Symmetri och tessellation" }] }
                ]
            },
            {
                id: "ak4_statistik",
                name: "Sannolikhet och statistik",
                color: "#41B3A3",
                subcategories: [
                    { id: "sannolikhet", name: "Sannolikhet, chans och risk", tasks: [{ id: "sannolikhet", name: "Sannolikhet, chans och risk" }] },
                    { id: "kombinatorik", name: "Kombinatorik", tasks: [{ id: "kombinatorik", name: "Kombinatorik" }] },
                    { id: "linjediagram", name: "Tabeller och avancerade diagram", tasks: [{ id: "linjediagram", name: "Tabeller och avancerade diagram" }] },
                    { id: "lagesmatt", name: "Lägesmått (Medel, Median, Typ)", tasks: [{ id: "lagesmatt", name: "Lägesmått (Medel, Median, Typ)" }] }
                ]
            },
            {
                id: "ak4_samband",
                name: "Samband och förändring",
                color: "#85DCB0",
                subcategories: [
                    { id: "proportionalitet", name: "Proportionalitet", tasks: [{ id: "proportionalitet", name: "Proportionalitet" }] },
                    { id: "koordinatsystem", name: "Koordinatsystem", tasks: [{ id: "koordinatsystem", name: "Koordinatsystem" }] },
                    { id: "grafer", name: "Grafer", tasks: [{ id: "grafer", name: "Grafer" }] }
                ]
            },
            {
                id: "ak4_problemlosning",
                name: "Problemlösning",
                color: "#E29578",
                subcategories: [
                    { id: "strategier", name: "Strategier för problem", tasks: [{ id: "strategier", name: "Strategier för problem" }] },
                    { id: "formulera_problem", name: "Formulera matematiska frågeställningar", tasks: [{ id: "formulera_problem", name: "Formulera matematiska frågeställningar" }] }
                ]
            }
        ]
    },

    // ──────────────────────────────────────
    // STAVNING — Lågstadiet ÅK 1-3
    // ──────────────────────────────────────
    {
        id: "stavning_ak1_3",
        name: "Stavning (ÅK 1-3)",
        categories: [
            {
                id: "stavning_lagstadiet",
                name: "Stavning",
                color: "#A8D5BA",
                subcategories: [
                    {
                        id: "stav_ak1_djur",
                        name: "Djur",
                        tasks: [{ id: "stav_ak1_djur", name: "Stavning — Djur" }]
                    },
                    {
                        id: "stav_ak1_kropp",
                        name: "Kroppen",
                        tasks: [{ id: "stav_ak1_kropp", name: "Stavning — Kroppen" }]
                    },
                    {
                        id: "stav_ak1_mat",
                        name: "Mat & dryck",
                        tasks: [{ id: "stav_ak1_mat", name: "Stavning — Mat & dryck" }]
                    },
                    {
                        id: "stav_ak1_natur",
                        name: "Natur & väder",
                        tasks: [{ id: "stav_ak1_natur", name: "Stavning — Natur & väder" }]
                    },
                    {
                        id: "stav_ak1_hem",
                        name: "Hemmet",
                        tasks: [{ id: "stav_ak1_hem", name: "Stavning — Hemmet" }]
                    },
                    {
                        id: "stav_ak1_skola",
                        name: "Skolan",
                        tasks: [{ id: "stav_ak1_skola", name: "Stavning — Skolan" }]
                    },
                    {
                        id: "stav_ak1_kläder",
                        name: "Kläder",
                        tasks: [{ id: "stav_ak1_kläder", name: "Stavning — Kläder" }]
                    }
                ]
            }
        ]
    },

    // ──────────────────────────────────────
    // STAVNING — Mellanstadiet ÅK 4-6
    // ──────────────────────────────────────
    {
        id: "stavning_ak4_6",
        name: "Stavning (ÅK 4-6)",
        categories: [
            {
                id: "stavning_mellanstadiet",
                name: "Stavning",
                color: "#B5C8E2",
                subcategories: [
                    {
                        id: "stav_ak4_samhalle",
                        name: "Samhälle",
                        tasks: [{ id: "stav_ak4_samhalle", name: "Stavning — Samhälle" }]
                    },
                    {
                        id: "stav_ak4_natur",
                        name: "Natur & geografi",
                        tasks: [{ id: "stav_ak4_natur", name: "Stavning — Natur & geografi" }]
                    },
                    {
                        id: "stav_ak4_kropp",
                        name: "Kropp & hälsa",
                        tasks: [{ id: "stav_ak4_kropp", name: "Stavning — Kropp & hälsa" }]
                    }
                ]
            }
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
