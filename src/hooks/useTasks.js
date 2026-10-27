import { useContext } from "react";
import TaskContext from "../context/TaskContext.jsx";

function useTasks() {
  const context = useContext(TaskContext);

  return context;
}

export default useTasks;