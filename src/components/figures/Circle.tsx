import React from "react";

type PropsType = {};

export const Circle: React.FC<PropsType> = (props) => {

  return (
    <div className="circle draggable" draggable="true"></div>
  );
};
