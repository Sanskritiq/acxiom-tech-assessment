// make userApp with routes as shown below
// user/login
// user/signup
// user/${_id}/dashboard
// user/${_id}/guestlist
// user/${_id}/vendorlist
// user/${_id}/cart
// user/${_id}/orderlist

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import GuestList from './GuestList';
import VendorList from './VendorList';
import Cart from './Cart';
import OrderList from './OrderList';
// import UserLogin from './UserLogin';

const UserApp = () => {
    // const { user: { name, password } } = isAuthenticated();
    return (
        <BrowserRouter>
            <Routes>
            {/* <Route path="/user/login" element={UserLogin} /> */}
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/user/guestlist" component={GuestList} />
            <Route path="/user/vendorlist" component={VendorList} />
            <Route path="/user/cart" component={Cart} />
            <Route path="/user/orderlist" component={OrderList} />
            </Routes>
        </BrowserRouter>
    );
}

export default UserApp;