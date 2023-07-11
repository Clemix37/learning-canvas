import Game from "./Game.js";

const initGame = () => {
    const game = new Game();
    console.log(game);
};

document.addEventListener("DOMContentLoaded", initGame);