// make a login form that takes userid and password
import React, { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const VendorLogin = () => {
  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Name:", username);
    console.log("Password", password);
  };

  return (
    <div className="AuthForm">
      <h1>Vendor Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Vendor Name</FormLabel>
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
        <Link to="/vendor/signup">Signup</Link>
      </Button>
    </div>
  );
};

export default VendorLogin;
