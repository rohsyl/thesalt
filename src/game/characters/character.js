
function sprite(character) {

    var that = {};

    that.context = character.context;
    that.w = character.realW;
    that.h = character.realH;
    that.x = character.x;
    that.y = character.y;
    that.image0 = character.image0;
    that.image1 = character.image1;
    that.image2 = character.image2;
    that.image3 = character.image3;

    var images = [that.image1, that.image2, that.image3, that.image0];

    var frameIndex = 0;
    var tickCount = 0;
    var ticksPerFrame = 1;
    var numberOfFrames = images.length;

    that.default = function () {
        that.context.clearRect(that.x, that.y, that.w, that.h);
        that.context.drawImage(images[0], that.x, that.y, that.w, that.h);
    };

    that.render = function () {
        that.context.clearRect(that.x, that.y, that.w, that.h);
        that.context.drawImage(images[frameIndex], that.x, that.y, that.w, that.h);
    };


    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            if (frameIndex < numberOfFrames -1)
                frameIndex += 1;
            else
                frameIndex = 0;
        }
    };




    return that;


}


