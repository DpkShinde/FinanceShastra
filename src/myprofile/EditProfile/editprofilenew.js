import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";
import "./EditProfile.css";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  getIdToken,
  onAuthStateChanged,
  signInAnonymously,
  RecaptchaVerifier,
} from "firebase/auth";

const VerificationPopup = ({
  type,
  value,
  otp,
  setOtp,
  isOtpValid,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="verification-popup">
      <div className="popup-header">
        <h3>
          {type === "email" ? "Email Verification" : "Mobile Verification"}
        </h3>
        <FaTimes className="close-icon" onClick={onClose} />
      </div>
      <p>
        Enter the confirmation code sent to your {type}:{" "}
        <strong>{value}</strong>.
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className={`otp-input ${isOtpValid === false ? "error-border" : ""}`}
        placeholder="Enter OTP"
      />
      {isOtpValid === false && <p className="error-text">Invalid OTP</p>}
      <button
        className="submit-btn"
        style={{ backgroundColor: otp.length === 6 ? "#24b676" : "gray" }}
        onClick={onSubmit}
        disabled={otp.length !== 6}
      >
        Submit
      </button>
    </div>
  );
};

const EditProfile = () => {
  const { userEmail } = useContext(UserProfileContext);
  const [personalDetails, setPersonalDetails] = useState({});
  const [professionalDetails, setProfessionalDetails] = useState({});
  const [investmentDetails, setInvestmentDetails] = useState({});
  const [usernamelocal, setusernamelocal] = useState("");
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    dob: personalDetails.dob,
    gender: personalDetails.gender,
    email: personalDetails.email,
    phoneNumber: personalDetails.phoneNumber,
    address: personalDetails.address,
    country: "India",
    address: personalDetails.address,
    state: personalDetails.state,
    city: personalDetails.city,
    occupation: professionalDetails.occupation,
    pincode: personalDetails.pincode,
    industry: professionalDetails.industry,
    income: professionalDetails.income,
  });

  const [errors, setErrors] = useState({}); // For validation errors
  const [otpStep, setOtpStep] = useState(false); // Define otpStep and setOtpStep
  const [isMobileVerified, setIsMobileVerified] = useState(false); // Add this state

  const navigate = useNavigate();

  const profilePageCancel = () => {
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

  const profilePageSaveUpdate = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dob",
      "email",
      "address",
      "phoneNumber",
      "state",
      "city",
      "pincode",
      "occupation",
      "income",
      "industry",
    ];
    let validationErrors = {};

    const CookieToken= Cookies.get('jwtToken')

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = `${field} is required.`;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const url = `${API_BASE_URL}/userdetails/adduser`; // API endpoint

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CookieToken}`, // Token for authentication
        },
        body: JSON.stringify(formData), // Sending form data
      };

      try {
        const response = await fetch(url, options);
        console.log("Form data sent to API:", formData);
        if (response.ok) {
          const username= formData.firstName + formData.lastName
          localStorage.setItem("username", username)
          console.log(username)
          setIsPopupVisible(true);
        } else {
          console.error("Failed to save user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving user details:", error);
      }
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

    const usernamelocal = userEmail.split("@")[0];
    setusernamelocal(usernamelocal);
  }, [location.state]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  useEffect(() => {
    // Fetch user details and check if mobile is verified
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("jwtToken");
        if (!token) {
          console.error("Token is missing. Ensure the user is logged in.");
          return;
        }

        const response = await fetch(`${API_BASE_URL}/userdetails`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🚀 ~ fetchUserDetails ~ response:", response);
        if (response.ok) {
          const data = await response.json();
          console.log("User details fetched:", data); // Debugging: Log the entire response

          // Check if isMobileVerified exists in the response
          setIsMobileVerified(
            data[0].isMobileVerified === 1 || data[0].isMobileVerified === true
          );

          // Update formData with phone number if it exists
          setFormData((prevFormData) => ({
            ...prevFormData,
            phoneNumber: data.phone_number || prevFormData.phoneNumber,
          }));
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
    const updatedData = {
      personal: {
        firstName: formData.firstName,
        lastName: formData.lastName, // Combine firstName and lastName
        username: usernamelocal, // Static value for username
        email: formData.email,
        dob: formData.dob,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        country: "India",
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
      },
      professional: {
        occupation: formData.occupation,
        industry: formData.industry,

        // More fields here
      },
      investment: {
        householdSavings: "₹2,00,000",
        // More fields here
      },
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

  const validatepincode = (pincode) => {
    if (pincode.length < 6 || pincode.length > 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pincode: "Please enter valid pincode.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pincode: "",
      }));
    }
  };

  const validatedob = (dob) => {
    const date = new Date();
    const dobnew = new Date(dob);
    if (dobnew > date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: "Please enter valid Date of Birth.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: "",
      }));
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
  const [otp, setOtp] = useState("");
  const [showPopupp, setShowPopupp] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showEmailSuccessPopup, setShowEmailSuccessPopup] = useState(false);

  const [isOtpValid, setIsOtpValid] = useState(null);
  const [verificationType, setVerificationType] = useState(null); // "email" or "mobile"
  const [verificationValue, setVerificationValue] = useState(""); // Email or phone number

  const handleEmailPopupClose = () => {
    setShowEmailSuccessPopup(false);
  };

  const handleVerificationClick = async (type) => {
    console.log("🚀 ~ handleVerificationClick triggered ~ type:", type); // Debug log

    if (type === "email" && (!formData.email || errors.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email.",
      }));
      console.error("Email verification failed: Invalid email."); // Debug log
      return;
    }

    if (type === "mobile" && (!formData.phoneNumber || errors.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid phone number.",
      }));
      console.error("Mobile verification failed: Invalid phone number."); // Debug log
      return;
    }

    setVerificationType(type);
    setVerificationValue(
      type === "email" ? formData.email : `+91${formData.phoneNumber}`
    );
    setShowVerificationPopup(true); // Open the popup

    try {
      if (type === "email") {
        console.log("Sending OTP to email...");
        // Call the API to send OTP to the email
        const response = await fetch(`${API_BASE_URL}/otp/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        });

        if (response.ok) {
          console.log("OTP sent to email successfully.");
        } else {
          console.error("Failed to send OTP to email.");
        }
      } else if (type === "mobile") {
        console.log("Sending OTP to mobile...");
        // Call the API to send OTP to the mobile number
        const response = await fetch(`${API_BASE_URL}/otp/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: `+91${formData.phoneNumber}` }),
        });

        if (response.ok) {
          console.log("OTP sent to mobile successfully.");
        } else {
          console.error("Failed to send OTP to mobile.");
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setIsOtpValid(false);
      return;
    }

    try {
      if (verificationType === "email") {
        console.log("Verifying email OTP...");
        // Call the API to verify the email OTP
        const response = await fetch(`${API_BASE_URL}/otp/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, otp }),
        });

        if (response.ok) {
          console.log("Email OTP verified successfully.");
          setIsEmailVerified(true);
          setShowVerificationPopup(false);
        } else {
          console.error("Failed to verify email OTP.");
          setIsOtpValid(false);
        }
      } else if (verificationType === "mobile") {
        console.log("Verifying mobile OTP...");
        // Call the API to verify the mobile OTP
        const response = await fetch(`${API_BASE_URL}/otp/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: `+91${formData.phoneNumber}`,
            otp,
          }),
        });

        if (response.ok) {
          console.log("Mobile OTP verified successfully.");
          setIsVerified(true);
          setShowVerificationPopup(false);
        } else {
          console.error("Failed to verify mobile OTP.");
          setIsOtpValid(false);
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsOtpValid(false);
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
    console.log("Verify button clicked"); // Debug log
    const phoneRegex = /^[6-9]\d{9}$/; // Ensure this regex matches valid 10-digit Indian phone numbers
    if (phoneRegex.test(formData.phoneNumber)) {
      console.log("Phone number is valid. Proceeding to send OTP...");
      sendOtp(); // Call sendOtp function
    } else {
      console.error("Invalid phone number.");
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber:
          "Please enter a valid 10-digit phone number before proceeding.",
      }));
    }
  };

  const signInUser = async () => {
    try {
      console.log("Attempting to sign in anonymously...");
      const userCredential = await signInAnonymously(auth);
      console.log("User signed in anonymously:", userCredential.user);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha verified:", response);
          },
        },
        auth
      );
    }
  };

  const sendOtp = async () => {
    console.log("Attempting to send OTP...");

    if (!formData.phoneNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required.",
      }));
      return;
    }

    const phoneNumber = `+91${formData.phoneNumber}`; // Format phone number with country code

    try {
      const response = await fetch(`${API_BASE_URL}/users/verifyMobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }), // Send phone number to the backend
      });

      if (response.ok) {
        const data = await response.json();
        console.log("OTP sent successfully:", data);
        setOtpStep(true); // Show OTP input section
      } else {
        console.error("Failed to send OTP:", response.statusText);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Failed to send OTP. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Failed to send OTP. Please try again.",
      }));
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "",
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
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
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
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
    ],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Haryana: ["Chandigarh", "Gurugram", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi", "Kullu"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Manipur: ["Imphal", "Churachandpur", "Thoubal", "Senapati", "Ukhrul"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
    Mizoram: ["Aizawl", "Lunglei", "Serchhip", "Champhai", "Kolasib"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Puri"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
    Sikkim: ["Gangtok", "Namchi", "Pelling", "Ravangla", "Geyzing"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
    ],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Ambassa"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Haldwani"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah", "Durgapur"],
    "Andaman and Nicobar Islands": [
      "Port Blair",
      "Diglipur",
      "Car Nicobar",
      "Havelock Island",
    ],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
    Delhi: ["New Delhi", "Dwarka", "Saket", "Rohini", "Connaught Place"],
    "Jammu and Kashmir": [
      "Srinagar",
      "Jammu",
      "Anantnag",
      "Baramulla",
      "Udhampur",
    ],
    Ladakh: ["Leh", "Kargil"],
    Lakshadweep: ["Kavaratti", "Agatti", "Minicoy", "Amini"],
    Puducherry: ["Pondicherry", "Karaikal", "Mahe", "Yanam"],
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    console.log(selectedState)
    setFormData((prev) => ({ ...prev, state: selectedState, city: "" }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    console.log(selectedCountry)
    setFormData((prev) => ({ ...prev, country: selectedCountry }));
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

  return (
    <div>
      <div className="profilepage-container">
        <h1 className="profilepage-titleeeditt">My profile</h1>
        <div className="pftab">
          <span
            className="profilepage-tabb"
            style={{
              borderBottom: "2px solid #24b676",
              fontWeight: "bold",
              color: "#24b676",
            }}
          >
            My Account
          </span>
          <span
            className="profilepage-tabb"
            onClick={() => navigate("/orderTable")}
          >
            Orders
          </span>
          <span
            className="profilepage-tabb"
            onClick={() => navigate("/billingSubscriptionPages")}
          >
            Billing & Subscription
          </span>
          <span
            className="profilepage-tabb"
            onClick={() => navigate("/riskAnalysisDashboard")}
          >
            Risk Profile Report
          </span>
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
          <span
            className="profilepage-tabb"
            onClick={() => navigate("/sessionHistory")}
          >
            Active Devices
          </span>
          <span className="profilepage-tabb">My referrals</span>
        </div>

        <div className="profilepage-form">
          {/* First Name and Last Name */}
          <div className="profilepage-row">
            <div
              className={`profilepage-field ${errors.firstName ? "error" : ""}`}
            >
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="profilepage-input"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div
              className={`profilepage-field ${errors.lastName ? "error" : ""}`}
            >
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="profilepage-input"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="error-text">This field is required</span>
              )}
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
                onBlur={(e) => validatedob(e.target.value)}
              />
              {errors.dob && (
                <span className="error-text">This field is required</span>
              )}
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
                <div
                  className={`profilepage-field email-field ${
                    errors.email ? "error" : ""
                  }`}
                >
                  {/* content */}
                </div>

                <label className="emailidlabel">Email ID*</label>
                <div className="profile-email-container">
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
                    <button
                      className="profilepage-verify-btn"
                      onClick={() => handleVerificationClick("email")}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="profile-roww">
              <div
                className={`profile-group ${errors.phoneNumber ? "error" : ""}`}
              >
                <label className="phonenulabel">Phone Number*</label>
                <div className="profile-phone-container">
                  <div>
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
                    ) : (
                      <button
                        className="profilepage-verify-btn"
                        onClick={() => handleVerificationClick("mobile")}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
                {errors.phoneNumber && (
                  <span className="error-text">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profilepage-rowss">
          <div
            className={`profilepage-field pincode-field ${
              errors.address ? "error" : ""
            }`}
          >
            <label>Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`profilepage-input ${errors.address ? "error" : ""}`}
              placeholder=""
            />
            {errors.address && (
              <span className="error-text">This field is required</span>
            )}
          </div>
          <div className="profilepage-field">
            <label>Country*</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className="profilepage-select"
            >
              <option value="India">India</option>
            </select>
          </div>
        </div>
        <div className="profilepage-rowss">
          <div
            className={`profilepage-field state-field ${
              errors.state ? "error" : ""
            }`}
          >
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
            {errors.state && (
              <span className="error-text">This field is required</span>
            )}
          </div>
          <div
            className={`profilepage-field city-field ${
              errors.city ? "error" : ""
            }`}
          >
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
            {errors.city && (
              <span className="error-text">This field is required</span>
            )}
          </div>
        </div>
        <div className="profilepage-rowss">
          <div
            className={`profilepage-field pincode-field ${
              errors.pincode ? "error" : ""
            }`}
          >
            <label>Pincode*</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onBlur={(e) => validatepincode(e.target.value)}
              className={`profilepage-input ${errors.pincode ? "error" : ""}`}
              placeholder="E.g. 110254"
            />
            {errors.pincode && (
              <span className="error-text">This field is required</span>
            )}
          </div>
          <div className="profilepage-field">
          <div
            className={`profilepage-field pincode-field ${
              errors.occupation ? "error" : ""
            }`}
          >
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
            {errors.occupation && (
              <span className="error-text">This field is required</span>
            )}
            </div>
          </div>
        </div>
        <div className="profilepage-rowss">
          <div className={`profilepage-field  ${
              errors.income ? "error" : ""
            }`}>
          
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
            {errors.income && (
              <span className="error-text">This field is required</span>
            )}
          </div>
          <div className="profilepage-field">
          <div className={`profilepage-field  ${
              errors.industry ? "error" : ""
            }`}>
            <label>Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              onFocus={(e) => (e.target.style.marginBottom = "20px")}
              onBlur={(e) => (e.target.style.marginBottom = "0px")} // Reset margin on blur
              className="profilepageocc-select"
            >
              <option value="">Select</option>

              <option value="Banking and Financial Services">
                Banking and Financial Services
              </option>

              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Media and Entertainment">
                Media and Entertainment
              </option>
              <option value="Pharma and Healthcare">
                Pharma and Healthcare
              </option>

              <option value="Real Estate">Real Estate</option>

              <option value="Travel and Tourism">Travel and Tourism</option>
              <option value="Others">Others</option>
            </select>
            {errors.industry && (
              <span className="error-text">This field is required</span>
            )}
          </div>
          </div>
        </div>

        <div className="profilepage">
          <div className="profilepage-actions">
            <button
              className="profilepage-save-btn"
              onClick={profilePageSaveUpdate}
            >
              Save & Update
            </button>
            <button
              className="profilepage-cancel-btn"
              onClick={profilePageCancel}
            >
              Cancel
            </button>
          </div>

          {/* Popup */}
          {isPopupVisible && <SuccessModal onClose={closePopup} />}
        </div>

        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
      <div id="recaptcha-container"></div>
      {showVerificationPopup && (
        <VerificationPopup
          type={verificationType}
          value={verificationValue}
          otp={otp}
          setOtp={setOtp}
          isOtpValid={isOtpValid}
          onSubmit={handleOtpSubmit}
          onClose={() => setShowVerificationPopup(false)}
        />
      )}
      VerificationPopup && console.log("Rendering VerificationPopup...")
    </div>
  );
};

export default EditProfile;