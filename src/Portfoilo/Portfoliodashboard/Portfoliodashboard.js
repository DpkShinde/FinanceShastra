import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Portfoliodashboard.css";
import { API_BASE_URL } from "../../config";
import PortfolioAllocationManagerChart from "../AllocationChart/AllocationChart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const PortfolioManagerDashboard = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const navigate = useNavigate();

  // Fetch portfolio stocks data
  const fetchData = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired, Please Login again");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/myportfolio/allocationChart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      console.log("portfolio: ", data);
      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stockInvestment = portfolioData[0]?.stock_investment || 0;
  const stocksPercent = portfolioData[0]?.total_investment
    ? (portfolioData[0].stock_investment / portfolioData[0].total_investment) *
      100
    : 0;
  const stockUnrealizedGains = portfolioData[0]?.unrealized_stock_gain || 0;
  const stockUnrealizedGainsPercent = portfolioData[0]?.total_investment
    ? (portfolioData[0].unrealized_stock_gain /
        portfolioData[0].total_investment) *
      100
    : 0;

  const mutualInvestment = portfolioData[0]?.mutualfund_investment || 0;
  const mutualPercent = portfolioData[0]?.total_investment
    ? (portfolioData[0].mutualfund_investment /
        portfolioData[0].total_investment) *
      100
    : 0;
  const mutualUnrealizedGains = portfolioData[0]?.unrealized_mutual_gain || 0;
  const mutualUnrealizedGainsPercent = portfolioData[0]?.total_investment
    ? (portfolioData[0].unrealized_mutual_gain /
        portfolioData[0].total_investment) *
      100
    : 0;

  return (
    <div className="portfolio-dashboard-container">
      <h3 className="portfoliomanager-h3">My Accounts</h3>
      <div className="portfolio-action-buttons">
        <button className="portfolio-action-button" onClick={() => navigate("/stockadd")}>+ Add Transaction</button>
        <button className="portfolio-action-button portfolio-alert-button">
          My Alerts
        </button>
      </div>
      <div className="portfolio-accounts-section">
        <table className="portfolio-accounts-table">
          <thead>
            <tr>
              <th>
                Specifications
                <br />
                <span>Action</span>
              </th>
              <th>
                Investment Cost
                <br />
                <span>Weight (%)</span>
              </th>
              <th>
                Latest Value
                <br />
                <span>Weight (%)</span>
              </th>
              <th>
                Today's Gain
                <br />
                <span>Change (%)</span>
              </th>
              <th>
                Unrealized Gain
                <br />
                <span>Change (%)</span>
              </th>
              <th>Realized Profit/Loss</th>
              <th>Dividend/Interest</th>
              <th>Total Gain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Stocks
                <br />
                <span className="portfolio-add">
                  <Link to={"/stockadd"}>Add</Link>
                </span>
              </td>
              <td>
                {stockInvestment}
                <br />
                <span>{stocksPercent.toFixed(2)}%</span>
              </td>
              <td>
                1,166
                <br />
                <span>100.0%</span>
              </td>
              <td style={{ color: -0.48 < 0 ? "red" : "green" }}>
                -0.48
                <br />
                <span style={{ color: -0.48 < 0 ? "red" : "green" }}>
                  (-0.04%)
                </span>
              </td>
              <td style={{ color: -4 < 0 ? "red" : "green" }}>
                {stockUnrealizedGains}
                <br />
                <span style={{ color: "-0.04" < 0 ? "red" : "green" }}>
                  ({stockUnrealizedGainsPercent.toFixed(2)}%)
                </span>
              </td>
              <td>0</td>
              <td>0</td>
              <td style={{ color: "-4" < 0 ? "red" : "black" }}>-4</td>
            </tr>
            <tr>
              <td>
                Mutual Funds
                <br />
                <span className="portfolio-add">
                <Link to={"/addTransactionmutual"}>Add</Link>
                </span>
              </td>
              <td>
                {mutualInvestment}
                <br />
                <span>{mutualPercent.toFixed(2)}%</span>
              </td>
              <td>
                1,166
                <br />
                <span>100.0%</span>
              </td>
              <td style={{ color: -0.48 < 0 ? "red" : "green" }}>
                -0.48
                <br />
                <span style={{ color: -0.48 < 0 ? "red" : "green" }}>
                  (-0.04%)
                </span>
              </td>
              <td style={{ color: -4 < 0 ? "red" : "green" }}>
                {mutualUnrealizedGains}
                <br />
                <span style={{ color: "-0.04" < 0 ? "red" : "green" }}>
                  ({mutualUnrealizedGainsPercent.toFixed(2)}%)
                </span>
              </td>
              <td>0</td>
              <td>0</td>
              <td style={{ color: "-4" < 0 ? "red" : "black" }}>-4</td>
            </tr>
            <tr>
              <td>
                Gold
                <br />
                <span className="portfolio-add">
                <Link to={"/addTransactiongold"}>Add</Link>
                </span>
              </td>
              <td colSpan="7" className="portfolio-add-link">
                No data: + Click to Add Gold in your Portfolio
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="portfolio-allocation-section">
        <PortfolioAllocationManagerChart />
      </div>
    </div>
  );
};

export default PortfolioManagerDashboard;
