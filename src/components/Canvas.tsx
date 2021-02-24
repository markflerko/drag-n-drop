//@ts-nocheck
import React, { useLayoutEffect, useRef } from "react";
import { FigureDataType } from "../types";
import { drawing } from "../utils/drawing";

type PropsType = {
  figuresData: Array<FigureDataType>,
};

export const Canvas: React.FC<PropsType> = ({ figuresData }) => {
  const canvas = useRef();

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    drawing(context, figuresData);
  }, [figuresData]);

  return (
    <canvas
      ref={canvas}
      className="canvasContainer"
      id="canvas"
      width="800"
      height="800"
    ></canvas>
  );
};
