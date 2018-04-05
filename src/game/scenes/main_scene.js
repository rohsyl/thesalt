function MainScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
MainScene.prototype = {

    init: function(){
        this.h = c;
        this.w = 10;
        this.x = 150;
        this.y = this.canvas.height - 100;
        this.speed = 5;
        this.jumpStrength = 10;
        this.velX = 0;
        this.velY = 0;

        this.jumpYOrigin = this.y;
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpTimeout = TIMEOUT_JUMP;

        this.player = new Player(this, this.x, this.y);
        this.player.init();
    },

    draw: function(){
        this.player.draw();
    }
};
