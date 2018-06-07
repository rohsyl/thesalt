let DEFAULT_FRAME = 3;
let JUMPING_FRAME = 1;
let TIMEOUT_JUMP = 15;
let JUMP_STRENGTH = 8;
let NB_ALLOWED_JUMP = 2;
let SALT_PER_SECOND = 2;

/**
 * Path to the player sprites
 */
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

/**
 * This class create the player and all his methods
 * @param scene
 * @param x = x index of the player's position
 * @param y = y index of the player's position
 * @param indexPlayerSelected = which player has been selected
 * @param blockSize = size of the player
 * @constructor
 */
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
        this.jumpStrength = JUMP_STRENGTH;
        this.gravity = GRAVITY;

        this.velX = 0;
        this.velY = 0;

        this.shiftX = undefined;
        this.jumping = false;
        this.jumpCount = NB_ALLOWED_JUMP;
        this.jumpTimeout = TIMEOUT_JUMP;
        this.falling = false;

        this.boostedJumpTimeout = 0;


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

        this.hasRJ = false;
    },

    /**
     * This method is called every frame to update the position of the player
     */
    update: function(){
        if (!this.dead) {
            // doublejump timeout
            if(this.jumpTimeout > -1) {
                this.jumpTimeout--;
            }

            if(this.boostedJumpTimeout > 0){
                this.boostedJumpTimeout -= 1 / FPS;
            }
            else{
                this.jumpStrength = JUMP_STRENGTH;
            }

            // start jumping
            if(this.gb.keyUpPressed){
                // first jump
                if(!this.jumping){
                    this.y = this.y - 1;
                    this.gravity = GRAVITY;
                    this.velY = -this.jumpStrength*2;
                    this.jumping = true;
                    this.jumpCount--;
                    this.jumpTimeout = TIMEOUT_JUMP;
                    if(this.playerSelected==3)
                        this.gb.audio.playJump2()
                    else
                        this.gb.audio.playJump();
                }
                else if(this.jumpTimeout < 0 && this.jumpCount > 0){
                    this.velY = -this.jumpStrength*2;
                    this.jumping = true;
                    this.jumpCount--;
                    this.jumpTimeout = TIMEOUT_JUMP;
                    if(this.playerSelected==3)
                        this.gb.audio.playJump2()
                    else
                        this.gb.audio.playDoubleJump();
                }
            }

            // apply forces
            this.velX *= FRICTION;
            this.velY += this.gravity;
            this.falling = this.velY > 0;

            // apply velocity left // right
            if(this.gb.keyRightPressed && this.x < this.canvas.width - this.w - this.blockSize) {
                if(this.velX < this.speed) {
                    this.velX++;
                }
            }

            else if(this.gb.keyLeftPressed && this.x > this.blockSize) {
                if(this.velX > -this.speed)
                    this.velX--;
            }
        }
    },

    /**
     * This method is called every frame to redraw the player
     */
    draw: function () {

        if (!this.dead) {
            // apply velocity on the player
            if(this.velX < 0.0001 && this.velX > 0){
                this.velX = 0;
            }
            if(this.velX > -0.0001 && this.velX < 0){
                this.velX = 0;
            }

            // if the player go beyond the map he die
            if(this.y > this.canvas.height + 50){
                this.die();
            }

            // move the player
            this.x += this.velX;
            this.y += this.velY;

            // if the "w", "space" or "up arrow" key is pressed the player jump
            if(this.gb.keyUpPressed){
                this.__drawPlayerJumping();
            }

            // if the "d" or "right arrow" key is pressed the player goes to the right
            if(this.gb.keyRightPressed && this.x < this.canvas.width - this.w) {
                this.isPlayerForw = true;
                this.__drawPlayerWalking();
            }
            // if the "a" or "left arrow" key is pressed the player goes to the left
            else if(this.gb.keyLeftPressed && this.x > 50) {
                this.isPlayerForw = false;
                this.__drawPlayerWalking();
            }
            // the player is waiting
            else {
                this.__drawPlayerWaiting();
            }

            // increase salt level each second
            this.gb.saltLevel = this.gb.saltLevel + SALT_PER_SECOND / FPS;

            // die if salt level = 100
            if(this.gb.saltLevel >= 100)
                this.die();
        }
    },

    /**
     * Trigger when the player is on collision with one or many blocks
     * @param whats [] Blocks in collision
     */
    onCollision: function(whats, mustBeCollidableBlock){
        if (!this.dead){

            // this variable define of the player is in collision with any collidable block
            // it allow you to know if the player is in the
            // if the player is in the air, when need to make it fall
            let hasCollisionWithCollidableBlock = false;
            for(let k in whats) {
                if(whats[k] instanceof CollidableBlock){
                    hasCollisionWithCollidableBlock = true;
                    let block = whats[k];
                    let player_bottom = this.getCenterY() + this.boxBottom;
                    let tiles_bottom = block.getY() + block.h - 1;
                    let player_right = this.getCenterX() + this.boxRight;
                    let tiles_right = block.getX() + block.w;

                    let b_collision = tiles_bottom - (this.getCenterY() - this.boxTop);
                    let t_collision = player_bottom - block.getY();
                    let l_collision = player_right - block.getX();
                    let r_collision = tiles_right - (this.getCenterX() - this.boxRight);

                    // top collision
                    if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision ) {
                        this.land(block);
                    }
                    // bottom collision
                    else if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)
                    {
                        this.fall();
                    }
                    // right collision
                    else if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
                        let leftValue = this.getCenterX() - this.x + this.boxLeft;
                        this.x = block.getX() - leftValue;
                    }
                    // left collision
                    else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision ) {
                        let rightValue = this.getCenterX() - this.x - this.boxLeft;
                        this.x = block.getX() + block.w - rightValue;
                    }
                }
                // if in collision with an item, the player will pick it
                else if(whats[k] instanceof ItemBlock) {
                    let item = whats[k];
                    if(!item.picked)
                        this.pick(item);
                }
                // if in collision with an enemy
                else if(whats[k].getType() === BLOCK_TYPE_ENEMY){
                    let enemy = whats[k];
                    let player_bottom = this.getCenterY() + this.boxBottom;
                    let tiles_bottom = enemy.getCenterY() + enemy.boxBottom;
                    let player_right = this.getCenterX() + this.boxRight;
                    let tiles_right = enemy.getCenterX() + enemy.boxRight;

                    let b_collision = tiles_bottom - (this.getCenterY() - this.boxTop);
                    let t_collision = player_bottom - (enemy.getCenterY() - enemy.boxTop);
                    let l_collision = player_right - (enemy.getCenterX() - enemy.boxLeft);
                    let r_collision = tiles_right - (this.getCenterX() - this.boxRight);

                    // top collision --> kill the enemy
                    if(this.falling && this.getCenterY() + this.boxBottom < enemy.getCenterY()){
                        this.kill(enemy);
                    }
                    // bottom collision --> the player die
                    else if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
                        this.die();
                    }
                    // right collision --> the player die
                    else if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
                        this.die();
                    }
                    // left collision --> the player die
                    else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision ) {
                        this.die();
                    }
                }
            }
            // fall if he's not in collision
            if(!hasCollisionWithCollidableBlock && mustBeCollidableBlock) {
                this.gravity = GRAVITY;
            }
        }
    },

    // add gravity to the player
    fall: function(){
        this.gravity = GRAVITY;
        this.velY = this.gravity;
    },

    // set the player on the floor
    land: function(what){
        let topValue = this.getCenterY() - this.y + this.boxBottom;
        this.y = what.getY() - topValue + 1;
        this.gravity = 0;
        this.velY = 0;
        this.jumpCount = NB_ALLOWED_JUMP;
        this.jumping = false;
        this.jumpTimeout = TIMEOUT_JUMP;
    },

    // return the type of the block
    getType: function(){
        return BLOCK_TYPE_PLAYER;
    },

    // return the x center of the player
    getCenterX: function(){
        return this.x + this.w / 2;
    },

    // return the y center of the player
    getCenterY: function(){
        return this.y + this.h / 2;
    },

    // method to kill an enemy
    kill: function (enemy) {
        enemy.die();
        this.gb.score += enemy.scorePoint;
        this.velY = -this.jumpStrength*2;
        this.jumpCount = 0;
        this.reduceSalt(3);
        this.__drawPlayerJumping();
    },

    // when the player die display the game over screen
    die: function () {
        this.velY = -this.jumpStrength*2;
        this.__drawPlayerJumping();
        this.velX = 0;
        this.dead = true;
        this.gb.initActiveScene(new GameOverScene(this.gb));
    },

    // method to pick an item
    pick: function(item) {
        this.gb.score += item.scorePoint;
        item.effect(this);
        item.pick();
    },

    // method to reduce the salt (when player kill an enemy or pick a bottle item)
    reduceSalt: function(nbr){
        if(this.gb.saltLevel - nbr < 0)
            this.gb.saltLevel = 0;
        else
            this.gb.saltLevel -= nbr;
    },

    // method to boost the jump of the player when he picks a pizza
    boostJump: function(nbr, time){
        if(this.boostedJumpTimeout <= 0){
            this.jumpStrength += nbr;
        }
        this.boostedJumpTimeout = time;
    },

    // draw the player with the default frame
    __drawPlayerWaiting: function(){
        if (!this.jumping){
            this.frameIndex = DEFAULT_FRAME;
            this.__drawPlayer();
        } else
            this.__drawPlayerJumping();
    },

    // draw the player with the walking frame
    __drawPlayerWalking: function(){
        if (!this.jumping) {
            this.__update();
            this.__drawPlayer();
        } else
            this.__drawPlayerJumping();
    },

    // draw the player with the jumping frame
    __drawPlayerJumping: function(){
        this.frameIndex = JUMPING_FRAME;
        this.__drawPlayer();
    },

    // draw the player
    __drawPlayer(){
        let player = this.isPlayerForw ? this.playerForw : this.playerBackw;
        this.context.drawImage(player[this.frameIndex], this.x, this.y, this.w, this.h);
    },

    // method to update the frame of the player
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
};