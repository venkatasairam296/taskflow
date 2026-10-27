import mongoose from "mongoose";
import { loadTasks, loadTaskById, createTask as newTask, updateTask as modifyTask, deleteTask as removeTask } from "../services/taskService.js";

export async function getTasks(req, res, next) {
  try {
    const status = req.query.status;
    const priority = req.query.priority;
    const userId = req.session.userId;

    const tasks = await loadTasks({ status, priority, userId });

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

    const task = await loadTaskById(id, req.session.userId);

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
    const data = req.body;

    const task = await newTask(data, req.session.userId);

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



    const task = await modifyTask(id, req.body, req.session.userId);

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

    const task = await removeTask(id, req.session.userId);

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