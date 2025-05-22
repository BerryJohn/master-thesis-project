import { Suspense, useState } from "react";
import Footer from "./components/Footer";
import Kanban from "./components/Main/Kanban";
import TopBar from "./components/TopBar";
import AddTask from "./components/dialogs/AddTask";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import type { AutomergeUrl } from "@automerge/react";
import EditTask from "./components/dialogs/EditTask";

const App = ({ docUrl }: { docUrl: AutomergeUrl }) => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };
  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  const handleOpenEditTask = (id: number) => {
    setTaskId(id);
    setOpenEditTask(true);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <TopBar openAddTask={handleOpenAddTask} />
      <DndProvider backend={HTML5Backend}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          }
        >
          {docUrl && (
            <Kanban docUrl={docUrl} handleOpenEditTask={handleOpenEditTask} />
          )}
        </Suspense>
      </DndProvider>
      <Footer />
      <AddTask
        isOpen={openAddTask}
        handleClose={handleCloseAddTask}
        docUrl={docUrl}
      />
      <EditTask
        isOpen={openEditTask}
        handleClose={() => setOpenEditTask(false)}
        docUrl={docUrl}
        taskId={taskId}
      />
    </div>
  );
};

export default App;
