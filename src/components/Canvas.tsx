import React, { useLayoutEffect } from 'react'
import { FigureType } from '../types'
import { drawing } from '../utils/drawing'

type CanvasProps = {
  figuresData: Array<FigureType>
  canvas: React.RefObject<HTMLCanvasElement>
}

export const Canvas = ({ figuresData, canvas }: CanvasProps) => {
  useLayoutEffect(() => {
    const context = (canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, canvas.current!.width, canvas.current!.height)

    drawing({ context, figuresData })
  }, [figuresData])

  return <canvas ref={canvas} className="canvasContainer" id="canvas" width="800" height="800"></canvas>
}
