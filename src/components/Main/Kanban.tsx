"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type KanbanTask, type TasksList } from "../../db/db";
import Column from "./Column";
import { useDocument, type AutomergeUrl } from "@automerge/react";
// import { repo } from "../../main";

// const listHandle = repo.create<{ tasks: KanbanTask[] }>({
//   tasks: [
//     {
//       id: 1,
//       title: "Task 1",
//       description: "Description for Task 1",
//       status: "todo",
//       priority: "high",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       assignedTo: "User 1",
//     },
//   ],
// });

const Kanban = ({ docUrl }: { docUrl: AutomergeUrl }) => {
  const [doc, changeDoc] = useDocument<TasksList>(docUrl);

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

  // if (!doc) return <div>Loading...</div>;

  // Now we can get the tasks out of the document and render them below.
  // const { tasks } = doc;

  if (doc?.tasks) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
        {doc.tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded mb-4">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Assigned to: {task.assignedTo}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            changeDoc((d) =>
              d.tasks.unshift({
                title: "",
                description: "",
                status: "todo",
                priority: "low",
                createdAt: new Date(),
                updatedAt: new Date(),
                assignedTo: "",
                id: Math.floor(Math.random() * 1000000),
              })
            );
          }}
        >
          add
        </button>
      </div>
    );
  }

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
