import React, { useState, useContext } from "react";
import './AccountSettings.css';

import Navbar from "../../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons


const AccountSettings = () => {
  const {token}= useContext(UserProfileContext)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [linkedAccounts, setLinkedAccounts] = useState([
    {
      platform: "Google",
      addedOn: "01 Dec, 2024",
      connected: true,
    },
  ]);
  const navigate= useNavigate()

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const clickCancle= ()=>{
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSavePassword = async () => {
    const newErrors = {
      currentPassword: passwordData.currentPassword ? "" : "This field is required",
      newPassword: passwordData.newPassword ? "" : "This field is required",
      confirmPassword: passwordData.confirmPassword ? "" : "This field is required",
    };
  
    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.newPassword = "Passwords do not match!";
      newErrors.confirmPassword = "Passwords do not match!";
    }
  
    // If password does not meet criteria
    if (passwordData.newPassword && !validatePassword(passwordData.newPassword)) {
      newErrors.newPassword = "Password does not meet the required criteria!";
    }
  
    setErrors(newErrors); // Update errors for each field
  
    // If there are no errors, proceed
    if (!newErrors.currentPassword && !newErrors.newPassword && !newErrors.confirmPassword) {
      const url= `${API_BASE_URL}/users/changepass`
      //const localtoken= localStorage.getItem('token')
      const CookieToken= Cookies.get('jwtToken')
      const options= {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${CookieToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passwordData)
      };
      const response= await fetch(url, options)
      if (response.status=== 200){
        setIsPopupVisible(true); // Show the popup
        setTimeout(() => setIsPopupVisible(false), 3000); // Hide the popup after 3 seconds
        setPasswordData ({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
      if (response.status === 404){
        setErrors(errors.currentPassword = "Please enter correct password")
      }
     
      }
  };

  const endallSessions=()=>{
    Cookies.remove('jwtToken')
    localStorage.clear()
    navigate('/')
  }
  
  const handleRemoveAccount = (platform) => {
    setLinkedAccounts(linkedAccounts.filter((account) => account.platform !== platform));
    alert(`${platform} account removed.`);
    Cookies.remove('jwtToken')
    localStorage.clear()
    navigate('/')
  };
  return (
    
    <div className="profilesettingpassword-container">
      <h1 className="profilepage-titlee">Password & Security</h1>
      <div className="profilepage-tabsss">
        <span className="profilepage-tabb" onClick={() => navigate("/userDetailsupdate")}>My Account</span>
        <span
      className="profilepage-tabb"
      onClick={() => navigate('/orderTable')}
    >
      Orders
    </span>
        <span className="profilepage-tabb"onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb"onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span className="profilepage-tabb"
         onClick={() => navigate('/managealert')}>Manage Alert</span>

<span className="profilepage-tabb"style={{
  borderBottom: "2px solid #24b676",
  fontWeight: "bold",
  color: "#24b676",
}}
         onClick={() => navigate('/accountSettings')}>Password & Security</span>
        <span className="profilepage-tabb"  onClick={() => navigate('/sessionHistory')} >Active Devices</span>
        <span className="profilepage-tabb"onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>
         {/* Popup Notification */}
         <section className={`profilesettingpassword-content ${isPopupVisible ? "blur" : ""}`}>
    {/* Password Form and Linked Accounts */}
  </section>

         {isPopupVisible && (
  <div className="popup-overlay">
    
      <div className="popup-content">
        <span className="popup-icon">✔</span>
        <p>Your Password has been updated successfully!</p>
      </div>
  
  </div>
)}

      {/* Set a New Password Section */}
      <section className="profilesettingpassword-password-section">
        <h2>Set a New Password</h2>
        <form>
          {/* Current Password */}
          <div className="profilesettingpassword-form-group">
            <label>Current Password*</label>
            <div className="profilesettingpassword-password-field">
              <input
                type={showPasswords.currentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter your current password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={errors.currentPassword ? "error" : ""}
              />
              <span onClick={() => togglePasswordVisibility("currentPassword")}>
              {showPasswords.currentPassword ? <FaEye size={20}/> : <FaEyeSlash size={20} />}
              </span>
            </div>
            {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
          </div>

          {/* New Password */}
          <div className="profilesettingpassword-form-group">
            <label>New Password*</label>
            <div className="profilesettingpassword-password-field">
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={errors.newPassword ? "error" : ""}
              />
              <span onClick={() => togglePasswordVisibility("newPassword")}>
              {showPasswords.newPassword ? <FaEye size={20}/> : <FaEyeSlash size={20} />}
              </span>
            </div>
            {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
          </div>

          {/* Confirm New Password */}
          <div className="profilesettingpassword-form-group">
            <label>Confirm New Password*</label>
            <div className="profilesettingpassword-password-field">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter your confirm new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              <span onClick={() => togglePasswordVisibility("confirmPassword")}>
              {showPasswords.confirmPassword ? <FaEye size={20}/> : <FaEyeSlash size={20} />}

              </span>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          {/* Password Rules */}
        

          {/* Buttons */}
          <div className="profilesettingpassword-button-group">
            <button type="button" onClick={handleSavePassword}>
              Save & Update
            </button>
            <button type="button" onClick={clickCancle}>Cancel</button>
          </div>
        </form>
      </section>

      {/* Linked Social Accounts Section */}
      <section className="profilesettingpassword-linked-accounts-section">
        <h2>Linked Social Accounts</h2>
        <p>
          This section shows the social accounts linked to your profile. If you'd like, you can disconnect them and log in with your email and password.
        </p>
        {linkedAccounts.map((account) => (
          <div key={account.platform} className="profilesettingpassword-linked-account">
            <div className="profilesettingpassword-account-info">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/300/300221.png`}
                alt={`${account.platform} logo`}
                className="profilesettingpassword-platform-logo"
              />
              <div>
                <p className="platformpara">{account.platform}</p>
                <p className="platformparaa">Added on {account.addedOn}</p>
                <button
              className="profiles-endsession-button"
              onClick={endallSessions}
            >
         End all sessions
            </button>
              </div>
            </div>
            <button
              className="profilesettingpassword-remove-button"
              onClick={() => handleRemoveAccount(account.platform)}
            >
              Remove
            </button>
          </div>
          
        ))}
          
      </section>
    
      <Navbar/>
    </div>

  );
};

export default AccountSettings;