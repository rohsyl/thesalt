function Block(gb, x, y, size, spriteName){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

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

    /**
     * Get the x position with the shiftX
     * @returns {number} The x position
     */
    getX: function(){
        return this.x - this.shiftX;
    },

    /**
     * Get the y position
     * @returns {number} The y position
     */
    getY: function(){
        return this.y;
    },
};