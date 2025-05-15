import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { db } from "../../db/db";
import Column from "./Column";

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
        <Column tasks={todoTasks ?? []} title="To Do" status="todo" />
        <Column
          tasks={inProgressTasks ?? []}
          title="In Progress"
          status="in-progress"
        />
        <Column tasks={doneTasks ?? []} title="Done" status="done" />
      </div>
    </main>
  );
};

export default Kanban;
