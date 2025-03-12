import React, { useState } from "react";
import "./BillingSubscriptionPages.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const BillingSubscriptionPages = () => {
  const [activepage, setactivepage]= useState('half')
  
 const navigate = useNavigate();
  return (
    <div className="profilepagee-container">
    
    <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
  My Billing & Subscription
</h1>
<div className="profilepage-tabsorderusers" >
        <span className="profilepage-tabb"onClick={() => navigate("/userDetailsupdate")}
       >My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb"  style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }}onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb" onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
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
        <span className="profilepage-tabb"onClick={() => navigate('/myReferalPage')}>My referrals</span>
      </div>

    <div className="billingSubscriptionContainer">
      <h2 className="billingSubscriptionTitle">Active Plan</h2>
      <div className="billingSubscriptionCard">
        <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Plan:</strong> Elite <span className="billingSubscriptionType">(half yearly)</span></p>
        <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Next Payment:</strong> 02 Feb 2025</p>
        <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Next Payment:</strong> 02 September 2025</p>
        <p className="billingSubscriptionNote">
        <strong style={{ color: "black" }}>Note:</strong> Your plan will expire on 02 Feb, 2025 12:00 midnight <br/>
          Enter your payment information to start your subscription.
        </p>

        <p className="billingSubscriptionNote">Your subscription will renew automatically. You can cancel anytime.</p>
        <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Enter your billing details</strong> to renew or upgrade your plan.</p>
        <button
      className="billingSubscriptionButton"
      onClick={() => navigate("/billingDetailsPage")}
    >
      Billing Details
    </button>
      </div>
      
      <h3 className="billingSubscriptionSubtitle">Available Plans</h3>
      <div className="toggle-switch-container">
        <button className={`toggle-button ${activepage=== "half" && "active" }`}  onClick={() => setactivepage("half")} >Half yearly</button>
     
      <button className={`toggle-button ${activepage=== "yearly" && "active" }`} onClick={()=> setactivepage("yearly")}>Annually</button>
    </div>
      
      <div className="billingSubscriptionPlans">
        <div className="billingSubscriptionPlan">
          <h4 className="billingSubscriptionPlanTitle">Elite</h4>
          <p>Empower your investment journey with the Elite Plan!</p>
          {activepage==="half" ? 
          <button className="billingSubscriptionPlanButton" onClick={() => navigate("/halfyearlySubscriptionPages")}>Explore</button>
          : 
          <button className="billingSubscriptionPlanButton" onClick={() => navigate("/annuallySubscriptionPages")}>Explore</button>}
          
        </div>
        <div className="billingSubscriptionPlan">
          <h4 className="billingSubscriptionPlanTitle">Premium</h4>
          <p>Invest smarter, invest confidently with the Premium Plan!</p>
          {activepage==="half" ? 
          <button className="billingSubscriptionPlanButton" onClick={() => navigate("/premiumSubscriptionPages")}>Explore</button>
          :
           <button className="billingSubscriptionPlanButton" onClick={() => navigate("/annuallyPremiumSubscriptionPages")}>Explore</button>}
          </div>
      </div>
    </div>
    <Navbar/>
 <FooterForAllPage/>
    </div>
     
  );
};

export default BillingSubscriptionPages;