function GameOverScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
    this.image = undefined;

    this.h = 1080;
    this.w = 1920;
}
GameOverScene.prototype = {

    init: function(){

        this.buttonsY = 150;
        this.buttonsWidth = 200;
        this.buttonsHeight = 50;
        this.buttonsX = this.canvas.width/2 - this.buttonsWidth/2;
        this.buttonsLabel = "Replay";
        this.isMouseHoverButton =false;
        this.textLabel = "Score : ";

        this.mouseX = 0;
        this.mouseY = 0;

        let self = this;
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.canvas.addEventListener("mousemove", this.mm);
        this.canvas.addEventListener("click", this.mc);

        this.image = new Image();
        this.image.src = 'assets/sprites/background/gameover/gameover.jpg';

        console.log('game over');
        this.gb.saveScore();
        this.gb.saltLevel = 0;
    },

    update: function(){

    },

    draw: function() {
        //this.context.drawImage(this.image, this.image.width/2 - this.canvas.width/2, this.image.height/2 - this.canvas.height/2  , this.w, this.h);
        //this.context.save();
        this.context.beginPath();
        this.context.drawImage(this.image, 0, 0, this.w, this.h);

        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        this.context.rect(this.buttonsX, this.buttonsY, this.buttonsWidth, this.buttonsHeight);
        this.context.stroke();
        this.context.closePath();

        this.context.fillStyle = !this.isMouseHoverButton ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,1)';
        this.context.fillRect(this.buttonsX, this.buttonsY, this.buttonsWidth, this.buttonsHeight);
        this.context.fill();

        this.context.font = '38pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.textAlign="center";
        this.context.fillText(this.textLabel.concat(" ", this.gb.score) ,this.canvas.width/2, 100 );

        this.context.font = '30pt Kremlin Pro Web';
        this.context.fillText(this.buttonsLabel, this.buttonsX+this.buttonsWidth/2, this.buttonsY + this.buttonsHeight/2 + 12);

        //this.context.restore();
    },

    __checkPos: function(mouseEvent){

        let rect = this.canvas.getBoundingClientRect();

        this.mouseX = mouseEvent.clientX - rect.left;
        this.mouseY = mouseEvent.clientY - rect.top;

        if(this.mouseX > this.buttonsX && this.mouseX < this.buttonsX + this.buttonsWidth
            && this.mouseY > this.buttonsY && this.mouseY < this.buttonsY + this.buttonsHeight){
            this.isMouseHoverButton = true;
        }else{
            this.isMouseHoverButton = false;
        }

    },

    __checkClick: function(mouseEvent) {

        if (this.isMouseHoverButton) {
            this.canvas.removeEventListener("mousemove", this.mm);
            this.canvas.removeEventListener("click", this.mc);
            this.gb.score = 0;
            this.gb.initLevel(0);
        }
    }
};
