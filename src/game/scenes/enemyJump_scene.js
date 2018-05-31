function EnemyJumpScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

EnemyJumpScene.prototype = {

    init: function(){

        this.player = new Old_enemyJump(this, 150, this.canvas.height - 100);

        this.player.init();

    },

    draw: function() {

        this.player.draw();

    }
};
