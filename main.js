var board = new Array();
var hasConflicted = new Array();
var score = 0;
var startX, startY;
var endX, endY;
var gameResult = 2048;
var gameFinished = false;

$(document).ready(function(){
    prepareForMobile();
    newGame();
});

function prepareForMobile(){
    if(documentWidth > 500){
        gridContainerWidth = 500;
        gridCellWidth = 100;
        gridCellSpace = 20;
    }

    $("#grid-container").css('width', gridContainerWidth - 2*gridCellSpace);
    $("#grid-container").css('height', gridContainerWidth - 2*gridCellSpace);
    $("#grid-container").css('padding', gridCellSpace);
    $("#grid-container").css('border-radius', 0.02*gridContainerWidth);

    $(".grid-cell").css('width', gridCellWidth);
    $(".grid-cell").css('height', gridCellWidth);
}

function  newGame() {
    init();

    for(var i = 0; i < 2; i ++){
        generateOneNumber();
    }
}

function init(){
    for(var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 4; i ++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    score = 0;
    gameFinished = false;

    $("#shadowLayer").hide();

    updateBoardView();
}

function  updateBoardView() {
    $(".number-cell").remove();
    $("#score").text(score);

    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j+'"></div>');
            var numberCell = $("#number-cell-" + i + "-" + j);

            if(board[i][j] == 0){
                numberCell.css('width', '0px');
                numberCell.css('height', '0px');
                numberCell.css('top', getPosTop(i, j) + gridCellWidth/2);
                numberCell.css('left', getPosLeft(i, j) + gridCellWidth/2);
            }
            else{
                numberCell.css('width', gridCellWidth);
                numberCell.css('height', gridCellWidth);
                numberCell.css('top', getPosTop(i, j));
                numberCell.css('left', getPosLeft(i, j));
                numberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                numberCell.css('color', getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }

            numberCell.css('font-size', getNumberFontSize(board[i][j]));

            hasConflicted[i][j] = false;
        }
    }

    $(".number-cell").css('line-height', gridCellWidth + 'px');
}

function generateOneNumber(){
    if(noSpace(board)) {
        return false;
    }

    var list = new Array();

    for(var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j ++) {
            if(board[i][j] == 0){
                list.push(4 * i + j);
            }
        }
    }

    var index = parseInt( Math.floor(Math.random() * list.length));
    var randX = Math.floor(list[index] / 4);
    var randY = Math.floor(list[index] % 4);
    var randNumber = Math.random() < 0.8 ? 2 : 4;
    board[randX][randY] = randNumber;

    showScaleAnimation(randX, randY, randNumber);

    return true;
}

$(document).keydown(function(event){
    if(gameFinished)  return;

    switch(event.keyCode){
        case 37:
            event.preventDefault();
            if(canMoveLeft(board)){
                moveLeft();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
            break;
        case 38:
            event.preventDefault();
            if(canMoveUp(board)){
                moveUp();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
            break;
        case 39:
            event.preventDefault();
            if(canMoveRight(board)){
                moveRight();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
            break;
        case 40:
            event.preventDefault();
            if(canMoveDown(board)){
                moveDown();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

document.addEventListener('touchstart', function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchend', function(event){
    if(gameFinished)  return;

    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if(Math.abs(deltaX) < 0.1*gridContainerWidth && Math.abs(deltaY) < 0.1*gridContainerWidth)
        return;

    if(Math.abs(deltaX) >= Math.abs(deltaY)){  //X方向
         if(deltaX > 0){
             if(canMoveRight(board)){
                 moveRight();
                 setTimeout("generateOneNumber()", 200);
                 setTimeout("showGameOver()", 300);
             }
         }
        else{
             if(canMoveLeft(board)){
                 moveLeft();
                 setTimeout("generateOneNumber()", 200);
                 setTimeout("showGameOver()", 300);
             }
         }
    }
    else{                                     //Y方向
        if(deltaY > 0){
            if(canMoveDown(board)){
                moveDown();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
        }
        else{
            if(canMoveUp(board)){
                moveUp();
                setTimeout("generateOneNumber()", 200);
                setTimeout("showGameOver()", 300);
            }
        }
    }
});

function showGameOver(){
    if(noSpace(board) && noMove(board)){
        showShadowLayer();

        $(".game-message").css('color', "#776e65");
        $(".game-message").text("Game Over");

        gameFinished = true;
    }
}

function showGameWin(number){
    if(number == gameResult){
        showShadowLayer();

        $(".game-message").css('color', "#ff7d00");
        $(".game-message").text("You Win");

        gameFinished = true;
    }
}

function showShadowLayer(){
    $("#shadowLayer").css('top',  $("#grid-container").offset().top);
    $("#shadowLayer").css('left',  $("#grid-container").offset().left);
    $("#shadowLayer").css('width', gridContainerWidth);
    $("#shadowLayer").css('height', gridContainerWidth);
    $("#shadowLayer").show();
}

$(window).resize(function(){
    $("#shadowLayer").css('top',  $("#grid-container").offset().top);
    $("#shadowLayer").css('left',  $("#grid-container").offset().left);
});

function  moveLeft() {
    for(var i = 0; i < 4; i ++) {
        for (var j = 1; j < 4; j++) {
            if(board[i][j] != 0){
                for(var k = 0; k < j; k ++){
                    if(noBlockHorizontal(i, k, j, board)) {
                        if (board[i][k] == 0) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if (board[i][k] == board[i][j] && !hasConflicted[i][k]) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;

                            score += board[i][k];
                            setTimeout(showGameWin(board[i][k]), 300);

                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
}

function  moveUp(){
    for(var i = 1; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k ++){
                    if(noBlockVertical(j, k, i, board)){
                        if(board[k][j] == 0){
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && !hasConflicted[k][j]){
                            showMoveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;

                            score += board[k][j];
                            setTimeout(showGameWin(board[k][j]), 300);

                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
}

function  moveRight(){
    for(var i = 0; i < 4; i ++){
        for(var j = 2; j >= 0; j --){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k --){
                    if(noBlockHorizontal(i, j, k, board )){
                        if(board[i][k] == 0){
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j] && !hasConflicted[i][k]){
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;

                            score += board[i][k];
                            setTimeout(showGameWin(board[i][k]), 300);

                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
}

function  moveDown(){
    for(var i = 2; i >= 0; i --){
        for(var j = 0; j < 4; j ++){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k --){
                    if(noBlockVertical(j, i, k, board)){
                        if(board[k][j] == 0){
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && !hasConflicted[k][j]){
                            showMoveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;

                            score += board[k][j];
                            setTimeout(showGameWin(board[k][j]), 300);

                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
}