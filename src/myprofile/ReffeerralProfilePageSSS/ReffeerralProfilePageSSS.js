import React, { useEffect, useState } from "react";
import "./ReffeerralProfilePageSSS.css";
import { useNavigate } from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

const ReffeerralProfilePageSSS = () => {
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const reffeerralprofilepagesssData = [
    { title: "Referral Count", value: 12 },
    { title: "Registered Count", value: 8 },
    { title: "Subscribed Count", value: 23 },
    { title: "Total Earnings (₹)", value: "6,85,674" },
  ];

  const getAllReferrals = async () => {
    try {
      const url = `${API_BASE_URL}/referrals/get-referrals`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.status === 200) {
        setReferrals(data.referals);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReferrals();
  }, []);

  //count stats
  const referralStats = {
    referralCount: referrals.length,
    registeredCount: referrals.reduce(
      (sum, count) => sum + (parseFloat(count.register) || 0),
      0
    ),
    subscribedCount: referrals.reduce(
      (sum, count) => sum + (parseFloat(count.subscribe) || 0),
      0
    ),
    totalEarnings: referrals.reduce(
      (sum, ref) => sum + (parseFloat(ref.total_earning) || 0),
      0
    ),
  };

  console.log(referrals);
  return (
    <div className="profilepageee-container">
      <h1 className="profilepage-title" style={{ fontFamily: "Calibri" }}>
        My Referrals
      </h1>

      <div className="profilepage-tabsorderusers">
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
          onClick={() => navigate("/sessionHistory")}
        >
          Active Devices
        </span>
        <span
          className="profilepage-tabb"
          style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}
          onClick={() => navigate("/myReferalPage")}
        >
          My referrals
        </span>
      </div>

      <div className="myreferalpagesss">
        {/* Header Section */}
        <div className="myreferalpagesss-header">
          <div className="myreferalpagesss-header-row">
            <h1>
              Assist your friends in their investment journey and reach
              financial independence faster.
            </h1>
            <a href="#" className="myreferalpagesss-benefits-link">
              View benefits
            </a>
          </div>

          <div className="myreferalpagesss-buttons">
            <button
              className="myreferalpagesss-button "
              onClick={() => navigate("/myReferalPage")}
            >
              Overview
            </button>
            <button
              className="myreferalpagesss-button "
              onClick={() => navigate("/referMoreProfilePages")}
            >
              Refer More
            </button>
            <button
              className="myreferalpagesss-button "
              onClick={() => navigate("/earningCalculatorProfilePage")}
            >
              Earning Calculator
            </button>
            <button
              className="myreferalpagesss-button active"
              onClick={() => navigate("/reffeerralProfilePageSSS")}
            >
              My Referrals
            </button>
          </div>
        </div>
        {/* referral stats  */}
        <div className="reffeerralprofilepagesss-container">
          {isLoading ? (
            <p>Loading referral data...</p>
          ) : (
            [
              { title: "Referral Count", value: referralStats.referralCount },
              {
                title: "Registered Count",
                value: referralStats.registeredCount,
              },
              {
                title: "Subscribed Count",
                value: referralStats.subscribedCount,
              },
              {
                title: "Total Earnings (₹)",
                value: referralStats.totalEarnings.toLocaleString(),
              },
            ].map((item) => {
              return (
                <div
                  key={item.ref_id}
                  className="reffeerralprofilepagesss-card"
                >
                  <h3 className="reffeerralprofilepagesss-title">
                    {item.title}
                  </h3>
                  <p className="reffeerralprofilepagesss-value">{item.value}</p>
                </div>
              );
            })
          )}
        </div>

        <div className="reffeerralprofilepagesss-table">
          {referralStats.referralCount === 0 ? (
            // Show "No referrals yet." when count is 0
            <p className="referaaalll">No referrals yet.</p>
          ) : (
            // Show table only if referral count > 0
            <table>
              <thead>
                <tr>
                  <th>Contact Details</th>
                  <th>Date Sent</th>
                  <th>Registration Status</th>
                  <th>Total Earnings (₹ & %)</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.ref_id}>
                    <td>
                      {referral.referredFirstName} {referral.referredLastName}{" "}
                      <br />
                      {referral.referredEmail} <br />
                      +91 {referral.referredMobileNo}
                    </td>
                    <td>
                      {" "}
                      {new Date(referral.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>{referral.register === 0 ? "Not Yet" : "Registerd"}</td>
                    <td>{referral.total_earning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Navbar />

      <FooterForAllPage />
    </div>
  );
};

export default ReffeerralProfilePageSSS;
