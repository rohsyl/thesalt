/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function RmenScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}


RmenScene.prototype = {

    init: function(){
        this.h = 128;
        this.w = 128;
        this.x = 150;
        this.y = this.canvas.height - 100;
        this.speed = 5;
        this.jumpStrength = 5;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;

        this.playerForw0 = new Image();
        this.playerForw1 = new Image(this.w, this.h);
        this.playerForw2 = new Image(this.w, this.h);
        this.playerForw3 = new Image(this.w, this.h);

        this.playerForw0.src = "assets/sprites/player/forwards/arret-rmen.png";
        this.playerForw1.src = "assets/sprites/player/forwards/pied-avant-rmen.png";
        this.playerForw2.src = "assets/sprites/player/forwards/court-rmen.png";
        this.playerForw3.src = "assets/sprites/player/forwards/pied-arriere-rmen.png";



    },

    draw: function(){

        this.drawPlayer();

        // start jumping
        if(this.gb.keyUpPressed){
            if(!this.jumping){
                this.velY = -this.jumpStrength*2;
                this.jumpYOrigin = this.y;
                this.jumping = true;
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


        this.velX *= FRICTION;
        if(this.jumping)
            this.velY += GRAVITY;

        this.x += this.velX;
        this.y += this.velY;

        console.log(this.x, this.y);

        if(this.y >= this.canvas.height - this.h - this.jumpYOrigin){
            this.y = this.canvas.height - this.h - this.jumpYOrigin;
            this.jumping = false;
        }
    },


    drawPlayer: function(){

        this.context.drawImage(this.playerForw0, this.x, this.y, this.w, this.h);

    }


};
