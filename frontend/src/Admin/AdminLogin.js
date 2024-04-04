// make a login form that takes userid and password
import React, { useState } from "react";
import { FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Name:", username);
    console.log("Password", password);
    toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/user/dashboard");
  };

  return (
    <div className="AuthForm">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Admin Name</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
      <Button>
        <Link to="/signup">Signup</Link>
      </Button>
    </div>
  );
};

export default AdminLogin;
