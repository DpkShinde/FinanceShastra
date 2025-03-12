
import refundImage from "../../assest/refund.png"; // Update with the actual image path
import './Refundpage.css';
import { FaRegCalendar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import React, {useContext} from "react"
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const RefundPolicy = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div>
    <div className={darkMode ? "refundpolicyydarkmode" :"refundpolicyy"}>
      <h1>Cancellation and Refund Policy</h1>
      <p className={darkMode ? "refundpolicyy-lastupdateddarkmode" :"refundpolicyy-lastupdated"}>
        <FaRegCalendar className={darkMode ? "calenderrefundicondarkmode" :"calenderrefundicon"} /> Last updated: 08 Dec 2024{" "}
        <LuDot className="dotrefund" />
      </p>
      <div className={darkMode ? "refundpolicyy-headerdarkmode" :"refundpolicyy-header"}>
        <img src={refundImage} alt="Cancellation and Refund" className={darkMode ? "refundpolicyy-imagedarkmode" :"refundpolicyy-image" }/>
        <p>
        At FinanceShastra, customer satisfaction is our priority. We aim to provide top-notch 
        financial insights and services to empower our clients in their investment journey. However, 
        we understand that there might be instances where you may wish to 
        cancel your subscription. Below are the details of our Cancellation and Refund Policy: 
        </p>
      </div>

      <div className={darkMode ? "refundpolicyy-sectiondarkmode" :"refundpolicyy-section"}>
     
        <h2>Cancellation Policy</h2>
        <h3>Request for Cancellation:</h3>
        <ul>
          <li>You may cancel your subscription within 5 calendar days from the date of subscription commencement.</li>
          <li>
            To initiate the cancellation, please email us at{" "}
            <a href="mailto:help@financeshastra.com">help@financeshastra.com</a> with your subscription details.
          </li>
        </ul>

        <h3>Eligibility for Cancellation:</h3>
        <ul>
          <li>Refunds are applicable only for specific plans as outlined below.</li>
          <li>
            Any misuse of the platform or violation of our terms may result in the denial of cancellation requests.
          </li>
        </ul>
      </div>

      <div className={darkMode ? "refundpolicyy-sectiondarkmode" :"refundpolicyy-section"}>
        <h2>Refund Policy</h2>
        <h3>Refund for Eligible Plans:</h3>
        <ul>
          <li>
            <strong>Elite Plans:</strong> Refunds will be processed for cancellation requests received within 5 days of subscription. The full subscription amount, including applicable GST, will be refunded.
          </li>
          <li>
            <strong>Premium (Yearly) Plans:</strong> No refunds will be provided.
          </li>
        </ul>

        <h3>FinanceShastra Elite Plan:</h3>
        <p>
          Refunds for the Elite Plan will be processed in accordance with SEBI’s new Investment Advisor (IA) regulations.
        </p>

        <h3>Refund Process:</h3>
        <ul>
          <li>Refunds will be made through the same mode of payment used during the subscription.</li>
          <li>
            The refund will be processed within 5 business days of receiving the cancellation request. Please note, your bank or payment gateway may take additional time to credit the amount.
          </li>
        </ul>

        <h3>One-Time Refund Policy:</h3>
        <ul>
          <li>
            Each customer is eligible for a one-time refund. If you re-subscribe after canceling, you will not be eligible for another refund.
          </li>
        </ul>

        <h3>Right to Cancel:</h3>
        <p>
          FinanceShastra reserves the right to terminate your subscription in cases of policy violations or misuse. Refunds, if applicable, will be at the discretion of FinanceShastra as per the terms outlined.
        </p>
      </div>

      <p className={darkMode ? "refundpolicyy-contactdarkmode" :"refundpolicyy-contact"}>
        If you have any queries regarding our Cancellation and Refund Policy, feel free to reach out to us at{" "}
        <a href="mailto:help@financeshastra.com">help@financeshastra.com</a>.
      </p>
     
    </div>
    <Navbar/>
    <div className={darkMode ? "foooterpagesattt" :"foooterpagesaupdate"}>
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default RefundPolicy;
