function MainScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
MainScene.prototype = {

    init: function(){

        this.player = new Player(this);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
