// signup form that takes user name, email and password
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const VendorSignup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("Select Category");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Name:", userName);
    console.log("Email:", email);
    console.log("Password", password);
    console.log("Category", category);
    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/vendor/login");
  };

  return (
    <div className="AuthForm">
      <h1>Vendor Signup</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Vendor Name</FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select Category" onChange={(e) => setCategory(e.target.value)}>
            <option value="cater">Catering</option>
            <option value="florist">Florist</option>
            <option value="decorator">Decoration</option>
            <option value="lighter">Lightning</option>
          </Select>
        </FormControl>
        <Button type="submit">Signup</Button>
      </form>
      <Button>
        <Link to="/vendor/login">Login</Link>
      </Button>
    </div>
  );
};

export default VendorSignup;
