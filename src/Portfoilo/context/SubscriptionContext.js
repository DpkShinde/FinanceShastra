import React, { createContext, useState, useEffect } from "react";

export const SubscriptionContext = createContext();

export const SubscriptionModeProvider = ({ children }) => {
  const [subsMode, setsubs] = useState(() => {
    return localStorage.getItem("subsMode") === "false";
  });

 useEffect(() => {
     if (!subsMode) {
       localStorage.setItem("subsMode", "false")
     } 
   }, []);

  const subscribed = () => {
    setsubs(() => {
      localStorage.setItem("subsMode", "true");
    });
  };

  return (
    <SubscriptionContext.Provider value={{ subsMode, subscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
