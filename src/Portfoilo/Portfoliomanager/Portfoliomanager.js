import { useContext } from "react";
import "./Portfoliomanager.css";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import PortfolioManagerDashboard from "../Portfoliodashboard/Portfoliodashboard";
import { PortfolioDashboardContext } from "../context/PortfolioDashboardContext";
import { PortfolioDashboardProvider } from "../context/PortfolioDashboardContext";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


function Portfolio() {

  const { 
    myInvestment = 0, 
    latestValue = 0, 
    unRealizedGains = 0, 
    realizedGains = 0, 
    capitalGains = 0 
  } = useContext(PortfolioDashboardContext) || {};

  return (
    <div>
    <div className="networth-stocks-dashboard">
      {/* Header Section */}
      <h2 className="newwmutualmanagement">Portfolio Management Dashboard</h2>
      <div className="networth-tabs">
        <Link to="/portfolio">
          <button className="networth-tabact">Dashboard</button>
        </Link>
        <Link to="/portfoliostockaccount">
          <button className="networth-tab">Stocks</button>
        </Link>
        <Link to="/mutualaccount">
          <button className="networth-tab">Mutual Fund</button>
        </Link>
        <Link to="/portfoliogoldtoppage">
          <button className="networth-tab">Gold</button>
        </Link>
      </div>

      {/* Net Worth Overview Section */}
      <div className="networth-summary">
        <div>
          <p className="financep">My Net Worth</p>
          <h2>₹{(latestValue - 0).toLocaleString()}</h2>
        </div>
        <div>
          <p className="financep">My Investments</p>
          <h2>₹{(myInvestment - 0).toLocaleString()}</h2>
        </div>
        <div>
          <p className="financep">My Liabilities</p>
          <h2>₹0</h2>
        </div>
      </div>

      {/* Enhance Message Section */}
      <div className="finance-enhance-message">
        Enhance risk management and maximize returns with FinanceShastra Portfolio Manager!
      </div>

      {/* Investments Section */}
      <h2 className="investh2">My Investments</h2>
      <div className="finance-dashboard-content">
        {/* Investment Details Card */}
        <div className="finance-investment-details-card">
          <div className="finance-investment-details-group">
            <p>Latest Value</p>
            <h3>₹{(latestValue - 0).toLocaleString()}</h3>
            <p>Investment Cost</p>
            <h3>₹{(myInvestment - 0).toLocaleString()}</h3>
          </div>
          <div className="finance-investment-details-group">
            <h3>Unrealized Gain</h3>
            <p>Overall Gain</p>
            <h3 className="finance-negative-gain">
              ₹{(unRealizedGains - 0).toLocaleString()} (
                {myInvestment !== 0 ? ((unRealizedGains / myInvestment) * 100).toFixed(2) : "0.00"}%)
            </h3>
            <p>Today's Gain</p>
            <h3 className="finance-negative-gain">₹0 (0%)</h3>
          </div>
          <div className="finance-investment-details-group">
            <h3>Realized Gain</h3>
            <p>Realized Gain</p>
            <h3 className="finance-negative-gain">₹{(realizedGains - 0).toLocaleString()}</h3>
            <p>Capital Gain</p>
            <h3 className="finance-negative-gain">₹{(capitalGains - 0).toLocaleString()}</h3>
          </div>
          <div className="finance-investment-detailsother">
            <p>Other Gain</p>
            <h3 className="finance-negative-gainother">₹0</h3>
            <p className="finance-investment-footer">
              Unrealized and Realized gain for current holdings in portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Navbar and PortfolioManagerDashboard Components */}
      <Navbar />
      <PortfolioManagerDashboard />
    
    </div>
    <div className="foooterpagesaupdate">
    <FooterForAllPage/>
  </div>
  </div>
  );
}

export default Portfolio;