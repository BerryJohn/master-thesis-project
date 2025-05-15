import React from "react";

const Kanban: React.FC = () => {
  return (
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-4">To Do</h2>
          <div className="bg-gray-200 rounded p-2 mb-2">Task 1</div>
          <div className="bg-gray-200 rounded p-2 mb-2">Task 2</div>
        </div>
        {/* In Progress Column */}
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-4">In Progress</h2>
          <div className="bg-yellow-200 rounded p-2 mb-2">Task 3</div>
        </div>
        {/* Done Column */}
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-4">Done</h2>
          <div className="bg-green-200 rounded p-2 mb-2">Task 4</div>
        </div>
      </div>
    </main>
  );
};

export default Kanban;
