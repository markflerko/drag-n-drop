//@ts-nocheck
import React, { useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './components/Canvas'
import store from './redux/reduxStore'
import { calculateShifts, isInside } from './utils/drawing'

function App() {
  const [circleCoords, setCircleCoords] = useState({})
  const [squareCoords, setSquareCoords] = useState({})
  const [canvasCoords, setcanvasCoords] = useState({})

  const [dragStartData, setDragStartData] = useState({})

  const [figuresData, setFiguresData] = useState([])

  const [movableElement, setMovableElement] = useState(null)
  const [mode, setMode] = useState('')

  useLayoutEffect(() => {
    const circle = document.getElementById('circle').getBoundingClientRect()
    const square = document.getElementById('square').getBoundingClientRect()
    const canvas = document.getElementById('canvas').getBoundingClientRect()
    setCircleCoords(circle)
    setSquareCoords(square)
    setcanvasCoords(canvas)
  }, [])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const name = event.target.id

    const { shiftX, shiftY } = calculateShifts(name, squareCoords, circleCoords, event, canvasCoords)

    setDragStartData({ shiftX, shiftY, name })
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX
    const y = event.clientY + dragStartData.shiftY
    const name = dragStartData.name

    setFiguresData((prevState) => [...prevState, { x, y, name, width: 150, height: 100, id: prevState.length }])
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = figuresData
      .slice()
      .reverse()
      .find((element) => {
        return isInside(element, event.clientX - canvasCoords.x, event.clientY - canvasCoords.y)
      })

    if (el) {
      // select(el, canvas); <- utils.js
      const shiftX = el.x - (event.clientX - canvasCoords.x)
      const shiftY = el.y - (event.clientY - canvasCoords.y)
      setMode('moving')
      setMovableElement({ ...el, shiftX, shiftY })
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode === 'moving') {
      // moving(el, canvas); <- app.tsx

      {
        // let figuresDataCopy = [...figuresData]
        // const el = figuresDataCopy.find((element) => element.id === movableElement.id)
        // el = {
        //   ...movableElement,
        //   x: event.clientX - canvasCoords.x + movableElement.shiftX,
        //   y: event.clientY - canvasCoords.y + movableElement.shiftY,
        // }
        // figuresDataCopy = [...]
      }
      const figuresDataCopy = [...figuresData]

      figuresDataCopy[movableElement.id] = {
        ...movableElement,
        x: event.clientX - canvasCoords.x + movableElement.shiftX,
        y: event.clientY - canvasCoords.y + movableElement.shiftY,
      }
      setFiguresData(figuresDataCopy)
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMode('')
  }

  return (
    <Provider store={store}>
      <div className="App">
        <div
          id="grid"
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="figuresTitle" id="figuresTitle">
            figures
          </div>
          <div className="canvasTitle" id="canvasTitle">
            canvas
          </div>

          <div className="figures" id="figures">
            <div className="circle draggable" id="circle" draggable="true"></div>
            <div className="square draggable" id="square" draggable="true"></div>
          </div>
          <Canvas figuresData={figuresData} />
        </div>
      </div>
    </Provider>
  )
}

export default App
