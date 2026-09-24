import http from 'http';

const server = http.createServer((req, res) => {
  if(req.method === "GET" && req.url === "/api/tasks"){
    const tasks = [
      { id: 1, title: "Learn Node.js" },
      { id: 2, title: "Build API" }
    ];

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
      const task = JSON.parse(body);
      
      console.log(task);
      console.log(task.title);
      console.log(task.priority);
      
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
  
      res.end(JSON.stringify({
        message: "Task created successfully",
        task: task
      }))
    });
    
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({message: "Route not found"}));
});

server.listen(5000);