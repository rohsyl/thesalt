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
        this.__triggerCollision(this.levelBuilder.player, blocksInCollision, true);

        // collision enemy vs collidable block
        for (e in this.levelBuilder.enemies) {
            blocksInCollision = [];
            for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
                if(this.__isCollide(this.levelBuilder.enemies[e], this.levelBuilder.collidableBlocks[i])){
                    //console.log('is collision ',  this.levelBuilder.enemies[e], this.levelBuilder.collidableBlocks[i]);
                    blocksInCollision.push(this.levelBuilder.collidableBlocks[i]);
                }
            }
            this.__triggerCollision(this.levelBuilder.enemies[e], blocksInCollision, true);
        }

        // collision player vs enemy
        blocksInCollision = [];
        for (e in this.levelBuilder.enemies) {
            if(!this.levelBuilder.enemies[e].dead){
                if(this.__charCollide(this.levelBuilder.player, this.levelBuilder.enemies[e])){
                    blocksInCollision.push(this.levelBuilder.enemies[e]);
                }
            }
        }
        this.__triggerCollision(this.levelBuilder.player, blocksInCollision);

        // collision player vs item
        blocksInCollision = [];
        for(let i = 0; i < this.levelBuilder.itemsBlock.length; i++){
            if(!this.levelBuilder.itemsBlock[i].picked){
                if(this.__isCollide(this.levelBuilder.player, this.levelBuilder.itemsBlock[i])){
                    blocksInCollision.push(this.levelBuilder.itemsBlock[i]);
                }
            }
        }
        this.__triggerCollision(this.levelBuilder.player, blocksInCollision);

    },

    /**
     * This method detect if the given player is in collision with the given block
     * if a collision is detected, call the collision listener
     * @param player Player The player
     * @param blocks [] The block
     * @param mustBeCollidableBlock boolean (optional) true if the blocks must contain collidable block
     * @private
     */
    __triggerCollision: function(player, blocks, mustBeCollidableBlock){
        if(typeof mustBeCollidableBlock === 'undefined'){
            mustBeCollidableBlock = false;
        }
        player.onCollision(blocks, mustBeCollidableBlock);
        for(let i in blocks){
            if(blocks[i] instanceof EndPoint){
                let end = blocks[i];
                end.onCollision(player);
            }
        }
    },

    __isCollide: function(player, block){
        let fromTop = player.getCenterY() + player.boxBottom > block.getY();  // the player is hiting the top of something
        let fromBottom = player.getCenterY() - player.boxTop < block.getY() + block.h; // the player is hiting the bottom of something
        let fromLeft = player.getCenterX() + player.boxRight > block.getX(); // the player is hiting the left of something
        let fromRight = player.getCenterX() - player.boxLeft < block.getX() + block.w; // the player is hiting the right of something

        return fromTop && fromBottom && fromLeft && fromRight;
    },

    __charCollide: function(player, npc){
        let fromTop = player.getCenterY() + player.boxBottom > npc.getCenterY() - npc.boxTop;  // the player is hiting the top of npc
        let fromBottom = player.getCenterY() - player.boxTop < npc.getCenterY() + npc.boxBottom; // the player is hiting the bottom of npc
        let fromLeft = player.getCenterX() + player.boxRight > npc.getCenterX() - npc.boxLeft; // the player is hiting the left of npc
        let fromRight = player.getCenterX() - player.boxLeft < npc.getCenterX() + npc.boxRight; // the player is hiting the right of npc

        return fromTop && fromBottom && fromLeft && fromRight;
    }
};