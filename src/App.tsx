import React, { useLayoutEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";
import { CanvasContainer } from "./components/CanvasContainer";
import { FiguresContainer } from "./components/FiguresContainer";
import { actions } from "./redux/appReducer";
import store from "./redux/reduxStore";

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const container = document.getElementById("container");
    const circle = document.getElementById("circle");
    const square = document.getElementById("square");
    //@ts-ignore
    dispatch(actions.getContainerTop(container?.getBoundingClientRect().top))
  })

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event.clientX, event.clientY)
    console.dir(event)
  }
    
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('handleDragEnd')
    dispatch(actions.onDragEndActionCreator(event.clientX, event.clientY))
  }

  return (
    <Provider store={store}>
      <div className="App">
        <div
          id="grid"
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="figures">figures</div>

          <Canvas />

          <FiguresContainer />
          <CanvasContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
