function Block(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.isCollidable = false;
    this.w = size;
    this.h = size;
    this.x = x;
    this.y = y;

    this.shiftX = undefined;
    //console.log(spriteName, x, y, size);
}
Block.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.__getSrc(this.spriteSrc);
    },

    update: function(shiftX){
        this.shiftX = shiftX;
    },

    draw: function(){
        this.context.drawImage(this.image, this.getX(), this.getY(), this.w, this.h);
    },

    getType: function(){
        return BLOCK_TYPE_BLOCK;
    },

    getX: function(){
        return this.x - this.shiftX;
    },

    getY: function(){
        return this.y;
    },

    __getSrc: function(spriteName){
        return "assets/sprites/"+spriteName+".png";
    }
};