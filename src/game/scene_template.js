/*

Cette classe est la base pour toute les scènes qui seront créer.
Chaque scène devrai implémenter les méthodes ci dessous.

 */

function Scene(gb) {
    this.gb = gb;
    this.canvas = this.gb.canvas;
    this.context = this.gb.context;
}
Scene.prototype = {

    /**
     * Method called one time in the beginning
     */
    init: function(){

    },

    /**
     * Method called each frame
     * Use it to change physics value
     */
    update: function(){

    },

    /**
     * Method called each frame
     * use it to change graphics
     */
    draw: function(){

    }
};
