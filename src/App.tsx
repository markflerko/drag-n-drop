import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="grid">
        <div className="figures">figures</div>
        <div className="canvas" id="canvas">
          canvas
        </div>
        <div className="figuresContainer" id="container">
          <div className="hero circle draggable"></div>
          <div className="hero square draggable"></div>
        </div>
        <div className="canvasContainer" id="canvasContainer">
          <button id="delete">delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
