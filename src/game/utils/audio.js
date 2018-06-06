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

    let self = this;
    this.btnToggleSound = $('#btnToggleSound').show();
    this.btnToggleSound.click(function(){
        self.toggleSound();
    });
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
        if(typeof audio !== 'undefined'){
            this.soundLevel = new Howl({
                src: [audio],
                loop: true
            });
        }
        else{
            this.soundLevel = undefined;
        }
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
    },

    toggleSound: function(){
        this.setSoundEnabled(!this.soundEnabled);

        if(this.soundEnabled){
            this.btnToggleSound.find('.glyphicon').removeClass('glyphicon-volume-off');
            this.btnToggleSound.find('.glyphicon').addClass('glyphicon-volume-up');
        }
        else{
            this.btnToggleSound.find('.glyphicon').removeClass('glyphicon-volume-up');
            this.btnToggleSound.find('.glyphicon').addClass('glyphicon-volume-off');
        }
    }
};