import { useState } from "react";

const TopBar = ({ openAddTask }: { openAddTask(): void }) => {
  const [online, setOnline] = useState(true);

  const toggleSync = () => {
    setOnline((prev) => {
      return !prev;
    });
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        <div className="flex items-center">
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            UEK LocalFirst Kanban
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleSync}
            className={`px-4 py-1 rounded transition-colors font-medium focus:outline-none ${
              online
                ? "bg-green-500 text-white"
                : "bg-transparent text-black border border-gray-300"
            }`}
            aria-pressed={online}
          >
            {online ? "Online" : "Offline"}
          </button>
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            onClick={openAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
