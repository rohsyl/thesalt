function MainScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
MainScene.prototype = {

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
        this.dblJumping = false;

    },

    draw: function(){

        this.drawPlayer();

        //
        /*
        if(this.x + this.dx > this.canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy > this.canvas.height-this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }

        this.x +=dw this.dx;
        this.y += this.dy;
        */

        // start jumping
        if(this.gb.keyUpPressed){
            if(!this.jumping){
                console.log("jump");
                this.velY = -this.jumpStrength*2;
                this.jumpYOrigin = this.y;
                this.jumping = true;

                console.log('cw : ' + this.canvas.width);
                console.log('ch : ' + this.canvas.height);
            }

        }

        // move left or right
        if(this.gb.keyRightPressed && this.x < this.canvas.width + this.w - 50) {
            if(this.velX < this.speed)
                this.velX++;
        }
        else if(this.gb.keyLeftPressed && this.x > 50) {
            if(this.velX > -this.speed)
                this.velX--;
        }

        this.x += this.velX;
        this.y += this.velY;

        this.velX *= FRICTION;
        this.velY += GRAVITY;


        //console.log(this.x, this.y);

        if(this.y >= this.jumpYOrigin - this.h){

            this.y = this.jumpYOrigin;
            this.jumping = false;
            this.dblJumping = false;
        }
    },


    drawPlayer: function(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.h, 0, Math.PI * 2);
        this.context.fillStyle = "#FF0000";
        this.context.fill();
        this.context.closePath();
    }
};
