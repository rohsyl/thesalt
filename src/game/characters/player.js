const DEFAULT_FRAME = 3;
const JUMPING_FRAME = 1;
const TIMEOUT_JUMP = 15;

function Player(scene, x, y, blockSize) {
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
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
        this.jumpStrength = 10;
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

        this.playerForw0.src = "assets/sprites/player/forwards/arret-rmen.png";
        this.playerForw1.src = "assets/sprites/player/forwards/pied-avant-rmen.png";
        this.playerForw2.src = "assets/sprites/player/forwards/court-rmen.png";
        this.playerForw3.src = "assets/sprites/player/forwards/pied-arriere-rmen.png";
        this.playerBackw0.src = "assets/sprites/player/backwards/arret-rmen.png";
        this.playerBackw1.src = "assets/sprites/player/backwards/pied-avant-rmen.png";
        this.playerBackw2.src = "assets/sprites/player/backwards/court-rmen.png";
        this.playerBackw3.src = "assets/sprites/player/backwards/pied-arriere-rmen.png";



        this.playerForw = [this.playerForw1, this.playerForw2, this.playerForw3, this.playerForw0];
        this.playerBackw = [this.playerBackw1, this.playerBackw2, this.playerBackw3, this.playerBackw0];

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 3;
        this.numberOfFrames = this.playerForw.length;

    },

    draw: function () {



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
        if(this.gb.keyRightPressed && this.x < this.canvas.width + this.w - 50) {
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