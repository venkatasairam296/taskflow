import useTasks from "../hooks/useTasks";

const TaskCard = ({ task, handleEdit }) => {
  const { deleteTask, completeTask } = useTasks();

  // -----------------------------
  // Status styles
  // -----------------------------
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

  const currentStatus = statusStyles[task.status];

  // -----------------------------
  // Priority styles
  // -----------------------------
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

  const currentPriority = priorityStyles[task.priority];

  // -----------------------------
  // Category styles
  // -----------------------------
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

  const currentCategory =
    categoryStyles[task.category] || categoryStyles.other;

  // -----------------------------
  // Due date logic
  // -----------------------------
  function getDueDateInfo() {
    if (!task.dueDate) {
      return null;
    }

    // Convert today's date to YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate < today) {
      return {
        label: "Overdue",
        className: "text-red-600",
      };
    }

    if (task.dueDate === today) {
      return {
        label: "Due Today",
        className: "text-amber-600",
      };
    }

    return {
      label: "Due",
      className: "text-slate-500",
    };
  }

  const dueDateInfo = getDueDateInfo();

  // -----------------------------
  // Format date for UI
  // -----------------------------
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

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      {/* -----------------------------
          Header
      ----------------------------- */}
      <div className="mb-4 flex items-start justify-between gap-3">

        {/* Task Title */}
        <h3
          className={`break-words text-base font-semibold ${
            task.status === "completed"
              ? "text-slate-400 line-through"
              : "text-slate-900"
          }`}
        >
          {task.title}
        </h3>

        {/* Priority */}
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${currentPriority.badge}`}
        >
          {currentPriority.label}
        </span>
      </div>

      {/* -----------------------------
          Task Metadata
      ----------------------------- */}
      <div className="flex flex-wrap gap-2">

        {/* Status */}
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${currentStatus.badge}`}
        >
          {currentStatus.label}
        </span>

        {/* Category */}
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${currentCategory.badge}`}
        >
          {currentCategory.label}
        </span>

      </div>

      {/* -----------------------------
          Due Date
      ----------------------------- */}
      {task.dueDate && dueDateInfo && (
        <div className="mt-4 flex items-center gap-2 text-xs font-medium">

          <span className="text-sm">📅</span>

          <span className={dueDateInfo.className}>
            {dueDateInfo.label}
          </span>

          <span className="text-slate-400">
            {formatDueDate(task.dueDate)}
          </span>

        </div>
      )}

      {/* -----------------------------
          Actions
      ----------------------------- */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">

        {/* Edit */}
        <button
          onClick={() => handleEdit(task.id)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Edit
        </button>

        {/* Complete */}
        {task.status !== "completed" && (
          <button
            onClick={() => completeTask(task.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            Complete
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => deleteTask(task.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;