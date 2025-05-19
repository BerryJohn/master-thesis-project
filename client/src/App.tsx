import { Suspense, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Kanban from "./components/Main/Kanban";
import TopBar from "./components/TopBar";
import AddTask from "./components/Main/AddTask";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import type { AutomergeUrl } from "@automerge/react";

const App = ({ docUrl }: { docUrl: AutomergeUrl }) => {
  const [openAddTask, setOpenAddTask] = useState(false);

  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };
  const handleCloseAddTask = () => {
    setOpenAddTask(false);
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
          {docUrl && <Kanban docUrl={docUrl} />}
        </Suspense>
      </DndProvider>
      <Footer />
      <AddTask isOpen={openAddTask} handleClose={handleCloseAddTask} />
    </div>
  );
};

export default App;
