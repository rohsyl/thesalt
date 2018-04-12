var backgroundImage = new Image();
backgroundImage.src = 'assets/sprites/background/floor_cave_1.png';
backgroundImage.repeat = "repeat-x";
let direction = 0;

function DodScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

DodScene.prototype = {

    init: function(){
        this.h = 10;
        this.w = 10;
        this.x = 150;
        this.y = this.canvas.height - 100;
        this.speed = 5;
        this.jumpStrength = 10;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpTimeout = TIMEOUT_JUMP;


    },

    update: function(){

    },

    draw: function(){

        //this.drawBackground();
        this.drawPlayer();
        if(this.jumpTimeout > -1){
            this.jumpTimeout--;
            console.log(this.jumpTimeout);
        }

        // start jumping
        if(this.gb.keyUpPressed){
            if(!this.jumping){
                console.log("jump");
                this.velY = -this.jumpStrength*2;
                this.jumpYOrigin = this.y;
                this.jumping = true;

                console.log('cw : ' + this.canvas.width);
                console.log('ch : ' + this.canvas.height);
                this.jumpCount = 1;
                this.jumpTimeout = TIMEOUT_JUMP;
            }
            else if (this.jumpTimeout < 0 && this.jumpCount == 1){
                console.log(this.jumpCount);
                this.velY = -this.jumpStrength*2;
                this.jumping = true;
                this.jumpCount = 2;
                this.jumpTimeout = 0;
            }
        }

        // move left or right
        /*
        if(this.gb.keyRightPressed && this.x < this.canvas.width + this.w - 50) {
            if(this.velX < this.speed)
                this.velX++;
        }
        else if(this.gb.keyLeftPressed && this.x > 50) {
            if(this.velX > -this.speed)
                this.velX--;
        }
        */

        if(direction == 0) {
            if(this.velX < this.speed) {
                this.velX++;
                if(this.x >= this.canvas.width - this.w - 50)
                    direction = 1;
            }
        } else if(direction == 1) {
            if(this.velX > -this.speed) {
                this.velX--;
                if(this.x <= this.w + 50)
                    direction = 0;
            }
        }

        console.log(this.x);

        this.x += this.velX;
        this.y += this.velY;

        this.velX *= FRICTION;
        this.velY += GRAVITY;

        if(this.y >= this.jumpYOrigin - this.h){
            this.y = this.jumpYOrigin;
            this.jumping = false;
            this.jumpCount = 0;
        }
    },

    drawBackground: function() {
        this.context.drawImage(backgroundImage, 0, this.canvas.height - 90);
    },

    drawPlayer: function(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.h, 0, Math.PI * 2);
        this.context.fillStyle = "#FF0000";
        this.context.fill();
        this.context.closePath();
    }
};
