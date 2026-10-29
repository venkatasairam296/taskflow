import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import taskRouter from './routes/taskRoutes.js';
import authRouter from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import { requireAuth } from './middleware/requireAuth.js';

const PORT = Number(process.env.PORT) || 5000;

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

if(!process.env.SESSION_SECRET){
  throw new Error('SESSION_SECRET is not defined');
}

app.use(session({
  name: "taskflow.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 14 * 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/',  (req, res) => {
  res.send("TaskFlow API is running");
});

app.use('/api/auth', authRouter);

app.use('/api/tasks', requireAuth, taskRouter);

app.get("/api/about", (req, res) => {
  res.send("TaskFlow Express API");
});

app.get('/api/test-error', (req, res, next) => {
  const error = new Error("Test error");

  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.message);

  if(Number.isInteger(err.status) && err.status >= 400 && err.status <= 499){
    res.status(err.status).json({
      message: err.message
    });
  }else{
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`TaskFlow server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exitCode = 1;
  }
}

startServer();