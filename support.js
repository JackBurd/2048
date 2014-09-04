documentWidth = 0.6*Math.min(window.screen.availWidth, window.screen.availHeight);
gridContainerWidth = 0.92 * documentWidth;
gridCellWidth = 0.18 * documentWidth;
gridCellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
    return i * (gridCellWidth+gridCellSpace) + gridCellSpace;
}

function getPosLeft(i, j) {
    return j * (gridCellWidth+gridCellSpace) + gridCellSpace;
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#edc850"; break;
        case 1024: return "#edc53f"; break;
        case 2048: return "#edc22e"; break;
        default: return "#3c3a32"; break;
    }
}

function getNumberColor(number){
    if(number <= 4){
        return "#776e65"
    }
    else{
        return "white";
    }
}

function getNumberFontSize(number){
    var pixel = 0.6 * gridCellWidth;
    var ratio = 0;

    switch(number.toString().length){
        case 1:
        case 2: ratio = 1; break;
        case 3: ratio = 0.8; break;
        case 4: ratio = 0.6; break;
    }

    return (pixel * ratio) + "px";
}

function noSpace(board){
    for(var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j] == 0){
                return false;
            }
        }
    }

    return true;
}

function noMove(board){
    if (canMoveLeft(board) ||
        canMoveUp(board) ||
        canMoveRight(board) ||
        canMoveDown(board)){
        return false;
    }

    return true;
}

function canMoveLeft(board){
    for(var i = 0; i < 4; i ++){
        for(var j = 1; j < 4; j ++){
            if(board[i][j] != 0 && (board[i][j-1] == 0 || board[i][j-1] == board[i][j])){
                return true;
            }
        }
    }

    return false;
}

function canMoveUp(board) {
    for(var i = 1; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(board[i][j] != 0 && (board[i-1][j] == 0 || board[i-1][j] == board[i][j])){
                return true;
            }
        }
    }

    return false;
}

function canMoveRight(board){
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 3; j ++){
            if(board[i][j] != 0 && (board[i][j+1] == 0 || board[i][j+1] == board[i][j])){
                return true;
            }
        }
    }

    return false;
}

function canMoveDown(board){
    for(var i = 0; i < 3; i ++){
        for(var j = 0; j < 4; j ++){
            if(board[i][j] != 0 && (board[i+1][j] == 0 || board[i+1][j] == board[i][j])){
                return true;
            }
        }
    }

    return false;
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1+1; i < col2; i ++){
        if(board[row][i] != 0){
            return false;
        }
    }

    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for(var i = row1+1; i < row2; i ++){
        if(board[i][col] != 0){
            return false;
        }
    }

    return true;
}