function CollisionManager(levelBuilder){
    this.levelBuilder = levelBuilder;
}
CollisionManager.prototype = {

    /**
     * Detect all possible collisions
     */
    detectCollisions: function(){
        // collision player vs collidable block
        let blocksInCollision = [];
        for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
            if(this.__isCollide(this.levelBuilder.player, this.levelBuilder.collidableBlocks[i])){
                blocksInCollision.push(this.levelBuilder.collidableBlocks[i]);
            }
        }
        this.__triggerCollision(this.levelBuilder.player, blocksInCollision);

        // collision enemy vs collidable block
        blocksInCollision = [];
        for (e in this.levelBuilder.enemies) {
            for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
                if(this.__isCollide(this.levelBuilder.enemies[e], this.levelBuilder.collidableBlocks[i])){
                    blocksInCollision.push(this.levelBuilder.collidableBlocks[i]);
                }
            }
            this.__triggerCollision(this.levelBuilder.enemies[e], blocksInCollision);
        }

        // collision player vs enemy
        // TODO

        // collision player vs bullet
        // TODO
    },

    /**
     * This method detect if the given player is in collision with the given block
     * if a collision is detected, call the collision listener
     * @param player Player The player
     * @param blocks [] The block
     * @private
     */
    __triggerCollision: function(player, blocks){
        player.onCollision(blocks);
        for(let k in blocks){
            if(blocks[k] instanceof CollidableBlock){
                blocks[k].onCollision(player);
            }
        }
    },

    __isCollide: function(player, block){
        let fromTop = player.getCenterY() + player.boxBottom > block.getY();  // the player is hiting the top of something
        let fromBottom = player.getCenterY() - player.boxTop < block.getY() + block.h; // the player is hiting the bottom of something
        let fromLeft = player.getCenterX() + player.boxRight > block.getX(); // the player is hiting the left of something
        let fromRight = player.getCenterX() - player.boxLeft < block.getX() + block.w; // the player is hiting the right of something

        return fromTop && fromBottom && fromLeft && fromRight;
    }
};