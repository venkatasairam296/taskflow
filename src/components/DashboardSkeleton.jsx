const DashboardSkeleton = () => {
  const skeletonCards = [1, 2, 3, 4];
  const boardColumns = ["pending", "in-progress", "completed"];
  const taskCards = [1, 2];

  const placeholder =
    "rounded bg-gray-200 dark:bg-gray-700";

  const cardStyles =
    "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4";

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Dashboard heading */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          Loading your dashboard...
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Getting your tasks ready
        </p>
      </header>

      {/* Statistics skeleton */}
      <section
        aria-label="Loading dashboard statistics"
        aria-busy="true"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skeletonCards.map((card) => (
            <div key={card} className={cardStyles}>
              <div className="space-y-4 animate-pulse">
                <div className={`h-3 w-1/2 ${placeholder}`} />
                <div className={`h-7 w-1/3 ${placeholder}`} />
                <div className={`h-3 w-3/4 ${placeholder}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and filters skeleton */}
      <section
        className={`${cardStyles} mt-6`}
        aria-label="Loading task filters"
        aria-busy="true"
      >
        <div className="space-y-3 animate-pulse">
          {/* Search field */}
          <div
            className={`h-10 w-full rounded-lg ${placeholder}`}
          />

          {/* Filter controls */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {skeletonCards.slice(0, 3).map((filter) => (
              <div
                key={filter}
                className={`h-10 w-full rounded-lg ${placeholder}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Task board skeleton */}
      <section
        className="mt-6"
        aria-label="Loading task board"
        aria-busy="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className={`h-5 w-32 animate-pulse ${placeholder}`} />
          <div className={`h-9 w-24 animate-pulse rounded-lg ${placeholder}`} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {boardColumns.map((column) => (
            <div key={column} className={cardStyles}>
              {/* Column heading */}
              <div className="mb-4 flex items-center justify-between">
                <div className={`h-4 w-1/2 animate-pulse ${placeholder}`} />
                <div className={`h-6 w-6 animate-pulse rounded-full ${placeholder}`} />
              </div>

              {/* Task cards */}
              <div className="space-y-3">
                {taskCards.map((task) => (
                  <div
                    key={task}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="space-y-3 animate-pulse">
                      <div className={`h-3 w-3/4 ${placeholder}`} />
                      <div className={`h-3 w-1/2 ${placeholder}`} />

                      {/* Priority and due-date placeholders */}
                      <div className="flex items-center justify-between pt-2">
                        <div className={`h-5 w-16 rounded-full ${placeholder}`} />
                        <div className={`h-3 w-14 ${placeholder}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardSkeleton;