import './MatrixDisplay.scss'
import React, { useState } from 'react'

export default function MatrixDisplay(props) {
  const initialState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]

  const [matrix, setMatrix] = useState(initialState)
  const colCount = matrix[0].length

  const toggleState = (row, col) => {
    const newMatrix = [...matrix]
    let cellValue = newMatrix[row][col]
    newMatrix[row][col] = 1 - cellValue
    setMatrix(newMatrix)
  }

  const clear = () => {
    setMatrix(initialState)
  }
  const getMatrix = () => {
    const cells = []
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < colCount; col++) {
        let style = {}
        if (matrix[row][col] === 1) {
          style = { backgroundColor: 'yellow' }
        }
        cells.push(
          <span
            onClick={(e) => toggleState(row, col, e)}
            style={style}
            key={`cell${row}-${col}`}
            id={`cell${row}-${col}`}
          ></span>,
        )
      }
    }
    return cells
  }
  return (
    <span>
      <div className="matrix-display-input">{getMatrix()}</div>
      <button onClick={clear}>clear</button>
      <div>{JSON.stringify(matrix)}</div>
    </span>
  )
}

