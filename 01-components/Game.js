import Component from "./Component.js";
import GameArea from "./GameArea.js";

class Game {
    //#region Properties

    _gameArea;
    _comps;
    _interval;

    //#endregion

    //#region Constructor

    constructor(){
        this._gameArea = new GameArea({width:500,height:300});
        this._comps = [];
        this.#createComponents();
        // Arrow function because 'this' would be the function interval and not the instance
        this._interval = setInterval(() => this.update(), 20); // 50 times per second (1s = 1000ms) => 1000 / 50 = 20
    }

    //#endregion

    //#region Getters / Setters

    get gameArea(){return this._gameArea;}

    //#endregion

    //#region Methods

    #createComponents(){
        // Red Cube (30x30) at x:10,y:120
        const redCube = new Component({width:30,height:30,color:"red",x:10,y:120}, this._gameArea, (inst) => {
            inst.x += 1;
        });
        this._comps.push(redCube);

        // Blue rectangle (140x20) at x:10,y:170
        const blueRectangle = new Component({width:140,height:20,color:"blue",x:10,y:170}, this._gameArea, (inst) => {
            inst.y += 1;
        });
        this._comps.push(blueRectangle);

        // Yellow rectangle (60x20) at x:10,y:200
        const yellowRectangle = new Component({width:60,height:20,color:"yellow",x:10,y:200}, this._gameArea, (inst) => {
            inst.x -= 1;
            inst.y -= 1;
        }); // We can choose color like hex, rgb, or rgba
        this._comps.push(yellowRectangle);
    }

    update(){
        this._gameArea.updateGameArea(); // If not called, would make a trace of the cube all the way it goes
        this.#updateAllComponents();
    }

    #updateAllComponents(){
        for (let i = 0; i < this._comps.length; i++) {
            const comp = this._comps[i];
            comp.update();
        }
    }

    //#endregion
}

export default Game;