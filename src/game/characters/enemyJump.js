
let IMG_ENEMY_2_PATH = SPRITES_PATH + "npc/enemy_0/";

let IMG_ENEMY_2_F_STOP = IMG_ENEMY_2_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_2_B_STOP = IMG_ENEMY_2_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_STOP_PATH;

let IMG_ENEMY_2_F_FEETFRONT = IMG_ENEMY_2_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_2_B_FEETFRONT = IMG_ENEMY_2_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_FRONT_PATH;

let IMG_ENEMY_2_F_RUN = IMG_ENEMY_2_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_2_B_RUN = IMG_ENEMY_2_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_RUN_PATH;

let IMG_ENEMY_2_F_FEETBACK = IMG_ENEMY_2_PATH + IMG_ENEMY_FORW_PATH + IMG_ENEMY_FEET_BACK_PATH;

let IMG_ENEMY_2_B_FEETBACK = IMG_ENEMY_2_PATH + IMG_ENEMY_BACKW_PATH + IMG_ENEMY_FEET_BACK_PATH;


function EnemyJump(scene, x, y) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
}

EnemyJump.prototype = {

    init: function() {

        // w / h for velocity calculation
        this.h = 10;
        this.w = 10;

        // w / h for drawing
        this.realW = this.w * 12.8;
        this.realH = this.h * 12.8;

        this.y = this.y - this.realH;
        this.speed = 5;
        this.jumpStrength = 10;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;

        this.isPlayerForw = true;

        this.playerForw0 = new Image();
        this.playerForw1 = new Image();
        this.playerForw2 = new Image();
        this.playerForw3 = new Image();
        this.playerBackw0 = new Image();
        this.playerBackw1 = new Image();
        this.playerBackw2 = new Image();
        this.playerBackw3 = new Image();

        this.playerForw0.src = IMG_ENEMY_2_F_STOP;
        this.playerForw1.src = IMG_ENEMY_2_F_FEETFRONT;
        this.playerForw2.src = IMG_ENEMY_2_F_RUN;
        this.playerForw3.src = IMG_ENEMY_2_F_FEETBACK;
        this.playerBackw0.src = IMG_ENEMY_2_B_STOP;
        this.playerBackw1.src = IMG_ENEMY_2_B_FEETFRONT;
        this.playerBackw2.src = IMG_ENEMY_2_B_RUN;
        this.playerBackw3.src = IMG_ENEMY_2_B_FEETBACK;

        this.playerForw = [this.playerForw1, this.playerForw2, this.playerForw3, this.playerForw0];
        this.playerBackw = [this.playerBackw1, this.playerBackw2, this.playerBackw3, this.playerBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3;
        this.numberOfFrames = this.playerForw.length;

    },

    draw: function () {

        // start jumping
        if(!this.jumping){
            this.__drawPlayerJumping();
            this.velY = -this.jumpStrength*2;
            this.jumpYOrigin = this.y;
            this.jumping = true;
        }

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
        this.y += this.velY;

        // apply forces
        this.velX *= FRICTION;
        this.velY += GRAVITY;

        // ground limit
        if(this.y >= this.jumpYOrigin - this.h){
            this.y = this.jumpYOrigin;
            this.jumping = false;
            this.jumpCount = 0;
        }
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
        this.context.clearRect(this.x, this.y, this.realW, this.realH);

        let player;

        if (this.isPlayerForw)
            player = this.playerForw;
        else
            player = this.playerBackw;


        this.context.drawImage(player[this.frameIndex], this.x, this.y, this.realW, this.realH);

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