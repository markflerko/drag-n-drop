//@ts-nocheck
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './components/Canvas'
import { MovedFigure } from './components/MovedFigure/MovedFigure'
import store from './redux/reduxStore'
import { calculateShifts, checkCollision, isInside, select } from './utils/drawing'

function App() {
  const canvas = useRef()
  const circle = useRef()
  const square = useRef()

  const [circleCoords, setCircleCoords] = useState({})
  const [squareCoords, setSquareCoords] = useState({})
  const [canvasCoords, setcanvasCoords] = useState({})

  const [dragStartData, setDragStartData] = useState({})

  const [figuresData, setFiguresData] = useState([])

  const [movableElement, setMovableElement] = useState(null)
  const [mode, setMode] = useState(null)

  const [underMouse, setUnderMouse] = useState({})
  const [showFigure, setShowFigure] = useState(false)

  useLayoutEffect(() => {
    setCircleCoords(circle.current.getBoundingClientRect())
    setSquareCoords(square.current.getBoundingClientRect())
    setcanvasCoords(canvas.current.getBoundingClientRect())
  }, [])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const name = event.target.id

    const { shiftX, shiftY } = calculateShifts(name, squareCoords, circleCoords, event, canvasCoords)

    setDragStartData({ shiftX, shiftY, name })
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    //to drawing js
    const x = event.clientX + dragStartData.shiftX
    const y = event.clientY + dragStartData.shiftY
    const name = dragStartData.name

    setFiguresData((prevState) => [
      ...prevState,
      // height, width get throught dom, id -> Date.now(), shortid lib
      { x, y, name, width: 150, height: 100, id: Date.now(), selected: false },
    ])
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = figuresData
      .slice()
      .reverse()
      .find((element) => {
        return isInside(element, event.clientX - canvasCoords.x, event.clientY - canvasCoords.y)
      })

    if (el) {
      const figuresDataSelected = select(el, figuresData)
      setFiguresData(figuresDataSelected)

      const shiftX = el.x - (event.clientX - canvasCoords.x)
      const shiftY = el.y - (event.clientY - canvasCoords.y)
      setMode('moveInsideCanvas')
      setMovableElement({ ...el, shiftX, shiftY, selected: true })
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode === 'moveInsideCanvas') {
      move(event);

    } else if (mode === 'moveOutsideCanvas') {
      setShowFigure(true)
      
      move(event);
      
      const left = event.clientX + movableElement.shiftX
      const top = event.clientY + movableElement.shiftY
      setUnderMouse({ left, top })
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode === 'moveInsideCanvas') {
      setMode(null)
      setShowFigure(false)
    } else if (mode === 'moveOutsideCanvas') {
      setMode(null)
      setShowFigure(false)
    }
  }

  const removeFigure = () => {
    setFiguresData((arr) => arr.slice(0, -1))
  }

  const move = (event) => {
    const x = event.clientX - canvasCoords.x + movableElement.shiftX
    const y = event.clientY - canvasCoords.y + movableElement.shiftY

    const { newX, newY } = checkCollision(x, y, movableElement, canvasCoords)

    setFiguresData([...figuresData.slice(0, -1), { ...movableElement, x: newX, y: newY }])
  }

  return (
    <Provider store={store}>
      <div
        className="App"
        onMouseUp={handleMouseUp}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <MovedFigure
          top={underMouse.top}
          left={underMouse.left}
          figureType={movableElement?.name}
          isShow={showFigure}
        />
        <div id="grid">
          <div className="figuresTitle" id="figuresTitle">
            figures
          </div>
          <div className="canvasTitle" id="canvasTitle">
            canvas
          </div>

          <div className="figures" id="figures">
            <div className="circle draggable" id="circle" draggable="true" ref={circle}></div>
            <div className="square draggable" id="square" draggable="true" ref={square}></div>
          </div>
          <Canvas
            figuresData={figuresData}
            canvas={canvas}
            moveInsideCanvas={() => {setMode('moveInsideCanvas'); setShowFigure(false)}}
            moveOutsideCanvas={() => setMode('moveOutsideCanvas')}
            mode={mode}
          />
        </div>
      </div>
    </Provider>
  )
}

export default App
