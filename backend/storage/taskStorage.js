import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/tasks.json");

export async function loadTasks() {
  const readedData = await readFile(dataPath, "utf-8");

  const tasks = JSON.parse(readedData);

  if(!Array.isArray(tasks)){
    throw new Error("Tasks data must be an array");
  }

  return tasks;
}

export async function saveTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("Tasks data must be an array");
  }
  const data = JSON.stringify(tasks, null, 2);

  await writeFile(dataPath, data);
}