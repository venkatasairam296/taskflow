import http from 'http';
import 'dotenv/config';
import { sendError, sendJson } from './utils/response.js';
import { validateTask, validateTaskUpdate } from './utils/validation.js';
import { loadTasks, saveTasks } from './storage/taskStorage.js';

const PORT = Number(process.env.PORT) || 5000;

const tasks = await loadTasks();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if(req.method === "GET" && url.pathname === "/api/tasks"){
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");

    const filteredTasks = tasks.filter((task) => {
      if(status && task.status !== status){
        return false;
      }

      if(priority && task.priority !== priority){
        return false;
      }

      return true;
    })

    console.log(filteredTasks);
    
    sendJson(res, 200, filteredTasks);
    return;
  }

  if(req.method === "GET" && url.pathname.startsWith("/api/tasks/")){
    const parts = url.pathname.split('/');
    const id = Number(parts[3]);

    if(Number.isNaN(id)){
      sendError(res, 400, "Invalid ID format");
      
      return;
    }
    
    const task = tasks.find((task) => task.id === id);
    
    if(!task){
      sendError(res, 404, "Task not found");

      return;
    }

    sendJson(res, 200, task);
    return;
  }
  
  if(req.method === "POST" && url.pathname === '/api/tasks'){
    console.log("POST request received");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    
    req.on("end", async () => {
      try {
        const ids = tasks.length === 0 ? [0] : tasks.map((task) => task.id);
        const newId = Math.max(...ids) + 1;

        let data;
        try {
          data = JSON.parse(body);
        } catch (error) {
          sendError(res, 400, "Invalid JSON");
          return;
        }
        
        const task = {
          id: newId,
          title: data.title,
          status: data.status,
          priority: data.priority
        };
        
        const error = validateTask(task);

        if(error){
          sendError(res, 400, error);
          return;
        }
        
        tasks.push(task);

        await saveTasks(tasks);
        
        console.log(task);
        console.log(task.title);
        console.log(task.priority);
        
        sendJson(res, 201, task, "Task created successfully");
      } catch (error) {
        sendError(res, 500, "Internal server error");
      }
    });
    
    return;
  }
  
  if(req.method === 'PATCH' && url.pathname.startsWith('/api/tasks/')){
    const parts = url.pathname.split("/");
    const id = Number(parts[3]);
    
    if(Number.isNaN(id)){
      sendError(res, 400, "Invalid ID format");
      
      return;
    }
    
    const task = tasks.find((task) => task.id === id);
    
    if(!task){
      sendError(res, 404, "Task not found");
      return;
    }
    
    let body = "";
    
    req.on("data", (chunk) => {
      body += chunk;
    });
    
    req.on("end", async () => {
      try {
        let updates; 
        try {
          updates = JSON.parse(body);
        } catch (error) {
          sendError(res, 400, "Invalid JSON");
          return;
        }

        const error = validateTaskUpdate(updates);

        if(error){
          sendError(res, 400, error);
          return;
        }
        
        Object.assign(task, updates);

        await saveTasks(tasks);
        
        console.log(task);
        
        sendJson(res, 200, task, "Updated Successfully");
      } catch (error) {
        sendError(res, 500, "Internal server error");
      }
    })
    
    return;
  }
  
  if(req.method === "DELETE" && url.pathname.startsWith('/api/tasks/')){
    const parts = url.pathname.split("/");
    const id = Number(parts[3]);
    
    if(Number.isNaN(id)){
      sendError(res, 400, "Invalid ID format");
      
      return;
    }
    
    const task = tasks.find((task) => task.id === id);
    
    if(!task){
      sendError(res, 404, "Task not found");
      
      return;
    }
    
    const index = tasks.findIndex((task) => task.id === id);
    
    try {
      tasks.splice(index, 1);
  
      await saveTasks(tasks);
      
      sendJson(res, 200, null, "Task Deleted Successfully");
    } catch (error) {
      sendError(res, 500, "Internal server error");
    }

    return;
  }
  
  sendError(res, 404, "Route not found");
});

server.listen(PORT);