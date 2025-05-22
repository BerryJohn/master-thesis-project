import React from "react";
import type { TasksList } from "../../db/db";
import { useDocument, type AutomergeUrl } from "@automerge/react";

interface EditTaskProps {
  isOpen: boolean;
  handleClose: () => void;
  docUrl: AutomergeUrl;
  taskId: number | null;
}

const EditTask = ({ isOpen, handleClose, docUrl, taskId }: EditTaskProps) => {
  const [doc, changeDoc] = useDocument<TasksList>(docUrl);

  const task = doc?.tasks.find((t) => t.id === taskId);

  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const statusRef = React.useRef<HTMLSelectElement>(null);
  const priorityRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    if (task && isOpen) {
      if (titleRef.current) titleRef.current.value = task.title;
      if (descriptionRef.current)
        descriptionRef.current.value = task.description;
      if (statusRef.current) statusRef.current.value = task.status;
      if (priorityRef.current) priorityRef.current.value = task.priority;
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const title = titleRef.current?.value.trim() || "";
    const description = descriptionRef.current?.value || "";
    const status =
      (statusRef.current?.value as "todo" | "in-progress" | "done") || "todo";
    const priority =
      (priorityRef.current?.value as "low" | "medium" | "high") || "medium";
    if (!title) return;

    changeDoc((d) => {
      const t = d.tasks.find((t) => t.id === taskId);
      if (t) {
        t.title = title;
        t.description = description;
        t.status = status;
        t.priority = priority;
        t.lastUpdate = new Date();
      }
    });

    handleClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white p-6 rounded shadow-md flex flex-col gap-4 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={handleClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Edit task</h2>
          <input
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Title"
            ref={titleRef}
            required
            defaultValue={task.title}
          />
          <textarea
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Description"
            ref={descriptionRef}
            rows={3}
            defaultValue={task.description}
          />
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={statusRef}
            required
            defaultValue={task.status}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={priorityRef}
            required
            defaultValue={task.priority}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
