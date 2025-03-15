import React from "react"
import NavBar from "./components/NavBar";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="h-full">
      <NavBar/>
      <div className="flex">
        <TaskList></TaskList>
      </div>
    </div>
    
  )
}

export default App;
