import '../css/style.css'
import { startGame } from './game';
import { darkModeHandler } from './utils';

darkModeHandler()


const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener('click', startGame)