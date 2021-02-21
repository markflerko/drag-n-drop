import React from "react";
import { Circle } from "./figures/Circle";
import { Square } from "./figures/Square";

type PropsType = {};

export const Figures: React.FC<PropsType> = (props) => {
  return (
    <div className="figures" id="figures">
      <Circle />
      <Square />
    </div>
  );
};
