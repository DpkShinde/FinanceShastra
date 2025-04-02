import  { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";  

import "./BillingInfoHistory.css";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";

const BillingInfoHistory = () => {
    const navigate = useNavigate(); 
  const handleDownload = (planName) => {
    // Create a sample file blob
    const blob = new Blob([`Invoice for ${planName}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const a = document.createElement("a");
    a.href = url;
    a.download = `${planName.replace(/\s+/g, "_")}_invoice.txt`; // Filename format
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
 
  // Function to show PDF preview
  const handleViewInvoice = (plan) => {
    window.scrollTo(0, 0); 
    navigate(`/invoicePage?plan=${encodeURIComponent(plan.name)}&purchasedate=${encodeURIComponent(plan.purchasedate)}&amount=${encodeURIComponent(plan.amount)}`);
  };
 
  const [billingInfo, setBillingInfo] = useState({
    name: "Deepak Shinde",
    address: "House no. 6, Mantri Lavendula, Mulshi Rd, Beside Barbacco, Pranjali Patil Nagar, Bavdhan.",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
  });

  const handleNavigation = () => {
    navigate("/editProfile", { state: { billingInfo } });
  };

  return (
    <div>
    <div className="profilepagee-container">

        <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
            My Billing & Subscription
        </h1>
        <div className="profilepage-tabsorderusers" >
            <span className="profilepage-tabb" onClick={() => navigate("/userDetailsupdate")}
            >My Account</span>
            <span
                className="profilepage-tabb"
                onClick={() => navigate("/orderTable")}
            >
                Orders
            </span>
            <span className="profilepage-tabb" style={{
                borderBottom: "2px solid #24b676",
                fontWeight: "bold",
                color: "#24b676",
            }} onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
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
            <span className="profilepage-tabb" onClick={() => navigate('/myReferalPage')}>My referrals</span>
        </div>

    <div className="billinginfohistory-container">
      <div className="billinginfohistory-row">
        <div className="billinginfohistory-plan billinginfohistory-wide">
          <h2>Current Plan</h2>
          <div className="billinginfohistorycard">
            <p className="billinginfohistorypara"><strong>Plan Type:</strong> Premium plan half yearly</p>
            <p className="billinginfohistorypara"><strong>Plan Pricing:</strong> ₹5,999/- billed half yearly</p>
            <p className="billinginfohistory-switch">Switch to annual & save ₹3,999/-</p>
            <p className="billinginfohistorypara"><strong>Next Charge:</strong> April 18, 2025</p>
            <button className="billinginfohistory-btn"
            onClick={() => {
              navigate("/pricehalf"); 
              window.scrollTo(0, 0); // Scroll to top after navigation
            }}
          >View Other Plans</button>
          </div>
        </div>
        
        <div className="billinginfohistory-billing billinginfohistory-wide">
      <h2>Billing Information</h2>
      <div className="billinginfohistory-card">
        <p className="billinginfohistorypara"><strong>Name:</strong> {billingInfo.name}</p>
        <p className="billinginfohistorypara"><strong>Address:</strong> {billingInfo.address}</p>
        <p className="billinginfohistorypara"><strong>City, State:</strong> {billingInfo.city}, {billingInfo.state}</p>
        <p className="billinginfohistorypara"><strong>Country:</strong> {billingInfo.country}</p>
        <button 
          className="billinginfohistorybtn" 
          onClick={handleNavigation}
        >
          Update Billing Address
        </button>
      </div>
    </div>
      </div>

      <div className="billinginfohistory-history">
        <h2 className="billinginfohistory-historyh2">Billing History</h2>
        <div className="billinginfohistory-history-scroll">
        <table className="billinginfohistory-historytable">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Purchase Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Premium plan - Half yearly", amount: "₹5,999/-", purchase: "18-10-2024", end: "18-04-2025", status: "Processing", statusClass: "processing" },
            { name: "Elite plan - Annually", amount: "₹2,999/-", purchase: "01-10-2023", end: "01-10-2024", status: "Success", statusClass: "success" },
            { name: "Elite plan - Half yearly", amount: "₹2,000/-", purchase: "15-02-2023", end: "15-08-2023", status: "Success", statusClass: "success" },
            { name: "Premium plan - Annually", amount: "₹7,999/-", purchase: "10-02-2022", end: "10-02-2023", status: "Success", statusClass: "success" },
            { name: "Elite plan - Half yearly", amount: "₹2,000/-", purchase: "20-07-2021", end: "20-01-2023", status: "Success", statusClass: "success" },
          ].map((plan, index) => (
            <tr key={index}>
              <td>{plan.name}</td>
              <td>{plan.amount}</td>
              <td>{plan.purchase}</td>
              <td>{plan.end}</td>
              <td className={`billinginfohistory-${plan.statusClass}`}>
                <span className={`status-icon ${plan.statusClass}`}>●</span> {plan.status}
              </td>
              <td>
                <button className="billinginfohistory-download" onClick={() => handleDownload(plan.name)}>
                  <HiOutlineDownload />
                </button>
                <button className="billinginfohistory-view" onClick={() => handleViewInvoice(plan)}>
      <MdOutlineRemoveRedEye />
    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <Navbar/>
    </div>
    <div className="foooterpagesaupdate">
                <FooterForAllPage/>
            </div>
    </div>
  );
};

export default BillingInfoHistory;
