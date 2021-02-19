//@ts-nocheck
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxStore";

type PropsType = {};

export const CanvasContainer: React.FC<PropsType> = (props) => {
  const coords = useSelector((state: AppStateType) => state.app.coords);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const left = canvas?.getBoundingClientRect().left;
    const top = canvas?.getBoundingClientRect().top;
    const context = canvas.getContext("2d");

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
    }

    context.strokeRect(coords?.x - left /* - shiftLeft */, coords?.y - top /* - shiftRight */, 150, 100);
  });

  return (
    <canvas
      className="canvasContainer"
      id="canvas"
      width="800"
      height="800"
    ></canvas>
  );
};
