import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

// Create the context
export const PortfolioStocksContext = createContext();

// Provider Component
export const PortfolioStockProvider = ({ children }) => {
  const [stockTransactions, setStocksTransactions] = useState([]);
  const navigate= useNavigate()

  // Fetch transactions data
  const fetchStocks = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired, Please Login again");
      navigate('/login')
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/myportfolio/stocksTransactions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setStocksTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <PortfolioStocksContext.Provider value={{ stockTransactions, setStocksTransactions }}>
      {children}
    </PortfolioStocksContext.Provider>
  );
};
