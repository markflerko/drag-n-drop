import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './components/Canvas'
import { ExportJSONButton } from './components/ExportJSONButton'
import { ImportJSONButton } from './components/ImportJSONButton'
import { MovedFigure } from './components/MovedFigure/MovedFigure'
import { initialCoords, initialDragStartData, InitialMovableElement } from './initialStateValues/initialStateValues'
import store from './redux/reduxStore'
import { FigureType, MovableElementType, UnderMouseCoordsType } from './types'
import { calculateShifts, getMovableElementCoords, getUpperFigure, isMouseInCanvas, select } from './utils/utils'

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const circle = useRef<HTMLDivElement>(null)
  const square = useRef<HTMLDivElement>(null)

  const [circleCoords, setCircleCoords] = useState(initialCoords)
  const [squareCoords, setSquareCoords] = useState(initialCoords)
  const [canvasCoords, setcanvasCoords] = useState(initialCoords)

  useLayoutEffect(() => {
    setCircleCoords(circle.current!.getBoundingClientRect())
    setSquareCoords(square.current!.getBoundingClientRect())
    setcanvasCoords(canvas.current!.getBoundingClientRect())
  }, [circle, canvas, square])

  const [dragStartData, setDragStartData] = useState(initialDragStartData)
  const [figuresData, setFiguresData] = useState<Array<FigureType>>([])

  const [movableElement, setMovableElement] = useState(InitialMovableElement)
  const [mode, setMode] = useState('')

  const [underMouseCoords, setUnderMouseCoords] = useState<UnderMouseCoordsType | null>(null)
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

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const name = (event.target as HTMLDivElement).id
    const {clientX, clientY} = event;

    const { shiftX, shiftY } = calculateShifts({name, squareCoords, circleCoords, canvasCoords, clientX, clientY})

    setDragStartData({ shiftX, shiftY, name })
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX
    const y = event.clientY + dragStartData.shiftY
    const name = dragStartData.name

    const figuresDataUpdated = figuresData.map((item: FigureType) => ({ ...item, selected: false }))
    const newFigure = { x, y, name, width: 150, height: 100, id: Date.now(), selected: true } as MovableElementType

    setFiguresData([...figuresDataUpdated, newFigure])
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const upperFigure = getUpperFigure({ figuresData, event, canvasCoords })

    if (upperFigure) {
      const figuresDataSelected = select({ upperFigure, figuresData })
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

      setFiguresData((arr) => [...arr.slice(0, -1), { ...arr[arr.length - 1], hidden: true }])
      setShowFigure(true)
      move(event)

      const leftCoordsOfFigureUnderMouse = event.clientX + movableElement.shiftX
      const topCoordsOfFigureUnderMouse = event.clientY + movableElement.shiftY
      setUnderMouseCoords({ left: leftCoordsOfFigureUnderMouse, top: topCoordsOfFigureUnderMouse })
    }
  }

  const handleMouseUp = () => {
    if (mode === 'moveInsideCanvas') {
      setMode('')
      setShowFigure(false)
    } else if (mode === 'moveOutsideCanvas') {
      setMode('')
      setShowFigure(false)
      removeFigure()
    }
  }

  const removeFigure = () => {
    setFiguresData((arr) => arr.filter((figure) => !figure.selected))
  }

  const move = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
          top={underMouseCoords?.top}
          left={underMouseCoords?.left}
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
