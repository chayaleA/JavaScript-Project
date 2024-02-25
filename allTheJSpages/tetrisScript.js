let score = 0
//To create a new shape
function GenerateNewShape() {
    var colorOfShape = colors[Math.floor(Math.random() * colors.length)]
    newShape = {
        shapeType: SHAPE_TYPE[Math.floor(Math.random() * SHAPE_TYPE.length)],
        top: 0,
        left: BoardSize.cols / 2 - 1,
        shapeOrient: 0,
        color: colorOfShape
    }
    newShape.squareArr = getShape(newShape.shapeType, newShape.top, newShape.left, newShape.shapeOrient)
    return newShape
}
//Draw the shapes from the array
function DrawFallingShape(color) {
    curShape.squareArr.forEach(square => { fillSquare(square, color) })
}
//to init a boolean array of the board
function init_Occupied_Squares() {
    var retval = []
    for (let i = 0; i < BoardSize.rows; i++) {
        var BoardRow = Array(BoardSize.cols).fill(false);
        retval.push(BoardRow)
    }
    return retval
}
const BoardSize = { rows: 20, cols: 10 }

//to create the board game
function DrawFrame() {
    clearBoard()
    drawBoard()
    DrawFallingShape(curShape.color)
    DrawOccupiedSquares()
}
//check if the square bellow is full
function isSquareOccupied(square) {
    if (square.row >= BoardSize.rows || square.col < 0 || square.col >= BoardSize.cols)
        return true;
    if (square.row < 0)
        return false
    return occupiedSquares[square.row][square.col]
}
//check ligal moves of the shape
function isShapeOccupied(shape) {
    return shape.some(square => isSquareOccupied(square))
}
//to add the shape to the basic
function AddFallingShapeToOccupiedSquares() {
    curShape.squareArr.forEach(ShapeSquare => {
        if (ShapeSquare.row < 0) {
            clearInterval(intervalId)
            const existingDataString = localStorage.getItem('DETAILS');
            let names = [];
            names = JSON.parse(existingDataString);
            if (names[names.length - 1].score < score) {
                names[names.length - 1].score = score;
                localStorage.setItem('DETAILS', JSON.stringify(names));
            }
            finishGame()
            return;
        }
        else
            occupiedSquares[ShapeSquare.row][ShapeSquare.col] = true
    })
}

//to delete full lines
function removeLines() {
    var fullLines = []
    for (let square of occupiedSquares) {
        if (square.every(square => square)) {
            fullLines.push(occupiedSquares.indexOf(square));
        }
    }
    while (fullLines.length > 0) {
        score++
        document.querySelector("#score").value = score;

        for (let i = fullLines[0]; i > 0; i--) {
            occupiedSquares[i] = occupiedSquares[i - 1]
        }
        occupiedSquares[0] = Array(BoardSize.cols).fill(false)
        fullLines.shift()
        playSound("sound2");
    }

}
//to draw all the occupied shapes
function DrawOccupiedSquares() {
    for (let i = 0; i < occupiedSquares.length; i++) {
        for (let j = 0; j < occupiedSquares[i].length; j++) {
            if (occupiedSquares[i][j])
                fillSquare({ row: i, col: j })
        }
    }
}


function MainLoop() {
    DrawFrame()
    let moveDownShape = getShape(curShape.shapeType, curShape.top + 1, curShape.left, curShape.shapeOrient)
    if (isShapeOccupied(moveDownShape)) {
        AddFallingShapeToOccupiedSquares()
        removeLines()
        curShape = GenerateNewShape()
    }
    else {
        curShape.squareArr = moveDownShape
        curShape.top++
    }
}
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault()
            let moveLeftShape = getShape(curShape.shapeType, curShape.top, curShape.left - 1, curShape.shapeOrient)
            if (!isShapeOccupied(moveLeftShape)) {
                curShape.squareArr = moveLeftShape
                curShape.left--
            }
            playSound("sound");
            break;
        case 'ArrowRight':
            e.preventDefault()
            let moveRightShape = getShape(curShape.shapeType, curShape.top, curShape.left + 1, curShape.shapeOrient)
            if (!isShapeOccupied(moveRightShape)) {
                curShape.squareArr = moveRightShape
                curShape.left++
            }
            playSound("sound");
            break;
        case 'ArrowUp':
            e.preventDefault()
            let rotatedShape = getShape(curShape.shapeType, curShape.top, curShape.left, (curShape.shapeOrient + 1) % 4)
            if (!isShapeOccupied(rotatedShape)) {
                curShape.squareArr = rotatedShape
                curShape.shapeOrient = (curShape.shapeOrient + 1) % 4
            }
            playSound("sound");
            break;
    }
})

function playSound(curSound) {
    const sound = document.getElementById(curSound);
    sound.play();
}
function finishGame() {
    for (let i = 0; i < occupiedSquares.length; i++) {
        for (let j = 0; j < occupiedSquares[i].length; j++) {
            fillSquare({ row: i, col: j }, "#ff1493")
        }
    }
    var end = document.getElementById("GameOver");
    end.style.visibility = "visible";
}

var curShape = GenerateNewShape()
var occupiedSquares = init_Occupied_Squares()

const existingDataString = localStorage.getItem('DETAILS');
var names = [];
names = JSON.parse(existingDataString);
if (names[names.length - 1].level == 2)
    intervalId = setInterval(MainLoop, 150)
else
    intervalId = setInterval(MainLoop, 300)
document.querySelector("#HighScore").value = names[names.length - 1].score;
document.querySelector("#score").value = 0;




