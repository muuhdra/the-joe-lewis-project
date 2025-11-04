import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

const el = document.getElementById("root")
if (!el) {
  throw new Error('#root not found in index.html')
}

ReactDOM.createRoot(el).render(<Root />)
