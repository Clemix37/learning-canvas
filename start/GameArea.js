class GameArea {
    _canvas;
    _ctx;
    constructor(config){
        this._canvas = document.createElement("canvas");
        this._canvas.width = config.width || 500; //document.innerWidth;
        this._canvas.height = config.height || 300; //document.innerHeight;
        this._ctx = this._canvas.getContext("2d");
        document.body.insertBefore(this._canvas, document.body.childNodes[0]);
    }
}

export default GameArea;