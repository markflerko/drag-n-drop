export const initialCoords = {
  height: 0,
  width: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0
}
export type initialCoordsType = typeof initialCoords;

export const initialDragStartData = {
  shiftX: 0,
  shiftY: 0,
  name: ''
}
export type DragStartDataType = typeof initialDragStartData;

export const InitialFigure = {
  x: 0,
  y: 0,
  name: '',
  width: 0,
  height: 0,
  id: 0,
  selected: false
}
export type InitialFigureType = typeof InitialFigure;

export const InitialMovableElement = {
  x: 0,
  y: 0,
  name: '',
  width: 0,
  height: 0,
  id: 0,
  selected: false,
  shiftX: 0,
  shiftY: 0,
}
export type InitialMovableElementType = typeof InitialMovableElement;
