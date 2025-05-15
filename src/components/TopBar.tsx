import React, { useState } from "react";

const TopBar: React.FC = () => {
  const [online, setOnline] = useState(false);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            UEK LocalFirst Kanban
          </span>
        </div>
        {/* Profile / Actions */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setOnline((prev) => !prev)}
            className={`px-4 py-1 rounded transition-colors font-medium focus:outline-none ${
              online
                ? "bg-green-500 text-white"
                : "bg-transparent text-black border border-gray-300"
            }`}
            aria-pressed={online}
          >
            {online ? "Online" : "Offline"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
