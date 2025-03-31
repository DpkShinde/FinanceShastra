import React, { useState } from "react";
import "./EarningCalculatorProfilePage.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const EarningCalculatorProfilePage = () => {
  // State to manage the number of referrals for each plan
  const [referrals, setReferrals] = useState({
    eliteHalfYearly: 20,
    premiumHalfYearly: 32,
    eliteYearly: 10,
    premiumYearly: 0,
  });

  // Plan prices
  const planPrices = {
    eliteHalfYearly: 2000,
    premiumHalfYearly: 5999,
    eliteYearly: 2999,
    premiumYearly: 7999,
  };

  // Function to handle slider/input changes
  const handleInputChange = (plan, value) => {
    const updatedValue = Math.max(0, Number(value)); // Prevent negative values
    setReferrals((prevReferrals) => ({
      ...prevReferrals,
      [plan]: updatedValue,
    }));
  };

  // Calculate total earnings
  const totalEarnings = Object.entries(referrals).reduce(
    (sum, [plan, count]) => sum + count * planPrices[plan],
    0
  );

  // Calculate breakdown for each plan
  const breakdown = {
    eliteHalfYearly: referrals.eliteHalfYearly * planPrices.eliteHalfYearly,
    premiumHalfYearly: referrals.premiumHalfYearly * planPrices.premiumHalfYearly,
    eliteYearly: referrals.eliteYearly * planPrices.eliteYearly,
    premiumYearly: referrals.premiumYearly * planPrices.premiumYearly,
  };
 const navigate = useNavigate();
  return (
    <div>
    <div className="profilepageee-container">
    <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
    My Referrals</h1>

    <div className="profilepage-tabsorderusers">
        <span className="profilepage-tabb" onClick={() => navigate("/userDetailsupdate")}
       >My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb"  onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb"  onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb"  style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }} onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>

    <div className="myreferalpagesss">
      {/* Header Section */}
      <div className="myreferalpagesss-header">
      <div className="myreferalpagesss-header-row">
  <h1>Assist your friends in their investment journey and reach financial independence faster.</h1>
  <a href="#" className="myreferalpagesss-benefits-link">View benefits</a>
</div>

        <div className="myreferalpagesss-buttons">
          <button className="myreferalpagesss-button "onClick={() => navigate("/myReferalPage")}>Overview</button>
          <button className="myreferalpagesss-button"onClick={() => navigate("/referMoreProfilePages")}>Refer More</button>
          <button className="myreferalpagesss-button active"onClick={() => navigate("/earningCalculatorProfilePage")}>Earning Calculator</button>
          <button className="myreferalpagesss-button"onClick={() => navigate("/reffeerralProfilePageSSS")}>My Referrals</button>
        </div>
      </div>
    <div className="earningcalculatorprofilepage-container">
      <div className="earningcalculatorprofilepage-content">
        {/* Left Section with sliders */}
        <div className="earningcalculatorprofilepage-sliders">
          {Object.keys(planPrices).map((planKey) => (
            <div key={planKey} className="earningcalculatorprofilepage-slider-group">
              <p>
                {planKey
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^[a-z]/, (c) => c.toUpperCase())
                  .replace("Half Yearly", "- Half Yearly plan Referrals")
                  .replace("Yearly", "- Yearly plan Referrals")}{" "}
                – ₹{planPrices[planKey].toLocaleString()}/-
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={referrals[planKey]}
                onChange={(e) => handleInputChange(planKey, e.target.value)}
                className="earningcalculatorprofilepage-slider"
              />
              <input
                type="number"
                value={referrals[planKey]}
                onChange={(e) => handleInputChange(planKey, e.target.value)}
                className="earningcalculatorprofilepage-number-input"
              />
            </div>
          ))}
        </div>

        {/* Right Section with earnings summary */}
       {/* Right Section with earnings summary */}
<div className="earningcalculatorprofilepage-summary">
  <h3 className="earningcalculatorprofilepage-summaryh3">Estimated Earnings (₹)</h3>
  <h2 className="earningcalculatorprofilepage-summaryh3">₹{totalEarnings.toLocaleString()}</h2>
  <hr />
  <h4 className="earningcalculatorprofilepage-summaryh4">Referral Amount</h4>
  <div className="earningcalculatorprofilepage-row">
    <p>Elite - Half yearly ₹{breakdown.eliteHalfYearly.toLocaleString()}</p>
    <p>Premium - Half yearly ₹{breakdown.premiumHalfYearly.toLocaleString()}</p>
    <p>Elite - Yearly <br/> ₹{breakdown.eliteYearly.toLocaleString()}</p>
    <p>Premium - Yearly ₹{breakdown.premiumYearly.toLocaleString()}</p>
  </div>
  
</div>
</div>
<p className="earningcalculatorprofilepage-disclaimer">
    *These are approximate values and may vary depending on plans and fees.
  </p>
      
      {/* Refer Now button */}
      <button onClick={()=>{navigate('/referMoreProfilePages')}} className="earningcalculatorprofilepage-refer-button">Refer Now →</button>
    </div>
    </div>
    <Navbar/>
   
 
    </div>
    <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default EarningCalculatorProfilePage;
