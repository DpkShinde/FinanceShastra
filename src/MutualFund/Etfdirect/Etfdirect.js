import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; // Import the icons
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


// Sample data with additional fields (rating, riskometer, returns)
const fundDatadirectetf = [
    {
        name: "Quantum Nifty 50 ETF",
        nav: "105.00",  // Example NAV
        aum: "1,000.00 Cr.",
        sip: "500",
        expenseRatio: "0.15%",  // Example Expense Ratio
        oneYearReturn: "12.35%",
        threeYearReturn: "8.76%",
        fiveYearReturn: "10.12%",
    },
    {
        name: "Bank of India Small Cap Fund",
        nav: "55.00",  // Changed NAV
        aum: "1,537.17 Cr.",
        sip: "1,000",
        expenseRatio: "2.00%",  // Changed Expense Ratio
        oneYearReturn: "44.61%",
        threeYearReturn: "25.08%",
        fiveYearReturn: "38.65%",
    },
    {
        name: "Canara Rob Small Cap Fund",
        nav: "45.00",  // Changed NAV
        aum: "12,451.67 Cr.",
        sip: "1,000",
        expenseRatio: "1.75%",  // Changed Expense Ratio
        oneYearReturn: "31.03%",
        threeYearReturn: "25.45%",
        fiveYearReturn: "33.69%",
    },
    {
        name: "ICICI Pru Commodities Fund",
        nav: "43.50",  // Changed NAV
        aum: "2,399.14 Cr.",
        sip: "100",
        expenseRatio: "2.20%",  // Changed Expense Ratio
        oneYearReturn: "23.02%",
        threeYearReturn: "19.83%",
        fiveYearReturn: "30.19%",
    },
    {
        name: "Parag Parikh Flexi Cap Fund",
        nav: "92.00",  // Changed NAV
        aum: "84,640.59 Cr.",
        sip: "1,000",
        expenseRatio: "1.55%",  // Changed Expense Ratio
        oneYearReturn: "28.68%",
        threeYearReturn: "17.18%",
        fiveYearReturn: "24.63%",
    },
    {
        name: "JM Flexicap Fund",
        nav: "113.00",  // Changed NAV
        aum: "5,012.19 Cr.",
        sip: "100",
        expenseRatio: "1.85%",  // Changed Expense Ratio
        oneYearReturn: "43.03%",
        threeYearReturn: "27.28%",
        fiveYearReturn: "24.52%",
    },
    {
        name: "Quant Flexi Cap Fund",
        nav: "105.00",  // Changed NAV
        aum: "7,331.42 Cr.",
        sip: "1,000",
        expenseRatio: "1.80%",  // Changed Expense Ratio
        oneYearReturn: "31.55%",
        threeYearReturn: "19.97%",
        fiveYearReturn: "31.32%",
    },
    {
        name: "SBI Bluechip Fund",
        nav: "57.00",  // Changed NAV
        aum: "37,650.15 Cr.",
        sip: "500",
        expenseRatio: "1.40%",  // Changed Expense Ratio
        oneYearReturn: "20.12%",
        threeYearReturn: "12.89%",
        fiveYearReturn: "16.34%",
    },
    {
        name: "HDFC Top 100 Fund",
        nav: "72.00",  // Changed NAV
        aum: "64,893.75 Cr.",
        sip: "500",
        expenseRatio: "1.75%",  // Changed Expense Ratio
        oneYearReturn: "25.45%",
        threeYearReturn: "14.28%",
        fiveYearReturn: "18.75%",
    },
    {
        name: "Axis Focused 25 Fund",
        nav: "46.00",  // Changed NAV
        aum: "12,456.32 Cr.",
        sip: "500",
        expenseRatio: "1.30%",  // Changed Expense Ratio
        oneYearReturn: "18.75%",
        threeYearReturn: "10.25%",
        fiveYearReturn: "14.87%",
    },
    {
        name: "ICICI Prudential Equity Fund",
        nav: "83.00",  // Changed NAV
        aum: "28,451.10 Cr.",
        sip: "500",
        expenseRatio: "1.45%",  // Changed Expense Ratio
        oneYearReturn: "22.56%",
        threeYearReturn: "16.75%",
        fiveYearReturn: "19.32%",
    },
    {
        name: "Franklin India Bluechip Fund",
        nav: "112.00",  // Changed NAV
        aum: "23,905.10 Cr.",
        sip: "500",
        expenseRatio: "1.50%",  // Changed Expense Ratio
        oneYearReturn: "25.82%",
        threeYearReturn: "18.34%",
        fiveYearReturn: "23.19%",
    },
    {
        name: "Kotak Standard Multicap Fund",
        nav: "73.00",  // Changed NAV
        aum: "19,120.33 Cr.",
        sip: "1,000",
        expenseRatio: "1.70%",  // Changed Expense Ratio
        oneYearReturn: "29.34%",
        threeYearReturn: "17.46%",
        fiveYearReturn: "22.78%",
    },
    {
        name: "Reliance Growth Fund",
        nav: "59.00",  // Changed NAV
        aum: "8,222.77 Cr.",
        sip: "500",
        expenseRatio: "1.60%",  // Changed Expense Ratio
        oneYearReturn: "24.89%",
        threeYearReturn: "15.45%",
        fiveYearReturn: "21.76%",
    },
    {
        name: "UTI Flexi Cap Fund",
        nav: "121.00",  // Changed NAV
        aum: "5,345.80 Cr.",
        sip: "1,000",
        expenseRatio: "1.95%",  // Changed Expense Ratio
        oneYearReturn: "26.12%",
        threeYearReturn: "22.78%",
        fiveYearReturn: "28.32%",
    },
    {
        name: "Aditya Birla Sun Life Equity Fund",
        nav: "80.00",  // Changed NAV
        aum: "15,001.44 Cr.",
        sip: "500",
        expenseRatio: "1.90%",  // Changed Expense Ratio
        oneYearReturn: "20.91%",
        threeYearReturn: "17.22%",
        fiveYearReturn: "21.10%",
    },
    {
        name: "DSP Equity Fund",
        nav: "97.00",  // Changed NAV
        aum: "6,250.45 Cr.",
        sip: "1,000",
        expenseRatio: "1.80%",  // Changed Expense Ratio
        oneYearReturn: "27.45%",
        threeYearReturn: "21.78%",
        fiveYearReturn: "26.34%",
    },
    {
        name: "L&T Emerging Businesses Fund",
        nav: "86.00",  // Changed NAV
        aum: "9,867.11 Cr.",
        sip: "500",
        expenseRatio: "1.65%",  // Changed Expense Ratio
        oneYearReturn: "30.11%",
        threeYearReturn: "18.56%",
        fiveYearReturn: "23.98%",
    },
    {
        name: "Nippon India Growth Fund",
        nav: "95.00",  // Changed NAV
        aum: "11,456.83 Cr.",
        sip: "500",
        expenseRatio: "1.60%",  // Changed Expense Ratio
        oneYearReturn: "22.94%",
        threeYearReturn: "19.01%",
        fiveYearReturn: "24.14%",
    },
    {
        name: "Sundaram Select Focus Fund",
        nav: "103.00",  // Changed NAV
        aum: "13,748.72 Cr.",
        sip: "1,000",
        expenseRatio: "1.75%",  // Changed Expense Ratio
        oneYearReturn: "26.98%",
        threeYearReturn: "20.16%",
        fiveYearReturn: "25.88%",
    },
    {
        name: "Mirae Asset Emerging Bluechip Fund",
        nav: "65.00",  // Changed NAV
        aum: "20,501.20 Cr.",
        sip: "500",
        expenseRatio: "1.60%",  // Changed Expense Ratio
        oneYearReturn: "32.67%",
        threeYearReturn: "24.76%",
        fiveYearReturn: "29.12%",
    },
    {
        name: "Kotak Emerging Equity Fund",
        nav: "68.00",  // Changed NAV
        aum: "19,342.78 Cr.",
        sip: "500",
        expenseRatio: "1.50%",  // Changed Expense Ratio
        oneYearReturn: "21.48%",
        threeYearReturn: "13.76%",
        fiveYearReturn: "18.19%",
    },
  ];
  

const Etfdirect = () => {
 
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  
    const sortedData = () => {
      if (!sortConfig.key) return fundDatadirectetf;
  
      const sorted = [...fundDatadirectetf];
      sorted.sort((a, b) => {
        const aValue = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
        const bValue = parseFloat(b[sortConfig.key]) || b[sortConfig.key];
  
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      });
      return sorted;
    };
  
    const handleSort = (key) => {
      setSortConfig((prev) => ({
        key,
        direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
      }));
    };
  
    const renderSortIcons = (key) => {
      const isActive = sortConfig.key === key;
      const isAscending = isActive && sortConfig.direction === "asc";
      const isDescending = isActive && sortConfig.direction === "desc";
      return (
        <span className="sort-icons">
          <FaCaretUp className={isAscending ? "active" : "inactive"} />
          <FaCaretDown className={isDescending ? "active" : "inactive"} />
        </span>
      );
    };
  
    const sortedFunds = sortedData();
  
    return (
      <div>
        <Navbar />
        <div className="funds-table-container">
          <div className="funds-header">
            <h2 className="funds-table-title">Exchange Traded Funds</h2>
            <div className="topfundbutton-container">
              <button
                className="fund-button regular"
                style={{backgroundColor: "white", color: "black" }}
                onClick={() => navigate("/etfregular")}
              >
                Regular
              </button>
              <button
                className="fund-button direct"
                style={{ backgroundColor: "#24b676", color: "white"  }}
                onClick={() => navigate("/etfdirect")}
              >
                Direct
              </button>
            </div>
          </div>
  
          <p className="funds-table-description">
            Looking for the best mutual funds to build your wealth? At Value
            Research, we’ve simplified the process for you. Our detailed guide to<br/>
            top-performing mutual funds across different categories helps you
            identify options that suit your financial objectives.
          </p>
  
          <table className="funds-table">
            <thead>
              <tr className="funds-table-header">
                <th onClick={() => handleSort("name")}>Funds</th>
                <th onClick={() => handleSort("nav")}>
                  NAV (₹) {renderSortIcons("nav")}
                </th>
                <th onClick={() => handleSort("aum")}>
                  AUM (Cr) {renderSortIcons("aum")}
                </th>
                <th onClick={() => handleSort("sip")}>
                  SIP Amount {renderSortIcons("sip")}
                </th>
                <th onClick={() => handleSort("expenseRatio")}>
                  Exp. Ratio (%) {renderSortIcons("expenseRatio")}
                </th>
                <th onClick={() => handleSort("oneYearReturn")}>
                  1Y (%) {renderSortIcons("oneYearReturn")}
                </th>
                <th onClick={() => handleSort("threeYearReturn")}>
                  3Y (%) {renderSortIcons("threeYearReturn")}
                </th>
                <th onClick={() => handleSort("fiveYearReturn")}>
                  5Y (%) {renderSortIcons("fiveYearReturn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedFunds.map((fund, idx) => (
                <tr key={idx} className="funds-table-row">
                  <td>
                    <a
                      href={fund.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fund-name-link"
                    >
                      {fund.name}
                    </a>
                  </td>
                  <td>{fund.nav}</td>
                  <td>{fund.aum}</td>
                  <td>{fund.sip}</td>
                  <td>{fund.expenseRatio}</td>
                  <td>{fund.oneYearReturn}</td>
                  <td>{fund.threeYearReturn}</td>
                  <td>{fund.fiveYearReturn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="foooterpagesaupdate">
    <FooterForAllPage />
  </div>
      </div>
    );
  };
  
  
export default Etfdirect;