import React, { useEffect, useState } from "react";
import "./SessionHistory.css"; // Add styles if needed
import systemimg from "../../assest/comp.svg";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config.js";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage.js";

const SessionHistory = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("jwtToken");

  const getLogeinDevices = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("User ID is missing!");
      const response = await fetch(`${API_BASE_URL}/users/devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Faild to fetch devices");
      }
      const data = await response.json();
      // console.log(data);
      setDevices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogeinDevices();
  }, []);

  console.log(devices);

  //api call for end session
  const endDeviceSession = async (device_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/end-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to end session");
      }

      const data = await response.json();

      // console.log(data);
      if (data?.success) {
        alert(data?.message);
        navigate("/login");
      }
      // update the state after ending device
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.device_id === device_id
            ? {
                ...device,
                is_active: false,
                logout_time: new Date().toISOString(),
              }
            : device
        )
      );
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <h1>Loading..</h1>;

  return (
    <div>
    <div className="session-history">
      <h1 className="profilepage-titlesession">My Account</h1>
      <div className="profilepage-tabsorderuserss">
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/userDetailsupdate")}
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
          style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}
        >
          Active Devices
        </span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/myReferalPage")}
        >
          My referrals
        </span>
      </div>

      <h2>Session History</h2>
      <p>
        Sessions track your account activity, including login times and devices.
        This helps you identify and prevent unauthorized access.
      </p>
      <div className="sessions-list">
        {devices &&
          devices.slice(0, 3).map((session) => (
            <div key={session.device_id} className="session-card">
              <div className="session-details">
                <img
                  src={systemimg}
                  alt="Device Icon"
                  className="device-icon"
                />
                <div className="session-text">
                  <h3>{session.device_name}</h3>
                  <p>
                    {session.device_name} · {session.status}{" "}
                    {formatDate(session.login_time)}{" "}
                    <span style={{ color: "red" }}>
                      {session.logout_time ? `Logout Time` : ""}
                    </span>
                    {session.logout_time ? formatDate(session.logout_time) : ""}
                  </p>
                </div>
              </div>

              <div className="session-actions">
                <p
                  className="active-statuss"
                  style={{ color: session.is_active ? "#24b676" : "#dc3545" }}
                >
                  {session.is_active ? "Active Now" : "Inactive"}
                </p>

                <button
                  className="end-session-button"
                  onClick={() => {
                    endDeviceSession(session.device_id);
                  }}
                >
                  {session.is_active ? "End session" : "Session is Expire"}
                </button>
              </div>
            </div>
          ))}
           
      </div>
    
    </div>
    <Navbar />
    <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default SessionHistory;
