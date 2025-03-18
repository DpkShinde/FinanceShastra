import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the homepage
import "./SettingDashPanel.css";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";




const SettingsDashboard = ({children}) => {
  const [notifications, setNotifications] = useState({
    "Turn on the notification sound": null,
    "Show desktop notifications": null,
    "Emails about suspicious sign-in attempts": null,
    "When someone comments": null,
    "Discount & New subscription plan": null,
    "Product Updates": null,
    "Onboarding materials": null,
  });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [isBlurred, setBlurred] = useState(false); // For blur effect
  const navigate = useNavigate(); // React Router's useNavigate for navigation

 // Temporary state for unsaved changes
 const [tempNotifications, setTempNotifications] = useState({ ...notifications });

 // Toggle notification checkbox value in tempNotifications
 const toggleNotification = (key) => {
   setTempNotifications((prev) => ({
     ...prev,
     [key]: prev[key] === true ? null : true, // Toggle between `null` and `true`
   }));
 };

 // Save changes to main state and sync temporary state
 const saveChanges = () => {
   setNotifications(tempNotifications); // Save changes to the main state
   alert("Changes saved successfully!");

 };

 // Cancel changes and revert temp state to the latest saved notifications
 const cancelChanges = () => {
   setTempNotifications({ ...notifications }); // Revert tempNotifications to the saved state
 };
  const handleDelete = () => {
    setPopupVisible(false);
    setAccountDeleted(true);
    setBlurred(true); // Apply the blur effect to the background

    // Navigate to homepage after 2 seconds (adjust delay if needed)
    setTimeout(() => {
      setAccountDeleted(false); // Clear popup state
      setBlurred(false); // Remove blur
      navigate("/"); // Navigate to homepage
    }, 2000); // 2000ms = 2 seconds
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <div>
 
    <div className={`settingsContainer ${isBlurred ? "popupOverlayBlur" : ""}`}>
      <h2 className="settingsTitle">Settings</h2>

      {/* Notifications Panel */}
        {/* Notifications Panel */}
        <div className="notificationsPanel">
        <h3 className="panelHeader">Notifications</h3>
        <div className="notificationOptions">
          {Object.entries(tempNotifications).map(([key, value]) => (
            <div key={key} className="optionRow">
              <span>{key}</span>
              <input
                id={`checkbox-${key}`}
                type="checkbox"
                checked={value === true} // Checked only if value is `true`
                onChange={() => toggleNotification(key)} // Toggle value on change
              />
              <label htmlFor={`checkbox-${key}`}></label>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="buttonsRow">
        <button className="saveBtn" onClick={saveChanges}>
          Save & Update
        </button>
        <button className="cancelBtn" onClick={cancelChanges}>
          Cancel
        </button>
      </div>

      {/* Account Delete Panel */}
      <div className="accountDeletePanel">
  <h3 className="panelHeader">Suspend Delete</h3>
  <p className="deleteWarning">
    Your personal information will be erased in 30 days. You can reverse this decision within that period by clicking "Cancel Account Deletion" at the bottom of the page.
  </p>
  <p className="deleteWarning">
    After 30 days, all of your personal data will be permanently deleted, and your public profile will be anonymized. Your username and avatar will be replaced with default options, making you unidentifiable. Your phone number will also be removed, but for security reasons, you may not be able to use it for a new account.
  </p>
  <p className="deleteWarning">
    All of your personal data will be wiped, and your public profile will be anonymized (username and avatar will be replaced with default ones). Your phone number will be deleted, though you might be restricted from reusing it on a new account.
  </p>
  <p className="deleteWarning">
    After 30 days, all of your personal data will be permanently deleted, and your public profile will be anonymized. Your username and avatar will be replaced with default options, making you unidentifiable. Your phone number will also be removed, but for security reasons, you may not be able to use it for a new account.
  </p>
  <p className="deleteWarning">
    Please be aware that deleting your account will log you out from all devices, and you will lose any unsaved data on your charts.
  </p>
  <div className="buttonsbtnRow">
    <button className="suspendBtn" onClick={() => setPopupVisible(true)}>
      Yes, Suspend
    </button>
    <button className="noBtn" onClick={handlePopupClose}>
      No
    </button>
  </div>
</div>

      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className="popupOverlayaccountDeletePanel">
          <div className="popupContentaccountDeletePanel">
            <h3 className="popupContentaccountDeletePanelh3">
              Are you sure you want to delete your Suspend?
            </h3>
            <div className="popupButtonsaccountDeletePanel">
              <button
                className="popupYesBtnaccountDeletePanel"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="popupNoBtnaccountDeletePanel"
                onClick={handlePopupClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {accountDeleted && (
        <div className="popupOverlayaccountDeleted">
          <div className="popupContentaccountDeleted">
            <h3 className="successMessage">Your Suspend deleted successfully!</h3>
          </div>
         
        </div>
      )}

      <Navbar />

      
      </div> 
      <div className="layout">
      <Sidebar />
      <div className="main-contentover">
        <div className="contentover">{children}</div>
        <FooterForAllPage />
      </div>
    </div>
      </div>
  
    
  );
};

export default SettingsDashboard;
