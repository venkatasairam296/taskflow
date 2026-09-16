import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    status: "pending",
    priority: "high",
    category: "learning",
    dueDate: "2026-09-20"
  },
  {
    id: 2,
    title: "Build TaskFlow",
    status: "in-progress",
    priority: "high",
    category: "project",
    dueDate: "2026-09-25"
  },
  {
    id: 3,
    title: "Practice JavaScript",
    status: "completed",
    priority: "medium",
    category: "learning",
    dueDate: "2026-09-15"
  }
];   

export function TaskProvider({children}) {
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);

  function addTask(title, status, priority, category, dueDate) {
    const newTask = {
      id: Date.now(),
      title,
      status,
      priority,
      category,
      dueDate
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function editTask(title, status, editingTaskId, priority, category, dueDate) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title,
            status,
            priority,
            category,
            dueDate
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