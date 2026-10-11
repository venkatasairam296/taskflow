import { createContext, useCallback, useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask as deleteTaskApi } from "../services/taskApi.js";

const TaskContext = createContext();

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  async function addTask(title, status, priority, category, dueDate) {
    try {
      setError(null);

      const taskData = {
        title,
        status,
        priority,
        category,
        dueDate
      };
  
      const task = await createTask(taskData);
  
      setTasks((prevTasks) => [...prevTasks, task]);

      return true;
    } catch (error) {
      setError(error.message || "Failed to create task");

      return false;
    }
  }
  
  async function editTask(title, status, editingTaskId, priority, category, dueDate) {
    try {
      setError(null);
      const taskData = {
        title,
        status,
        priority,
        category,
        dueDate
      };

      const updatedTask = await updateTask(editingTaskId, taskData);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === editingTaskId) {
            return {
              ...task,
              ...updatedTask
            };
          }
          
          return task;
        })
      );

      return true;
    } catch (error) {
      setError(error.message || "Failed to update task");
      return false;
    }
  }
  
  async function completeTask(id) {
    try {
      setError(null);

      const data = await updateTask(id, { status: "completed" });
      
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return data;
          }
          
          return task;
        })
      );
    } catch (error) {
      setError(error.message || "Failed to update task");
    }
  }
  
  async function deleteTask(id){
    try {
      await deleteTaskApi(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      setError(error.message || "Failed to delete task");
    }
  }

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError(error.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const data = await getTasks();

        if (!ignore) {
          setTasks(data);
          setError(null);
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message || "Failed to load tasks");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <TaskContext.Provider 
      value={{
        tasks, 
        loading, 
        error, 
        fetchTasks,
        addTask, 
        editTask, 
        completeTask, 
        deleteTask}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;