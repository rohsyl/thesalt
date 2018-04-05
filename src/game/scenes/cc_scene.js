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

        this.x = this.canvas.width;
        this.y = this.canvas.height - 100;
        this.speedX = 0;
        this.speedY = 0;

        this.ennemy = new Image();
        ennemy.src ="assets/sprites/player/forwards/arret-rmen.png";
    },


    draw: function(){
        this.drawSquare();
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
        this.x += this.velX;
        this.y += this.velY;

        this.velX *= FRICTION;
        this.velY += GRAVITY;


    },

    moveLeft: function(){
        this.speedX -= 3;

    },


    moveRight: function(){
    this.speedX += 3;

    },


    moveUp: function(){
    this.speedY += 3;

    },
    update: function(){
        draw();

    },

    drawSquare: function(){
        this.context.fillStyle = "#FF0000";
        this.context.fillRect(this.x,this.y,10,10);
        this.context.drawImage(document.getElementById("ennemi"));
    }


};
