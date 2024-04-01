// welcome page for user

import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { Button } from "@chakra-ui/react";

const Dashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated();

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome {name}</h2>
            <ul>
                <li>
                <Button>
                    <Link to={`/user/profile/${_id}`}>Profile</Link>
                </Button>
                </li>
                <li>
                    <Link to={`/user/orders/${_id}`}>Orders</Link>
                </li>
            </ul>
        </div>
    );
}