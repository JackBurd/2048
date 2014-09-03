function showScaleAnimation(i, j, randNumber){
    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: gridCellWidth,
        height: gridCellWidth,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY){
    var numberCell = $("#number-cell-" + fromX + "-" + fromY);

    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}