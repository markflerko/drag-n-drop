import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {};

export const Circle: React.FC<PropsType> = (props) => {

  return (
    <div className="hero circle draggable"></div>
  );
};
