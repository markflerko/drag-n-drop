//@ts-nocheck
import React, { useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './components/Canvas'
import { Figures } from './components/Figures'
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

    setFiguresData((prevState) => [...prevState, { x, y, name, width: 100, height: 150, id: prevState.length}])
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = figuresData.find((element) => {
      return isInside(element, event.clientX - canvasCoords.x, event.clientY - canvasCoords.y)
    })

    if (el) {
      setMode('moving')
      setMovableElement(el)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode === 'moving') {
      
      const figuresDataCopy = [...figuresData];
      figuresDataCopy[movableElement.id] = {...movableElement, x: event.clientX, y: event.clientY}
      setFiguresData(figuresDataCopy)
    }
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
        >
          <div className="figuresTitle" id="figuresTitle">
            figures
          </div>
          <div className="canvasTitle" id="canvasTitle">
            canvas
          </div>

          <Figures />
          <Canvas figuresData={figuresData} />
        </div>
      </div>
    </Provider>
  )
}

export default App
