import React from "react";
import s from "./Canvas.module.css";

type PropsType = {};

export const Canvas: React.FC<PropsType> = () => {
  // const coords = useSelector((state: AppStateType) => state.app.coords)

  return (
    <div className={s.canvas} style={{border: '1px solid black'}}>
      {/* <div>{`event.clientX => ${coords?.x}`}</div>
      <div>{`event.clientY => ${coords?.y}`}</div> */}
    </div>
  );
};
