import http from 'http';

const tasks = [
  { id: 1, title: "Learn Node.js" },
  { id: 2, title: "Build API" }
];

const server = http.createServer((req, res) => {
  if(req.method === "GET" && req.url === "/api/tasks"){
    res.setHeader("Content-Type", "application/json");
    
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
    return;
  }
  
  if(req.method === "POST" && req.url === '/api/tasks'){
    console.log("POST request received");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    
    req.on("end", () => {
      try {
        const task = {
          id: tasks.length + 1,
          ...JSON.parse(body)
        };
        
        if(!task.title){
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            message: "Title is required"
          }));

          return;
        }
        tasks.push(task);
        
        console.log(task);
        console.log(task.title);
        console.log(task.priority);
        
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        
        res.end(JSON.stringify({
          message: "Task created successfully",
          task: task
        }));
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          message: "invalid JSON"
        }));
      }
    });
    
    return;
  }
  
  if(req.method === 'PATCH' && req.url.startsWith('/api/tasks/')){
    console.log("PATCH request received");
    const parts = req.url.split("/");
    const id = Number(parts[3]);

    const task = tasks.find((task) => task.id === id);

    if(!task){
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        message : "Task not found"
      }));
      return;
    }
    
    let body = "";
    
    req.on("data", (chunk) => {
      body += chunk;
    });
    
    req.on("end", () => {
      try {
        const updates = JSON.parse(body);

        if("title" in updates && !updates.title.trim()){
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            message: "Title is required"
          }));
          return;
        }

        Object.assign(task, updates);

        console.log(task);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          message: "Updated Successfully",
          task: task
        }));
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          message: "invalid JSON"
        }));
      }
    })
    
    return;
  }
  
  if(req.method === "DELETE" && req.url.startsWith('/api/tasks/')){
    const parts = req.url.split("/");
    const id = Number(parts[3]);
    
    const task = tasks.find((task) => task.id === id);
    
    if(!task){
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        message: "Task not found"
      }));
      
      return;
    }
    
    const index = tasks.findIndex((task) => task.id === id);
    
    tasks.splice(index, 1);
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Task Deleted Successfully"
    }));

    return;
  }
  
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({message: "Route not found"}));
});

server.listen(5000);