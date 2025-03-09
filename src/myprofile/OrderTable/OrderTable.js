import React, { useState } from "react";
import './OrderTable.css'

import Navbar from "../../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
const ordersData = [
  { id: "#7234531", order: "Elite ", date: "08-07-2024", amount: "₹2,000", status: "Completed" },
  { id: "#7234532", order: "Premium ", date: "08-06-2024", amount: "₹5,999", status: "Completed" },
  { id: "#7234533", order: "Premium ", date: "07-06-2024", amount: "₹5,999", status: "Pending" },
  { id: "#7234534", order: "Elite ", date: "07-05-2024", amount: "₹2,000", status: "Completed" },
  { id: "#7234535", order: "Premium ", date: "07-04-2024", amount: "₹5,999", status: "Completed" },
  { id: "#7234536", order: "Premium (half yearly)", date: "02-04-2024", amount: "₹5,999", status: "Cancel" },
  { id: "#7234537", order: "Elite (half yearly)", date: "02-03-2024", amount: "₹2,000", status: "Completed" },
  { id: "#7234538", order: "Premium (half yearly)", date: "02-02-2024", amount: "₹5,999", status: "Completed" },
  { id: "#7234539", order: "Premium (half yearly)", date: "01-02-2024", amount: "₹5,999", status: "Pending" },
  { id: "#7234540", order: "Premium (half yearly)", date: "01-01-2024", amount: "₹5,999", status: "Cancel" },
];

const OrderTable = () => {
  const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All orders");
  
    const filteredOrders =
      activeTab === "All orders"
        ? ordersData
        : ordersData.filter((order) => order.status === activeTab);
  
    return (
      <div>
      <div className="order-table-all">
        <h1 className="profilepage-titleorder">My Orders</h1>
      <div className="profilepage-tabsorder">
        <span className="profilepage-tabb"
         onClick={() => navigate("/userDetailsupdate")}>My Account</span>
        <span className="profilepage-tabb active"  onClick={() => navigate("/orderTable")}>Orders</span>
        <span className="profilepage-tabb " onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb"onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span className="profilepage-tabb" onClick={() => navigate("/managealert")}>Manage Alert</span>

        <span className="profilepage-tabb" onClick={() => navigate("/accountSettings")}>Password & Security</span>
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb"onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>
        <div className="tabs">
          {["All orders", "Completed", "Pending", "Cancel"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active-tab" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
  
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Order</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.order}<br/><span className="halfyear">(half yearly)</span></td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Navbar/>
        
      </div>
      <FooterForAllPage/>
      </div>
    );
  };

export default OrderTable;
  