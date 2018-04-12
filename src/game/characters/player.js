const DEFAULT_FRAME = 3;
const JUMPING_FRAME = 1;
const TIMEOUT_JUMP = 15;

const SPRITES_PATH = "assets/sprites/";

const IMG_PLAYER_0_PATH = SPRITES_PATH + "players/player_0/";
const IMG_PLAYER_1_PATH = SPRITES_PATH + "players/player_1/";
const IMG_PLAYER_2_PATH = SPRITES_PATH + "players/player_2/";
const IMG_PLAYER_3_PATH = SPRITES_PATH + "players/player_3/";

const IMG_PLAYER_FORW_PATH = "forwards/";
const IMG_PLAYER_BACKW_PATH = "backwards/";
const IMG_PLAYER_UNIQUE = "unique/";

const IMG_PLAYER_STOP_PATH = "stop.png";
const IMG_PLAYER_FEET_FRONT_PATH = "front_feet.png";
const IMG_PLAYER_RUN_PATH = "run.png";
const IMG_PLAYER_FEET_BACK_PATH = "back_feet.png";
const IMG_PLAYER_LETS_GO = "lets_go.png";

const IMG_PLAYER_SELECT_SCREEN = [IMG_PLAYER_0_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO, IMG_PLAYER_1_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO,
    IMG_PLAYER_2_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO, IMG_PLAYER_3_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO];

const IMG_PLAYER_F_STOP = [IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH];
const IMG_PLAYER_B_STOP = [IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH];

const IMG_PLAYER_F_FEETFRONT = [IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH, IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH];
const IMG_PLAYER_B_FEETFRONT = [IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH];

const IMG_PLAYER_F_RUN = [IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH, IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH];
const IMG_PLAYER_B_RUN = [IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH];

const IMG_PLAYER_F_FEETBACK = [IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH];
const IMG_PLAYER_B_FEETBACK = [IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH, IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH, IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH];


function Player(scene, x, y, indexPlayerSelected, blockSize) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
    this.playerSelected = indexPlayerSelected;
}

Player.prototype = {

    init: function() {

        // ========================================================================
        // Player physics
        this.h = this.blockSize*2;
        this.w = this.blockSize*2;

        // hit boxes
        this.boxTop = this.h / 2;
        this.boxBottom = this.h / 2;
        this.boxLeft = this.w / 6;
        this.boxRight = this.w / 6;

        this.y = this.y - this.h / 2;

        this.speed = 5;
        this.jumpStrength = 8;

        this.velX = 0;
        this.velY = 0;

        this.falling = false;
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpTimeout = TIMEOUT_JUMP;

        this.shiftX = undefined;

        // ========================================================================
        // player graphics
        this.isPlayerForw = true;
        this.playerForw0 = new Image();
        this.playerForw1 = new Image();
        this.playerForw2 = new Image();
        this.playerForw3 = new Image();
        this.playerBackw0 = new Image();
        this.playerBackw1 = new Image();
        this.playerBackw2 = new Image();
        this.playerBackw3 = new Image();

        this.playerForw0.src = IMG_PLAYER_F_STOP[this.playerSelected];
        this.playerForw1.src = IMG_PLAYER_F_FEETFRONT[this.playerSelected];
        this.playerForw2.src = IMG_PLAYER_F_RUN[this.playerSelected];
        this.playerForw3.src = IMG_PLAYER_F_FEETBACK[this.playerSelected];
        this.playerBackw0.src = IMG_PLAYER_B_STOP[this.playerSelected];
        this.playerBackw1.src = IMG_PLAYER_B_FEETFRONT[this.playerSelected];
        this.playerBackw2.src = IMG_PLAYER_B_RUN[this.playerSelected];
        this.playerBackw3.src = IMG_PLAYER_B_FEETBACK[this.playerSelected];

        this.playerForw = [this.playerForw1, this.playerForw2, this.playerForw3, this.playerForw0];
        this.playerBackw = [this.playerBackw1, this.playerBackw2, this.playerBackw3, this.playerBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3;
        this.numberOfFrames = this.playerForw.length;
    },


    update: function(shiftX){
        this.shiftX = shiftX;
        // doublejump timeout
        if(this.jumpTimeout > -1) {
            this.jumpTimeout--;
            // console.log(this.jumpTimeout);
        }

        // start jumping
        if(this.gb.keyUpPressed){
            // first jump
            if(!this.jumping){
                // console.log("jump");
                this.velY = -this.jumpStrength*2;
                this.jumping = true;
                this.floorBlock = undefined;

                // console.log('cw : ' + this.canvas.width);
                // console.log('ch : ' + this.canvas.height);
                this.isOnFloor = false;
                this.jumpCount = 1;
                this.jumpTimeout = TIMEOUT_JUMP;
            }
            // doublejump
            else if (this.jumpTimeout < 0 && this.jumpCount == 1){
                // console.log(this.jumpCount);
                this.velY = -this.jumpStrength*2;
                this.jumping = true;
                this.jumpCount = 2;
                this.jumpTimeout = 0;
            }
        }

        // apply velocity left // right
        if(this.gb.keyRightPressed && this.x < this.canvas.width - this.w - this.blockSize) {
            if(this.velX < this.speed)
                this.velX++;
        }
        else if(this.gb.keyLeftPressed && this.x > this.blockSize) {
            if(this.velX > -this.speed)
                this.velX--;
        }

        // apply forces
        this.velX *= FRICTION;

        this.velY += GRAVITY;

    },

    draw: function () {

        // move the player
        this.x += this.velX;
        this.y += this.velY;


        if(this.gb.keyUpPressed){
            this.__drawPlayerJumping();
        }

        if(this.gb.keyRightPressed && this.x < this.canvas.width - this.w) {
            this.isPlayerForw = true;
            this.__drawPlayerWalking();
        }
        else if(this.gb.keyLeftPressed && this.x > 50) {
            this.isPlayerForw = false;
            this.__drawPlayerWalking();
        }
        else {
            this.__drawPlayerWaiting();
        }
    },

    /*
    what have, x, y, and getType()
     */
    onCollision: function(what){
        if(what instanceof CollidableBlock){
            // falling
            if(this.velY > 0){
                //if(this.jumping)
                this.land(what);
            }
            // jumping
            else{
                //console.log("ascending");
                this.fall();
            }

            if(this.velX > 0){
                //console.log("going right");

            }
            else{
                //console.log("going left");
            }
        }
    },

    fall: function(){
        /*this.velY = 0;
        this.jumpCount = 0;
        this.jumping = false;*/
    },

    land: function(what){
        let topValue = this.getCenterY() - this.y + this.boxBottom;
        this.y = what.y - topValue;
        this.velY = 0;
        this.jumpCount = 0;
        this.jumping = false;
        this.falling = false;
    },

    getType: function(){
        return BLOCK_TYPE_PLAYER;
    },

    getCenterX: function(){
        return this.x + this.w / 2;
    },

    getCenterY: function(){
        return this.y + this.h / 2;
    },

    __drawPlayerWaiting: function(){

        if (!this.jumping){
            this.frameIndex = DEFAULT_FRAME;
            this.__drawPlayer();
        } else
            this.__drawPlayerJumping();
    },

    __drawPlayerWalking: function(){

        if (!this.jumping) {
            this.__update();
            this.__drawPlayer();
        } else
            this.__drawPlayerJumping();
    },

    __drawPlayerJumping: function(){

        this.frameIndex = JUMPING_FRAME;
        this.__drawPlayer();
    },

    __drawPlayer(){
        this.context.clearRect(this.x, this.y, this.w, this.h);

        let player;

        if (this.isPlayerForw)
            player = this.playerForw;
        else
            player = this.playerBackw;

        this.context.drawImage(player[this.frameIndex], this.x, this.y, this.w, this.h);

    },


    __update: function () {

        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames -1)
                this.frameIndex += 1;
            else
                this.frameIndex = 0;
        }
    }

}