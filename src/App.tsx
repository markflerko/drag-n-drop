import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './components/Canvas'
import { ExportJSONButton } from './components/ExportJSONButton'
import { ImportJSONButton } from './components/MovedFigure/ImportJSONButton'
import { MovedFigure } from './components/MovedFigure/MovedFigure'
import { initialDragStartData } from './initialStateValues/initialStateValues'
import store from './redux/reduxStore'
import { MovableElementType } from './types'
import { calculateShifts, select } from './utils/drawing'
import { getMovableElementCoords, getUpperFigure, isMouseInCanvas } from './utils/utils'

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const circle = useRef<HTMLDivElement>(null)
  const square = useRef<HTMLDivElement>(null)

  const [circleCoords, setCircleCoords] = useState({})
  const [squareCoords, setSquareCoords] = useState({})
  const [canvasCoords, setcanvasCoords] = useState({})

  useLayoutEffect(() => {
    setCircleCoords(circle.current!.getBoundingClientRect())
    setSquareCoords(square.current!.getBoundingClientRect())
    setcanvasCoords(canvas.current!.getBoundingClientRect())
  }, [circle, canvas, square])

  const [dragStartData, setDragStartData] = useState(initialDragStartData)
  const [figuresData, setFiguresData] = useState([])

  const [movableElement, setMovableElement] = useState<MovableElementType | null>(null)
  const [mode, setMode] = useState(null)

  const [underMouse, setUnderMouse] = useState({})
  const [showFigure, setShowFigure] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('figures-canvas-position')
    if (data) {
      setFiguresData(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('figures-canvas-position', JSON.stringify(figuresData))
  }, [figuresData])

  const handleDragStart = (event: { target: HTMLDivElement }) => {
    const name = event.target.id

    const { shiftX, shiftY } = calculateShifts(name, squareCoords, circleCoords, event, canvasCoords)

    setDragStartData({ shiftX, shiftY, name })
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX
    const y = event.clientY + dragStartData.shiftY
    const name = dragStartData.name

    const figuresDataUpdated = figuresData.map((item) => ({ ...item, selected: false }))
    const newFigure = { x, y, name, width: 150, height: 100, id: Date.now(), selected: true } as MovableElementType

    setFiguresData([...figuresDataUpdated, newFigure])
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const upperFigure = getUpperFigure({ figuresData, event, canvasCoords })

    if (upperFigure) {
      const figuresDataSelected = select(upperFigure, figuresData)
      setFiguresData(figuresDataSelected)

      const shiftX = upperFigure.x - (event.clientX - canvasCoords.x)
      const shiftY = upperFigure.y - (event.clientY - canvasCoords.y)
      setMode('moveInsideCanvas')
      setMovableElement({ ...upperFigure, shiftX, shiftY, selected: true })
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = event
    const { top, bottom, left, right } = canvasCoords

    if (mode === 'moveInsideCanvas') {
      if (isMouseInCanvas({ clientX, clientY, top, bottom, left, right })) {
        setMode('moveOutsideCanvas')
      }

      setShowFigure(false)
      move(event)
    } else if (mode === 'moveOutsideCanvas') {
      if (!isMouseInCanvas({ clientX, clientY, top, bottom, left, right })) {
        setMode('moveInsideCanvas')
      }

      setShowFigure(true)
      move(event)

      const leftCoordsOfFigureUnderMouse = event.clientX + movableElement.shiftX
      const topCoordsOfFigureUnderMouse = event.clientY + movableElement.shiftY
      setUnderMouse({ left: leftCoordsOfFigureUnderMouse, top: topCoordsOfFigureUnderMouse })
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mode === 'moveInsideCanvas') {
      setMode(null)
      setShowFigure(false)
    } else if (mode === 'moveOutsideCanvas') {
      setMode(null)
      setShowFigure(false)
      removeFigure()
    }
  }

  const removeFigure = () => {
    setFiguresData((arr) => arr.filter((figure) => !figure.selected))
  }

  const move = (event) => {
    const movableElementCoords = getMovableElementCoords({
      clientX: event.clientX,
      clientY: event.clientY,
      movableElement,
      canvasCoords,
    })

    setFiguresData((arr) => [...arr.slice(0, -1), { ...movableElement, ...movableElementCoords }])
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
        <div className="grid">
          <div className="figuresTitle" id="figuresTitle">
            figures
          </div>
          <div className="canvasTitle" id="canvasTitle">
            canvas
          </div>

          <div className="figures" id="figures">
            <div className="circle draggable" id="circle" draggable="true" ref={circle}></div>
            <div className="square draggable" id="square" draggable="true" ref={square}></div>

            <button className="button" onClick={removeFigure} type="button">
              delete
            </button>

            <ExportJSONButton figuresData={figuresData} />
            <ImportJSONButton deleteFiguresData={() => setFiguresData([])} setFiguresData={setFiguresData} />
          </div>
          <Canvas figuresData={figuresData} canvas={canvas} />
        </div>
      </div>
    </Provider>
  )
}

export default App
