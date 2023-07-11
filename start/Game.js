import GameArea from "./GameArea.js";

class Game {
    _gameArea;
    constructor(){
        this._gameArea = new GameArea({width:500,height:300});
    }
}

export default Game;