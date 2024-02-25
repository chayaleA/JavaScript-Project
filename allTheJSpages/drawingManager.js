//size of each square
const squareSize = 32
let canvas = document.getElementById("baseCanvas")
let ctx = canvas.getContext('2d')

//array of colors for each shape
const colors = ["#ff0000", "#00ff00", "yellow", "blue", "#009b87", "darkblue", "#008000", "#ba55d3", "#dc143c", "#ff8c00", "#ff4500"]

//function to draw the board
function drawBoard() {
    //in order to draw something
    ctx.beginPath()
    //to place the canvas in the middle
    var marginTop = 52
    var marginLeft = 600
    canvas.style.marginLeft = marginLeft + 'px';
    canvas.style.marginTop = marginTop + 'px';

    //to draw a rectangle
    ctx.rect(0, 0, BoardSize.cols * squareSize, BoardSize.rows * squareSize)
    ctx.strokeStyle = "red"
    ctx.lineWidth = 5
    ctx.stroke()//to draw the outing frame
}

function clearBoard() {
    ctx.beginPath()
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, BoardSize.cols * squareSize, BoardSize.rows * squareSize)
}

//function to fill a square
function fillSquare(square, color) {
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.fillRect(square.col * squareSize, square.row * squareSize, squareSize, squareSize)
}