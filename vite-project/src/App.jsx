import { useEffect, useState, useContext} from "react"
import { AppContext } from "./context/ChatAppContext"
const App = () =>{
  const {name} = useContext(AppContext)

  return (
    <div className="app">
     <h1>{name}</h1>
    </div>
  )
}

export default App
