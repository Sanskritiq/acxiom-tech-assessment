// make a login form that takes userid and password
import React, { useState } from "react";
import { FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Await, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import BACKEND_SERVER_URL from './Constant';


const UserLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Name:", username);
    console.log("Password", password);
    // send username and password to the backend server and navigate to the dashboard if valid
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   const res = await axios.post(`${BACKEND_SERVER_URL}/login`, {
    //     username,
    //     password,
    //   }, config);
    //   console.log("Login Successful", res.data);
    //   localStorage.setItem('userinfo', JSON.stringify(res.data));
    //   navigate("/user/dashboard");
    // } catch (error) {
    //   console.error("Login Failed", error);
    //   // Handle login failure, display error message, etc.
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
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
        <Link to="/user/signup">Signup</Link>
      </Button>
    </div>
  );
};

export default UserLogin;
