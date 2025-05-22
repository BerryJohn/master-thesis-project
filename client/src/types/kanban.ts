export type KanbanTask = {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Piority;
  createdAt: Date;
  lastUpdate: Date;
};

export type Piority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export type TasksList = {
  tasks: KanbanTask[];
};
