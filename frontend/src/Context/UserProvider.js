import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userinfo, setUserInfo] = useState({});
    const [cartlist, setCartlist] = useState([]);
    const [orderlist, setOrderlist] = useState([]);
    const [guestlist, setGuestlist] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userinfo = localStorage.getItem(JSON.parse('userinfo'))
        if(userinfo){
            setUserInfo(userinfo);

            navigate("/user/dashboard");
        }
        else{
            navigate("/user/login");
        }
    }, [navigate]);
    
    return (
        <UserContext.Provider value={{ 
            userinfo, setUserInfo, 
            cartlist, setCartlist, 
            orderlist, setOrderlist, 
            guestlist, setGuestlist 
        }}>
        {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
