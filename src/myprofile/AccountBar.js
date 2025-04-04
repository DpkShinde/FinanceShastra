import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { id: "myaccount", label: "My Account", path: "/userDetailsupdate" },
  { id: "orders", label: "Orders", path: "/orderTable" },
  { id: "billingSubscriptionPages", label: "Billing & Subscription", path: "/Billinginfohistory" },
  { id: "riskAnalysisDashboard", label: "Risk Profile Report", path: "/riskAnalysisDashboard" },
  { id: "managealert", label: "Manage Alert", path: "/managealert" },
  { id: "accountSettings", label: "Password & Security", path: "/accountSettings" },
  { id: "sessionHistory", label: "Active Devices", path: "/sessionHistory" },
  { id: "myReferalPage", label: "My referrals", path: "/myReferalPage" }
];

const AccountBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) setActiveTab(currentTab.id);
  }, [location.pathname]);

  return (
    <div className="profilepage-tabsorderusers">
      {tabs.map(({ id, label, path }) => (
        <span
          key={id}
          className="profilepage-tabb"
          style={
            activeTab === id
              ? { borderBottom: "2px solid #24b676", fontWeight: "bold", color: "#24b676" }
              : {}
          }
          onClick={() => navigate(path)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default AccountBar;
