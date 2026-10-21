
# TaskFlow — Full-Stack Task Management App

A full-stack task management application built with **React, Tailwind CSS, Node.js, Express.js, and MongoDB**. TaskFlow helps you organize daily work, manage priorities, track deadlines, and monitor progress through a responsive dashboard and status-based task board.

> 🚧 **Project Status:** Actively under development as a full-stack MERN learning and portfolio project.

## ✨ Features

### Task Management
- Create, edit, and delete tasks
- Organize tasks by status: Pending, In Progress, and Completed
- Assign priorities: Low, Medium, and High
- Categorize tasks and set due dates
- Validate task data before saving

### Dashboard and Productivity
- View total, pending, in-progress, and completed task counts
- Track overdue tasks and tasks due today
- Monitor task completion statistics
- Display loading skeletons and error feedback

### Task Organization
- Search and organize tasks using available dashboard features
- Filter tasks by supported criteria, including status and priority
- Sort tasks using available task attributes
- View tasks in a status-based board

### User Interface
- Responsive dashboard and task board
- Reusable React components
- Tailwind CSS styling
- Status- and priority-based visual indicators
- Loading, empty, and error states

### Backend and Data Persistence
- REST API built with Express.js
- MongoDB persistence using Mongoose
- Separate routes, controllers, and service logic
- Task data validation
- Centralized Express error handling
- Environment-based configuration

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI and component development |
| Vite | Frontend development server and build tool |
| Tailwind CSS | Styling and responsive layouts |
| React Router | Client-side routing and navigation |
| JavaScript (ES6+) | Application logic |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and backend routing |
| MongoDB | Persistent database storage |
| Mongoose | Database schemas, models, and operations |
| Git and GitHub | Version control and repository hosting |

## 🧠 React Concepts Practiced

- JSX and functional components
- Props and event handling
- `useState` and `useEffect`
- Controlled form components
- Conditional rendering
- Lists, keys, and array methods
- Immutable state updates
- Context API and shared state
- Custom hooks
- Component composition
- Derived state
- Parent-to-child communication
- Callback functions and prop drilling
- Loading and error-state handling
- API integration with `fetch()`

## 📂 Project Structure

```text
taskflow/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── DashboardError.jsx
│   │   ├── DashboardSkeleton.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── TaskBoard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskDetails.jsx
│   │   └── TaskForm.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.jsx
│   │   └── useTasks.jsx
│   ├── services/
│   │   └── taskApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   ├── utils/
│   │   └── validation.js
│   ├── learning/
│   │   └── validation-test.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

*This tree highlights the main application files. Other configuration files and dependencies may exist in the repository.*

## 🔄 Application Architecture

TaskFlow separates frontend responsibilities from backend and database operations.

```text
User
  │
  ▼
React Dashboard and Components
  │
  ▼
TaskContext
  │
  ▼
taskApi.js
  │
  │ HTTP Requests
  ▼
Express REST API
  │
  ▼
Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
```

**How it works:**

1. The user interacts with the React interface.
2. `TaskContext` manages shared task state and coordinates task operations.
3. `taskApi.js` sends HTTP requests to the Express backend.
4. Routes direct requests to the appropriate controller.
5. Controllers handle HTTP requests and responses.
6. Services perform validation and database operations.
7. Mongoose communicates with MongoDB.
8. The API returns JSON responses to the frontend, while centralized error handling provides consistent error responses.

## 🚀 Getting Started

Follow these steps to run TaskFlow locally.

### Prerequisites

Install or configure the following:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas), or a local MongoDB server

### 1. Clone the repository

```bash
git clone https://github.com/venkatasairam296/taskflow.git
cd taskflow
```

### 2. Install frontend dependencies

Run this command from the project root:

```bash
npm install
```

### 3. Configure the backend

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_application_database_connection_string
MONGODB_TEST_URI=mongodb://127.0.0.1:27017/taskflow_test
```

- `MONGODB_URI` is used by the application.
- `MONGODB_TEST_URI` is used by the service and validation test script. Point it to a separate test database so tests do not modify application data. The example assumes a local MongoDB server; change it if your test database is hosted elsewhere.

Replace the example connection strings with values appropriate for your environment.

**Security:** Keep database credentials private. Never commit your real `.env` file to GitHub.

### 4. Install backend dependencies

From the project root, navigate to the backend:

```bash
cd backend
npm install
```

### 5. Start the backend server

Run this command from the `backend/` directory:

```bash
npm run dev
```

The backend uses port `5000` by default and connects to MongoDB before accepting requests.

Backend URL:

```text
http://localhost:5000
```

### 6. Configure the frontend API URL

Create a `.env` file in the project root, alongside the frontend `package.json`:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Vite exposes variables prefixed with `VITE_` to frontend code. Do not put database credentials or other secrets in this file.

If the frontend development server is already running, restart it after creating or changing the environment file.

### 7. Start the frontend

Keep the backend running. Open a **second terminal**, navigate to the project root, and run:

```bash
npm run dev
```

Open the frontend URL displayed in the terminal.

**Important:** Both the frontend development server and the backend server must be running while using the application.

## 📋 Task Data Model

Each task uses the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | String | Identifier exposed by the API |
| `_id` | MongoDB ObjectId | MongoDB document identifier |
| `title` | String | Required task title |
| `status` | String | Current task status |
| `priority` | String | Task priority |
| `category` | String | Task category |
| `dueDate` | Date | Optional task due date |
| `createdAt` | Date | Document creation timestamp |
| `updatedAt` | Date | Last update timestamp |

Mongoose timestamps provide `createdAt` and `updatedAt`. The model also exposes an `id` virtual in JSON output.

### Supported Statuses

- `pending`
- `in-progress`
- `completed`

### Supported Priorities

- `low`
- `medium`
- `high`

### Supported Categories

- `learning`
- `work`
- `personal`
- `project`
- `other`

## 🌐 REST API

The backend exposes the following task endpoints.

**Base URL**

```text
http://localhost:5000/api/tasks
```

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Retrieve tasks |
| `GET` | `/api/tasks/:id` | Retrieve a task by ID |
| `POST` | `/api/tasks` | Create a task |
| `PATCH` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Query Parameters

The task listing endpoint supports filtering by status and priority.

| Parameter | Example | Purpose |
|---|---|---|
| `status` | `?status=pending` | Filter by task status |
| `priority` | `?priority=high` | Filter by task priority |

Filters can be combined:

```http
GET /api/tasks?status=pending&priority=high
```

### Create a Task

**Request**

```http
POST /api/tasks
Content-Type: application/json
```

**Example JSON body**

```json
{
  "title": "Learn MongoDB",
  "status": "pending",
  "priority": "high",
  "category": "learning"
}
```

A successful request returns `201 Created` and the created task as JSON.

### Update a Task

**Request**

```http
PATCH /api/tasks/:id
Content-Type: application/json
```

**Example JSON body**

```json
{
  "title": "Learn MongoDB and Mongoose"
}
```

A successful request returns `200 OK` and the updated task.

### Delete a Task

**Request**

```http
DELETE /api/tasks/:id
```

A successful deletion returns `200 OK` with a confirmation message.

### Error Handling

The API uses HTTP status codes to communicate common errors.

| Status | Meaning |
|---|---|
| `400 Bad Request` | Invalid ID, invalid task data, or malformed JSON |
| `404 Not Found` | Requested task does not exist |
| `500 Internal Server Error` | Unexpected server-side error |

Unexpected server errors return a generic message to avoid exposing internal error details to clients.

## 🧪 Testing

TaskFlow has been tested using:

- **Thunder Client** for manual API requests and error scenarios.
- **Node.js assertions** for backend service and validation tests.

### Run Backend Tests

From the `backend/` directory, run:

```bash
node learning/validation-test.js
```

The current service and validation test script covers 11 scenarios:

1. Successful task creation
2. Rejection of an empty task title
3. Rejection of null task data
4. Successful task update
5. Rejection of an invalid update
6. Rejection of an empty update object
7. Successful deletion of an existing task
8. Handling of deletion for a nonexistent task
9. Rejection of array input as task data
10. Rejection of a non-string category when creating a task
11. Rejection of a non-string category when updating a task

The script connects using `MONGODB_TEST_URI`, cleans up its test records, and disconnects after the run. Keep the test URI pointed at a separate test database.

**Latest reported result:** 11 passed, 0 failed.

> These are the results of the current service tests, not a claim of complete automated frontend or API integration coverage. Run the script again after code changes to confirm the current result.

## 🎯 Future Improvements

The following are planned enhancements, not claims about existing functionality.

### Frontend
- [ ] Drag-and-drop task management
- [ ] Further accessibility and user-experience improvements

### Backend
- [ ] User authentication
- [ ] Authorization and protected routes
- [ ] Expanded automated API and integration tests

### Deployment
- [ ] Production build and optimization
- [ ] Frontend deployment
- [ ] Backend deployment
- [ ] Production environment configuration

Update this checklist as development progresses.

## 📚 Project Purpose

TaskFlow is a hands-on learning and portfolio project designed to build practical skills in modern frontend development, backend architecture, REST API design, database integration, input validation, error handling, and full-stack application development with the MERN stack.

The project emphasizes understanding how frontend state connects to backend services, how REST APIs interact with a database, and how to organize a maintainable application into clear responsibilities.

## 👨‍💻 Author

**GitHub:** [venkatasairam296](https://github.com/venkatasairam296)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
