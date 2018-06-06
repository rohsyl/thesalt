function LevelInstance(name, backgrounds, audio){
    this.name = name;
    this.backgrounds = backgrounds;
    this.audio = AUDIOS_PATH + audio + '.mp3';
}
LevelInstance.prototype = {
    getLevelName: function(){
        return this.name;
    },

    getLevelBackgrounds: function(){
        return this.backgrounds;
    },

    getAudio: function(){
        return this.audio;
    }
};