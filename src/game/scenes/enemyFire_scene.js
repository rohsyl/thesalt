function EnemyFireScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

EnemyFireScene.prototype = {

    init: function(){

        this.player = new EnemyFire(this, 150, this.canvas.height - 100);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
