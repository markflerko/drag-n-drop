export type ContainerType = {
  top: number
}

export type FigureType = {
  x: number
  y: number
  name: string
  width: number
  height: number
  id: number
  selected: boolean
}

export type MovableElementType = FigureType & {
  shiftX: number
  shiftY: number
}

export type CoordsType = {
  height: number
  width: number
  top: number
  left: number
  bottom: number
  right: number
  x: number
  y: number
}

export type DragStartDataType = {
  shiftX: number
  shiftY: number
  name: string
}

export type UnderMouseCoordsType = {
  left: number
  top: number
}