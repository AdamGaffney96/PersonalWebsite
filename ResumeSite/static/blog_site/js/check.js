const checkSudokuSolution = () => {
    const cells = document.querySelectorAll(".cell");
    if ([...cells].some(e => e.innerHTML == "")) return "Incomplete";
    for (let i = 1; i <= 9; i++) {
        // row Checker
        let rowChecker = [];
        row = document.querySelectorAll(`[row="${i}"]`);
        for (let i = 0; i <= 8; i++) {
            if (rowChecker.includes(row[i].innerHTML)) {
                return "Mistake";
            } else {
                rowChecker.push(row[i].innerHTML);
            }
        }
        // col Checker
        let colChecker = [];
        col = document.querySelectorAll(`[col="${i}"]`);
        for (let i = 0; i <= 8; i++) {
            if (colChecker.includes(col[i].innerHTML)) {
                return "Mistake";
            } else {
                colChecker.push(col[i].innerHTML);
            }
        }
        // box Checker
        let boxChecker = [];
        box = document.querySelectorAll(`[box="${i}"]`);
        for (let i = 0; i <= 8; i++) {
            if (boxChecker.includes(box[i].innerHTML)) {
                return "Mistake";
            } else {
                boxChecker.push(box[i].innerHTML);
            }
        }
    }
    return "Correct";
}

const solutionPopup = () => {
    const solved = checkSudokuSolution();
    if (solved == "Correct") {
        alert("Correct, congratulations!");
    } else if (solved == "Mistake") {
        alert("A mistake has been made, keep trying!");
    } else if (solved == "Incomplete") {
        alert("The puzzle is not completed, keep going!");
    } else {
        alert("Something is wrong, please contact the dev.");
    }
    return 0;
}