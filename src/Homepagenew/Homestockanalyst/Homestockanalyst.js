import React, { useState, useEffect } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Sorting icon
import Navbar from "../../Navbar/Navbar";
import './Homestockanalyst.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";

const Homestockanalyst = () => {

  const [stocks, setStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(10); 
  const navigate = useNavigate();
 
  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true); 
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/stocksScreener/sectorAnalyst`, {
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
      setStocks(data);
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

  // Centralized sorting function
  const sortStocks = (stocksArray, key, direction = "asc") => {
    return [...stocksArray].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      
      // Check if the value is a number
      const isNumber = !isNaN(parseFloat(valA));
      if (isNumber) {
        return direction === "asc" 
          ? parseFloat(valA) - parseFloat(valB) 
          : parseFloat(valB) - parseFloat(valA);
      }
  
      // If not a number, sort alphabetically
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  };  
  
  // Handle tab clicks for filtering and sorting
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "All") {
      fetchData();
    } else {
      let filteredStocks = [...allStocks];
      switch (tab) {
        case "Gainers":
          filteredStocks = allStocks.filter(
            (stock) => parseFloat(stock.change_percent) > 0
          );
          break;
        case "Losers":
          filteredStocks = allStocks.filter(
            (stock) => parseFloat(stock.change_percent) < 0
          );
          break;
        case "LTP":
          filteredStocks = sortStocks(allStocks, "ltp_inr", "desc");
          break;

        case "Change %":
          filteredStocks = sortStocks(allStocks, "change_percent", "desc");
          break;
        case "Market Cap":
          filteredStocks = sortStocks(allStocks, "market_cap_cr", "desc");
          break;
        case "ROE":
          filteredStocks = sortStocks(allStocks, "roe", "desc");
          break;
          
        case "P/E":
          filteredStocks = sortStocks(allStocks, "pe", "desc");
          break;

        case "P/BV":
          filteredStocks = sortStocks(allStocks, "pbv", "desc");
          break;

        case "EV/EBITDA":
          filteredStocks = sortStocks(allStocks, "ev_ebitda", "desc");
          break;

        case "5Y Sales Gr":
          filteredStocks = sortStocks(allStocks, "sales_growth_5y", "desc");
          break;

        case "5Y Profit Gr":
          filteredStocks = sortStocks(allStocks, "profit_growth_5y", "desc");
          break;

        default:
          break;
      }
      setStocks(filteredStocks);
    }
  };
  // Sorting logic
  const handleSort = (column) => {
    const direction =
      sortConfig.key === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: column, direction });

    const sortedStocks = sortStocks(stocks, column, direction);

    setStocks(sortedStocks);
  };

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

  // Pagination logic
  const indexOfLastItem = currentPage * stocksPerPage;
  const indexOfFirstItem = indexOfLastItem - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stocks.length / stocksPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  


  return (
    <div className="DashboardMainPagetable-container">
   
    <div>
      <div className="screener-containerr">
        {/* Tabs */}
        <div className="tabsnifty50-containerdash">
  {["All", "Gainers", "Losers", "LTP", "Change %", "Market Cap", "ROE", "P/E", "P/BV", "EV/EBITDA", "5Y Sales Gr", "5Y Profit Gr"].map((tab) => (
    <button
      key={tab}
      className={`tabnifty50-buttondash ${activeTab === tab ? "active" : ""}`}
      onClick={() => handleTabClick(tab)}
    >
      {tab}
    </button>
  ))}
</div>


        {/* Table */}
        
<div className="DashboardMainPagetable-table-containerrrrr">
<table className="DashboardMainPagetable-tableeee">
          <thead>
  <tr>
    <th style={{ height: '40px', padding: '8px',  }}>Company</th>
    <th
      onClick={() => handleSort("ltp_inr")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span>LTP (₹)</span>
      {renderSortIcon("ltp_inr")}
    </th>
    <th
      onClick={() => handleSort("change_percent")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Change % {renderSortIcon("change_percent")}
      </span>
    </th>
    <th
      onClick={() => handleSort("market_cap_cr")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Market Cap (Cr) {renderSortIcon("market_cap_cr")}
      </span>
    </th>
    <th
      onClick={() => handleSort("roe")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        ROE {renderSortIcon("roe")}
      </span>
    </th>
    <th
      onClick={() => handleSort("pe")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        P/E {renderSortIcon("pe")}
      </span>
    </th>
    <th
      onClick={() => handleSort("pbv")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        P/BV {renderSortIcon("pbv")}
      </span>
    </th>
    <th
      onClick={() => handleSort("ev_ebitda")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        EV/EBITDA {renderSortIcon("ev_ebitda")}
      </span>
    </th>
    <th
      onClick={() => handleSort("sales_growth_5y")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        5Y Sales Gr. (%) {renderSortIcon("sales_growth_5y")}
      </span>
    </th>
    <th
      onClick={() => handleSort("profit_growth_5y")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        5Y Profit Gr.(%) {renderSortIcon("profit_growth_5y")}
      </span>
    </th>
    <th style={{ height: '40px', padding: '8px'}}>Clarification</th>
  </tr>
</thead>

<tbody>
  {currentStocks.map((stock, index) => (
    <tr key={index}>
     <td 
  className={`${activeTab === "company" ? "active-column" : ""}`}
>
  {stock.company}
</td>

      <td className={activeTab === "LTP" ? "active-column" : ""}>
        {stock.ltp_inr}
      </td>
      <td
        className={activeTab === "Change %" ? "active-column" : ""}
        style={{
          color: parseFloat(stock.change_percent) > 0 ? "#24b676" : "red",
        }}
      >
        {stock.change_percent}
      </td>
      <td className={activeTab === "Market Cap" ? "active-column" : ""}>
        {stock.market_cap_cr}
      </td>
      <td className={activeTab === "ROE" ? "active-column" : ""}>
        {stock.roe}
      </td>
      <td className={activeTab === "P/E" ? "active-column" : ""}>
        {stock.pe}
      </td>
      <td className={activeTab === "P/BV" ? "active-column" : ""}>
        {stock.pbv}
      </td>
      <td className={activeTab === "EV/EBITDA" ? "active-column" : ""}>
        {stock.ev_ebitda}
      </td>
      <td className={activeTab === "5Y Sales Gr" ? "active-column" : ""}>
        {stock.sales_growth_5y}
      </td>
      <td className={activeTab === "5Y Profit Gr" ? "active-column" : ""}>
        {stock.profit_growth_5y}
      </td>
      <td style={{ color: "#24b676", cursor: "pointer" }}>
        {stock.clarification}
      </td>
    </tr>
  ))}
</tbody>


          </table>
        </div>

        {/* Pagination */}
      
      {/* Pagination Section */}
<div className="pagination-containerreasearch">
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
       

      </div>
    </div>
    </div>
  );
};

export default Homestockanalyst;