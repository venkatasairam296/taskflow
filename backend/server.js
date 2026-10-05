import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import taskRouter from './routes/taskRoutes.js';

const PORT = Number(process.env.PORT) || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/',  (req, res) => {
  res.send("TaskFlow API is running");
});

app.use('/api/tasks', taskRouter);

app.get("/api/about", (req, res) => {
  res.send("TaskFlow Express API");
});

app.get('/api/test-error', (req, res, next) => {
  const error = new Error("Test error");

  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`TaskFlow server running on port ${PORT}`);
});