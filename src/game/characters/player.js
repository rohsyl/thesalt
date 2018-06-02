let DEFAULT_FRAME = 3;
let JUMPING_FRAME = 1;
let TIMEOUT_JUMP = 15;
let NB_ALLOWED_JUMP = 2;

let IMG_PLAYER_0_PATH = SPRITES_PATH + "players/player_0/";
let IMG_PLAYER_1_PATH = SPRITES_PATH + "players/player_1/";
let IMG_PLAYER_2_PATH = SPRITES_PATH + "players/player_2/";
let IMG_PLAYER_3_PATH = SPRITES_PATH + "players/player_3/";

let IMG_PLAYER_FORW_PATH = "forwards/";
let IMG_PLAYER_BACKW_PATH = "backwards/";
let IMG_PLAYER_UNIQUE = "unique/";

let IMG_PLAYER_STOP_PATH = "stop.png";
let IMG_PLAYER_FEET_FRONT_PATH = "front_feet.png";
let IMG_PLAYER_RUN_PATH = "run.png";
let IMG_PLAYER_FEET_BACK_PATH = "back_feet.png";
let IMG_PLAYER_LETS_GO = "lets_go.png";

let IMG_PLAYER_SELECT_SCREEN = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO,
    IMG_PLAYER_1_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO,
    IMG_PLAYER_2_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO,
    IMG_PLAYER_3_PATH + IMG_PLAYER_UNIQUE + IMG_PLAYER_LETS_GO
];

let IMG_PLAYER_F_STOP = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_STOP_PATH
];

let IMG_PLAYER_B_STOP = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_STOP_PATH
];

let IMG_PLAYER_F_FEETFRONT = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_FRONT_PATH
];
let IMG_PLAYER_B_FEETFRONT = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_FRONT_PATH
];

let IMG_PLAYER_F_RUN = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_RUN_PATH
];

let IMG_PLAYER_B_RUN = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_RUN_PATH
];

let IMG_PLAYER_F_FEETBACK = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_FORW_PATH + IMG_PLAYER_FEET_BACK_PATH
];

let IMG_PLAYER_B_FEETBACK = [
    IMG_PLAYER_0_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_1_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_2_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH,
    IMG_PLAYER_3_PATH + IMG_PLAYER_BACKW_PATH + IMG_PLAYER_FEET_BACK_PATH
];


function Player(scene, x, y, indexPlayerSelected, blockSize) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
    this.playerSelected = indexPlayerSelected;
    this.dead = false;

    // ========================================================================
    // player score
    this.score = 0;
    this.saltLevel = 0;
    this.saltLevel.toFixed(0);
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

        this.speed = SHIFT_STEP;
        this.jumpStrength = 8;

        this.velX = 0;
        this.velY = 0;

        this.jumping = false;
        this.jumpCount = NB_ALLOWED_JUMP;
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
        if (!this.dead) {
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
                    this.velY = -this.jumpStrength*2;
                    this.jumping = true;
                    this.jumpCount--;
                    this.jumpTimeout = TIMEOUT_JUMP;
                }
                else if(this.jumpTimeout < 0 && this.jumpCount > 0){
                    this.velY = -this.jumpStrength*2;
                    this.jumping = true;
                    this.jumpCount--;
                    this.jumpTimeout = TIMEOUT_JUMP;
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
        }
    },

    draw: function () {

        if (!this.dead) {
            if(this.velX < 0.0001 && this.velX > 0){
            this.velX = 0;
            }
            if(this.velX > -0.0001 && this.velX < 0){
                this.velX = 0;
            }

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

            // increase salt level each second
            // TODO: get the FPS from main.js and replace 60
            // TODO: get a integer and not a 568098456340958 length number
            this.saltLevel = this.saltLevel + 1/60;

            // die if salt level = 100
            // TODO: not working
            if(this.saltLevel == 30)
                this.die();
        }

    },

    /**
     * Trigger when the player is on collision with one or many blocks
     * @param whats [] Blocks in collision
     */
    onCollision: function(whats){

        if (!this.dead){
            for(let k in whats) {
                if(whats[k] instanceof CollidableBlock){
                    let block = whats[k];
                    let player_bottom = this.getCenterY() + this.boxBottom;
                    let tiles_bottom = block.getY() + block.h;
                    let player_right = this.getCenterX() + this.boxRight;
                    let tiles_right = block.getX() + block.w;

                    let b_collision = tiles_bottom - (this.getCenterY() - this.boxTop);
                    let t_collision = player_bottom - block.getY();
                    let l_collision = player_right - block.getX();
                    let r_collision = tiles_right - (this.getCenterX() - this.boxRight);

                    if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
                    {
                        //console.log("Top collision");
                        this.land(block);
                    }
                    else if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)
                    {
                        //console.log("bottom collision");
                        this.fall();
                    }
                    else if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
                    {
                        console.log("Left collision");
                        let leftValue = this.getCenterX() - this.x + this.boxLeft;
                        this.x = block.getX() - leftValue;
                    }
                    else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
                    {
                        console.log("Right collision");
                        let rightValue = this.getCenterX() - this.x - this.boxLeft;
                        this.x = block.getX() + block.w - rightValue;
                    }
                }
            }
        }
    },

    fall: function(){
        this.velY = GRAVITY;
    },

    land: function(what){
        let topValue = this.getCenterY() - this.y + this.boxBottom;
        this.y = what.getY() - topValue;
        this.velY = 0;
        this.jumpCount = NB_ALLOWED_JUMP;
        this.jumping = false;
        this.jumpTimeout = TIMEOUT_JUMP;
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

    kill: function () {
        this.velY = -this.jumpStrength*2;
        this.__drawPlayerJumping();
    },

    die: function () {
        this.velY = -this.jumpStrength*2;
        this.__drawPlayerJumping();
        this.velX = 0;
        this.dead = true;
        console.log("die...");
    },

    pick: function(item) {
        this.score += item.scorePoint;
        item.scorePoint = 0;
        item.pick();
        console.log(this.score);
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
        // c'est useless enfaite ahah
        //this.context.clearRect(this.x, this.y, this.w, this.h);

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

function increment(){
    this.saltLevel = this.saltLevel % 360 + 1;
}