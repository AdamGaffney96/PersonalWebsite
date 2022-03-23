class Chess {
    constructor(perspective = "white") {
        this.boardTheme = "dark1";
        this.boardOptions = { "dark1": "Dark Board", "blue1": "Blue Ocean", "green1": "Green Forest" };
        this.themeColours = { "dark1": { "dark": "hsl(190, 20%, 20%)", "light": "hsl(0, 0%, 87%)", "moveMarker": "hsl(27, 100%, 60%)" }, "blue1": { "dark": "hsl(195, 100%, 25%)", "light": "hsl(0, 0%, 87%)", "moveMarker": "hsl(130, 60%, 45%)" }, "green1": { "dark": "hsl(99, 60%, 25%)", "light": "hsl(0, 0%, 87%)", "moveMarker": "hsl(10, 50%, 25%)" } }
        this.startingSquare;
        this.arrowColour = this.themeColours[this.boardTheme].moveMarker;
        this.moveMarkerColour = this.themeColours[this.boardTheme].moveMarker;
        this.endingSquare;
        this.isPieceGrabbed;
        this.letterObj = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" };
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
        this.loadChessSettings();
    }
    buildBoard() {
        this.createSVGs();
        this.createBoard(this.boardTheme);
        this.addBoardOverlay();
        this.setUpPieces();
        if (this.perspective == 'black') {
            this.flipBoard();
        }
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
        let border = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // border attributes
        border.setAttribute("d", `M0 0 L800 0 L800 800 L0 800 L0 0`);
        border.setAttribute("stroke", `black`);
        border.setAttribute("stroke-width", `1`);
        border.setAttribute("fill", `none`);
        boardOverlay.appendChild(border);
        this.boardIdentifiers();
    }
    boardIdentifiers() {
        let boardOverlay = document.querySelector(".board-overlay");
        document.querySelectorAll(".identifier").forEach(ident => { ident.remove(); })
        let ident = document.createElementNS("http://www.w3.org/2000/svg", "text");
        ident.classList.add("identifier");
        ident.setAttribute("fill", "black");
        for (let [key, value] of Object.entries(this.letterObj)) {
            let tempIdentNum = ident.cloneNode();
            let tempIdentLetter = ident.cloneNode();
            if (this.perspective == "white") {
                tempIdentNum.setAttribute("x", `3`);
                tempIdentLetter.setAttribute("x", `${100*(key-1)+88}`);
                tempIdentNum.setAttribute("y", `${100*(8-key)+18}`);
                tempIdentLetter.setAttribute("y", `793`);
            } else {
                tempIdentNum.setAttribute("x", `797`);
                tempIdentLetter.setAttribute("x", `${100*(key-1)+88}`);
                tempIdentNum.setAttribute("y", `${100*(8-key)+18}`);
                tempIdentLetter.setAttribute("y", `7`);
            }
            tempIdentNum.innerHTML = key;
            tempIdentLetter.innerHTML = value;
            boardOverlay.appendChild(tempIdentLetter);
            boardOverlay.appendChild(tempIdentNum);
        }
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
        } // Knight Arrows
        else if ((Math.abs(startCol - endCol) == 1 && Math.abs(startRow - endRow) == 2) || (Math.abs(startRow - endRow) == 1 && Math.abs(startCol - endCol) == 2)) {
            // Vertical Knight Arrows
            if (Math.abs(startCol - endCol) == 1) {
                // Right
                if (startCol < endCol) {
                    // Up
                    if (startRow < endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-20} ${(8 - startRow)*100+39} h60 v-160 h-19 l30 -30 l30 30 h-19 v182 h-82 Z`);
                    } // Down
                    else if (startRow > endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-20} ${(8 - startRow)*100+61} h60 v160 h-19 l30 30 l30 -30 h-19 v-182 h-82 Z`);
                    }
                } // Left
                else if (startCol > endCol) {
                    // Up
                    if (startRow < endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-80} ${(8 - startRow)*100+39} h-60 v-160 h19 l-30 -30 l-30 30 h19 v182 h82 Z`);
                    } // Down
                    else if (startRow > endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-80} ${(8 - startRow)*100+61} h-60 v160 h19 l-30 30 l-30 -30 h19 v-182 h82 Z`);
                    }
                }
            } // Horizonal Knight Arrows
            else if (Math.abs(startCol - endCol) == 2) {
                // Right
                if (startCol < endCol) {
                    // Up
                    if (startRow < endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-20} ${(8 - startRow)*100+39} h160 v-60 h-19 l30 -30 l30 30 h-19 v82 h-182 Z`);
                    } // Down
                    else if (startRow > endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-20} ${(8 - startRow)*100+61} h160 v60 h-19 l30 30 l30 -30 h-19 v-82 h-182 Z`);
                    }
                } // Left
                else if (startCol > endCol) {
                    // Up
                    if (startRow < endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-80} ${(8 - startRow)*100+39} h-160 v-60 h19 l-30 -30 l-30 30 h19 v82 h182 Z`);
                    } // Down
                    else if (startRow > endRow) {
                        arrow.setAttribute("d", `M${(startCol*100)-80} ${(8 - startRow)*100+61} h-160 v60 h19 l-30 30 l-30 -30 h19 v-82 h182 Z`);
                    }
                }
            }
        }
        arrows.appendChild(arrow);
    }
    flipBoard() {
        let svg = document.querySelector(".overlays");
        if (!!svg.getAttribute("transform")) {
            svg.removeAttribute("transform");
            document.querySelectorAll(".piece").forEach(piece => {
                piece.setAttribute("href", piece.getAttribute("href").replace(" flipped", ""));
            })
        } else {
            svg.setAttribute("transform", 'scale(-1,-1)');
            document.querySelectorAll(".piece").forEach(piece => {
                piece.setAttribute("href", piece.getAttribute("href").replace(".png", " flipped.png"));
            })
        }
        if (this.perspective == 'white') {
            this.perspective = 'black';
        } else {
            this.perspective = 'white';
        }
        this.boardIdentifiers();
    }
    grabPiece(event) {
        let piece = event.target;
        this.isPieceGrabbed = true;
        this.pieceGrabbed = `${piece.getAttribute("row")}${piece.getAttribute("col")}`;
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
        newPiece.setAttribute("x", offsetX - 50);
        newPiece.setAttribute("y", offsetY - 50);
        pieceList.appendChild(newPiece);
    }
    movePiece(event, pieceToMove) {
        let piece = document.querySelector(`[row="${pieceToMove[0]}"][col="${pieceToMove[1]}"].piece`);
        piece.setAttribute("x", event.offsetX - 50);
        piece.setAttribute("y", event.offsetY - 50);
    }
    dropPiece(event) {
        let piece = document.querySelector(`[row="${this.pieceGrabbed[0]}"][col="${this.pieceGrabbed[1]}"].piece`);
        let pieceColour = piece.classList[1].split("-")[0];
        let offsetX = event.offsetX;
        let offsetY = event.offsetY;
        let newX = Math.floor(offsetX / 100) + 1;
        let newY = (8 - Math.floor(offsetY / 100));
        let moveMarkers = document.querySelector(".move-markers");
        if (!document.querySelector(`.move-marker[row="${newY}"][col="${newX}"]`) || !event.target.classList.contains("piece")) {
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
        } else if (piece.classList[1].split("-")[1] == "pawn" && Math.abs(newRow - piece.getAttribute("row")) == 1 && Math.abs(newCol - piece.getAttribute("col")) == 1 && !document.querySelector(`[row="${newRow}"][col="${newCol}"].piece`)) {
            if (pieceColour == "white") {
                this.capturePiece(newRow - 1, newCol);
            } else if (pieceColour == "black") {
                this.capturePiece(newRow + 1, newCol);
            }
        }
        document.querySelectorAll(["[enpassant]"]).forEach(element => { element.removeAttribute("enpassant") });
        if (piece.classList[1].split("-")[1] == "pawn" && Math.abs(piece.getAttribute("row") - newRow) == 2) {
            if (!!document.querySelector(`[row="${newRow}"][col="${newCol+1}"].piece`) && document.querySelector(`[row="${newRow}"][col="${newCol+1}"].piece`).classList[1].split("-")[1] == "pawn" && document.querySelector(`[row="${newRow}"][col="${newCol+1}"].piece`).classList[1].split("-")[0] != pieceColour) {
                document.querySelector(`[row="${newRow}"][col="${newCol+1}"].piece`).setAttribute("enpassant", "left");
            } else if (!!document.querySelector(`[row="${newRow}"][col="${newCol-1}"].piece`) && document.querySelector(`[row="${newRow}"][col="${newCol-1}"].piece`).classList[1].split("-")[1] == "pawn" && document.querySelector(`[row="${newRow}"][col="${newCol-1}"].piece`).classList[1].split("-")[0] != pieceColour) {
                document.querySelector(`[row="${newRow}"][col="${newCol-1}"].piece`).setAttribute("enpassant", "right");
            }
        }
        piece.setAttribute("row", newRow);
        piece.setAttribute("col", newCol);
        if ((piece.classList[1].split("-")[1] == "pawn" || piece.classList[1].split("-")[1] == "rook" || piece.classList[1].split("-")[1] == "king") && !!piece.getAttribute("notmoved")) {
            piece.removeAttribute("notmoved");
        }
        let opponentKing = document.querySelector(`.${piece.classList[1].split("-")[0] == 'white' ? 'black' : 'white'}-king`);
        let playerKing = document.querySelector(`.${piece.classList[1].split("-")[0]}-king`);
        let opponentKingSquare = `${opponentKing.getAttribute("row")}${opponentKing.getAttribute("col")}`;
        let kingChecked = this.kingInCheckIfMoves(event, opponentKingSquare, piece.classList[1].split("-")[0] == 'white' ? 'black' : 'white');
        if (kingChecked) {
            if (opponentKing.getAttribute("href").includes("flipped")) {
                opponentKing.setAttribute("href", opponentKing.getAttribute("href").replace(" flipped.png", " check flipped.png"));
            } else {
                opponentKing.setAttribute("href", opponentKing.getAttribute("href").replace(".png", " check.png"));
            }
            playerKing.setAttribute("href", playerKing.getAttribute("href").replace(" check", ""));
        } else {
            if (opponentKing.getAttribute("href").includes("check")) {
                opponentKing.setAttribute("href", opponentKing.getAttribute("href").replace(" check", ""));
            }
            playerKing.setAttribute("href", playerKing.getAttribute("href").replace(" check", ""));
        }
        moveMarkers.innerHTML = "";
    }
    pawnMoves(event, colourMoved = event.target.classList[1].split("-")[0]) {
        let currentRow = parseInt(event.target.getAttribute("row"));
        let currentCol = parseInt(event.target.getAttribute("col"));
        let pieceColour = colourMoved;
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
            if (!hasMoved && !document.querySelector(`[row="${currentRow+1}"][col="${currentCol}"].piece`) && !document.querySelector(`[row="${currentRow+2}"][col="${currentCol}"].piece`)) {
                validMoves.push(`${currentRow + 2}${currentCol}`);
            }
            if (!!event.target.getAttribute("enpassant")) {
                let direction = event.target.getAttribute("enpassant");
                if (direction == "left") {
                    validMoves.push(`${currentRow+1}${currentCol-1}`);
                } else if (direction == "right") {
                    validMoves.push(`${currentRow+1}${currentCol+1}`);
                }
            }
        } else if (pieceColour == "black") {
            validMoves.push(`${currentRow - 1}${currentCol}`);
            if (!!document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol+1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol+1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow - 1}${currentCol + 1}`);
            }
            if (!!document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol-1}"].piece`)[0] && document.querySelectorAll(`[row="${currentRow-1}"][col="${currentCol-1}"].piece`)[0].classList[1].split("-")[0] != pieceColour) {
                validMoves.push(`${currentRow - 1}${currentCol - 1}`);
            }
            if (!hasMoved && !document.querySelector(`[row="${currentRow-1}"][col="${currentCol}"].piece`) && !document.querySelector(`[row="${currentRow-2}"][col="${currentCol}"].piece`)) {
                validMoves.push(`${currentRow - 2}${currentCol}`);
            }
            if (!!event.target.getAttribute("enpassant")) {
                let direction = event.target.getAttribute("enpassant");
                if (direction == "left") {
                    validMoves.push(`${currentRow-1}${currentCol-1}`);
                } else if (direction == "right") {
                    validMoves.push(`${currentRow-1}${currentCol+1}`);
                }
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
    knightMoves(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col")), colourMoved = event.target.classList[1].split("-")[0]) {
        let pieceColour = colourMoved;
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
    bishopMoves(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col")), colourMoved = event.target.classList[1].split("-")[0]) {
        let pieceColour = colourMoved;
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
    rookMoves(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col")), colourMoved = event.target.classList[1].split("-")[0]) {
        this.breakColLeft = 0;
        this.breakColRight = 9;
        this.breakRowTop = 9;
        this.breakRowBottom = 0;
        let pieceColour = colourMoved;
        let pinnedPiece = true;
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
            let pinnedPiece = false;
            let testSquare = document.querySelectorAll(`[row="${move[0]}"][col="${move[1]}"].piece`)[0];
            // checks if the piece on an existing square is of the opposite colour
            if (!!testSquare) {
                pieceTest = testSquare.classList[1].split("-")[0] == pieceColour;
            }
            return !move.includes('0') && !move.includes('9') && !move.includes("-") && !(move.length > 2) && move != `${currentRow}${currentCol}` && !pieceTest && (parseInt(move[1]) <= this.breakColRight && parseInt(move[1]) >= this.breakColLeft) && (parseInt(move[0]) <= this.breakRowTop && parseInt(move[0]) >= this.breakRowBottom);
        }, this);
        return validMoves;
    }
    queenMoves(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col"))) {
        let validMoves = [];
        validMoves = validMoves.concat(this.rookMoves(event, currentRow, currentCol));
        validMoves = validMoves.concat(this.bishopMoves(event, currentRow, currentCol));
        return validMoves;
    }
    kingMovesForCheckFinder(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col"))) {
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
        }, this);
        return validMoves;
    }
    kingMoves(event, currentRow = parseInt(event.target.getAttribute("row")), currentCol = parseInt(event.target.getAttribute("col"))) {
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
            return !move.includes('0') && !move.includes('9') && move != `${currentRow}${currentCol}` && !pieceTest && !this.kingInCheckIfMoves(event, move);
        }, this);
        return validMoves;
    }
    createMoveMarkers(moveList) {
        let moveMarkers = document.querySelector(".move-markers");
        let moveMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        moveMarker.classList.add("move-marker");
        for (let validMove of moveList) {
            let tempRow = validMove[0];
            let tempCol = validMove[1];
            let tempMarker = moveMarker.cloneNode();
            if (!!document.querySelector(`[row="${tempRow}"][col="${tempCol}"].piece`)) {
                tempMarker.setAttribute("r", 47);
                tempMarker.setAttribute("fill", "none");
                tempMarker.setAttribute("stroke-width", "5");
                tempMarker.setAttribute("stroke", this.moveMarkerColour);
                tempMarker.setAttribute("row", tempRow);
                tempMarker.setAttribute("col", tempCol);
                tempMarker.setAttribute("cx", tempCol * 100 - 50);
                tempMarker.setAttribute("cy", (9 - tempRow) * 100 - 50);
            } else {
                tempMarker.setAttribute("r", 15);
                tempMarker.setAttribute("fill", this.moveMarkerColour);
                tempMarker.setAttribute("row", tempRow);
                tempMarker.setAttribute("col", tempCol);
                tempMarker.setAttribute("cx", tempCol * 100 - 50);
                tempMarker.setAttribute("cy", (9 - tempRow) * 100 - 50);
            }
            moveMarkers.appendChild(tempMarker);
        }
    }
    capturePiece(row, col) {
        document.querySelector(`[row="${row}"][col="${col}"].piece`).remove();
    }
    createDialogue(dialogueOptions) {
        let dialogue = document.createElement("div");
        dialogue.classList.add("dialogue-box");
        if (dialogueOptions.settings == "chessSettings") {
            dialogue.classList.add("chess-settings-dialogue");
            let boardTheme = document.createElement("select");
            boardTheme.id = "board-theme";
            boardTheme.name = "board-theme";
            let moveMarkerToggle = document.createElement("input")
            moveMarkerToggle.type = "radio";
            moveMarkerToggle.name = "show-move-markers";
            moveMarkerToggle.id = "show-toggle";
            moveMarkerToggle.value = "show";
            let moveMarkerToggle2 = document.createElement("input")
            moveMarkerToggle2.type = "radio";
            moveMarkerToggle2.name = "show-move-markers";
            moveMarkerToggle2.id = "hide-toggle";
            moveMarkerToggle2.value = "hide";
            let radioButtons = document.createElement("div");
            radioButtons.classList.add("radio-group");
            if (!localStorage.getItem("chessSettings") || JSON.parse(localStorage.getItem("chessSettings")).moveMarkers == "show") {
                moveMarkerToggle.checked = true;
                moveMarkerToggle2.checked = false;
            } else {
                moveMarkerToggle2.checked = true;
                moveMarkerToggle.checked = false;
            }
            for (let theme in this.boardOptions) {
                let tempTheme = document.createElement("option");
                tempTheme.value = theme;
                tempTheme.innerHTML = this.boardOptions[theme];
                if (theme == this.boardTheme) {
                    tempTheme.selected = true;
                }
                boardTheme.append(tempTheme);
            }
            let settingLabel = document.createElement("label");
            settingLabel.classList.add("settings-label");
            let themeLabel = settingLabel.cloneNode();
            themeLabel.setAttribute("for", "board-theme")
            themeLabel.innerHTML = "Board Theme";
            let markerLabel = settingLabel.cloneNode();
            markerLabel.setAttribute("for", "show-move-markers");
            markerLabel.innerHTML = "Show Legal Moves";
            let moveMarkerLabel1 = settingLabel.cloneNode();
            moveMarkerLabel1.setAttribute("for", "show-toggle");
            moveMarkerLabel1.innerHTML = "Show";
            let moveMarkerLabel2 = settingLabel.cloneNode();
            moveMarkerLabel2.setAttribute("for", "Hide-toggle");
            moveMarkerLabel2.innerHTML = "Hide";
            let settingsGroup = document.createElement("div");
            settingsGroup.classList.add("settings-group");
            let themeGroup = settingsGroup.cloneNode();
            let markerGroup = settingsGroup.cloneNode();
            themeGroup.appendChild(themeLabel);
            themeGroup.appendChild(boardTheme);
            markerGroup.appendChild(markerLabel);
            radioButtons.appendChild(moveMarkerLabel1);
            radioButtons.appendChild(moveMarkerToggle);
            radioButtons.appendChild(moveMarkerLabel2);
            radioButtons.appendChild(moveMarkerToggle2);
            markerGroup.appendChild(radioButtons);
            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.classList.add("save-button");
            saveButton.classList.add("button");
            saveButton.setAttribute("onclick", "chessboard.saveChessSettings()");
            let closeButton = document.createElement("button");
            closeButton.innerHTML = "Close";
            closeButton.classList.add("close-button");
            closeButton.classList.add("button");
            closeButton.setAttribute("onclick", "chessboard.closeDialogue()");
            let buttonGroup = document.createElement("div");
            buttonGroup.classList.add("buttons-group");
            dialogue.appendChild(themeGroup);
            dialogue.appendChild(markerGroup);
            buttonGroup.appendChild(saveButton);
            buttonGroup.appendChild(closeButton);
            dialogue.appendChild(buttonGroup);
        } else if (dialogueOptions.settings == "shortcuts") {
            // Create base elements
            dialogue.classList.add("keyboard-shortcuts-dialogue");
            let baseDiv = document.createElement("div");
            let basePara = document.createElement("p");
            let shortcutsGroup = baseDiv.cloneNode();
            shortcutsGroup.classList.add("settings-group");
            let shortcutName = basePara.cloneNode();
            shortcutName.classList.add("shortcut-label");
            let shortcutDesc = basePara.cloneNode();
            shortcutDesc.classList.add("shortcut-description");
            let shortcutKeys = basePara.cloneNode();
            shortcutKeys.classList.add("shortcut-keys");
            // Create and add unique elements
            let keyObj = {
                "navigate": { "name": "Page Navigation", "desc": "Navigate selectable elements using the keyboard.", "keys": "Tab" },
                "escape": { "name": "Return to Menu Close", "desc": "When moving around the navigation bar using Tab, this returns to the menu close button.", "keys": "Esc" },
            }
            for (let entry in keyObj) {
                let tempObj = keyObj[entry];
                let tempGroup = shortcutsGroup.cloneNode();
                let tempName = shortcutName.cloneNode();
                let tempDesc = shortcutDesc.cloneNode();
                let tempKeys = shortcutKeys.cloneNode();
                tempName.innerHTML = tempObj.name;
                tempDesc.innerHTML = tempObj.desc;
                tempKeys.innerHTML = tempObj.keys;
                tempGroup.appendChild(tempName);
                tempGroup.appendChild(tempDesc);
                tempGroup.appendChild(tempKeys);
                dialogue.appendChild(tempGroup);
            }
            if (dialogueOptions.page == "chess") {

            }
        }
        return dialogue;
    }
    closeDialogue() {
        document.querySelector(".dialogue-box").remove();
        document.querySelector("main").style = null;
        document.querySelector(".dialogue-overlay").remove();
    }
    openChessSettings() {
        if (!!document.querySelector(".chess-settings-dialogue")) { return; }
        let settingsGroup = this.createDialogue({ "settings": "chessSettings" });
        document.querySelector("main").insertBefore(settingsGroup, document.querySelector(".chess-full-container"));
        document.querySelector(".dialogue-box").style.marginTop = `-${document.querySelector(".dialogue-box").offsetHeight/2}px`;
        document.querySelector(".dialogue-box").style.marginLeft = `-${document.querySelector(".dialogue-box").offsetWidth/2}px`;
        document.querySelector("main").style.pointerEvents = "none";
        let overlay = document.createElement("div");
        overlay.classList.add("dialogue-overlay");
        document.querySelector("body").insertBefore(overlay, document.querySelector(".sidebar-underlay"));
    }
    saveChessSettings() {
        let chosenTheme = document.getElementById("board-theme");
        let moveMarker = document.querySelector("input[name='show-move-markers']:checked");
        localStorage.setItem("chessSettings", JSON.stringify({
            "boardTheme": chosenTheme.value,
            "moveMarkers": moveMarker.value
        }))
        this.setBoardColours(chosenTheme.value);
        this.boardTheme = chosenTheme.value;
        this.setMoveMarkerColours(moveMarker.value)
        this.closeDialogue();
        console.log("%cSettings Saved.", "color: red; font-size: 16px;")
    }
    setBoardColours(chosenTheme) {
        document.querySelectorAll(".light").forEach(square => { square.setAttribute("fill", this.themeColours[chosenTheme].light) }, this)
        document.querySelectorAll(".dark").forEach(square => { square.setAttribute("fill", this.themeColours[chosenTheme].dark) }, this)
    }
    setMoveMarkerColours(moveMarker) {
        if (moveMarker == 'show') {
            this.moveMarkerColour = this.themeColours[this.boardTheme].moveMarker;
            this.arrowColour = this.themeColours[this.boardTheme].moveMarker;
        } else if (moveMarker == 'hide') {
            this.moveMarkerColour = "transparent";
        }
    }
    loadChessSettings() {
        if (!!localStorage.getItem("chessSettings")) {
            let chessSettings = JSON.parse(localStorage.getItem("chessSettings"));
            this.boardTheme = chessSettings.boardTheme;
            this.setMoveMarkerColours(chessSettings.moveMarkers);
        } else {
            console.log("%cNo local storage data found, using default settings.", "color: red; font-size: 16px;");
        }
        this.setBoardColours(this.boardTheme);
    }
    kingInCheckIfMoves(event, move, colourMoved = event.target.classList[1].split("-")[0]) {
        let tempRow = parseInt(move[0]);
        let tempCol = parseInt(move[1]);
        let pieceColour = colourMoved;
        let knightValidMoves;
        let rookValidMoves;
        let bishopValidMoves;
        let kingValidMoves;
        knightValidMoves = this.knightMoves(event, tempRow, tempCol, colourMoved);
        rookValidMoves = this.rookMoves(event, tempRow, tempCol, colourMoved);
        bishopValidMoves = this.bishopMoves(event, tempRow, tempCol, colourMoved);
        kingValidMoves = this.kingMovesForCheckFinder(event, tempRow, tempCol, colourMoved);
        let pawnValidMoves = [];
        if (pieceColour == 'white') {
            pawnValidMoves.push(`${tempRow + 1}${tempCol + 1}`);
            pawnValidMoves.push(`${tempRow + 1}${tempCol - 1}`);
        } else {
            pawnValidMoves.push(`${tempRow - 1}${tempCol + 1}`);
            pawnValidMoves.push(`${tempRow - 1}${tempCol - 1}`);
        }
        knightValidMoves = knightValidMoves.filter(function(square) {
            if (!!document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0]) {
                if (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour ||
                    document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "knight") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
        rookValidMoves = rookValidMoves.filter(function(square) {
            if (!!document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0]) {
                if (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour ||
                    (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "rook" && document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "queen")) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
        bishopValidMoves = bishopValidMoves.filter(function(square) {
            if (!!document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0]) {
                if (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour ||
                    (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "bishop" && document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "queen")) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
        pawnValidMoves = pawnValidMoves.filter(function(square) {
            if (!!document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0]) {
                if (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour ||
                    document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "pawn") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })
        kingValidMoves = kingValidMoves.filter(function(square) {
            if (!!document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0]) {
                if (document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[0] == pieceColour ||
                    document.querySelectorAll(`[row="${square[0]}"][col="${square[1]}"].piece`)[0].classList[1].split("-")[1] != "king") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })
        if (knightValidMoves.length != 0 || rookValidMoves != 0 || bishopValidMoves != 0 || pawnValidMoves != 0 || kingValidMoves != 0) {
            return true;
        }
        return false;
    }
    handleEvent(event) {
        // mousedown events
        if (event.type == "pointerdown") {
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
        else if (event.type == "pointerup") {
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
        else if (event.type == "pointermove") {
            const events = event.getCoalescedEvents();
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                if (event.buttons == "1") {
                    if (this.pieceGrabbed != "") {
                        this.movePiece(event, this.pieceGrabbed);
                    }
                }
            }
        } // key down events
        else if (event.type == "keydown") {
            console.log(event);
            if (event.code == "KeyF" && event.ctrlKey) {
                event.preventDefault();
                this.flipBoard();
            } else if (event.code == "Slash" && event.ctrlKey) {
                if (!!document.querySelector(".dialogue-box")) {
                    if (!!document.querySelector(".chess-settings-dialogue")) {
                        this.closeDialogue();
                        let dialogue = this.createDialogue({ "settings": "shortcuts", "page": "chess" });
                        document.querySelector("main").insertBefore(dialogue, document.querySelector(".chess-full-container"));
                        document.querySelector("main").style.pointerEvents = "none";
                        let overlay = document.createElement("div");
                        overlay.classList.add("dialogue-overlay");
                        document.querySelector("body").insertBefore(overlay, document.querySelector(".sidebar-underlay"));
                    } else {
                        this.closeDialogue();
                    }
                } else {
                    let dialogue = this.createDialogue({ "settings": "shortcuts", "page": "chess" });
                    document.querySelector("main").insertBefore(dialogue, document.querySelector(".chess-full-container"));
                    document.querySelector("main").style.pointerEvents = "none";
                    let overlay = document.createElement("div");
                    overlay.classList.add("dialogue-overlay");
                    document.querySelector("body").insertBefore(overlay, document.querySelector(".sidebar-underlay"));
                }
            } else if (event.code == "KeyS" && event.ctrlKey) {
                event.preventDefault();
                if (!!document.querySelector(".dialogue-box")) {
                    if (!!document.querySelector(".keyboard-shortcuts-dialogue")) {
                        this.closeDialogue();
                        this.openChessSettings();
                    } else {
                        this.closeDialogue();
                    }
                } else {
                    this.openChessSettings();
                }
            }
        }
    }
}