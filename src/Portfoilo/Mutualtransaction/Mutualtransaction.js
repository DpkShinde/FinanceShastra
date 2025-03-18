import React, { useState, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import Mutualportfoliodonut from "../Mutualportfoliodonut/Mutualportfoliodonut";
import { PortfolioMutualsContext } from "../context/PortfolioMutualsContext";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import Cookies from 'js-cookie'

const MutualAccountStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutualTransactions, setMutualTransactions } = useContext(PortfolioMutualsContext)
  const [expandedRows, setExpandedRows] = useState(() => ({}));
  console.log("Trans data: ", mutualTransactions)
  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    location.pathname === "/portfoliostockaccount"
  );

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Handlers
  const handleEdit = (transaction) => {
    navigate("/stockupdate", { state: { transaction } });
  };

  const handleAddMutual = () => {
    navigate('/addTransactionmutual')
  }

  const handleDeleteIconClick = (transaction) => {
    console.log("delete trans", transaction)
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    const token = Cookies.get("jwtToken")
    if (!transactionToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/myportfolio/DeleteMutualTransactions/${transactionToDelete.scheme}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("delete id", transactionToDelete.scheme)

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Update state after successful deletion
      setMutualTransactions((prev) => prev.filter((txn) => txn.id !== transactionToDelete.scheme));

      // Reset state
      setShowPopup(false);
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };


  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = (stock_name) => {
    setExpandedRows((prev) => ({ ...prev, [stock_name]: !prev[stock_name] }));
  };

  // Handle updates from navigation state
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setMutualTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]);

  const total_investment = mutualTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)

  return (
    <div>
      <Mutualportfoliodonut total_investment={total_investment} />
      <div className="portfolio-account-stock-container">
        {/* Header Section */}
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
                <button className="add-transaction-button" onClick={() => handleAddMutual()}>+ Add Transaction</button>
                <button className="my-alerts-button">My Alerts</button>
              </div>
              <div className="portfolio-account-stock-group">
                <label>
                  Group By:
                  <input
                    type="radio"
                    name="groupBy"
                    value="none"
                    defaultChecked
                    onClick={() => navigate("/mutualnone")}
                  />{" "}
                  None
                  <input
                    type="radio"
                    name="groupBy"
                    value="sector"
                    onClick={() => navigate("/mutualsector")}
                  />{" "}
                  AMC
                  <input
                    type="radio"
                    name="groupBy"
                    value="mcap"
                    onClick={() => navigate("/mutualtype")}
                  />{" "}
                  Types of Funds
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Stock Table */}
        <table className="portfolio-account-stock-table">
          <thead>
            <tr>
              <th>Stocks Name</th>
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
            {mutualTransactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="stock-name">
                    <span className="dropdown-icon" onClick={() => toggleDropdown(transaction.scheme)}>
                      <FontAwesomeIcon icon={expandedRows[transaction.scheme] ? faCaretDown : faCaretUp} />
                    </span>
                    {transaction.scheme}
                    <span className="stock-actions">
                      <span className="action-text" onClick={() => { handleAddMutual() }}>Add | Sell</span>
                      <span className="trash-icon">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleDeleteIconClick(transaction)}
                        />
                      </span>
                    </span>
                  </td>
                  <td className="negative">291.40<br />-0.12</td>
                  <td className="negative">-0.48<br />-0.04%</td>
                  <td>{transaction.buy_quantity}</td>
                  <td>{transaction.amount}</td>
                  <td>1,165.60</td>
                  <td className="negative">-4<br />-0.38%</td>
                  <td>
                    {transaction.sell_price != 0 && transaction.sell_quantity != 0 ?
                      ((transaction.sell_price - transaction.buy_price) * transaction.buy_quantity).toFixed(2)
                      : 0}
                  </td>
                </tr>

                {/* Subcategory Row */}
                {expandedRows[transaction.scheme] && (
                  <tr>
                    <td colSpan="8" className="subcategory-row">
                      <table className="subcategory-table">
                        <thead>
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
                                to="/mutualaccount"
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
                              <Link to="/mutualoverview" style={{ textDecoration: 'none', color: 'black' }}>
                                Overview
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
                              <Link to="/accountperformance" style={{ textDecoration: 'none', color: 'black' }}>
                                Performance
                              </Link>
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {mutualTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>{transaction.date}</td>
                              <td>{transaction.type}</td>
                              <td>{transaction.quantity}</td>
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
                                  <BiPlusCircle className="add-icon" onClick={() => { handleAddMutual() }} />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

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

export default MutualAccountStock;
