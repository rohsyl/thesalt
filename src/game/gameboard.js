const KEYS_LEFT = [65, 37];
const KEYS_RIGHT = [68, 39];
const KEYS_UP = [87, 38, 32];

const FRICTION = 0.8;
const GRAVITY = 0.98;

const BLOCK_TYPE_BLOCK = 0;
const BLOCK_TYPE_COLLIDABLE_BLOCK = 1;
const BLOCK_TYPE_PLAYER = 2;
const BLOCK_TYPE_ENEMY = 3;
const BLOCK_TYPE_ITEMS = 4;

function GameBoard(canvas, playerName) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.activeScene = undefined;

    this.keyLeftPressed = false;
    this.keyRightPressed = false;
    this.keyUpPressed = false;

    this.selectedChar = 0;

    this.levelScenes = [
        new LevelInstance('level1', [ SPRITES_PATH + "background/level1/background.jpg", SPRITES_PATH + "background/level1/background.jpg"]),
        new LevelInstance('level2', [ SPRITES_PATH + "background/level2/landscape.png", SPRITES_PATH + "background/level2/landscape.png"]),
        new LevelInstance('level3', [ SPRITES_PATH + "background/level3/background.png", SPRITES_PATH + "background/level3/background.png"]),
    ];
    this.currentLevelIndex = 0;

    this.playerName = playerName;
    this.score = 0;
    this.saltLevel = 0;
}
GameBoard.prototype = {

    init: function(){

        this.initActiveScene(new CharacterSelectionScene(this));

        let self = this;
        document.addEventListener("keydown", function(e){self.keyDownHandler(e)}, false);
        document.addEventListener("keyup", function(e){self.keyUpHandler(e)}, false);
    },

    redraw : function(){
        // do stuff when
        if(typeof this.activeScene !== "undefined"){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.activeScene.update();
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
    },

    setSelectedCharacter: function(selectedChar){
        this.selectedChar = selectedChar;
    },

    getSelectedCharacter: function(){
        return this.selectedChar;
    },

    initActiveScene: function(scene) {
        scene.init();
        this.activeScene = scene;
    },

    initLevel: function(i){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(i < this.levelScenes.length){
            this.currentLevelIndex = i;
            let levelInstance = this.levelScenes[this.currentLevelIndex];
            this.initActiveScene(new LevelScene(this, levelInstance));
        }
        else{
            this.initActiveScene(new EndScene(this));
        }
    },


    saveScore: function(){
        let api = new Api();
        let self = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                api.addScore(self.playerName, self.score, lat, lng, function(data){

                });
            }, function(error) {
                //Handle Errors
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknown error occurred.");
                        break;
                }

                api.addScore(self.playerName, self.score, null, null, function(data){

                });
            });
        }
        else{
            api.addScore(self.playerName, self.score, null, null, function(data){

            });
        }
    }
};
