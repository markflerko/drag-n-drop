import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {};

export const Square: React.FC<PropsType> = (props) => {

  return (
    <div className="hero square draggable"></div>
  );
};
