// make a login form that takes userid and password
import React, { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Login = () => {
  const BACKEND_SERVER_URL = process.env.SERVER_URL;
  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Name:", username);
    console.log("Password", password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>User Name</FormLabel>
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

export default Login;
