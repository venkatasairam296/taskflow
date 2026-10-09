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
    type: String,
    enum: ["learning", "work", "personal", "project", "other"],
    default: "learning"
  },

  dueDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;