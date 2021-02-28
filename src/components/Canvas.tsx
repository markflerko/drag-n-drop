//@ts-nocheck
import React, { useLayoutEffect } from "react";
import { FigureDataType } from "../types";
import { drawing } from "../utils/drawing";

type PropsType = {
  figuresData: Array<FigureDataType>,
};

export const Canvas: React.FC<PropsType> = ({ figuresData, canvas, mode, dragedOverCanvas, dragedIntoCanvas }) => {
  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    drawing(context, figuresData);
  }, [figuresData]);

  const handleMouseLeave = (event) => {
    if(mode === 'moving') {
      dragedOverCanvas()
    }
  }

  const handleMouseEnter = (event) => {
    if(mode === 'movingOverCanvas') {
      dragedIntoCanvas()
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
      // onMouseEnter={handleMouseEnter}
    ></canvas>
  );
};
