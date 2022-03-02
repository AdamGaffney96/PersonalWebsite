class Chess {
    constructor(darkColour, lightColour) {
        this.darkColour = darkColour;
        this.lightColour = lightColour;
        this.startingSquare;
        this.endingSquare;
        this.init();
    }
    init() {
        this.buildBoard();
    }
    buildBoard() {
        this.createSVGs();
        this.createBoard(this.darkColour, this.lightColour);
        this.addBoardOverlay();
        this.setUpPieces();
    }
    createSVGs() {
        let board = document.createElement("div");
        board.classList.add("chess-board");
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let pieces = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let arrows = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let moves = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let boardOverlay = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let boardBackground = document.createElementNS("http://www.w3.org/2000/svg", "g");
        // let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // let moveMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svg.classList.add("overlays");
        pieces.classList.add("pieces");
        boardOverlay.classList.add("board-overlay");
        arrows.classList.add("arrows");
        moves.classList.add("move-markers");
        boardBackground.classList.add("board-squares");
        svg.appendChild(boardBackground);
        svg.appendChild(boardOverlay);
        svg.appendChild(moves);
        svg.appendChild(pieces);
        svg.appendChild(arrows);
        board.appendChild(svg);
        document.querySelector(".chess-container").appendChild(board);
        // arrow.classList.add("arrow");
        // moveMarker.classList.add("move-marker");
    }
    createBoard(dark, light) {
        let boardSquares = document.querySelector(".board-squares");
        let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        square.classList.add("square");
        square.setAttribute('width', 100);
        square.setAttribute('height', 100);
        for (let i = 8; i > 0; i--) {
            for (let j = 1; j < 9; j++) {
                let tempSquare = square.cloneNode();
                if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
                    tempSquare.setAttribute('fill', light);
                } else {
                    tempSquare.setAttribute('fill', dark);
                }
                tempSquare.setAttribute("x", 100 * (j - 1));
                tempSquare.setAttribute("y", 100 * (i - 1));
                tempSquare.setAttribute("row", (9 - i));
                tempSquare.setAttribute("col", j);
                boardSquares.appendChild(tempSquare);
            }
        }
    }
    addBoardOverlay() {
        let boardOverlay = document.querySelector(".board-overlay");
        let letterObj = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" };
        let border = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let ident = document.createElementNS("http://www.w3.org/2000/svg", "text");
        ident.classList.add("identifier");
        border.classList.add("board-border");
        // border attributes
        border.setAttribute("d", `M0 0 L800 0 L800 800 L0 800 L0 0`);
        border.setAttribute("stroke", `black`);
        border.setAttribute("stroke-width", `1`);
        border.setAttribute("fill", `none`);
        // digit and letter attributes
        ident.setAttribute("fill", "black");
        for (let [key, value] of Object.entries(letterObj)) {
            let tempIdentNum = ident.cloneNode();
            let tempIdentLetter = ident.cloneNode();
            tempIdentNum.setAttribute("x", `3`);
            tempIdentLetter.setAttribute("x", `${100*(key-1)+88}`);
            tempIdentNum.setAttribute("y", `${100*(8-key)+18}`);
            tempIdentLetter.setAttribute("y", `793`);
            tempIdentNum.innerHTML = key;
            tempIdentLetter.innerHTML = value;
            boardOverlay.appendChild(tempIdentLetter);
            boardOverlay.appendChild(tempIdentNum);
        }
        boardOverlay.appendChild(border);
    }
    addPiece(colour, piece, row, col) {
        let pieceList = document.querySelector(".pieces");
        let pieceSvg = document.createElementNS("http://www.w3.org/2000/svg", "image");
        pieceSvg.classList.add("piece");
        pieceSvg.classList.add(`${colour}-${piece}`);
        pieceSvg.setAttribute("href", `/static/blog_site/img/${colour} ${piece}.png`);
        pieceSvg.setAttribute("x", `${100*(8-col)}`);
        pieceSvg.setAttribute("y", `${100*(8-row)}`);
        pieceSvg.setAttribute("row", row);
        pieceSvg.setAttribute("col", (9 - col));
        pieceList.appendChild(pieceSvg);
    }
    setUpPieces() {
        let pieces = { "81": "black rook", "82": "black knight", "83": "black bishop", "84": "black queen", "85": "black king", "86": "black bishop", "87": "black knight", "88": "black rook", "71": "black pawn", "72": "black pawn", "73": "black pawn", "74": "black pawn", "75": "black pawn", "76": "black pawn", "77": "black pawn", "78": "black pawn", "11": "white rook", "12": "white knight", "13": "white bishop", "14": "white queen", "15": "white king", "16": "white bishop", "17": "white knight", "18": "white rook", "21": "white pawn", "22": "white pawn", "23": "white pawn", "24": "white pawn", "25": "white pawn", "26": "white pawn", "27": "white pawn", "28": "white pawn" };
        for (let [key, value] of Object.entries(pieces)) {
            console.log(key, value);
            this.addPiece(value.split(" ")[0], value.split(" ")[1], key.split("")[0], key.split("")[1]);
        }
    }
    drawArrow(startSquare, endSquare) {
        let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let arrows = document.querySelector(".arrows");
        let startRow = parseInt(startSquare.getAttribute("row"));
        let startCol = parseInt(startSquare.getAttribute("col"));
        console.log(startRow, startCol);
        let endRow = parseInt(endSquare.getAttribute("row"));
        let endCol = parseInt(endSquare.getAttribute("col"));
        console.log(endRow, endCol);
        arrow.classList.add("arrow");
        arrow.setAttribute("fill", "blue");
        arrow.setAttribute("stroke", "blue");
        arrow.setAttribute("stroke-width", "3px");
        // Vertical arrows
        if (endCol == startCol) {
            if (endRow > startRow) {
                arrow.setAttribute("d", `M${(startCol*100)-65} ${(8 - startRow)*100+50} v${(startRow-endRow)*100 + 30} h-15 l30 -30 l30 30 h-15 v${-((startRow-endRow)*100 + 30)} Z`);
            } else if (endRow < startRow) {
                arrow.setAttribute("d", `M${(startCol*100)-65} ${(8 - startRow)*100+50} v${(startRow-endRow)*100 + 30} h-15 l30 -30 l30 30 h-15 v${-((startRow-endRow)*100 + 30)} Z`);
            }
        } else if (endRow == startRow) {
            if (endCol > startCol) {
                arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+35} L${(endCol*100)-80} ${(8 - startRow)*100 + 35} L${(endCol*100)-80} ${(8 - startRow)*100 + 20} L${(endCol*100)-50} ${(8 - startRow)*100 + 50} L${(endCol*100)-80} ${(8-startRow)*100 + 80} L${(endCol*100)-80} ${(8-startRow)*100 + 65} L${(startCol*100)-50} ${(8 - startRow)*100+65} Z`);
            } else if (endCol < startCol) {
                arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+50} L${(startCol*100)-65} ${(8 - endRow)*100 + 20} L${(startCol*100)-80} ${(8 - endRow)*100 + 20} L${(startCol*100)-50} ${(8 - endRow)*100 + 50} L${(startCol*100)-20} ${(8-endRow)*100 + 80} L${(startCol*100)-35} ${(8-endRow)*100 + 65} L${(startCol*100)-35} ${(8 - startRow)*100+50} Z`);
            }
        }
        // M235 650 L235 580 L220 580 L250 550 L280 580 L265 580 L265 650 L235 650 - 23 to 33
        // arrow.setAttribute("d", "M50 30 L320 30 L320 20 L350 45 L320 70 L320 60 L50 60 L50 30");
        arrows.appendChild(arrow);
    }
    handleEvent(event) {
        if (event.type == "mousedown") {
            if (event.button == "2") {
                this.startingSquare = event.target;
            }
        } else if (event.type == "mouseup") {
            if (event.button == "2") {
                this.endingSquare = event.target;
                if (this.startingSquare != this.endingSquare) {
                    this.drawArrow(this.startingSquare, this.endingSquare);
                }
            }
        }
    }
}