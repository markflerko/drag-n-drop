import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Circle } from "./Circle";
import { Square } from "./Square";

type PropsType = {};

export const CanvasContainer: React.FC<PropsType> = (props) => {
  return (
    <canvas
      className="canvasContainer"
      id="canvasContainer"
    ></canvas>
  );
};
