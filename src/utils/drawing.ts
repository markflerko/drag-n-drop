import { FigureType } from './../types';

type DrawingType = {
  figuresData: Array<FigureType>,
  context: CanvasRenderingContext2D
}

export const drawing = ({figuresData, context}: DrawingType): void => {
  figuresData.forEach((item) => {
    context.beginPath()
    context.strokeStyle = 'black'
    context.lineWidth = 1
    if (item.name === 'square') {
      context.rect(item.x, item.y, item.width, item.height)
      context.stroke()
      context.fillStyle = 'blue'
      context.fillRect(item.x, item.y, item.width, item.height)
    } else if (item.name === 'circle') {
      context.fillStyle = 'green'
      context.arc(item.x, item.y, item.height / 2, 0, Math.PI * 2)
      context.fill()
    }
    if (item.selected) {
      context.strokeStyle = 'orangered'
      context.lineWidth = 3
    }
    context.stroke()
  })
}
