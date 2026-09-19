import { Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";

const TaskCard = ({ task, handleEdit }) => {
  const { deleteTask, completeTask } = useTasks();

  const statusStyles = {
    pending: {
      badge: "bg-amber-100 text-amber-700",
      label: "Pending",
    },

    "in-progress": {
      badge: "bg-blue-100 text-blue-700",
      label: "In Progress",
    },

    completed: {
      badge: "bg-emerald-100 text-emerald-700",
      label: "Completed",
    },
  };

  const priorityStyles = {
    low: {
      badge: "bg-slate-100 text-slate-700",
      label: "Low",
    },

    medium: {
      badge: "bg-amber-100 text-amber-700",
      label: "Medium",
    },

    high: {
      badge: "bg-red-100 text-red-700",
      label: "High",
    },
  };

  const categoryStyles = {
    learning: {
      badge: "bg-violet-100 text-violet-700",
      label: "Learning",
    },

    work: {
      badge: "bg-indigo-100 text-indigo-700",
      label: "Work",
    },

    personal: {
      badge: "bg-pink-100 text-pink-700",
      label: "Personal",
    },

    project: {
      badge: "bg-cyan-100 text-cyan-700",
      label: "Project",
    },

    other: {
      badge: "bg-slate-100 text-slate-700",
      label: "Other",
    },
  };

  const currentStatus =
    statusStyles[task.status] || statusStyles.pending;

  const currentPriority =
    priorityStyles[task.priority] || priorityStyles.low;

  const currentCategory =
    categoryStyles[task.category] || categoryStyles.other;

  function getDueDateInfo() {
    if (!task.dueDate) {
      return null;
    }

    const today = new Date().toISOString().split("T")[0];

    if (
      task.status !== "completed" &&
      task.dueDate < today
    ) {
      return {
        label: "Overdue",
        className: "text-red-600",
        background: "bg-red-50",
      };
    }

    if (
      task.status !== "completed" &&
      task.dueDate === today
    ) {
      return {
        label: "Due Today",
        className: "text-amber-600",
        background: "bg-amber-50",
      };
    }

    return {
      label: "Due",
      className: "text-slate-500",
      background: "bg-slate-50",
    };
  }

  function formatDueDate(date) {
    if (!date) {
      return "";
    }

    const [year, month, day] = date.split("-");

    const formattedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return formattedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const dueDateInfo = getDueDateInfo();

  const isCompleted = task.status === "completed";

  return (
    <article
      className={`group rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50/30"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">

          <Link
            to={`/tasks/${task.id}`}
            className={`break-words text-sm font-bold leading-6 md:text-base ${
              isCompleted
                ? "text-slate-400 line-through"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </Link>

          {/* Status + Category */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${currentStatus.badge}`}
            >
              {currentStatus.label}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${currentCategory.badge}`}
            >
              {currentCategory.label}
            </span>
          </div>
        </div>

        {/* Priority */}
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${currentPriority.badge}`}
        >
          {currentPriority.label}
        </span>
      </div>

      {/* Due Date */}
      {task.dueDate && dueDateInfo && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 ${dueDateInfo.background}`}
        >
          <span
            className="text-sm"
            aria-hidden="true"
          >
            📅
          </span>

          <span
            className={`text-xs font-bold ${dueDateInfo.className}`}
          >
            {dueDateInfo.label}
          </span>

          <span className="text-xs font-medium text-slate-400">
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => handleEdit(task.id)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-100"
        >
          Edit
        </button>

        {!isCompleted && (
          <button
            type="button"
            onClick={() => completeTask(task.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            Complete
          </button>
        )}

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;