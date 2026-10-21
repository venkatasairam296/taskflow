import Task from "../models/Task.js";
import { validateTask, validateTaskUpdate } from '../utils/validation.js';

export async function loadTasks({ status, priority }) {
  let filter = {};

  if(status){
    filter.status = status;
  }

  if(priority){
    filter.priority = priority;
  }

  const tasks = await Task.find(filter);

  return tasks;
}

export async function loadTaskById(id) {
  const task = await Task.findById(id);

  return task;
}

export async function createTask( taskData ) {
  const validationError = validateTask( taskData );

  if(validationError){
    const error = new Error(validationError);
    error.status = 400;
    throw error;
  }

  const { title, status, priority, category, dueDate } = taskData;

  const task = await Task.create({
    title: title.trim(),
    status,
    priority,
    category,
    dueDate
  });

  return task;
}

export async function updateTask(id, updates) {
  const validationError = validateTaskUpdate(updates);

  if(validationError){
    const error = new Error(validationError);
    error.status = 400;
    throw error;
  }

  const task = await Task.findByIdAndUpdate(
    id,
    updates,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

  return task;
}

export async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id);

  return task;
}