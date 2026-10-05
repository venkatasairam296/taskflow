import { loadTasks, saveTasks } from "../storage/taskStorage.js";
import { validateTask, validateTaskUpdate } from "../utils/validation.js";

export async function getTasks(req, res, next) {
  try {
    const tasks = await loadTasks();

    const status = req.query.status;
    const priority = req.query.priority;
    
    const filteredTasks = tasks.filter((task) => {
      if(status && task.status !== status){
        return false;
      }
      
      if(priority && task.priority !== priority){
        return false;
      }

      return true;
    });
    
    res.status(200).json(filteredTasks);
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const id = Number(req.params.id);
    
    if(Number.isNaN(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const tasks = await loadTasks();

    const task = tasks.find((task) => task.id === id);

    if(!task){
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const validationError = validateTask(req.body);
  
    if(validationError){
      return res.status(400).json({
        message: validationError
      });
    }
    
    const tasks = await loadTasks();

    const ids = tasks.length === 0 ? [0] : tasks.map((task) => task.id);
    const maxId = Math.max(...ids) + 1;
    
    const data = req.body;

    const task = {
      id: maxId,
      title: data.title.trim(),
      status: data.status,
      priority: data.priority
    };

    tasks.push(task);

    await saveTasks(tasks);
  
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const id = Number(req.params.id);

    if(Number.isNaN(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const tasks = await loadTasks();

    const task = tasks.find((task) => task.id === id);

    if(!task){
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const validationError = validateTaskUpdate(req.body);
    if(validationError){
      return res.status(400).json({
        message: validationError
      });
    }

    Object.assign(task, req.body);

    await saveTasks(tasks);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const id = Number(req.params.id);

    if(Number.isNaN(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const tasks = await loadTasks();

    const taskId = tasks.findIndex((task) => task.id === id);

    if(taskId === -1){
      return res.status(404).json({
        message: "Task not found"
      });
    }

    tasks.splice(taskId, 1);

    await saveTasks(tasks);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}