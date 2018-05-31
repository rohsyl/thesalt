function EnemyWalkScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

EnemyWalkScene.prototype = {

    init: function(){

        this.player = new enemyWalk(this, 150, this.canvas.height - 100);

        this.player.init();

    },

    update: function(){
        this.player.update();
    },

    draw: function() {

        this.player.draw();

    }
};
