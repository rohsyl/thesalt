
let IMG_BG_SCORE = SPRITES_PATH + 'menu/score.png';

function ScoreDisplay(gb, x, y, blockSize){
    this.gb = gb;
    this.canvas = gb.canvas;
    this.context = gb.context;

    this.blockSize = blockSize;
    this.x = x;
    this.y = y;
    this.w = blockSize / 3;
    this.h = blockSize * 2 - this.y * 2;
    this.marginTop = 10;
    this.marginLeft = 20;

    this.scoreLabel = "Score : ";
    this.scoreImage = new Image();
    this.scoreImage.src = IMG_BG_SCORE;


    this.imgSalt = new Image();
    this.imgSalt.src = IMG_SALT;
}
ScoreDisplay.prototype = {

    draw: function(){

        //this.context.save();
        this.context.beginPath();

        this.context.fillStyle = 'black';

        this.context.fillRect(  this.x - 1,
            this.y - 1,
            this.blockSize * 7 + 2,
            this.blockSize * 2 + 2);
        this.context.drawImage(this.scoreImage,  this.x,
            this.y,
            this.blockSize * 7,
            this.blockSize * 2);

        this.context.fillStyle = this.getColor();
        this.context.fillRect(  this.x + this.marginLeft,
                                this.y + (this.h * (100 - this.gb.saltLevel) / 100) + this.marginTop,
                                this.w,
                                this.h * this.gb.saltLevel / 100);



        this.context.fillStyle = 'black';
        this.context.rect(  this.x + this.marginLeft, this.y + this.marginTop, this.w, this.h);
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();


        this.context.drawImage(this.imgSalt, this.x + this.blockSize / 2 + this.marginLeft + 5, this.y + this.h - this.blockSize + this.marginTop + 10, this.blockSize, this.blockSize);


        this.context.font = '20pt Kremlin Pro Web';
        this.context.fillText(this.scoreLabel.concat(this.gb.score) , this.blockSize * 4, this.blockSize * 1.5 - 10 + this.marginTop);
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