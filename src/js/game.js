import {
   WORDS,
   KEYBOAD_LETTERS
} from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
let triesLeft;
let winCount;

const creatPlaceholderHTML = () => {
   const word = sessionStorage.getItem("word");
   // преварщаем в массив слово
   const wordArray = Array.from(word);
   const placeholdersHTML = wordArray.reduce(
      (acc, curr, i) => acc + `<h1 id=letter_${i} class="letter"> _ </h1>`,
      ""
   );

   //2 вариант
   // const wordArray = Array.from('_'.repeat(word.length))
   // console.log("creatPlaceholderHTML ~ wordArray:", wordArray)
   // const placeholdersHTML = wordArray.reduce((acc, curr, i) => acc + `<h1 id=letter_${i} class="letter"> _ </h1>`, '')

   // let placeholdersHTML = '';
   // for (let i = 0; i < word.length; i++) {
   //    placeholdersHTML = placeholdersHTML + `<h1 id=letter_${i} class="letter"> _ </h1>`
   // }

   return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
   const keyboard = document.createElement("div");
   keyboard.classList.add("keyboard");
   keyboard.id = "keyboard";
   const keyboardHTML = KEYBOAD_LETTERS.reduce((acc, curr) => {
      return (
         acc +
         `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
      );
   }, "");
   keyboard.innerHTML = keyboardHTML;
   return keyboard;
};

const createHangmanImg = () => {
   const image = document.createElement("img");
   image.src = "images/hg-0.png";
   image.classList.add("hangman-img");
   image.id = "hangman-img";
   image.alt = "hangman image";
   return image;
};
console.log(createHangmanImg());

const checkLetter = (letter) => {
   const word = sessionStorage.getItem('word')
   const inputLetter = letter.toLowerCase()
   // буквы нет в слове
   if (!word.includes(inputLetter)) {
      const triesCounter = document.getElementById('tries-left')
      triesLeft -= 1
      triesCounter.innerText = triesLeft
      const hangmanImg = document.getElementById('hangman-img')
      hangmanImg.src = `images/hg-${10-triesLeft}.png`
      if (triesLeft === 0) {
         stopGame('lose')
      }
   } else {
      // буква есть
      const wordArray = Array.from(word)
      wordArray.forEach((currentLetter, i) => {
         if (currentLetter === inputLetter) {
            winCount += 1;
            if (winCount === word.length) {
               stopGame('win')
               return
            }
            document.getElementById(`letter_${i}`).innerText = inputLetter.toUpperCase()
         }
      })
   }
}


const stopGame = (status) => {
   document.getElementById('placeholders').remove();
   document.getElementById('tries').remove();
   document.getElementById('keyboard').remove();
   document.getElementById('quit').remove();
   const word = sessionStorage.getItem('word');
   if (status === 'win') {
      // сценарий выигрыша 
      document.getElementById('hangman-img').src = 'images/hg-win.png'
      document.getElementById('game').innerHTML += '<h2 class ="result-header win">You won </h2>'
   } else if (status === 'lose') {
      // сценарий проигрыша
      document.getElementById('game').innerHTML += '<h2 class ="result-header lose">You lost :(</h2>'
   } else if (status === 'quit') {
      logoH1.classList.remove('logo')
      document.getElementById('hangman-img').remove();
   }
   document.getElementById('game').innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary px-5 py-2 mt-5">Play again</button>`
   document.getElementById('play-again').onclick = startGame
}
export const startGame = () => {
   triesLeft = 10
   winCount = 0
   logoH1.classList.add("logo-sm");
   const randomIndex = Math.floor(Math.random() * WORDS.length);
   const wordToGuess = WORDS[randomIndex];
   sessionStorage.setItem("word", wordToGuess);

   gameDiv.innerHTML = creatPlaceholderHTML();

   gameDiv.innerHTML +=
      '<p id="tries" class ="mt-2">TRIES LEFT : <span id="tries-left" class="font-medium text-red-600">10</span></p>';

   const keyboardDiv = createKeyboard();
   keyboardDiv.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === 'button') {
         e.target.disabled = true
         checkLetter(e.target.id)
      }
   });
   const hangmanImg = createHangmanImg();
   gameDiv.prepend(hangmanImg);
   gameDiv.appendChild(keyboardDiv);
   gameDiv.insertAdjacentHTML("beforeend", '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit</button>')
   document.getElementById('quit').onclick = () => {
     const isSure = confirm('Are you sure you want to quit and lose progress?')
     if (isSure) {
      stopGame('quit')
     } 
   }
};

