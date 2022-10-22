
let header = document.querySelector("header");

let wordList = [
    "HTML", 
    "CSS",
    "Bootstrap", 
    "JavaScript", 
    "React", 
    "Angular",
    "Node",
    "Express",
    "C#",
    ".NET",
    "Dart",
    "Flutter",
    "Kotlin",
    "Android"
];

let wordElementHeight = 20;
let wordElementWidth = 160;

function randomNumber(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createWord() {
    let posX = randomNumber(header.clientWidth - wordElementWidth);
    let posY = randomNumber(header.clientHeight - wordElementHeight);

    let wordElement = document.createElement("p");
    wordElement.classList.add("header-word");
    wordElement.style.top = `${posY}px`;
    wordElement.style.left = `${posX}px`;

    header.append(wordElement);

    let random = randomNumber(wordList.length - 1);
    let word = wordList[random];

    writeWordRandomly(word, wordElement);
}

function writeWordRandomly(word, element, counter = 1) {
    let time = randomNumber(300, 100);

    setTimeout(() => {
        element.innerText = word.slice(0, counter);
        counter++;

        if (!element.classList.contains("header-word-fade")) {
            element.classList.add("header-word-fade");
        }

        if (counter <= word.length) {
            writeWordRandomly(word, element, counter);
        } else {
            setTimeout(() => {
                element.remove();
            }, 7000);

            createWord();
        }
    }, time);
}