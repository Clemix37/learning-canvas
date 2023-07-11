import { KEYS, MOVEMENTS } from "./constants.js";

class Component {
    //#region Properties

    static gameArea;
    _width;
    _height;
    _color;
    _x;
    _y;
    _speedX;
    _speedY;
    _beforeFct;
    _isPlayer;
    _keysPressed;
    _type;

    //#endregion

    //#region Constructor

    constructor({width = null, height = null, color = "blue", x = null, y = null, type="", isPlayer = false} = {}, beforeFct){
        if(!width || !height || (!x && x !== 0) || (!y && y !== 0)) throw new Error("No width, or height, or x position, or y position");
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
        this._speedX = 0;
        this._speedY = 0;
        this._beforeFct = beforeFct;
        this._isPlayer = isPlayer;
        this._keysPressed = [];
        this._type = type;
        const ctx = Component.gameArea.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        if(this._isPlayer) this.#attachKeyBoardEvents();
    }

    //#endregion

    //#region Getters / Setters

    // Getters
    get width(){return this._width;}
    get height(){return this._height;}
    get color(){return this._color;}
    get x(){return this._x;}
    get y(){return this._y;}
    get speedX(){return this._speedX;}
    get speedY(){return this._speedY;}
    get isPlayer(){return this._isPlayer;}
    // Setters
    set width(value){this._width=value;}
    set height(value){this._height=value;}
    set color(value){this._color=value;}
    set x(value){this._x=value;}
    set y(value){this._y=value;}
    set speedX(value){this._speedX=value;}
    set speedY(value){this._speedY=value;}

    //#endregion

    //#region Methods

    update(){
        if(!!this._beforeFct) this._beforeFct(this);
        this.updatePos();
        const ctx = Component.gameArea.ctx;
        if(this._type === "text"){
            ctx.font = `${this._width} ${this._height}`;
            ctx.fillStyle = this._color;
            ctx.fillText(this.text, this._x, this._y);
        }else {
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }
    }

    updatePos(){
        this._x += this._speedX;
        this._y += this._speedY;
    }

    move(movement){
        if(!Array.isArray(movement)) movement = [movement];
        for (let i = 0; i < movement.length; i++) {
            const move = movement[i];
            if(move === MOVEMENTS.UP || move === KEYS.ARROWS.UP) this._speedY -= 1;
            if(move === MOVEMENTS.DOWN || move === KEYS.ARROWS.DOWN) this._speedY += 1;
            if(move === MOVEMENTS.LEFT || move === KEYS.ARROWS.LEFT) this._speedX -= 1;
            if(move === MOVEMENTS.RIGHT || move === KEYS.ARROWS.RIGHT) this._speedX += 1;
            if(move === MOVEMENTS.STOP) this.stopMovement();
        }
    }

    stopMovement(){
        this._speedX = 0;
        this._speedY = 0;
    }

    isClicked(){
        const myLeft = this._x;
        const myRight = this._x + this._width;
        const myTop = this._y;
        const myBottom = this._y + this._height;
        let isClicked = true;
        if(myBottom < Component.gameArea.y || myTop > Component.gameArea.y || myRight < Component.gameArea.x || myLeft > Component.gameArea.x) isClicked = false;
        return isClicked;
    }

    crashWith(comp){
        const props = {
            myLeft: this._x,
            myRight: this._x + this._width,
            myTop: this._y,
            myBottom: this._y + this._height,
        };
        const hisProps = {
            hisLeft: comp.x,
            hisRight: comp.x + comp.width,
            hisTop: comp.y,
            hisBottom: comp.y + comp.height,
        };
        return ((props.myBottom >= hisProps.hisTop) && (props.myTop <= hisProps.hisBottom) && (props.myRight >= hisProps.hisLeft) && (props.myLeft <= hisProps.hisRight));
    }

    #attachKeyBoardEvents(){
        window.addEventListener('keyup', (e) => {
            this.stopMovement();
            this._keysPressed = this._keysPressed.filter(k => k !== e.key);
            if(this._keysPressed.length <= 0) this.move(MOVEMENTS.STOP);
            else this.move(this._keysPressed);
        });
        window.addEventListener('keydown', (e) => {
            this.stopMovement();
            if(!this._keysPressed.includes(e.key)) this._keysPressed.push(e.key);
            this.move(this._keysPressed);
        });
    }

    //#endregion
}

export default Component;