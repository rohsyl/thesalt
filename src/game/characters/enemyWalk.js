
let IMG_ENEMY_1_PATH = SPRITES_PATH + "npc/enemy_0/";

let IMG_ENEMY_1_F_STOP = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_1_B_STOP = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_1_F_FEETFRONT = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_1_B_FEETFRONT = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_1_F_RUN = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_1_B_RUN = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_1_F_FEETBACK = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_BACK_PATH;

let IMG_ENEMY_1_B_FEETBACK = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_BACK_PATH;

function EnemyWalk(scene, x, y, blockSize) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
    this.slowness = 5;
    this.dead = false;
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
        this.boxLeft = this.w / 7;
        this.boxRight = this.w / 7;

        this.y = this.y - this.h / 2;

        this.speed = SHIFT_STEP / this.slowness;

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

        this.enemyForw0.src = IMG_ENEMY_1_F_STOP;
        this.enemyForw1.src = IMG_ENEMY_1_F_FEETFRONT;
        this.enemyForw2.src = IMG_ENEMY_1_F_RUN;
        this.enemyForw3.src = IMG_ENEMY_1_F_FEETBACK;
        this.enemyBackw0.src = IMG_ENEMY_1_B_STOP;
        this.enemyBackw1.src = IMG_ENEMY_1_B_FEETFRONT;
        this.enemyBackw2.src = IMG_ENEMY_1_B_RUN;
        this.enemyBackw3.src = IMG_ENEMY_1_B_FEETBACK;

        this.enemyForw = [this.enemyForw1, this.enemyForw2, this.enemyForw3, this.enemyForw0];
        this.enemyBackw = [this.enemyBackw1, this.enemyBackw2, this.enemyBackw3, this.enemyBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3 * this.slowness/2;
        this.numberOfFrames = this.enemyForw.length;
    },


    update: function(shiftX){
        if (!this.dead) {
            this.shiftX = shiftX;

            // apply forces
            this.velX *= FRICTION;

            this.velY += GRAVITY;
        }
    },

    draw: function () {
        if (!this.dead) {

            if (this.isEnemyForw) {
                if (this.velX < this.speed)
                    this.velX++;
                this.__drawEnemyWalking();
            }
            else if (!this.isEnemyForw) {
                if (this.velX > -this.speed)
                    this.velX--;
                this.__drawEnemyWalking();
            }

            // move the player
            this.x += this.velX;
            this.y += this.velY;
        }
    },

    /**
     * Trigger when the enemy is on collision with one or many blocks
     * @param whats [] Blocks in collision
     */
    onCollision: function(whats){
        if (!this.dead) {

            for(let k in whats) {
                if (whats[k] instanceof CollidableBlock) {
                    let block = whats[k];
                    let enemy_bottom = this.getCenterY() + this.boxBottom;
                    let tiles_bottom = block.getY() + block.h;
                    let enemy_right = this.getCenterX() + this.boxRight;
                    let tiles_right = block.getX() + block.w;

                    let b_collision = tiles_bottom - (this.getCenterY() - this.boxTop);
                    let t_collision = enemy_bottom - block.getY();
                    let l_collision = enemy_right - block.getX();
                    let r_collision = tiles_right - (this.getCenterX() - this.boxRight);

                    if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
                        //console.log("Top collision");
                        this.land(block);
                    }
                    else if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
                        //console.log("bottom collision");
                        this.fall();
                    }
                    else if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
                        // console.log("Enemy Left collision" + " : " + this.getCenterX());
                        let leftValue = this.getCenterX() - this.x + this.boxLeft;
                        this.x = block.getX() - leftValue;
                        this.isEnemyForw = false;
                    }
                    else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
                        // console.log("Enemy Right collision" + " : " + this.getCenterX());
                        let rightValue = this.getCenterX() - this.x - this.boxLeft;
                        this.x = block.getX() + block.w - rightValue;
                        this.isEnemyForw = true;
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
    },

    getCenterX: function(){
        return this.x - this.shiftX + this.w / 2;
    },

    getCenterY: function(){
        return this.y + this.h / 2;
    },

    die: function(){
        this.dead = true;
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

        this.context.drawImage(enemy[this.frameIndex], this.x - this.shiftX, this.y, this.w, this.h);

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
    },

    getType: function(){
        return BLOCK_TYPE_ENEMY;
    }

};