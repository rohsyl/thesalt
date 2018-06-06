function Audio(){
    this.SOUND_GAMEOVER_URL = AUDIOS_PATH + 'game_over.mp3';
    this.SOUND_VICTORY_URL = AUDIOS_PATH + 'victory.mp3';
    this.SOUND_JUMP_URL = AUDIOS_PATH + 'jump.mp3';
    this.SOUND_DOUBLE_JUMP_URL = AUDIOS_PATH + 'doubleJump.mp3';
    this.SOUND_ENEMY_DIE_URL = AUDIOS_PATH + 'enemy_die.mp3';
    this.SOUND_PICK_WATER_URL = AUDIOS_PATH + 'pick_water.mp3';
    this.SOUND_PICK_PIZZA_URL = AUDIOS_PATH + 'pick_pizza.mp3';
    this.SOUND_PICK_RJ45_URL = AUDIOS_PATH + 'pick_rj45.mp3';

    this.soundGameOver = new Howl({
        src: [this.SOUND_GAMEOVER_URL]
    });
    this.soundVictory = new Howl({
        src: [this.SOUND_VICTORY_URL]
    });
    this.soundJump = new Howl({
        src: [this.SOUND_JUMP_URL]
    });
    this.soundDoubleJump = new Howl({
        src: [this.SOUND_DOUBLE_JUMP_URL]
    });
    this.soundEnemyDie = new Howl({
        src: [this.SOUND_ENEMY_DIE_URL]
    });
    this.soundPickWater = new Howl({
        src: [this.SOUND_PICK_WATER_URL]
    });
    this.soundPickPizza = new Howl({
        src: [this.SOUND_PICK_PIZZA_URL]
    });
    this.soundPickRj45 = new Howl({
        src: [this.SOUND_PICK_RJ45_URL]
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

    playJump(){
        if(this.soundEnabled){
            this.soundJump.play();
        }
    },

    playDoubleJump(){
        if(this.soundEnabled){
            this.soundDoubleJump.play();
        }
    },

    playEnemyDie(){
        if(this.soundEnabled){
            this.soundEnemyDie.play();
        }
    },

    playPickWater(){
        if(this.soundEnabled){
            this.soundPickWater.play();
        }
    },

    playPickPizza(){
        if(this.soundEnabled){
            this.soundPickPizza.play();
        }
    },

    playPickRj45(){
        if(this.soundEnabled){
            this.soundPickRj45.play();
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