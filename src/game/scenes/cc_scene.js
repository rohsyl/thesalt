/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function Scenecc(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
Scenecc.prototype = {

    init: function(){
        this.x = 10;
        this.y = this.canvas.height - 100;
        this.speedX = 0;
        this.speedY = 0;
     //   this.jumpYOrigin = this.y;
  //      this.jumping = false;
    //    this.jumpCount = 0;

    },

    update: function(){

    },

    draw: function(){
        this.drawSquare();
        this.drawCircle();
        if(this.gb.keyLeftPressed){
            this.moveLeft();
        }
        if(this.gb.keyRightPressed){
            this.moveRight();
        }
        if(this.gb.keyUpPressed){
            this.moveUp();

        }

        this.x += this.speedX;
        this.y += this.speedY;



        this.speedX *= FRICTION;
     //   this.speedY += GRAVITY
        if (this.x == this.canvas.width){
            this.x=0;

        }

        ;
        if( this.y < this.jumpYOrigin - this.h) {
            this.y = 0;
            this.jumping = false;
            this.jumpCount = 0;

        }


},

    moveLeft: function(){
        this.speedX -= 3;

    },


    moveRight: function(){
    this.speedX += 3;

    },


    moveUp: function(){
    this.speedY -= 2;

    },



    drawSquare: function(){
        this.context.fillStyle = "#FF0000";
        this.context.fillRect(this.x,this.y,10,10);
       // this.ennemy.src= "assets/sprites/player/forwards/arret-rmen.png";
        //this.context.drawImage(this.ennemy.src,10,10);
    },
    drawCircle: function(){

        this.context.beginPath();
        this.context.fillRect(this.x+20,this.y,10,10,2*Math.PI);
        this.context.fillStyle="#FF4422";
        this.context.fill();
        //this.context.stroke();


    }


};
