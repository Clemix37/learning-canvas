import Component from "./Component.js";
import GameArea from "./GameArea.js";

class Game {
    //#region Properties

    _gameArea;
    _comps;
    _interval;
    _player;
    _obstacles;
    _frameNo;
    _score;
    _background;

    //#endregion

    //#region Constructor

    constructor(){
        this._gameArea = new GameArea({width:500,height:300});
        Component.gameArea = this._gameArea;
        this._comps = [];
        this._obstacles = [];
        this._frameNo = 0;
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
        this.#updateObstacles();
        this.#updateScore();
        this.#updateAllComponents();
    }

    movePlayer(movement){
        if(!this._player) throw new Error("No Player in the scene");
        this._player.move(movement);
    }

    stop(){
        clearInterval(this._interval);
    }

    #createComponents(){
        // Red Cube (30x30) at x:10,y:120
        this._player = new Component({width:30,height:30,color:"smiley.gif",x:10,y:120,isPlayer:true,type:"image"});
        this._score = new Component({width:"30px",height:"Consolas",color:"black",x:280,y:40,type:"text"});
        this._background = new Component({width:656,height:270,color:"city.png", x:0, y:0,type:"background"});
        // const obstacle = new Component({width:10,height:200,color:"green",x:300,y:120});
        // this._comps.push(obstacle);
    }

    #updateAllComponents(){
        this._player.update();
        this._background.update();
        this._background.speedX = -1; // Moving background
        for (let i = 0; i < this._comps.length; i++) {
            const comp = this._comps[i];
            comp.update();
        }
    }

    #updateObstacles(){
        const x = this._gameArea.canvas.width;
        const minHeight = 20;
        const maxHeight = 200;
        const minGap = 50;
        const maxGap = 200;
        const height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        const gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        this._frameNo++;
        if(this._frameNo === 1 || this.#everyInterval(150)){
            this._obstacles.push(new Component({width:10,height,color:"green",x,y:0}));
            this._obstacles.push(new Component({width:10,height:(x-height-gap),color:"green",x,y:(height+gap)}));
        }
        for (let i = 0; i < this._obstacles.length; i++) {
            const obstacle = this._obstacles[i];
            if(this._player.crashWith(obstacle)) return this.stop();
            else {
                obstacle.x -= 1;
                obstacle.update();
            }
        }
    }

    #updateScore(){
        this._score.text = `SCORE: ${this._frameNo}`;
        this._score.update();
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

    #everyInterval(n){
        return ((this._frameNo / n) % 1 === 0);
    }

    //#endregion
}

export default Game;