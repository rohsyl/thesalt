/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function CreditScene(mainScene) {
    this.mainScene = mainScene;
    this.gb = this.mainScene.gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
CreditScene.prototype = {

    init: function(){

        let y = this.canvas.height/6;
        let width = 20;

        this.textX = this.canvas.width/2;
        this.textHeight = [width*2, width*1.5, width, width, width, width, width*1.5, width, width];
        this.textY = [y];
        for (let i = 1; i < this.textHeight.length; i++){
            let j = i-1;
            this.textY.push(this.textY[j] + width*3);
        }
        this.textLabel = ["The Salt 2.0", "Developed by :", "R-Men", "Shaolin", "Dødskamp", "Célia", "Special thanks to :", "Andrew Burger", "Feldschlösschen Boissons SA"];


        let self = this;
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.canvas.addEventListener("click", this.mc);
    },

    update: function(){

    },

    draw: function(){

        for (let i = 0; i < this.textHeight.length; i++) {

            this.context.font = this.textHeight[i] + 'pt Kremlin Pro Web';
            this.context.fillStyle = '#000000';
            this.context.textAlign="center";
            this.context.fillText(this.textLabel[i], this.textX, this.textY[i]);
        }

    },

    __checkClick: function(){
        this.canvas.removeEventListener("click", this.mc);
        this.gb.initActiveScene(this.mainScene);
    }
};
