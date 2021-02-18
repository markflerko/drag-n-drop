import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import s from "./Canvas.module.css";

type PropsType = {};

export const Canvas: React.FC<PropsType> = () => {
  const coords = useSelector((state: AppStateType) => state.app.coords)

  return (
    <div className={s.canvas} id="canvas">
      <div>{`event.clientX => ${coords?.x}`}</div>
      <div>{`event.clientY => ${coords?.y}`}</div>
    </div>
  );
};
