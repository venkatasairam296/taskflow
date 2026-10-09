const allowedStatus = [
  "pending",
  "in-progress",
  "completed"
];

const allowedPriority = [
  "low",
  "medium",
  "high"
];

const allowedCategory = [
  "learning",
  "work",
  "personal",
  "project",
  "other"
];

const allowedKeys = [
  "title",
  "status",
  "priority",
  "category",
  "dueDate"
];

function isValidDateString(value) {
  if(typeof value !== "string") return false;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if(!match) return false;

  const [, year, month, day] = match;
  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() + 1 === Number(month) &&
    date.getUTCDate() === Number(day)
  );
}

export function validateTask(task){
  if(typeof task.title !== "string"){
    return "Title must be string";
  }

  if(!task.title || !task.title.trim()){
    return "Title is required";
  }

  if(typeof task.status !== "string"){
    return "Status must be string";
  }

  if(!allowedStatus.includes(task.status)){
    return "Invalid status";
  }

  if(typeof task.priority !== "string"){
    return "Priority must be string";
  }

  if(!allowedPriority.includes(task.priority)){
    return "Invalid priority";
  }

  if(typeof task.category !== "undefined" && !allowedCategory.includes(task.category)){
    return "Invalid category";
  }

  if("dueDate" in task && !isValidDateString(task.dueDate)){
    return "Invalid due date. Use YYYY-MM-DD format.";
  }

  return null;
}

export function validateTaskUpdate(updates) {
  const keys = Object.keys(updates);
  
  if(keys.length === 0){
    return "No fields to update";
  }

  for (const key of keys){
    if(!allowedKeys.includes(key)){
      return "Invalid field";
    }
  }

  if("title" in updates && typeof updates.title !== "string"){
    return "Title must be string";
  }

  if("title" in updates && !updates.title.trim()){
    return "Title is required";
  }

  if("status" in updates && typeof updates.status !== "string"){
    return "Status must be string";
  }
  
  if("status" in updates && !allowedStatus.includes(updates.status)){
    return "Invalid status";
  }

  if("priority" in updates && typeof updates.priority !== "string"){
    return "Priority must be string";
  }
  
  if("priority" in updates && !allowedPriority.includes(updates.priority)){
    return "Invalid priority";
  }

  if ("category" in updates &&
    !allowedCategory.includes(updates.category)) {
    return "Invalid category";
  }

  if ("dueDate" in updates && !isValidDateString(updates.dueDate)) {
    return "Invalid due date. Use YYYY-MM-DD format";
  }
  
  return null;
}