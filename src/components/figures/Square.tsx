import React from "react";

type PropsType = {};

export const Square: React.FC<PropsType> = (props) => {

  return (
    <div className="square draggable" id="square"  draggable="true"></div>
  );
};
