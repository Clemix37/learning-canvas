class Component {
    //#region Properties

    _width;
    _height;
    _color;
    _x;
    _y;
    _gameArea;
    _beforeFct;

    //#endregion

    //#region Constructor

    constructor({width, height, color, x, y}, gameArea, beforeFct){
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
        this._gameArea = gameArea;
        this._beforeFct = beforeFct;
        const ctx = this._gameArea.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    //#endregion

    //#region Getters / Setters

    get width(){return this._width;}
    get height(){return this._height;}
    get color(){return this._color;}
    get x(){return this._x;}
    get y(){return this._y;}
    set width(value){this._width=value;}
    set height(value){this._height=value;}
    set color(value){this._color=value;}
    set x(value){this._x=value;}
    set y(value){this._y=value;}

    //#endregion

    //#region Methods

    update(){
        if(!!this._beforeFct) this._beforeFct(this);
        const ctx = this._gameArea.ctx;
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    //#endregion
}

export default Component;