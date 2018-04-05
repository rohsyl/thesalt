const LEVEL_ROW_NB = 16;
function LevelBuilder(scene, levelString){
    this.scene = scene;
    this.gb = this.scene.gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
    this.levelString = levelString;
    this.blocks = [];

    this.blockSize = 0;

    let self = this;
    this.blockDefinitions = {
        e: function(i, j){ return undefined; },
        f: function(i, j){ return new Block(self.gb, self.__calcX(i), self.__calcY(j), self.__getBlockSize(), 'background/floor_cave_1'); },
        g: function(i, j){ return new Block(self.gb, self.__calcX(i), self.__calcY(j), self.__getBlockSize(), 'background/floor_cave_2'); },
        o: function(i, j){ return new Block(self.gb, self.__calcX(i), self.__calcY(j), self.__getBlockSize(), 'background/floor_outside'); },
        p: function(i, j){ return new Player(self.scene, self.__calcX(i), self.__calcY(j)); },
    }
}
LevelBuilder.prototype = {
    init: function(){

        let levelLines = this.levelString.split('\n');
        let levelBlock = [];

        for(let i = 0; i < levelLines.length; i++){
            levelBlock.push(levelLines[i].split(''));
        }

        this.blocks = [];

        // ignore if nb rows of the level is more that LEVEL_ROW_NB
        let nbRow = levelBlock.length > LEVEL_ROW_NB ? LEVEL_ROW_NB : levelBlock.length;
        for(let i = 0; i < nbRow; i++){
            let row = [];
            for(let j = 0; i < levelBlock[i].length; j++){
                row.push(this.__instanceBlock(levelBlock[i][j], i, j));
            }
            this.blocks.push(row);
        }

        this.blockSize = this.canvas.height / LEVEL_ROW_NB;
    },

    draw: function(){
        this.blockSize = this.canvas.height / LEVEL_ROW_NB;
        for(let i = 0; i < this.blocks.length; i++){
            for(let j = 0; i < this.blocks[i].length; j++){
                if(typeof this.blocks[i][j] !== "undefined")
                    this.blocks[i][j].draw();
            }
        }
    },

    __instanceBlock: function(blockString, i, j){
        return this.blockDefinitions[blockString](i, j);
    },

    __getBlockSize: function(){
        return this.blockSize;
    },

    __calcX: function(i){
        return i * this.blockSize;
    },

    __calcY: function(j){
        return j * this.blockSize;
    }
};