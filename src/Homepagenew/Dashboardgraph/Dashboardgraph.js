import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import itiimg from "../../../src/assest/iti.png";
import "./Dashboardgraph.css";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import Watchlistdashboardmain from "../Watchlistdashboardmain/Watchlistdashboardmain";
import DashboardMainPagetable from "../DashboardMainPagetable/DashboardMainPagetable";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import FooterForhomeAllPage from "../../Footerhomeeepage/Footerhomeeepage";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import Dashboardstockindex from "../Stockindex/Stockindex";
import Stockcalender from "../Stockcalender/Stockcalender";
import Homestockanalyst from "../Homestockanalyst/Homestockanalyst";

const Dashboardchartmain = ({ children }) => {
  const [timeRange, setTimeRange] = useState("1D");
  const [financialData, setFinancialData] = useState({
    price: "₹127.89",
    percentage: "+0.85%",
    lastUpdated: "05 Dec, 2024",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myInvestment, setMyInvestment] = useState(0);
  const [latestValue, setLatestValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [activeTab, setActiveTab] = useState("Stock Sector");

  const { user } = useContext(UserProfileContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("jwtToken");

      const response = await fetch(
        `${API_BASE_URL}/myportfolio/allocationChart`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.length > 0) {
        setMyInvestment(data[0].total_investment || 0);
        setLatestValue(data[0].latest_value || 0);
        const change =
          ((data[0].latest_value - data[0].total_investment) /
            data[0].total_investment) *
            100 || 0;
        setPercentChange(change);
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

  // Simulate financial data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (Math.random() * 100 + 100).toFixed(2);
      const newPercentage = ((Math.random() * 2 - 1) * 1.5).toFixed(2); // Random between -1.5% and +1.5%
      const now = new Date();
      const newLastUpdated = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setFinancialData({
        price: `₹${newPrice}`, // Properly formatted with backticks for dynamic values
        percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`, // Adds "+" for positive percentages
        lastUpdated: newLastUpdated, // Updates with the latest timestamp
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Dependency array ensures this effect runs once on mount
  

  // Chart data for different time ranges
  const chartDataByRange = {
    "1D": [3000, 6000, 2000, 12000, 4000, 10000],
    "5D": [3000, 6000, 9000, 0, 12000, 15000],
    "1M": [3500, 6000, 3, 9000, 12000, 15000],
    "6M": [6000, 0, 3000, 9000, 12000, 15000],
    "1Y": [6000, 3000, 0, 9000, 15000, 12000],
    "3Y": [6000, 9000, 0, 3000, 12000, 15000],
    "5Y": [9000, 0, 3000, 6000, 15000, 12000],
    Max: [15000, 703, 3000, 6000, 9000, 12000],
  };

  const chartData = {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    datasets: [
      {
        label: "Portfolio Value",
        data: chartDataByRange[timeRange] || [],
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "#22c55e",
        pointBackgroundColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };
  //const percentageChange = "+21.32%";
  const isPositiveChange = percentChange >= 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0, // Start the y-axis from 19,000
        ticks: {
          stepSize: 3000, // Set the interval for ticks
          callback: (value) => `${value}`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="allheadd">
        <div className="hompagetopdata">
          <div>
            <h1 className="headernifty50000">Welcome back, {user}</h1>
            <p className="headerdashboardmain">
              Track your finance and achieve your financial goals.
            </p>
          </div>
          <div className="homepagenewdata-card">
            <div className="homepageamountdata">
              <div className="homepagenewdata-title">
                Total Investment
                <br />
                <div className="homepagenewdata-amount">
                  {(myInvestment - 0).toLocaleString()}
                </div>
              </div>
              <div
                className={`homepagenewdata-change ${
                  isPositiveChange
                    ? "homepagenewdata-positive"
                    : "homepagenewdata-negative"
                }`}
              >
                {isPositiveChange ? "▲" : "▼"} {percentChange}
              </div>
            </div>
          </div>
        </div>

        <div className="dataquatallnifty">
          <div className="portfoliomutual-containerrniftydashboard">
            <div className="portfoliomutual-card">
              <div className="itidata">
                <div className="alldatagraphtop">
                  <div>
                    <h3 className="portfoliomutual-titleport">
                      Portfolio Value
                    </h3>
                    <p className="portfoliomutual-value">
                      ₹{(latestValue - 0).toLocaleString()}
                    </p>
                    <p className="portfoliomutual-profit">
                      Your profit is{" "}
                      <span>
                        ₹{(latestValue - myInvestment - 0).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h3 className="portfoliomutual-titleport">
                      Avg. Monthly Grow
                    </h3>
                    <p className="portfoliomutual-value">~4.32%</p>
                    <p className="portfoliomutual-profitt">~₹20,365.75</p>
                  </div>
                </div>
                <div className="bestprofitdata">
                  <h3 className="portfoliomutual-titleport">
                    Best Profit Stock
                  </h3>
                  <h3 className="portfoliomutual-valuee">
                    <img
                      src={itiimg}
                      alt="ITI Ltd."
                      className="portfolio-logo"
                    />{" "}
                    ITI Ltd.
                  </h3>
                </div>
              </div>
              {/* Time Range Selector */}
              <div className="time-rangemutual-selectorrniftydashboard">
                {["1D", "5D", "1M", "6M", "1Y", "3Y", "5Y", "Max"].map(
                  (range) => (
                    <button
                      key={range}
                      className={`time-rangemutual-button ${
                        range === timeRange ? "active" : ""
                      }`}
                      onClick={() => setTimeRange(range)} // Update selected range
                    >
                      {range}
                    </button>
                  )
                )}
              </div>

              {/* Line Chart */}
              <div className="chartmutual-containerrdashboard">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
          <div className="datadisstockdashhh">
            <div className="main-content">
              <Navbar />
              <Watchlistdashboardmain />
            </div>
          </div>
        </div>
        <div className="DashboardMainPagetable-headerrindexx">
          <button
            className={`DashboardMainPagetable-tab ${
              activeTab === "Stock Sector" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Stock Sector")}
          >
            Stock Sector
          </button>
          <button
            className={`DashboardMainPagetable-tab ${
              activeTab === "Stock Index" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Stock Index")}
          >
            Stock Index
          </button>
          <button
            className={`DashboardMainPagetable-tab ${
              activeTab === "Stock Calendar" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Stock Calendar")}
          >
            Stock Calendar
          </button>
          <button
            className={`DashboardMainPagetable-tab ${
              activeTab === "Stock Analyst" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Stock Analyst")}
          >
            Stock Analyst
          </button>
        </div>

        {/* Show component based on activeTab */}
        {activeTab === "Stock Sector" && <DashboardMainPagetable />}
        {activeTab === "Stock Index" && <Dashboardstockindex />}
        {activeTab === "Stock Calendar" && <Stockcalender />}
        {activeTab === "Stock Analyst" && <Homestockanalyst />}
      </div>

      <div className="layout">
        <Sidebar />
        <div className="main-contentover">
          <div className="contentover">{children}</div>
          <FooterForAllPage />
        </div>
      </div>
    </div>
  );
};

export default Dashboardchartmain;
