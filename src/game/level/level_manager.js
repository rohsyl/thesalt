const LEVEL_ROW_NB = 24;
function LevelManager(scene, levelString, playerSelected){
    this.scene = scene;
    this.playerSelected = playerSelected;
    this.gb = this.scene.gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
    this.levelString = levelString;
    this.shiftX = 0;

    this.sprites = [];

    // this variable contain a ref to the player
    this.player = undefined;

    // array of ref to all enemies
    this.enemies = [];

    // array of ref to all solid block
    this.collidableBlocks = [];


    this.blockSize = 0;

    let self = this;
    this.blockDefinitions = {
        e: function(i, j){
            return undefined;
        },
        f: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), 'background/floor_cave_1'));
        },
        g: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), 'background/floor_cave_2'));
        },
        o: function(i, j){
            return self.__refBlock(new CollidableBlock(self.gb, self.__calcX(j), self.__calcY(i), self.__getBlockSize(), 'background/floor_outside'));
        },
        p: function(i, j){
            return self.__refBlock(new Player(self.scene, self.__calcX(j), self.__calcY(i), self.playerSelected, self.__getBlockSize()));
        },
    }
}
LevelManager.prototype = {
    init: function(){
        console.log('builder : init start');

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
                console.log(blockString);
                if(typeof blockString !== "undefined")
                    row.push(this.__instanceBlock(blockString, i, j));
            }
            this.sprites.push(row);
        }

        console.log(this.sprites);


        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined")
                    this.sprites[i][j].init();
            }
        }
        console.log('builder : init done');

        //make the level move automaticallys
        /*let self = this;
        setInterval(function(){
            self.shiftX++;
        }, 20);*/
    },

    draw: function(){
        this.blockSize = this.canvas.height / LEVEL_ROW_NB;

        for(let i = 0; i < this.sprites.length; i++){
            for(let j = 0; j < this.sprites[i].length; j++){
                if(typeof this.sprites[i][j] !== "undefined")
                    this.sprites[i][j].draw(this.shiftX);
            }
        }
    },

    __isInViewport: function(block){
        let h = this.canvas.height;
        let w = this.canvas.width;
        // if the block is in the viewport - shiftX then draw it, else no
        if(block.x){

        }
        return false;
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
            case BLOCK_TYPE_BLOCK:
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