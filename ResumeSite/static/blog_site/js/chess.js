chessboard = new Chess(darkColour = "hsl(156, 100%, 33%)", lightColour = "hsl(0, 0%, 87%)", arrowColour = "hsl(190, 100%, 70%)", "white");

document.querySelector(".chess-board").addEventListener("mousedown", chessboard);
document.querySelector(".chess-board").addEventListener("mousemove", chessboard);
document.querySelector(".chess-board").addEventListener("mouseup", chessboard);
document.querySelector(".chess-board").addEventListener("contextmenu", function(event) { event.preventDefault() }, false)