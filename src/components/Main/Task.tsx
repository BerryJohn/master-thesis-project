import React from "react";
import type { KanbanTask } from "../../db/db";

type TaskProps = {
  task: KanbanTask;
};

const statusColors: Record<KanbanTask["status"], string> = {
  todo: "bg-gray-200 text-gray-700",
  "in-progress": "bg-blue-200 text-blue-700",
  done: "bg-green-200 text-green-700",
};

const priorityColors: Record<NonNullable<KanbanTask["priority"]>, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export const Task: React.FC<TaskProps> = ({ task }) => (
  <div className="rounded-lg shadow-md bg-white p-4 flex flex-col gap-2 border hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-lg">{task.title}</span>
      {task.priority && (
        <span
          className={`text-xs px-2 py-1 rounded ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
      )}
    </div>
    {task.description && (
      <p className="text-gray-600 text-sm">{task.description}</p>
    )}
    <div className="flex items-center justify-between mt-2">
      <span
        className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}
      >
        {task.status.replace(/^\w/, (c) => c.toUpperCase())}
      </span>
      <div className="flex items-center gap-2">
        {task.assignedTo && (
          <span className="text-xs text-gray-500">👤 {task.assignedTo}</span>
        )}
      </div>
    </div>
  </div>
);

export default Task;
