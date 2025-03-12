import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

//create context
export const PortfolioDashboardContext = createContext()

export const PortfolioDashboardProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const [myInvestment, setMyInvestment] = useState(0);
    const [latestValue, setLatestValue] = useState(0);
    const [unRealizedGains, setUnRealizedGains] = useState(0);
    const [realizedGains, setRealizedGains] = useState(0);
    const [capitalGains, setCapitalGains] = useState(0);

    // Function to fetch data from the backend
    const fetchData = async () => {
    try {
        setLoading(true);
        const token = Cookies.get("jwtToken");
        if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        navigate("/login")
        return;
        }

        const response = await fetch(`${API_BASE_URL}/myportfolio/dashboard`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        

        if (data.length > 0) {
        setMyInvestment(data[0].investment_cost || 0);
        setLatestValue(data[0].latest_value || 0);
        setUnRealizedGains(data[0].unrealized_gain || 0);
        setRealizedGains(data[0].realized_gain || 0);
        setCapitalGains(data[0].capital_gains || 0);
        } else {
        setError("No portfolio data found.");
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

    // Fetch data when the component mounts
    useEffect(() => {
    fetchData();
    }, []);
  return (
    <PortfolioDashboardContext.Provider value={{myInvestment, latestValue, unRealizedGains, realizedGains, capitalGains}}>
        {children}
    </PortfolioDashboardContext.Provider>
  )
}


