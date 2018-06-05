const FPS = 60;
$(function(){
    let jcanvas = $('#game-canvas');
    let formContainer = $('#form-name');
    let btnPlay = $('#btnSave');
    let txtPlayerName = $('#player-name');

    btnPlay.click(function (e) {
        e.preventDefault();
        let playerName = txtPlayerName.val();
        if(playerName.length === 0){
            alert('Please enter a name !');
        }
        else{
            jcanvas.show();
            formContainer.remove();
            let canvas = jcanvas.get(0);

            let gameBoard = new GameBoard(canvas, playerName);

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - 50;
            }
            window.addEventListener('resize', resizeCanvas, false);
            resizeCanvas();

            gameBoard.init();
            function loop() {
                gameBoard.redraw();
            }
            setInterval(loop, 1000 / FPS);
        }
        return false;
    });
});