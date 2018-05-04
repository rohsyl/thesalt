const BACKGROUND_SLIDING_FACTOR = 0.5;

function Background(backgroundPath, scene, x, y){
    this.scene = scene;
    this.canvas = this.scene.canvas;
    this.context = this.scene.context;

    let ratio = this.canvas.height / BACKGROUND_HEIGHT;

    this.x = x * ratio;
    this.y = y;

    this.h = this.canvas.height;
    this.w = BACKGROUND_WIDTH * ratio;

    this.backgroundPath = backgroundPath;
    this.image = undefined;
}
Background.prototype = {
    init: function(){
        this.image = new Image();
        this.image.src = this.backgroundPath;
    },
    
    update: function(shiftX){
        this.shiftX = shiftX;
        
    },
    
    draw: function () {
        this.context.drawImage(this.image, this.x - this.shiftX * BACKGROUND_SLIDING_FACTOR, this.y, this.w, this.h);
    }
};