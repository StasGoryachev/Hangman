import {
   WORDS,
   KEYBOAD_LETTERS
} from "./consts";



const gameDiv = document.getElementById("game");

const creatPlaceholderHTML = () => {
   const word = sessionStorage.getItem('word')
   // преварщаем в массив слово
   const wordArray = Array.from(word)
   const placeholdersHTML = wordArray.reduce((acc, curr, i) => acc + `<h1 id=letter_${i} class="letter"> _ </h1>`, '')


   //2 вариант
   // const wordArray = Array.from('_'.repeat(word.length))
   // console.log("creatPlaceholderHTML ~ wordArray:", wordArray)
   // const placeholdersHTML = wordArray.reduce((acc, curr, i) => acc + `<h1 id=letter_${i} class="letter"> _ </h1>`, '')

   // let placeholdersHTML = '';
   // for (let i = 0; i < word.length; i++) {
   //    placeholdersHTML = placeholdersHTML + `<h1 id=letter_${i} class="letter"> _ </h1>`
   // }

   return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`
}

const createKeyboard = () => {
   const keyboard = document.createElement('div');
   keyboard.classList.add('keyboard');
   keyboard.id = 'keyboard';
   const keyboardHTML = KEYBOAD_LETTERS.reduce((acc, curr) => {
      return acc + `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
   }, '')
   keyboard.innerHTML = keyboardHTML;
   return keyboard
}

export const startGame = () => {
   const randomIndex = Math.floor(Math.random() * WORDS.length);
   const wordToGuess = WORDS[randomIndex]
   sessionStorage.setItem('word', wordToGuess)
   const keyboardDiv = createKeyboard();
   keyboardDiv.addEventListener('click', (e) => {
      console.log(e.target.id)
   })
   gameDiv.appendChild(keyboardDiv);
};


// 10:44 видео 4,2