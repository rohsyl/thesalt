function ItemBlock(gb, x, y, size, spriteName, scorePoint){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.picked = false;

    this.w = size;
    this.h = size;
    this.x = x;
    this.y = y;

    this.shiftX = undefined;
    //console.log(spriteName, x, y, size);

    this.scorePoint = scorePoint;
}
ItemBlock.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.spriteSrc;
    },

    update: function(shiftX){
        this.shiftX = shiftX;
    },

    draw: function(){
        if(!this.picked)
            this.context.drawImage(this.image, this.getX(), this.getY(), this.w, this.h);
    },

    onCollision: function(player){

    },

    pick: function(){
        this.picked = true;
    },

    getType: function(){
        return BLOCK_TYPE_ITEMS;
    },

    effect: function(player){
        if(this.spriteSrc == IMG_PIZZA){
            this.gb.audio.playPickPizza();
            player.boostJump(2, 5);
        }
        else if(this.spriteSrc == IMG_RJ45){
            this.gb.audio.playPickRj45();
            player.hasRJ = true;

        }
        else if(this.spriteSrc == IMG_WATER){
            this.gb.audio.playPickWater();
            player.reduceSalt(10);
        }
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