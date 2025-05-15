import { db, type KanbanTask } from "../../db/db";
import Task from "./Task";
import { useDrop } from "react-dnd";

const Column = ({
  tasks,
  title,
  status,
}: {
  tasks: KanbanTask[];
  title: string;
  status: "todo" | "in-progress" | "done";
}) => {
  const updateTaskStatus = async (
    taskId: number,
    newStatus: "todo" | "in-progress" | "done"
  ) => {
    try {
      await db.tasks.update(taskId, { status: newStatus });
    } catch (error) {
      console.error(`Failed to update task ${taskId}: ${error}`);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (droppedTodo: any) => {
      updateTaskStatus(droppedTodo.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      className={`bg-white rounded shadow p-4 min-h-[400px] max-h-[600px] flex flex-col gap-4 overflow-y-auto`}
      ref={drop as any}
    >
      <h2 className="font-bold mb-4">{title}</h2>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
