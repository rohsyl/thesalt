/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

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

    draw: function(){
        this.collisionManager.detectCollisions();
        this.levelManager.draw();
    }
};
