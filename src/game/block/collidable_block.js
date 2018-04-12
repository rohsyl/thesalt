function CollidableBlock(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.isCollidable = true;
    this.w = size;
    this.h = size;
    this.x = x;
    this.y = y;

    this.shiftX = undefined;
    //console.log(spriteName, x, y, size);
}
CollidableBlock.prototype = {

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

    /*
    what have, x, y, and getType()
     */
    onCollision: function(what){
        this.context.beginPath();
        this.context.lineWidth="6";
        this.context.strokeStyle="red";
        this.context.rect(this.getX(), this.getY(), this.w, this.h);
        this.context.stroke();
    },

    getType: function(){
        return BLOCK_TYPE_COLLIDABLE_BLOCK;
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