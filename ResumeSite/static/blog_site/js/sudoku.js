let sudoku = new Sudoku("hsl(0, 100%, 0%)", "hsl(177, 50%, 50%)", "hsl(0, 50%, 50%)");

document.querySelector(".sudoku-grid").addEventListener('mousedown', sudoku);
document.querySelector(".sudoku-grid").addEventListener('mouseover', sudoku);
document.querySelector(".sudoku-grid").addEventListener('mouseup', sudoku);
window.addEventListener('keydown', sudoku);
window.addEventListener('mousedown', sudoku.clearAll);