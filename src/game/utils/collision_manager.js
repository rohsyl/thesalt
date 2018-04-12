function CollisionManager(levelBuilder){
    this.levelBuilder = levelBuilder;
}
CollisionManager.prototype = {
    detectCollisions: function(){
        // collision player vs collidable block
        for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
            this.__isInCollision(this.levelBuilder.player, this.levelBuilder.collidableBlocks[i]);
        }

        // collision player vs enemy
        // TODO

        //collision player vs bullet
        // TODO
    },

    __isInCollision: function(player, block){
        let fromTop = player.getCenterY() + player.boxBottom > block.y;  // the player is hiting the top of something
        let fromBottom = player.getCenterY() - player.boxTop < block.y + block.h; // the player is hiting the bottom of something
        let fromLeft = player.getCenterX() + player.boxRight > block.x; // the player is hiting the left of something
        let fromRight = player.getCenterX() - player.boxLeft < block.x + block.w; // the player is hiting the right of something
        if (fromTop && fromBottom && fromLeft && fromRight) {
            if(block instanceof CollidableBlock){
                block.onCollision(player);
            }
            player.onCollision(block);
        }
    }
};