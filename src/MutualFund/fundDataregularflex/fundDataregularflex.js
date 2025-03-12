import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; // Import the icons
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


// Sample data with additional fields (rating, riskometer, returns)
const fundDataregularflex = [
    {
      name: "Parag Parikh Flexi Cap Fund",
      nav: "₹90.00",  // New NAV value
      url: "/mutualfund",
      aum: "₹84,640.59",
      sip: "₹1,000",
      expenseRatio: "1.50%",  // New expense ratio
      oneYearReturn: "28.68%",
      threeYearReturn: "17.18%",
      fiveYearReturn: "24.63%",
    },
    {
      name: "JM Flexicap Fund",
      nav: "₹110.00",  // New NAV value
      aum: "₹5,012.19",
      sip: "₹100",
      expenseRatio: "1.85%",  // New expense ratio
      oneYearReturn: "43.03%",
      threeYearReturn: "27.28%",
      fiveYearReturn: "24.52%",
    },
    {
      name: "Quant Flexi Cap Fund",
      nav: "₹102.00",  // New NAV value
      aum: "₹7,331.42",
      sip: "₹1,000",
      expenseRatio: "1.80%",  // New expense ratio
      oneYearReturn: "31.55%",
      threeYearReturn: "19.97%",
      fiveYearReturn: "31.32%",
    },
    {
      name: "SBI Bluechip Fund",
      nav: "₹55.00",  // New NAV value
      aum: "₹37,650.15",
      sip: "₹500",
      expenseRatio: "1.50%",  // New expense ratio
      oneYearReturn: "20.12%",
      threeYearReturn: "12.89%",
      fiveYearReturn: "16.34%",
    },
    {
      name: "HDFC Top 100 Fund",
      nav: "₹70.00",  // New NAV value
      aum: "₹64,893.75",
      sip: "₹500",
      expenseRatio: "1.75%",  // New expense ratio
      oneYearReturn: "25.45%",
      threeYearReturn: "14.28%",
      fiveYearReturn: "18.75%",
    },
    {
      name: "Axis Focused 25 Fund",
      nav: "₹43.00",  // New NAV value
      aum: "₹12,456.32",
      sip: "₹500",
      expenseRatio: "1.40%",  // New expense ratio
      oneYearReturn: "18.75%",
      threeYearReturn: "10.25%",
      fiveYearReturn: "14.87%",
    },
    {
      name: "ICICI Prudential Equity Fund",
      nav: "₹81.00",  // New NAV value
      aum: "₹28,451.10",
      sip: "₹500",
      expenseRatio: "1.55%",  // New expense ratio
      oneYearReturn: "22.56%",
      threeYearReturn: "16.75%",
      fiveYearReturn: "19.32%",
    },
    {
      name: "Kotak Emerging Equity Fund",
      nav: "₹67.00",  // New NAV value
      aum: "₹19,342.78",
      sip: "₹500",
      expenseRatio: "1.45%",  // New expense ratio
      oneYearReturn: "21.48%",
      threeYearReturn: "13.76%",
      fiveYearReturn: "18.19%",
    },
    {
      name: "Franklin India Flexi Cap Fund",
      nav: "₹36.00",  // New NAV value
      aum: "₹8,221.45",
      sip: "₹500",
      expenseRatio: "1.30%",  // New expense ratio
      oneYearReturn: "19.12%",
      threeYearReturn: "11.45%",
      fiveYearReturn: "15.75%",
    },
    {
      name: "SBI Magnum Midcap Fund",
      nav: "₹150.00",  // New NAV value
      aum: "₹9,763.22",
      sip: "₹500",
      expenseRatio: "0.80%",  // New expense ratio
      oneYearReturn: "40.56%",
      threeYearReturn: "24.13%",
      fiveYearReturn: "25.67%",
    },
    {
      name: "Axis Small Cap Fund",
      nav: "₹90.00",  // New NAV value
      aum: "₹7,621.89",
      sip: "₹1,000",
      expenseRatio: "1.00%",  // New expense ratio
      oneYearReturn: "47.15%",
      threeYearReturn: "29.78%",
      fiveYearReturn: "32.45%",
    },
    {
      name: "HDFC Midcap Opportunities Fund",
      nav: "₹130.00",  // New NAV value
      aum: "₹30,498.41",
      sip: "₹500",
      expenseRatio: "0.90%",  // New expense ratio
      oneYearReturn: "38.34%",
      threeYearReturn: "22.11%",
      fiveYearReturn: "24.76%",
    },
    {
      name: "L&T Large Cap Fund",
      nav: "₹42.00",  // New NAV value
      aum: "₹5,873.42",
      sip: "₹500",
      expenseRatio: "1.00%",  // New expense ratio
      oneYearReturn: "21.87%",
      threeYearReturn: "16.78%",
      fiveYearReturn: "18.32%",
    },
    {
      name: "Franklin India Bluechip Fund",
      nav: "₹650.00",  // New NAV value
      aum: "₹22,765.89",
      sip: "₹500",
      expenseRatio: "0.65%",  // New expense ratio
      oneYearReturn: "25.19%",
      threeYearReturn: "17.45%",
      fiveYearReturn: "19.34%",
    },
    {
      name: "ICICI Prudential Smallcap Fund",
      nav: "₹80.00",  // New NAV value
      aum: "₹18,450.21",
      sip: "₹500",
      expenseRatio: "0.75%",  // New expense ratio
      oneYearReturn: "48.34%",
      threeYearReturn: "31.23%",
      fiveYearReturn: "34.21%",
    },
    {
      name: "DSP Flexicap Fund",
      nav: "₹56.00",  // New NAV value
      aum: "₹12,893.76",
      sip: "₹500",
      expenseRatio: "0.85%",  // New expense ratio
      oneYearReturn: "26.41%",
      threeYearReturn: "19.56%",
      fiveYearReturn: "20.78%",
    },
    {
      name: "Tata Mid Cap Growth Fund",
      nav: "₹130.00",  // New NAV value
      aum: "₹4,987.23",
      sip: "₹500",
      expenseRatio: "0.85%",  // New expense ratio
      oneYearReturn: "35.45%",
      threeYearReturn: "24.12%",
      fiveYearReturn: "26.78%",
    },
  ];
  

const Flexregular = () => {
 
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  
    const sortedData = () => {
      if (!sortConfig.key) return fundDataregularflex;
  
      const sorted = [...fundDataregularflex];
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
            <h2 className="funds-table-title">Best Flex Cap Fund</h2>
            <div className="topfundbutton-container">
              <button
                className="fund-button regular"
                style={{ backgroundColor: "#24b676", color: "white" }}
                onClick={() => navigate("/flexregular")}
              >
                Regular
              </button>
              <button
                className="fund-button direct"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={() => navigate("/flexdirect")}
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
  
  
export default Flexregular;