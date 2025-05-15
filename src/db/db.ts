// db.ts
import Dexie, { type EntityTable } from "dexie";

export type KanbanTask = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string;
};

const db = new Dexie("KanbanDB") as Dexie & {
  tasks: EntityTable<
    KanbanTask,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tasks:
    "++id,title,description,status,priority,createdAt,updatedAt,assignedTo",
});

export { db };
