function Block(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.image = new Image();
    this.image.src = this.__getSrc(spriteName);

    this.isCollidable = true;
    this.size = size;
    this.x = x;
    this.y = y;
}
Block.prototype = {
    draw: function(){
        this.context.drawImage(this.image, this.x, this.y, this.size, this.size);
    },

    __getSrc: function(spriteName){
        return "assets/sprites/"+spriteName+".png";
    }
};