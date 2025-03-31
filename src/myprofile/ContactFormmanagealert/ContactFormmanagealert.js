import React, { useState, useContext } from "react";
import "./ContactFormmanagealert.css"; // Import the CSS file
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGlobe } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { SubscriptionContext } from "../../Portfoilo/context/SubscriptionContext";

const ContactFormmanagealert = () => {
  const {issubscribed}= useContext(SubscriptionContext)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Allow only valid Indian phone numbers
      if (/^[6-9]\d{0,9}$/.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowPopup(true); // Show the popup if form validation passes
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };
   const navigate = useNavigate();

  return (
    <div className="managealertalldata">
      <h1 className="profilepage-titleorder">Manage Alert</h1>
      <div className="profilepage-tabsorderusers">
        <span className="profilepage-tabb">
          My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb" onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb" onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
          style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}>
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb">My referrals</span>
      </div>

      <div className="contactprofilemanagealert-container">
        {/* Form Section */}
        <div className="contactprofilemanagealert-form">
          <h3>We love listening to you!</h3>
          <form onSubmit={handleSubmit}>
            <div className="contactprofilemanagealert-input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                className="contactprofilemanagealert-inputfullname"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>
            <div className="contactprofilemanagealert-row">
  {/* Email Field */}
  <div className="input-container">
    <input
      type="email"
      name="email"
      placeholder="E-mail"
      className="contactprofilemanagealert-input"
      value={formData.email}
      onChange={handleInputChange}
    />
    {errors.email && <p className="error-message">{errors.email}</p>}
  </div>

  {/* Phone Number Field */}
  <div className="input-containerrmanagealert">
    <div className="phone-input">
      <span className="contactprofilemanagealert-code">+91</span>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Mobile number"
        className="contactprofilemanagealert-input"
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
    </div>
    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
  </div>
</div>

            <div className="contactprofilemanagealert-input-group">
              <select
                name="subject"
                className="contactprofilemanagealert-dropdown"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Subject
                </option>
                <option value="feedback">Feedback</option>
                <option value="subscription">Subscription Queries</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && <p className="error-message">{errors.subject}</p>}
            </div>
            <div className="contactprofilemanagealert-input-group">
              <textarea
                name="message"
                className="contactprofilemanagealert-textarea"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
             
            </div>
            <button type="submit" className="contactprofilemanagealert-button">
              Submit
            </button>
          </form>
        </div>
        {/* Contact Details Section */}
        <div className="contactprofilemanagealert-details">
          <div className="contactprofilemanagealert-detailss">
            <h4>Reach us at below details:</h4>
            <p>
              +91-9067604020 <FiPhone className="iconphone" />
            </p>
            <p>
              <a href="mailto:contact@financeshastra.com">contact@financeshastra.com</a>{" "}
              <MdOutlineMail className="iconmail" />
            </p>
            <p>
              <a href="https://financeshastra.com/" target="_blank" rel="noreferrer">
                www.financeshastra.com
              </a>{" "}
              <FaGlobe className="iconweb" />
            </p>
            <p className="joinuson">Join us on:</p>
          </div>
          <div className="contactprofilemanagealert-social">
            <a href="#" className="sociallmanagealert-icon">
              <RiFacebookFill />
            </a>
            <a href="#" className="sociallmanagealert-icon">
              <FaTwitter />
            </a>
            <a href="#" className="sociallmanagealert-icon">
              <FaInstagram />
            </a>
            <a href="#" className="sociallmanagealert-icon">
              <FaLinkedinIn />
            </a>
            <a href="#" className="sociallmanagealert-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      {!issubscribed &&
      <div className="subscribe-footerrmanagealert">
        <h1 className="headingmanagealert">Subscribe Now!</h1>
        <h2>Choose a plan that aligns with your investment goals!</h2>
        <button className="footer-subscribe-buttonmanage">Subscribe</button>
      </div>}
      
      <Navbar />
      {showPopup && (
        <div className="popupppp-overlayyy">
          <div className="popup-contentttt">
            <span className="popup-closeeee" onClick={closePopup}>
              &times;
            </span>
            <div className="popup-messageee">
            <BsCheckCircleFill style={{ color: "green", fontSize: "38px",marginBottom:"-10px" }} />
              <h2>Thank you for your feedback!</h2>
              <p>We appreciate your input and will get back to you as soon as possible.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFormmanagealert;