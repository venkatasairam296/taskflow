import http from 'http';
import { sendError, sendJson } from './utils/response.js';
import { validateTask, validateTaskUpdate } from './utils/validation.js';

const tasks = [
  { id: 1, title: "Learn Node.js", status: "pending", priority: "high" },
  { id: 2, title: "Build API", status: "completed", priority: "low" },
  { id: 3, title: "Practice HTTP", status: "pending", priority: "low" }
];

const server = http.createServer((req, res) => {
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

    
    req.on("end", () => {
      try {
        const ids = tasks.length === 0 ? [0] : tasks.map((task) => task.id);
        const newId = Math.max(...ids) + 1;

        const task = {
          id: newId,
          ...JSON.parse(body)
        };

        const error = validateTask(task);

        if(error){
          sendError(res, 400, error);
          return;
        }
        
        tasks.push(task);
        
        console.log(task);
        console.log(task.title);
        console.log(task.priority);
        
        sendJson(res, 201, task, "Task created successfully");
      } catch (error) {
        sendError(res, 400, "invalid JSON");
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
    
    req.on("end", () => {
      try {
        const updates = JSON.parse(body);
        
        const error = validateTaskUpdate(updates);

        if(error){
          sendError(res, 400, error);
          return;
        }
        
        Object.assign(task, updates);
        
        console.log(task);
        
        sendJson(res, 200, task, "Updated Successfully");
      } catch (error) {
        sendError(res, 400, "invalid JSON");
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
    
    tasks.splice(index, 1);
    
    sendJson(res, 200, null, "Task Deleted Successfully");

    return;
  }
  
  sendError(res, 404, "Route not found");
});

server.listen(5000);