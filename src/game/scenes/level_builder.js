
function LevelBuilder(gb, mainScene) {
    this.gb = gb;
    if (typeof mainScene == 'undefined')
        this.mainScene = new MainScene(this.gb);
    else
        this.mainScene = mainScene;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}

LevelBuilder.prototype = {
    init: function(){


        this.blockImgDefinitions = {
            e: undefined,
            f: IMG_FLOOR_CAVE_1,
            d: IMG_FLOOR_DIRT,
            g: IMG_FLOOR_CAVE_2,
            o: IMG_FLOOR_GRASS,
            p: IMG_PLAYER_F_STOP[0],
            z: IMG_PIZZA,
            r: IMG_RJ45,
            w: IMG_WATER,
            1: IMG_ENEMY_1_F_STOP,
            2: IMG_ENEMY_2_F_STOP,
            _: IMG_END
        };

        this.blockSize = this.canvas.height / LEVEL_ROW_NB;

        this.grid = new Array(LEVEL_ROW_NB);

        this.menuWidth = this.blockSize*2;
        this.leftOffset = this.menuWidth + this.blockSize;
        this.menuBlocks = new Array(this.blockImgDefinitions.length);
        this.menuBlocks[0] = new ItemValue("e", this.blockImgDefinitions["e"]);
        this.menuBlocks[1] = new ItemValue("f", this.blockImgDefinitions["f"]);
        this.menuBlocks[2] = new ItemValue("d", this.blockImgDefinitions["d"]);
        this.menuBlocks[3] = new ItemValue("g", this.blockImgDefinitions["g"]);
        this.menuBlocks[4] = new ItemValue("o", this.blockImgDefinitions["o"]);
        this.menuBlocks[5] = new ItemValue("p", this.blockImgDefinitions["p"]);
        this.menuBlocks[6] = new ItemValue("z", this.blockImgDefinitions["z"]);
        this.menuBlocks[7] = new ItemValue("r", this.blockImgDefinitions["r"]);
        this.menuBlocks[8] = new ItemValue("w", this.blockImgDefinitions["w"]);
        this.menuBlocks[9] = new ItemValue("1", this.blockImgDefinitions["1"]);
        this.menuBlocks[10] = new ItemValue("2", this.blockImgDefinitions["2"]);
        this.menuBlocks[11] = new ItemValue("_", this.blockImgDefinitions["_"]);

        this.menuBlocksValues = [0, this.menuWidth, this.menuWidth, this.menuWidth];

        this.__initGrid();

        this.mouseX = 0;
        this.mouseY = 0;

        this.mouseOverItem = new Array(this.menuBlocks.length);
        for (let i = 0; i < this.mouseOverItem.length; i++){
            this.mouseOverItem[i] = false;
        }
        this.selectedItem = -1;

        let self = this;
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.canvas.addEventListener("click", this.mc);
        this.canvas.addEventListener("mousemove", this.mm);

    },

    update: function(){

    },

    draw: function() {

        for (let i = 0; i < this.menuBlocks.length; i++){
            this.context.drawImage(this.menuBlocks[i].getImage(), this.menuBlocksValues[0], i * this.menuBlocksValues[1], this.menuBlocksValues[2], this.menuBlocksValues[3]);
        }
        if(this.selectedItem != -1) {
            this.context.beginPath();
            this.context.rect(this.menuBlocksValues[0]+1, this.selectedItem * this.menuBlocksValues[1]+1, this.menuBlocksValues[2]-2, this.menuBlocksValues[3]-2);
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#F00';
            this.context.stroke();
            this.context.closePath();
        }


        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {

                this.context.beginPath();
                this.context.rect(this.leftOffset + x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
                this.context.lineWidth = 1;
                this.context.strokeStyle = '#000000';
                this.context.stroke();
                this.context.closePath();

                if (typeof this.grid[x][y].getImage() !== undefined) {
                    this.context.drawImage(this.grid[x][y].getImage(), this.leftOffset + x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }

    },

    __fillGrid(x, y, value){
        // if (x > this.grid.length)
        //     for (let i = this.grid.length; i > x; i++)
        //         this.grid[i] = new Array(LEVEL_ROW_NB);

        this.grid[x][y] = new ItemValue(value, this.blockImgDefinitions[value]);
    },

    __initGrid(){
        for (let x = 0; x < this.grid.length; x++) {
                this.grid[x] = new Array(LEVEL_ROW_NB);
        }
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                this.__fillGrid(x, y, "e");
            }
        }
    },

    __checkPos: function(mouseEvent){
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = mouseEvent.clientX - rect.left;
        this.mouseY = mouseEvent.clientY - rect.top;

        for (let i = 0; i < this.mouseOverItem.length; i++) {
            this.mouseOverItem[i] = this.mouseX > this.menuBlocksValues[0] && this.mouseX < this.menuBlocksValues[0] + this.menuBlocksValues[2]
            && this.mouseY > this.menuBlocksValues[1] * i && this.mouseY < this.menuBlocksValues[1] * i + this.menuBlocksValues[3];
        }
    },

    __checkClick: function(){
        for (let i = 0; i < this.mouseOverItem.length; i++) {
            if (this.mouseOverItem[i]) {
                this.selectedItem = i;
            }
        }
    },
};

function ItemValue(charDefinition, imgDefinition){
    this.charDefinition = charDefinition;
    this.imgDefinition = imgDefinition;

    this.image = new Image();
    if (this.getChar() != "e")
        this.image.src = this.getSource();
}
ItemValue.prototype = {
    getChar: function () {
        return this.charDefinition
    },
    getSource: function () {
        return this.imgDefinition;
    },
    getImage: function () {
        return this.image;
    }
};