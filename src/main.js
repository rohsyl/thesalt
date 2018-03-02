(function() {
    var canvas = document.getElementById('game-canvas'),
        context = canvas.getContext('2d');

    var gameboard = new GameBoard(context);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStuff();
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    function drawStuff() {
        gameboard.redraw();
    }
})();