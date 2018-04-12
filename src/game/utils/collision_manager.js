function CollisionManager(levelBuilder){
    this.levelBuilder = levelBuilder;
}
CollisionManager.prototype = {
    detectCollisions: function(){
        // TODO : detect collisions
        for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
            if(this.__isInCollision(this.levelBuilder.player, this.levelBuilder.collidableBlocks[i])){
                //console.log("ok");
            }
        }
    },

    __isInCollision: function(player, block){
        //console.log(player, block);
        // collision from left
        /*if(player.x + player.w > block.x - this.levelBuilder.shiftX){
            console.log('collision left');
        }
        // collision from right
        if(player.x < block.x + block.w - this.levelBuilder.shiftX){
            console.log('collision right');
        }*/
        // collision from top
        if(player.y + player.realH / 2 > block.y && player.y < block.y + block.h ){
            console.log(player.y, block.y);
            console.log('collision top');
        }
        // collision from bottom
        /*if(player.y < block.y + block.h){
            console.log('collision bottom');
        }*/
        return true;
    }
};