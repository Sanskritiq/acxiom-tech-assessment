import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const VendorContext = createContext();

const VendorProvider = ({ children }) => {
  const [vendorinfo, setVendorInfo] = useState({});
  const [cartlist, setCartlist] = useState([]);
  const [orderlist, setOrderlist] = useState([]);
  const [guestlist, setGuestlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const vendorinfo = localStorage.getItem(JSON.parse("vendorinfo"));
    if (vendorinfo) {
      setVendorInfo(vendorinfo);

      navigate("/vendor/dashboard");
    } else {
      navigate("/vendor/login");
    }
  }, [navigate]);

  return (
    <VendorContext.Provider
      value={{
        vendorinfo,
        setVendorInfo,
        cartlist,
        setCartlist,
        orderlist,
        setOrderlist,
        guestlist,
        setGuestlist,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const VendorState = () => {
  return useContext(VendorContext);
};

export default VendorProvider;
