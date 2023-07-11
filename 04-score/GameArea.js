class GameArea {
    //#region Properties

    _canvas;
    _ctx;
    _x;
    _y;

    //#endregion

    //#region Constructor

    constructor(config){
        this._canvas = document.createElement("canvas");
        this._canvas.width = config.width || 500; //document.innerWidth;
        this._canvas.height = config.height || 300; //document.innerHeight;
        // this._canvas.style.cursor = "none"; // Hides the cursor
        this._ctx = this._canvas.getContext("2d");
        document.body.insertBefore(this._canvas, document.body.childNodes[0]);
    }

    //#endregion

    //#region Getters / Setters

    // Getters
    get canvas(){return this._canvas;}
    get ctx(){return this._ctx;}
    get x(){return this._x;}
    get y(){return this._y;}
    // Setters
    set x(value){this._x=value;}
    set y(value){this._y=value;}

    //#endregion

    //#region Methods

    updateGameArea(){
        this.clear();
    }

    clear(){
        this._ctx.clearRect(0,0, this._canvas.width, this._canvas.height);
    }

    //#endregion
}

export default GameArea;