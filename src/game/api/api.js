/**
 * This class allow you to execute ajax request to the API of the salt
 * @constructor
 */
function Api(){
    this.url = 'https://thesalt.rohs.ch/api/';
    this.ACTION_SCOREBOARD = '?action=scoreboard';
    this.ACTION_ADD = '?action=add';

    this.PARAM_PLAYER = 'player';
    this.PARAM_SCORE = 'score';
    this.PARAM_LAT = 'lat';
    this.PARAM_LNG = 'lng';
}
Api.prototype = {
    /**
     * Get the scoreboard data
     * @param callback function Callback method that give the request response
     */
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

    /**
     * Add the given score in the scoreboard
     * @param player string The name of the player
     * @param score number The score
     * @param lat number The latitude
     * @param lng number The longitude
     * @param callback function The callback called when request complete
     */
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