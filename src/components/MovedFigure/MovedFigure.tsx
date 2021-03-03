import React from 'react'
import './MovedFigure.css'

type MovedFigureProps = {
  top: number,
  left: number,
  figureType: string,
  isShow: boolean
}

export const MovedFigure = ({ top, left, figureType, isShow }: MovedFigureProps) => {
  if (!isShow) return null

  return (
    <div
      className={`${figureType}UnderMouse draggable`}
      style={{
        top,
        left,
      }}
    ></div>
  )
}
