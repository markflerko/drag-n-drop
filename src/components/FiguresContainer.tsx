import React from "react";
import { Circle } from "./figures/Circle";
import { Square } from "./figures/Square";

type PropsType = {};

export const FiguresContainer: React.FC<PropsType> = (props) => {
  return (
    <div className="figuresContainer" id="container">
      <Circle />
      <Square />
    </div>
  );
};
