
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
        this.levelManager = new LevelManager(this, level, this.playerSelected);
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
