import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <AllRoutes></AllRoutes>
      </div>
    </BrowserRouter>
  );
}

export default App;
