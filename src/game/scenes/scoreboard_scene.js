/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function ScoreboardScene(mainScene) {
    this.mainScene = mainScene;
    this.gb = this.mainScene.gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
ScoreboardScene.prototype = {

    init: function(){

        let y = this.canvas.height/6;
        let width = 20;

        this.textX = this.canvas.width/2;
        this.textHeight = [width*2, width*1.5, width, width, width, width*1.5, width];
        this.textY = [y];
        for (let i = 1; i < this.textHeight.length; i++){
            let j = i-1;
            this.textY.push(this.textY[j] + width*3);
        }

        this.zero = "  ";
        this.textLabel = ["The Salt 2.0", "Best Scores : ", "10542 pts - Billy", this.zero+"7932 pts - Phillipe", this.zero+"5276 pts - Anatol", "Your Last Score : ", this.zero+this.zero+this.zero+this.zero+"0 pts"];
        this.textLeftIndexes = [2, 3, 4, 6];

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
            let x = this.textX;
            if (this.textLeftIndexes.find(function(index){return index === i;})) {
                this.context.textAlign="left";
                x = this.textX - 100;
            }
            this.context.fillText(this.textLabel[i], x, this.textY[i]);
        }

    },

    __checkClick: function(){
        this.canvas.removeEventListener("click", this.mc);
        this.gb.initActiveScene(this.mainScene);
    }
};
