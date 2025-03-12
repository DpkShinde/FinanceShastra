import React, { useState, useEffect, useMemo } from "react";
import "./DashboardMainPagetable.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import icon1 from '../../assest/it.svg';
import icon2 from '../../assest/e.svg';
import icon3 from '../../assest/h.svg';
import icon4 from '../../assest/power.svg';
import icon5 from '../../assest/finance.svg';
import icon6 from '../../assest/l.svg';
import icon7 from '../../assest/message.svg';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

// Data for the cards and table
const DashboardPagetable = [
  { id: 1, sector: "IT", stocks: 60, value: "₹1,02,580.30", change: "6.8%", changeType: "up" },
  { id: 2, sector: "Energy", stocks: 43, value: "₹70,564.20", change: "4.2%", changeType: "up" },
  { id: 3, sector: "Health", stocks: 74, value: "₹1,11,580.30", change: "8.6%", changeType: "up" },
  { id: 4, sector: "Power", stocks: 10, value: "₹30,524.32", change: "5.8%", changeType: "down" },
  { id: 5, sector: "Textiles", stocks: 32, value: "₹84,586.72", change: "6.6%", changeType: "down" },
  { id: 6, sector: "Finance", stocks: 58, value: "₹1,33,580.69", change: "9.4%", changeType: "up" },
  { id: 7, sector: "Telecommunication", stocks: 24, value: "₹72,586.42", change: "4.2%", changeType: "down" },
];

const DashboardMainPagetable = () => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/stocksScreener/stockSector`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllStocks(data)
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Sort function
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  // Sort the data based on the sortConfig
  const sortedData = useMemo(() => {
    return [...allStocks].sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
      }
      return 0;
    });
  }, [allStocks, sortConfig]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  // Render sort icons dynamically
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <PiCaretUpDownFill style={{ transform: "rotate(0deg)" }} />
      ) : (
        <PiCaretUpDownFill style={{ transform: "rotate(180deg)" }} />
      );
    }
    return <PiCaretUpDownFill style={{ color: "black" }} />;
  };

  const currentStocks = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="DashboardMainPagetable-container">
    
      <div className="DashboardMainPagetable-cards">
        {DashboardPagetable.map((card) => (
          <div key={card.id}
            className={`DashboardMainPagetable-card ${card.id === 7 ? "custom-card-size" : ""}`}>
            <div className="DashboardMainPagetable-card-header">
              <div className="DashboardMainPagetable-header-left">
                {/* Replace the blank color circle with actual icons */}
                {card.sector === "IT" && (
                  <img
                    src={icon1} // Path to your imported SVG
                    alt="IT Icon"
                    width="28"
                    height="28"

                    className="sector-icon"
                  />
                )}
                {card.sector === "Energy" && (
                  <img
                    src={icon2} // Path to your imported SVG
                    alt="energy Icon"
                    width="20"
                    height="20"
                    className="sectorenergy-icon"
                  />
                )}
                {card.sector === "Health" && (
                  <img
                    src={icon3} // Path to your imported SVG
                    alt="health Icon"
                    width="20"
                    height="20"
                    className="sectorhealth-icon"
                  />
                )}
                {card.sector === "Power" && (
                  <img
                    src={icon4} // Path to your imported SVG
                    alt="Power Icon"
                    width="20"
                    height="20"
                    className="sectorpower-icon"
                  />
                )}

                {card.sector === "Textiles" && (
                  <img
                    src={icon6} // Path to your imported SVG
                    alt="textile Icon"
                    width="20"
                    height="20"
                    className="sectortextile-icon"
                  />
                )}
                {card.sector === "Finance" && (
                  <img
                    src={icon5} // Path to your imported SVG
                    alt="finance Icon"
                    width="20"
                    height="20"
                    className="sectorfinance-icon"
                  />
                )}
                {card.sector === "Telecommunication" && (
                  <img
                    src={icon7} // Path to your imported SVG
                    alt="telecommunication Icon"
                    width="20"
                    height="20"
                    className="sectortele-icon"
                  />
                )}

                <p className="DashboardMainPagetable-sector">{card.sector}</p>
              </div>
            </div>
            <span className="DashboardMainPagetable-stocks">{card.stocks} Stock</span>
            <div className="upgraph">
              <div className="value">
                <p className="DashboardMainPagetable-value">{card.value}</p>
              </div>
              <div className="valuee">
                <p
                  className={`DashboardMainPagetable-change ${card.changeType === "up" ? "change-up" : "change-down"
                    }`}
                >
                  {card.changeType === "up" ? "▲" : "▼"} {card.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="DashboardMainPagetable-table-container">
        <table className="DashboardMainPagetable-tableeee">
          <thead>
            <tr>
              <th>Company</th>
              <th onClick={() => handleSort("ltp_inr")}>
                LTP (₹) {renderSortIcon("ltp_inr")}
              </th>
              <th onClick={() => handleSort("change_percent")}>
                Change % {renderSortIcon("change_percent")}
              </th>
              <th onClick={() => handleSort("market_cap_cr")}>
                Market Cap (Cr) {renderSortIcon("market_cap_cr")}
              </th>
              <th onClick={() => handleSort("High_52W_INR")}>
                52W High (₹) {renderSortIcon("High_52W_INR")}
              </th>
              <th onClick={() => handleSort("Low_52W_INR")}>
                52W Low (₹) {renderSortIcon("Low_52W_INR")}
              </th>
              <th onClick={() => handleSort("sector")}>
                Sector {renderSortIcon("sector")}
              </th>
              <th onClick={() => handleSort("pe")}>
                Current P/E {renderSortIcon("pe")}
              </th>
              <th>Clarification</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((row) => (
              <tr key={row.id}>
                <td>{row.company}</td>
                <td>{row.ltp_inr}</td>
                <td
                  className={
                    parseFloat(row.change_percent) > 0
                      ? "DashboardMainPagetable-positive"
                      : "DashboardMainPagetable-negative"
                  }
                >
                  {row.change_percent}
                </td>
                <td>{row.market_cap_cr}</td>
                <td>{row.High_52W_INR}</td>
                <td>{row.Low_52W_INR}</td>
                <td>{row.sector}</td>
                <td>{row.pe}</td>
                <td>
                  <a href="#" className="clarification-link">
                    Know more
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Section */}
      <div className="pagination-containerrsector">
        <div className="pagination-info">
          {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem > sortedData.length
              ? sortedData.length
              : indexOfLastItem
            } of ${sortedData.length} records`}
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
              className={`pagination-button ${currentPage === i + 1 ? "active-page" : ""
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
    </div>
  );
};

export default DashboardMainPagetable;