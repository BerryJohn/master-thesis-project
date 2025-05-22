import { type TasksList } from "../../db/db";
import Column from "./Column";
import { useDocument, type AutomergeUrl } from "@automerge/react";

const Kanban = ({ docUrl }: { docUrl: AutomergeUrl }) => {
  const [doc] = useDocument<TasksList>(docUrl);

  return (
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="w-full grid grid-cols-3 gap-6 px-6">
        <Column
          tasks={doc?.tasks.filter((el) => el.status === "todo") ?? []}
          title="To Do"
          status="todo"
          docUrl={docUrl}
        />
        <Column
          tasks={doc?.tasks.filter((el) => el.status === "in-progress") ?? []}
          title="In Progress"
          status="in-progress"
          docUrl={docUrl}
        />
        <Column
          tasks={doc?.tasks.filter((el) => el.status === "done") ?? []}
          title="Done"
          status="done"
          docUrl={docUrl}
        />
      </div>
    </main>
  );
};

export default Kanban;
