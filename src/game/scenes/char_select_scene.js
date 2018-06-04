/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function CharacterSelectionScene(gb, score, mainScene) {
    this.gb = gb;
    this.score = score;
    if (typeof mainScene == 'undefined')
        this.mainScene = new MainScene(this.gb);
    else
        this.mainScene = mainScene;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

CharacterSelectionScene.prototype = {

    init: function(){


        this.charactersImages = [new Image(), new Image(), new Image(), new Image()];
        this.charactersSelectedImages = [new Image(), new Image(), new Image(), new Image()];

        this.charactersImages[0].src = IMG_PLAYER_B_STOP[0];
        this.charactersImages[1].src = IMG_PLAYER_B_STOP[1];
        this.charactersImages[2].src = IMG_PLAYER_B_STOP[2];
        this.charactersImages[3].src = IMG_PLAYER_B_STOP[3];

        this.charactersSelectedImages[0].src = IMG_PLAYER_SELECT_SCREEN[0];
        this.charactersSelectedImages[1].src = IMG_PLAYER_SELECT_SCREEN[1];
        this.charactersSelectedImages[2].src = IMG_PLAYER_SELECT_SCREEN[2];
        this.charactersSelectedImages[3].src = IMG_PLAYER_SELECT_SCREEN[3];

        this.charactersLabels = ["R-Men", "Shaolin", "Dødskamp", "Célapéro"];
        this.title = "Select Your Player";

        this.voidImg = new Image();
        this.voidImg.src = SPRITES_PATH + "menu/void.png";


        this.imagesWH = 200;
        this.imagesY = this.canvas.height/4;
        this.originX = this.canvas.width/2 - this.imagesWH*2;
        this.imagesX = [this.originX];

        for (let i = 1; i < this.charactersImages.length; i++){
            let j = i-1;
            this.imagesX.push(this.imagesX[j] + this.imagesWH);
        }

        this.buttonW = 160;
        this.buttonH = 50;
        this.backButton = [this.canvas.width/2 - this.buttonW/2, this.imagesY + this.imagesWH + this.buttonW*2, this.buttonW, this.buttonH, "Back"];

        this.isMouseHoverImages = [false, false, false, false];
        this.isMouseHoverButton = false;

        this.mouseX = 0;
        this.mouseY = 0;

        let self = this;
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.canvas.addEventListener("mousemove", this.mm);
        this.canvas.addEventListener("click", this.mc);


        this.voidPortal = this.__sprite({
                width: 4200,
                height: 300,
                image: this.voidImg,
                numberOfFrames: 10,
                ticksPerFrame: 3
            }
        );

    },

    update: function(){
    },

    draw: function(){

        this.context.font = '38pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.textAlign="center";
        this.context.fillText(this.title, this.canvas.width/2 - 38/2, this.imagesY - 50);

        for (let i = 0; i < this.charactersImages.length; i++) {

            if (this.isMouseHoverImages[i]) {
                this.context.drawImage(this.charactersSelectedImages[i], this.imagesX[i], this.imagesY, this.imagesWH, this.imagesWH);
            } else
                this.context.drawImage(this.charactersImages[i], this.imagesX[i], this.imagesY, this.imagesWH, this.imagesWH);


            this.context.font = '16pt Kremlin Pro Web';
            this.context.fillStyle = '#000000';
            this.context.textAlign="center";
            this.context.fillText(this.charactersLabels[i], this.imagesX[i] + this.imagesWH/2, this.imagesY + this.imagesWH + 20);
        }

        //portal drawing
        this.context.save();

        this.context.clearRect(this.canvas.width/2 - this.voidPortal.realH/2, (this.imagesY + this.imagesWH) + (this.backButton[1] - (this.imagesY + this.imagesWH))/4, this.voidPortal.realW, this.voidPortal.realH);

        let radius = this.voidPortal.realH/2;
        let destX = this.canvas.width/2 - this.voidPortal.realW/2;
        let destY = (this.imagesY + this.imagesWH) + (this.backButton[1] - (this.imagesY + this.imagesWH))/4;
        this.context.beginPath();
        this.context.moveTo(destX + radius, destY);
        this.context.lineTo(destX + this.voidPortal.realW - radius, destY);
        this.context.quadraticCurveTo(destX + this.voidPortal.realW, destY, destX + this.voidPortal.realW, destY + radius);
        this.context.lineTo(destX + this.voidPortal.realW, destY + this.voidPortal.realH - radius);
        this.context.quadraticCurveTo(destX + this.voidPortal.realW, destY + this.voidPortal.realH, destX + this.voidPortal.realW - radius, destY + this.voidPortal.realH);
        this.context.lineTo(destX + radius, destY + this.voidPortal.realH);
        this.context.quadraticCurveTo(destX, destY + this.voidPortal.realH, destX, destY + this.voidPortal.realH - radius);
        this.context.lineTo(destX, destY + radius);
        this.context.quadraticCurveTo(destX, destY, destX + radius, destY);
        this.context.closePath();

        this.context.clip();

        this.voidPortal.update();
        this.context.drawImage(this.voidPortal.image,
            // source x, y
            this.voidPortal.frameIndex * this.voidPortal.width / this.voidPortal.numberOfFrames, 0,
            // source w, h
            this.voidPortal.width / this.voidPortal.numberOfFrames, this.voidPortal.height,
            // dest x, y
            destX, destY,
            // dest w, h
            this.voidPortal.realW, this.voidPortal.realH
        );

        this.context.restore();

        // draw button
        this.context.beginPath();
        this.context.rect(this.backButton[0], this.backButton[1], this.backButton[2], this.backButton[3]);
        this.context.fillStyle = '#FFFFFF';
        if (!this.isMouseHoverButton)
            this.context.fillStyle = 'rgba(255,255,255,0.2)';
        else
            this.context.fillStyle = 'rgba(255,255,255,1)';
        this.context.fillRect(this.backButton[0], this.backButton[1], this.backButton[2], this.backButton[3]);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        this.context.stroke();
        this.context.closePath();
        this.context.font = '38pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.textAlign="center";
        this.context.fillText(this.backButton[4], this.backButton[0] + this.backButton[2]/2, this.backButton[1]+40);

    },

    __sprite: function(options) {

        let that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0;

        that.numberOfFrames = options.numberOfFrames || 1;
        that.frameIndex = 0;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.realW = that.width/that.numberOfFrames/2;
        that.realH = that.height/2;


        that.update = function () {
            tickCount++;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;

                if (that.frameIndex < that.numberOfFrames - 1) {
                    // Go to the next frame
                    that.frameIndex++;
                } else {
                    that.frameIndex = 0;
                }
            }
        };

        return that;
    },


    __checkPos: function(mouseEvent){

        this.mouseX = mouseEvent.clientX;
        this.mouseY = mouseEvent.clientY;

        for(let i = 0; i < this.charactersImages.length; i++) {
            if(this.mouseX > this.imagesX[i] && this.mouseX < this.imagesX[i] + this.imagesWH
                && this.mouseY > this.imagesY && this.mouseY < this.imagesY + this.imagesWH){
                this.isMouseHoverImages[i] = true;
            }else{
                this.isMouseHoverImages[i] = false;
            }

        }

        if(this.mouseX > this.backButton[0] && this.mouseX < this.backButton[0] + this.backButton[2]
            && this.mouseY > this.backButton[1] && this.mouseY < this.backButton[1] + this.backButton[3]){
            this.isMouseHoverButton = true;
        }else{
            this.isMouseHoverButton = false;
        }

    },

    __checkClick: function(){
        if (this.isMouseHoverButton) {
            this.canvas.removeEventListener("mousemove", this.mm);
            this.canvas.removeEventListener("click", this.mc);
            this.gb.initActiveScene(this.mainScene);
        }

        for(let i = 0; i < this.charactersImages.length; i++){
            if (this.isMouseHoverImages[i]){


                this.canvas.removeEventListener("mousemove", this.mm);
                this.canvas.removeEventListener("click", this.mc);
                this.gb.initActiveScene(new LevelScene(this.gb, i));
            }
        }
    }
};
