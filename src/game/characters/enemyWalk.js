
let IMG_ENEMY_1_PATH = SPRITES_PATH + "npc/enemy_0/";

let IMG_ENEMY_1_F_STOP = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_1_B_STOP = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_1_F_FEETFRONT = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_1_B_FEETFRONT = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_1_F_RUN = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_1_B_RUN = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_1_F_FEETBACK = IMG_ENEMY_1_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_BACK_PATH;

let IMG_ENEMY_1_B_FEETBACK = IMG_ENEMY_1_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_BACK_PATH;

let direction2 = 0;

function EnemyWalk(scene, x, y) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
}

EnemyWalk.prototype = {

    init: function() {

        // w / h for velocity calculation
        this.h = 10;
        this.w = 10;

        // w / h for drawing
        this.w = this.w * 12.8;
        this.h = this.h * 12.8;

        this.y = this.y - this.h;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;

        this.isPlayerForw = true;

        this.playerForw0 = new Image();
        this.playerForw1 = new Image();
        this.playerForw2 = new Image();
        this.playerForw3 = new Image();
        this.playerBackw0 = new Image();
        this.playerBackw1 = new Image();
        this.playerBackw2 = new Image();
        this.playerBackw3 = new Image();

        this.playerForw0.src = IMG_ENEMY_1_F_STOP;
        this.playerForw1.src = IMG_ENEMY_1_F_FEETFRONT;
        this.playerForw2.src = IMG_ENEMY_1_F_RUN;
        this.playerForw3.src = IMG_ENEMY_1_F_FEETBACK;
        this.playerBackw0.src = IMG_ENEMY_1_B_STOP;
        this.playerBackw1.src = IMG_ENEMY_1_B_FEETFRONT;
        this.playerBackw2.src = IMG_ENEMY_1_B_RUN;
        this.playerBackw3.src = IMG_ENEMY_1_B_FEETBACK;

        this.playerForw = [this.playerForw1, this.playerForw2, this.playerForw3, this.playerForw0];
        this.playerBackw = [this.playerBackw1, this.playerBackw2, this.playerBackw3, this.playerBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3;
        this.numberOfFrames = this.playerForw.length;

    },

    update: function(){

    },

    draw: function () {

         // apply velocity left // right
        if(this.x < this.canvas.width + this.realW && direction2 == 0) {

            if(this.velX < this.speed)
                this.velX++;
            this.isPlayerForw = true;
            this.__drawPlayerWalking();
            if(this.x >= this.canvas.width - this.realW)
                direction2 = 1;
        }
        else if(this.x > 50 && direction2 == 1) {
            if(this.velX > -this.speed)
                this.velX--;
            this.isPlayerForw = false;
            this.__drawPlayerWalking();
            if(this.x <= this.w + 50)
                direction2 = 0;
        }

        // move the player
        this.x += this.velX;

        // apply forces
        this.velX *= FRICTION;
    },

    __drawPlayerWalking: function(){
        this.__update();
        this.__drawPlayer();
    },

    __drawPlayer(){


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
    },

    getType: function(){
        return BLOCK_TYPE_ENEMY;
    }

}