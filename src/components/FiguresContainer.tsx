//@ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/profileReducer";
import { Circle } from "./Circle";
import { Square } from "./Square";

type PropsType = {};

export const FiguresContainer: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  const handleMouseDown = () => {
    dispatch(actions.startDragginActionCreator(true))
  }

  return (
    <div
      className="figuresContainer"
      id="container"
      onMouseDown={handleMouseDown}
    >
      <Circle />
      <Square />
    </div>
  );
};
