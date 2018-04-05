(function() {
    const FPS = 60;

    let canvas = document.getElementById('game-canvas');

    let gameBoard = new GameBoard(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    gameBoard.init();
    function loop() {
        gameBoard.redraw();
    }
    setInterval(loop, 1000 / FPS);
})();
