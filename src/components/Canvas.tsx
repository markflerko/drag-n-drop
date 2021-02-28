//@ts-nocheck
import React, { useLayoutEffect } from "react";
import { FigureDataType } from "../types";
import { drawing } from "../utils/drawing";

type PropsType = {
  figuresData: Array<FigureDataType>,
};

export const Canvas: React.FC<PropsType> = ({ figuresData, canvas, mode, moveInsideCanvas, moveOutsideCanvas }) => {
  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    drawing(context, figuresData);
  }, [figuresData]);

  const handleMouseLeave = (event) => {
    if(mode === 'moveInsideCanvas') {
      moveOutsideCanvas()
    }
  }

  const handleMouseEnter = (event) => {
    if(mode === 'moveOutsideCanvas') {
      moveInsideCanvas()
    }
  }

  return (
    <canvas
      ref={canvas}
      className="canvasContainer"
      id="canvas"
      width="800"
      height="800"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    ></canvas>
  );
};
