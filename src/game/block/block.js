function Block(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.isCollidable = false;
    this.size = size;
    this.x = x;
    this.y = y;

    console.log(spriteName, x, y, size);
}
Block.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.__getSrc(this.spriteSrc);
    },

    draw: function(shiftX){
        this.context.drawImage(this.image, this.x - shiftX, this.y, this.size, this.size);
    },

    getType: function(){
        return BLOCK_TYPE_BLOCK;
    },

    __getSrc: function(spriteName){
        return "assets/sprites/"+spriteName+".png";
    }
};