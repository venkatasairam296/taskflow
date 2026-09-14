import useTasks from "../hooks/useTasks";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({ handleEdit }) => {
  const { tasks } = useTasks();

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

      <TaskColumn
        title="Pending"
        status="pending"
        tasks={pendingTasks}
        handleEdit={handleEdit}
      />

      <TaskColumn
        title="In Progress"
        status="in-progress"
        tasks={inProgressTasks}
        handleEdit={handleEdit}
      />

      <TaskColumn
        title="Completed"
        status="completed"
        tasks={completedTasks}
        handleEdit={handleEdit}
      />

    </div>
  );
};

export default TaskBoard;