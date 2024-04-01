// welcome home page that prints out welcome message
import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the homepage</h1>
      <FormControl isRequired>
        <FormLabel>Select Role</FormLabel>
        <Select>
          <option>User</option>
          <option>Vendor</option>
          <option>Admin</option>
        </Select>
      </FormControl>
      <Button>
        <Link to="/login">Login</Link>
      </Button>
      <Button>
        <Link to="/signup">Signup</Link>
      </Button>
    </div>
  );
}

export default HomePage;