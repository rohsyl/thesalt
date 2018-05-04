
function LevelScene(gb, charSelected) {
    this.gb = gb;
    this.playerSelected = charSelected;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
LevelScene.prototype = {

    init: function(){
        let lvlLoader = new LevelLoader();
        let level = lvlLoader.loadLevel("level2");
        let backgrounds = [
            SPRITES_PATH + "background/level1/background1.jpg",
            SPRITES_PATH + "background/level1/background2.jpg"
        ];
        this.levelManager = new LevelManager(this, level, this.playerSelected, backgrounds);
        this.levelManager.init();
        this.collisionManager = new CollisionManager(this.levelManager);
    },

    update: function(){
        this.levelManager.update();
        this.collisionManager.detectCollisions();
    },

    draw: function(){
        this.levelManager.draw();
    }
};
