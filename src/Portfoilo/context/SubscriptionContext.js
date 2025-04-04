import React, { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [issubscribed, setisSubed] = useState(false);

  useEffect(() => {
    const CookieToken = Cookies.get("jwtToken");
    if (CookieToken) {
      const fetchdata = async () => {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CookieToken}`,
          },
        };
        const url = `${API_BASE_URL}/userPayment/usertoken`;

        try {
          const response = await fetch(url, options);
          const data = await response.json(); // Convert response to JSON
          
          if (data.length === 0) {
            setisSubed(false);
          } else {
            setisSubed(true);
          }
        } catch (error) {
          console.error("Error fetching user payment details:", error);
        }
      };
      fetchdata();
    }
  }, []);

  return (
    <SubscriptionContext.Provider value={{ issubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
