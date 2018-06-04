
function LevelScene(gb, levelInstance) {
    this.gb = gb;
    this.playerSelected = gb.getSelectedCharacter();
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
    this.levelInstance = levelInstance;
}
LevelScene.prototype = {

    init: function(){
        let lvlLoader = new LevelLoader();
        let level = lvlLoader.loadLevel(this.levelInstance.getLevelName());
        let backgrounds = this.levelInstance.getLevelBackgrounds();
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
