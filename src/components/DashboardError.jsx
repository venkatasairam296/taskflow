const DashboardError = ({ message, onRetry }) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white p-6 dark:bg-gray-900">
      <div
        role="alert"
        className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-gray-800"
      >
        {/* Error icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600 dark:text-red-400"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        {/* Error heading */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Unable to load your dashboard
        </h2>

        {/* Error message */}
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {message ||
            "We couldn't retrieve your tasks. Please check your connection and try again."}
        </p>

        {/* Retry action */}
        <button
          type="button"
          onClick={onRetry}
          disabled={!onRetry}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 7v5h-5" />
            <path d="M4 17v-5h5" />
            <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12" />
            <path d="M18.4 15a7 7 0 0 1-11.6 2L4 12" />
          </svg>
          Try again
        </button>
      </div>
    </div>
  );
};

export default DashboardError;