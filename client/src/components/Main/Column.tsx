import { useDocument, type AutomergeUrl } from "@automerge/react";
import {
  type KanbanTask,
  type Status,
  type TasksList,
} from "../../types/kanban";
import Task from "./Task";
import { useDrop } from "react-dnd";

type ColumnProps = {
  tasks: KanbanTask[];
  title: string;
  status: "todo" | "in-progress" | "done";
  docUrl: AutomergeUrl;
  handleOpenEditTask: (id: number) => void;
};

const Column = ({
  tasks,
  title,
  status,
  docUrl,
  handleOpenEditTask,
}: ColumnProps) => {
  const [, changeDoc] = useDocument<TasksList>(docUrl);

  const updateTaskStatus = (taskId: number, newStatus: Status) => {
    changeDoc((d) => {
      const taskIndex = d.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        d.tasks[taskIndex].status = newStatus;
        d.tasks[taskIndex].lastUpdate = new Date();
      }
    });
  };

  const deleteTask = (taskId: number) => {
    changeDoc((d) => {
      const taskIndex = d.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        d.tasks.splice(taskIndex, 1);
      }
    });
  };

  const [, drop] = useDrop(() => ({
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
        <Task
          key={task.id}
          task={task}
          handleOpenEditTask={handleOpenEditTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default Column;
