import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    status: "pending"
  },
  {
    id: 2,
    title: "Build TaskFlow",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Practice JavaScript",
    status: "completed"
  }
];

export function TaskProvider({children}) {
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);

  function addTask(title, status) {
    const newTask = {
      id: Date.now(),
      title,
      status
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function editTask(title, status, editingTaskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title,
            status
          };
        }

        return task;
      })
    );
  }

  function completeTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: "completed"
          };
        }

        return task;
      })
    );
  }

  function deleteTask(id){
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <TaskContext.Provider value={{tasks, addTask, editTask, completeTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;