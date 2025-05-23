import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; // Import the icons
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

// Sample data
const fundDataflex = [
    {
      name: "Parag Parikh Flexi Cap Fund",
      url: "/mutual-funds/top-rated-mutual-funds",
      nav: "₹81.81",
      aum: "₹84,640.59",
      sip: "₹1,000",
      expenseRatio: "1.33%",
      oneYearReturn: "28.68%",
      threeYearReturn: "17.18%",
      fiveYearReturn: "24.63%",
    },
    {
      name: "JM Flexicap Fund",
      nav: "₹107.31",
      aum: "₹5,012.19",
      sip: "₹100",
      expenseRatio: "1.81%",
      oneYearReturn: "43.03%",
      threeYearReturn: "27.28%",
      fiveYearReturn: "24.52%",
    },
    {
      name: "Quant Flexi Cap Fund",
      nav: "₹99.62",
      aum: "₹7,331.42",
      sip: "₹1,000",
      expenseRatio: "1.76%",
      oneYearReturn: "31.55%",
      threeYearReturn: "19.97%",
      fiveYearReturn: "31.32%",
    },
    {
      name: "SBI Bluechip Fund",
      nav: "₹52.45",
      aum: "₹37,650.15",
      sip: "₹500",
      expenseRatio: "1.45%",
      oneYearReturn: "20.12%",
      threeYearReturn: "12.89%",
      fiveYearReturn: "16.34%",
    },
    {
      name: "HDFC Top 100 Fund",
      nav: "₹67.90",
      aum: "₹64,893.75",
      sip: "₹500",
      expenseRatio: "1.67%",
      oneYearReturn: "25.45%",
      threeYearReturn: "14.28%",
      fiveYearReturn: "18.75%",
    },
    {
      name: "Axis Focused 25 Fund",
      nav: "₹41.23",
      aum: "₹12,456.32",
      sip: "₹500",
      expenseRatio: "1.39%",
      oneYearReturn: "18.75%",
      threeYearReturn: "10.25%",
      fiveYearReturn: "14.87%",
    },
    {
      name: "ICICI Prudential Equity Fund",
      nav: "₹79.21",
      aum: "₹28,451.10",
      sip: "₹500",
      expenseRatio: "1.54%",
      oneYearReturn: "22.56%",
      threeYearReturn: "16.75%",
      fiveYearReturn: "19.32%",
    },
    {
      name: "Kotak Emerging Equity Fund",
      nav: "₹65.45",
      aum: "₹19,342.78",
      sip: "₹500",
      expenseRatio: "1.40%",
      oneYearReturn: "21.48%",
      threeYearReturn: "13.76%",
      fiveYearReturn: "18.19%",
    },
    {
      name: "Franklin India Flexi Cap Fund",
      nav: "₹34.56",
      aum: "₹8,221.45",
      sip: "₹500",
      expenseRatio: "1.25%",
      oneYearReturn: "19.12%",
      threeYearReturn: "11.45%",
      fiveYearReturn: "15.75%",
    },
    {
      name: "SBI Magnum Midcap Fund",
      nav: "₹145.29",
      aum: "₹9,763.22",
      sip: "₹500",
      expenseRatio: "0.77%",
      oneYearReturn: "40.56%",
      threeYearReturn: "24.13%",
      fiveYearReturn: "25.67%",
    },
    {
      name: "Axis Small Cap Fund",
      nav: "₹86.41",
      aum: "₹7,621.89",
      sip: "₹1,000",
      expenseRatio: "0.95%",
      oneYearReturn: "47.15%",
      threeYearReturn: "29.78%",
      fiveYearReturn: "32.45%",
    },
    {
      name: "HDFC Midcap Opportunities Fund",
      nav: "₹125.78",
      aum: "₹30,498.41",
      sip: "₹500",
      expenseRatio: "0.89%",
      oneYearReturn: "38.34%",
      threeYearReturn: "22.11%",
      fiveYearReturn: "24.76%",
    },
    {
      name: "L&T Large Cap Fund",
      nav: "₹39.67",
      aum: "₹5,873.42",
      sip: "₹500",
      expenseRatio: "0.93%",
      oneYearReturn: "21.87%",
      threeYearReturn: "16.78%",
      fiveYearReturn: "18.32%",
    },
    {
      name: "Franklin India Bluechip Fund",
      nav: "₹642.89",
      aum: "₹22,765.89",
      sip: "₹500",
      expenseRatio: "0.64%",
      oneYearReturn: "25.19%",
      threeYearReturn: "17.45%",
      fiveYearReturn: "19.34%",
    },
    {
      name: "ICICI Prudential Smallcap Fund",
      nav: "₹78.91",
      aum: "₹18,450.21",
      sip: "₹500",
      expenseRatio: "0.70%",
      oneYearReturn: "48.34%",
      threeYearReturn: "31.23%",
      fiveYearReturn: "34.21%",
    },
    {
      name: "DSP Flexicap Fund",
      nav: "₹54.23",
      aum: "₹12,893.76",
      sip: "₹500",
      expenseRatio: "0.82%",
      oneYearReturn: "26.41%",
      threeYearReturn: "19.56%",
      fiveYearReturn: "20.78%",
    },
    {
      name: "Tata Mid Cap Growth Fund",
      nav: "₹128.67",
      aum: "₹4,987.23",
      sip: "₹500",
      expenseRatio: "0.81%",
      oneYearReturn: "35.45%",
      threeYearReturn: "24.12%",
      fiveYearReturn: "26.78%",
    },
  ];
  

const Flexdirect = () => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const totalPages = Math.max(1, Math.ceil((fundDataflex?.length || 0) / recordsPerPage));
  

  const sortedData = () => {
    if (!sortConfig.key) return fundDataflex;

    const sorted = [...fundDataflex];
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
  const indexOfFirstItem = (currentPage - 1) * recordsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + recordsPerPage, fundDataflex.length);
  const currentData = sortedData().slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div>
      

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
            {currentData.map((fund, idx) => (
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
       <div className="pagination-topratedcontainer">
                <div className="pagination-topratedwrapper">
                  <div className="pagination-topratedinfo">
                    {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${fundDataflex.length} records`}
                  </div>
                  <div className="pagination-topratedcontainer-buttons">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i + 1} onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                  </div>
                </div>
              </div>
            
          </div>
        );
      };

export default Flexdirect;