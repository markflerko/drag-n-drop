//@ts-nocheck
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxStore";

type PropsType = {};

export const Canvas: React.FC<PropsType> = (props) => {
  const coords = useSelector((state: AppStateType) => state.app.coords);

  const canvas = useRef();

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");

    {
      // context.clearRect(0, 0, canvas.width, canvas.height)
      // figuresArray.map(i => {
      //   if(figuresArray.shape) {
      //     top : ...
      //     left: ...
      //     ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
      //   } else if (figuresArray.shape) {}
      //   top : ...
      //   left: ...
      //   context.strokeRect(coords?.x, coords?.y, 150, 100);
      // })
      // figArr.map(i => addFigure(i)) <- utils.js
      // getFigCenter -> utils.js
    }

    context.strokeRect(
      coords?.x,
      coords?.y,
      150,
      100
    );
    // context.strokeRect(coords?.x, coords?.y, 150, 100);
  }, [coords]);

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
