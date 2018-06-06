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
const IMG_ITEMS_PATH = SPRITES_PATH + "items/";

const IMG_FLOOR_CAVE_1 = IMG_BLOCKS_PATH + "floor_cave_1.png";
const IMG_FLOOR_CAVE_2 = IMG_BLOCKS_PATH + "floor_cave_2.png";
const IMG_FLOOR_GRASS = IMG_BLOCKS_PATH + "floor_grass.png";
const IMG_FLOOR_DIRT = IMG_BLOCKS_PATH + "floor_dirt.png";
const IMG_PIZZA = IMG_ITEMS_PATH +  "pizza.png";
const IMG_RJ45 = IMG_ITEMS_PATH +  "rj45.png";
const IMG_WATER = IMG_ITEMS_PATH +  "water_bottle.png";
const IMG_SALT = IMG_ITEMS_PATH +  "salt.png";
const IMG_END = IMG_ITEMS_PATH +  "endpoint.png";

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

    this.scoreDisplay = undefined;

    // array of ref to all enemies
    this.enemies = [];

    // array of ref to all solid block
    this.collidableBlocks = [];

    // array of ref to all itemsBlock
    this.itemsBlock = [];

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
        d: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_DIRT));
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
        z: function(i, j) {
            return self.__refBlock(new ItemBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_PIZZA, 100));
        },
        r: function(i, j) {
            return self.__refBlock(new ItemBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_RJ45, 50));
        },
        w: function(i, j) {
            return self.__refBlock(new ItemBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_WATER, 25));
        },
        1: function(i, j){
            return self.__refBlock(new EnemyWalk(self.scene, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_CAVE_1));
        },
        2: function(i, j){
            return self.__refBlock(new EnemyJump(self.scene, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_FLOOR_CAVE_1));
        },
        // 3: function(i, j){
        //     return self.__refBlock(new EnemyFire(self.scene, self.__calcX(j), self.__calcY(i), self.__getBlockSize()));
        // },
        _: function(i, j) {
            return self.__refBlock(new EndPoint(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), IMG_END, 200));
        }
    }
}
LevelManager.prototype = {
    /**
     * Init method
     */
    init: function(){
        // console.log('builder : init start');

        // instance all background
        for(let i = 0; i < this.backgroundPaths.length; i++){
            this.backgrounds.push(new Background(this.backgroundPaths[i], this.scene, i * BACKGROUND_WIDTH, 0));
        }
        // init all background
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
        // console.log("canvas height", this.canvas.height);
        // console.log("window height", window.innerHeight);
        // console.log("blocksize", this.blockSize);

        this.scoreDisplay = new ScoreDisplay(this.gb, 10, 10, this.blockSize);

        let nbRow = levelBlock.length > LEVEL_ROW_NB ? LEVEL_ROW_NB : levelBlock.length;
        for(let i = 0; i < nbRow; i++){
            let row = [];
            for(let j = 0; j < levelBlock[i].length; j++){
                let blockString = levelBlock[i][j];
                //console.log(blockString);
                if(typeof blockString !== "undefined"){
                    let block = this.__instanceBlock(blockString, i, j);
                    if(block instanceof Player || block instanceof EnemyWalk){//|| block instanceof EnemyJump || block instanceof EnemyFire){
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
        // console.log(this.sprites);
        // console.log("levelTotalWidth", this.levelTotalWidth);


        // init all blocks
        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined")
                    this.sprites[i][j].init();
            }
        }

        // init player
        this.player.init();

        // init enemies
        for (e in this.enemies){
            this.enemies[e].init();
        }

        //make the level move automaticallys
        /*let self = this;
        setInterval(function(){
            self.shiftX++;
        }, 20);*/
    },

    /**
     * Update method
     */
    update: function(){
        // calculate block size
        this.blockSize = this.canvas.height / LEVEL_ROW_NB;

        // update backgrounds
        for(let i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].update(this.shiftX);
        }

        // update player
        this.player.update(this.shiftX);

        // update enemies
        for (e in this.enemies) {
            this.enemies[e].update(this.shiftX);
        }

        // update blocks
        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined"){
                    //if(this.__isInViewport(this.sprites[i][j]))
                        this.sprites[i][j].update(this.shiftX);
                }
            }
        }

    },

    /**
     * Draw method
     */
    draw: function(){

        // calculate block size
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


        // draw player score
        this.scoreDisplay.draw();

        // shift the background alongside the player position
        let cw = this.canvas.width;

        // move to the right
        if(this.player.x > cw * 1 / 2 + this.blockSize * 2 && this.gb.keyRightPressed){
            if(this.shiftX < this.levelTotalWidth){
                this.shiftX += this.getShiftStep();
                this.player.x -= this.player.speed;
            }
        }
        // move to the left
        else if(this.player.x < cw * 1 / 2 - this.blockSize * 2 && this.gb.keyLeftPressed){
            if(this.shiftX > 0){
                this.shiftX -= this.getShiftStep();
                this.player.x += this.player.speed;
            }
        }
    },

    /**
     * Get the step at which the background must move at each frame
     * @returns {*|number} The shift step
     */
    getShiftStep: function(){
        return this.player.speed;
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
        else if(block instanceof ItemBlock){
            return (block.x - this.shiftX + block.w > 0) && block.x - this.shiftX < this.canvas.width;
        }
        else{
            return true;
        }
    },

    /**
     * Create a new instance of a block by the given blockString
     * @param blockString string The name of the block
     * @param i int Horizontal position
     * @param j int Vertical position
     * @returns {*} A block
     * @private
     */
    __instanceBlock: function(blockString, i, j){
        if(!this.blockDefinitions.hasOwnProperty(blockString)){
            // console.log('block type unknown, undefined returned...');
            return undefined;
        }
        let constructor = this.blockDefinitions[blockString];
        return constructor(i, j);
        //return undefined;
    },

    /**
     * Set the reference to the given block
     * @param block * The block
     * @returns {*} The block
     * @private
     */
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
            case BLOCK_TYPE_ITEMS:
                this.itemsBlock.push(block);
                break;
        }
        return block;
    },

    /**
     * Get the block size
     * @returns {number|*} The block size
     * @private
     */
    __getBlockSize: function(){
        return this.blockSize;
    },

    /**
     * Calculate the x position by the given index
     * @param j int The index
     * @returns {number} The x position
     * @private
     */
    __calcX: function(j){
        return j * this.blockSize;
    },

    /**
     * Calculate the y position by the given index
     * @param i int The index
     * @returns {number} The y position
     * @private
     */
    __calcY: function(i){
        return i * this.blockSize;
    }

};