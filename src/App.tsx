import React from "react";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";
import { CanvasContainer } from "./components/CanvasContainer";
import { FiguresContainer } from "./components/FiguresContainer";
import { actions } from "./redux/appReducer";
import store from "./redux/reduxStore";

function App() {
  const dispatch = useDispatch();

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const coords = { x: event.clientX, y: event.clientY };
    dispatch(actions.onMouseMoveActionCreator(coords));
  };

  return (
    <Provider store={store}>
      <div className="App">
        <div id="grid" onMouseMove={handleMouseMove}>
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
