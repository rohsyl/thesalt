/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function LevelScene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
LevelScene.prototype = {

    init: function(){
        let lvlLoader = new LevelLoader();
        let level = lvlLoader.loadLevel("level1");
        this.levelBuilder = new LevelBuilder(this, level);
        this.levelBuilder.init();
        this.collisionManager = new CollisionManager(this.levelBuilder);
    },

    draw: function(){
        this.collisionManager.detectCollisions();
        this.levelBuilder.draw();
    }
};
