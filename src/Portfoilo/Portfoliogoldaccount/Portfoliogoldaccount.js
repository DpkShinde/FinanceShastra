import React, { useState, useEffect } from "react";
import './Portfoliogoldaccount.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../../Navbar/Navbar";
import Portfoliogoldtop from "../Portfoliogoldtoppage/Portfoliogoldtoppage";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const Portfoliogoldaccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(
    location.pathname === "/portfolio-management-stocks"
  );
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "18/11/2024",
      type: "Buy My Account",
      quantity: 2,
      amount: 584.4,
      charges: 0.6,
      netAmount: 585,
      realizedGainLoss: "-",
      holdingBalance: 4,
    },
    {
      id: 2,
      date: "18/11/2024",
      type: "Buy My Account",
      quantity: 2,
      amount: 584.4,
      charges: 0.6,
      netAmount: 585,
      realizedGainLoss: "-",
      holdingBalance: 4,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

    const fetchStocks = async () => {
      const token = Cookies.get("jwtToken");
      if (!token) {
        //alert("Session expired, Please Login again");
        navigate("/login");
        return;
      }
    
      try {
        const res = await fetch("/myportfolio/transactions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!res.ok) throw new Error("Failed to fetch data");
    
        const data = await res.json();
        setTransactions(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    
    useEffect(() => {
      fetchStocks();
    }, []);

  const handleEdit = (transaction) => {
    navigate("/updatestockportfolio", { state: { transaction } });
  };

  const handleDeleteIconClick = (transaction) => {
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactions((prev) =>
        prev.filter((txn) => txn.id !== transactionToDelete.id)
      );
      setShowPopup(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Update the transactions if coming back from the Edit page
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]);

  return (
    <div>
      <Portfoliogoldtop/>
      <div className="portfolio-account-stock-container">
        <div className="portfolio-account-stock-header">
          <h2 className="portfolio-account-stock-title">My Accounts</h2>
          <div className="portfolio-account-stock-controls">
            <div className="portfolio-account-stock-filters">
            <span className="filter-label">FILTER:</span>
              <button className="filter-button">All</button>
              <button className="filter-button">Gainers</button>
              <button className="filter-button">Losers</button>
            </div>
            <div className="portfolio-account-stock-actions-container">
              <div className="portfolio-account-stock-actions">
                <button className="add-transaction-button"onClick={() => navigate("/addTransactiongold")}>
                  + Add Transaction
                </button>
                <button className="my-alerts-button">My Alerts</button>
              </div>
            </div>
          </div>
        </div>


        {/* Stock Table */}
        <table className="portfolio-account-stock-table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Live Price<br />Weight (%)</th>
              <th>Day's Gain<br />Weight (%)</th>
              <th>Quantity<br />Per Unit Cost</th>
              <th>Investment Cost<br />Weight (%)</th>
              <th>Latest Value<br />Weight (%)</th>
              <th>Unrealized Gain<br />Change (%)</th>
              <th>Realized Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="stock-name">
                <span className="dropdown-icon" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={isDropdownOpen ? faCaretDown : faCaretUp} />
                </span>
                Axis Gold ETF
                <span className="stock-actions">
                  <span className="action-text"  onClick={() => navigate("/addTransactiongold")}>Add | Sell</span>
                  <span className="trash-icon">
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteIconClick()} />
                  </span>
                </span>
              </td>
              <td className="negative">291.40<br />-0.12</td>
              <td className="negative">-0.48<br />-0.04%</td>
              <td>4</td>
              <td>1,170.00</td>
              <td>1,165.60</td>
              <td className="negative">-4<br />-0.38%</td>
              <td>-</td>
            </tr>
           

            {/* Subcategory Row */}
            {isDropdownOpen && (
              <>
                              <tr>
              <th
                className="hover-effect"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  padding: '10px',
                }}
              >
                <Link
                  to="/portfolio-management-gold"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Transaction History
                </Link>
              </th>
              <th
                className="hover-effect"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  padding: '10px',
                }}
              >
                <Link to="/overviewPortfolioManager" style={{ textDecoration: 'none', color: 'black' }}>
                  Overview
                </Link>
              </th>
             
            </tr>
              <tr>
                <td colSpan="8" className="subcategory-row">
                  <table className="subcategory-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Charges</th>
                        <th>Net Amount</th>
                        <th>Realized Gain/Loss</th>
                        <th>Holding Balance</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.buy_quantity}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.charges}</td>
                          <td>{transaction.netAmount}</td>
                          <td>{transaction.realizedGainLoss}</td>
                          <td>{transaction.holdingBalance}</td>
                          <td>
                            <span className="icon-container">
                              <FaEdit
                                className="edit-icon"
                                onClick={() => handleEdit(transaction)}
                              />
                               <FontAwesomeIcon
            icon={faTrashAlt}
            className="delete-icon"
            onClick={() => handleDeleteIconClick(transaction)}
        />
                              <BiPlusCircle className="add-icon" />
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
                  </table>
                </td>
              </tr>
              </>
            )}
               <tr className="table-total">
               <td>Total</td>
               <td>-</td>
               <td className="Positive">0%</td>
               <td>-</td>
               <td>0</td>
               <td>0</td>
               <td className="negative">0%</td>
               <td>-</td>
             </tr>
          </tbody>
        </table>
        
        <p className="portfolio-account-stock-notep">
        Note : Gold  prices is based on MCX live prices. Gold bond & Gold ETF prices are based on NSE trading data.
        </p>

        {/* Delete Confirmation Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Delete All Transactions</h3>
              <p>Do you want to start fresh and clear all transactions and SIPs for all accounts?</p>
              <div className="popup-buttons">
                <button className="yes-button" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="no-button" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default Portfoliogoldaccount;