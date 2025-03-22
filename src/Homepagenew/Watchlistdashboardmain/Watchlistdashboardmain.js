import React, { useState, useCallback, useEffect } from "react";
import "./Watchlistdashboardmain.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Cookies from 'js-cookie'
import { API_BASE_URL } from "../../config";

// Import icons
import reliance from "../../assest/reliance.png";
import hdfc from "../../assest/hdfcbank.png";
import airtel from "../../assest/bhartiartl.png";
import infosys from "../../assest/infosyss.png";
import lic from "../../assest/lici.png";
import { useNavigate } from "react-router-dom";

const Watchlistdashboardmain = () => {
  const watchlistdashboardmainData = [
    { id: 1, name: "Reliance Industries Ltd", price: "₹1,272.15", change: "1.32%", changeType: "up", icon: reliance },
    { id: 2, name: "HDFC Bank Ltd.", price: "₹1,862.75", change: "-0.48%", changeType: "down", icon: hdfc },
    { id: 3, name: "Bharti Airtel Ltd.", price: "₹1,664.40", change: "1.03%", changeType: "up", icon: airtel },
    { id: 4, name: "Infosys Ltd", price: "₹1,990.50", change: "-0.46%", changeType: "down", icon: infosys },
    { id: 5, name: "Life Insura Corp of India", price: "₹926.05", change: "0.63%", changeType: "up", icon: lic },
  ];

  const navigate = useNavigate()

  const [watchlistState, setWatchlistState] = useState();
  const [watchlistData, setWatchlistData] = useState();
 
  const fetchWatchlists = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data[0].watchlist_id)
      setWatchlistState(data[0].watchlist_id);
    } catch (error) {
      //alert(error.message || "Failed to fetch watchlists.");
      console.log(error.message || "Failed to fetch watchlists.");
    }
  };

  // Fetch watchlist assets
  const fetchWatchlistAssets = useCallback(async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/getWatchlistAssets?watchlist_id=${watchlistState}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setWatchlistData(data);
    } catch (error) {
      //alert(error.message || "Failed to fetch watchlist assets.");
    }
  }, [watchlistState]);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token){
      fetchWatchlists()
      fetchWatchlistAssets()
    }
    
  }, [])

  return (
    <div className="Watchlistdashboardmain-container">
      <div className="Watchlistdashboardmain-header">
        <h2 className="Watchlistdashboardmain-title">Watchlist</h2>
        <button className="Watchlistdashboardmain-add-button" onClick={() => navigate('/stockWatchlist')}>Add New</button>
      </div>
      <ul className="Watchlistdashboardmain-items">
        {watchlistdashboardmainData.map((item) => (
          <li key={item.id} className="Watchlistdashboardmain-item">
            <img src={item.icon} alt={item.name} className="Watchlistdashboardmain-icon" />
            <div className="Watchlistdashboardmain-info">
              <p className="Watchlistdashboardmain-name">{item.name}</p>
            </div>
            <div className="Watchlistdashboardmain-price-change">
              <p className="Watchlistdashboardmain-price">{item.price}</p>
              <p
                className={`Watchlistdashboardmain-change ${item.changeType === "up" ? "Watchlistdashboardmain-change-up" : "Watchlistdashboardmain-change-down"
                  }`}
              >
                {item.changeType === "up" ? <FaArrowUp /> : <FaArrowDown />} {item.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlistdashboardmain;