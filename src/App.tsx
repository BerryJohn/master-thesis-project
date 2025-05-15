import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Kanban from "./components/Main/Kanban";
import TopBar from "./components/TopBar";
import AddTask from "./components/Main/AddTask";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
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
        <Kanban />
      </DndProvider>
      <Footer />
      <AddTask isOpen={openAddTask} handleClose={handleCloseAddTask} />
    </div>
  );
}

export default App;
