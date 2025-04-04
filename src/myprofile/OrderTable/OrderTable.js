import React, { useState, useEffect, useContext } from "react";
import "./OrderTable.css";
import Cookies from 'js-cookie'


import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../config";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import AccountBar from "../AccountBar";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  textAlign: "center",
};
/*const ordersData = [

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
];*/

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // "2025-03-08"
};

const OrderTable = () => {
  const [isLogin, setislogin] = useState(true);
  const [ordersdatastate, setordersData] = useState([]);
  const [isLoading, setisLoading]= useState(false)
  useEffect(() => {
    setisLoading(true)
    const fetOrders = async () => {
      const localtoken = Cookies.get("jwtToken");
      if (!localtoken) {
        setislogin(false);
      }
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localtoken}`,
        },
      };
      const url = `${API_BASE_URL}/orders`;
      // const urllocal = "http://localhost:3000/orders";
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        if (data.length !== 0) {
          const formattedordersData = data.map((e) => ({
            id: e.order_id,
            order: e.order_name,
            date: formatDate(e.order_date),
            amount: e.Amount,
            status: e.Status,
          }));
          setordersData(formattedordersData);
        }
      }
      setisLoading(false)
    };
    fetOrders();
  }, []);

  const onlogin = () => {
    navigate("/login");
  };

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All orders");

  const filteredOrders =
    activeTab === "All orders"
      ? ordersdatastate
      : ordersdatastate.filter((order) => order.status === activeTab);

  return (
    <div>
    {isLoading? <div className='loader-cont'><ClipLoader
                      cssOverride={override}
                      size={35}
                      data-testid="loader"
                      loading={isLoading}
                      speedMultiplier={1}
                      color="green"
                    /></div>
                  : 
                  <>
                  <div className="order-table-all">
        <h1 className="profilepage-titleorder">My Orders</h1>
        <AccountBar />
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
                <td>
                  {order.order}
                  <br />
                  <span className="halfyear">(half yearly)</span>
                </td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Navbar />
        {!isLogin && (
          <div className="payment-popup">
            <div className="payment-popup-content">
              <h2>You Are not Logged in!</h2>
              <p className="amount-paid">Please Login</p>
              <button
                type="button"
                onClick={onlogin}
                className="loginbtnpopupnot"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="foooterpagesaupdate">
      <FooterForAllPage />
      </div></>
                  }
    
      
    </div>
  );
};

export default OrderTable;
