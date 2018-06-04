function MainScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
MainScene.prototype = {

    init: function(){

        this.buttonsWidth = 140;
        this.buttonsHeight = 50;
        this.buttonsX = this.canvas.width/2 - this.buttonsWidth/2;
        this.buttonsY = this.canvas.height/2 - this.buttonsHeight/2;
        this.buttonsLabel = "Play";
        this.isMouseHoverButton = false;
        this.scene = new CharacterSelectionScene(this.gb, 0);

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
            this.context.fillText(this.buttonsLabel, this.buttonsX+this.buttonsWidth/2, this.buttonsY+40);
    },

    __checkPos: function(mouseEvent){
        let rect = this.canvas.getBoundingClientRect();

        this.mouseX = mouseEvent.clientX - rect.left;
        this.mouseY = mouseEvent.clientY - rect.top;

        this.isMouseHoverButton = this.mouseX > this.buttonsX && this.mouseX < this.buttonsX + this.buttonsWidth && this.mouseY > this.buttonsY && this.mouseY < this.buttonsY + this.buttonsHeight;

    },

    __checkClick: function(mouseEvent){

            if (this.isMouseHoverButton){
                this.canvas.removeEventListener("mousemove", this.mm);
                this.canvas.removeEventListener("click", this.mc);
                this.gb.initActiveScene(this.scene);
            }
    }
};
