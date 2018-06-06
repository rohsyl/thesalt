
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

        this.grid = new Array(LEVEL_ROW_NB*3);

        this.menuWidth = this.blockSize*2;
        this.leftOffset = this.menuWidth + this.blockSize;
        this.menuBlocks = new Array(this.blockImgDefinitions.length);
        this.menuBlocks[0] = new ItemValue("e", this.blockImgDefinitions["e"], 0, 0);
        this.menuBlocks[1] = new ItemValue("f", this.blockImgDefinitions["f"], 0, 1 * this.menuWidth);
        this.menuBlocks[2] = new ItemValue("g", this.blockImgDefinitions["g"], 0, 2 * this.menuWidth);
        this.menuBlocks[3] = new ItemValue("o", this.blockImgDefinitions["o"], 0, 3 * this.menuWidth);
        this.menuBlocks[4] = new ItemValue("d", this.blockImgDefinitions["d"], 0, 4 * this.menuWidth);
        this.menuBlocks[5] = new ItemValue("p", this.blockImgDefinitions["p"], 0, 5 * this.menuWidth);
        this.menuBlocks[6] = new ItemValue("z", this.blockImgDefinitions["z"], 0, 6 * this.menuWidth);
        this.menuBlocks[7] = new ItemValue("r", this.blockImgDefinitions["r"], 0, 7 * this.menuWidth);
        this.menuBlocks[8] = new ItemValue("w", this.blockImgDefinitions["w"], 0, 8 * this.menuWidth);
        this.menuBlocks[9] = new ItemValue("1", this.blockImgDefinitions["1"], 0, 9 * this.menuWidth);
        this.menuBlocks[10] = new ItemValue("2", this.blockImgDefinitions["2"], 0, 10 * this.menuWidth);
        this.menuBlocks[11] = new ItemValue("_", this.blockImgDefinitions["_"], 0, 11 * this.menuWidth);

        this.menuBlocksValues = [0, this.menuWidth, this.menuWidth, this.menuWidth];

        this.__initGrid();

        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollShift = 30;

        this.mouseOverItem = new Array(this.menuBlocks.length);
        for (let i = 0; i < this.mouseOverItem.length; i++){
            this.mouseOverItem[i] = false;
        }
        this.selectedItem = 0;

        let self = this;
        this.mc = function (mouseEvent){self.__checkClick(mouseEvent)};
        this.mm = function (mouseEvent){self.__checkPos(mouseEvent)};
        this.mw = function (mouseEvent){self.__checkWheel(mouseEvent)};

        this.canvas.addEventListener("click", this.mc);
        this.canvas.addEventListener("mousemove", this.mm);

        this.canvas.addEventListener("mousewheel", this.mw);

        document.addEventListener("keydown", function(e){self.keyDownHandler(e)}, false);

    },

    update: function(){

    },

    draw: function() {
        // draw grid
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

        // draw menu background
        this.context.beginPath();
        this.context.fillRect(0, 0, this.menuWidth, this.canvas.height);
        this.context.fillStyle = '#FFF';
        this.context.stroke();
        this.context.closePath();


        // draw menu blocks
        for (let i = 0; i < this.menuBlocks.length; i++){
            this.context.drawImage(this.menuBlocks[i].getImage(), this.menuBlocksValues[0], i * this.menuBlocksValues[1], this.menuBlocksValues[2], this.menuBlocksValues[3]);
        }

        // draw red square on selelcted item
        this.context.beginPath();
        this.context.rect(this.menuBlocksValues[0]+1, this.selectedItem * this.menuBlocksValues[1]+1, this.menuBlocksValues[2]-2, this.menuBlocksValues[3]-2);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#F00';
        this.context.stroke();
        this.context.closePath();


    },


    // detect shift + S to save
    keyDownHandler: function(e) {
        if (e.shiftKey && e.keyCode === 83){

            let levelText = "";

            for (let y = 0; y < this.grid[0].length; y++) {
                for (let x = 0; x < this.grid.length; x++) {
                    levelText += this.grid[x][y].getChar();
                }
                levelText += "\n";
            }

            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            a.href = makeTextFile(levelText);
            a.download = 'level.sel';
            a.click();

            var levelFile = null;
            function makeTextFile(text) {
                let data = new Blob([text], {type: 'text/plain'});

                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (levelFile !== null) {
                    window.URL.revokeObjectURL(levelFile);
                }

                levelFile = window.URL.createObjectURL(data);

                return levelFile;
            }

        }
        if (e.shiftKey && e.keyCode === 65){
            let array = new Array(LEVEL_ROW_NB);

            this.grid.push(array);

            for (let i = 0; i < array.length; i++){
                this.__fillGrid(this.grid.length-1, i, "e");
            }
        }
    },

    // fill the defined grid with a value
    __fillGrid(x, y, value){
        // if (x > this.grid.length)
        //     for (let i = this.grid.length; i > x; i++)
        //         this.grid[i] = new Array(LEVEL_ROW_NB);

        this.grid[x][y] = new ItemValue(value, this.blockImgDefinitions[value], x * this.blockSize, y * this.blockSize);
    },

    //  initialize grid with empty value
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

        // check if mouse is over a menu block
        for (let i = 0; i < this.mouseOverItem.length; i++) {
            this.mouseOverItem[i] = this.mouseX > this.menuBlocksValues[0] && this.mouseX < this.menuBlocksValues[0] + this.menuBlocksValues[2]
            && this.mouseY > this.menuBlocksValues[1] * i && this.mouseY < this.menuBlocksValues[1] * i + this.menuBlocksValues[3];
        }

        this.mouseOverGrid = new Array(this.grid.length);
        for (let x = 0; x < this.mouseOverGrid.length; x++){
            this.mouseOverGrid[x] = new Array(this.grid[x].length);
            for (let y = 0; y < this.mouseOverGrid[x].length; y++) {
                this.mouseOverGrid[x][y] = false;
            }
        }

        // check if mouse is over a grid block
        for (let x = 0; x < this.mouseOverGrid.length; x++){
            for (let y = 0; y < this.mouseOverGrid[x].length; y++) {
                this.mouseOverGrid[x][y] = this.mouseX > this.grid[x][y].getX() + this.leftOffset && this.mouseX < this.grid[x][y].getX() + this.blockSize + this.leftOffset
                    && this.mouseY > this.grid[x][y].getY() && this.mouseY < this.grid[x][y].getY() + this.blockSize;
            }
        }
    },

    __checkClick: function(){

        // set current selected item
        for (let i = 0; i < this.mouseOverItem.length; i++) {
            if (this.mouseOverItem[i]) {
                this.selectedItem = i;
            }
        }

        for (let x = 0; x < this.mouseOverGrid.length; x++) {
            for (let y = 0; y < this.mouseOverGrid[x].length; y++) {
                if (this.mouseOverGrid[x][y]) {
                    this.__fillGrid(x, y, this.menuBlocks[this.selectedItem].getChar());
                }
            }
        }
    },

    __checkWheel: function (mouseEvent) {
        if (mouseEvent.wheelDelta / 120 > 0)
            this.leftOffset += this.scrollShift;
        else
            this.leftOffset -= this.scrollShift;
    },
};

function ItemValue(charDefinition, imgDefinition, xPos, yPos){
    this.charDefinition = charDefinition;
    this.imgDefinition = imgDefinition;
    this.x = xPos;
    this.y = yPos;

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
    },
    getX: function () {
        return this.x;
    },
    getY: function () {
        return this.y;
    }
};