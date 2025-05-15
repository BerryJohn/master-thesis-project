import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { db } from "../../db/db";
import Task from "./Task";

const Kanban: React.FC = () => {
  const todoTasks = useLiveQuery(async () => {
    const tasks = await db.tasks.where("status").equals("todo").toArray();

    return tasks;
  }, []);

  const inProgressTasks = useLiveQuery(async () => {
    const tasks = await db.tasks
      .where("status")
      .equals("in-progress")
      .toArray();

    return tasks;
  }, []);

  const doneTasks = useLiveQuery(async () => {
    const tasks = await db.tasks.where("status").equals("done").toArray();

    return tasks;
  }, []);

  return (
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 min-h-[400px] flex flex-col gap-4">
          <h2 className="font-bold mb-4">To Do</h2>
          {todoTasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <div className="bg-white rounded shadow p-4 min-h-[400px] flex flex-col gap-4">
          <h2 className="font-bold mb-4">In Progress</h2>
          {inProgressTasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <div className="bg-white rounded shadow p-4 min-h-[400px] flex flex-col gap-4">
          <h2 className="font-bold mb-4">Done</h2>
          {doneTasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Kanban;
