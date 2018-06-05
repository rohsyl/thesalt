function ScoreDisplay(gb, x, y, blockSize){
    this.gb = gb;
    this.canvas = gb.canvas;
    this.context = gb.context;

    this.blockSize = blockSize;
    this.x = x;
    this.y = y;
    this.w = blockSize / 3;
    this.h = blockSize * 2 - this.y * 2;
    this.margin = 10;

    this.scoreLabel = "Score : ";

    this.imgSalt = new Image();
    this.imgSalt.src = IMG_SALT;
}
ScoreDisplay.prototype = {

    draw: function(){

        //this.context.save();
        this.context.beginPath();

        this.context.fillStyle = 'white';
        this.context.fillRect(  this.x,
            this.y,
            this.blockSize * 7,
            this.blockSize * 2);

        this.context.fillStyle = this.getColor();
        this.context.fillRect(  this.x + this.margin,
                                this.y + (this.h * (100 - this.gb.saltLevel) / 100) + this.margin,
                                this.w,
                                this.h * this.gb.saltLevel / 100);



        this.context.fillStyle = 'black';
        this.context.rect(  this.x + this.margin, this.y + this.margin, this.w, this.h);
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();


        this.context.drawImage(this.imgSalt, this.x + this.blockSize / 2 + this.margin, this.y + this.h - this.blockSize + this.margin, this.blockSize, this.blockSize);


        this.context.font = '20pt Kremlin Pro Web';
        this.context.fillText(this.scoreLabel.concat(this.gb.score) , this.blockSize * 4 + this.margin, this.blockSize * 1.5 - 10 + this.margin);
        //this.context.restore();
    },

    getColor: function(){
        if(this.gb.saltLevel < 25){
            return 'lime';
        }
        else if(this.gb.saltLevel < 50){
            return 'yellow';
        }
        else if(this.gb.saltLevel < 75){
            return 'orange';
        }
        else{
            return 'red';
        }
    }
};