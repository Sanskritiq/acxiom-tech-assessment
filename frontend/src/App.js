import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Routes and Route
import HomePage from "./Pages/HomePage";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {" "}
          {/* Wrap your Routes in a Routes element */}
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          {/* Use Route as a child of Routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
