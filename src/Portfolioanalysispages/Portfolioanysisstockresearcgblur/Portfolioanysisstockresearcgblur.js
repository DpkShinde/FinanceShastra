
import './Portfolioanysisstockresearcgblur.css'
import React, { useState, useEffect, useContext } from 'react';
import lockimg from '../../assest/lock.png'
import { useNavigate } from "react-router-dom"; 
import { CiSearch } from 'react-icons/ci';
import { PiCaretUpDownFill } from 'react-icons/pi';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import tcs from '../../assest/tcs.png';
import reliance from "../../assest/reliance.png";
import hdfc from "../../assest/hdfcbank.png";
import bharti from "../../assest/bhartiartl.png";

import { SubscriptionContext } from "../../Portfoilo/context/SubscriptionContext";
import Sidebar from '../../Sidebar/Sidebar';





const AnalysisResearchReportblur = () => {
  const {isSubscribed}= useContext(SubscriptionContext)
    const stockResearchData = [
        { date: "22-01-2025", symbol: "Reliance Industries Ltd", price: "₹1,272.15", change: "-0.09%", marketCap: "₹17.23T", target: "₹489.00", action: "Book Profits", rating: "Buy", profitBooked: "+18.73%", image: reliance, pdfLink: "View"  },
        { date: "09-01-2025", symbol: "Tata Consultancy Services Ltd", price: "₹4,442.80", change: "-0.69%", marketCap: "₹16.19T", target: "₹1,150.00", action: "Book Profits", rating: "Buy", profitBooked: "+10.98%", image: tcs , pdfLink: "View"  },
        { date: "09-01-2025", symbol: "HDFC Bank Ltd", price: "₹1,862.75", change: "-0.48%", marketCap: "₹14.31T", target: "₹380.00", action: "Target Achieved", rating: "Buy", profitBooked: "+21.22%", image: hdfc, pdfLink: "View"  },
        { date: "09-01-2025", symbol: "Bharti Airtel Ltd", price: "₹1,664.40", change: "-1.03%", marketCap: "₹9.57T", target: "₹7,750.00", action: "Book Profits", rating: "Buy", profitBooked: "+17.50%", image: bharti, pdfLink: "View"  },
        
      ];
      const [filteredstock, setFilteredstock] = useState(stockResearchData);
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
      const navigate = useNavigate(); // Initialize navigation
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
    
      // Update filtered stock based on dropdown selection
      useEffect(() => {
        if (sortOption === 'Recent') {
          const sortedData = [...stockResearchData];
          setFilteredstock(sortedData); // Update based on your criteria
        }
        if (sortOption === 'Newest - Oldest') {
          const sortedData = [...stockResearchData].sort((a, b) => new Date(b.date) - new Date(a.date));
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Oldest - Newest') {
          const sortedData = [...stockResearchData].sort((a, b) => new Date(a.date) - new Date(b.date));
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Buy') {
          const sortedData = [...stockResearchData].filter(stock => stock.rating === 'Buy');
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Sell') {
          const sortedData = [...stockResearchData].filter(stock => stock.rating === 'Sell');
          setFilteredstock(sortedData);
        }
      }, [sortOption]);
    
  return (
    <div >

       <h1 className='reportcontaineranalysisheaderr'>Stock research report</h1>
    <div className="report-container">
     
      {/* Blurred Content //className="blurred-content"*/}
      <div className={!isSubscribed & "blurred-content"}> 
      <div className="stockresearchanalysispagecontainerblur">
              <div className="stockresearchanalysispage-containerforblur">
            
                <h2 className="stockresearchanalysispage-title">Stock Research Reports</h2>
                <p className="stockresearchanalysispage-subtitle">
                  Discover the latest stock research analysis with buy, hold, and sell ratings, along with expert trading recommendations from analysts at Trade Brains Portal for smarter investment decisions.
                </p>
                <input type="text" className="stockresearchanalysispage-search" placeholder="Search by stock name" />
                <CiSearch className="stockresarch-search-iconblur" />
              </div>
             
              <table className="stockresearchanalysispage-tableanalysisblur">
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
                      <td  className='symiconalll'>
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
           
              <div>
              <button className='allblursearchbutton' onClick={() => { 
    navigate("/stockresearchpages");
    window.scrollTo(0, 0);
  }}>
  view more
</button>

</div>

      </div>

     
    </div>
   
    </div>
  );
};

export default AnalysisResearchReportblur;
