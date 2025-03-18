import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { IoCard } from "react-icons/io5";
import { FaPaypal } from "react-icons/fa";
import { MdPayment, MdOutlineQrCodeScanner } from "react-icons/md";
import phonepay from "../../assest/phonepe.png";
import googlepay from "../../assest/google-pay-logo.png";
import patym from "../../assest/patym.png";
import upilogo from '../../assest/upilogo.png'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const AnnuallyUPIPage = () => {
const [upiId, setUpiId] = useState("");
const [errors, setErrors] = useState({});
const [showPopup, setShowPopup] = useState(false);
const [showPopupGp, setShowPopupGp] = useState(false);
const [showPopupPhonep, setShowPopupPhonep] = useState(false);
const [showPopupPyt, setShowPopupPyt] = useState(false);
  const [showPopupforLogin, setShowPopupforLogin]= useState(false)
  const navigate= useNavigate()

  const onlogin= ()=>{
    navigate('/')
  }

const handleUPIVerifyAndProceed = (e) => {
e.preventDefault(); // Prevent form submission

const newErrors = {};

// UPI ID validation
const upiIdRegex = /^[\w.-]+@[\w.-]+$/;
if (!upiId || !upiIdRegex.test(upiId)) {
newErrors.upiId = "Please enter a valid UPI ID.";
}

setErrors(newErrors);

if (Object.keys(newErrors).length === 0) {
// Proceed with UPI Payment verification without timer or redirection

const localuserDetails= (localStorage.getItem("user"))
if (!localuserDetails){
setShowPopupforLogin(true)
console.log(localuserDetails)
}else{
console.log("Proceeding with UPI Payment...");
setShowPopup(true); // Show the popup
console.log(localuserDetails)
const {email}= JSON.parse(localuserDetails)
const userpaymentDetails= {
'email': email,
"planId": 1,
"billingCycle": "yearly", 
"paymentMethod": "upi",
'upiId' : upiId
}
const localtoken= localStorage.getItem("token")
const url=`${API_BASE_URL}/userPayment/paymentDetails1`
const options= {
method: "post",
headers: {
'Content-Type': "application/json",
"Authorization": `Bearer ${localtoken}`
},
body: JSON.stringify(userpaymentDetails)
}
fetch(url, options)
.then(response => console.log(response))

setTimeout(() => {
setShowPopup(false); // Automatically close the popup after 5 seconds
// Add your actual redirect or API call logic here if needed
}, 3000); // Popup duration set to 5 seconds
  }}
};
const handleGPayClick = () => {
setShowPopupGp(true);
setTimeout(() => {
setShowPopupGp(false);
// Google Pay ki actual URL
}, 3000); // 2 seconds ke baad redirect hoga
};
const handlePhPayClick = () => {
setShowPopupPhonep(true);
setTimeout(() => {
setShowPopupPhonep(false);
// Google Pay ki actual URL
}, 3000); // 2 seconds ke baad redirect hoga
};
const handlePytClick = () => {
setShowPopupPyt(true);
setTimeout(() => {
setShowPopupPyt(false);
// Google Pay ki actual URL
}, 5000); // 2 seconds ke baad redirect hoga
};

const handleCardClick = () => {
navigate("/annuallySubscriptionPages"); // Navigate to /billingDetailsPage
};

// Handle navigation on PayPal button click
const handlePayPalClick = () => {
navigate("/annuallyPaypalProfilePage"); // Navigate to /PaypalProfilePage
};
const handleupiClick = () => {
navigate("/annuallyUPIPage"); // Navigate to /PaypalProfilePage
};
const handleScanAndPayProfilePage = () => {
navigate("/annuallyScanPage");
};

return (
<div className="profilepageee-container">
<h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
Elite Plan Subscription
</h1>



<div className="billing-detailspages-container">
<div className="billing-detailspages-card">
<h2 className="billing-detailspages-amount">
<span style={{ color: "black" }}>Rs 2999</span> <br />
<span style={{ color: "#888" }}>Due Feb 02, 2024</span>
</h2>

<p className="billing-detailspages-to">
<strong style={{ color: "#888" }}>To </strong><span className="billing-detailspages-to-black">William</span>
</p>
<p className="billing-detailspages-plan">
<strong style={{ color: "#888" }}>Plan </strong>
<span style={{ color: "black" }}>Elite</span>
<span style={{ color: "#24b676" }}> (Annually)</span>
</p>
<div className="plan-features">
<h4 className='plan-featuresh4'>
<FontAwesomeIcon
icon={faCircleCheck}

/>Features:
</h4>
<ul className="plan-featuresul">
<li className="plan-featuresli">
<span className="plan-featuresspan">50 Stock Recommendations</span>
<span className="plan-featuresp"> : Expert recommendations to build a focused and profitable portfolio.</span>
</li>
<li className="plan-featuresli">
<span>Stocks Screener</span>
<span className="plan-featuresp"> : Access essential tools to analyze and screen stocks effectively.</span>
</li>
<li className="plan-featuresli">
<span>Research Tool</span>
<span className="plan-featuresp"> : Utilize advanced resources for in-depth stock research.</span>
</li>
<li className="plan-featuresli">
<span>Discover Top-rated Stocks</span>
<span className="plan-featuresp"> : Easily find the best-performing stocks.</span>
</li>
</ul>
</div>

<div className="plan-additional-benefits">
<h4 className='plan-featuresh4'> <FontAwesomeIcon icon={faCircleCheck} />Additional Benefits:</h4>
<ul className="plan-featuresul">
<li className="plan-featuresli">
<span className="plan-featuresspan">Stock of the Month</span>
<span className="plan-featuresp"> : One carefully selected stock handpicked by our investment committee every month.</span>
</li>
<li className="plan-featuresli">
<span className="plan-featuresspan">Research Reports</span>
<span className="plan-featuresp"> : Access the real-time research report on any stock.</span>
</li>
<li className="plan-featuresli">
<span className="plan-featuresspan">Momentum Stocks</span>
<span className="plan-featuresp"> : Identify and capitalize on the best momentum stocks for any market phase.</span>
</li>
</ul>
</div>
{/* Plan features */}
{/* Plan features go here */}
</div>

<div className="billing-detailspages-payment">
<div className="billing-detailspages-payment-options">
<button className="billing-detailspages-method" onClick={handleCardClick}>
<div className="payment-option-content">
<IoCard size={20} />
<span>Card</span>
</div>
</button>

<button className="billing-detailspages-method" onClick={handlePayPalClick}>
<div className="payment-option-content">
<FaPaypal size={20} />
<span>PayPal</span>
</div>
</button>

<button className="billing-detailspages-method active" onClick={handleupiClick}>
<div className="payment-option-content">
<MdPayment size={20} />
<span>UPI</span>
</div>
</button>

<button className="billing-detailspages-method" onClick={handleScanAndPayProfilePage}>
<div className="payment-option-content">
<MdOutlineQrCodeScanner size={20} />
<span>Scan & Pay</span>
</div>
</button>
</div>

<h2 className="paypalprofilepage-title">Pay with UPI</h2>
<div className="upiprofilepage-icons">
<img src={phonepay} alt="PhonePe" onClick={handlePhPayClick} style={{ cursor: "pointer" }} />
{showPopupPhonep && (
<div className="paypal-popup">
<div className="paypal-popup-content">
<img src={phonepay} alt="Google Pay Logo" className="paypal-logo" />

<h2>Redirecting to PhonePay</h2>
</div>
</div>
)}
<img src={googlepay} alt="Google Pay" onClick={handleGPayClick} style={{ cursor: "pointer" }} />
{showPopupGp && (
<div className="paypal-popup">
<div className="paypal-popup-content">
<img src={googlepay} alt="Google Pay Logo" className="paypal-logo" />

<h2>Redirecting to Gpay</h2>
</div>
</div>
)}

<img src={patym} alt="Paytm" onClick={handlePytClick} style={{ cursor: "pointer" }} />
{showPopupPyt && (
<div className="paypal-popup">
<div className="paypal-popup-content">
<img src={patym} alt="Google Pay Logo" className="paypal-logo" />

<h2>Redirecting to Patym</h2>
</div>
</div>
)}
</div>

<form className="upiprofilepage-form">
<div className="upiprofilepage-field">
<input
type="text"
placeholder="Enter UPI ID"
value={upiId}
onChange={(e) => setUpiId(e.target.value)}
className={`upi-input ${errors.upiId ? "error-border" : ""}`}
/>
{errors.upiId && <p className="upiprofilepage-error-text">{errors.upiId}</p>}
</div>

<button className="upiprofilepage-verify-button" onClick={handleUPIVerifyAndProceed}>
Verify & Proceed
</button>
</form>
</div>
</div>

      {showPopupforLogin && (
        <div className="payment-popup">
          <div className="payment-popup-content">
            <h2>You Are not Logged in!</h2>
            <p className="amount-paid">Please Login</p>
            <button type="button" onClick={onlogin}
              className="loginbtn billing-detailspages-pay-button">Login</button>
          </div>
        </div>
      )}
{showPopup && (
<div className="paypal-popup">
<div className="paypal-popup-content">
<img
src={upilogo}
alt="UPI Logo"
className="paypal-logo"
/>
<p>Verifying UPI ID...</p>
</div>
</div>
)}
<Navbar />
<FooterForAllPage />
</div>
);
  ;}

export default AnnuallyUPIPage;