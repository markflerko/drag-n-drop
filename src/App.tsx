//@ts-nocheck
import React, { useLayoutEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { Canvas } from "./components/Canvas";
import { Figures } from "./components/Figures";
import { actions } from "./redux/appReducer";
import store from "./redux/reduxStore";

function App() {
  const [circleCoords, setCircleCoords] = useState({});
  const [squareCoords, setSquareCoords] = useState({});
  const [canvasCoords, setcanvasCoords] = useState({});

  const [dragStartData, setDragStartData] = useState({});

  const [coords, setCoords] = useState({});

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
    let shiftX = 0;
    let shiftY = 0;

    if (name === "square") {
      shiftX = squareCoords.x - event.clientX - canvasCoords.x;
      shiftY = squareCoords.y - event.clientY - canvasCoords.y;
    } else if (name === "circle") {
      shiftX = circleCoords.x + circleCoords.width/2 - event.clientX - canvasCoords.x;
      shiftY = circleCoords.y + circleCoords.height/2 - event.clientY - canvasCoords.y;
    }

    setDragStartData({ shiftX, shiftY, name });
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const x = event.clientX + dragStartData.shiftX;
    const y = event.clientY + dragStartData.shiftY;

    dispatch(actions.onDragEndActionCreator(x, y, dragStartData.name));
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCoords({});
  };

  return (
    <Provider store={store}>
      <div className="App">
        <div
          id="grid"
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onMouseMove={handleMouseMove}
        >
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
