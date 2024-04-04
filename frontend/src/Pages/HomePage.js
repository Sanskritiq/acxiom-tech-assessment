import React, { useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const HomePage = () => {
  const [role, setRole] = useState("Select Role");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (role === "user") {
      window.location.href = "/user/login";
    } else if (role === "vendor") {
      window.location.href = "/vendor/login";
    } else if (role === "admin") {
      window.location.href = "/admin/login";
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (role === "user") {
      window.location.href = "/user/signup";
    } else if (role === "vendor") {
      window.location.href = "/vendor/signup";
    } else if (role === "admin") {
      window.location.href = "/admin/signup";
    }
  };

  return (
    <div className="AuthForm">
      <h1>Welcome to the homepage</h1>
      <FormControl isRequired>
        <FormLabel>Select Role</FormLabel>
        <Select value={role} onChange={handleRoleChange} placeholder="Select Role">
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </Select>
      </FormControl>
      <Button type="submit" onClick={handleLoginSubmit}>
        Login
      </Button>
      <Button type="submit" onClick={handleSignupSubmit}>
        Signup
      </Button>
    </div>
  );
};

export default HomePage;
