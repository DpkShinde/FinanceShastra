import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';  // For scroll navigation
import './Nifty50topheader.css'

import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Nifty50topheader() {
  const [change, setChange] = useState(0); // For storing dynamic change value in rupees
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPrice, setCurrentPrice] = useState(300); // Example initial stock price, replace with actual price
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the path
  };
  // Function to simulate fetching data (replace with real API call)
  const fetchData = () => {
    const randomChange = (Math.random() * 20 - 10).toFixed(2); // Random value between -10 and +10 INR
    setChange(randomChange);

    const currentTime = new Date();
    setLastUpdated(currentTime.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }));

    // Update the current price after the change is applied, ensuring that the values are numbers
    setCurrentPrice(prevPrice => {
      const newPrice = parseFloat(prevPrice) + parseFloat(randomChange); // Ensure both values are numbers
      return newPrice.toFixed(1); // Now .toFixed works on a number
    });
  };

  // Fetch data initially and set an interval to update it
  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="graphcontainerernifty50">
      <div className="graphheadernifty">
        <div className="title-containernifty">
          <h1 className="telephoneniftyh1">Nifty 50</h1>
        </div>
        <div className="graph-price-update">
        <span style={{fontSize:"20px"}}className={`graphpricenifty50 ${change >= 0 ? 'positive' : 'negative'}`}>

            ₹{parseFloat(currentPrice).toLocaleString()} {/* Format the price with ₹ symbol */}
          </span>
          <span className="graphupdatenifty50">Last updated: {lastUpdated}</span>
        </div>
      </div>

     
      <nav className="graphnavbarrnifty50">
      <Divider />
      
      {/* Overview link with smooth scroll and route navigation */}
      <ScrollLink to="overview" smooth={true} duration={500}>
        <span 
          onClick={() => handleNavigation("/nifty50pageall")} 
          style={{ cursor: "pointer" }}
        >
          Overview
        </span>
      </ScrollLink>

      {/* Sectors link with smooth scroll */}
      <ScrollLink to="stockxray" smooth={true} duration={500}>
      <span 
          onClick={() => handleNavigation("/SectorWeightageTableniffty50")} 
          style={{ cursor: "pointer" }}
        >
        Sectors
        </span>
      </ScrollLink>

      {/* Companies link with smooth scroll */}
      <ScrollLink to="stockearning" smooth={true} duration={500}>
      <span 
          onClick={() => handleNavigation("/nifty50screenerStockList")} 
          style={{ cursor: "pointer" }}
        >
        Companies
        </span>
      </ScrollLink>

      {/* Optional Divider */}
      <Divider />
    </nav>

      <Divider sx={{ margin: '10px 0' }} />
    </div>
  );
}

export default Nifty50topheader;