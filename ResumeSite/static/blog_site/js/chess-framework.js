class Chess {
    constructor(arrowColour, perspective, boardTheme = "blue1") {

        this.boardTheme = boardTheme;
        this.arrowColour = arrowColour;
        this.boardOptions = { "dark1": "Dark Board", "blue1": "Blue Ocean", "green1": "Green Forest" };
        this.themeColours = { "dark1": { "dark": "hsl(0, 0%, 20%)", "light": "hsl(0, 0%, 87%" }, "blue1": { "dark": "hsl(195, 100%, 25%)", "light": "hsl(0, 0%, 87%" }, "green1": { "dark": "hsl(99, 100%, 25%)", "light": "hsl(0, 0%, 87%" } }
        this.startingSquare;
        this.endingSquare;
        this.isPieceGrabbed;
        this.pieceGrabbed;
        this.breakColLeft;
        this.breakColRight;
        this.breakRowTop;
        this.breakRowBottom;
        this.breakBishop;
        this.perspective = perspective;
        this.init();
    }
    init() {
        this.buildBoard();
        this.openChessSettings();
    }
    buildBoard() {
        this.createSVGs();
        this.createBoard(this.boardTheme);
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
    }
    createBoard(theme) {
        let dark = this.themeColours[theme].dark;
        let light = this.themeColours[theme].light;
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
                    tempSquare.classList.add("light");
                } else {
                    tempSquare.setAttribute('fill', dark);
                    tempSquare.classList.add("dark");
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
        if (piece == "pawn" || piece == "king" || piece == "rook") { pieceSvg.setAttribute("notmoved", "true") };
        pieceSvg.setAttribute("row", row);
        pieceSvg.setAttribute("col", (9 - col));
        pieceList.appendChild(pieceSvg);
    }
    setUpPieces() {
        let pieces = { "81": "black rook", "82": "black knight", "83": "black bishop", "85": "black queen", "84": "black king", "86": "black bishop", "87": "black knight", "88": "black rook", "71": "black pawn", "72": "black pawn", "73": "black pawn", "74": "black pawn", "75": "black pawn", "76": "black pawn", "77": "black pawn", "78": "black pawn", "11": "white rook", "12": "white knight", "13": "white bishop", "15": "white queen", "14": "white king", "16": "white bishop", "17": "white knight", "18": "white rook", "21": "white pawn", "22": "white pawn", "23": "white pawn", "24": "white pawn", "25": "white pawn", "26": "white pawn", "27": "white pawn", "28": "white pawn" };
        for (let [key, value] of Object.entries(pieces)) {
            this.addPiece(value.split(" ")[0], value.split(" ")[1], key.split("")[0], key.split("")[1]);
        }
    }
    drawArrow(startSquare, endSquare) {
        let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let arrows = document.querySelector(".arrows");
        let startRow = parseInt(startSquare.getAttribute("row"));
        let startCol = parseInt(startSquare.getAttribute("col"));
        let endRow = parseInt(endSquare.getAttribute("row"));
        let endCol = parseInt(endSquare.getAttribute("col"));
        arrow.classList.add("arrow");
        arrow.id = `${startRow}${startCol}-${endRow}${endCol}`;
        if (!!document.getElementById(arrow.id)) {
            document.getElementById(arrow.id).remove();
            return 0;
        }
        arrow.setAttribute("fill", this.arrowColour);
        arrow.setAttribute("fill-opacity", "0.8");
        // Vertical arrows
        if (endCol == startCol) {
            // Up
            if (endRow > startRow) {
                arrow.setAttribute("d", `M${(startCol*100)-61} ${(8 - startRow)*100+50} v${(startRow-endRow)*100 + 30} h-19 l30 -30 l30 30 h-19 v${-((startRow-endRow)*100 + 30)} Z`);
            } // Down
            else if (endRow < startRow) {
                arrow.setAttribute("d", `M${(startCol*100)-61} ${(8 - startRow)*100+50} v${(startRow-endRow)*100 - 30} h-19 l30 30 l30 -30 h-19 v${-((startRow-endRow)*100 - 30)} Z`);
            }
        } // Horizontal Arrows
        else if (endRow == startRow) {
            // Right
            if (endCol > startCol) {
                arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+39} h${(endCol-startCol)*100 - 30} v-19 l30 30 l-30 30 v-19 h${-((endCol-startCol)*100 - 30)} Z`);

            } // Left 
            else if (endCol < startCol) {
                arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+39} h${(endCol-startCol)*100 + 30} v-19 l-30 30 l30 30 v-19 h${-((endCol-startCol)*100 + 30)} Z`);
            }

        } // Diagonal Arrows 
        else if (Math.abs(startCol - endCol) == Math.abs(startRow - endRow)) {
            // Diagonal Left Arrows
            if (startCol > endCol) {
                // Diagonal Left Down
                if (startRow > endRow) {
                    arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+50} m-30 15 l${(endCol-startCol)*100 + 45} ${((startRow-endRow)*100 - 45)} l-15 -15 v45 h45 l-15 -15 l${-((endCol-startCol)*100 + 45)} ${-((startRow-endRow)*100 - 45)} Z`);

                } // Diagonal Left Up 
                else if (startRow < endRow) {
                    arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+50} m-30 -15 l${(endCol-startCol)*100 + 45} ${((startRow-endRow)*100 + 45)} l-15 15 v-45 h45 l-15 15 l${-((endCol-startCol)*100 + 45)} ${-((startRow-endRow)*100 + 45)} Z`);
                }

            } // Diagonal Right Arrows 
            else if (startCol < endCol) {
                // Diagonal Right Down
                if (startRow > endRow) {
                    arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+50} m30 15 l${(endCol-startCol)*100 - 45} ${((startRow-endRow)*100 - 45)} l15 -15 v45 h-45 l15 -15 l${-((endCol-startCol)*100 - 45)} ${-((startRow-endRow)*100 - 45)} Z`);

                } // Diagonal Right Up 
                else if (startRow < endRow) {
                    arrow.setAttribute("d", `M${(startCol*100)-50} ${(8 - startRow)*100+50} m30 -15 l${(endCol-startCol)*100 - 45} ${((startRow-endRow)*100 + 45)} l15 15 v-45 h-45 l15 15 l${-((endCol-startCol)*100 - 45)} ${-((startRow-endRow)*100 + 45)} Z`);
                }
            }
        }
        arrows.appendChild(arrow);
    }
    grabPiece(event) {
        let piece = event.target;
        let pieceType = event.target.classList[1].split("-")[1];
        if (pieceType == "king") {
            this.createMoveMarkers(this.kingMoves(event));
        } else if (pieceType == "rook") {
            this.createMoveMarkers(this.rookMoves(event));
        } else if (pieceType == "queen") {
            this.createMoveMarkers(this.queenMoves(event));
        } else if (pieceType == "pawn") {
            this.createMoveMarkers(this.pawnMoves(event));
        } else if (pieceType == "knight") {
            this.createMoveMarkers(this.knightMoves(event));
        } else if (pieceType == "bishop") {
            this.createMoveMarkers(this.bishopMoves(event));
        }
        let pieceList = document.querySelector(".pieces");
        let newPiece = piece.cloneNode();
        let offsetX = event.offsetX;
        let offsetY = event.offsetY;
        piece.remove();
        this.isPieceGrabbed = true;
        this.pieceGrabbed = `${newPiece.getAttribute("row")}${newPiece.getAttribute("col")}`;
        newPiece.setAttribute("x", offsetX - 50);
        newPiece.setAttribute("y", offsetY - 50);
        pieceList.appendChild(newPiece);
    }
    movePiece(event) {
        let piece = event.target;
        piece.setAttribute("x", event.offsetX - 50);
        piece.setAttribute("y", event.offsetY - 50);
    }
    dropPiece(event) {
        let piece = event.target;
        let offsetX = event.offsetX;
        let offsetY = event.offsetY;
        let newX = Math.floor(offsetX / 100) + 1;
        let newY = (8 - Math.floor(offsetY / 100));
        let moveMarkers = document.querySelector(".move-markers");
        if (!document.querySelector(`.move-marker[row="${newY}"][col="${newX}"]`)) {
            piece.setAttribute("x", (piece.getAttribute("col") - 1) * 100);
            piece.setAttribute("y", (8 - piece.getAttribute("row")) * 100);
            moveMarkers.innerHTML = "";
            return 0;
        }
        piece.setAttribute("x", Math.floor(offsetX / 100) * 100);
        piece.setAttribute("y", Math.floor(offsetY / 100) * 100);
        let newRow = 8 - parseInt(piece.getAttribute("y")) / 100;
        let newCol = (parseInt(piece.getAttribute("x")) / 100) + 1;
        if (!!document.querySelector(`[row="${newRow}"][col="${newCol}"].piece`)) {
            this.capturePiece(newRow, newCol);
        }
        piece.setAttribute("row", newRow);
        piece.setAttribute("col", newCol);
        if ((piece.classList[1].split("-")[1] == "pawn" || piece.classList[1].split("-")[1] == "rook" || piece.classList[1].split("-")[1] == "king") && !!piece.getAttribute("notmoved")) {
            piece.removeAttribute("notmoved");
        }
        moveMarkers.innerHTML = "";
        this.checkChecker(event);
    }
    pawnMoves(event) {
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = event.target.classList[1].split("-")[0];
        let hasMoved = !!event.target.getAttribute("notmoved") ? false : true;
        let validMoves = [];
        // Creates list of ALL possible moves
        if (pieceColour == "white") {
            validMoves.push(`${currentRow + 1}${currentCol}`);
            if (!!document.querySelectorAll(`[row="${currentRow+1}"][col="${currentCol+1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow+1}"][col="${currentCol+1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow + 1}${currentCol + 1}`);
            }
            if (!!document.querySelectorAll(`[row="${currentRow+1}"][col="${currentCol-1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow+1}"][col="${currentCol-1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow + 1}${currentCol - 1}`);
            }
            if (!hasMoved) {
                validMoves.push(`${currentRow + 2}${currentCol}`);
            }
        } else if (pieceColour == "black") {
            validMoves.push(`${currentRow - 1}${currentCol}`);
            if (!!document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol+1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol+1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow - 1}${currentCol + 1}`);
            }
            if (!!document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol-1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol-1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow - 1}${currentCol - 1}`);
            }
            if (!hasMoved) {
                validMoves.push(`${currentRow - 2}${currentCol}`);
            }
        }

        // Filters list of all moves to only valid moves using breakpoints
        validMoves = validMoves.filter(function(move) {
            let pieceTest = false;
            let testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            // checks if the piece on an existing square is of the opposite colour
            if (!!testSquare) {
                if (currentCol == move[1]) {
                    pieceTest = testSquare.classList[1].split("-")[0];
                }
            }
            return !move.includes('0') && !move.includes('9') && !move.includes("-") && !(move.length > 2) && move != `${currentRow}${currentCol}` && !pieceTest;
        }, this);
        return validMoves;
    }
    knightMoves(event) {
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = event.target.classList[1].split("-")[0];
        let validMoves = [];
        // Creates list of ALL possible moves
        validMoves.push(`${currentRow + 2}${currentCol + 1}`);
        validMoves.push(`${currentRow + 2}${currentCol - 1}`);
        validMoves.push(`${currentRow - 2}${currentCol + 1}`);
        validMoves.push(`${currentRow - 2}${currentCol - 1}`);
        validMoves.push(`${currentRow + 1}${currentCol + 2}`);
        validMoves.push(`${currentRow + 1}${currentCol - 2}`);
        validMoves.push(`${currentRow - 1}${currentCol + 2}`);
        validMoves.push(`${currentRow - 1}${currentCol - 2}`);

        // Filters list of all moves to only valid moves using breakpoints
        validMoves = validMoves.filter(function(move) {
            let pieceTest = false;
            let testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            // checks if the piece on an existing square is of the opposite colour
            if (!!testSquare) {
                pieceTest = testSquare.classList[1].split("-")[0] == pieceColour;
            }
            return !move.includes('0') && !move.includes('9') && !move.includes("-") && !(move.length > 2) && move != `${currentRow}${currentCol}` && !pieceTest;
        }, this);
        return validMoves;
    }
    bishopMoves(event) {
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = event.target.classList[1].split("-")[0];
        let testSquare;
        let validMoves = [];
        // Creates list of ALL possible moves
        for (let switcher = 0; switcher < 4; switcher++) {
            for (let dir = 1; dir < 8; dir++) {
                if (this.breakBishop) {
                    this.breakBishop = false
                    break;
                }
                if (switcher == 0) {
                    validMoves.push(`${currentRow + dir}${currentCol + dir}`);
                    testSquare = document.querySelectorAll(`[row="${currentRow + dir}"][col="${currentCol + dir}"].piece`)[0];
                    if (!!testSquare) { this.breakBishop = true }
                } else if (switcher == 1) {
                    validMoves.push(`${currentRow + dir}${currentCol - dir}`);
                    testSquare = document.querySelectorAll(`[row="${currentRow + dir}"][col="${currentCol - dir}"].piece`)[0];
                    if (!!testSquare) { this.breakBishop = true }
                } else if (switcher == 2) {
                    validMoves.push(`${currentRow - dir}${currentCol + dir}`);
                    testSquare = document.querySelectorAll(`[row="${currentRow - dir}"][col="${currentCol + dir}"].piece`)[0];
                    if (!!testSquare) { this.breakBishop = true }
                } else if (switcher == 3) {
                    validMoves.push(`${currentRow - dir}${currentCol - dir}`);
                    testSquare = document.querySelectorAll(`[row="${currentRow - dir}"][col="${currentCol - dir}"].piece`)[0];
                    if (!!testSquare) { this.breakBishop = true }
                }
            }
        }
        // Filters list of all moves to only valid moves using breakpoints
        validMoves = validMoves.filter(function(move) {
            let pieceTest = false;
            let testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            if (!!testSquare) {
                pieceTest = testSquare.classList[1].split("-")[0] == pieceColour;
            }
            return !move.includes('0') && !move.includes('9') && !move.includes("-") && !(move.length > 2) && move != `${currentRow}${currentCol}` && !pieceTest;
        }, this);
        return validMoves;
    }
    rookMoves(event) {
        this.breakColLeft = 0;
        this.breakColRight = 9;
        this.breakRowTop = 9;
        this.breakRowBottom = 0;
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = event.target.classList[1].split("-")[0];
        let testSquare;
        let validMoves = [];
        // Creates list of ALL possible moves
        for (let switcher = 0; switcher < 2; switcher++) {
            for (let dir = 0; dir < 8; dir++) {
                if (switcher == 0) {
                    validMoves.push(`${currentRow}${currentCol + dir}`);
                    validMoves.push(`${currentRow}${currentCol - dir}`);
                } else if (switcher == 1) {
                    validMoves.push(`${currentRow + dir}${currentCol}`);
                    validMoves.push(`${currentRow - dir}${currentCol}`);
                }
            }
        }
        // Creates breakpoints regarding pieces
        for (let move of validMoves) {
            testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            if (!!testSquare) {
                if (testSquare.getAttribute("row") == currentRow) {
                    if (testSquare.getAttribute("col") == currentCol) { continue; }
                    if (testSquare.getAttribute("col") < currentCol) {
                        this.breakColLeft = Math.max(parseInt(testSquare.getAttribute("col")), this.breakColLeft);
                    } else {
                        this.breakColRight = Math.min(parseInt(testSquare.getAttribute("col")), this.breakColRight);
                    }
                } else if (testSquare.getAttribute("col") == currentCol) {
                    if (testSquare.getAttribute("row") == currentRow) { continue; }
                    if (testSquare.getAttribute("row") < currentRow) {
                        this.breakRowBottom = Math.max(parseInt(testSquare.getAttribute("row")), this.breakRowBottom);
                    } else {
                        this.breakRowTop = Math.min(parseInt(testSquare.getAttribute("row")), this.breakRowTop);
                    }
                }
            }
        }
        // Filters list of all moves to only valid moves using breakpoints
        validMoves = validMoves.filter(function(move) {
            let pieceTest = false;
            let testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            // checks if the piece on an existing square is of the opposite colour
            if (!!testSquare) {
                pieceTest = testSquare.classList[1].split("-")[0] == pieceColour;
            }
            return !move.includes('0') && !move.includes('9') && !move.includes("-") && !(move.length > 2) && move != `${currentRow}${currentCol}` && !pieceTest && (parseInt(move[1]) <= this.breakColRight && parseInt(move[1]) >= this.breakColLeft) && (parseInt(move[0]) <= this.breakRowTop && parseInt(move[0]) >= this.breakRowBottom);
        }, this);
        return validMoves;
    }
    queenMoves(event) {
        let validMoves = [];
        validMoves = validMoves.concat(this.rookMoves(event));
        validMoves = validMoves.concat(this.bishopMoves(event));
        return validMoves;
    }
    kingMoves(event) {
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = event.target.classList[1].split("-")[0];
        let validMoves = [];
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                if (row == 0) {
                    validMoves.push(`${currentRow}${currentCol + col}`);
                    validMoves.push(`${currentRow}${currentCol - col}`);
                } else if (col == 0) {
                    validMoves.push(`${currentRow + row}${currentCol}`);
                    validMoves.push(`${currentRow - row}${currentCol}`);
                } else {
                    validMoves.push(`${currentRow + row}${currentCol + col}`);
                    validMoves.push(`${currentRow - row}${currentCol + col}`);
                    validMoves.push(`${currentRow + row}${currentCol - col}`);
                    validMoves.push(`${currentRow - row}${currentCol - col}`);
                }
            }
        }
        validMoves = validMoves.filter(function(move) {
            let pieceTest = false;
            // checks if the piece on an existing square is of the opposite colour
            if (!!document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0]) {
                pieceTest = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour;
            }
            return !move.includes('0') && !move.includes('9') && move != `${currentRow}${currentCol}` && !pieceTest;
        });
        return validMoves;
    }
    createMoveMarkers(moveList) {
        let moveMarkers = document.querySelector(".move-markers");
        let moveMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        moveMarker.setAttribute("r", 15);
        moveMarker.setAttribute("fill", "blue");
        moveMarker.classList.add("move-marker");
        for (let validMove of moveList) {
            let tempRow = validMove[0];
            let tempCol = validMove[1];
            let tempMarker = moveMarker.cloneNode();
            tempMarker.setAttribute("row", tempRow);
            tempMarker.setAttribute("col", tempCol);
            tempMarker.setAttribute("cx", tempCol * 100 - 50);
            tempMarker.setAttribute("cy", (9 - tempRow) * 100 - 50);
            moveMarkers.appendChild(tempMarker);
        }
    }
    capturePiece(row, col) {
        document.querySelector(`[row="${row}"][col="${col}"].piece`).remove();
    }
    checkChecker(event) {
        let validRookMoves = this.rookMoves(event);
        let validBishopMoves = this.bishopMoves(event);
        let validKnightMoves = this.knightMoves(event);

        validRookMoves.forEach(validMove => {
            let tempRow = validMove[0];
            let tempCol = validMove[1];
            if (!!document.querySelector(`[row="${tempRow}"][col="${tempCol}"].piece`)) {
                let pieceType = document.querySelector(`[row="${tempRow}"][col="${tempCol}"].piece`);
                console.log(pieceType);
            }
        });
    }
    createDialogue(dialogueOptions) {
        let dialogue = document.createElement("div");
        dialogue.classList.add("dialogue-box");
        if (dialogueOptions.settings == "chessSettings") {
            console.log(dialogueOptions.settings);
            let boardTheme = document.createElement("select");
            boardTheme.id = "board-theme";
            boardTheme.name = "board-theme";
            for (let theme in this.boardOptions) {
                let tempTheme = document.createElement("option");
                tempTheme.value = theme;
                tempTheme.innerHTML = this.boardOptions[theme];
                boardTheme.append(tempTheme);
            }
            let settingLabel = document.createElement("label");
            settingLabel.setAttribute("for", "board-theme")
            settingLabel.classList.add("settings-label");
            settingLabel.innerHTML = "Board Theme";
            let settingsGroup = document.createElement("div");
            settingsGroup.classList.add("settings-group");
            settingsGroup.appendChild(settingLabel);
            settingsGroup.appendChild(boardTheme);
            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.classList.add("save-button");
            saveButton.setAttribute("onclick", "chessboard.saveChessSettings()");
            dialogue.appendChild(settingsGroup);
            dialogue.appendChild(saveButton);
            return dialogue;
        }
    }
    openChessSettings() {
        let settingsGroup = this.createDialogue({ "settings": "chessSettings" });
        console.log(settingsGroup);
        document.querySelector("main").appendChild(settingsGroup);
    }
    saveChessSettings() {
        let chosenTheme = document.getElementById("board-theme");
        console.log(chosenTheme);
        localStorage.setItem("chessSettings", JSON.stringify({
            "boardTheme": chosenTheme.value
        }))
        document.querySelectorAll(".light").forEach(square => { square.setAttribute("fill", this.themeColours[chosenTheme.value].light) }, this)
        document.querySelectorAll(".dark").forEach(square => { square.setAttribute("fill", this.themeColours[chosenTheme.value].dark) }, this)
        document.querySelector(".dialogue-box").remove();
        console.log("%cSettings Saved.", "color: red; font-size: 16px;")
    }
    handleEvent(event) {
        // mousedown events
        if (event.type == "mousedown") {
            if (event.button == "2") {
                this.startingSquare = event.target;
            } else if (event.button == "0") {
                if (event.target.classList.contains("piece")) {
                    this.grabPiece(event);
                }
            }
            if (this.pieceGrabbed) {
                document.querySelector(".arrows").innerHTML = "";
            }
        } // mouse up events
        else if (event.type == "mouseup") {
            if (event.button == "2") {
                this.endingSquare = event.target;
                if (this.startingSquare != this.endingSquare) {
                    this.drawArrow(this.startingSquare, this.endingSquare);
                }
            } else if (event.button == "0") {
                document.querySelector(".arrows").innerHTML = "";
                if (this.pieceGrabbed) {
                    this.dropPiece(event);
                    this.pieceGrabbed = "";
                    this.isPieceGrabbed = false;
                    this.breakColLeft = 0;
                    this.breakColRight = 9;
                    this.breakRowTop = 9;
                    this.breakRowBottom = 0;
                }
            }
        } // mouse move events
        else if (event.type == "mousemove") {
            if (event.buttons == "1") {
                if (event.target.classList.contains("piece")) {
                    let checker = `${event.target.getAttribute("row")}${event.target.getAttribute("col")}`;
                    if (checker == this.pieceGrabbed) {
                        this.movePiece(event);
                    }
                }
            }
        }
    }
}