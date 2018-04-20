function MainScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
MainScene.prototype = {

    init: function(){

        this.buttonsX = [this.canvas.width/2-70, this.canvas.width/2-150, this.canvas.width/2-100];
        this.buttonsY = [150,220,290];
        this.buttonsWidth = [140,300,200];
        this.buttonsHeight = [50,50,50];
        this.buttonsLabel = ["Play", "Scoreboard", "Credits"];
        this.isMouseHoverButton = [false, false, false];
        this.scenes = [new CharacterSelectionScene(this.gb, 0), new ScoreboardScene(this), new CreditScene(this)];

        this.mouseX = 0;
        this.mouseY = 0;

        let self = this;
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.canvas.addEventListener("mousemove", this.mm);
        this.canvas.addEventListener("click", this.mc);

    },

    update: function(){

    },

    draw: function() {



        for (let i = 0; i < this.buttonsX.length; i++) {
            this.context.beginPath();
            this.context.rect(this.buttonsX[i], this.buttonsY[i],
            this.buttonsWidth[i], this.buttonsHeight[i]);
            this.context.fillStyle = '#FFFFFF';
            if (!this.isMouseHoverButton[i])
                this.context.fillStyle = 'rgba(255,255,255,0.2)';
            else
                this.context.fillStyle = 'rgba(255,255,255,1)';
            this.context.fillRect(this.buttonsX[i], this.buttonsY[i],
                this.buttonsWidth[i], this.buttonsHeight[i]);
            this.context.fill();
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#000000';
            this.context.stroke();
            this.context.closePath();
            this.context.font = '38pt Kremlin Pro Web';
            this.context.fillStyle = '#000000';
            this.context.textAlign="center";
            this.context.fillText(this.buttonsLabel[i], this.buttonsX[i]+this.buttonsWidth[i]/2, this.buttonsY[i]+40);
        }


    },

    __checkPos: function(mouseEvent){

        for(let i = 0; i < this.buttonsX.length; i++){

            this.mouseX = mouseEvent.clientX;
            this.mouseY = mouseEvent.clientY;

            if(this.mouseX > this.buttonsX[i] && this.mouseX < this.buttonsX[i] + this.buttonsWidth[i]
                && this.mouseY > this.buttonsY[i] && this.mouseY < this.buttonsY[i] + this.buttonsHeight[i]){
                this.isMouseHoverButton[i] = true;
            }else{
                this.isMouseHoverButton[i] = false;
            }
        }

    },

    __checkClick: function(mouseEvent){

        for(let i = 0; i < this.buttonsX.length; i++){
            if (this.isMouseHoverButton[i]){
                this.canvas.removeEventListener("mousemove", this.mm);
                this.canvas.removeEventListener("click", this.mc);
                this.gb.initActiveScene(this.scenes[i]);
            }
        }
    }
};
