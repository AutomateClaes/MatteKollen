// =============================================================
// Engelska glosor per årskurs. Varje ord övas i fyra lägen:
// eng→sve och sve→eng, som fritext eller fyra alternativ.
// `sentence` är en enkel engelsk mening som innehåller ordet
// exakt — spelet fetmarkerar ordet och kan läsa upp meningen.
// Task-ID: eng_ak{n}_{ensv|sven}_{txt|val}_{slug}
// =============================================================

export const ENGLISH_WORDS = {
    3: [
        // Djur
        { en: 'dog', sv: 'hund', sentence: 'The dog is barking loudly.' },
        { en: 'cat', sv: 'katt', sentence: 'The cat is sleeping on the sofa.' },
        { en: 'horse', sv: 'häst', sentence: 'The horse is running fast.' },
        { en: 'cow', sv: 'ko', sentence: 'The cow is eating grass.' },
        { en: 'pig', sv: 'gris', sentence: 'The pig is pink and muddy.' },
        { en: 'sheep', sv: 'får', sentence: 'The sheep has white wool.' },
        { en: 'bird', sv: 'fågel', sentence: 'A bird is flying high.' },
        { en: 'fish', sv: 'fisk', sentence: 'The fish swims in the lake.' },
        { en: 'mouse', sv: 'mus', sentence: 'A little mouse ran across the floor.' },
        { en: 'rabbit', sv: 'kanin', sentence: 'The rabbit has long ears.' },
        // Färger
        { en: 'red', sv: 'röd', sentence: 'The tomato is red.' },
        { en: 'blue', sv: 'blå', sentence: 'My new bike is blue.' },
        { en: 'green', sv: 'grön', sentence: 'The grass is green.' },
        { en: 'yellow', sv: 'gul', sentence: 'The banana is yellow.' },
        { en: 'black', sv: 'svart', sentence: 'The spider is black.' },
        { en: 'white', sv: 'vit', sentence: 'The clouds are white.' },
        { en: 'brown', sv: 'brun', sentence: 'The bear is brown.' },
        { en: 'pink', sv: 'rosa', sentence: 'The flamingo is pink.' },
        // Siffror
        { en: 'one', sv: 'ett', sentence: 'I have one red balloon.' },
        { en: 'two', sv: 'två', sentence: 'I have two hands.' },
        { en: 'three', sv: 'tre', sentence: 'I see three boats on the lake.' },
        { en: 'four', sv: 'fyra', sentence: 'A car has four wheels.' },
        { en: 'five', sv: 'fem', sentence: 'I have five fingers on each hand.' },
        { en: 'six', sv: 'sex', sentence: 'The insect has six legs.' },
        { en: 'seven', sv: 'sju', sentence: 'A week has seven days.' },
        { en: 'eight', sv: 'åtta', sentence: 'The spider has eight legs.' },
        { en: 'nine', sv: 'nio', sentence: 'The bus leaves at nine.' },
        { en: 'ten', sv: 'tio', sentence: 'I can count to ten.' },
        // Familj
        { en: 'mother', sv: 'mamma', sentence: 'My mother reads me a story.' },
        { en: 'father', sv: 'pappa', sentence: 'My father cooks dinner.' },
        { en: 'sister', sv: 'syster', sentence: 'My sister is older than me.' },
        { en: 'brother', sv: 'bror', sentence: 'My brother plays football.' },
        { en: 'friend', sv: 'vän', sentence: 'She is my best friend.' },
        { en: 'family', sv: 'familj', sentence: 'My family lives in Sweden.' },
        // Kroppen
        { en: 'head', sv: 'huvud', sentence: 'Put the hat on your head.' },
        { en: 'eye', sv: 'öga', sentence: 'I have something in my eye.' },
        { en: 'ear', sv: 'öra', sentence: 'He whispered in my ear.' },
        { en: 'nose', sv: 'näsa', sentence: 'The clown has a red nose.' },
        { en: 'mouth', sv: 'mun', sentence: 'Open your mouth at the dentist.' },
        { en: 'leg', sv: 'ben', sentence: 'The football player hurt his leg.' },
        { en: 'foot', sv: 'fot', sentence: 'I kick the ball with my foot.' },
        { en: 'hair', sv: 'hår', sentence: 'She has long brown hair.' },
        // Mat & dryck
        { en: 'apple', sv: 'äpple', sentence: 'I eat an apple every day.' },
        { en: 'bread', sv: 'bröd', sentence: 'We bake fresh bread.' },
        { en: 'milk', sv: 'mjölk', sentence: 'I drink milk for breakfast.' },
        { en: 'cheese', sv: 'ost', sentence: 'The mouse loves cheese.' },
        { en: 'egg', sv: 'ägg', sentence: 'I had a boiled egg this morning.' },
        { en: 'water', sv: 'vatten', sentence: 'Please give me a glass of water.' },
        { en: 'banana', sv: 'banan', sentence: 'The monkey eats a banana.' },
        { en: 'cake', sv: 'tårta', sentence: 'We eat cake at birthdays.' },
        { en: 'sausage', sv: 'korv', sentence: 'Dad grills a sausage for me.' },
        { en: 'soup', sv: 'soppa', sentence: 'Hot soup is good in winter.' },
        { en: 'butter', sv: 'smör', sentence: 'I put butter on my bread.' },
        { en: 'tea', sv: 'te', sentence: 'Grandma drinks tea every morning.' },
        // Hemmet
        { en: 'house', sv: 'hus', sentence: 'We live in a yellow house.' },
        { en: 'door', sv: 'dörr', sentence: 'Please close the door.' },
        { en: 'window', sv: 'fönster', sentence: 'Open the window, it is warm.' },
        { en: 'table', sv: 'bord', sentence: 'The food is on the table.' },
        { en: 'chair', sv: 'stol', sentence: 'Sit down on the chair.' },
        { en: 'bed', sv: 'säng', sentence: 'I sleep in my bed.' },
        { en: 'lamp', sv: 'lampa', sentence: 'Turn on the lamp, please.' },
        { en: 'kitchen', sv: 'kök', sentence: 'Mum is in the kitchen.' },
        { en: 'garden', sv: 'trädgård', sentence: 'Flowers grow in the garden.' },
        { en: 'key', sv: 'nyckel', sentence: 'I lost my key again.' },
        // Skolan
        { en: 'school', sv: 'skola', sentence: 'We go to school by bus.' },
        { en: 'book', sv: 'bok', sentence: 'I am reading a good book.' },
        { en: 'pen', sv: 'penna', sentence: 'Can I borrow your pen?' },
        { en: 'teacher', sv: 'lärare', sentence: 'Our teacher is very kind.' },
        { en: 'bag', sv: 'väska', sentence: 'My bag is full of books.' },
        { en: 'paper', sv: 'papper', sentence: 'Draw a house on the paper.' },
        { en: 'scissors', sv: 'sax', sentence: 'Cut the paper with scissors.' },
        { en: 'ruler', sv: 'linjal', sentence: 'Draw a line with the ruler.' },
        // Kläder
        { en: 'shoe', sv: 'sko', sentence: 'My shoe has a hole in it.' },
        { en: 'sock', sv: 'strumpa', sentence: 'I found one blue sock.' },
        { en: 'hat', sv: 'hatt', sentence: 'He wears a funny hat.' },
        { en: 'jacket', sv: 'jacka', sentence: 'Take your jacket, it is cold.' },
        { en: 'dress', sv: 'klänning', sentence: 'She wears a red dress.' },
        { en: 'trousers', sv: 'byxor', sentence: 'My trousers are too short.' },
        { en: 'shirt', sv: 'skjorta', sentence: 'Dad irons his shirt.' },
        { en: 'sweater', sv: 'tröja', sentence: 'This sweater is very warm.' },
        // Natur & väder
        { en: 'sun', sv: 'sol', sentence: 'The sun is shining today.' },
        { en: 'moon', sv: 'måne', sentence: 'The moon shines at night.' },
        { en: 'star', sv: 'stjärna', sentence: 'I saw a falling star.' },
        { en: 'rain', sv: 'regn', sentence: 'Take an umbrella in the rain.' },
        { en: 'snow', sv: 'snö', sentence: 'The children play in the snow.' },
        { en: 'tree', sv: 'träd', sentence: 'We climb the old tree.' },
        { en: 'flower', sv: 'blomma', sentence: 'The bee lands on the flower.' },
        { en: 'sky', sv: 'himmel', sentence: 'There are clouds in the sky.' },
        { en: 'sea', sv: 'hav', sentence: 'We swim in the sea.' },
        { en: 'stone', sv: 'sten', sentence: 'He threw a stone in the lake.' },
        // Verb
        { en: 'run', sv: 'springa', sentence: 'I can run very fast.' },
        { en: 'jump', sv: 'hoppa', sentence: 'I can jump over the fence.' },
        { en: 'eat', sv: 'äta', sentence: 'We eat dinner at six.' },
        { en: 'drink', sv: 'dricka', sentence: 'I drink juice with breakfast.' },
        { en: 'sleep', sv: 'sova', sentence: 'Babies sleep a lot.' },
        { en: 'play', sv: 'leka', sentence: 'The children play in the park.' },
        { en: 'read', sv: 'läsa', sentence: 'I read before bedtime.' },
        { en: 'write', sv: 'skriva', sentence: 'I write a letter to grandma.' },
        { en: 'sing', sv: 'sjunga', sentence: 'We sing songs at school.' },
        { en: 'swim', sv: 'simma', sentence: 'I can swim across the pool.' },
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
