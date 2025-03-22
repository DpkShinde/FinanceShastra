import React, { useState, useContext } from "react";
import "./BankSectorThemePagelock.css";
import { CiSearch } from 'react-icons/ci';
import { PiCaretUpDownFill } from "react-icons/pi";
import hdfcImage from '../../assest/hdfcbank.png';
import iciciImage from '../../assest/icicibank.png';
import kotakImage from '../../assest/kotakmahindralogo.png';
import axisImage from '../../assest/axisbank.png';
import bobImage from '../../assest/bankofboroda.png';
import sbiImage from '../../assest/sbin.png';
import unionImage from '../../assest/unionbank.png';
import canaraImage from '../../assest/canarabank.png';
import boiImage from '../../assest/bankofindia.png';
import idfcImage from '../../assest/idfcbank.png';
import auImage from '../../assest/aubank.png';
import cbiImage from '../../assest/centralbank.png';
import { useNavigate } from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


import Navbar from "../../Navbar/Navbar";
import { SubscriptionContext } from "../../Portfoilo/context/SubscriptionContext";

const BankSectorThemePagelock = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showSubscribe, setShowSubscribe] = useState(false); 
    const {issubscribed}= useContext(SubscriptionContext)
    const bankData = [
        { symbol: "HDFC Bank", image: hdfcImage, price: "₹1,694.80", change: "0.16%", marketCap: "₹12,94,171.5", weekHigh: "1,880.00", weekLow: "1,363.5", pe: "18.6", pbv: "2.6", evEbitda: "16.4", roe: "17.2", salesGrowth: "16.7", profitGrowth: "18.3" },
        { symbol: "ICICI Bank", image: iciciImage, price: "₹1,242.25", change: "-0.94%", marketCap: "₹8,86,022.8", weekHigh: "1,361.4", weekLow: "985.2", pe: "19.6", pbv: "3.3", evEbitda: "14.3", roe: "19.0", salesGrowth: "22.4", profitGrowth: "62.0" },
        { symbol: "Kotak Mahindra Bank", image: kotakImage, price: "₹1,900.65", change: "-0.02%", marketCap: "₹3,77,971.7", weekHigh: "1,953.00", weekLow: "1,544.2", pe: "22.2", pbv: "3.3", evEbitda: "17.6", roe: "15.3", salesGrowth: "18.3", profitGrowth: "22.1" },
        { symbol: "Axis Bank", image: axisImage, price: "₹984.40", change: "-0.06%", marketCap: "₹3,04,939.5", weekHigh: "1,339.6", weekLow: "934.00", pe: "11.6", pbv: "1.8", evEbitda: "9.9", roe: "18.1", salesGrowth: "18.1", profitGrowth: "34.7" },
        { symbol: "Bank of Baroda", image: bobImage, price: "₹212.65", change: "-4.41%", marketCap: "₹1,15,037", weekHigh: "298.5", weekLow: "216.1", pe: "5.9", pbv: "0.9", evEbitda: "4.8", roe: "16.9", salesGrowth: "19.3", profitGrowth: "83.8" },
        { symbol: "STATE BANK OF INDIA", image: sbiImage, price: "₹769.45", change: "0.95%", marketCap: "₹6,80,234.6", weekHigh: "912.1", weekLow: "622.0", pe: "10.4", pbv: "1.7", evEbitda: "10.0", roe: "18.8", salesGrowth: "12.6", profitGrowth: "134.3" },
        { symbol: "Union Bank of India", image: unionImage, price: "₹113.60", change: "2.1%", marketCap: "₹84,771.2", weekHigh: "172.5", weekLow: "100.8", pe: "5.2", pbv: "0.8", evEbitda: "2.0", roe: "16.7", salesGrowth: "29.1", profitGrowth: "0.0" },
        { symbol: "Canara Bank", image: canaraImage, price: "₹92.25", change: "1.49%", marketCap: "₹82,452.2", weekHigh: "129.4", weekLow: "87.8", pe: "5.0", pbv: "0.9", evEbitda: "2.2", roe: "19.3", salesGrowth: "19.7", profitGrowth: "60.1" },
        { symbol: "Bank of India", image: boiImage, price: "₹111.80", change: "0.49%", marketCap: "₹50,648.4", weekHigh: "158.0", weekLow: "90.0", pe: "5.9", pbv: "0.7", evEbitda: "6.0", roe: "10.9", salesGrowth: "11.1", profitGrowth: "0.0" },
        { symbol: "IDFC First Bank", image: idfcImage, price: "₹62.07", change: "1.47%", marketCap: "₹44,780.9", weekHigh: "86.1", weekLow: "56.5", pe: "23.2", pbv: "1.2", evEbitda: "11.7", roe: "10.1", salesGrowth: "36.6", profitGrowth: "0.0" },
        { symbol: "AU Small Finance Bank", image: auImage, price: "₹597.60", change: "0.15%", marketCap: "₹44,408.4", weekHigh: "755.0", weekLow: "534.0", pe: "22.5", pbv: "2.7", evEbitda: "11.3", roe: "15.5", salesGrowth: "36.3", profitGrowth: "33.2" },
        { symbol: "Central Bank of India", image: cbiImage, price: "₹51.54", change: "1.02%", marketCap: "₹44,290.2", weekHigh: "76.9", weekLow: "46.7", pe: "12.4", pbv: "1.5", evEbitda: "5.0", roe: "9.5", salesGrowth: "13.8", profitGrowth: "0.0" },
    ];
    const [filteredBanks, setFilteredBanks] = useState(bankData);
    
    const [isLocked, setIsLocked] = useState(true);
    const [sortDirection, setSortDirection] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    const handleSorting = (key) => {
        const sortedBanks = [...filteredBanks].sort((a, b) => {
          let valA = a[key];
          let valB = b[key];
    
          // Handle string cleaning and conversion to numbers if needed
          if (typeof valA === "string") {
            if (key === "price" || key === "marketCap") {
              valA = parseFloat(valA.replace(/[\u20B9, T]/g, "")); // Handle currency
            } else if (key !== "symbol") {
              valA = parseFloat(valA.replace(/[\u20B9,%]/g, ""));
            }
          }
    
          if (typeof valB === "string") {
            if (key === "price" || key === "marketCap") {
              valB = parseFloat(valB.replace(/[\u20B9, T]/g, ""));
            } else if (key !== "symbol") {
              valB = parseFloat(valB.replace(/[\u20B9,%]/g, ""));
            }
          }
    
          // Handle alphabetical comparison for non-numeric values
          if (key === "symbol") {
            return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
    
          // Handle numeric comparison for other columns
          return sortDirection ? valA - valB : valB - valA;
        });
    
        setFilteredBanks(sortedBanks);
        setSortDirection(!sortDirection); // Toggle sort direction
      };
 // Handle search input changes and filter suggestions
 const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredBanks(bankData);
    } else {
      const filteredList = bankData.filter((bank) =>
        bank.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanks(filteredList);
    }
  };
  const handleLockClick = () => {
    //setIsLocked(false); // Unlock the table
    setShowSubscribe(true); // Show the subscribe button
  };

  const handleSubscribeClick = () => {
    navigate("/pricehalf"); // Navigate to the subscription page
  };

  const handleMouseEnter = () => {
    if (isLocked) {
      setShowSubscribe(true); // Show the subscribe button on hover
    }
  };

  const handleMouseLeave = () => {
    if (isLocked) {
      setShowSubscribe(false); // Hide the subscribe button on mouse leave
    }
  };

  
    return (
        <div className="banksectorthemepage">
            <h1 className="banksectortitle">Banks Sector Stocks</h1>
            <div className="banksectorfilter">
                <button className="banksectorbtnactive" onClick={() => navigate("/bankSectorThemePagelock")} >All Stocks (12)</button>
                <button className="banksectorbtn"onClick={() => navigate("/stockThemesindustrieslockPages")}>Industries (02)</button>
            </div>
            <div className="search-wrapper" style={{ position: "relative" }}>
        <input
          type="text"
          className="banksectorsearch"
          placeholder="Search by stock name"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          style={{ paddingLeft: "30px" }}
        />
       <CiSearch className="banksector-search-icon"/>

      </div>
            <table className="banksectortable">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>
            Price
            <button className="screenerbtnlist" onClick={() => handleSorting("price")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>Change %
          <button className="screenerbtnlist" onClick={() => handleSorting("change")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>
            Market Cap
            <button className="screenerbtnlist" onClick={() => handleSorting("marketCap")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>52 Week High
          <button className="screenerbtnlist" onClick={() => handleSorting("weekHigh")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>52 Week Low
          <button className="screenerbtnlist" onClick={() => handleSorting("weekLow")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>P/E
          <button className="screenerbtnlist" onClick={() => handleSorting("pe")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>P / BV
          <button className="screenerbtnlist" onClick={() => handleSorting("pbv")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>EV / EBITDA
          <button className="screenerbtnlist" onClick={() => handleSorting("evEbitda")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>ROE
          <button className="screenerbtnlist" onClick={() => handleSorting("roe")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>5Y Sales Gr.(%)
          <button className="screenerbtnlist" onClick={() => handleSorting("salesGrowth")}>
              <PiCaretUpDownFill />
            </button>
          </th>
          <th>5Y Profit Gr.(%)
          <button className="screenerbtnlist" onClick={() => handleSorting("profitGrowth")}>
              <PiCaretUpDownFill />
            </button>
          </th>
        </tr>
      </thead>
      <tbody className={issubscribed ? "" : "blurred"}>
        {filteredBanks.map((bank, index) => (
          <tr key={index}>
            <td>
              <img src={bank.image} alt={bank.symbol} className="bank-logo" /> {bank.symbol}
            </td>
            <td>{bank.price}</td>
            <td
        style={{
          color: parseFloat(bank.change) > 0 ? "#24b676" : "red",
        }}
      >
        {bank.change}
      </td>
            <td>{bank.marketCap}</td>
            <td>{bank.weekHigh}</td>
            <td>{bank.weekLow}</td>
            <td>{bank.pe}</td>
            <td>{bank.pbv}</td>
            <td>{bank.evEbitda}</td>
            <td>{bank.roe}</td>
            <td>{bank.salesGrowth}</td>
            <td>{bank.profitGrowth}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {!issubscribed && (
          <div className="subscribethemestocklocked-overlay">
            <div
              className="subscribethemestocklocked-lock-icon"
              onClick={handleLockClick} // Click on the lock icon to unlock and show subscribe
              onMouseEnter={handleMouseEnter} // Show button on hover
             // Hide button on hover out
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/015/117/333/original/padlock-icon-with-glowing-neon-effect-security-lock-sign-secure-protection-symbol-png.png" 
                onClick={() => navigate("/banksectorstocktheme")}
                alt="Lock Icon"
              />
            </div>
            {showSubscribe && (
              <button
                className="subscribethemestock-button"
                onClick={handleSubscribeClick} // Navigate to the subscribe page
              >
                Subscribe for more details
              </button>
            )}
          </div>
        )}
    <Navbar/>
    <FooterForAllPage/>
        </div>
    );
};

export default BankSectorThemePagelock;
