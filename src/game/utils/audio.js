function Audio(){
    this.SOUND_GAMEOVER_URL = AUDIOS_PATH + 'game_over.mp3';
    this.SOUND_VICTORY_URL = AUDIOS_PATH + 'victory.mp3';

    this.soundGameOver = new Howl({
        src: [this.SOUND_GAMEOVER_URL]
    });
    this.soundVictory = new Howl({
        src: [this.SOUND_VICTORY_URL]
    });
    this.soundLevel = undefined;
    this.soundEnabled = true;
}
Audio.prototype = {
    playGameOver(){
        this.stopAll();
        if(this.soundEnabled){
            this.soundGameOver.play();
        }
    },

    playVictory(){
        this.stopAll();
        if(this.soundEnabled){
            this.soundVictory.play();
        }
    },

    playLevelAudio: function(){
        this.stopAll();
        if(this.soundEnabled){
            if(typeof this.soundLevel !== 'undefined'){
                this.soundLevel.play()
            }
        }
    },

    setLevelAudio: function(audio){
        this.stopAll();
        this.soundLevel = new Howl({
            src: [audio],
            loop: true
        });
    },

    stopAll: function(){
        this.soundVictory.stop();
        this.soundGameOver.stop();
        if(typeof this.soundLevel !== 'undefined'){
            this.soundLevel.stop()
        }
    },

    setSoundEnabled: function(soundEnabled){
        this.soundEnabled = soundEnabled;
        if(this.soundEnabled){
            this.playLevelAudio();
        }
        else{
            this.stopAll();
        }
    }
};