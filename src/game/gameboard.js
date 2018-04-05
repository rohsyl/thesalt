const KEYS_LEFT = [65, 37];
const KEYS_RIGHT = [68, 39];
const KEYS_UP = [87, 38];

const FRICTION = 0.8;
const GRAVITY = 0.98;

function GameBoard(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.activeScene = undefined;

    this.keyLeftPressed = false;
    this.keyRightPressed = false;
    this.keyUpPressed = false;
}
GameBoard.prototype = {

    init: function(){

        this.activeScene = new LevelScene(this);
        this.activeScene.init();

        let self = this;
        document.addEventListener("keydown", function(e){self.keyDownHandler(e)}, false);
        document.addEventListener("keyup", function(e){self.keyUpHandler(e)}, false);
    },

    redraw : function(){
        // do stuff when
        if(typeof this.activeScene !== "undefined"){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.activeScene.draw();
        }
    },

    keyDownHandler : function(e) {
        if(this.__isKey(e.keyCode, KEYS_LEFT)) {
            this.keyLeftPressed = true;
        }
        else if(this.__isKey(e.keyCode, KEYS_RIGHT)) {
            this.keyRightPressed = true;
        }
        else if(this.__isKey(e.keyCode, KEYS_UP)) {
            this.keyUpPressed = true;
        }
    },

    keyUpHandler: function(e) {
        if(this.__isKey(e.keyCode, KEYS_LEFT)) {
            this.keyLeftPressed = false;
        }
        else if(this.__isKey(e.keyCode, KEYS_RIGHT)) {
            this.keyRightPressed = false;
        }
        else if(this.__isKey(e.keyCode, KEYS_UP)) {
            this.keyUpPressed = false;
        }
    },


    /**
     * Return true if the keycode is contained in the keys array
     * @param keyCode The keycode
     * @param keys An array of keys
     * @returns {boolean} True if in array
     * @private
     */
    __isKey: function(keyCode, keys){
        let length = keys.length;
        for(let i = 0; i < length; i++) {
            if(keys[i] === keyCode) return true;
        }
        return false;
    }
};
