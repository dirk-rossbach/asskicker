import './MatrixDisplay.scss'
import React from 'react'
import { charToMatrix } from '../../Services/MatrixDisplayService'

export default function MatrixDisplay(props) {
  const data = charToMatrix(props.char)
  const colCount = data[0].length
  let cellSize = 24
  let color = 'red'

  if (props.cellSize) {
    cellSize = props.cellSize
  }
  if (props.color) {
    color = props.color
  }

  const getMatrix = () => {
    const cells = []
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < colCount; col++) {
        let className = ''
        cells.push(
          <span
            className={className}
            key={`cell${row}-${col}`}
            id={`cell${row}-${col}`}
            style={{
              backgroundColor: data[row][col] === 1 ? color : 'black',
              height: `${cellSize}px`,
              width: `${cellSize}px`,
            }}
          ></span>,
        )
      }
    }
    return cells
  }
  return (
    <div className="matrix-display" style={{ width: `calc(7 * ${cellSize})` }}>
      {getMatrix()}
    </div>
  )
}
