import React, { useState } from "react";
import { Nifty50tabledata } from "../Niftystock50tabledata";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { IoLockClosedOutline } from "react-icons/io5";
import './nifty50stock.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";
import Nifty50topheader from "../Nifty50topheader/Nifty50topheader";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const Nifty50screenerStockList = () => {
  const [stocks, setStocks] = useState(Nifty50tabledata);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All"); // Track the active tab
    // Pagination state
  
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10; // Show 7 rows per page

// Calculate the current page's data
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentStocks = stocks.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(stocks.length / itemsPerPage);

// Change page
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Filter and sort stocks based on the active tab
    if (tab === "All") {
      setStocks(Nifty50tabledata); // Show all stocks
    } else if (tab === "Gainers") {
      setStocks(Nifty50tabledata.filter(stock => parseFloat(stock.change) > 0)); // Filter gainers
    } else if (tab === "Losers") {
      setStocks(Nifty50tabledata.filter(stock => parseFloat(stock.change) < 0)); // Filter losers
    } else {
      let sortedStocks;
      if (tab === "LTP") {
        // Sort by LTP in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const ltpA = parseFloat(a.ltp.replace(/[₹,]/g, "")); // Clean and parse LTP value
          const ltpB = parseFloat(b.ltp.replace(/[₹,]/g, "")); // Clean and parse LTP value
          return ltpB - ltpA; // Descending order
        });
      } else if (tab === "Change %") {
        // Sort by Change % in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const changeA = parseFloat(a.change.replace(/[%]/g, "")); // Remove % and parse
          const changeB = parseFloat(b.change.replace(/[%]/g, "")); // Remove % and parse
          return changeB - changeA; // Descending order
        });
      } else if (tab === "Market Cap") {
        // Sort by Market Cap in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const marketCapA = parseFloat(a.marketCap.replace(/[₹, T]/g, "")); // Clean and parse Market Cap
          const marketCapB = parseFloat(b.marketCap.replace(/[₹, T]/g, "")); // Clean and parse Market Cap
          return marketCapB - marketCapA; // Descending order
        });
      } else if (tab === "52W High") {
        // Sort by 52W High in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const high52A = parseFloat(a.high52.replace(/[₹,]/g, "")); // Clean and parse 52W High
          const high52B = parseFloat(b.high52.replace(/[₹,]/g, "")); // Clean and parse 52W High
          return high52B - high52A; // Descending order
        });
      } else if (tab === "52W Low") {
        // Sort by 52W Low in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const low52A = parseFloat(a.low52.replace(/[₹,]/g, "")); // Clean and parse 52W Low
          const low52B = parseFloat(b.low52.replace(/[₹,]/g, "")); // Clean and parse 52W Low
          return low52B - low52A; // Descending order
        });
      } else if (tab === "P/E") {
        // Sort by P/E in descending order
        sortedStocks = [...Nifty50tabledata].sort((a, b) => {
          const peA = parseFloat(a.pe); // Parse P/E directly
          const peB = parseFloat(b.pe); // Parse P/E directly
          return peB - peA; // Descending order
        });
      }
  
      // Update stocks with the sorted data
      setStocks(sortedStocks);
    }
  };
  const handleNavigate = () => {
    navigate('/pricehalf'); // Navigate to the desired route
  };
  // Handle sorting logic for columns
  const handleSort = (key) => {
    const sortedStocks = [...stocks].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Clean strings that are numeric and convert to number for comparison
      if (typeof valA === "string") {
        if (key === "price" || key === "marketCap") {
          valA = parseFloat(valA.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valA = parseFloat(valA.replace(/[₹,%]/g, ""));
        }
      }

      if (typeof valB === "string") {
        if (key === "price" || key === "marketCap") {
          valB = parseFloat(valB.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valB = parseFloat(valB.replace(/[₹,%]/g, ""));
        }
      }

      // For sector column, compare alphabetically
      if (key === "sector") {
        return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      // For other columns, compare numerically
      return sortDirection ? valA - valB : valB - valA;
    });

    setStocks(sortedStocks);
    setSortDirection(!sortDirection); // Toggle sort direction
  };
  // Change page
  
  return (
    <div>
      <Nifty50topheader />
      <div className="screener-container">
        <h2 className="screener-headerniftytab50">Nifty 50 Companies Listing</h2>

        {/* Tabs Section */}
        <div className="tabsnifty50-container" >
          {["All", "Gainers", "Losers", "LTP", "Change %", "Market Cap", "52W High", "52W Low", "P/E"].map((tab) => (
          <button
          key={tab}
          className={`tabnifty50-button ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
        
          ))}
        </div>

        {/* Table Section */}
        <div className="screener-table-wrapper"style={{ overflowY: 'auto',
     // Prevent x-axis overflow
    height: '370px'}}>
          <table className="screener-table" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f9f9f9",
                zIndex: 10,
                boxShadow: "0 4px 6px #24b676",
              }}
            >
              <tr>
                <th>Symbol</th>
                <th>
                  LTP
                  <button className="screenerbtnlist" onClick={() => handleSort("ltp")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  Change %
                  <button className="screenerbtnlist" onClick={() => handleSort("change")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  Volume
                  <button className="screenerbtnlist" onClick={() => handleSort("volume")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  Market Cap (Cr.)
                  <button className="screenerbtnlist" onClick={() => handleSort("marketCap")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  P / E
                  <button className="screenerbtnlist" onClick={() => handleSort("pe")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  52W High
                  <button className="screenerbtnlist" onClick={() => handleSort("high52")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  52W Low
                  <button className="screenerbtnlist" onClick={() => handleSort("low52")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  PB Ratio
                  <button className="screenerbtnlist" onClick={() => handleSort("pbRatio")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  Dividend
                  <button className="screenerbtnlist" onClick={() => handleSort("dividend")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  ROE
                  <button className="screenerbtnlist" onClick={() => handleSort("roe")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  ROCE
                  <button className="screenerbtnlist" onClick={() => handleSort("roce")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  EPS
                  <button className="screenerbtnlist" onClick={() => handleSort("eps")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
                <th>
                  Analyst Rating
                  <button className="screenerbtnlist" onClick={() => handleSort("analystrating")}>
                    <PiCaretUpDownFill />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
  {currentStocks.map((stock, index) => (
    <tr key={index} className="screener-row">
      <td className={`symbol-cell ${activeTab === "Symbol" ? "active-column" : ""}`}>
        <img src={stock.icon} alt={`${stock.symbol} logo`} className="company-icon" />
        {stock.symbol}
      </td>
      <td className={`${activeTab === "LTP" ? "active-column" : ""}`}>{stock.ltp}</td>
      <td
        className={`${activeTab === "Change %" ? "active-column" : ""}`}
        style={{
          color: parseFloat(stock.change) > 0 ? "#24b676" : parseFloat(stock.change) < 0 ? "red" : "inherit",
        }}
      >
        {stock.change}
      </td>
      <td>{stock.volume}</td>
      <td className={`${activeTab === "Market Cap" ? "active-column" : ""}`}>{stock.marketCap}</td>
      <td className={`${activeTab === "P/E" ? "active-column" : ""}`}>{stock.pe}</td>
      <td className={`${activeTab === "52W High" ? "active-column" : ""}`}>{stock.high52}</td>
      <td className={`${activeTab === "52W Low" ? "active-column" : ""}`}>{stock.low52}</td>
      <td>{stock.pbRatio}</td>
      <td>{stock.dividend}</td>
      <td style={{ color: "#24b676" }}>{stock.roe}</td>
      <td style={{ color: "#24b676" }}>{stock.roce}</td>
      <td>{stock.eps}</td>
      <td style={{ textAlign: "left" }}>
  {stock.analystRating === "Buy" || stock.analystRating === "Strong Buy" ? (
    <span style={{ color: "#24b676", marginLeft: "10px" }}>{stock.analystRating}</span>
  ) : (
    <button className="screener-unlock-btn" onClick={handleNavigate}>
        <IoLockClosedOutline style={{ marginRight: '8px' }} />
      <span className="button-text">Unlock</span>
    </button>
  )}
</td>



    </tr>
  ))}
</tbody>


          </table>
        </div>
{/* Pagination Section */}
<div className="pagination-container">
  <div className="pagination-info">
    {`Showing ${indexOfFirstItem + 1} to ${
      indexOfLastItem > stocks.length ? stocks.length : indexOfLastItem
    } of ${stocks.length} records`}
  </div>
  <div className="pagination-slider">
    <button
      className="pagination-button"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      &lt;
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={`pagination-button ${
          currentPage === i + 1 ? "active-page" : ""
        }`}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="pagination-button"
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      &gt;
    </button>
  </div>
</div>


        <Navbar />
      </div>
       <div className="foooterpagesaupdate">
          <FooterForAllPage />
        </div>
       
    </div>
  );
};

export default Nifty50screenerStockList;
