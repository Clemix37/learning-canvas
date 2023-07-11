import Game from "./Game.js";
import { EVENTS, MOVEMENTS } from "./constants.js";
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
let game = null;

const initGame = () => {
    game = new Game();
};

document.addEventListener("DOMContentLoaded", () => {
    initGame();
    btnUp.addEventListener(EVENTS.MOUSEDOWN, () => game.movePlayer(MOVEMENTS.UP));
    btnDown.addEventListener(EVENTS.MOUSEDOWN, () => game.movePlayer(MOVEMENTS.DOWN));
    btnLeft.addEventListener(EVENTS.MOUSEDOWN, () => game.movePlayer(MOVEMENTS.LEFT));
    btnRight.addEventListener(EVENTS.MOUSEDOWN, () => game.movePlayer(MOVEMENTS.RIGHT));
    btnUp.addEventListener(EVENTS.MOUSEUP, () => game.movePlayer(MOVEMENTS.STOP));
    btnDown.addEventListener(EVENTS.MOUSEUP, () => game.movePlayer(MOVEMENTS.STOP));
    btnLeft.addEventListener(EVENTS.MOUSEUP, () => game.movePlayer(MOVEMENTS.STOP));
    btnRight.addEventListener(EVENTS.MOUSEUP, () => game.movePlayer(MOVEMENTS.STOP));
});