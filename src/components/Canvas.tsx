//@ts-nocheck
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxStore";
import { drawing } from "../utils/drawing";

type PropsType = {};

export const Canvas: React.FC<PropsType> = (props) => {
  const figuresData = useSelector(
    (state: AppStateType) => state.app.figuresDataArray
  );

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
