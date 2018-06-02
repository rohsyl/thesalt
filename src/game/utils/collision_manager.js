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
        for (e in this.levelBuilder.enemies) {
            blocksInCollision = [];
            for(let i = 0; i < this.levelBuilder.collidableBlocks.length; i++){
                if(this.__isCollide(this.levelBuilder.enemies[e], this.levelBuilder.collidableBlocks[i])){
                    blocksInCollision.push(this.levelBuilder.collidableBlocks[i]);
                }
            }
            this.__triggerCollision(this.levelBuilder.enemies[e], blocksInCollision);
        }

        // collision player vs enemy
        blocksInCollision = [];
        enemyIndex = 0;
        for (e in this.levelBuilder.enemies) {
            if(this.__charCollide(this.levelBuilder.player, this.levelBuilder.enemies[e])){
                blocksInCollision.push(this.levelBuilder.enemies[e]);
                enemyIndex = e;
            }
        }
        this.__triggerCollision(this.levelBuilder.player, blocksInCollision);

        // collision player vs item
        for (e in this.levelBuilder.itemsBlock) {
            blocksInCollision = [];
            for(let i = 0; i < this.levelBuilder.itemsBlock.length; i++){
                if(this.__isCollide(this.levelBuilder.player, this.levelBuilder.itemsBlock[i])){
                    blocksInCollision.push(this.levelBuilder.itemsBlock[i]);
                    console.log("collision player vs item")
                }
            }
            this.__triggerCollision(this.levelBuilder.itemsBlock[e], blocksInCollision);
        }
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

            if(blocks[k].getType() === BLOCK_TYPE_ENEMY && player.getType() === BLOCK_TYPE_PLAYER) {
                if(!blocks[k].dead){
                    if (this.__charTopCollide(this.levelBuilder.player, blocks[k])) {
                        this.levelBuilder.player.kill();
                        this.levelBuilder.enemies[enemyIndex].die();
                    }
                    else
                        this.levelBuilder.player.die();
                }
            }

            if(blocks[k] instanceof CollidableBlock){
                blocks[k].onCollision(player);
            }

            if(blocks[k] instanceof ItemBlock) {
                if(!blocks[k].picked)
                    this.levelBuilder.player.pick(blocks[k]);
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
    },

    __charTopCollide: function(player, npc){
        let fromTop = player.getCenterY() + player.boxBottom > npc.getCenterY() - npc.boxTop;  // the player is hiting the top of npc
        return fromTop;
    }
};