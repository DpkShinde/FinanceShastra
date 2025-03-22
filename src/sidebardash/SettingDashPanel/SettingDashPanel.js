/*Before implementation of settings code start */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation to the homepage
// import "./SettingDashPanel.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import Navbar from "../../Navbar/Navbar";
// import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
// import Cookies from 'js-cookie'

// const SettingsDashboard = () => {
//   const [notifications, setNotifications] = useState({
//     "Turn on the notification sound": null,
//     "Show desktop notifications": null,
//     "Emails about suspicious sign-in attempts": null,
//     "When someone comments": null,
//     "Discount & New subscription plan": null,
//     "Product Updates": null,
//     "Onboarding materials": null,
//   });
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [accountDeleted, setAccountDeleted] = useState(false);
//   const [isBlurred, setBlurred] = useState(false); // For blur effect
//   const navigate = useNavigate(); // React Router's useNavigate for navigation

//  // Temporary state for unsaved changes
//  const [tempNotifications, setTempNotifications] = useState({ ...notifications });

//  // Toggle notification checkbox value in tempNotifications
//  const toggleNotification = (key) => {
//    setTempNotifications((prev) => ({
//      ...prev,
//      [key]: prev[key] === true ? null : true, // Toggle between `null` and `true`
//    }));
//  };

//  // Save changes to main state and sync temporary state
//  const saveChanges = () => {
//    setNotifications(tempNotifications); // Save changes to the main state
//    alert("Changes saved successfully!");

//  };

//  // Cancel changes and revert temp state to the latest saved notifications
//  const cancelChanges = () => {
//    setTempNotifications({ ...notifications }); // Revert tempNotifications to the saved state
//  };
//   const handleDelete = () => {
//     setPopupVisible(false);
//     setAccountDeleted(true);
//     setBlurred(true); // Apply the blur effect to the background

//     // Navigate to homepage after 2 seconds (adjust delay if needed)
//     setTimeout(() => {
//       setAccountDeleted(false); // Clear popup state
//       setBlurred(false); // Remove blur
//       navigate("/"); // Navigate to homepage
//     }, 2000); // 2000ms = 2 seconds
//   };

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//   };

//   return (
//     <div>

//     <div className={`settingsContainer ${isBlurred ? "popupOverlayBlur" : ""}`}>
//       <h2 className="settingsTitle">Settings</h2>

//       {/* Notifications Panel */}
//         {/* Notifications Panel */}
//         <div className="notificationsPanel">
//         <h3 className="panelHeader">Notifications</h3>
//         <div className="notificationOptions">
//           {Object.entries(tempNotifications).map(([key, value]) => (
//             <div key={key} className="optionRow">
//               <span>{key}</span>
//               <input
//                 id={`checkbox-${key}`}
//                 type="checkbox"
//                 checked={value === true} // Checked only if value is `true`
//                 onChange={() => toggleNotification(key)} // Toggle value on change
//               />
//               <label htmlFor={`checkbox-${key}`}></label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="buttonsRow">
//         <button className="saveBtn" onClick={saveChanges}>
//           Save & Update
//         </button>
//         <button className="cancelBtn" onClick={cancelChanges}>
//           Cancel
//         </button>
//       </div>

//       {/* Account Delete Panel */}
//       <div className="accountDeletePanel">
//   <h3 className="panelHeader">Suspend Delete</h3>
//   <p className="deleteWarning">
//     Your personal information will be erased in 30 days. You can reverse this decision within that period by clicking "Cancel Account Deletion" at the bottom of the page.
//   </p>
//   <p className="deleteWarning">
//     After 30 days, all of your personal data will be permanently deleted, and your public profile will be anonymized. Your username and avatar will be replaced with default options, making you unidentifiable. Your phone number will also be removed, but for security reasons, you may not be able to use it for a new account.
//   </p>
//   <p className="deleteWarning">
//     All of your personal data will be wiped, and your public profile will be anonymized (username and avatar will be replaced with default ones). Your phone number will be deleted, though you might be restricted from reusing it on a new account.
//   </p>
//   <p className="deleteWarning">
//     After 30 days, all of your personal data will be permanently deleted, and your public profile will be anonymized. Your username and avatar will be replaced with default options, making you unidentifiable. Your phone number will also be removed, but for security reasons, you may not be able to use it for a new account.
//   </p>
//   <p className="deleteWarning">
//     Please be aware that deleting your account will log you out from all devices, and you will lose any unsaved data on your charts.
//   </p>
//   <div className="buttonsbtnRow">
//     <button className="suspendBtn" onClick={() => setPopupVisible(true)}>
//       Yes, Suspend
//     </button>
//     <button className="noBtn" onClick={handlePopupClose}>
//       No
//     </button>
//   </div>
// </div>

//       {/* Confirmation Popup */}
//       {isPopupVisible && (
//         <div className="popupOverlayaccountDeletePanel">
//           <div className="popupContentaccountDeletePanel">
//             <h3 className="popupContentaccountDeletePanelh3">
//               Are you sure you want to delete your Suspend?
//             </h3>
//             <div className="popupButtonsaccountDeletePanel">
//               <button
//                 className="popupYesBtnaccountDeletePanel"
//                 onClick={handleDelete}
//               >
//                 Yes
//               </button>
//               <button
//                 className="popupNoBtnaccountDeletePanel"
//                 onClick={handlePopupClose}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {accountDeleted && (
//         <div className="popupOverlayaccountDeleted">
//           <div className="popupContentaccountDeleted">
//             <h3 className="successMessage">Your Suspend deleted successfully!</h3>
//           </div>

//         </div>
//       )}

//       <Navbar />
//       <Sidebar />

//       </div>
//       <div className="foooterpagesattt">
//       <FooterForAllPage/>
//       </div>
//       </div>

//   );
// };
/*Before implementation of settings code end */
// export default SettingsDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingDashPanel.css";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

const SettingsDashboard = () => {
  const [notificationPermission, setNotificationPermission] = useState([]);
  const [tempNotificationPermission, setTempNotificationPermission] = useState(
    []
  );
  const [isBlurred, setBlurred] = useState(false);
  const navigate = useNavigate();
  const userId = 3; // Change this to dynamic user ID if needed

  useEffect(() => {
    fetchNotificationPermissions();
  }, []);

  // Fetch user notification permissions
  const fetchNotificationPermissions = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notificationpermissions?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setNotificationPermission(data.data);
        setTempNotificationPermission(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notification permissions:", error);
    }
  };

  // Toggle notification permission
  const toggleNotificationPermission = (notificationTypeId) => {
    setTempNotificationPermission((prev) =>
      prev.map((notif) =>
        notif.notification_type_id === notificationTypeId
          ? { ...notif, is_enabled: !notif.is_enabled }
          : notif
      )
    );
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const updatedPermissions = {
        user_id: userId,
        permissions: tempNotificationPermission.map((notif) => ({
          notification_type_id: notif.notification_type_id,
          is_enabled: notif.is_enabled,
        })),
      };

      console.log("🚀 ~ saveChanges ~ updatedPermissions:", updatedPermissions);

      const response = await fetch(`${API_BASE_URL}/notificationpermissions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(updatedPermissions),
      });

      const data = await response.json();

      if (data.success) {
        setNotificationPermission([...tempNotificationPermission]); // Ensure UI reflects updated state
        alert("Changes saved successfully!");
      } else {
        alert(`Failed to save changes: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating notification permissions:", error);
      alert("An error occurred while saving changes.");
    }
  };

  // Cancel changes
  const cancelChanges = () => {
    setTempNotificationPermission([...notificationPermission]);
  };

  return (
    <div>
      <div
        className={`settingsContainer ${isBlurred ? "popupOverlayBlur" : ""}`}
      >
        <h2 className="settingsTitle">Settings</h2>

        {/* Notification Permissions Panel */}
        <div className="notificationsPanel">
          <h3 className="panelHeader">Notification Permissions</h3>
          <div className="notificationOptions">
            {tempNotificationPermission.map((notification) => (
              <div
                key={notification.notification_type_id}
                className="optionRow"
              >
                <span>{notification.notification_type_name}</span>
                <input
                  id={`checkbox-${notification.notification_type_id}`}
                  type="checkbox"
                  checked={!!notification.is_enabled}
                  onChange={() =>
                    toggleNotificationPermission(
                      notification.notification_type_id
                    )
                  }
                />
                <label
                  htmlFor={`checkbox-${notification.notification_type_id}`}
                ></label>
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
        <Navbar />
        <Sidebar />
      </div>

      <div className="foooterpagesattt">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default SettingsDashboard;
