import { Link, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";

const TaskDetails = () => {
  const { id } = useParams();
  const { tasks } = useTasks();

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl py-10">
          <h1 className="text-2xl font-bold text-slate-900">
            Task Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't find a task with ID {id}.
          </p>

          <Link
            to="/tasks"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/tasks"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Tasks
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            {task.title}
          </h1>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </p>
              <p className="mt-1 text-slate-700">{task.status}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Priority
              </p>
              <p className="mt-1 text-slate-700">{task.priority}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Category
              </p>
              <p className="mt-1 text-slate-700">{task.category}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Due Date
              </p>
              <p className="mt-1 text-slate-700">{task.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;