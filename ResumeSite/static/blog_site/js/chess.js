let chessSettings;
if (!!localStorage.getItem("chessSettings")) {
    chessSettings = JSON.parse(localStorage.getItem("chessSettings"));
} else {
    console.log("No local storage data found, using default settings.");
    chessSettings = undefined;
}
chessboard = new Chess(arrowColour = "hsl(190, 100%, 70%)", perspective = "white", !!chessSettings ? chessSettings.boardTheme : undefined);

document.querySelector(".chess-board").addEventListener("mousedown", chessboard);
document.querySelector(".chess-board").addEventListener("mousemove", chessboard);
document.querySelector(".chess-board").addEventListener("mouseup", chessboard);
document.querySelector(".chess-board").addEventListener("contextmenu", function(event) { event.preventDefault() }, false)