function Api(){
    this.url = 'http://thesalt.rohs.ch/api/';
    this.ACTION_SCOREBOARD = '?action=scoreboard';
    this.ACTION_ADD = '?action=add';

    this.PARAM_PLAYER = 'player';
    this.PARAM_SCORE = 'score';
    this.PARAM_COUNTRY = 'country';
}
Api.prototype = {
    getScoreboard: function(callback){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url + this.ACTION_SCOREBOARD, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (this.status === 200) {
                callback(this.response);
            }
            else{
                console.log("Ajax Error");
                console.log(xhr);
            }
        };
        xhr.send();
    },

    addScore(player, score, country, callback){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url + this.ACTION_ADD, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (this.status === 200) {
                callback(this.response);
            }
            else{
                console.log("Ajax Error");
                console.log(xhr);
            }
        };
        let param = '?' + this.PARAM_PLAYER + '=' + player + '&' + this.PARAM_SCORE + '=' + score + '&' + this.PARAM_COUNTRY + '=' + country;
        xhr.send(param);
    }
};