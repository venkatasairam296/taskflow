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

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({message: "Route not found"}));
});

server.listen(5000);