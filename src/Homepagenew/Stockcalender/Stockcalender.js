import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";
import './Stockcalender.css'
import Navbar from "../../Navbar/Navbar";

import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const Stockcalender = () => {
  const [selectedEarningsTab, setSelectedEarningsTab] = useState("Today");
  const [sortOrder, setSortOrder] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [allStocks, setAllStocks] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Memoized calculations to prevent unnecessary re-computations
  const totalPages = useMemo(() => Math.ceil(sortedData.length / itemsPerPage), [sortedData]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Memoized date formatting function
  const formatDate = useCallback((date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
  }, []);

  // Memoized fetch data function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/stocksScreener/stockCalender`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log(data)
      setAllStocks(data);
      setSortedData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized useEffect with callback dependency
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized sort handler
  const handleSort = useCallback((column) => {
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
    const sorted = [...sortedData].sort((a, b) => compareValues(a, b, column, newSortOrder));
    setSortOrder((prevSortOrder) => ({ ...prevSortOrder, [column]: newSortOrder }));
    setSortedData(sorted);
  }, [sortedData, sortOrder]);

  // Memoized comparison function
  const compareValues = useCallback((a, b, column, order) => {
    let valueA = a[column];
    let valueB = b[column];

    if (["ltp_inr", "change_percent", "market_cap_cr", "High_52W_INR", "Low_52W_INR", "pe"].includes(column)) {
      valueA = parseFloat(valueA.replace(/₹|%|,/g, ""));
      valueB = parseFloat(valueB.replace(/₹|%|,/g, ""));
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (column === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  }, []);

  // Memoized sort icon renderer
  const renderSortIcon = useCallback((column) => {
    const sortIconStyle = { transform: sortOrder[column] === "asc" ? "rotate(0deg)" : "rotate(180deg)" };
    return <PiCaretUpDownFill style={sortIconStyle} />;
  }, [sortOrder]);

  // Memoized earnings tab change handler
  const handleEarningsTabChange = useCallback((tab) => {
    setSelectedEarningsTab(tab);
    filterEarningsData(tab);
  }, [allStocks]);

  // Memoized earnings data filter
  const filterEarningsData = useCallback((tab) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time
  
    const filtered = allStocks.filter((data) => {
      if (!data.event_date) return false; // Ignore rows with missing dates
  
      const dataDate = new Date(data.event_date); // Convert string to Date object
      if (isNaN(dataDate.getTime())) return false; // Ignore invalid dates
      dataDate.setHours(0, 0, 0, 0); // Normalize time
  
      switch (tab) {
        case "Yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return dataDate.getTime() === yesterday.getTime();
  
        case "Today":
          return dataDate.getTime() === today.getTime();
  
        case "Tomorrow":
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return dataDate.getTime() === tomorrow.getTime();
  
        case "This Week":
          return isWithinWeek(dataDate, today);
  
        case "Next Week":
          return isWithinNextWeek(dataDate, today);
  
        default:
          return false;
      }
    });
  
    console.log("Filtered Data:", filtered); // Debugging
    setSortedData(filtered);
  }, [allStocks]);
  

  // Memoized week checking functions
  const isWithinWeek = useCallback((dataDate, today) => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return dataDate >= startOfWeek && dataDate <= endOfWeek;
  }, []);

  const isWithinNextWeek = useCallback((dataDate, today) => {
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
    return dataDate >= startOfNextWeek && dataDate <= endOfNextWeek;
  }, []);

  // Date range filtering
  const handleDateChange = useCallback((dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  
    if (start && end) {
      filterDataByDate(start, end);
    } else {
      setSortedData(allStocks); // Reset full data agar range clear ho
    }
  });
  

  const filterDataByDate = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setSortedData(allStocks); // Reset full data agar range na ho
      return;
    }
  
    // Convert dates properly & remove time for accurate comparison
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999); // Include full end date
  
    const filteredData = allStocks.filter((row) => {
      const rowDate = new Date(row.event_date); // Convert to Date object
      rowDate.setHours(0, 0, 0, 0); // Normalize data
  
      return rowDate >= start && rowDate <= end;
    });
  
    setSortedData(filteredData);
  };
  
  

  // Memoized page change handler
  const handlePageChange = useCallback((pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [totalPages]);

  // Memoize current stocks to prevent unnecessary re-renders
  const currentStocks = useMemo(() =>
    sortedData.slice(indexOfFirstItem, indexOfLastItem),
    [sortedData, indexOfFirstItem, indexOfLastItem]
  );

  return (
    <div className="DashboardMainPagetable-container">
      
      <div className="earnings-insight-learn-wrapperr">


            <div className="earnings-insight-learn-controls">
                <div className="earnings-insight-learn-header-row">
                    <div className="earningquterlyrowalll">
                    <div className="earnings-insight-learn-tabs">
  {["Yesterday", "Today", "Tomorrow", "This Week", "Next Week"].map((tab) => (
    <button
      key={tab}
      className={`earnings-insight-learn-tab-button ${
        selectedEarningsTab === tab ? "active" : ""
      }`}
      onClick={() => handleEarningsTabChange(tab)}
    >
      {tab}
    </button>
  ))}
</div>
<div >
                    <div className="earnings-insight-learn-date-picker">
                    <div className="dateinsighttt">
  <label htmlFor="dateRange" className="date-picker-label">
    Select Date Range:
  </label>
  <div className="calendar-icon" onClick={() => setCalendarOpen(true)}>
    <FaRegCalendarAlt />
  </div>
</div>
{calendarOpen && (
  <ReactDatePicker
  selected={startDate}
  onChange={handleDateChange}
  startDate={startDate}
  endDate={endDate}
  selectsRange
  inline
  dateFormat="yyyy-MM-dd"
  onClickOutside={() => setCalendarOpen(false)} // Close calendar when clicking outside
/>

)}

                        </div>
                     
                    
                    </div>
                    
          
                </div>
            </div>
            <div className="DashboardMainPagetable-table-containercalen">
            <table className="DashboardMainPagetable-tablee">
              <thead>
                <tr>

                  <th>Company</th>

                  <th onClick={() => handleSort("ltp_inr")} style={{ cursor: "pointer" }}>
                    LTP ₹ {renderSortIcon("ltp_inr")}
                  </th>
                  <th onClick={() => handleSort("change_percent")} style={{ cursor: "pointer" }}>
                    Change % {renderSortIcon("change_percent")}
                  </th>
                  <th onClick={() => handleSort("market_cap_cr")} style={{ cursor: "pointer" }}>
                    Market Cap (Cr.) {renderSortIcon("market_cap_cr")}
                  </th>
                  <th onClick={() => handleSort("High_52W_INR")} style={{ cursor: "pointer" }}>
                    52W High (₹) {renderSortIcon("High_52W_INR")}
                  </th>
                  <th onClick={() => handleSort("Low_52W_INR")} style={{ cursor: "pointer" }}>
                    52W Low (₹) {renderSortIcon("Low_52W_INR")}
                  </th>

                  <th onClick={() => handleSort("event_date")} style={{ cursor: "pointer" }}>
                    Date{renderSortIcon("event_date")}
                  </th>

                  <th onClick={() => handleSort("pe")} style={{ cursor: "pointer" }}>
                    Current P/E {renderSortIcon("pe")}
                  </th>
                  <th >
                    Clarification
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterEarningsData.length > 0 ? (
                  currentStocks.map((row, index) => (

                    <tr key={index}>
                      <td>
                        <a href={row.url} target="_blank" rel="noopener noreferrer">
                          {row.company}
                        </a>
                      </td>
                      <td>{row.ltp_inr}</td>
                      <td
                        style={{
                          color: row.change_percent && row.change_percent.includes("-") ? "red" : "#24b676", // Red for negative, green for positive
                        }}
                      >
                        {row.change_percent}
                      </td>
                      <td>{row.market_cap_cr}</td>
                      <td>{row.High_52W_INR}</td>
                      <td>{row.Low_52W_INR}</td>
                      <td>{formatDate(row.event_date)}</td>
                      <td>{row.pe}</td>
                      <td>
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clarificationstockcalender-link"
                          style={{ color: "#24b676", cursor: "pointer" }}
                        >
                          {row.clarification}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No data available for {selectedEarningsTab}
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
          {/* Pagination Section */}
          <div className="pagination-containercalender">
            <div className="pagination-info">
              {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem > sortedData.length ? sortedData.length : indexOfLastItem
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
        
      </div>
    </div>

  );
};

export default Stockcalender