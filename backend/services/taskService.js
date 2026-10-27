import Task from "../models/Task.js";
import { validateTask, validateTaskUpdate } from '../utils/validation.js';

export async function loadTasks({ status, priority, userId }) {
  let filter = {};

  filter.owner = userId;

  if(status){
    filter.status = status;
  }

  if(priority){
    filter.priority = priority;
  }

  const tasks = await Task.find(filter);

  return tasks;
}

export async function loadTaskById(id, userId) {
  const task = await Task.findOne({
    _id: id,
    owner: userId
  });

  return task;
}

export async function createTask( taskData, userId ) {
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
    dueDate,
    owner: userId
  });

  return task;
}

export async function updateTask(id, data, userId) {
  const validationError = validateTaskUpdate(data);

  if(validationError){
    const error = new Error(validationError);
    error.status = 400;
    throw error;
  }

  const allowedFields = ['title', 'status', 'priority', 'category', 'dueDate'];

  const updates = {};

  for(const field of allowedFields){
    if(field in data){
      updates[field] = data[field];
    }
  }

  const task = await Task.findOneAndUpdate(
    {
      _id: id,
      owner: userId
    },
    updates,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

  return task;
}

export async function deleteTask(id, userId) {
  const task = await Task.findOneAndDelete({
    _id: id,
    owner: userId
  });

  return task;
}