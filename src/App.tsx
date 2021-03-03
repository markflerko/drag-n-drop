import React, { useEffect, useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas'
import { ExportJSONButton } from './components/ExportJSONButton'
import { ImportJSONButton } from './components/ImportJSONButton'
import { MovedFigure } from './components/MovedFigure/MovedFigure'
import {
  initialCoords,
  initialDragStartData,
  initialFigure,
  initialUnderMouseCoords
} from './initialStateValues/initialStateValues'
import { FigureType } from './types'
import { useDOMElementCoords } from './utils/useDOMElemetCoords'
import {
  calculateShifts,
  getMovableElementCoords,
  getNewFigure,
  getUpperFigure,
  isMouseInCanvas,
  select
} from './utils/utils'

type AppType = {
  figures: Array<FigureType>
}

export function App({ figures }: AppType) {
  const [circleCoords, circle] = useDOMElementCoords<HTMLDivElement>(initialCoords)
  const [squareCoords, square] = useDOMElementCoords<HTMLDivElement>(initialCoords)
  const [canvasCoords, canvas] = useDOMElementCoords<HTMLCanvasElement>(initialCoords)

  const [dragStartData, setDragStartData] = useState(initialDragStartData)
  const [figuresData, setFiguresData] = useState(figures)

  const [movableElement, setMovableElement] = useState(initialFigure)
  const [mode, setMode] = useState('')

  const [underMouseCoords, setUnderMouseCoords] = useState(initialUnderMouseCoords)
  const [showFigure, setShowFigure] = useState(false)

  useEffect(() => {
    localStorage.setItem('figures-canvas-position', JSON.stringify(figuresData))
  }, [figuresData])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const name = (event.target as HTMLDivElement).id
    const { clientX, clientY } = event

    const { shiftX, shiftY } = calculateShifts({ name, squareCoords, circleCoords, canvasCoords, clientX, clientY })

    setDragStartData({ shiftX, shiftY, name })
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX
    const y = event.clientY + dragStartData.shiftY
    const { name } = dragStartData

    const figuresDataUpdated = figuresData.map((item) => ({ ...item, selected: false }))
    const newFigure = getNewFigure(x, y, name)

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
      // set mode if only figure is moving
      if (isMouseInCanvas({ clientX, clientY, top, bottom, left, right })) {
        setMode('moveOutsideCanvas')
      }

      setShowFigure(false)
      move(event)
    } else if (mode === 'moveOutsideCanvas') {
      // set mode if only figure is moving
      if (!isMouseInCanvas({ clientX, clientY, top, bottom, left, right })) {
        setMode('moveInsideCanvas')
      }

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
    <div
      className="App"
      onMouseUp={handleMouseUp}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <MovedFigure
        top={underMouseCoords.top}
        left={underMouseCoords.left}
        figureType={movableElement.name}
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
  )
}
