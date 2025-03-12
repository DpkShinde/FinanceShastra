import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For scroll navigation
import './Earninginsightdetailheader.css';
import { Divider } from '@mui/material';

function Earninginsightheader() {
  const [change, setChange] = useState(0); // For storing dynamic change value in rupees
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPrice, setCurrentPrice] = useState(300); // Example initial stock price, replace with actual price

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

    // Update the current price after the change is applied
    setCurrentPrice((prevPrice) => {
      const newPrice = parseFloat(prevPrice) + parseFloat(randomChange);
      return newPrice.toFixed(1);
    });
  };

  // Fetch data initially and set an interval to update it
  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="graphcontainerer">
      <div className="graphheaderer">
        <div className="title-container">
          <h1 className="telephone">State Bank Of India</h1>
        </div>
        <div className="graph-price-update">
          <span style={{fontSize:"20px"}}className={`graphprice ${change >= 0 ? 'positive' : 'negative'}`}>
            ₹{parseFloat(currentPrice).toLocaleString()}
          </span>
          <span className="graphupdate">Last updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="graphstock-infoo">
        <span className="graphnse">NSE : ITI</span>
        <span className="graphsector">Services</span>
      </div>

      {/* Navigation Links */}
      <nav className="graphnavbar">
        <Divider />
        <ScrollLink
          to="overview"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Overview
        </ScrollLink>
        <ScrollLink
          to="financials"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Financials
        </ScrollLink>
        <ScrollLink
          to="income"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Income Statement
        </ScrollLink>
        <ScrollLink
          to="valuation"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Balance Sheet
        </ScrollLink>
        <ScrollLink
          to="stockanalysis"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Cash Flow
        </ScrollLink>
        <ScrollLink
          to="analysis-notes"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Ratios
        </ScrollLink>
        <ScrollLink
          to="stockpeer"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          Peers
        </ScrollLink>
        <ScrollLink
          to="news"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          News
        </ScrollLink>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          activeClass="active-link"
        >
          About
        </ScrollLink>
        <Divider />
      </nav>

      <Divider sx={{ margin: '10px 0' }} />
    </div>
  );
}

export default Earninginsightheader;