//@ts-nocheck
import React, { useLayoutEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { Canvas } from "./components/Canvas";
import { Figures } from "./components/Figures";
import { actions } from "./redux/appReducer";
import store from "./redux/reduxStore";
import { calculateShifts } from "./utils/drawing";

function App() {
  const [circleCoords, setCircleCoords] = useState({});
  const [squareCoords, setSquareCoords] = useState({});
  const [canvasCoords, setcanvasCoords] = useState({});

  const [dragStartData, setDragStartData] = useState({});

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const circle = document.getElementById("circle").getBoundingClientRect();
    const square = document.getElementById("square").getBoundingClientRect();
    const canvas = document.getElementById("canvas").getBoundingClientRect();
    setCircleCoords(circle);
    setSquareCoords(square);
    setcanvasCoords(canvas);
  }, []);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const name = event.target.id;

    const { shiftX, shiftY } = calculateShifts(
      name,
      squareCoords,
      circleCoords,
      event,
      canvasCoords
    );

    setDragStartData({ shiftX, shiftY, name });
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX;
    const y = event.clientY + dragStartData.shiftY;

    dispatch(actions.onDragEndActionCreator(x, y, dragStartData.name));
  };

  return (
    <Provider store={store}>
      <div className="App">
        <div id="grid" onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <div className="figuresTitle" id="figuresTitle">
            figures
          </div>
          <div className="canvasTitle" id="canvasTitle">
            canvas
          </div>

          <Figures />
          <Canvas />
        </div>
      </div>
    </Provider>
  );
}

export default App;
