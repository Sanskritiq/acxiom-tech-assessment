import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import VendorApp from "./Vendor/VendorApp";

import AdminApp from "./Admin/AdminApp";
import reportWebVitals from "./reportWebVitals";
import UserApp from "./User/UserApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
// const vendorRoot = ReactDOM.createRoot(document.getElementById("vendor-root"));
// vendorRoot.render(
//     <VendorApp />
// );
// const adminRoot = ReactDOM.createRoot(document.getElementById("admin-root"));
// adminRoot.render(
//     <AdminApp />
// );
// const userRoot = ReactDOM.createRoot(document.getElementById("user-root"));
// userRoot.render(
//     <UserApp />
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
