import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import { TaskProvider } from "./context/TaskContext"

function App() {

  return (
    <div>
      <Navbar title="Taskflow" />
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </div>
  )
}

export default App
