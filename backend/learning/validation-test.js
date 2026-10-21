
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import {
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService.js";

import Task from "../models/Task.js";

async function runTests() {
  let passed = 0;
  let failed = 0;
  let testTask;

  async function test(name, callback) {
    try {
      await callback();
      console.log(`PASS: ${name}`);
      passed++;
    } catch (error) {
      console.error(`FAIL: ${name} - ${error.message}`);
      failed++;
    }
  }

  // Test 1: Create a valid task
  await test("Valid task is created", async () => {
    testTask = await createTask({
      title: "Test service task",
      status: "pending",
      priority: "medium",
      category: "learning",
      dueDate: "2026-10-20"
    });

    assert.ok(testTask);
    assert.equal(testTask.title, "Test service task");
    assert.equal(testTask.status, "pending");
    assert.equal(testTask.priority, "medium");
  });

  // Test 2: Reject empty title during creation
  await test("Empty title is rejected with HTTP 400", async () => {
    await assert.rejects(
      createTask({
        title: "",
        status: "pending",
        priority: "medium",
        category: "learning",
        dueDate: "2026-10-20"
      }),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Title is required");
        return true;
      }
    );
  });

  // Test 3: Reject null task data
  await test("Null task data is rejected with HTTP 400", async () => {
    await assert.rejects(
      createTask(null),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Invalid task data");
        return true;
      }
    );
  });

  // Test 4: Update a task successfully
  await test("Valid task update succeeds", async () => {
    assert.ok(testTask, "A task must be created first");

    const updatedTask = await updateTask(testTask.id, {
      title: "Updated service task"
    });

    assert.ok(updatedTask);
    assert.equal(updatedTask.title, "Updated service task");
  });

  // Test 5: Reject empty title during update
  await test("Empty update title is rejected with HTTP 400", async () => {
    assert.ok(testTask, "A task must be created first");

    await assert.rejects(
      updateTask(testTask.id, { title: "" }),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Title is required");
        return true;
      }
    );
  });

  // Test 6: Reject an empty update object
  await test("Empty update object is rejected with HTTP 400", async () => {
    assert.ok(testTask, "A task must be created first");

    await assert.rejects(
      updateTask(testTask.id, {}),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "No fields to update");
        return true;
      }
    );
  });

  // Test 7: Delete an existing task
  await test("Existing task is deleted successfully", async () => {
    const taskToDelete = await createTask({
      title: "Task to delete",
      status: "pending",
      priority: "low",
      category: "learning",
      dueDate: "2026-10-20"
    });

    const deletedTask = await deleteTask(taskToDelete.id);

    assert.ok(deletedTask);
    assert.equal(deletedTask.id, taskToDelete.id);

    // Confirm the task no longer exists
    const deletedAgain = await deleteTask(taskToDelete.id);
    assert.equal(deletedAgain, null);
  });

  // Test 8: Deleting a nonexistent task returns null
  await test("Nonexistent task deletion returns null", async () => {
    const nonexistentId = new mongoose.Types.ObjectId();

    const deletedTask = await deleteTask(nonexistentId.toString());

    assert.equal(deletedTask, null);
  });

  await test("Array task data is rejected with HTTP 400", async () => {
    await assert.rejects(
      createTask([]),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Invalid task data");
        return true;
      }
    );
  });

  await test("Non-string category is rejected", async () => {
    await assert.rejects(
      createTask({
        title: "Category validation test",
        status: "pending",
        priority: "low",
        category: 123,
        dueDate: "2026-10-20"
      }),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Category must be string");
        return true;
      }
    );
  });

  await test("Non-string update category is rejected", async () => {
    assert.ok(testTask, "A task must be created first");

    await assert.rejects(
      updateTask(testTask.id, { category: 123 }),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, "Category must be string");
        return true;
      }
    );
  });

  console.log("\n--- Test Summary ---");
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}


async function main() {
  try {
    if (!process.env.MONGODB_TEST_URI) {
      throw new Error("MONGODB_TEST_URI is not defined");
    }

    await connectDB(process.env.MONGODB_TEST_URI);
    console.log("Test database connected\n");

    await runTests();
  } catch (error) {
    console.error("Test setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      try {
        // Clean up test records only.
        await Task.deleteMany({
          title: {
            $in: [
              "Test service task",
              "Updated service task",
              "Task to delete"
            ]
          }
        });

        console.log("Test records cleaned up");
      } catch (error) {
        console.error("Test cleanup failed:", error.message);
        process.exitCode = 1;
      } finally {
        await mongoose.disconnect();
        console.log("Test database disconnected");
      }
    }
  }
}

main();