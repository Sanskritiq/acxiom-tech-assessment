// make userApp with routes as shown below
// user/${_id}/login
// user/${_id}/signup
// user/${_id}/dashboard
// user/${_id}/guestlist
// user/${_id}/vendorlist
// user/${_id}/cart
// user/${_id}/orderlist

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GuestList from './GuestList';
import VendorList from './VendorList';
import Cart from './Cart';
import OrderList from './OrderList';

const UserApp = () => {
    return (
        <Switch>
            <Route path="/user/:userId/login" component={Login} />
            <Route path="/user/:userId/signup" component={Signup} />
            <Route path="/user/:userId/dashboard" component={Dashboard} />
            <Route path="/user/:userId/guestlist" component={GuestList} />
            <Route path="/user/:userId/vendorlist" component={VendorList} />
            <Route path="/user/:userId/cart" component={Cart} />
            <Route path="/user/:userId/orderlist" component={OrderList} />
        </Switch>
    );
}

export default UserApp;