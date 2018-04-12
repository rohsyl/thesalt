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

    //console.log(spriteName, x, y, size);
}
CollidableBlock.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.spriteSrc;
    },

    update: function(shiftX){

    },

    draw: function(shiftX){
        this.context.drawImage(this.image, this.x - shiftX, this.y, this.w, this.h);
    },

    /*
    what have, x, y, and getType()
     */
    onCollision: function(what){
        this.context.beginPath();
        this.context.lineWidth="6";
        this.context.strokeStyle="red";
        this.context.rect(this.x, this.y, this.w, this.h);
        this.context.stroke();
    },

    getType: function(){
        return BLOCK_TYPE_COLLIDABLE_BLOCK;
    },

};