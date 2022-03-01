class Sudoku {
    constructor(borderColour, selectedColour, digitColour, givenColour, puzzleTitle, puzzleRuleset, puzzleJSON) {
        this.id;
        this.borderColour = borderColour;
        this.selectedColour = selectedColour;
        this.digitColour = digitColour;
        this.givenColour = givenColour;
        this.puzzleTitle = puzzleTitle;
        this.puzzleRuleset = puzzleRuleset;
        this.puzzleJSON = puzzleJSON;
        this.init();
        this.selecting;
        this.multiple;
        this.selectedAll;
        this.digitCheck;
        this.digitCheckCount = 0;
        this.areAnyFullDigits;
        this.lastSelected = `outline-55`;
        this.svg = document.querySelector(".svg");
    }
    init = () => {
        this.drawBoard();
        this.loadPuzzle(this.puzzleTitle, this.puzzleRuleset, this.puzzleJSON);
    }
    drawBoard() {
        this.drawShell();
        this.gridOverlay();
    }
    drawShell() {
        let grid = document.createElement("div");
        let cell = document.createElement("div");
        grid.classList.add("sudoku-grid");
        cell.classList.add("cell");
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                let tempCell = cell.cloneNode();
                tempCell.setAttribute('row', i);
                tempCell.setAttribute('col', j);
                grid.appendChild(tempCell);
            }
        }
        document.querySelector(".play-board").appendChild(grid);
        this.createSvgs();
    }
    createSvgs() {
        let svg = this.drawOutline();
        let grid = this.drawGrid();
        let selectedCells = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let addedDigits = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let centrePencilmarks = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let cornerPencilmarks = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let givenDigits = document.createElementNS("http://www.w3.org/2000/svg", "g");
        givenDigits.classList.add('given-digits');
        selectedCells.classList.add('selected-cells');
        addedDigits.classList.add("added-digits");
        centrePencilmarks.classList.add("centre-pencilmarks");
        cornerPencilmarks.classList.add("corner-pencilmarks");
        svg.appendChild(givenDigits);
        svg.appendChild(addedDigits);
        svg.appendChild(cornerPencilmarks);
        svg.appendChild(centrePencilmarks);
        svg.appendChild(grid);
        svg.appendChild(selectedCells);
        document.querySelector(".sudoku-grid").appendChild(svg);
    }
    gridOverlay() {
        let svg = document.querySelector(".svg");
        let grid = document.querySelector(".grid-lines")
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let box = this.drawBox(i, j);
                grid.appendChild(box);
            }
        }
        for (let k = 0; k < 9; k++) {
            let rowLine = this.drawCells("row", k);
            let colLine = this.drawCells("col", k);
            grid.appendChild(colLine)
            grid.appendChild(rowLine);
        }
        svg.appendChild(grid);
    }
    drawOutline() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('svg');
        svg.setAttribute('width', '603px');
        svg.setAttribute('height', '603px');
        return svg;
    }
    drawGrid() {
        let grid = document.createElementNS("http://www.w3.org/2000/svg", "g");
        grid.classList.add('grid-lines');
        grid.setAttribute('width', '603px');
        grid.setAttribute('height', '603px');
        return grid;
    }
    drawBox(boxRow, boxCol) {
        let tempBox = document.createElementNS("http://www.w3.org/2000/svg", "path")
        tempBox.classList.add('box');
        tempBox.setAttribute("fill", "none");
        tempBox.setAttribute("stroke", this.borderColour);
        tempBox.setAttribute("stroke-width", "3px");
        tempBox.setAttribute("vector-effect", "non-scaling-stroke");
        tempBox.setAttribute("d", `M${201*boxCol} ${201*boxRow} L${201*(boxCol+1)} ${201*boxRow} L${201*(boxCol+1)} ${201*(boxRow+1)} L${201*boxCol} ${201*(boxRow+1)} L${201*boxCol} ${201*boxRow}`);
        return tempBox;
    }
    drawCells(rowOrCol, lineNo) {
        let cellLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
        cellLine.classList.add('cell-line');
        cellLine.setAttribute("fill", "none");
        cellLine.setAttribute("stroke", this.borderColour);
        cellLine.setAttribute("stroke-width", "1px");
        cellLine.setAttribute("vector-effect", "non-scaling-stroke");
        if (rowOrCol == 'col') {
            cellLine.setAttribute("d", `M${67*(lineNo+1)} 0 L${67*(lineNo+1)} 603`);
        } else if (rowOrCol == 'row') {
            cellLine.setAttribute("d", `M0 ${67*(lineNo+1)} L603 ${67*(lineNo+1)}`)
        }
        return cellLine;
    }
    handleEvent(event) {
        // mouse down events
        if (event.type == "mousedown") {
            // Draw selected cells
            // console.log(event);
            // if (!event.target.classList.contains("cell")) { document.querySelector(".selected-cells").innerHTML = ""; }
            if (event.target.classList.contains("cell")) {
                const coordinates = { "row": event.target.getAttribute("row"), "col": event.target.getAttribute("col") };
                this.selecting = !document.getElementById(`outline-${coordinates.row}${coordinates.col}`) ? true : false;
                this.multiple = document.querySelector(".selected-cells").children.length != 1;
                this.drawCellOutline(coordinates.row, coordinates.col, event.ctrlKey || event.shiftKey ? "append" : "replace", "down");
            }
            // mouse over events
        } else if (event.type == "mouseover") {
            // Draw selected cells
            if (event.buttons == 1 && event.target.getAttribute("row") != null) {
                const coordinates = { "row": event.target.getAttribute("row"), "col": event.target.getAttribute("col") };
                this.drawCellOutline(coordinates.row, coordinates.col, "append", "over");
            }
            // mouse up events
        } else if (event.type == "mouseup") {
            const coordinates = { "row": event.target.getAttribute("row"), "col": event.target.getAttribute("col") };
            // delete cells when clicked and already selected
            if (!!document.getElementById(`outline-${coordinates.row}${coordinates.col}`) && !this.selecting && !this.multiple) {
                this.deleteCellOutline(coordinates.row, coordinates.col);
            }
            this.selecting = !this.selecting;
            this.multiple = !this.multiple;
            // key down events
        } else if (event.type == "keydown") {
            // draws digits in selected cells
            if (isFinite(event.key) && event.key != 0) {
                this.drawDigits(event, event.key);
                // deletes digits in selected cells
            } else if (isFinite(event.code.charAt(event.code.length - 1)) && !isFinite(event.key)) {
                this.drawDigits(event, parseInt(event.code.charAt(event.code.length - 1)), true);
            } else if (event.key == "Delete" || event.key == "Backspace") {
                let selectedCells = document.querySelectorAll(".selected-cell");
                for (let cell of selectedCells) {
                    let rowColCheck = cell.id.split("-")[1];
                    let tempIdDigitCheck = `digit-${rowColCheck}`;
                    if (!!document.getElementById(tempIdDigitCheck)) {
                        this.areAnyFullDigits = true;
                        break;
                    }
                }
                for (let cell of selectedCells) {
                    let rowCol = cell.id.split("-")[1];
                    let tempIdDigit = `digit-${rowCol}`;
                    let tempIdCorner = `corner-${rowCol}`;
                    let tempIdCentre = `centre-${rowCol}`;
                    if (event.ctrlKey) {
                        this.deleteDigit(tempIdCentre);
                    } else if (event.shiftKey) {
                        this.deleteDigit(tempIdCorner);
                    } else {
                        if (this.areAnyFullDigits) {
                            this.deleteDigit(tempIdDigit);
                        } else {
                            this.deleteDigit(tempIdCentre);
                            this.deleteDigit(tempIdCorner);
                        }
                    }
                }
                this.areAnyFullDigits = false;
            } else if (event.key == "a" && event.ctrlKey) {
                if (!this.selectedAll) {
                    for (let i = 1; i < 10; i++) {
                        for (let j = 1; j < 10; j++) {
                            this.drawCellOutline(i, j, "append", "selectall");
                        }
                    }
                    this.selectedAll = true;
                } else {
                    document.querySelector(".selected-cells").innerHTML = "";
                    this.selectedAll = false;
                }
            } else if (event.code == "ArrowLeft") {
                this.moveCursor(event, "left");
            } else if (event.code == "ArrowRight") {
                this.moveCursor(event, "right");
            } else if (event.code == "ArrowUp") {
                this.moveCursor(event, "up");
            } else if (event.code == "ArrowDown") {
                this.moveCursor(event, "down");
            } else if (event.code == "Escape") {
                document.querySelector(".selected-cells").innerHTML = "";
                this.selectedAll = false;
            }
        }
    }
    drawCellOutline(row, col, appendOrReplace, eventType) {
        let selectedCells = document.querySelector(".selected-cells");
        let cellOutline = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        cellOutline.classList.add('selected-cell');
        // Different checks for removing and clearing selected cells.
        if (appendOrReplace == "append" && (eventType == "over" || eventType == "selectall") && !!document.getElementById(`outline-${row}${col}`)) {
            return 0;
        }
        if (appendOrReplace == "replace" && eventType != "over") {
            selectedCells.innerHTML = "";
            this.selectedAll = false;
        }
        if (!!document.getElementById(`outline-${row}${col}`) && (eventType != "over" && eventType != "selectall")) {
            document.getElementById(`outline-${row}${col}`).remove();
            return 0;
        }
        cellOutline.id = `outline-${row}${col}`;
        cellOutline.setAttribute("x", `${67*(col-1)+4}`);
        cellOutline.setAttribute("y", `${67*(row-1)+4}`);
        cellOutline.setAttribute("width", `59`);
        cellOutline.setAttribute("height", `59`);
        cellOutline.setAttribute("fill", "none");
        cellOutline.setAttribute("stroke", this.selectedColour);
        cellOutline.setAttribute("stroke-width", "8px");
        cellOutline.setAttribute("vector-effect", "non-scaling-stroke");
        this.lastSelected = cellOutline.id;
        selectedCells.appendChild(cellOutline);
        return 0;
    }
    deleteCellOutline(row, col) {
        document.getElementById(`outline-${row}${col}`).remove();
    }
    drawDigits(event, digit, isShiftDigit = false) {

        let selectedList = document.querySelectorAll(".selected-cell");
        let addedDigits;
        let type;
        if (event.ctrlKey) {
            addedDigits = document.querySelector(".centre-pencilmarks");
            type = "centre";
        } else if (isShiftDigit) {
            addedDigits = document.querySelector(".corner-pencilmarks");
            type = "corner";
        } else {
            addedDigits = document.querySelector(".added-digits");
            type = "main";
        }
        let idList = [];
        for (let selectedCell of selectedList) {
            idList.push(selectedCell.id.split("-")[1]);
        }
        if ((type == "centre" || type == "corner") && idList.length > 1) {
            for (let i = 0; i < idList.length; i++) {
                let checkId = idList[i];
                let checkRow = checkId[0];
                let checkCol = checkId[1];
                let checkElement = document.getElementById(`${type}-${checkRow}${checkCol}`);
                if (!!checkElement) {
                    if (checkElement.innerHTML.includes(digit)) {
                        this.digitCheck = true;
                        this.digitCheckCount++;
                    } else {
                        this.digitCheck = false;
                    }
                }
            }
        } else {
            this.digitCheck = false;
        }
        for (let i = 0; i < idList.length; i++) {
            let tempId = idList[i];
            let tempRow = tempId[0];
            let tempCol = tempId[1];
            let tempDigit = this.createDigit(tempId, type, digit);
            if (tempDigit == "given") { continue; }
            if (type != "main") {
                if (!!document.getElementById(`${type}-${tempRow}${tempCol}`)) {
                    let existingMark = document.getElementById(`${type}-${tempRow}${tempCol}`);
                    if (!existingMark.innerHTML.includes(digit)) {
                        tempDigit.innerHTML = `${existingMark.innerHTML}${digit}`.split('').sort().join('');
                    } else if (this.digitCheckCount == idList.length) {
                        tempDigit.innerHTML = existingMark.innerHTML.replace(digit, '');
                    } else if (existingMark.innerHTML.includes(digit) && this.digitCheck) {
                        tempDigit.innerHTML = existingMark.innerHTML;
                    } else {
                        tempDigit.innerHTML = existingMark.innerHTML.replace(digit, '');
                    }
                    existingMark.remove();
                } else {
                    tempDigit.innerHTML = digit;
                }
            } else if (type == "main") {
                tempDigit.innerHTML = digit;
                if (!!document.getElementById(`corner-${tempRow}${tempCol}`)) {
                    document.getElementById(`corner-${tempRow}${tempCol}`).setAttribute("visibility", "hidden");
                }
                if (!!document.getElementById(`centre-${tempRow}${tempCol}`)) {
                    document.getElementById(`centre-${tempRow}${tempCol}`).setAttribute("visibility", "hidden");
                }
            }
            addedDigits.appendChild(tempDigit);
        }
        this.digitCheck = false;
        this.digitCheckCount = 0;
    }
    createDigit(id, type, digit) {
        let tempRow = id[0];
        let tempCol = id[1];
        let tempDigit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        if (type == "main") {
            tempDigit.classList.add("added-digit");
            tempDigit.id = `digit-${tempRow}${tempCol}`;
            if (!!document.getElementById(tempDigit.id)) {
                this.deleteDigit(tempDigit.id);
            }
            tempDigit.setAttribute("fill", `${this.digitColour}`);
            tempDigit.setAttribute("x", `${67*(tempCol-1)+16}`);
            tempDigit.setAttribute("y", `${67*(tempRow)-11}`);
        } else if (type == "given") {
            tempDigit.classList.add("given-digit");
            tempDigit.id = `given-${tempRow}${tempCol}`;
            if (!!document.getElementById(tempDigit.id)) {
                this.deleteDigit(tempDigit.id);
            }
            tempDigit.setAttribute("fill", `${this.givenColour}`);
            tempDigit.setAttribute("x", `${67*(tempCol-1)+16}`);
            tempDigit.setAttribute("y", `${67*(tempRow)-11}`);
        } else if (type == "centre") {
            if (!!document.getElementById(`given-${tempRow}${tempCol}`)) { return "given"; }
            let currentDigits = document.getElementById(`${type}-${tempRow}${tempCol}`);
            tempDigit.classList.add("centre-digit");
            tempDigit.id = `${type}-${tempRow}${tempCol}`;
            tempDigit.setAttribute("font-size", `1em`);
            if (!!document.getElementById(tempDigit.id)) {
                if (!document.getElementById(tempDigit.id).innerHTML.includes(digit)) {
                    tempDigit.setAttribute("font-size", `${Math.min(1, (14-(currentDigits.innerHTML.length+1))/10)}em`);
                } else {
                    tempDigit.setAttribute("font-size", `${Math.min(1, (14-(currentDigits.innerHTML.length-1))/10)}em`);
                }
            }
            tempDigit.setAttribute("fill", `${this.digitColour}`);
            tempDigit.setAttribute("text-anchor", `middle`);
            tempDigit.setAttribute("x", `${67*(tempCol-1)+33}`);
            tempDigit.setAttribute("y", `${67*(tempRow)-27}`);
        } else if (type == "corner") {
            if (!!document.getElementById(`given-${tempRow}${tempCol}`)) { return "given"; }
            let currentDigits = document.getElementById(`${type}-${tempRow}${tempCol}`);
            tempDigit.classList.add("corner-digit");
            tempDigit.id = `${type}-${tempRow}${tempCol}`;
            tempDigit.setAttribute("font-size", `1em`);
            if (!!document.getElementById(tempDigit.id)) {
                if (!document.getElementById(tempDigit.id).innerHTML.includes(digit)) {
                    tempDigit.setAttribute("font-size", `${Math.min(1, (14-(currentDigits.innerHTML.length+1))/10)}em`);
                } else {
                    tempDigit.setAttribute("font-size", `${Math.min(1, (14-(currentDigits.innerHTML.length-1))/10)}em`);
                }
            }
            tempDigit.setAttribute("fill", `${this.digitColour}`);
            tempDigit.setAttribute("x", `${67*(tempCol-1)+8}`);
            tempDigit.setAttribute("y", `${67*(tempRow)-44}`);
        }
        return tempDigit;
    }
    deleteDigit(id) {
        let tempRow = id.split("-")[1][0];
        let tempCol = id.split("-")[1][1];
        if (!!document.getElementById(id)) {
            if (id.includes("digit")) {
                if (!!document.getElementById(`corner-${tempRow}${tempCol}`)) {
                    document.getElementById(`corner-${tempRow}${tempCol}`).removeAttribute("visibility");
                }
                if (!!document.getElementById(`centre-${tempRow}${tempCol}`)) {
                    document.getElementById(`centre-${tempRow}${tempCol}`).removeAttribute("visibility");
                }
            }
            document.getElementById(id).remove();
        }
    }
    moveCursor(event, direction) {
        let selectedCells = document.querySelector(".selected-cells");
        let currId;
        currId = { "row": parseInt(this.lastSelected.split("-")[1][0]), "col": parseInt(this.lastSelected.split("-")[1][1]) };
        if (selectedCells.childElementCount == 0) {
            this.drawCellOutline(currId["row"], currId["col"], "replace", direction);
            return 0;
        }
        let lastCell = selectedCells.lastChild;
        currId = { "row": parseInt(lastCell.id.split("-")[1][0]), "col": parseInt(lastCell.id.split("-")[1][1]) };
        switch (direction) {
            case "left":
                this.drawCellOutline(currId["row"], Math.max(1, currId["col"] - 1), event.ctrlKey || event.shiftKey ? "append" : "replace", direction)
                break;
            case "right":
                this.drawCellOutline(currId["row"], Math.min(9, currId["col"] + 1), event.ctrlKey || event.shiftKey ? "append" : "replace", direction)
                break;
            case "up":
                this.drawCellOutline(Math.max(1, currId["row"] - 1), currId["col"], event.ctrlKey || event.shiftKey ? "append" : "replace", direction)
                break;
            case "down":
                this.drawCellOutline(Math.min(9, currId["row"] + 1), currId["col"], event.ctrlKey || event.shiftKey ? "append" : "replace", direction)
                break;
        }
    }
    clearAll(event) {
        if (!event.target.classList.contains("cell")) {
            document.querySelector(".selected-cells").innerHTML = "";
        }
    }
    loadPuzzle(title, ruleset, puzzleJSON) {
        let givenDigits = document.querySelector(".given-digits");
        let puzzleObject = JSON.parse(puzzleJSON);
        for (let [key, value] of Object.entries(puzzleObject)) {
            let tempDigit = this.createDigit(key, "given", 0);
            tempDigit.innerHTML = value;
            givenDigits.appendChild(tempDigit);
        }
    }
}