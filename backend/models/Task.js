import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  category: {
    type: String
  },

  dueDate: {
    type: Date
  }
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);

export default Task;