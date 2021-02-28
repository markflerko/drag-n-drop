//@ts-nocheck
import React from 'react'
import './MovedFigure.css'

export const MovedFigure = ({ top, left, figureType, isShow }) => {
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
