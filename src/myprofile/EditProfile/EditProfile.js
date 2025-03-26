import React, { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";
import "./EditProfile.css";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const EditProfile = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [professionalDetails, setProfessionalDetails] = useState({});
  const [investmentDetails, setInvestmentDetails] = useState({});
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    dob: personalDetails.dob,
    gender: personalDetails.gender,
    email: personalDetails.email,
    phoneNumber: personalDetails.phoneNumber,
    address: personalDetails.address,
    country: personalDetails.country,
    address: personalDetails.address,
    state: personalDetails.state,
    city: personalDetails.city,
    occupation: professionalDetails.occupation,
    pincode: personalDetails.pincode,
    industry: professionalDetails.industry,
    income: professionalDetails.income,
    name: billingInfo.name,
    address: billingInfo.address,
    city: billingInfo.city,
    state: billingInfo.state,
    country: billingInfo.country,

  });

  const [errors, setErrors] = useState({}); // For validation errors

  const navigate = useNavigate();
  const { billingInfo } = location.state || {};


  const profilePageCancel = () => {
    console.log("Form data cleared");
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      phoneNumber: "",
      address: "",
      country: "India",
      address: "",
      state: "",
      city: "",
      occupation: "",
      pincode: "",
      industry: "",
      income: "",
    });
  };
  const profilePageSaveUpdate = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dob",
      "email",
      "address",
      "address",
      "phoneNumber",
      "state",
      "city",
      "pincode",
    ];
    let validationErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = `${field} is required.`;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data saved:", formData);
      setIsPopupVisible(true);
    }

  };


  useEffect(() => {
    if (location.state && location.state.updatedData) {
      const { updatedData, section } = location.state;
      // Set initial formData based on the selected section
      if (section === "Personal") {
        setFormData(updatedData.personal);
      } else if (section === "Professional") {
        setFormData(updatedData.professional);
      } else if (section === "Investment") {
        setFormData(updatedData.investment);
      }
    }
  }, [location.state]);
  const closePopup = () => {
    setIsPopupVisible(false);
    const updatedData = {
      personal: {
        firstName: formData.firstName,
        lastName: formData.lastName,// Combine firstName and lastName
        username: "williamRober23",                           // Static value for username
        email: formData.email,
        dob: formData.dob,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        country: "India",
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,




      },
      professional: {
        occupation: formData.occupation,
        industry: formData.industry,
        income: formData.income
        // More fields here
      },
      investment: {
        householdSavings: "₹2,00,000",
        // More fields here
      }
    };

    navigate("/userDetailsupdate", { state: { updatedData } });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setNewEmail(formData.email); // Set current email as the initial value
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveEmail = () => {
    if (!emailRegex.test(newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
    setIsModalOpen(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPopupp, setShowPopupp] = useState(false);


  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showEmailSuccessPopup, setShowEmailSuccessPopup] = useState(false);



  const [isOtpValid, setIsOtpValid] = useState(null);

  const handleEmailPopupClose = () => {
    setShowEmailSuccessPopup(false);
  };
  const handleEmailVerifyClick = () => {
    if (!formData.email || errors.email) {
      return; // Don't show popup if email is invalid
    }
    setShowVerificationPopup(true);
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      setIsOtpValid(false);
      return;
    }
    setIsOtpValid(true);
    setShowVerificationPopup(false);
    setShowPopupp(true); // ✅ Show success popup
  };


  // Regex for phone number validation
  const phoneRegex = /^[0-9]{10}$/;

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number.",
      }));
    }
  };


  const handlemobileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" })); // Clear phone number errors
  };


  const handlePopupOpen = () => {
    if (!formData.phoneNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required.",
      }));
      return;
    }
    setShowPopup(true);
  };


  const handlePopupClose = () => {
    setShowPopup(false);
    setOtpStep(false); // Reset OTP step
  };



  const handleSmsIconClick = () => {
    if (phoneRegex.test(formData.phoneNumber)) {
      setOtpStep(true); // Show OTP section
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number before proceeding.",
      }));
    }
  };
  const handleOtpSubmitemail = () => {
    if (otp !== "1234") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Invalid OTP. Please try again.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, otp: "" }));
      setShowVerifiedPopup(true); // Show success popup
      setOtpStep(false); // Reset OTP step
      setIsEmailVerified(true); // Mark email as verified
      setIsModalOpen(false); // Close modal
    }
  };

  const handlePopupClosee = () => {
    setShowPopupp(false);
  };


  const popupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popup: {
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "18px",
      cursor: "pointer",
      border: "none",
      background: "none",
    },
    content: {
      textAlign: "center",
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px", // Adjust size as needed
      height: "50px", // Same as width for a perfect circle
      borderRadius: "50%", // Makes it circular
      border: "5px solid #24b676", // Corrected the syntax
      backgroundColor: "white", // Background color of the circle
      color: "#24b676", // Tick color matching the border
      fontSize: "24px", // Adjust font size for the tick
      fontWeight: "bold", // Makes the tick bold
      margin: "0 auto", // Centers the icon horizontally in the popup
    },

  };

  const [showVerifiedPopup, setShowVerifiedPopup] = useState(false); // Control verified success popup
  const handleSendOtpClick = () => {
    // Validate the email first
    if (!emailRegex.test(newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // Clear any previous errors
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));

    // Simulate sending OTP
    console.log(`Sending OTP to ${newEmail}`);

    setOtpStep(true); // Show OTP input step
  };



  const handleVerifiedPopupClose = () => setShowVerifiedPopup(false);



  const SuccessModal = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>&times;</button>
          <div className="success-icon">
            <span>&#10004;</span>
          </div>
          <p className="success-message">Your Profile Updated successfully!</p>
        </div>
      </div>
    );
  };
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const profilePageSaveUpdated = () => {
    setIsPopupVisible(true);
  };


  const stateCityMapping = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Senapati", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
    "Mizoram": ["Aizawl", "Lunglei", "Serchhip", "Champhai", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Puri"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi", "Pelling", "Ravangla", "Geyzing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Ambassa"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Haldwani"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah", "Durgapur"],
    "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Car Nicobar", "Havelock Island"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
    "Delhi": ["New Delhi", "Dwarka", "Saket", "Rohini", "Connaught Place"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini"],
    "Puducherry": ["Pondicherry", "Karaikal", "Mahe", "Yanam"]
  };


  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({ ...prev, state: selectedState, city: "" }));
  };

  // Handle city change
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prev) => ({ ...prev, city: selectedCity }));
  };

  // Get cities for the selected state
  const cities = stateCityMapping[formData.state] || [];
  const maskEmail = (email) => {
    if (!email) return "your email"; // Default text if email is missing

    const [name, domain] = email.split("@");
    if (!domain) return email; // Handle invalid email cases

    const maskedName = name.slice(0, 3) + "********"; // Keep first 3 characters, mask the rest
    return `${maskedName}@${domain}`;
  };
  useEffect(() => {
    if (billingInfo) {
      setFormData(billingInfo);
    }
  }, [billingInfo]);
  const handleSave = () => {
    navigate("/billing-info-history", { state: { billingInfo: formData } });
  };

  return (
    <div>
    <div className="profilepage-container">
      <h1 className="profilepage-titleeeditt">My profile</h1>
      <div className="pftab">
        <span className="profilepage-tabb"
          style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}>My Account</span>
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
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb" onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb">My referrals</span>
      </div>

      <div className="profilepage-form">
        {/* First Name and Last Name */}
        <div className="profilepage-row">
          <div className={`profilepage-field ${errors.firstName ? "error" : ""}`}>
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="profilepage-input"
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-text">This field is required</span>}
          </div>


          <div className={`profilepage-field ${errors.lastName ? "error" : ""}`}>
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"

              value={formData.lastName}
              onChange={handleChange}
              className="profilepage-input"
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-text">This field is required</span>}

          </div>
        </div>
        <div className="profilepage-row">
          <div className={`profilepage-field ${errors.dob ? "error" : ""}`}>
            <label>Date of Birth*</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="profilepage-input"

            />
            {errors.dob && <span className="error-text">This field is required</span>}
          </div>

          <div className="profilepage-field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="profilepage-select"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="allemailphone">
          <div className="emailphonealssss">
            <div className="profilepage-roww">
              <div className={`profilepage-field email-field ${errors.email ? "error" : ""}`}>
                {/* content */}
              </div>

              <label className="emailidlabel">Email ID*</label>
              <div
                className="profile-email-container"

              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className="profilepage-email-input"
                  placeholder="Enter your email"
                  disabled={isEmailVerified} // Disable if verified
                />
                {isEmailVerified ? (
                  <span style={{ color: "#24b676" }}>Verified</span>
                ) : (
                  <>
                    <div className="emailedit">
                      <button onClick={toggleModal} className="profilepage-editemail-btn">
                        <FaRegEdit />
                      </button>
                    </div>
                    <button className="profilepage-verifyemail-btn" onClick={handleEmailVerifyClick}>
                      Verify
                    </button>
                  </>
                )}
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Modal for Editing Email */}
            {/* Verification Popup */}
            {showVerificationPopup && (
              <div className="verification-popupemailll">
                <div className="popup-header">
                  <h3>Account Verification</h3>
                  <FaTimes className="close-icon" onClick={() => setShowVerificationPopup(false)} />
                </div>
                <p>Enter the confirmation code from the email.</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-inputemailll"
                />
                {isOtpValid === false && <p className="error-text">Invalid OTP</p>}
                <button
                  className="submit-btnemailll"
                  style={{ backgroundColor: otp.length === 6 ? "#24b676" : "gray" }}
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Email Verification Success Popup */}
            {/* Email Verification Success Popup */}
            {showEmailSuccessPopup && (
              <div className="email-success-popup-overlay">
                <div className="email-success-popup">
                  <button className="email-success-popup-close" onClick={handleEmailPopupClose}>
                    &times;
                  </button>
                  <div className="email-success-popup-content">
                    <div className="email-success-popup-icon">✔</div>
                    <h3>Email Verified Successfully!</h3>
                    <p>
                      You have successfully verified your email using OTP sent on{" "}
                      <strong>{maskEmail(formData.email)}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>



          <div className="profile-roww">
            <div className={`profile-group ${errors.phoneNumber ? "error" : ""}`}>
              <label className="phonenulabel">Phone Number*</label>
              <div className="profile-phone-container" >
                <div >
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlemobileChange}
                    onBlur={(e) => validatePhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit phone number"
                    className="profile-phone-input"

                    disabled={isVerified} // Disable if verified
                  />
                  {isVerified ? (
                    <span style={{ color: "#24b676" }}>Verified</span>
                  ) : null}
                </div>

                {/* Conditionally render buttons based on isVerified */}

                {!isVerified && (
                  <div className="editalliconnn">
                    <button
                      onClick={handlePopupOpen}
                      className="profilepage-editemail-btn"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      type="button"
                      className="profile-verify-btn"
                      onClick={handleSmsIconClick}
                    >
                      Verify
                    </button>
                  </div>
                )}

              </div>
              {errors.phoneNumber && (
                <span className="error-text">{errors.phoneNumber}</span>
              )}
            </div>

            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <button className="close-icon" onClick={handlePopupClose}>
                    <RxCross2 />
                  </button>
                  <h3 className="accountverification">Account Verification</h3>
                  <p className="popupparagraph">
                    Provide your phone number to receive a verification code.
                    <br />
                    It will only be used for account verification purposes.
                  </p>
                  {!otpStep && (
                    <div className="popup-input">
                      <span>+91</span>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handlemobileChange}
                      />
                      <button className="sms-icon-button" onClick={handleSmsIconClick}>
                        <AiOutlineMessage />
                      </button>
                    </div>
                  )}

                  {otpStep && (
                    <div className="otp-section">
                      <h3 className="otpverification">Verification Code</h3>
                      <div className="otp-input-container">
                        <input
                          type="text"
                          maxLength="4"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                            setErrors((prevErrors) => ({ ...prevErrors, otp: "" }));
                          }}
                          className={`otp-input ${errors.otp ? "error-border" : ""}`}
                        />
                        <button onClick={handleOtpSubmit}>Submit</button>
                      </div>
                      {errors.otp && <span className="error-text">{errors.otp}</span>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {showPopupp && (
              <div style={popupStyles.overlay}>
                <div style={popupStyles.popup}>
                  <button style={popupStyles.close} onClick={handlePopupClosee}>
                    &times;
                  </button>
                  <div style={popupStyles.content}>
                    <div style={popupStyles.icon}>✔</div>
                    <h3>Mobile number verified successfully!</h3>
                    <p>
                      You have successfully verified your mobile number using OTP sent on{" "}
                      <strong>
                        91********{formData.phoneNumber ? formData.phoneNumber.slice(-2) : "XX"}
                      </strong>.
                    </p>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="profilepage-rowss">
        <div className={`profilepage-field pincode-field ${errors.address ? "error" : ""}`}>
          <label>Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`profilepage-input ${errors.address ? "error" : ""}`}
            placeholder=""
          />
          {errors.address && <span className="error-text">This field is required</span>}
        </div>
        <div className="profilepage-field">
          <label>Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="profilepage-select"
          >
            <option value="India">India</option>
          </select>
        </div>

      </div>
      <div className="profilepage-rowss">
        <div className={`profilepage-field state-field ${errors.state ? "error" : ""}`}>
          <label>State*</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            className={`profilepage-select ${errors.state ? "error" : ""}`}
          >
            <option value="">Select</option>
            {Object.keys(stateCityMapping).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <span className="error-text">This field is required</span>}
        </div>
        <div className={`profilepage-field city-field ${errors.city ? "error" : ""}`}>
          <label>City*</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            className={`profilepage-select ${errors.city ? "error" : ""}`}
            disabled={!formData.state}
          >
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className="error-text">This field is required</span>}
        </div>


      </div>
      <div className="profilepage-rowss">
        <div className={`profilepage-field pincode-field ${errors.pincode ? "error" : ""}`}>
          <label>Pincode*</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`profilepage-input ${errors.pincode ? "error" : ""}`}
            placeholder="E.g. 110254"
          />
          {errors.pincode && <span className="error-text">This field is required</span>}
        </div>
        <div className="profilepage-field">
          <label>Occupation</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="profilepageocc-select"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Government Employee">Government Employee</option>
            <option value="Homemaker">Homemaker</option>
            <option value="Retired">Retired</option>
            <option value="Self-employed">Proffesional</option>
            <option value="Other">Other</option>

          </select>
        </div>

      </div>
      <div className="profilepage-rowss">
        <div className="profilepage-field">
          <label>Annual Income</label>
          <select
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="profilepageocc-select"
          >
            <option value="">Select</option>
            <option value="0-5L">Less than 5 Lacs</option>
            <option value="5L-10L">5 Lacs to 10 Lacs</option>
            <option value="10L-15L">10 Lacs to 15 Lacs</option>
            <option value="15L-20L">15 Lacs to 20 Lacs</option>
            <option value="20L+">More than 20 Lacs</option>
          </select>

        </div>
        <div className="profilepage-field">
          <label>Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            onFocus={(e) => e.target.style.marginBottom = "20px"}
            onBlur={(e) => e.target.style.marginBottom = "0px"} // Reset margin on blur
            className="profilepageocc-select"
          >
            <option value="">Select</option>

            <option value="Banking and Financial Services">Banking and Financial Services</option>

            <option value="Information Technology">Information Technology</option>
            <option value="Media and Entertainment">Media and Entertainment</option>
            <option value="Pharma and Healthcare">Pharma and Healthcare</option>

            <option value="Real Estate">Real Estate</option>

            <option value="Travel and Tourism">Travel and Tourism</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      <div className="profilepage">
        <div className="profilepage-actions">
          <button className="profilepage-save-btn" onClick={profilePageSaveUpdate} >
            Save & Update
          </button>
          <button className="profilepage-cancel-btn" onClick={profilePageCancel}>
            Cancel
          </button>
        </div>

        {/* Popup */}
        {isPopupVisible && <SuccessModal onClose={closePopup} />}

      </div>

      <Navbar />

    </div>
    <div className="foooterpagesaupdate">
     <FooterForAllPage/>
      </div>
    </div>

  );
};

export default EditProfile;