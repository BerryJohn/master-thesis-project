import type { KanbanTask } from "../../db/db";
import { useDrag, type DragSourceMonitor } from "react-dnd";

type TaskProps = {
  task: KanbanTask;
  handleOpenEditTask: (id: number) => void;
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

export const Task = ({ task, handleOpenEditTask }: TaskProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id, name: task.title },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  );

  return (
    <div
      ref={drag as any}
      style={{ opacity }}
      className="rounded-lg shadow-md bg-white p-4 flex flex-col gap-3 border hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-semibold text-lg break-words">
            {task.title}
          </span>
          {task.description && (
            <p
              className="text-gray-600 text-sm max-h-20 overflow-y-auto break-words whitespace-pre-line"
              style={{ wordBreak: "break-word" }}
              title={task.description}
            >
              {task.description}
            </p>
          )}
        </div>
        <button
          className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => {
            handleOpenEditTask(task.id);
          }}
          title="Edit Task"
        >
          Edit
        </button>
      </div>
      <div className="flex items-center  mt-2 flex-wrap gap-2">
        <span
          className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}
        >
          {task.status.replace(/^\w/, (c) => c.toUpperCase())}
        </span>
        {task.priority && (
          <span
            className={`text-xs px-2 py-1 rounded ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
        )}
        <span className="text-xs text-gray-400">
          Last update:{" "}
          {task.lastUpdate ? new Date(task.lastUpdate).toLocaleString() : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default Task;
