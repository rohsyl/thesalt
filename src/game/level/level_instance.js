function LevelInstance(name, backgrounds){
    this.name = name;
    this.backgrounds = backgrounds;
}
LevelInstance.prototype = {
    getLevelName: function(){
        return this.name;
    },

    getLevelBackgrounds: function(){
        return this.backgrounds;
    }
};