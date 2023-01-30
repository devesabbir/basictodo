import { BrowserRouter } from "react-router-dom";
import TaskContext from "./context/TaskContext";
import AllRoutes from "./routers/AllRoutes";
function App() {
  return (
    <TaskContext>
      <div className="App">
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </div>
    </TaskContext>
  );
}

export default App;
