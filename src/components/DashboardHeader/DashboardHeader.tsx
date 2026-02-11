export function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 font-Inter">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h1 className="text-xl font-medium text-neutral-700 dark:text-gray-400">
              Welcome back,{" "}
              <span className="font-bold text-yellow-600 dark:text-blue-400">
                {/* {user?.name} */}
                Rahul
              </span>
            </h1>
            <div className="text-neutral-700 dark:text-gray-200 capitalize bg-green-100/50 w-fit px-2 py-1 rounded-lg text-xs">
              Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
