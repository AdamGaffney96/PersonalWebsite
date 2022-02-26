const cells = document.querySelectorAll(".cell");
const controlDigits = document.querySelectorAll(".digit");
let mouseDown = false;
const json = JSON.parse(data)[0];
const puzzleCount = Object.keys(json.sudoku).length;
const puzzleNum = Math.ceil(Math.random() * puzzleCount);
const puzzle = json.sudoku[`puzzle ${puzzleNum}`];
let undoActions = [];

const preparePuzzle = () => {
    Object.entries(puzzle).forEach(cell => {
        let row = cell[0][0];
        let col = cell[0][1];
        document.querySelectorAll(`[row="${row}"][col="${col}"]`)[0].innerHTML = cell[1];
    })
}

preparePuzzle();

const keyEntryToSudoku = (e) => {
    let selectedCells = document.querySelectorAll(".selected");
    let selectedArray = [...selectedCells];
    let pencilmarks = false;
    let newString = e.key;
    if (e.key == "Backspace" | e.key == "Delete") {
        selectedCells.forEach(cell => {
            if (cell.classList.contains("fixed")) return;
            cell.innerHTML = null;
            undoActions.push({ "delete": selectedArray });
        });
    }
    if (!parseInt(e.key)) return;
    if (e.ctrlKey) {
        selectedCells.forEach(cell => cell.classList.add("pencilmarks"));

        pencilmarks = true;
    } else {
        selectedCells.forEach(cell => cell.classList.remove("pencilmarks"));
    }
    selectedCells.forEach(cell => {
        if (cell.classList.contains("fixed")) return;
        if (pencilmarks) {
            if (!cell.innerHTML.includes(e.key)) {
                newString = cell.innerHTML + e.key
                newString = newString.split('');
                newString = newString.map((e) => { return parseInt(e) }).sort().join("");
            } else {
                newString = cell.innerHTML.replace(e.key, "");
            }
        }
        cell.innerHTML = newString;
    });
}

// Adds event listeners to each cell
cells.forEach(cell => {
    if (cell.innerHTML) {
        cell.classList.add("fixed");
    }
    // Double click to select all of number
    cell.addEventListener("dblclick", (e) => {
        let selectedNumber = cell.innerText
        if (!selectedNumber) return;
        cells.forEach(cell => {
            if (cell.innerText == selectedNumber) cell.classList.add("selected");
        })
    })

    // Clicking on a cell
    cell.addEventListener("mousedown", (e) => {
        let currSelectedCells = document.querySelectorAll(".selected");
        mouseDown = true;
        if (e.ctrlKey) {
            if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
            } else {
                cell.classList.add("selected");
            }
            return 0;
        }
        if (currSelectedCells.length > 1) {
            currSelectedCells.forEach(currCell => { currCell.classList.remove("selected") });
        }
        if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            return 0;
        }
        if (currSelectedCells.length == 1) {
            currSelectedCells[0].classList.remove("selected");
        }
        cell.classList.add("selected");
    })

    // Hovering over a cell with the left mouse held down
    cell.addEventListener("mouseenter", (e) => {
        if (mouseDown && !cell.classList.contains("selected")) {
            cell.classList.add("selected");
        }
    })
})

// Clears selected if clicked off sudoku grid
window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("cell") && !e.target.classList.contains("sudoku-grid") && !e.target.classList.contains("row")) {
        let currSelectedCells = document.querySelectorAll(".selected");
        currSelectedCells.forEach(currCell => { currCell.classList.remove("selected") });
    }
})

// Disables hover feature when mouse up
window.addEventListener("mouseup", (e) => { mouseDown = false; });

// Interacting with the sudoku using the keyboard
window.addEventListener("keydown", keyEntryToSudoku);