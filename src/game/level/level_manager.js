/**
 * Number of row in a level
 * @type {number}
 */
const LEVEL_ROW_NB = 24;

/**
 * Width of a background image
 * @type {number}
 */
const BACKGROUND_WIDTH = 1920;

/**
 * Height of a background image
 * @type {number}
 */
const BACKGROUND_HEIGHT = 1080;

/**
 * Scrolling speed of the level
 * @type {number}
 */
const SHIFT_STEP = 5;

const IMG_BLOCKS_PATH = SPRITES_PATH + "blocks/";

const IMG_FLOOR_CAVE_1 = IMG_BLOCKS_PATH + "floor_cave_1.png";
const IMG_FLOOR_CAVE_2 = IMG_BLOCKS_PATH + "floor_cave_2.png";
const IMG_FLOOR_GRASS = IMG_BLOCKS_PATH + "floor_grass.png";

/**
 * LevelManager constructor
 * @param scene The scene this level manager belongs to
 * @param levelString The levelString
 * @param playerSelected The player to use
 * @param backgroundPaths (optional) array of image path that will be displayed as background
 * @constructor
 */
function LevelManager(scene, levelString, playerSelected, backgroundPaths){
    this.scene = scene;
    this.playerSelected = playerSelected;
    this.gb = this.scene.gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
    this.levelString = levelString;
    this.levelTotalWidth = 0;
    this.shiftX = 0;

    this.backgrounds = [];
    this.backgroundPaths = [];
    if(typeof  backgroundPaths !== 'undefined'){
        this.backgroundPaths = backgroundPaths;
    }

    // all sprites
    this.sprites = [];

    // this variable contain a ref to the player
    this.player = undefined;

    // array of ref to all enemies
    this.enemies = [];

    // array of ref to all solid block
    this.collidableBlocks = [];


    this.blockSize = 0;

    let self = this;
    /**
     * Definition of each possible blocks
     * @type {{e: LevelManager.blockDefinitions.e, f: LevelManager.blockDefinitions.f, g: LevelManager.blockDefinitions.g, o: LevelManager.blockDefinitions.o, p: LevelManager.blockDefinitions.p}}
     */
    this.blockDefinitions = {
        e: function(i, j){
            return undefined;
        },
        f: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_CAVE_1));
        },
        g: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_CAVE_2));
        },
        o: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_GRASS));
        },
        p: function(i, j){
            return self.__refBlock(new Player(self.scene, self.__calcX(j), self.__calcY(i), self.playerSelected, self.__getBlockSize()));
        },
        1: function(i, j){
            return self.__refBlock(new EnemyWalk(self.scene, self.__calcX(j), self.__calcY(i), self.__getBlockSize()));
        },
        // 2: function(i, j){
        //     return self.__refBlock(new EnemyJump(self.scene, self.__calcX(j), self.__calcY(i)));
        // },
        // 3: function(i, j){
        //     return self.__refBlock(new EnemyFire(self.scene, self.__calcX(j), self.__calcY(i)));
        // },
    }
}
LevelManager.prototype = {
    init: function(){
        console.log('builder : init start');

        for(let i = 0; i < this.backgroundPaths.length; i++){
            this.backgrounds.push(new Background(this.backgroundPaths[i], this.scene, i * BACKGROUND_WIDTH, 0));
        }
        for(let i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].init();
        }

        // parse level string to array
        let levelLines = this.levelString.split('\n');
        let levelBlock = [];

        for(let i = 0; i < levelLines.length; i++){
            levelBlock.push(levelLines[i].split(''));
        }

        this.sprites = [];
        // ignore if nb rows of the level is more that LEVEL_ROW_NB
        this.blockSize = this.canvas.height / LEVEL_ROW_NB;
        console.log("canvas height", this.canvas.height);
        console.log("window height", window.innerHeight);
        console.log("blocksize", this.blockSize);
        let nbRow = levelBlock.length > LEVEL_ROW_NB ? LEVEL_ROW_NB : levelBlock.length;
        for(let i = 0; i < nbRow; i++){
            let row = [];
            for(let j = 0; j < levelBlock[i].length; j++){
                let blockString = levelBlock[i][j];
                //console.log(blockString);
                if(typeof blockString !== "undefined"){
                    let block = this.__instanceBlock(blockString, i, j);
                    if(block instanceof Player || block instanceof EnemyWalk ){//|| block instanceof EnemyJump || block instanceof EnemyFire){
                        row.push(undefined);
                    }
                    else{
                        row.push(block);
                    }
                }
            }
            this.sprites.push(row);
        }
        this.levelTotalWidth  = (this.sprites[0].length - 1) * this.blockSize - this.canvas.width;
        console.log(this.sprites);
        console.log("levelTotalWidth", this.levelTotalWidth);


        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined")
                    this.sprites[i][j].init();
            }
        }

        this.player.init();

        for (e in this.enemies){
            this.enemies[e].init();
        }

        console.log('builder : init done');

        //make the level move automaticallys
        /*let self = this;
        setInterval(function(){
            self.shiftX++;
        }, 20);*/
    },

    update: function(){
        this.blockSize = this.canvas.height / LEVEL_ROW_NB;

        for(let i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].update(this.shiftX);
        }

        this.player.update(this.shiftX);
        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined"){
                    if(this.__isInViewport(this.sprites[i][j]))
                        this.sprites[i][j].update(this.shiftX);
                }
            }
        }


    },


    draw: function(){

        this.blockSize = this.canvas.height / LEVEL_ROW_NB;

        // draw background
        for(let i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].draw();
        }


        // draw player
        this.player.draw();

        // draw enemies
        for (e in this.enemies){
            this.enemies[e].draw();
        }

        // draw world
        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined"){
                    if(this.__isInViewport(this.sprites[i][j]))
                            this.sprites[i][j].draw();
                }
            }
        }


        // shift the background alongside the player position
        let cw = this.canvas.width,
            ch = this.canvas.height;

        if(this.player.x > cw * 1 / 2 + this.blockSize * 2 && this.gb.keyRightPressed){
            if(this.shiftX < this.levelTotalWidth){
                this.shiftX += SHIFT_STEP;
                this.player.x -= this.player.speed;
            }
        }
        else if(this.player.x < cw * 1 / 2 - this.blockSize * 2 && this.gb.keyLeftPressed){
            if(this.shiftX > 0){
                this.shiftX -= SHIFT_STEP;
                this.player.x += this.player.speed;
            }
        }
    },

    /**
     * This method return true if the given block is in the viewport
     * @param block Block|CollidableBlock|Player The block
     * @returns {boolean} True if in viewport, else false
     * @private
     */
    __isInViewport: function(block){
        if(block instanceof Block){
            return (block.x - this.shiftX + block.w > 0) && block.x - this.shiftX < this.canvas.width;
        }
        else if(block instanceof CollidableBlock){
            return (block.x - this.shiftX + block.w > 0) && block.x - this.shiftX < this.canvas.width;
        }
        else{
            return true;
        }
    },

    __instanceBlock: function(blockString, i, j){
        if(!this.blockDefinitions.hasOwnProperty(blockString)){
            console.log('block type unknown, undefined returned...');
            return undefined;
        }
        let constructor = this.blockDefinitions[blockString];
        return constructor(i, j);
        //return undefined;
    },

    __refBlock: function(block){
        switch(block.getType()){
            case BLOCK_TYPE_PLAYER:
                this.player = block;
                break;
            case BLOCK_TYPE_COLLIDABLE_BLOCK:
                this.collidableBlocks.push(block);
                break;
            case BLOCK_TYPE_ENEMY:
                this.enemies.push(block);
                break;
        }
        return block;
    },

    __getBlockSize: function(){
        return this.blockSize;
    },

    __calcX: function(j){
        return j * this.blockSize;
    },

    __calcY: function(i){
        return i * this.blockSize;
    }

};