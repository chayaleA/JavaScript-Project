//The array of all the seven basic shapes
const SHAPE_TYPE = ["L", "L_REV", "DOG", "DOG_REV", "LINE", "SQUARE", "PLUS"]

//return a basic shape
function getBaseShape(shapeType) {
    let baseShape = {}
    baseShape["L"] = [{ col: -1, row: -1 }, { col: 0, row: -1 }, { col: 0, row: 0 }, { col: 0, row: 1 }]
    baseShape["L_REV"] = [{ col: 0, row: -1 }, { col: 1, row: -1 }, { col: 0, row: 0 }, { col: 0, row: 1 }]
    baseShape["DOG"] = [{ col: 0, row: 0 }, { col: 1, row: 0 }, { col: -1, row: 1 }, { col: 0, row: 1 }]
    baseShape["DOG_REV"] = [{ col: -1, row: 0 }, { col: 0, row: 0 }, { col: 0, row: 1 }, { col: 1, row: 1 }]
    baseShape["LINE"] = [{ col: 0, row: -2 }, { col: 0, row: -1 }, { col: 0, row: 0 }, { col: 0, row: 1 }]
    baseShape["SQUARE"] = [{ col: 0, row: 0 }, { col: 1, row: 0 }, { col: 0, row: 1 }, { col: 1, row: 1 }]
    baseShape["PLUS"] = [{ col: 0, row: -1 }, { col: -1, row: 0 }, { col: 0, row: 0 }, { col: 1, row: 0 }]

    return baseShape[shapeType];
}
//rotate the shape
function RotateShape(baseShape, orientation) {
    //in order to rotate 90 degrees in each etarate
    let rotatedshape = baseShape
    for (let i = 0; i < orientation; i++)
        rotatedshape = rotatedshape.map(sq => { return { col: -sq.row, row: sq.col } })
    return rotatedshape
}

//to return the shape with offset
function getShape(shapeType, top, left, shape_orient) {
    let baseShape = getBaseShape(shapeType)
    let rotatedShape = RotateShape(baseShape, shape_orient)
    let shapeWithOffset = rotatedShape.map(square => { return { row: square.row + top, col: square.col + left } })
    return shapeWithOffset
}