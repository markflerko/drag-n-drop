import React, { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { CanvasContainer } from "./components/CanvasContainer";
import { FiguresContainer } from "./components/FiguresContainer";
import store from "./redux/reduxStore";

function App() {
  const [ev, setEv] = useState({x: 0, y: 0});

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEv({x: event.clientX, y: event.clientY})
  }

  return (
    <Provider store={store}>
      <div className="App" onMouseDown={handleMouseDown}>
        <div id="grid">
          <div className="figures">figures</div>
          <div className="canvas" id="canvas">
            canvas <br />
            {`event.clientX => ${ev.x}`} <br />
            {`event.clientY => ${ev.y}`}
          </div>
          <FiguresContainer />
          <CanvasContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
