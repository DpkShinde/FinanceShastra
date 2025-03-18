import React, { useState } from "react";
import './PortfolioHoldingPage.css'
import { MdMoreVert } from "react-icons/md";
import { CiImport, CiShare1 } from "react-icons/ci";
import { RiAddCircleLine } from "react-icons/ri";
import varun from "../../assest/varunlogo.png";
import tcs from '../../assest/tcs.png';
import itc from "../../assest/itc.png";
import hdfc from "../../assest/hdfcbank.png";
import adani from "../../assest/adaniimg.png";
import { useNavigate } from "react-router-dom";
const PortfolioHoldingPage = () => {
   const navigate = useNavigate();
  const holdings = [
    {
      name: "Varun Beverages",
      shares: 125,
      percentage:24.25,
      invested: 62125,
      current: 73518,
      avgPrice: 497,
      cmp: 588.15,
      change: 1.6,
      changePercent: 0.27,
      profitLoss: 11393,
      profitLossPercent: 18.34,
       logo: varun, // Replace with actual logo URL
    },
    {
      name: "TCS",
      shares: 20,
      percentage:27.06,
      invested: 40943,
      current: 81965,
      avgPrice: 2047.15,
      cmp: 4098.25,
      change: -8.8,
      changePercent: -0.21,
      profitLoss: 41022,
      profitLossPercent: 100.19,
      logo: tcs,
    },
    {
      name: "ITC",
      shares: 200,
      percentage:29.89,
      invested: 37000,
      current: 90520,
      avgPrice: 185,
      cmp: 452.6,
      change: -2.55,
      changePercent: -0.56,
      profitLoss: 53520,
      profitLossPercent: 144.65,
     logo: itc,
    },
    {
      name: "HDFC Bank",
      shares: 30,
      percentage:20.25,
      invested: 29619,
      current: 51840,
      avgPrice: 987.3,
      cmp: 1728,
      change: 7.1,
      changePercent: 0.41,
      profitLoss: 22221,
      profitLossPercent: 75.02,
      logo: hdfc,
    },
    {
      name: "Adani Green",
      shares: 5,
      percentage:1.66,
      invested: 9111.5,
      current: 5017.5,
      avgPrice: 1822.3,
      cmp: 1003.5,
      change: 20.35,
      changePercent: 2.07,
      profitLoss: -4094,
      profitLossPercent: -44.93,
     logo: adani,
    },
  ];
  const [holding, setHolding] = useState(holdings);
  const [selectedFilter, setSelectedFilter] = useState("Invested value");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // Function to handle dropdown change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Sorting Logic based on filter selection
  const sortedHoldings = [...holding].sort((a, b) => {

    switch (selectedFilter) {
      case "CMP":
        return b.cmp - a.cmp; // Sort by Current Market Price (CMP)
      case "Profit%":
        return b.profitLossPercent - a.profitLossPercent; // Sort by Profit Percentage
      case "A to Z":
        return a.name.localeCompare(b.name); // Sort alphabetically
      case "Current value":
        return b.current - a.current; // Sort by current value
      case "Holding%":
        return b.percentage - a.percentage; // Sort by holding percentage
      default:
        return b.invested - a.invested; // Default: Sort by Invested Value
    }
  });

 // Function to add a new stock
 const handleAddStock = () => {
  navigate("/stockadd");
};
// Function to simulate importing data
const handleImportData = () => {
  const importedData = [
    {
      name: "Reliance",
      logo: "https://via.placeholder.com/30",
      shares: 50,
      percentage: 10,
      current: 75000,
      cmp: 1500,
      change: 10,
      changePercent: 0.7,
      invested: 72000,
      avgPrice: 1440,
      profitLoss: 3000,
      profitLossPercent: 4.2,
    },
    {
      name: "Infosys",
      logo: "https://via.placeholder.com/30",
      shares: 30,
      percentage: 8,
      current: 40000,
      cmp: 1333,
      change: -5,
      changePercent: -0.3,
      invested: 40500,
      avgPrice: 1350,
      profitLoss: -500,
      profitLossPercent: -1.2,
    },
  ];
  setHolding([...holding, ...importedData]);
};
const handleDeleteStock = (index) => {
  setHolding(holding.filter((_, i) => i !== index));
  setOpenMenuIndex(null);
};

  return (
    <div className="PortfolioHoldingPageContainer">
      <div className="PortfolioHoldingPageHeader">
        <h2 className="PortfolioHoldingPageh2">Holdings - {holdings.length}</h2>

        {/* Dropdown for Sorting */}
        <select className="PortfolioHoldingPageinvestedFilter" value={selectedFilter} onChange={handleFilterChange}>
          <option>Invested value</option>
          <option>CMP</option>
          <option>Profit%</option>
          <option>A to Z</option>
          <option>Current value</option>
          <option>Holding%</option>
        </select>

        {/* Buttons for Adding Stocks and Importing Data */}
        <div className="PortfolioHoldingPageactionButtons">
          <button className="PortfolioHoldingPageaddStockBtn" onClick={handleAddStock}>
            <RiAddCircleLine className="PortfolioHoldingPageholdingsaddStockIcon" /> Add Stocks
          </button>

          <button className="PortfolioHoldingPageimportDataBtn" onClick={handleImportData}>
            <CiImport className="PortfolioHoldingPageholdingsimportIcon" /> Import Data
          </button>
        </div>
      </div>

      {/* Render sorted holdings */}
      <div >
      <div className="PortfolioHoldingPageholdingsList">
        {sortedHoldings.map((stock, index) => (
          <div key={index} className="PortfolioHoldingPageholdingCard">
            <div className="PortfolioHoldingPageholdingDetails">
              <img src={stock.logo} alt={stock.name} className="PortfolioHoldingPagestockLogo" />
              <div>
                <h3 className="PortfolioHoldingPagestockName">{stock.name}</h3>
                <div className="PortfolioHoldingPagestockDetails">
                  <span className="PortfolioHoldingPagestockShares">{stock.shares} shares</span>
                  <span className="PortfolioHoldingPagestockPercentage">{stock.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="PortfolioHoldingPageholdingNumbers">
              <div className="PortfolioHoldingPageholdingValues">
                <span className="PortfolioHoldingPagelabel" style={{ color: "#333" }}>
                  Cur: ₹ {stock.current.toLocaleString()}
                </span>
                <div className="PortfolioHoldingPagecmpContainer">
                  <span className="PortfolioHoldingPagecurrentValue" style={{ color: "#C0C0C0" }}>CMP: ₹ {stock.cmp.toLocaleString()}</span>
                  <span className={`PortfolioHoldingPagechange ${stock.change >= 0 ? "positive" : "negative"}`}>
                    {stock.change.toLocaleString()}
                  </span>
                  <span className={`PortfolioHoldingPagechangePercent ${stock.changePercent >= 0 ? "positive" : "negative"}`}>
                    ({stock.changePercent.toLocaleString()}%)
                  </span>
                </div>
              </div>

              <div className="PortfolioHoldingPageholdingValuess">
                <span className="PortfolioHoldingPagelabel">Inv: ₹ {stock.invested.toLocaleString()}</span>
                <span className="PortfolioHoldingPageinvestedValue"style={{ color: "#C0C0C0" }}>avgPrice: ₹ {stock.avgPrice.toLocaleString()}</span>
              </div>
              <div className="PortfolioHoldingPageholdingprofitlossvalue">
                <span className={`PortfolioHoldingPageprofitLoss ${stock.profitLoss < 0 ? "loss" : "gain"}`}>
                  {stock.profitLoss.toLocaleString()}
                </span>
                <span className={`PortfolioHoldingPageprofitLoss ${stock.profitLoss < 0 ? "loss" : "gain"}`}>
                  {stock.profitLossPercent.toLocaleString()}%
                </span>
              </div>
            </div>

            <div className="PortfolioHoldingPageholdingPerformance">
              <MdMoreVert className="PortfolioHoldingPageMoreIcon" onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)} />

              {/* Delete Option (Only Show When More Icon is Clicked) */}
              {openMenuIndex === index && (
                <div className="PortfolioHoldingPageOptionsMenu">
                  <button onClick={() => handleDeleteStock(index)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="PortfolioHoldingPagetradeRecords">
        <a href="portfolioHoldingdetailPage">
          View all Trade Records <CiShare1 className="tradeRecordIcon" />
        </a>
      </div>
    </div>
  );
};

export default PortfolioHoldingPage;
