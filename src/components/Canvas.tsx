//@ts-nocheck
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxStore";

type PropsType = {};

export const Canvas: React.FC<PropsType> = (props) => {
  const figuresData = useSelector(
    (state: AppStateType) => state.app.figuresDataArray
  );

  const canvas = useRef();

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    figuresData.map((item) => {
      if (item?.name === "square") {
        context.strokeRect(item?.x, item?.y, 150, 100);
      } else if (item?.name === "circle") {
        context.arc(item?.x, item?.y, 50, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
      }
    });

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
