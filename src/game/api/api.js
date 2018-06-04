function Api(){
    this.url = 'http://thesalt.rohs.ch/api/';
    this.ACTION_SCOREBOARD = '?action=scoreboard';
    this.ACTION_ADD = '?action=add';

    this.PARAM_PLAYER = 'player';
    this.PARAM_SCORE = 'score';
    this.PARAM_LAT = 'lat';
    this.PARAM_LNG = 'lng';
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

    addScore(player, score, lat, lng, callback){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", this.url + this.ACTION_ADD, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (this.status === 200) {
                callback(this.response);
            }
            else{
                console.log("Ajax Error");
                console.log(xhr);
            }
        };

        lat = lat == null ? '' : lat;
        lng = lng == null ? '' : lng;

        let param = this.PARAM_PLAYER + '=' + player + '&' + this.PARAM_SCORE + '=' + score + '&' + this.PARAM_LAT + '=' + lat + '&' + this.PARAM_LNG + '=' + lng;
        xhr.send(param);
    }
};