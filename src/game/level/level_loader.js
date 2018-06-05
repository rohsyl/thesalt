/**
 * LevelLoader constructor
 * @constructor
 */
function LevelLoader(){

}

/**
 * This class allow you to load levels
 * @type {{loadLevel: LevelLoader.loadLevel}}
 */
LevelLoader.prototype = {
    /**
     *  Load in ajax the given level
     * @param name The name of the level
     * @returns {string} The levelString
     */
    loadLevel: function(name){
        let filePath = "src/level/" + name + ".sel?lvl=15";
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",filePath,false);
        xmlhttp.send(null);
        return xmlhttp.responseText;
    }
};