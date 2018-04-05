function CollidableBlock(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.isCollidable = true;
    this.size = size;
    this.x = x;
    this.y = y;

    console.log(spriteName, x, y, size);
}
CollidableBlock.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.__getSrc(this.spriteSrc);
    },

    draw: function(){
        this.context.drawImage(this.image, this.x, this.y, this.size, this.size);
    },

    getType: function(){
        return BLOCK_TYPE_COLLIDABLE_BLOCK;
    },

    __getSrc: function(spriteName){
        return "assets/sprites/"+spriteName+".png";
    }
};