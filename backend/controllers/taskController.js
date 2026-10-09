import { validateTask, validateTaskUpdate } from "../utils/validation.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";

export async function getTasks(req, res, next) {
  try {
    const status = req.query.status;
    const priority = req.query.priority;
    
    const filter = {};
    
    if(status){
      filter.status = status;
    }
    
    if(priority){
      filter.priority = priority;
    }
    
    const tasks = await Task.find(filter);
    
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const id = req.params.id;
    
    if(!mongoose.isObjectIdOrHexString(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const task = await Task.findById(id);

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
    
    const data = req.body;

    const task = await Task.create({
      title: data.title.trim(),
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate
    });
  
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const id = req.params.id;

    if(!mongoose.isObjectIdOrHexString(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }
    
    const validationError = validateTaskUpdate(req.body);
    if(validationError){
      return res.status(400).json({
        message: validationError
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );
    
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

export async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;

    if(!mongoose.isObjectIdOrHexString(id)){
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if(!task){
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}