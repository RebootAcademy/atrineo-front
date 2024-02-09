import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//se redenriza dos veces por el stricmode para asegurarse que recibe los datos 
//en produccion no se hace, solo en desarollo
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
