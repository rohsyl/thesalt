const IMG_ENEMY_0_PATH = SPRITES_PATH + "enemy/enemy_0/";

const IMG_ENEMY_FORW_PATH = "forwards/";
const IMG_ENEMY_BACKW_PATH = "backwards/";

const IMG_ENEMY_STOP_PATH = "stop.png";
const IMG_ENEMY_FEET_FRONT_PATH = "front_feet.png";
const IMG_ENEMY_RUN_PATH = "run.png";
const IMG_ENEMY_FEET_BACK_PATH = "back_feet.png";

const IMG_ENEMY_F_STOP = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_STOP_PATH
];

const IMG_ENEMY_B_STOP = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_STOP_PATH
];

const IMG_ENEMY_F_FEETFRONT = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_FRONT_PATH
];

const IMG_ENEMY_B_FEETFRONT = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_FRONT_PATH
];

const IMG_ENEMY_F_RUN = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_RUN_PATH
];

const IMG_ENEMY_B_RUN = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_RUN_PATH
];

const IMG_ENEMY_F_FEETBACK = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_BACK_PATH
];

const IMG_ENEMY_B_FEETBACK = [
    IMG_ENEMY_0_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_BACK_PATH
];

// check the direction of the enemy
var goForward = true;

function EnemyWalk(scene, x, y, blockSize) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
}

EnemyWalk.prototype = {

    init: function() {

        // ========================================================================
        // Enemy physics
        this.h = this.blockSize*2;
        this.w = this.blockSize*2;

        // hit boxes
        this.boxTop = this.h / 2;
        this.boxBottom = this.h / 2;
        this.boxLeft = this.w / 6;
        this.boxRight = this.w / 6;

        this.y = this.y - this.h / 2;

        this.speed = SHIFT_STEP;

        this.velX = 0;
        this.velY = 0;

        this.shiftX = undefined;

        // ========================================================================
        // enemy graphics
        this.isEnemyForw = true;
        this.enemyForw0 = new Image();
        this.enemyForw1 = new Image();
        this.enemyForw2 = new Image();
        this.enemyForw3 = new Image();
        this.enemyBackw0 = new Image();
        this.enemyBackw1 = new Image();
        this.enemyBackw2 = new Image();
        this.enemyBackw3 = new Image();

        this.enemyForw0.src = IMG_ENEMY_F_STOP[0];
        this.enemyForw1.src = IMG_ENEMY_F_FEETFRONT[0];
        this.enemyForw2.src = IMG_ENEMY_F_RUN[0];
        this.enemyForw3.src = IMG_ENEMY_F_FEETBACK[0];
        this.enemyBackw0.src = IMG_ENEMY_B_STOP[0];
        this.enemyBackw1.src = IMG_ENEMY_B_FEETFRONT[0];
        this.enemyBackw2.src = IMG_ENEMY_B_RUN[0];
        this.enemyBackw3.src = IMG_ENEMY_B_FEETBACK[0];

        this.enemyForw = [this.enemyForw1, this.enemyForw2, this.enemyForw3, this.enemyForw0];
        this.enemyBackw = [this.enemyBackw1, this.enemyBackw2, this.enemyBackw3, this.enemyBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3;
        this.numberOfFrames = this.enemyForw.length;
    },


    update: function(shiftX){
        this.shiftX = shiftX;

        // apply velocity left // right
        if(goForward && this.x < this.canvas.width - this.w - this.blockSize) {
            if(this.velX < this.speed)
                this.velX++;
        }
        else if(!goForward && this.x > this.blockSize) {
            if(this.velX > -this.speed)
                this.velX--;
        }

        // apply forces
        this.velX *= FRICTION;

        this.velY += GRAVITY;

    },

    draw: function () {

        if(this.velX < 0.0001 && this.velX > 0){
            this.velX = 0;
        }
        if(this.velX > -0.0001 && this.velX < 0){
            this.velX = 0;
        }

        // move the player
        this.x += this.velX;
        this.y += this.velY;

        if(this.gb.keyRightPressed && this.x < this.canvas.width - this.w) {
            this.isEnemyForw = true;
            this.__drawEnemyWalking();
        }
        else if(this.gb.keyLeftPressed && this.x > 50) {
            this.isEnemyForw = false;
            this.__drawEnemyWalking();
        }
        else {
            this.__drawEnemyWaiting();
        }
    },

    /**
     * Trigger when the enemy is on collision with one or many blocks
     * @param whats [] Blocks in collision
     */
    onCollision: function(whats){
        for(let k in whats) {
            if(whats[k] instanceof CollidableBlock){
                let block = whats[k];
                let enemy_bottom = this.getCenterY() + this.boxBottom;
                let tiles_bottom = block.getY() + block.h;
                let enemy_right = this.getCenterX() + this.boxRight;
                let tiles_right = block.getX() + block.w;

                let b_collision = tiles_bottom - (this.getCenterY() - this.boxTop);
                let t_collision = enemy_bottom - block.getY();
                let l_collision = enemy_right - block.getX();
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
                    goForward = true;
                }
                else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
                {
                    console.log("Right collision");
                    let rightValue = this.getCenterX() - this.x - this.boxLeft;
                    this.x = block.getX() + block.w - rightValue;
                    goForward = false;
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

    __drawEnemyWaiting: function(){

        this.frameIndex = DEFAULT_FRAME;
        this.__drawEnemy();
    },

    __drawEnemyWalking: function(){

        this.__update();
        this.__drawEnemy();
    },

    __drawEnemy(){
        // c'est useless enfaite ahah
        //this.context.clearRect(this.x, this.y, this.w, this.h);

        let enemy;

        if (this.isEnemyForw)
            enemy = this.enemyForw;
        else
            enemy = this.enemyBackw;

        this.context.drawImage(enemy[this.frameIndex], this.x, this.y, this.w, this.h);

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