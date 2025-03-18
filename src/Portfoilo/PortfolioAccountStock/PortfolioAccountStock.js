import React, { useState, useEffect, useContext } from "react";
import "./PortfolioAccountStock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Portfoliodonut from "../Portfoliodonut/Portfoliodonut";
import Navbar from "../../Navbar/Navbar";
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../../config";

import { PortfolioStocksContext } from "../context/PortfolioStocksContext";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { current } from "@reduxjs/toolkit";

const PortfolioAccountStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expandedRows, setExpandedRows] = useState(() => ({}));
  const { stockTransactions, setStockTransactions } = useContext(PortfolioStocksContext);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleAddTransaction = () => {
    navigate("/stockadd");
  }

  const handleEdit = (transaction) => {
    navigate("/stockupdate", { state: { transaction } });
  };

  const handleDeleteIconClick = (transaction) => {
    console.log(transaction)
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;
    const token = Cookies.get("jwtToken")

    try {
      await fetch(`${API_BASE_URL}/myportfolio/DeletestockTransactions/${transactionToDelete.stock_name}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setStockTransactions((prev) => prev.filter((txn) => txn.id !== transactionToDelete.id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    } finally {
      setShowPopup(false);
      setTransactionToDelete(null);
    }
  };   

  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = (stock_name) => {
    setExpandedRows((prev) => ({ ...prev, [stock_name]: !prev[stock_name] }));
  };
    

  // Update the transactions if coming back from the Edit page
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setStockTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]); 

  const total_investment = stockTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0 ) 
  

  return (
    <div>
      <Portfoliodonut total_investment = {total_investment}/>
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
                <button className="add-transaction-button" onClick={() => handleAddTransaction()}>
                  + Add Transaction
                </button>
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
                    onClick={() => navigate("/portfoliostockaccount")}
                  />{" "}
                  None
                  <input
                    type="radio"
                    name="groupBy"
                    value="sector"
                    onClick={() => navigate("/stocksector")}
                  />{" "}
                  Sector
                  <input
                    type="radio"
                    name="groupBy"
                    value="mcap"
                    onClick={() => navigate("/stockmcap")}
                  />{" "}
                  M-Cap
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
            {stockTransactions.map((transaction, index) => (
              <React.Fragment key={index}>
                {/* Main Stock Row */}
                <tr>
                  <td className="stock-name">
                    <span className="dropdown-icon" onClick={() => toggleDropdown(transaction.stock_name)}>
                      <FontAwesomeIcon icon={expandedRows[transaction.stock_name] ? faCaretDown : faCaretUp} />
                    </span>
                    {transaction.stock_name}
                    <span className="stock-actions">
                      <span className="action-text" onClick={() => handleAddTransaction()}>Add | Sell</span>
                      <span className="trash-icon">
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteIconClick(transaction)} />
                      </span>
                    </span>
                  </td>
                  <td className="negative">291.40<br />-0.12</td>
                  <td className="negative">-0.48(-0.04%)</td>
                  <td>{Number(transaction.buy_quantity)}</td>
                  <td>{transaction.amount}</td>
                  <td>1,165.60</td>
                  <td className="negative">-4(-0.38%)</td>
                  <td>{transaction.sell_price != 0 && transaction.sell_quantity != 0 ? 
                      ((transaction.sell_price - transaction.buy_price) * transaction.buy_quantity).toFixed(2) 
                      : 0}
                  </td>
                </tr>

                {/* Expanded Subcategory Row */}
                {expandedRows[transaction.stock_name] && (
                  <>
                    <tr>
                            <td colSpan="8" className="subcategory-row">
                              <table className="subcategory-table">
                                <thead>
                                  <tr>
                                    <th className="hover-effect" style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}>
                                      <Link to="/portfoliostockaccount" style={{ textDecoration: 'none', color: 'black' }}>Transaction History</Link>
                                    </th>
                                    <th className="hover-effect" style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}>
                                      <Link to="/overview" style={{ textDecoration: 'none', color: 'black' }}>Overview</Link>
                                    </th>
                                    <th className="hover-effect" style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}>
                                      <Link to="/accountfund" style={{ textDecoration: 'none', color: 'black' }}>Fundamentals</Link>
                                    </th>
                                    <th className="hover-effect" style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}>
                                      <Link to="/accountalert" style={{ textDecoration: 'none', color: 'black' }}>Alerts</Link>
                                    </th>
                                    <th className="hover-effect" style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', padding: '10px' }}>
                                      <Link to="/accountreturn" style={{ textDecoration: 'none', color: 'black' }}>Returns</Link>
                                    </th>
                                  </tr>
                                </thead>
                              </table>
                            </td>
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
                          {stockTransactions
                            .filter((txn) => txn.stock_name === transaction.stock_name)
                            .map((txn) => (
                              <tr key={txn.id}>
                                <td>{new Date(txn.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                <td>{txn.type}</td>
                                <td>{Number(txn.buy_quantity)}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.total_charges}</td>
                                <td>{txn.net_amount}</td>
                                <td>{txn.sell_price != 0 && txn.sell_quantity != 0 ? 
                                  ((txn.sell_price - txn.buy_price) * txn.buy_quantity).toFixed(2) 
                                  : 0 }
                                </td>
                                <td>{txn.holdingBalance}</td>
                                <td>
                                  <span className="icon-container">
                                    <FaEdit className="edit-icon" onClick={() => handleEdit(txn)} />
                                    <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeleteIconClick(txn)} />
                                    <BiPlusCircle className="add-icon" onClick={() => navigate("/stockadd")} />
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

export default PortfolioAccountStock;