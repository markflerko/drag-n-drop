import React from "react";

type PropsType = {};

export const CanvasContainer: React.FC<PropsType> = (props) => {
  return (
    <canvas
      className="canvasContainer"
      id="canvasContainer"
    ></canvas>
  );
};
