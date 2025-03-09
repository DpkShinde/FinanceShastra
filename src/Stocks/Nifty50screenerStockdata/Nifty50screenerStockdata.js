import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import './Nifty50screenerStockdata.css'

import tcs from '../../assest/tcs.png';
import reliance from '../../assest/reliance.png';
import hdfc from '../../assest/hdfcbank.png';
import bharti from '../../assest/bhartiartl.png';
import icici from '../../assest/icicibank.png';
import infosys from '../../assest/infy.png';
import sbi from '../../assest/sbin.png';
import life from '../../assest/lici.png';


const Nifty50tabledatascreener = [
    {
        symbol: 'Tata Consultancy Services',
        ltp: '₹3,525.10',
        change: '1.25%',
        volume: '25,74,932',
        marketCap: '₹13,14,235.10 Cr',
        pe: '30.12',
        high52: '₹3,900.00',
        low52: '₹2,950.00',
        pbRatio: '12.1',
        dividend: '1.23%',
        roe: '22.5%',
        roce: '30.1%',
        eps: '150.12',
        icon: tcs,
      },
      {
        symbol: 'Reliance Industries',
        ltp: '₹2,345.65',
        change: '0.85%',
        volume: '12,34,876',
        marketCap: '₹16,42,352.20 Cr',
        pe: '25.20',
        high52: '₹2,600.00',
        low52: '₹2,010.00',
        pbRatio: '11.2',
        dividend: '0.91%',
        roe: '18.6%',
        roce: '20.1%',
        eps: '92.11',
        icon: reliance,
      },
      {
        symbol: 'HDFC Bank',
        ltp: '₹1,640.20',
        change: '1.50%',
        volume: '34,56,789',
        marketCap: '₹10,25,312.30 Cr',
        pe: '20.11',
        high52: '₹1,750.00',
        low52: '₹1,350.00',
        pbRatio: '9.5',
        dividend: '0.85%',
        roe: '15.3%',
        roce: '22.1%',
        eps: '65.21',
        icon: hdfc,
      },
      {
        symbol: 'Bharti Airtel',
        ltp: '₹1,599.50',
        change: '0.98%',
        volume: '34,00,479',
        marketCap: '₹3,09,173.70 Cr',
        pe: '63.49',
        high52: '₹1,779.00',
        low52: '₹989.65',
        pbRatio: '10.35',
        dividend: '0.51%',
        roe: '8.11%',
        roce: '11.55%',
        eps: '21.42',
        icon: bharti,
      },
      {
        symbol: 'ICICI Bank',
        ltp: '₹944.65',
        change: '1.01%',
        volume: '56,34,897',
        marketCap: '₹6,78,934.10 Cr',
        pe: '19.3',
        high52: '₹1,050.00',
        low52: '₹800.00',
        pbRatio: '6.2',
        dividend: '0.72%',
        roe: '17.4%',
        roce: '25.5%',
        eps: '40.22',
        icon: icici,
      },
      {
        symbol: 'Infosys',
        ltp: '₹1,907.40',
        change: '-0.09%',
        volume: '36,23,321',
        marketCap: '₹7,89,663.30 Cr',
        pe: '29.42',
        high52: '₹2,006.45',
        low52: '₹1,358.35',
        pbRatio: '10.12',
        dividend: '2.41%',
        roe: '29.67%',
        roce: '36.82%',
        eps: '64.20',
        icon: infosys,
      },
      {
        symbol: 'State Bank of India',
        ltp: '₹558.65',
        change: '0.75%',
        volume: '45,67,230',
        marketCap: '₹4,67,122.90 Cr',
        pe: '10.25',
        high52: '₹600.00',
        low52: '₹450.00',
        pbRatio: '7.1',
        dividend: '1.45%',
        roe: '14.5%',
        roce: '18.2%',
        eps: '55.31',
        icon: sbi,
      },
      {
        symbol: 'Life Insurance Corporation',
        ltp: '₹689.70',
        change: '1.15%',
        volume: '25,34,876',
        marketCap: '₹2,34,122.30 Cr',
        pe: '15.25',
        high52: '₹800.00',
        low52: '₹550.00',
        pbRatio: '5.2',
        dividend: '0.65%',
        roe: '12.1%',
        roce: '15.2%',
        eps: '31.21',
        icon: life,
      },
];

const Nifty50screenerStockdatatable = () => {
    const [stocks, setStocks] = useState(Nifty50tabledatascreener);
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");
    const [filters, setFilters] = useState({
      epsDilGrowth: [], // Initialize as an empty array
      pe: [], // Initialize as an empty array
      roe: [], // Initialize as an empty array
      price: "All",
      marketCap: "All",
      divYield: [],
      sector: "All",
      change: "All",
    });
  
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
  
    return (
      <div className="screenercontainer">
       <div className="screenerheadercontainer">
    <h2 className="screenerheader">Nifty 50 Companies</h2>
    <button
      onClick={() => navigate('/nifty50screenerStockList')}
      className="screenerheaderexplorebtn">
      Explore the Nifty 50 companies
    </button>
  </div>

  {/* Conditional Rendering */}
  
  <div className="screener-table-wrapper" >
  
  <table className="screenertablenifty" >
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
  <div className="cahngeupdownheader">
    Change %
    <button className="screenerbtnlist" onClick={() => handleSort("change")}>
      <PiCaretUpDownFill />
    </button>
  </div>
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
      </tr>
    </thead>
    <tbody>
      {stocks.map((stock, index) => (
        <tr key={index} className="screener-row">
          <td className="symbol-cell">
            <img src={stock.icon} alt={`${stock.symbol} logo`} className="company-icon" />
            {stock.symbol}
          </td>
          <td>{stock.ltp}</td>
          <td
            style={{
              color: parseFloat(stock.change) > 0 ? "#24b676" : parseFloat(stock.change) < 0 ? "red" : "inherit",
            }}
          >
            {stock.change}
          </td>
          <td>{stock.volume}</td>
          <td>{stock.marketCap}</td>
          <td>{stock.pe}</td>
          <td>{stock.high52}</td>
          <td
            
          >
            {stock.low52}
          </td>
          <td>{stock.pbRatio}</td>
          <td>{stock.dividend}</td>
          <td style={{
              color: "#24b676",
            }}>{stock.roe}</td>
          <td style={{
              color: "#24b676",
            }}>{stock.roce}</td>
          <td>{stock.eps}</td>
        </tr>
      ))}
    </tbody>
  </table>
  
      </div>
      
    
    </div>
  );
  };

export default Nifty50screenerStockdatatable;
