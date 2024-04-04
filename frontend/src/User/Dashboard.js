// welcome page for user

import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div>
        <h1>Welcome to the User Dashboard</h1>
        <Button>
          <Link to="/user/vendorlist">Vendor List</Link>
        </Button>
        <Button>
          <Link to="/user/cart">Cart</Link>
        </Button>
        <Button>
          <Link to="/user/orderlist">Order List</Link>
        </Button>
        <Button>
          <Link to="/user/guestlist">Guest List</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;