import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const AdminApp = () => {
  // const { user: { name, password } } = isAuthenticated();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vendor/dashboard" component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
