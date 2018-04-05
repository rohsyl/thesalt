function EnemyWalkScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

EnemyWalkScene.prototype = {

    init: function(){

        this.player = new EnemyWalk(this, 150, this.canvas.height - 100);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
