import { createContext, useCallback, useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask as deleteTaskApi } from "../services/taskApi.js";
import { useAuth } from '../hooks/useAuth.js';

const TaskContext = createContext();

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [operationError, setOperationError] = useState(null)

  const { user, loading: authLoading } = useAuth();


  async function addTask(title, status, priority, category, dueDate) {
    try {
      setOperationError(null);

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
      setOperationError(error.message || "Failed to create task");

      return false;
    }
  }

  async function editTask(title, status, editingTaskId, priority, category, dueDate) {
    try {
      setOperationError(null);
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
      setOperationError(error.message || "Failed to update task");
      return false;
    }
  }

  async function completeTask(id) {
    try {
      setOperationError(null);

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
      setOperationError(error.message || "Failed to update task");
    }
  }

  async function deleteTask(id){
    try {
      setOperationError(null);

      await deleteTaskApi(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      setOperationError(error.message || "Failed to delete task");
    }
  }

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setLoadError(error.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      if(authLoading){
        setLoading(true);
        return;
      }

      if(!user){
        if(!ignore){
          setTasks([]);
          setLoadError(null);
          setOperationError(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setLoadError(null);
        setOperationError(null);

        const tasks = await getTasks();

        if(!ignore){
          setTasks(tasks);
        }
      } catch (error) {
        if(!ignore){
          setLoadError(error.message || "Failed to load tasks");
        }
      }finally{
        if(!ignore) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, [user, authLoading]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        loadError,
        operationError,
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