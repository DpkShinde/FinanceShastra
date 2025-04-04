import React, { useState, useEffect } from "react";
import "./BillingSubscriptionPages.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Billingavailableplan from "../Billingavailableplan/Billingavailableplan";
import Cookies from 'js-cookie'
import { API_BASE_URL } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center",
};

const BillingSubscriptionPages = () => {
  const [activepage, setactivepage]= useState('half')
  const [isLoading, setisLoading]= useState(false)
  const [isSubed, setisSubed]= useState(false)
  const [plan, setPlan]= useState('')
  const [endingDate, setEndingDate]= useState('')
  const [payedDate, setpayedDate]= useState('')
  const [BillingCycle, setBillingCycle]= useState('')
  
  
 const navigate = useNavigate();

 const formatedDate = (dateString) => {
  const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

 useEffect(()=>{
  setisLoading(true)
      const CookieToken = Cookies.get("jwtToken");
      if (CookieToken) {
        const fetchdata = async () => {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${CookieToken}`,
            },
          };
          const url = `${API_BASE_URL}/userPayment/usertoken`;
  
          try {
            const response = await fetch(url, options);
            const data = await response.json(); // Convert response to JSON
            console.log("data from subscriptio and billing page:", data)
            if (data.length === 0) {
              setisSubed(false);
            } else {
              setisSubed(true);
              
              const formatedData= data.map((e)=>({
                planId: e.plan_id,
                endingDate: e.ending_date,
                paymentDate: e.payment_date_time,   
                billingCycle: e.billing_cycle              

              }))
              setPlan(formatedData[0].planId === 1 ? "Elite": "Premium")
              setEndingDate(formatedDate(formatedData[0].endingDate))
              setpayedDate(formatedDate(formatedData[0].paymentDate))
              setBillingCycle(formatedData[0].billingCycle)
            }
            setisLoading(false)
          } catch (error) {
            console.error("Error fetching user payment details:", error);
          }
        };
        fetchdata();
      }
 }, [])

  return (
    <div>
      {isLoading ? <div className='loader-cont'><ClipLoader
                      cssOverride={override}
                      size={35}
                      data-testid="loader"
                      loading={isLoading}
                      speedMultiplier={1}
                      color="green"
                    /></div>
                  : 
                  <>
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
                    {isSubed ? <div className="billingSubscriptionContainer">
                    <h2 className="billingSubscriptionTitle">Active Plan</h2>
                    <div className="billingSubscriptionCard">
                      <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Plan:</strong> {plan} <span className="billingSubscriptionType">({BillingCycle})</span></p>
                      <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Next Payment:</strong> {endingDate}</p>
                      <p className="billingSubscriptionNote"><strong style={{ color: "black" }}>Next Payment:</strong> {payedDate}</p>
                      <p className="billingSubscriptionNote">
                      <strong style={{ color: "black" }}>Note:</strong> Your plan will expire on {endingDate}, 12:00 midnight <br/>
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
                      <div className="activecont billingSubscriptionPlan">
                        <h4 className="billingSubscriptionPlanTitle">Premium</h4>
                        <p>Invest smarter, invest confidently with the Premium Plan!</p>
                        {activepage==="half" ? 
                        <button className="billingSubscriptionPlanButton" onClick={() => navigate("/premiumSubscriptionPages")}>Explore</button>
                        :
                         <button className="billingSubscriptionPlanButton" onClick={() => navigate("/annuallyPremiumSubscriptionPages")}>Explore</button>}
                        </div>
                    </div>
                  </div> : 
                  <Billingavailableplan/>
                  }
                  
              
                  <Navbar/>
                 
                  </div>
                  <div className="foooterpagesaupdate">
                    <FooterForAllPage />
                    </div>
                    </>
                  }
      
    </div>
     
  );
};

export default BillingSubscriptionPages;