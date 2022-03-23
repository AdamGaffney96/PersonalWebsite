chessboard = new Chess();

document.querySelector(".chess-board").addEventListener("pointerdown", chessboard);
document.querySelector(".chess-board").addEventListener("pointermove", chessboard);
window.addEventListener("pointerup", chessboard);
window.addEventListener("keydown", chessboard);
document.querySelector(".chess-board").addEventListener("contextmenu", function(event) { event.preventDefault() }, false)