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

const allowedKeys = [
  "title",
  "status",
  "priority"
];

export function validateTask(task){
  if(!task.title || !task.title.trim()){
    return "Title is required";
  }

  if(!allowedStatus.includes(task.status)){
    return "Invalid status";
  }

  if(!allowedPriority.includes(task.priority)){
    return "Invalid priority";
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

  if("title" in updates && !updates.title.trim()){
    return "Title is required";
  }
  
  if("status" in updates && !allowedStatus.includes(updates.status)){
    return "Invalid status";
  }
  
  if("priority" in updates && !allowedPriority.includes(updates.priority)){
    return "Invalid priority";
  }
  
  return null;
}