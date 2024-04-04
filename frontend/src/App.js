import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Routes and Route
import HomePage from "./Pages/HomePage";
import UserSignup from "./User/UserSignup";
import AdminSignup from "./Admin/AdminSignup";
import VendorSignup from "./Vendor/VendorSignup";
import UserLogin from "./User/UserLogin";
import AdminLogin from "./Admin/AdminLogin";
import VendorLogin from "./Vendor/VendorLogin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {" "}
          {/* Wrap your Routes in a Routes element */}
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/user/signup" element={<UserSignup />} />{" "}
          <Route path="/admin/signup" element={<AdminSignup />} />{" "}
          <Route path="/vendor/signup" element={<VendorSignup />} />{" "}
          <Route path="/user/login" element={<UserLogin />} />{" "}
          <Route path="/admin/login" element={<AdminLogin />} />{" "}
          <Route path="/vendor/login" element={<VendorLogin />} />{" "}
          {/* Use Route as a child of Routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
