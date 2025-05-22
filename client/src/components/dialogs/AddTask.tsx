import React from "react";
import type { Piority, Status, TasksList } from "../../types/kanban";
import { useDocument, type AutomergeUrl } from "@automerge/react";

interface AddTaskProps {
  isOpen: boolean;
  handleClose: () => void;
  docUrl: AutomergeUrl;
}

const AddTask = ({ isOpen, handleClose, docUrl }: AddTaskProps) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const statusRef = React.useRef<HTMLSelectElement>(null);
  const priorityRef = React.useRef<HTMLSelectElement>(null);

  const [, changeDoc] = useDocument<TasksList>(docUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim() || "";
    const description = descriptionRef.current?.value || "";
    const status = (statusRef.current?.value as Status) || "todo";
    const priority = (priorityRef.current?.value as Piority) || "medium";
    if (!title) return;

    addTask(title, description, status, priority);

    titleRef.current && (titleRef.current.value = "");
    descriptionRef.current && (descriptionRef.current.value = "");
    statusRef.current && (statusRef.current.value = "todo");
    priorityRef.current && (priorityRef.current.value = "medium");

    handleClose();
  };

  const addTask = (
    title: string,
    description: string,
    status: Status,
    priority: Piority
  ) => {
    changeDoc((d) => {
      d.tasks.push({
        id: Date.now(),
        title,
        description,
        status,
        priority,
        createdAt: new Date(),
        lastUpdate: new Date(),
      });
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded shadow-md flex flex-col gap-4 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2">Add task</h2>
              <input
                type="text"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Title"
                ref={titleRef}
                required
                defaultValue=""
              />
              <textarea
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Description"
                ref={descriptionRef}
                rows={3}
                defaultValue=""
              />
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ref={statusRef}
                required
                defaultValue="todo"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ref={priorityRef}
                required
                defaultValue="medium"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
