function GameOverScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
GameOverScene.prototype = {

    init: function(){

        this.buttonsY = 150;
        this.buttonsWidth = 200;
        this.buttonsHeight = 50;
        this.buttonsX = this.canvas.width/2 - this.buttonsWidth/2;
        this.buttonsLabel = "Replay";
        this.isMouseHoverButton =false;
        this.textLabel = "Game over";

        this.mouseX = 0;
        this.mouseY = 0;

        let self = this;
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.canvas.addEventListener("mousemove", this.mm);
        this.canvas.addEventListener("click", this.mc);

        console.log('game over');
        this.gb.saveScore();
    },

    update: function(){

    },

    draw: function() {


        this.context.beginPath();

        this.context.rect(this.buttonsX, this.buttonsY,
        this.buttonsWidth, this.buttonsHeight);

        this.context.fillStyle = '#FFFFFF';
        if (!this.isMouseHoverButton)
            this.context.fillStyle = 'rgba(255,255,255,0.2)';
        else
            this.context.fillStyle = 'rgba(255,255,255,1)';

        this.context.fillRect(this.buttonsX, this.buttonsY,
            this.buttonsWidth, this.buttonsHeight);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        this.context.stroke();
        this.context.closePath();


        this.context.font = '38pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.textAlign="center";
        console.log(this.textLabel);
        this.context.fillText(this.textLabel ,this.canvas.width/2, 100 );

        this.context.font = '30pt Kremlin Pro Web';
        this.context.fillText(this.buttonsLabel, this.buttonsX+this.buttonsWidth/2, this.buttonsY + this.buttonsHeight/2 + 12);



    },

    __checkPos: function(mouseEvent){

        this.mouseX = mouseEvent.clientX;
        this.mouseY = mouseEvent.clientY;

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
