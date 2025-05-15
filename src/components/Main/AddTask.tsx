import React, { useState } from "react";
import { db } from "../../db/db";

interface AddTaskProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ isOpen, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask();
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setAssignedTo("");
    handleClose();
  };

  const addTask = async () => {
    try {
      const id = await db.tasks.add({
        title,
        description,
        status,
        priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedTo,
      });
      console.log(`Task ${title} successfully added. Got id ${id}`);
    } catch (error) {
      console.error(`Failed to add ${title}: ${error}`);
    }
  };

  return (
    <>
      {isOpen && (
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
              <h2 className="text-xl font-semibold mb-2">Add Kanban Task</h2>
              <input
                type="text"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "todo" | "in-progress" | "done")
                }
                required
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
                required
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="text"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
