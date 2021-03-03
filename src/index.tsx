import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { FigureType } from './types'

let data = localStorage.getItem('figures-canvas-position')
let figures = [] as Array<FigureType>

if (data) {
  figures = figures.concat(JSON.parse(data))
}

ReactDOM.render(
  <React.StrictMode>
    <App figures={figures} />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
