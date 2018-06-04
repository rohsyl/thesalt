function EndPoint(gb, x, y, size, spriteName, scorePoint){
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;

    this.spriteSrc = spriteName;

    this.picked = false;

    this.w = size*2;
    this.h = size*2;
    this.x = x;
    this.y = y;

    this.shiftX = undefined;
    //console.log(spriteName, x, y, size);

    this.scorePoint = scorePoint;
}
EndPoint.prototype = {

    init: function(){

        this.image = new Image();
        this.image.src = this.spriteSrc;
    },

    update: function(shiftX){
        this.shiftX = shiftX;
    },

    draw: function(){
        if(!this.picked)
            this.context.drawImage(this.image, this.getX(), this.getY() - this.h/2, this.w, this.h);
    },

    /**
     * Called when endpoint touched by the player
     * @param player Reference to the player
     */
    onCollision: function(player){
        this.gb.score += this.scorePoint;
        this.gb.score += Math.round(this.gb.score * (100 - player.saltLevel) / 100);
        this.gb.initLevel(++this.gb.currentLevelIndex);
    },

    pick: function(){
        this.picked = true;
    },

    getType: function(){
        return BLOCK_TYPE_ITEMS;
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