
function LevelLoader(){

}
LevelLoader.prototype = {
      loadLevel: function(name){
          let filePath = "src/level/" + name + ".sel";
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET",filePath,false);
          xmlhttp.send(null);
          return xmlhttp.responseText;
      }
};