const DEFAULT_FRAME = 3;
const JUMPING_FRAME = 1;
const TIMEOUT_JUMP = 15;

const SPRITES_PATH = "assets/sprites/";

const IMG_PLAYER_0_PATH = SPRITES_PATH + "player_0/";
const IMG_PLAYER_1_PATH = SPRITES_PATH + "player_1/";
const IMG_PLAYER_2_PATH = SPRITES_PATH + "player_2/";
const IMG_PLAYER_3_PATH = SPRITES_PATH + "player_3/";

const IMG_PLAYER_FORW_PATH = "forwards/";
const IMG_PLAYER_BACKW_PATH = "backwards/";

const IMG_PLAYER_STOP_PATH = "arret.png";
const IMG_PLAYER_FEET_FRONT_PATH = "pied-avant.png";
const IMG_PLAYER_RUN_PATH = "court.png";
const IMG_PLAYER_FEET_BACK_PATH = "pied-arriere.png";

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

        // w / h for velocity calculation
        this.h = 10;
        this.w = 10;

        // w / h for drawing
        this.realW = this.blockSize*2;
        this.realH = this.blockSize*2;

        this.y = this.y - this.realH/2;
        this.speed = 5;
        this.jumpStrength = 8;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpTimeout = TIMEOUT_JUMP;

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

    draw: function (shiftX) {



        // doublejump timeout
        if(this.jumpTimeout > -1) {
            this.jumpTimeout--;
            // console.log(this.jumpTimeout);
        }

        // start jumping
        if(this.gb.keyUpPressed){
            this.__drawPlayerJumping();
            // first jump
            if(!this.jumping){
                // console.log("jump");
                this.velY = -this.jumpStrength*2;
                this.jumpYOrigin = this.y;
                this.jumping = true;

                // console.log('cw : ' + this.canvas.width);
                // console.log('ch : ' + this.canvas.height);
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
        if(this.gb.keyRightPressed && this.x < this.canvas.width - this.realW) {
            if(this.velX < this.speed)
                this.velX++;
            this.isPlayerForw = true;
            this.__drawPlayerWalking();
        }
        else if(this.gb.keyLeftPressed && this.x > 50) {
            if(this.velX > -this.speed)
                this.velX--;
            this.isPlayerForw = false;
            this.__drawPlayerWalking();
        }
        else {
            this.__drawPlayerWaiting();
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

    /*
    what have, x, y, and getType()
     */
    onCollision: function(what){

    },

    getType: function(){
        return BLOCK_TYPE_PLAYER;
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
    }

}