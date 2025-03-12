
import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FaPaypal } from 'react-icons/fa';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { MdPayment } from 'react-icons/md';
import card1 from '../../assest/visa.png';
import card2 from '../../assest/mastercard.png';
import card3 from '../../assest/american express.png';
import card4 from '../../assest/unionpay.png';
import {  faShieldAlt,faCheckCircle, faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

registerLocale("en-GB", enGB);
const PremiumSubscriptionPages = () => {
const [cardNumber, setCardNumber] = useState("");
const [expiryDate, setExpiryDate] = useState(null);
const [cvc, setCvc] = useState("");
const [errors, setErrors] = useState({});
const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup]= useState(faLessThanEqual)

const validateInputs = () => {
let hasErrors = false;
const newErrors = {};

if (!cardNumber || cardNumber.length !== 16) {
newErrors.cardNumber = "Invalid card number";
hasErrors = true;
}
if (!expiryDate) {
newErrors.expiryDate = "Invalid expiry date";
hasErrors = true;
}
if (!cvc || cvc.length !== 3) {
newErrors.cvc = "Invalid CVC";
hasErrors = true;
}

setErrors(newErrors);
return !hasErrors;
};
  
  const onlogin=()=>{
    navigate('/')
  }

  const handlePaymentBillingDetailsPage = async () => {
if (validateInputs()) {
// All fields are valid, show the popup

const userDetailsfromlocal= localStorage.getItem('user')
if (!userDetailsfromlocal){
setShowLoginPopup(true)
}else{
console.log(userDetailsfromlocal)
const {email}= JSON.parse(userDetailsfromlocal)
const month= expiryDate.getMonth()+1
const year= expiryDate.getFullYear()
const expiryDateFormated= `${year}-0${month}-01`
console.log(expiryDate)
const userpaymentDetails= {
'email': email,
"planId": 2,
"billingCycle": "half year", 
"paymentMethod": "card", 
"cardNum": cardNumber, 
"cardExpiryDate": expiryDateFormated
}
const localtoken= localStorage.getItem('token')
const options={
method: "post",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${localtoken}`
},
body: JSON.stringify(userpaymentDetails)
}
console.log("stringified:", JSON.stringify(userpaymentDetails))
const url=`${API_BASE_URL}/userPayment/paymentDetails1`
const response= await fetch(url, options)
console.log(response)
setShowPopup(true);
setCardNumber('')
setExpiryDate(null)
setCvc('')
}


setShowPopup(true);

// Simulate redirecting to PayPal or payment process
setTimeout(() => {
setShowPopup(false);

}, 5000); // Hide the popup after 3 seconds
}
};

const CustomInput = ({ value, onClick }) => (
<div className="custom-datepicker-input" onClick={onClick}>
<input
type="text"
value={value}
placeholder="MM / YYYY"
readOnly
className="billing-detailspages-expiry-input"
/>
<FaCalendarAlt className="calendar-iconnns" />
</div>
);
const navigate = useNavigate();
const handleCardClick = () => {
navigate("/premiumSubscriptionPages"); // Navigate to /billingDetailsPage
};

// Handle navigation on PayPal button click
const handlePayPalClick = () => {
navigate("/premiumPaypalProfilePage"); // Navigate to /PaypalProfilePage
};
const handleupiClick = () => {
navigate("/premiumUPIPage"); // Navigate to /PaypalProfilePage
};
const handleScanAndPayProfilePage = () => {
navigate("/premiumScanPage");
};


return (
<div className="profilepageee-container">

<h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
Premium Plan Subscription</h1>


<div className="billing-detailspages-container">
<div className="billing-detailspages-card">
<h2 className="billing-detailspages-amount">
<span style={{ color: "black" }}>Rs 5999</span> <br />
<span style={{ color: "#888" }}>Due Feb 02, 2024</span>

</h2>

<p className="billing-detailspages-to"><strong style={{ color: "#888" }}>To </strong>  <span className="billing-detailspages-to-black">William</span></p>
<p className="billing-detailspages-plan">
<strong style={{ color: "#888" }}>Plan </strong>
<span style={{ color: "black" }}> Premium</span>
<span style={{ color: "#24b676" }}> (half Year)</span>
</p>

<div class="plan-features">
<h4 className='plan-featuresh4'>
<FontAwesomeIcon icon={faCircleCheck} />Features:
</h4>
<ul className="plan-featuresul">
<li className="plan-featuresli">
<span className='plan-featuresspan'> 50 Stock Recommendations</span>
<span className='plan-featuresp'> : Expert recommendations to build a focused and profitable portfolio.</span>
</li>
<li className="plan-featuresli">
<span>Stocks Screener </span>
<span className='plan-featuresp'> : Access essential tools to analyze and screen stocks effectively.</span>
</li>
<li className="plan-featuresli">
<span> Research Tool </span>
<span className='plan-featuresp'> : Utilize advanced resources for in-depth stock research.</span>
</li>
<li className="plan-featuresli">
<span>  Discover Top-rated Stocks</span>
<span className='plan-featuresp'> : Easily find the best-performing stocks.</span>
</li>
</ul>
</div>
<div class="plan-additional-benefits">
<h4 className='plan-featuresh4'> <FontAwesomeIcon icon={faCircleCheck} />Additional Benefits:</h4>
<ul className="plan-featuresul">
<li className="plan-featuresli">
<span className='plan-featuresspan'> Stock of the Month</span>
<span className='plan-featuresp'> : One carefully selected stock handpicked by our investment committee every month.</span>
</li>
<li className="plan-featuresli">
<span className='plan-featuresspan'>Research Reports </span>
<span className='plan-featuresp'> : Access the real-time research report on any stock.</span>
</li>
<li className="plan-featuresli">
<span className='plan-featuresspan'>Momentum Stocks </span>
<span className="plan-featuresp"> : Identify and capitalize on the best momentum stocks for any market phase.</span>
</li>
</ul>
</div>
</div>
<div className="billing-detailspages-payment">
<div className="billing-detailspages-payment-options">
<button className="billing-detailspages-method active" onClick={handleCardClick}>
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
<button className="billing-detailspages-method" onClick={handleupiClick}>
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
<h2 className="profilepage-tittlle">Card details</h2>
<form className="billing-detailspages-card-form">
<div
className={`billing-detailspages-card-input-container ${
           errors.cardNumber ? "error" : ""
         }`}
>
<input
type="text"
placeholder="0000 0000 0000 0000"
className="billing-detailspages-card-input"
maxLength={16}
value={cardNumber}
onChange={(e) => {
// Allow only numbers and ensure length does not exceed 16 digits
const value = e.target.value.replace(/\D/g, "");
if (value.length <= 16) {
setCardNumber(value);
}
}}
/>

<div className="billing-detailspages-card-icons">
<img src={card1} alt="Visa" />
<img src={card2} alt="MasterCard" />
<img src={card3} alt="Amex" />
<img src={card4} alt="RuPay" />
</div>
</div>

<div className="billing-detailspages-card-expiry">
<div className={`billing-detailspages-expiry ${errors.expiryDate ? "error" : ""}`}>
<DatePicker
selected={expiryDate}
onChange={(date) => setExpiryDate(date)}
dateFormat="MM/yyyy"
showMonthYearPicker
customInput={<CustomInput />}
/>
</div>



<div className={`billing-detailspages-cvc ${errors.cvc ? "error" : ""}`}>
<input
type="text"
placeholder="CVC"
aria-label="CVC"
className="billing-detailspages-cvc-input"
maxLength={3}
value={cvc}
onChange={(e) => {
const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
if (value.length <= 3) {
setCvc(value);
}
}}
/>
<FontAwesomeIcon
icon={faShieldAlt}
className="billing-detailspages-iconnn"
/>
</div>


</div>

<p className="billing-detailspages-terms">
By providing your card information, you allow us to charge your card
for future payments in accordance with their terms.
</p>

<button
type="button"
className="billing-detailspages-pay-button"
onClick={handlePaymentBillingDetailsPage}
>
Pay ₹5999
</button>
</form>
{/* Popup */}
       {showLoginPopup && (
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
<div className="payment-popup">
<div className="payment-popup-content">
<FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
<h2>Payment Successful!</h2>
<p className="amount-paid">Amount Paid: ₹5999/-</p>
<p className="payment-plan">Plan: Elite (Monthly)</p>
</div>
</div>
)}
</div>
</div>
<Navbar/>
<FooterForAllPage/>
</div>
);
};

export default PremiumSubscriptionPages;