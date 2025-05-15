import "./App.css";
import Footer from "./components/Footer";
import Kanban from "./components/Main/Kanban";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Kanban />
      <Footer />
    </div>
  );
}

export default App;
