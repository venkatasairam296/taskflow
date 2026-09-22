# TaskFlow

A modern task management application built with **React.js** and **Tailwind CSS**. TaskFlow helps users create, organize, update, and track tasks through a simple status-based task board.

> 🚧 **Project Status:** Actively under development

## ✨ Features

### Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Assign tasks to different statuses
* Prevent empty task creation

### Task Board

Tasks are organized into three columns:

* 🟡 **Pending**
* 🔵 **In Progress**
* 🟢 **Completed**

Each column dynamically displays the number of tasks and provides an empty-state message when no tasks are available.

### Dashboard

* Total task count
* Pending task count
* In-progress task count
* Completed task count
* Responsive dashboard layout

### Data Persistence

* Tasks are stored in the browser using **localStorage**
* Data remains available after refreshing the page

### UI & UX

* Responsive design
* Clean modern interface
* Tailwind CSS styling
* Status-based visual indicators
* Hover states and interactive buttons
* Responsive task board layout

## 🛠️ Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| React.js          | Frontend UI development       |
| Tailwind CSS      | Styling and responsive design |
| JavaScript (ES6+) | Application logic             |
| Vite              | Development and build tool    |
| localStorage      | Client-side data persistence  |

## 🧠 React Concepts Used

This project is also being developed as a practical way to learn and apply modern React concepts.

* JSX
* Functional Components
* Props
* Event Handling
* `useState`
* `useEffect`
* Controlled Components
* Conditional Rendering
* Lists and Keys
* Immutable State Updates
* Array methods such as `map()`, `filter()`, and `find()`
* Context API
* Custom Hooks
* Component Composition
* Derived State
* Parent-to-child communication
* Callback functions
* Prop Drilling

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Dashboard.jsx
│   ├── TaskForm.jsx
│   ├── TaskCard.jsx
│   ├── TaskColumn.jsx
│   └── TaskBoard.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│   └── useTasks.js
│
├── App.jsx
├── main.jsx
└── index.css
```

> The project structure will evolve as additional features are implemented.

## 🔄 Application Flow

```text
User
 │
 ▼
Dashboard
 │
 ├── Create / Edit Task
 │
 ▼
Task Context
 │
 ├── Add Task
 ├── Edit Task
 ├── Complete Task
 └── Delete Task
 │
 ▼
Task Board
 │
 ├── Pending
 ├── In Progress
 └── Completed
 │
 ▼
localStorage
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow-react.git
```

### 2. Navigate to the project

```bash
cd taskflow-react
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local development URL shown in your terminal.

## 📋 Current Task Data Model

The current task structure is:

```javascript
{
  id: 1,
  title: "Learn React",
  status: "pending"
}
```

Supported statuses:

```text
pending
in-progress
completed
```

## 🎯 Future Improvements

The project is planned to evolve into a more complete MERN-based task management application.

### Frontend

* [ ] Search tasks
* [ ] Task priority
* [ ] Due dates
* [ ] Categories
* [ ] Advanced filtering
* [ ] Drag-and-drop task management
* [ ] React Router
* [ ] Task details page
* [ ] Form validation improvements
* [ ] Better reusable components

### Backend

* [ ] Express.js REST API
* [ ] MongoDB database
* [ ] CRUD API integration
* [ ] User authentication
* [ ] Authorization
* [ ] Protected routes

### Deployment

* [ ] Production build
* [ ] Frontend deployment
* [ ] Backend deployment
* [ ] Database hosting
* [ ] Environment variable configuration

## 📚 Project Purpose

TaskFlow is being developed as a hands-on learning and portfolio project to build practical skills in **React.js, modern frontend development, and the MERN stack**.

The project focuses on understanding how React applications are structured, how state flows between components, how shared state can be managed using Context API, and how frontend applications persist and manipulate data.

## 👨‍💻 Author

**Your Name**

GitHub: `https://github.com/YOUR_USERNAME`

---

⭐ If you find this project useful, consider giving it a star!


## Development

TaskFlow is currently being developed as a React task management application.
This line was added on the conflict branch.