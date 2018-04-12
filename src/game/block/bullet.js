function Bullet(gb, x, y, size, destX, destY){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.size = size;
    this.x = x;
    this.y = y;
    this.destX = destX;
    this.destY = destY;
}
Bullet.prototype = {
    init: function () {
        this.velX = 0;
        this.velY = 0;
        this.context.beginPath();
        this.context.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.context.fillStyle = "#000000";
        this.context.fill();
        this.context.closePath();
    },

    draw: function(){
        this.velX++;
        this.velY++;

        this.x += this.velX;
        this.y += this.velY;

        this.velX *= FRICTION;
        this.velY += GRAVITY;
    }
};