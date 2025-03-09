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
import './Addtransactionmutual.css';
import { CiCirclePlus } from "react-icons/ci";
import AddSIPForm from "../AddSIPFormstock/AddSIPFormstock";

const initialTransactionState = {
  type: "Buy",
  scheme_name: "",
  nav: "",
  date: "",
  quantity: 0,
  dividend: "Invest",
  amount: 0,
  notes: "",
  showSIP: false,
};

const AddTransactionmutual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stocksData = useSelector((store) => store?.searchData?.searchData);

  useEffect(() => {
    if (!stocksData || stocksData.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/search/allInfo`);
          const data = await response.json();
          dispatch(setSearchData(data?.data || []));
        } catch (error) {
          console.error("Error fetching search data:", error);
        }
      };
      fetchData();
    }
  }, [dispatch, stocksData]);

  const [transactions, setTransactions] = useState([initialTransactionState]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterData, setFilterData] = useState([]);
  

  const debounceSearch = useCallback(
    debounce((searchText) => {
      if (!searchText) {
        setFilterData([]);
        return;
      }
      const results = stocksData.filter((item) =>
        item.company?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilterData(results);
    }, 300),
    [stocksData]
  );

  useEffect(() => {
    debounceSearch(transactions[0].scheme_name);
    return () => debounceSearch.cancel();
  }, [transactions]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setTransactions((prev) => {
      let updatedTransactions = [...prev];
      updatedTransactions[index] = {
        ...updatedTransactions[index],
        [name]: value,
      };

      // Auto-calculate amount
      if (name === "quantity" || name === "nav") {
        const quantity = Number(updatedTransactions[index].quantity) || 0;
        const nav = Number(updatedTransactions[index].nav) || 0;
        updatedTransactions[index].amount = quantity * nav;
      }

      return updatedTransactions;
    });
  };

  const handleAddMoreTransactions = () => {
    setTransactions([...transactions, initialTransactionState]);
  };

  const handleResetAllTransactions = () => {
    setTransactions([initialTransactionState]);
  };

  const handleAddTransaction = async () => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/myportfolio/addMutuals`, {
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
  return (
    <div className="transaction-form">
      <h2 className="tranheaderform">Add Transaction</h2>
      <div className="tabsadd">
        <button className="tabadd" onClick={() => navigate("/stockadd")}>Stocks</button>
        <button className="tabadd" style={{ background: "#24b676", color: "white" }} onClick={() => navigate("/addTransactionmutual")}>Mutual Fund</button>
        <button className="tabadd" onClick={() => navigate("/addTransactiongold")}>Gold</button>
      </div>

      <div className="addcontainer">
        {transactions.map((transactionData, index) => (
          <form key={index} className="transaction-row-wrapper">
            <div className="transaction-row">
              <label>
              <p1 style={{ marginLeft: "49px" }}>Type</p1>
                <select name="type" value={transactionData.type} onChange={(e) => handleInputChange(index, e)} className="transaction-input"style={{ width: "80px", height: "30px", marginLeft: "50px"}}>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </label>

              <label style={{ position: "relative" }}>
                Scheme Name
                <input type="text" name="scheme_name" value={transactionData.scheme_name} onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
              </label>

              <label>
                NAV Date
                <input type="date" name="date" value={transactionData.date} onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
              </label>

              <label>
                NAV
                <input type="number" name="nav" value={transactionData.nav} onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
              </label>

              <label>
                Amount
                <input type="number" name="amount" value={transactionData.amount} readOnly className="transaction-input read-only" />
              </label>

              <label>
                Quantity
                <input type="number" name="quantity" value={transactionData.quantity} onChange={(e) => handleInputChange(index, e)} className="transaction-input" />
              </label>

              <label>
              <p1 style={{ marginLeft: "200px" }}>Dividend</p1>
                <input type="text" name="dividend" value="Invest" readOnly    className="transaction-inputdividened" />
              </label>

              <label>
              <p1 style={{ marginLeft: "-48px" }}>Notes</p1>
                <br/>
                <input type="text" name="notes" value={transactionData.notes} onChange={(e) => handleInputChange(index, e)} className="transaction-inputnote" />
              </label>
              <div className="sip-linkmutual">
                            <a href="#" onClick={() => handleToggleSIP(index)}>
                Add SIP for this Stock
              </a>
            </div>
            </div>
            {transactionData.showSIP && (
              <div className="addsipform-container">
                <AddSIPForm />
              </div>
            )}
         
          </form>
        ))}

        {/* Action Buttons */}
        <div className="form-buttonsmoreadd">
          <button onClick={handleAddMoreTransactions}> <CiCirclePlus /> Add More Transactions</button>
        </div>

        <div className="form-buttons">
          <button type="button" style={{ background: "#24b676", color: "white" }} onClick={handleAddTransaction} className="save-button">
            Add Transaction
          </button>
          <button className="resetgold" onClick={handleResetAllTransactions}>Reset</button>
        </div>
      </div>

      <Navbar />
      <FooterForAllPage />
      <Sidebar />
    </div>
  );
};

export default AddTransactionmutual;
