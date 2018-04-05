function RmenScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
RmenScene.prototype = {

    init: function(){

        this.player = new Player(this, 150, this.canvas.height - 100);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
