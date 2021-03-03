import { CoordsType, FigureType } from './../types'

type IsInsideType = {
  element: FigureType
  x: number
  y: number
}

const isInside = ({ element, x, y }: IsInsideType): boolean => {
  const { name, x: x1, y: y1, width, height } = element

  if (name === 'square') {
    return x >= x1 && y >= y1 && x <= x1 + width && y <= y1 + height
  }

  if (name === 'circle') {
    let r = height / 2
    return x >= x1 - r && x <= x1 + r && y >= y1 - r && y <= y1 + r && Math.sqrt((x - x1) ** 2 + (y - y1) ** 2) < r
  }

  return false
}

type GetUpperFigureType = {
  figuresData: Array<FigureType>
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
  canvasCoords: CoordsType
}

export const getUpperFigure = ({ figuresData, event, canvasCoords }: GetUpperFigureType): FigureType | null => {
  const x = event.clientX - canvasCoords.x
  const y = event.clientY - canvasCoords.y

  return (
    figuresData
      .slice()
      .reverse()
      .find((element) => isInside({ element, x, y })) || null
  )
}

type IsMouseInCanvasType = {
  clientX: number
  clientY: number
  top: number
  left: number
  bottom: number
  right: number
}

export const isMouseInCanvas = ({ clientX, clientY, top, left, bottom, right }: IsMouseInCanvasType): boolean => {
  return clientX > right || clientY > bottom || clientX < left || clientY < top
}

type MovableElementCoordsType = {
  x: number
  y: number
}

type GetMovableElementCoordsType = {
  clientX: number
  clientY: number
  canvasCoords: CoordsType
  movableElement: FigureType
}

export const getMovableElementCoords = ({
  clientX,
  clientY,
  movableElement,
  canvasCoords,
}: GetMovableElementCoordsType): MovableElementCoordsType => {
  let x = clientX - canvasCoords.x + movableElement.shiftX
  let y = clientY - canvasCoords.y + movableElement.shiftY

  if (movableElement.name === 'square') {
    x = x <= 0 ? 0 : x >= canvasCoords.width - movableElement.width ? canvasCoords.width - movableElement.width : x

    y = y <= 0 ? 0 : y >= canvasCoords.height - movableElement.height ? canvasCoords.height - movableElement.height : y
  } else if (movableElement.name === 'circle') {
    const r = movableElement.height / 2
    x = x <= r ? r : x >= canvasCoords.width - r ? canvasCoords.width - r : x

    y = y <= r ? r : y >= canvasCoords.height - r ? canvasCoords.height - r : y
  }

  return { x, y }
}

type SelectType = {
  upperFigure: FigureType
  figuresData: Array<FigureType>
}

export const select = ({ upperFigure, figuresData }: SelectType): Array<FigureType> => {
  const figuresDataSelected = figuresData
    .filter((figure) => figure.id !== upperFigure.id)
    .map((item) => ({ ...item, selected: false }))

  figuresDataSelected.push({ ...upperFigure, selected: true })
  return figuresDataSelected
}

type CalculateShiftsType = {
  name: string
  squareCoords: CoordsType
  circleCoords: CoordsType
  canvasCoords: CoordsType
  clientX: number
  clientY: number
}

type MovableElementShiftsType = {
  shiftX: number
  shiftY: number
}

export const calculateShifts = ({
  name,
  squareCoords,
  circleCoords,
  canvasCoords,
  clientX,
  clientY,
}: CalculateShiftsType): MovableElementShiftsType => {
  let shiftX = 0
  let shiftY = 0

  if (name === 'square') {
    shiftX = squareCoords.x - clientX - canvasCoords.x
    shiftY = squareCoords.y - clientY - canvasCoords.y
  } else if (name === 'circle') {
    shiftX = circleCoords.x + circleCoords.width / 2 - clientX - canvasCoords.x
    shiftY = circleCoords.y + circleCoords.height / 2 - clientY - canvasCoords.y
  }

  return {
    shiftX,
    shiftY,
  }
}

export const getNewFigure = (x: number, y: number, name: string): FigureType => ({
  x,
  y,
  name,
  width: 150,
  height: 100,
  id: Date.now(),
  selected: true,
  shiftX: 0,
  shiftY: 0,
})
