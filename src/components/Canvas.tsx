import React, { useLayoutEffect } from 'react'
import { FigureType } from '../types'
import { drawing } from '../utils/drawing'

type PropsType = {
  figuresData: Array<FigureType>
  canvas: React.RefObject<HTMLCanvasElement>
}

export const Canvas: React.FC<PropsType> = ({ figuresData, canvas }) => {
  useLayoutEffect(() => {
    const context = (canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, canvas.current!.width, canvas.current!.height)

    drawing({ context, figuresData })
  }, [figuresData])

  return <canvas ref={canvas} className="canvasContainer" id="canvas" width="800" height="800"></canvas>
}
