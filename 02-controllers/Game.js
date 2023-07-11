import Component from "./Component.js";
import GameArea from "./GameArea.js";

class Game {
    //#region Properties

    _gameArea;
    _comps;
    _interval;
    _player;

    //#endregion

    //#region Constructor

    constructor(){
        this._gameArea = new GameArea({width:500,height:300});
        Component.gameArea = this._gameArea;
        this._comps = [];
        this.#createComponents();
        this.#attachEvents();
        // Arrow function because 'this' would be the function interval and not the instance
        this._interval = setInterval(() => this.update(), 20); // 50 times per second (1s = 1000ms) => 1000 / 50 = 20
    }

    //#endregion

    //#region Getters / Setters

    get gameArea(){return this._gameArea;}
    get player(){return this._player;}

    //#endregion

    //#region Methods

    update(){
        this._gameArea.updateGameArea(); // If not called, would make a trace of the cube all the way it goes
        this.#updateAllComponents();
    }

    movePlayer(movement){
        if(!this._player) throw new Error("No Player in the scene");
        this._player.move(movement);
    }

    #createComponents(){
        // Red Cube (30x30) at x:10,y:120
        this._player = new Component({width:30,height:30,color:"red",x:10,y:120,isPlayer:true});
        const upBtn = new Component({width:30,height:30,x:50,y:10});
        const downBtn = new Component({width:30,height:30,x:50,y:70});
        const leftBtn = new Component({width:30,height:30,x:20,y:40});
        const rightBtn = new Component({width:30,height:30,x:80,y:40});

        this._comps.push(upBtn,downBtn,leftBtn,rightBtn);
    }

    #updateAllComponents(){
        // We update the cursor
        if(this._gameArea.x && this._gameArea.y){
            // Up button
            if(this._comps[0].isClicked()) this._player.y -= 1;
            // Down button
            else if(this._comps[1].isClicked()) this._player.y += 1;
            // Left button
            else if(this._comps[2].isClicked()) this._player.x -= 1;
            // Right button
            else if(this._comps[3].isClicked()) this._player.x += 1;
            else {
                this._player.x = this._gameArea.x;
                this._player.y = this._gameArea.y;
            }
        }
        this._player.update();
        for (let i = 0; i < this._comps.length; i++) {
            const comp = this._comps[i];
            comp.update();
        }
    }

    #attachEvents(){
        window.addEventListener('mouseup', (e) => {
            this._gameArea.x = false;
            this._gameArea.y = false;
        });
        window.addEventListener('mousedown', (e) => {
            const margin = this._gameArea._canvas.getBoundingClientRect();
            this._gameArea.x = e.pageX - margin.left;
            this._gameArea.y = e.pageY - margin.top;
        });
    }

    //#endregion
}

export default Game;