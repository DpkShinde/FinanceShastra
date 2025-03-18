import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Store/Slices/searchDataSlice";
import { debounce } from "lodash";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Sidebar from "../../Sidebar/Sidebar";
import AddSIPForm from "../AddSIPFormstock/AddSIPFormstock";

import { CiCirclePlus } from "react-icons/ci";
import "./Addtransactiongold.css";

const AddTransactiongold = ({children}) => {
    const navigate = useNavigate();

    const initialTransactionState = {
        type: "Buy",
        gold_name: "",
        nav: "",
        date: "",
        quantity: "",
        amount: "",
        total_charges: "",
        net_amount: "",
        notes: "",
        showSIP: false,
    };




    const [transactions, setTransactions] = useState([initialTransactionState]);

    const handleAddTransactionForm = () => {
        setTransactions([...transactions, { ...initialTransactionState }]);
    };

    
    const handleResetLastTransaction = () => {
        if (transactions.length > 1) {
            setTransactions(transactions.slice(0, -1));
        } else {
            alert("At least one transaction must remain.");
        }
    };

    const handleResetAllTransactions = () => {
        setTransactions([initialTransactionState]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        setTransactions((prevTransactions) => {
            const updatedTransactions = [...prevTransactions];
            updatedTransactions[index] = { ...updatedTransactions[index], [name]: value };

            if (name === "quantity" || name === "nav") {
                const quantity = Number(updatedTransactions[index].quantity) || 0;
                const nav = Number(updatedTransactions[index].nav) || 0;
                updatedTransactions[index].amount = quantity * nav;
                updatedTransactions[index].total_charges = updatedTransactions[index].amount * 0.02;
                updatedTransactions[index].net_amount = updatedTransactions[index].amount + updatedTransactions[index].total_charges;
            }
            return updatedTransactions;
        });
    };

    const handleToggleSIP = (index) => {
        setTransactions((prevTransactions) => {
            const updatedTransactions = [...prevTransactions];
            updatedTransactions[index] = {
                ...updatedTransactions[index],
                showSIP: !updatedTransactions[index].showSIP,
            };
            return updatedTransactions;
        });
    };

    const handleAddTransaction = async () => {
        try {
            const token = Cookies.get("jwtToken");
            if (!token) {
                alert("Authentication required. Please log in.");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/myportfolio/addStock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(transactions),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add transaction");
            }

            navigate("/portfoliostockaccount", {
                state: { updatedTransactions: transactions },
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert(error.message);
        }
    };


    return (
        <div>
        <div className="transaction-form">
            <h2 className="tranheaderform">Add Transaction</h2>

            <div className="tabsadd">
                <button className="tabadd" onClick={() => navigate("/stockadd")}>Stocks</button>
                <button className="tabadd" onClick={() => navigate("/addTransactionmutual")}>Mutual Fund</button>
                <button className="tabadd" style={{ background: "#24b676", color: "white" }}>Gold</button>
            </div>

            <div className="addcontainer">
                {transactions.map((transactionData, index) => (
                    <form key={index} className="transaction-row-wrapper">
                        <div className="transaction-row">
                            <label>
                                <p1 style={{ marginLeft: "49px" }}>Type</p1><br />
                                <select
                                    name="type"
                                    value={transactionData.type}
                                    onChange={(e) => handleInputChange(index, e)}
                                    style={{ width: "80px", height: "30px", marginLeft: "50px" }}
                                    className="transaction-input"
                                >
                                    <option value="Buy">Buy</option>
                                    <option value="Sell">Sell</option>
                                </select>
                            </label>

                            <label>
                                Gold Name
                                <input type="text" name="gold_name" value={transactionData.gold_name}
                                    onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
                            </label>

                            <label>
                                Date
                                <input
                                    type="date"
                                    name="date"
                                    value={transactionData.date}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="transaction-input"
                                />
                            </label>

                            <label>
                                Quantity
                                <input type="number" name="quantity" value={transactionData.quantity}
                                    onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
                            </label>

                            <label>
                                Price / Unit
                                <input type="number" name="nav" value={transactionData.nav}
                                    onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
                                <p style={{ fontSize: "12px", marginLeft: "5px", marginTop: "1px" }}>Unit : Gold - 10 gm.</p>
                            </label>

                            <label>
                                Amount
                                <input type="number" name="amount" value={transactionData.amount} readOnly className="transaction-input read-only" />
                            </label>

                            <label>
                                <p1 style={{ marginLeft: "50px" }}> Charges</p1><br />
                                <input type="number" name="total_charges" value={transactionData.total_charges} readOnly className="transaction-inputcharge" />
                            </label>

                            <label>
                                <p1 style={{ marginLeft: "-45px" }}>Net Amount</p1><br />
                                <input type="number" name="net_amount" value={transactionData.net_amount} readOnly className="transaction-inputnet" />
                            </label>

                            <label className="noteall">
                                Notes<br />
                                <input type="text" name="notes" value={transactionData.notes} onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
                            </label>
                            <div className="sip-link">
                                <a href="#" onClick={() => handleToggleSIP(index)}>
                                    Add SIP for this Stock
                                </a>
                            </div>
                        </div>
                        {/* SIP Toggle */}


                        {/* SIP Form */}
                        {transactionData.showSIP && (
                            <div className="addsipform-container">
                                <AddSIPForm />
                            </div>
                        )}

                    </form>
                ))}

                {/* Add More Transactions Button */}
                <div className="form-buttonsmoreadd">
                    <button onClick={handleAddTransactionForm}>
                        <CiCirclePlus /> Add More Transactions
                    </button>
                </div>

                {/* Submit Button */}
                <div className="form-buttons">
                    <button
                        type="button"
                        style={{ background: "#24b676", color: "white" }}
                        onClick={handleAddTransaction}
                        className="save-button"
                    >
                        Add Transaction
                    </button>
                    <button className="resetgold" onClick={handleResetAllTransactions} >
                        Reset
                    </button>
                </div>
            </div>



            <Navbar />
        
        </div>
         <div className="layout">
         <Sidebar />
         <div className="main-contentover">
           <div className="contentover">{children}</div>
           <FooterForAllPage />
         </div>
       </div>
       </div>
    );
};

export default AddTransactiongold;
