function GameScene(gb, playerSelected) {
    this.gb = gb;
    this.playerSelected = playerSelected;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
GameScene.prototype = {

    init: function(){

        this.player = new Player(this, 150, this.canvas.height - 100, this.playerSelected);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
