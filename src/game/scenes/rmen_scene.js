function RmenScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

RmenScene.prototype = {

    init: function(){
        this.w = 10;
        this.h = 10;

        this.realW = this.w * 12.8;
        this.realH = this.h * 12.8;

        this.x = 150;
        this.y = this.canvas.height - 100 - this.realH;
        this.speed = 5;
        this.jumpStrength = 10;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;
        this.dblJumping = false;

        this.playerForw0 = new Image();
        this.playerForw1 = new Image();
        this.playerForw2 = new Image();
        this.playerForw3 = new Image();

        this.playerForw0.src = "assets/sprites/player/forwards/arret-rmen.png";
        this.playerForw1.src = "assets/sprites/player/forwards/pied-avant-rmen.png";
        this.playerForw2.src = "assets/sprites/player/forwards/court-rmen.png";
        this.playerForw3.src = "assets/sprites/player/forwards/pied-arriere-rmen.png";

        this.player = sprite({
            context: this.context,
            width: this.realW,
            height: this.realH,
            x: this.x,
            y: this.y,
            image0: this.playerForw0,
            image1: this.playerForw1,
            image2: this.playerForw2,
            image3: this.playerForw3
        });

    },

    draw: function(){

        this.drawPlayerWaiting();

        // start jumping
        if(this.gb.keyUpPressed){
            if(!this.jumping){
                console.log("jump");
                this.velY = -this.jumpStrength*2;
                this.jumpYOrigin = this.y;
                this.jumping = true;
            }

        }


        // move left or right
        if(this.gb.keyRightPressed && this.x < this.canvas.width - this.realW) {
            if(this.velX < this.speed)
                this.velX++;
            this.drawPlayerWalking();

        }
        else if(this.gb.keyLeftPressed && this.x > 0) {
            if(this.velX > -this.speed)
                this.velX--;
            this.drawPlayerWalking();
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

    drawPlayerWaiting: function(){

        this.player.default();
        this.player.update();
    },

    drawPlayerWalking: function(){

        this.player.update();

        this.player.render();



/*

        setTimeout(this.context.drawImage(
            this.playerForw1, this.x, this.y, this.realW, this.realH),
            5000);

        console.log("1");

        setTimeout(this.context.drawImage(
            this.playerForw2, this.x, this.y, this.realW, this.realH),
            5000);

        console.log("2");

        setTimeout(this.context.drawImage(
            this.playerForw3, this.x, this.y, this.realW, this.realH),
            5000);

        console.log("3");

        setTimeout(this.context.drawImage(
            this.playerForw0, this.x, this.y, this.realW, this.realH),
            5000);

        console.log("0");
*/



    }

};
