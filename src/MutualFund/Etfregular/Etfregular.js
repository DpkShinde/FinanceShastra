import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; // Import the icons
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


// Sample data with additional fields (rating, riskometer, returns)
const fundDataregularetf = [
    {
        name: "Bank of India Small Cap Fund",
        nav: "52.00",
        aum: "1,537.17 Cr.",
        sip: "1,000",
        expenseRatio: "1.95%",
        oneYearReturn: "44.61%",
        threeYearReturn: "25.08%",
        fiveYearReturn: "38.65%",
      },
      {
        name: "Canara Rob Small Cap Fund",
        nav: "43.00",
        aum: "12,451.67 Cr.",
        sip: "1,000",
        expenseRatio: "1.60%",
        oneYearReturn: "31.03%",
        threeYearReturn: "25.45%",
        fiveYearReturn: "33.69%",
      },
      {
        name: "ICICI Pru Commodities Fund",
        nav: "42.00",
        aum: "2,399.14 Cr.",
        sip: "100",
        expenseRatio: "2.00%",
        oneYearReturn: "23.02%",
        threeYearReturn: "19.83%",
        fiveYearReturn: "30.19%",
      },
      {
        name: "Parag Parikh Flexi Cap Fund",
        nav: "91.00",
        aum: "84,640.59 Cr.",
        sip: "1,000",
        expenseRatio: "1.45%",
        oneYearReturn: "28.68%",
        threeYearReturn: "17.18%",
        fiveYearReturn: "24.63%",
      },
      {
        name: "JM Flexicap Fund",
        nav: "111.00",
        aum: "5,012.19 Cr.",
        sip: "100",
        expenseRatio: "1.80%",
        oneYearReturn: "43.03%",
        threeYearReturn: "27.28%",
        fiveYearReturn: "24.52%",
      },
      {
        name: "Quant Flexi Cap Fund",
        nav: "103.00",
        aum: "7,331.42 Cr.",
        sip: "1,000",
        expenseRatio: "1.75%",
        oneYearReturn: "31.55%",
        threeYearReturn: "19.97%",
        fiveYearReturn: "31.32%",
      },
      {
        name: "SBI Bluechip Fund",
        nav: "56.00",
        aum: "37,650.15 Cr.",
        sip: "500",
        expenseRatio: "1.45%",
        oneYearReturn: "20.12%",
        threeYearReturn: "12.89%",
        fiveYearReturn: "16.34%",
      },
      {
        name: "HDFC Top 100 Fund",
        nav: "71.00",
        aum: "64,893.75 Cr.",
        sip: "500",
        expenseRatio: "1.70%",
        oneYearReturn: "25.45%",
        threeYearReturn: "14.28%",
        fiveYearReturn: "18.75%",
      },
      {
        name: "Axis Focused 25 Fund",
        nav: "44.00",
        aum: "12,456.32 Cr.",
        sip: "500",
        expenseRatio: "1.35%",
        oneYearReturn: "18.75%",
        threeYearReturn: "10.25%",
        fiveYearReturn: "14.87%",
      },
      {
        name: "ICICI Prudential Equity Fund",
        nav: "82.00",
        aum: "28,451.10 Cr.",
        sip: "500",
        expenseRatio: "1.50%",
        oneYearReturn: "22.56%",
        threeYearReturn: "16.75%",
        fiveYearReturn: "19.32%",
      },
      {
        name: "Franklin India Bluechip Fund",
        nav: "110.00",
        aum: "23,905.10 Cr.",
        sip: "500",
        expenseRatio: "1.45%",
        oneYearReturn: "25.82%",
        threeYearReturn: "18.34%",
        fiveYearReturn: "23.19%",
      },
      {
        name: "Kotak Standard Multicap Fund",
        nav: "72.00",
        aum: "19,120.33 Cr.",
        sip: "1,000",
        expenseRatio: "1.68%",
        oneYearReturn: "29.34%",
        threeYearReturn: "17.46%",
        fiveYearReturn: "22.78%",
      },
      {
        name: "Reliance Growth Fund",
        nav: "58.00",
        aum: "8,222.77 Cr.",
        sip: "500",
        expenseRatio: "1.50%",
        oneYearReturn: "24.89%",
        threeYearReturn: "15.45%",
        fiveYearReturn: "21.76%",
      },
      {
        name: "UTI Flexi Cap Fund",
        nav: "120.00",
        aum: "5,345.80 Cr.",
        sip: "1,000",
        expenseRatio: "1.90%",
        oneYearReturn: "26.12%",
        threeYearReturn: "22.78%",
        fiveYearReturn: "28.32%",
      },
      {
        name: "Aditya Birla Sun Life Equity Fund",
        nav: "79.00",
        aum: "15,001.44 Cr.",
        sip: "500",
        expenseRatio: "1.85%",
        oneYearReturn: "20.91%",
        threeYearReturn: "17.22%",
        fiveYearReturn: "21.10%",
      },
      {
        name: "DSP Equity Fund",
        nav: "96.00",
        aum: "6,250.45 Cr.",
        sip: "1,000",
        expenseRatio: "1.70%",
        oneYearReturn: "27.45%",
        threeYearReturn: "21.78%",
        fiveYearReturn: "26.34%",
      },
      {
        name: "L&T Emerging Businesses Fund",
        nav: "85.00",
        aum: "9,867.11 Cr.",
        sip: "500",
        expenseRatio: "1.60%",
        oneYearReturn: "30.11%",
        threeYearReturn: "18.56%",
        fiveYearReturn: "23.98%",
      },
      {
        name: "Nippon India Growth Fund",
        nav: "94.00",
        aum: "11,456.83 Cr.",
        sip: "500",
        expenseRatio: "1.55%",
        oneYearReturn: "22.94%",
        threeYearReturn: "19.01%",
        fiveYearReturn: "24.14%",
      },
      {
        name: "Sundaram Select Focus Fund",
        nav: "102.00",
        aum: "13,748.72 Cr.",
        sip: "1,000",
        expenseRatio: "1.75%",
        oneYearReturn: "26.98%",
        threeYearReturn: "20.16%",
        fiveYearReturn: "25.88%",
      },
      {
        name: "Mirae Asset Emerging Bluechip Fund",
        nav: "64.00",
        aum: "20,501.20 Cr.",
        sip: "500",
        expenseRatio: "1.70%",
        oneYearReturn: "32.67%",
        threeYearReturn: "24.76%",
        fiveYearReturn: "29.12%",
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
  

const Etfregular = () => {
 
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  
    const sortedData = () => {
      if (!sortConfig.key) return fundDataregularetf;
  
      const sorted = [...fundDataregularetf];
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
                style={{ backgroundColor: "#24b676", color: "white" }}
                onClick={() => navigate("/etfregular")}
              >
                Regular
              </button>
              <button
                className="fund-button direct"
                style={{ backgroundColor: "white", color: "black" }}
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
  
  
export default Etfregular;