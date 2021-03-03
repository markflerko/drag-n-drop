import React from 'react'
import './MovedFigure.css'

type PropsType = {
  top: number,
  left: number,
  figureType: string,
  isShow: boolean
}

export const MovedFigure: React.FC<PropsType> = ({ top, left, figureType, isShow }) => {
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
