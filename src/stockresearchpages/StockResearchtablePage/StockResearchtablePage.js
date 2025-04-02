import React, { useState, useEffect } from 'react';
import './StockResearchtablePage.css';

import { PiCaretUpDownFill } from 'react-icons/pi';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import tcs from '../../assest/tcs.png';
import reliance from "../../assest/reliance.png";

import life from "../../assest/lici.png";
import itc from "../../assest/itc.png";
import hindustan from "../../assest/hindunilvr.png";

import bajaj from "../../assest/bajajhfl.png";
import tataConsumer from "../../assest/tataconsumer.png";
import vedant from "../../assest/ved.png";
import angelOne from "../../assest/angel.png";
import jupiter from "../../assest/jupiter.png";


const StockResearchtablePage = () => {


  const stockResearchtableData = [
    { date: "30-01-2025", symbol: "Reliance Industries Ltd", price: "₹1,272.15", change: "-0.09%", marketCap: "₹17.23T", target: "₹489.00", action: "Book Profits", rating: "Buy", profitBooked: "+23.58%", image: reliance, pdfLink: "View" },
    { date: "30-01-2025", symbol: "Tata Consultancy Services Ltd", price: "₹4,442.80", change: "-0.69%", marketCap: "₹16.19T", target: "₹1,150.00", action: "Book Profits", rating: "Sell", profitBooked: "+10.98%", image: tcs, pdfLink: "View" },
    { date: "29-01-2025", symbol: "Jupiter Wagons Ltd", price: "₹355.00", change: "-0.48%", marketCap: "₹14.31T", target: "₹489.00", action: "Book Profits", rating: "Buy", profitBooked: "+18.73%", image: jupiter, pdfLink: "View" },
    { date: "17-12-2024", symbol: "Tata Consumer Products Ltd", price: "₹1,022", change: "-1.03%", marketCap: "₹9.57T", target: "₹1,150.00", action: "Book Profits", rating: "Buy", profitBooked: "+13.96%", image: tataConsumer, pdfLink: "View" },
    { date: "25-11-2024", symbol: "Bajaj Finance Ltd", price: "₹8,410", change: "+0.03%", marketCap: "₹9.49T", target: "₹7,750.00", action: "Target Achieved", rating: "Buy", profitBooked: "+15.92%", image: bajaj, pdfLink: "View" },
    { date: "10-09-2024", symbol: "Vedant Fashions Ltd", price: "₹1,990.50", change: "-0.46%", marketCap: "₹8.3T", target: "₹1,460.00", action: "Target Achieved", rating: "Buy", profitBooked: "+15.05%", image: vedant, pdfLink: "View" },
    { date: "23-07-2024", symbol: "Angel One Ltd", price: "₹946.25", change: "+0.05%", marketCap: "₹7.69T", target: "₹3,500.00", action: "Target Achieved", rating: "Buy", profitBooked: "+67.38%", image: angelOne, pdfLink: "View" },
    { date: "21-06-2024", symbol: "Life Insurance Corp of India", price: "₹2,349", change: "-0.63%", marketCap: "₹5.9T", target: "₹980.00", action: "Book Profits", rating: "Sell", profitBooked: "+15.05%", image: life, pdfLink: "View" },
    { date: "10-06-2024", symbol: "ITC Ltd", price: "₹468.85", change: "-0.24%", marketCap: "₹5.88T", target: "₹3,500.00", action: "Book Profits", rating: "Sell", profitBooked: "+67.38%", image: itc, pdfLink: "View" },
    { date: "02-06-2024", symbol: "Hindustan Unilever Ltd", price: "₹2,411", change: "-0.80%", marketCap: "₹5.61T", target: "₹2,910.00", action: "Target Achieved", rating: "Buy", profitBooked: "+18.33%", image: hindustan, pdfLink: "View" }
];

    
  const [filteredstock, setFilteredstock] = useState(stockResearchtableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorttDirection, setSorttDirection] = useState(true);
  const [sortOption, setSortOption] = useState('Recent'); // Dropdown option state

  const itemsPerPage = 7; // Number of rows per page

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocksresearch = filteredstock.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredstock.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sorting
  const handleSortresearch = (key) => {
    const sortedstock = [...filteredstock].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Handle string cleaning and conversion to numbers if needed
      if (typeof valA === 'string') {
        if (key === 'price' || key === 'marketCap') {
          valA = parseFloat(valA.replace(/[\u20B9, T]/g, '')); // Handle currency symbols
        } else if (key === 'date') {
          valA = new Date(valA); // Convert to Date object for proper sorting
        } else if (key !== 'symbol' && key !== 'action' && key !== 'rating') {
          valA = parseFloat(valA.replace(/[\u20B9,%]/g, '')); // Clean and convert to number
        }
      }

      if (typeof valB === 'string') {
        if (key === 'price' || key === 'marketCap') {
          valB = parseFloat(valB.replace(/[\u20B9, T]/g, ''));
        } else if (key === 'date') {
          valB = new Date(valB);
        } else if (key !== 'symbol' && key !== 'action' && key !== 'rating') {
          valB = parseFloat(valB.replace(/[\u20B9,%]/g, ''));
        }
      }

      // Handle alphabetical comparison for 'action' column
      if (key === 'action') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      // Handle alphabetical comparison for 'rating' column
      if (key === 'rating') {
        valA = valA.toString();
        valB = valB.toString();

        // Custom sorting for rating values
        const customOrder = { Buy: 1, Hold: 2, Sell: 3 };
        valA = customOrder[valA] || valA;
        valB = customOrder[valB] || valB;
      }

      if (key === 'symbol') {
        return sorttDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return sorttDirection ? valA - valB : valB - valA;
    });

    // Update the state with the sorted stock
    setFilteredstock(sortedstock);

    // Toggle sorting direction for the next click
    setSorttDirection((prev) => !prev);
  };

 
  return (
    <div className="stockresearchanalysispagecontainer">
       
     
        <h2 className="stockresearchatable-title">Profit Peak</h2>

      
      <div className='stockresearchanalysispagerre'>
      <table className="stockresearchanalysispage-table">
        <thead>
          <tr>
            <th>
              Date
              <button className="screenerbtnlist" onClick={() => handleSortresearch('date')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>Symbol</th>
            <th>
              Price
              <button className="screenerbtnlist" onClick={() => handleSortresearch('price')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
              Change%
              <button className="screenerbtnlist" onClick={() => handleSortresearch('change')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
              Market Cap
              <button className="screenerbtnlist" onClick={() => handleSortresearch('marketCap')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
              Target
              <button className="screenerbtnlist" onClick={() => handleSortresearch('target')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
            Upside/Downside
              <button className="screenerbtnlist" onClick={() => handleSortresearch('action')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
              Rating
              <button className="screenerbtnlist" onClick={() => handleSortresearch('rating')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>
              Profit Booked
              <button className="screenerbtnlist" onClick={() => handleSortresearch('profitBooked')}>
                <PiCaretUpDownFill />
              </button>
            </th>
            <th>PDF/Link</th>
          </tr>
        </thead>
        <tbody>
          {currentStocksresearch.map((stock, index) => (
            <tr key={index}>
              <td>{stock.date}</td>
              <td>
                <img src={stock.image} alt={stock.symbol} className="bank-logo" /> {stock.symbol}
              </td>
              <td>{stock.price}</td>
              <td style={{ color: stock.change.includes('-') ? 'red' : '#24b676' }}>{stock.change}</td>
              <td>{stock.marketCap}</td>
              <td>{stock.target}</td>
              <td>{stock.action}</td>
              <td style={{ color: stock.rating === 'Buy' ? '#24b676' : 'red' }}>{stock.rating}</td>
              <td style={{ color: stock.profitBooked.includes('-') ? 'red' : '#24b676' }}>{stock.profitBooked}</td>
              <td>
          <a href={stock.pdfLink} target="_blank" rel="noopener noreferrer" className="pdfstockresearch-link">
            View
          </a>
        </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Pagination Section */}
      <div className="pagination-containeranalystreaserchtable">
        <div className="pagination-info">
          {`Showing ${indexOfFirstItem + 1} to ${
            indexOfLastItem > filteredstock.length ? filteredstock.length : indexOfLastItem
          } of ${filteredstock.length} records`}
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
              className={`pagination-button ${currentPage === i + 1 ? 'active-page' : ''}`}
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

export default StockResearchtablePage;