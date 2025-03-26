import { useState, useEffect,useMemo } from "react";
import { screenerStockincomeData } from "../../Stocks/Stockincomedata";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { FaSearch } from "react-icons/fa"; // Import FaSearch for the search bar
import { IoLockClosedOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";



const Netify100IncomeStatement = () => {
  const [stocks, setStocks] = useState(screenerStockincomeData);
   const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState("Income Statement");
   const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
     epsDilGrowth: [], // Initialize as an empty array
     pe: [],           // Initialize as an empty array
     roe: [],          // Initialize as an empty array
     price: "All",
     marketCap: "All",
     divYield: [],
     sector: "All",
     change: "All",
   });
   
   const [isDivYieldDropdownVisible, setDivYieldDropdownVisible] = useState(false);
   const [filteredData, setFilteredData] = useState(screenerStockincomeData); 
 
   const toggleDivYieldDropdown = () => {
     setDivYieldDropdownVisible(!isDivYieldDropdownVisible);
    
   };
   const [isPriceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const togglePriceDropdown = () => {
    setPriceDropdownVisible(!isPriceDropdownVisible);
   
  };
  const [ischangeDropdownVisible, setchangeDropdownVisible] = useState(false);
  const togglechangeDropdown = () => {
    setchangeDropdownVisible(!ischangeDropdownVisible);
   
  };
  const [isPerfDropdownVisible, setPerfDropdownVisible] = useState(false);

// Define the togglePerfDropdown function
const togglePerfDropdown = () => {
  setPerfDropdownVisible(prevVisible => !prevVisible);
};
   const [isEPSDropdownVisible, setEPSDropdownVisible] = useState(false);
 
   const [isROEDropdownVisible, setROEDropdownVisible] = useState(false);
   const toggleROEDropdown = () => {
     setROEDropdownVisible(!isROEDropdownVisible);
    
   };
   
 
   
   const toggleEPSDropdown = () => {
     setEPSDropdownVisible(!isEPSDropdownVisible);
   };
   const [isPEDropdownVisible, setPEDropdownVisible] = useState(false);
  
   const togglePEDropdown = () => {
     setPEDropdownVisible(!isPEDropdownVisible);
   };
   const [isMarketCapDropdownVisible, setIsMarketCapDropdownVisible] = useState(false);
   const [marketCapFilters, setMarketCapFilters] = useState([]);
 
   const handleMarketCapChange = (value) => {
     setMarketCapFilters((prevFilters) =>
       prevFilters.includes(value)
         ? prevFilters.filter((filter) => filter !== value)
         : [...prevFilters, value]
     );
   };
 
   const resetMarketCapFilters = () => {
     setMarketCapFilters([]);
   };
 
   const applyMarketCapFilters = () => {
     console.log("Applied Market Cap filters:", marketCapFilters);
     // Optionally, update the main filters state with the Market Cap selections
     setFilters((prevFilters) => ({
       ...prevFilters,
       marketCap: marketCapFilters,
     }));
   };
   const [changeRange, setChangeRange] = useState({ min: -30, max: 40 });
 
   const handleChangeRange = (key, value) => {
     setChangeRange((prev) => ({
       ...prev,
       [key]: Number(value),
     }));
   };
 
   
   const handleTabChange = (tab) => {
     setActiveTab(tab);
   };
 
   const handleFilterChange = (key, value) => {
     const newFilters = { ...filters };
 
     if (key === "roe") {
       const currentValues = newFilters[key];
       if (currentValues.includes(value)) {
         newFilters[key] = currentValues.filter((v) => v !== value);
       } else {
         newFilters[key] = [...currentValues, value];
       }
     } else {
       newFilters[key] = value;
     }
 
     setFilters(newFilters);
     applyFilters(newFilters);
   };
   const resetFilters = () => {
     setFilters({
       epsDilGrowth: [],
       pe: [],
       roe: [],
       divYield: [],
       price: "All",
       marketCap: "All",
       sector: "All",
       change: "All",
     });
   };
   const applyFilters = (newFilters) => {
     console.log(newFilters,"newfilter");
     const filteredStocks = screenerStockincomeData.filter((stock) => {
       console.log(parseFloat(stock.price.replace(/₹|,/g, "")) <= parseFloat(newFilters.price,))
       console.log(stock.price.replace(/₹|,/g, ""))
       const matchesPrice =
         newFilters.price === "All" ||
         parseFloat(stock.price.replace(/₹|,/g, "")) <= parseFloat(newFilters.price);
 
         // const matchesMarketCap =
         // newFilters.marketCap.length !== 0 || // Check if it's empty
         // newFilters.marketCap.some((cap) => {
         //   const stockMarketCap = parseFloat(stock.marketCap.replace("T", ""));
         //   if (cap === "large" && stockMarketCap > 10) return true;
         //   if (cap === "mid" && stockMarketCap > 2 && stockMarketCap <= 10) return true;
         //   if (cap === "small" && stockMarketCap > 0.5 && stockMarketCap <= 2) return true;
         //   if (cap === "micro" && stockMarketCap <= 0.5) return true;
         //   if (cap === "others" && stockMarketCap > 0) return true;
         //   return false;
         // });
       
 
         const matchesDivYield =
         newFilters.divYield.length === 0 ||
         newFilters.divYield.some((divYieldValue) => {
           const stockDivYield = parseFloat(stock.divYield.replace("%", ""));
           if (divYieldValue === "10-above" && stockDivYield >= 10) return true;
           if (divYieldValue === "5-above" && stockDivYield >= 5) return true;
           if (divYieldValue === "2-below" && stockDivYield <= 2) return true;
           if (divYieldValue === "0-2" && stockDivYield > 0 && stockDivYield <= 2) return true;
           return false;
         });
         
       const matchesSector =
         newFilters.sector === "All" || stock.sector === newFilters.sector;
 
       // const matchesChange =
       //   newFilters.change === "All" ||
       //   (newFilters.change === "-5" && parseFloat(stock.change) <= -5) ||
       //   (newFilters.change === "0" && parseFloat(stock.change) >= 0) ||
       //   (newFilters.change === "5" && parseFloat(stock.change) >= 5) ||
       //   (newFilters.change === "10" && parseFloat(stock.change) >= 10);
 
       const matchesROE =
         newFilters.roe.length === 0 ||
         newFilters.roe.some((roeValue) => {
           if (roeValue === "30" && parseFloat(stock.roe) >= 30) return true;
           if (roeValue === "15" && parseFloat(stock.roe) >= 15) return true;
           if (roeValue === "0-above" && parseFloat(stock.roe) >= 0) return true;
           if (roeValue === "0-below" && parseFloat(stock.roe) < 0) return true;
           if (roeValue === "15-below" && parseFloat(stock.roe) < 15) return true;
           return false;
         });
         const matchesEPSDilGrowth =
       newFilters.epsDilGrowth.length === 0 ||
       newFilters.epsDilGrowth.some((epsValue) => {
         const stockEPS = parseFloat(stock.epsDilGrowth.replace("%", ""));
         if (epsValue === "50-above" && stockEPS >= 50) return true;
         if (epsValue === "25-above" && stockEPS >= 25) return true;
         if (epsValue === "10-below" && stockEPS <= 10) return true;
         if (epsValue === "0-above" && stockEPS >= 0) return true;
         if (epsValue === "0-below" && stockEPS < 0) return true;
         if (epsValue === "-25-below" && stockEPS <= -25) return true;
         return false;
       });
      
       
   // PE filter
   const matchesPE =
   newFilters.pe.length === 0 ||
   newFilters.pe.some((peValue) => {
     const stockPE = parseFloat(stock.pe || "0");
     if (peValue === "50-above" && stockPE >= 50) return true;
     if (peValue === "25-50" && stockPE >= 25 && stockPE < 50) return true;
     if (peValue === "15-25" && stockPE >= 15 && stockPE < 25) return true;
     if (peValue === "0-15" && stockPE >= 0 && stockPE < 15) return true;
     if (peValue === "25-below" && stockPE < 25) return true;
     if (peValue === "15-below" && stockPE < 15) return true;
     if (peValue === "0-above" && stockPE >= 0) return true;
     return false;
   });
       return (
         matchesPrice &&
         // matchesMarketCap &&
         matchesDivYield &&
         matchesSector &&
         // matchesChange &&
         matchesROE &&
         matchesEPSDilGrowth &&
         matchesPE
       );
     });
 
     setStocks(filteredStocks);
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
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
 
 const [performanceRange, setPerformanceRange] = useState({ min: -30, max: 40 });
 
 const handlePerformanceRangeChange = (value) => {
   setPerformanceRange((prevRange) => ({
     ...prevRange,
     min: value,
     max: value, // Both min and max are the same, creating a single slider
   }));
 };
 
 const applyRange = () => {
   console.log("Performance Range Applied:", performanceRange);
   //setPerfDropdownVisible(false); // Close dropdown after applying
 };
 
 
 const resetchangeRange = () => {
     setChangeRange({ min: -50, max: 100 });
 };
 
 
 const resetRange = () => {
   setPerformanceRange({ min: -30, max: 40 });
 };
   // Sector dropdown logic
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedSectors, setSelectedSectors] = useState([]);
   const [selectedIndexes, setSelectedIndexes] = useState([]);
   const [selectedMcap, setSelectedMcap] = useState([]);
   const [selectedPe, setSelectedPe] = useState([]);
   const [selectedeps, setSelectedeps] = useState([]);
   const [selecteddivyield, setSelecteddivyield] = useState([]);
   const [selectedroe, setSelectedroe] = useState([]);
   const [selectedpeg, setSelectedpeg] = useState([]);
   const [selectedrevenuegrowth, setSelectedrevenuegrowth] = useState([]);
   const [selectedprice, setSelectedprice] = useState([]);
   const [selectedchange, setSelectedchange] = useState([]);
   const [selectedperf, setSelectedperf] = useState([]);
 
   const sectors = [
     "Agriculture and Chemicals",
     "Capital Goods",
     "Consumer Durables",
     "Financial Services",
     "Healthcare",
     "Metals & Mining",
     "Private Bank",
     "Services",
     "Automobile and Auto Components",
     "Construction & Materials",
     "Consumer Services",
     "Fast Moving Consumer Goods",
     "IT",
     "Media Entertainment & Publication",
     "Public Bank",
     "Telecommunication",
     "Aviation",
     "Construction",
     "Energy (Oil & Gas)",
     "Forest Materials",
     "Logistics and Shipping",
     "Power",
     "Real Estate",
     "Textiles",
   ];
 
  
   const indexes = [
     "Nifty 50",
     "Nifty 500",
     "Nifty Midcap 100",
     "Nifty Smallcap 100",
     "Nifty Alpha 50",
     "Nifty Bank",
     "Nifty 100",
     "Nifty Next 50",
     "Nifty Midcap 150",
     "Nifty Smallcap 250",
     "Nifty50 Value 20",
     "Nifty Commodities",
     "Nifty 200",
     "Nifty LargeMidcap 250",
     "Nifty Midcap 50",
     "Nifty Smallcap 50",
     "Nifty Auto",
     "Nifty CPSE",
   ];
   const marketCapCategory = ["Large Cap", "Mid Cap", "Small Cap", "Micro Cap", "Other"];
   const peFilterOptions = [
    { value: "0-above", label: "0 and above" },
    { value: "15-below", label: "15 and below" },
    { value: "15-25", label: "15 to 25" },
    { value: "25-50", label: "25 to 50" },
    { value: "50-above", label: "50 and above" }
  ];
  
  const epsDilGrowthOptions = [
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below", // This is the one you're referring to
    },
    {
      label: "10% and below",
      value: "10-below",
    },
    {
      label: "25% and above",
      value: "25-above",
    },
    {
      label: "50% and above",
      value: "50-above",
    },
    {
      label: "-25% and below",
      value: "-25-below",
    },
  ];
  
  const divYieldOptions = [
    {
      label: "0% to 2%",
      value: "0-2", // This is the specific data you're referring to
    },
    {
      label: "2% and below",
      value: "2-below",
    },
    {
      label: "5% and above",
      value: "5-above",
    },
    {
      label: "10% and above",
      value: "10-above",
    },
  ];
  
  const roeOptions = [
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below",
    },
    {
      label: "15% and above",
      value: "15",
    },
    {
      label: "15% and below",
      value: "15-below",
    },
    {
      label: "30% and above",
      value: "30",
    },
  ];
  
  const pegOptions = [
    {
      label: "0.9 to 1.1",
      value: "0.9-1.1",
    },
    {
      label: "0.5 and below",
      value: "0.5-below",
    },
    {
      label: "1 and above",
      value: "1-above",
    },
    {
      label: "1 and below",
      value: "1-below",
    },
    {
      label: "2 and above",
      value: "2-above",
    },
    {
      label: "2 and below",
      value: "2-below",
    },
  ];
  
  const revenueGrowthOptions = [
    { label: "0% and above", value: "0-above" },
    { label: "0% and below", value: "0-below" },
    { label: "10% and below", value: "10-below" },
    { label: "25% and above", value: "25-above" },
    { label: "50% and above", value: "50-above" },
    { label: "-25% and below", value: "-25-below" },
  ];
  
  const priceOptions = [
  { label: "5 and below", value: "5-below" },
  { label: "10 and below", value: "10-below" },
  { label: "10 to 100", value: "10-100" },
  { label: "100 and above", value: "100" },
  { label: "Up to 500", value: "500" },
  { label: "Up to 1000", value: "1000" },
  { label: "Up to 5000", value: "5000" },
];
const changeOptions = [
  { label: "0% and below", value: "0-below" },
  { label: "0% and above", value: "0-above" },
  { label: "0% to 5%", value: "0-5" },
 { label: "5% and above", value: "5-above" },
  { label: "10% and above", value: "10-above" },
  {label: "20% and above", value: "20-above" },
  { label: "30% and above", value: "30-above" },
  { label: "-5% to 0%", value: "-5-0" },
  { label: "-5% and below", value: "-5-below" },
  { label: "-10% and below", value: "-10-below" },
  { label: "-20% and below", value: "-20-below" },
  { label: "-30% and below", value: "-30-below" },
];
const perfOptions = [
  { label: "0% and below", value: "0-below" },
  { label: "0% and above", value: "0-above" },
  { label: "0% to 5%", value: "0-5" },
  { label: "5% and above", value: "5-above" },
  { label: "10% and above", value: "10-above" },
  { label: "20% and above", value: "20-above" },
  { label: "30% and above", value: "30-above" },
  { label: "-5% to 0%", value: "-5-0" },
  { label: "-5% and below", value: "-5-below" },
  { label: "-10% and below", value: "-10-below" },
  { label: "-20% and below", value: "-20-below" },
  { label: "-30% and below", value: "-30-below" },
];

  const handleSearchChange = (e) => {
     setSearchTerm(e.target.value);
   };
 
   const filteredSectors = sectors.filter((sector) =>
     sector.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const filteredIndexes = indexes.filter((index) =>
     index.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const filteredmarketCapCategory = marketCapCategory.filter((marketCapCategory) =>
     marketCapCategory.toLowerCase().includes(searchTerm.toLowerCase())
   );
 const [dropdowns, setDropdowns] = useState({
       divYield: false,
       price: false,
       change: false, 
       eps: false,
       roe: false,
       pe: false,
       marketcap: false,
       performance: false,
       peg: false,
       revenue: false,
       index: false,
       sector: false,
     });
   
   
  const handleReset = () => {
           setSelectedSectors([]);  // Reset selected sectors
           setSearchTerm("");       // Reset search term
           setSelectedIndexes([]);
           setSelectedMcap([]);
           setSelectedPe([]);
           setSelectedeps([]);
           setSelecteddivyield([]);
           setSelectedroe([]);
           setSelectedpeg([]);
           setSelectedrevenuegrowth([]);
           setSelectedprice([]);
           setSelectedchange([]);
           setSelectedperf([]);
       
           //close the dropdown
           setDropdowns((prev) => ({
               ...prev,
               peg: false, 
               roe: false,
               revenue: false,
               price: false,
               change: false, 
               divYield: false, 
               eps: false, 
               pe: false,
               marketcap: false,
               index: false,
               sector: false,
               performance: false,
               // Close PEG dropdown
       
           }));
       };
       
         const handleApply = () => {
           // Update the filters with the selected indexes and sectors
           setFilters((prevFilters) => ({
             ...prevFilters,
             index: selectedIndexes,
           
           }));
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           // Apply the filter based on the selected indexes and sectors
           const filteredStocks = screenerStockincomeData.filter((stock) =>
             selectedIndexes.includes(stock.index) 
           );
           // Update the stocks with the filtered data
            // Update the stocks with the filtered data
            setStocks(filteredStocks);
       
            // close the dropdown
            setDropdowns((prev) => ({
                ...prev,
                index: false, // Close PEG dropdown
            }));
        
            //Scroll smoothly to the stocks table
            setTimeout(() => {
                const tableElement = document.getElementById("stocks-table");
                if (tableElement) {
                    tableElement.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Small delay to ensure UI updates properly
        };
       
         const handlesectorApply = () => {
           // Update the filters with the selected indexes and sectors
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           setFilters((prevFilters) => ({
             ...prevFilters,
            
             sector: selectedSectors, // Assuming selectedSectors is an array of selected sectors
           }));
         
           // Apply the filter based on the selected indexes and sectors
           const filteredStocks = screenerStockincomeData.filter((stock) =>
              selectedSectors.includes(stock.sector)
           );
         // Update the stocks with the filtered data
         setStocks(filteredStocks);
       
         // close the dropdown
         setDropdowns((prev) => ({
             ...prev,
             sector: false, // Close PEG dropdown
         }));
       
         //Scroll smoothly to the stocks table
         setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
                 tableElement.scrollIntoView({ behavior: "smooth" });
             }
         }, 100); // Small delay to ensure UI updates properly
       };
       
       const handlemcapApply = () => {
         // Update the filters with the selected market cap categories
         setFilters((prevFilters) => ({
             ...prevFilters,
             marketCapCategory: selectedMcap, // Assuming selectedMcap is an array of selected categories
         }));
       
         // Filter the stocks based on the selected market cap categories
         if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
         const filteredStocks = screenerStockincomeData.filter((stock) =>
             selectedMcap.includes(stock.marketCapCategory)
         );
       
         // Update the stocks with the filtered data
         setStocks(filteredStocks);
       
         //  Corrected way to close the dropdown
         setDropdowns((prev) => ({
             ...prev,
             marketcap: false, // Corrected key (should match toggleDropdown)
         }));
       
         // Scroll smoothly to the stocks table
         setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
                 tableElement.scrollIntoView({ behavior: "smooth" });
             }
         }, 100); // Small delay to ensure UI updates properly
       };
       
       
         const handlePeApply = () => {
           // Filter stocks based on the selected P/E range
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             const stockPe = parseFloat(stock.pToE);
             return selectedPe.some((range) => {
               switch (range) {
                 case "50-above":
                   return stockPe >= 50;
                 case "25-50":
                   return stockPe >= 25 && stockPe < 50;
                 case "15-25":
                   return stockPe >= 15 && stockPe < 25;
                 case "15-below":
                   return stockPe < 15;
                 case "0-above":
                   return stockPe >= 0; // Includes all positive values
                 default:
                   return false;
               }
             });
           });
         
              // Update the stocks with the filtered data
              setStocks(filteredStocks);
       
              // close the dropdown
              setDropdowns((prev) => ({
                  ...prev,
                  pe: false, // Close PEG dropdown
              }));
          
              //Scroll smoothly to the stocks table
              setTimeout(() => {
                  const tableElement = document.getElementById("stocks-table");
                  if (tableElement) {
                      tableElement.scrollIntoView({ behavior: "smooth" });
                  }
              }, 100); // Small delay to ensure UI updates properly
          };
         
         const handleEPSApply = () => {
           // Filter stocks based on the selected EPS Dil Growth range
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             const stockEpsGrowth = parseFloat(stock.epsDilGrowth); // Assuming `epsDilGrowth` is the field in the stock data
             return selectedeps.some((range) => {
               switch (range) {
                 case "50-above":
                   return stockEpsGrowth >= 50;
                 case "25-above":
                   return stockEpsGrowth >= 25;
                 case "10-below":
                   return stockEpsGrowth <= 10;
                 case "0-above":
                   return stockEpsGrowth >= 0;
                 case "0-below":
                   return stockEpsGrowth <= 0;
                 case "-25-below":
                   return stockEpsGrowth <= -25;
                 default:
                   return false;
               }
             });
           });
         
           // Update the stocks with the filtered data
           setStocks(filteredStocks);
       
           // close the dropdown
           setDropdowns((prev) => ({
               ...prev,
               eps: false, // Close PEG dropdown
           }));
       
           //Scroll smoothly to the stocks table
           setTimeout(() => {
               const tableElement = document.getElementById("stocks-table");
               if (tableElement) {
                   tableElement.scrollIntoView({ behavior: "smooth" });
               }
           }, 100); // Small delay to ensure UI updates properly
       };
       
         const handleDivYieldApply = () => {
           // Filter stocks based on the selected Dividend Yield range
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             const stockDivYield = parseFloat(stock.divYield); // Assuming `divYield` is the field in the stock data
             return selecteddivyield.some((range) => {
               switch (range) {
                 case "10-above":
                   return stockDivYield >= 10;
                 case "5-above":
                   return stockDivYield >= 5;
                 case "2-below":
                   return stockDivYield <= 2;
                 case "0-2":
                   return stockDivYield >= 0 && stockDivYield <= 2; // Covers 0% to 2%
                 default:
                   return false;
               }
             });
           });
         
           // Update the stocks with the filtered data
           setStocks(filteredStocks);
       
           // close the dropdown
           setDropdowns((prev) => ({
               ...prev,
               divYield: false, // Close PEG dropdown
           }));
       
           //Scroll smoothly to the stocks table
           setTimeout(() => {
               const tableElement = document.getElementById("stocks-table");
               if (tableElement) {
                   tableElement.scrollIntoView({ behavior: "smooth" });
               }
           }, 100); // Small delay to ensure UI updates properly
       };
         
         const handleROEApply = () => {
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           // Filter stocks based on the selected ROE range
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             const stockROE = parseFloat(stock.roe); // Assuming `roe` is the field in the stock data
             return selectedroe.some((range) => {
               switch (range) {
                 case "30":
                   return stockROE >= 30; // 30% and above
                 case "15":
                   return stockROE >= 15; // 15% and above
                 case "0-above":
                   return stockROE >= 0; // 0% and above
                 case "0-below":
                   return stockROE <= 0; // 0% and below
                 case "15-below":
                   return stockROE <= 15; // 15% and below
                 default:
                   return false;
               }
             });
           });
         
           // Update the stocks with the filtered data
           setStocks(filteredStocks);
       
       
           setDropdowns((prev) => ({
               ...prev,
               roe: false, // Close PEG dropdown
           }));
       
           setTimeout(() => {
               const tableElement = document.getElementById("stocks-table");
               if (tableElement) {
                   tableElement.scrollIntoView({ behavior: "smooth" });
               }
           }, 100); // Small delay to ensure UI updates properly
       };
         const [pegDropdownVisible, setPegDropdownVisible] = useState(false);
       
         const handlePEGApply = () => {
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
       
           // Filter stocks based on the selected PEG range
           const filteredStocks = screenerStockincomeData.filter((stock) => {
               const stockPEG = parseFloat(stock.peg);
               return selectedpeg.some((range) => {
                   switch (range) {
                       case "2-above":
                           return stockPEG >= 2;
                       case "2-below":
                           return stockPEG <= 2;
                       case "1-above":
                           return stockPEG >= 1;
                       case "1-below":
                           return stockPEG <= 1;
                       case "0.9-1.1":
                           return stockPEG >= 0.9 && stockPEG <= 1.1;
                       case "0.5-below":
                           return stockPEG <= 0.5;
                       default:
                           return false;
                   }
               });
           });
       
           // Update the stocks with the filtered data
           setStocks(filteredStocks);
       
           // close the dropdown
           setDropdowns((prev) => ({
               ...prev,
               peg: false, // Close PEG dropdown
           }));
       
           //Scroll smoothly to the stocks table
           setTimeout(() => {
               const tableElement = document.getElementById("stocks-table");
               if (tableElement) {
                   tableElement.scrollIntoView({ behavior: "smooth" });
               }
           }, 100); // Small delay to ensure UI updates properly
       };
       
         
         const handleRevenueGrowthApply = () => {
           // Filter stocks based on the selected Revenue Growth range
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             const stockRevenueGrowth = parseFloat(stock.revenueGrowth); // Assuming `revenueGrowth` is the field in the stock data
             return selectedrevenuegrowth.some((range) => {
               switch (range) {
                 case "50-above":
                   return stockRevenueGrowth >= 50; // 50% and above
                 case "25-above":
                   return stockRevenueGrowth >= 25; // 25% and above
                 case "10-below":
                   return stockRevenueGrowth <= 10; // 10% and below
                 case "0-above":
                   return stockRevenueGrowth >= 0; // 0% and above
                 case "0-below":
                   return stockRevenueGrowth <= 0; // 0% and below
                 case "-25-below":
                   return stockRevenueGrowth <= -25; // -25% and below
                 default:
                   return false;
               }
             });
           });
         
          // Update the stocks with the filtered data
          setStocks(filteredStocks);
       
          // close the dropdown
          setDropdowns((prev) => ({
              ...prev,
              revenue: false, // Close PEG dropdown
          }));
       
          //Scroll smoothly to the stocks table
          setTimeout(() => {
              const tableElement = document.getElementById("stocks-table");
              if (tableElement) {
                  tableElement.scrollIntoView({ behavior: "smooth" });
              }
          }, 100); // Small delay to ensure UI updates properly
       };
         
         const handlePriceApply = () => {
           // Filter stocks based on the selected price range
           if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             // Parse the stock price, removing currency symbols and commas
             const stockPrice = parseFloat(stock.price.replace(/₹|,/g, ""));
         
             return selectedprice.some((range) => {
               switch (range) {
                 case "5000":
                   return stockPrice <= 5000; // Up to 5000
                 case "1000":
                   return stockPrice <= 1000; // Up to 1000
                 case "500":
                   return stockPrice <= 500; // Up to 500
                 case "100":
                   return stockPrice >= 100; // 100 and above
                 case "10-100":
                   return stockPrice >= 10 && stockPrice < 100; // Between 10 and 100
                 case "10-below":
                   return stockPrice < 10 && stockPrice >= 5; // Between 5 and 10
                 case "5-below":
                   return stockPrice < 5; // Below 5
                 case "above-ema-50":
                   return stock.priceEMA50 && stockPrice > stock.priceEMA50; // Above EMA (50)
                 case "below-ema-50":
                   return stock.priceEMA50 && stockPrice < stock.priceEMA50; // Below EMA (50)
                 case "crosses-bb-upper":
                   return stock.bbUpper && stockPrice > stock.bbUpper; // Crosses BB Upper
                 case "crosses-bb-lower":
                   return stock.bbLower && stockPrice < stock.bbLower; // Crosses BB Lower
                 default:
                   return false;
               }
             });
           });
         
           // Update the stocks with the filtered data
           setStocks(filteredStocks);
       
           // close the dropdown
           setDropdowns((prev) => ({
               ...prev,
               price: false, // Close PEG dropdown
           }));
       
           //Scroll smoothly to the stocks table
           setTimeout(() => {
               const tableElement = document.getElementById("stocks-table");
               if (tableElement) {
                   tableElement.scrollIntoView({ behavior: "smooth" });
               }
           }, 100); // Small delay to ensure UI updates properly
       };
       const handleChangeApply = () => {
         // Filter stocks based on the selected change range
         if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
     
         const filteredStocks = screenerStockincomeData.filter((stock) => {
             //  Check if stock.change exists before using replace
             if (!stock.change) return false;
     
             // Parse the change percentage, removing any symbols like `%`, `₹`, or `,`
             const stockChangePercentage = parseFloat(stock.change.replace(/%|₹|,/g, ""));
     
             return selectedchange.some((range) => {
                 switch (range) {
                     case "30-above":
                         return stockChangePercentage >= 30;
                     case "20-above":
                         return stockChangePercentage >= 20;
                     case "10-above":
                         return stockChangePercentage >= 10;
                     case "5-above":
                         return stockChangePercentage >= 5;
                     case "0-5":
                         return stockChangePercentage >= 0 && stockChangePercentage <= 5;
                     case "0-above":
                         return stockChangePercentage >= 0;
                     case "0-below":
                         return stockChangePercentage < 0;
                     case "-5-0":
                         return stockChangePercentage < 0 && stockChangePercentage >= -5;
                     case "-5-below":
                         return stockChangePercentage < -5;
                     case "-10-below":
                         return stockChangePercentage < -10;
                     case "-20-below":
                         return stockChangePercentage < -20;
                     case "-30-below":
                         return stockChangePercentage < -30;
                     default:
                         return false;
                 }
             });
         });
     
         // Update the stocks with the filtered data
         setStocks(filteredStocks);
     
         // Close the dropdown properly
         setDropdowns((prev) => ({
             ...prev,
             change: false, 
         }));
     
         // Scroll smoothly to the stocks table
         setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
                 tableElement.scrollIntoView({ behavior: "smooth" });
             }
         }, 100); 
     };
     
         const handleperfApply = () => {
              if (!screenerStockincomeData || !Array.isArray(screenerStockincomeData)) return;
           // Filter stocks based on the selected performance range
           const filteredStocks = screenerStockincomeData.filter((stock) => {
             // Safely parse the perf value, defaulting to 0 if undefined or invalid
             const stockperf = stock.perf ? parseFloat(stock.perf.replace(/%|₹|,/g, "")) : 0;
         
             return selectedperf.some((range) => {
               switch (range) {
                 case "30-above":
                   return stockperf >= 30; // 30% and above
                 case "20-above":
                   return stockperf >= 20; // 20% and above
                 case "10-above":
                   return stockperf >= 10; // 10% and above
                 case "5-above":
                   return stockperf >= 5; // 5% and above
                 case "0-5":
                   return stockperf >= 0 && stockperf <= 5; // 0% to 5%
                 case "0-above":
                   return stockperf >= 0; // 0% and above
                 case "0-below":
                   return stockperf < 0; // 0% and below
                 case "-5-0":
                   return stockperf < 0 && stockperf >= -5; // -5% to 0%
                 case "-5-below":
                   return stockperf < -5; // -5% and below
                 case "-10-below":
                   return stockperf < -10; // -10% and below
                 case "-20-below":
                   return stockperf < -20; // -20% and below
                 case "-30-below":
                   return stockperf < -30; // -30% and below
                 default:
                   return false;
               }
             });
           });
         
              // Update the stocks with the filtered data
              setStocks(filteredStocks);
       
              // close the dropdown
              setDropdowns((prev) => ({
                  ...prev,
                  performance: false, // Close PEG dropdown
              }));
          
              //Scroll smoothly to the stocks table
              setTimeout(() => {
                  const tableElement = document.getElementById("stocks-table");
                  if (tableElement) {
                      tableElement.scrollIntoView({ behavior: "smooth" });
                  }
              }, 100); // Small delay to ensure UI updates properly
          };
   
   const handleCheckboxChange = (index, sector,marketCapCategory,pToE,epsDilGrowth,divYield,roe,peg,revenueGrowth,price,change,perf) => {
     setSelectedIndexes((prev) => 
       prev.includes(index) 
       ? prev.filter((s) => s !== index) 
       : [...prev, index]
     );
     setSelectedSectors((prev) =>
       prev.includes(sector) // Check if the sector is already in the selected list
         ? prev.filter((s) => s !== sector) // If so, remove it
         : [...prev, sector] // Otherwise, add it
     );
     setSelectedMcap((prev) =>
       prev.includes(marketCapCategory) // Check if the category is already selected
         ? prev.filter((s) => s !== marketCapCategory) // If it is, remove it
         : [...prev, marketCapCategory] // If it isn't, add it to the list
     );
     setSelectedPe((prev) =>
       prev.includes( pToE) // Check if the category is already selected
         ? prev.filter((s) => s !== pToE) // If it is, remove it
         : [...prev,pToE] // If it isn't, add it to the list
     );
     setSelectedeps((prev) =>
       prev.includes(epsDilGrowth) // Check if the category is already selected
         ? prev.filter((s) => s !== epsDilGrowth) // If it is, remove it
         : [...prev,epsDilGrowth] // If it isn't, add it to the list
     );
     setSelecteddivyield((prev) =>
       prev.includes(divYield) // Check if the category is already selected
         ? prev.filter((s) => s !== divYield) // If it is, remove it
         : [...prev,divYield] // If it isn't, add it to the list
     );
     setSelectedroe((prev) =>
       prev.includes(roe) // Check if the category is already selected
         ? prev.filter((s) => s !== roe) // If it is, remove it
         : [...prev,roe] // If it isn't, add it to the list
     );
     setSelectedroe((prev) =>
       prev.includes(peg) // Check if the category is already selected
         ? prev.filter((s) => s !== peg) // If it is, remove it
         : [...prev,peg] // If it isn't, add it to the list
     );
     setSelectedrevenuegrowth((prev) =>
       prev.includes(revenueGrowth) // Check if the category is already selected
         ? prev.filter((s) => s !== revenueGrowth) // If it is, remove it
         : [...prev,revenueGrowth] // If it isn't, add it to the list
     );
     setSelectedprice((prev) =>
       prev.includes(price) // Check if the category is already selected
         ? prev.filter((s) => s !== price) // If it is, remove it
         : [...prev,price] // If it isn't, add it to the list
     );
     setSelectedchange((prev) =>
       prev.includes(change) // Check if the category is already selected
         ? prev.filter((s) => s !== change) // If it is, remove it
         : [...prev,change] // If it isn't, add it to the list
     );
     setSelectedperf((prev) =>
       prev.includes(perf) // Check if the category is already selected
         ? prev.filter((s) => s !== perf) // If it is, remove it
         : [...prev,perf] // If it isn't, add it to the list
     );
   }
 
   const filterStocksByChangeRange = () => {
     const filteredStocks = screenerStockincomeData.filter((stock) => {
       const stockChange = parseFloat(stock.change); // Assuming 'change' is the field in the stock data
       return stockChange >= changeRange.min && stockChange <= changeRange.max;
     });
 
     // Update the stocks with the filtered data
     setStocks(filteredStocks);
     console.log("Filtered by Change Range:", changeRange);
   };
   const handleNavigate = () => {
     navigate('/pricehalf'); // Navigate to the desired route
   };
   const recordsPerPage = 10;
   const totalPages = Math.ceil(stocks.length / recordsPerPage);
 
   //  Ensure currentData updates correctly
   const indexOfFirstItem = (currentPage - 1) * recordsPerPage;
   const indexOfLastItem = Math.min(indexOfFirstItem + recordsPerPage, stocks.length);
   const currentData = useMemo(() => {
     return stocks.slice(indexOfFirstItem, indexOfLastItem);
   }, [currentPage, stocks]);
 
   const handlePageChange = (pageNumber) => {
     if (pageNumber > 0 && pageNumber <= totalPages) {
       setCurrentPage(pageNumber);
     }
   };
 
   //  Debugging Effect: Confirm re-rendering when `currentPage` updates
   useEffect(() => {
     console.log("Current Page Updated:", currentPage);
   }, [currentPage]);
 
   //  Pagination Range Calculation
   const { startPage, endPage } = useMemo(() => {
     const maxVisiblePages = 5;
     let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
     let end = Math.min(totalPages, start + maxVisiblePages - 1);
 
     if (end - start + 1 < maxVisiblePages) {
       start = Math.max(1, end - maxVisiblePages + 1);
     }
 
     return { startPage: start, endPage: end };
   }, [currentPage, totalPages]);
  
   const toggleDropdown = (key) => {
  setDropdowns((prev) => {
    // Create a new object where all dropdowns are closed except the one being toggled
    const updatedDropdowns = Object.keys(prev).reduce((acc, currKey) => {
      acc[currKey] = currKey === key ? !prev[currKey] : false;
      return acc;
    }, {});
    return updatedDropdowns;
  });
};
  return (
    <div>
    <div className="screener-container">
      <h1 className="screener-header">List of Nifty 100 company</h1>
    <div className="screener-filters">
      {/* Filter for each parameter */}
      <div  className ="indexscreenerbuttonstockcontainar" style={{ position: "relative"}}>
    {/* Dropdown Button */}
   <button className="indexscreenerbuttonstock"
        onClick={() => toggleDropdown('index')}
      
    >
      Index <RiArrowDropDownLine size={24} />
    </button>

    {/* Dropdown Menu */}
    {dropdowns.index  && (
       <div className="stockindexscreeneropt"
     
      >
        {/* Search Box */}
       <div className="searchboxindexscreener"
           
        >
          <FaSearch style={{ marginRight: "4px", color: "#333" }} />
          <input
            type="text"
            placeholder="Search Index"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
            }}
          />
        </div>

        {/* Checkbox List */}
        <div
        className="index-optionsstocks" 
         
        >
          {filteredIndexes.map((index) => (
            <label
              key={index}
                className="index-optionscreener"
             
            >
              <input
                type="checkbox"
                checked={selectedIndexes.includes(index)}
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(index);
                }}
                style={{ width: "20%" }}
              />
              {index}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="resetapplybuttoncontainer">
          <button className="resetstockscreener"
            onClick={handleReset}
           
          >
            Reset
          </button>
         <button className="applystockscreener"
            onClick={handleApply}
           
          >
            Apply
          </button>
        </div>
      </div>
    )}

    {/* Display Filtered Data */}
    <div>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))
      ) : (
        <p>No data available for the selected index.</p>
      )}
    </div>
       
    
  </div>

   {/* Price Filter */}
   <div className="market-cap-filter">
    <div className="dropdown-market-cap-wrapper">
        {/* Filter for each parameter */}
        <div style={{ position: "relative"}}>
      {/* Dropdown Button */}
      <button className="dropdown-market-cap-toggle"
       onClick={() => toggleDropdown('price')}
        
      >
            Price <RiArrowDropDownLine size={24} />
      </button>

      {/* Dropdown Menu */}
      {dropdowns.price && (
        <div className="dropdown-market-cap-options"
         
        >
          
      
          
           

          {/* Checkbox List */}
         
     
  {priceOptions.map((category) => (
    <label  className="dropdown-market-cap-label" key={category.value}>
      <input
        type="checkbox"
        checked={selectedprice.includes(category.value)} // Check by the category value
        onChange={(e) => {
          e.stopPropagation();
          setSelectedprice((prev) =>
            prev.includes(category.value)
              ? prev.filter((item) => item !== category.value) // Remove category
              : [...prev, category.value] // Add category
          );
        }}
        style={{ width: "30%" }}
      />
      {category.label} {/* Correctly render the label */}
    </label>
  ))}


          {/* Buttons */}
          <div className="dropdown-market-cap-actions">
            <button
              onClick={handleReset}
                className="dropdown-market-cap-reset"
            >
              Reset
            </button>
            <button 
              onClick={handlePriceApply}
               className="dropdown-market-cap-apply"
            >
              Apply
            </button>
          </div>
        </div>
      )}
</div>
      {/* Display Filtered Data */}
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No data available for the selected index.</p>
        )}
      </div>
         </div>
    </div>

    <div className="market-cap-filter">
    <div className="dropdown-market-cap-wrapper">
        {/* Filter for each parameter */}
        <div style={{ position: "relative"}}>
      {/* Dropdown Button */}
      <button className="dropdown-market-cap-toggle"
        onClick={() => toggleDropdown('change')}
        
      >
            Change% <RiArrowDropDownLine size={24} />
      </button>

      {/* Dropdown Menu */}
      {dropdowns.change && (
        <div className="dropdown-market-cap-options"
         
        >
          
      
          
           

          {/* Checkbox List */}
         
     
  {changeOptions.map((category) => (
    <label  className="dropdown-market-cap-label" key={category.value}>
      <input
        type="checkbox"
        checked={selectedchange.includes(category.value)} // Check by the category value
        onChange={(e) => {
          e.stopPropagation();
          setSelectedchange((prev) =>
            prev.includes(category.value)
              ? prev.filter((item) => item !== category.value) // Remove category
              : [...prev, category.value] // Add category
          );
        }}
        style={{ width: "30%" }}
      />
      {category.label} {/* Correctly render the label */}
    </label>
  ))}


          {/* Buttons */}
          <div className="dropdown-market-cap-actions">
            <button
              onClick={handleReset}
                className="dropdown-market-cap-reset"
            >
              Reset
            </button>
            <button 
              onClick={handleChangeApply}
               className="dropdown-market-cap-apply"
            >
              Apply
            </button>
          </div>
        </div>
      )}
</div>
      {/* Display Filtered Data */}
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No data available for the selected index.</p>
        )}
      </div>
         </div>
    </div>

   <div className="market-cap-filter">
      <div className="dropdown-market-cap-wrapper">
          {/* Filter for each parameter */}
          <div style={{ position: "relative"}}>
        {/* Dropdown Button */}
        <button className="dropdown-market-cap-toggle"
          onClick={() => toggleDropdown('marketcap')}
          
        >
              Market Cap <RiArrowDropDownLine size={24} />
        </button>
  
        {/* Dropdown Menu */}
        {dropdowns.marketcap && (
          <div className="dropdown-market-cap-options"
           
          >
            {/* Search Box */}
           
  
            {/* Checkbox List */}
          
          
    {marketCapCategory.map((category) => (
      <label className="dropdown-market-cap-label"key={category} >
        <input
          type="checkbox"
          checked={selectedMcap.includes(category)} // Check if the category is selected
          onChange={(e) => {
            e.stopPropagation();
            setSelectedMcap((prev) =>
              prev.includes(category)
                ? prev.filter((item) => item !== category) // Remove category from selected
                : [...prev, category] // Add category to selected
            );
          }}style={{ width: "40%" }}
          
        />
        {category}
      </label>
    ))}
  
  
             
           
  
            {/* Buttons */}
            <div className="dropdown-market-cap-actions">
              <button
                onClick={handleReset}
                className="dropdown-market-cap-reset"
              >
                Reset
              </button>
              <button
                onClick={handlemcapApply}
                className="dropdown-market-cap-apply"
              >
                Apply
              </button>
            </div>
          </div>
        )}
  </div>
        {/* Display Filtered Data */}
        <div>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data available for the selected index.</p>
          )}
        </div>
           </div>
      </div>

  <div className="market-cap-filter">
     <div className="dropdown-market-cap-wrapper">
         {/* Filter for each parameter */}
         <div style={{ position: "relative"}}>
       {/* Dropdown Button */}
       <button className="dropdown-market-cap-toggle"
        onClick={() => toggleDropdown('pe')}
         
       >
            P/E <RiArrowDropDownLine size={24} />
       </button>
 
       {/* Dropdown Menu */}
       {dropdowns.pe && (
         <div className="dropdown-market-cap-options"
          
         >
           
       
           
            
 
           {/* Checkbox List */}
          
      
   {peFilterOptions.map((category) => (
     <label  className="dropdown-market-cap-label" key={category.value}>
       <input
         type="checkbox"
         checked={selectedPe.includes(category.value)} // Check by the category value
         onChange={(e) => {
           e.stopPropagation();
           setSelectedPe((prev) =>
             prev.includes(category.value)
               ? prev.filter((item) => item !== category.value) // Remove category
               : [...prev, category.value] // Add category
           );
         }}
         style={{ width: "30%" }}
       />
       {category.label} {/* Correctly render the label */}
     </label>
   ))}
 
 
           {/* Buttons */}
           <div className="dropdown-market-cap-actions">
             <button
               onClick={handleReset}
                 className="dropdown-market-cap-reset"
             >
               Reset
             </button>
             <button 
               onClick={handlePeApply}
                className="dropdown-market-cap-apply"
             >
               Apply
             </button>
           </div>
         </div>
       )}
 </div>
       {/* Display Filtered Data */}
       <div>
         {filteredData.length > 0 ? (
           filteredData.map((item) => (
             <div key={item.id}>
               <p>{item.name}</p>
             </div>
           ))
         ) : (
           <p>No data available for the selected index.</p>
         )}
       </div>
          </div>
     </div>

  <div className="market-cap-filter">
      <div className="dropdown-market-cap-wrapper">
          {/* Filter for each parameter */}
          <div style={{ position: "relative"}}>
        {/* Dropdown Button */}
        <button className="dropdown-market-cap-toggle"
         onClick={() => toggleDropdown('eps')}
          
        >
             EPS Dil Growth <RiArrowDropDownLine size={24} />
        </button>
  
        {/* Dropdown Menu */}
        {dropdowns.eps && (
          <div className="dropdown-market-cap-options"
           
          >
            
        
            
             
  
            {/* Checkbox List */}
           
       
    {epsDilGrowthOptions.map((category) => (
      <label  className="dropdown-market-cap-label" key={category.value}>
        <input
          type="checkbox"
          checked={selectedeps.includes(category.value)} // Check by the category value
          onChange={(e) => {
            e.stopPropagation();
            setSelectedeps((prev) =>
              prev.includes(category.value)
                ? prev.filter((item) => item !== category.value) // Remove category
                : [...prev, category.value] // Add category
            );
          }}
          style={{ width: "30%" }}
        />
        {category.label} {/* Correctly render the label */}
      </label>
    ))}
  
  
            {/* Buttons */}
            <div className="dropdown-market-cap-actions">
              <button
                onClick={handleReset}
                  className="dropdown-market-cap-reset"
              >
                Reset
              </button>
              <button 
                onClick={handleEPSApply}
                 className="dropdown-market-cap-apply"
              >
                Apply
              </button>
            </div>
          </div>
        )}
  </div>
        {/* Display Filtered Data */}
        <div>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data available for the selected index.</p>
          )}
        </div>
           </div>
      </div>

    <div className="market-cap-filter">
      <div className="dropdown-market-cap-wrapper">
          {/* Filter for each parameter */}
          <div style={{ position: "relative"}}>
        {/* Dropdown Button */}
        <button className="dropdown-market-cap-toggle"
        onClick={() => toggleDropdown('divYield')}
          
        >
              Div Yield % <RiArrowDropDownLine size={24} />
        </button>
  
        {/* Dropdown Menu */}
        {dropdowns.divYield && (
          <div className="dropdown-market-cap-options"
           
          >
            
        
            
             
  
            {/* Checkbox List */}
           
       
    {divYieldOptions.map((category) => (
      <label  className="dropdown-market-cap-label" key={category.value}>
        <input
          type="checkbox"
          checked={selecteddivyield.includes(category.value)} // Check by the category value
          onChange={(e) => {
            e.stopPropagation();
            setSelecteddivyield((prev) =>
              prev.includes(category.value)
                ? prev.filter((item) => item !== category.value) // Remove category
                : [...prev, category.value] // Add category
            );
          }}
          style={{ width: "30%" }}
        />
        {category.label} {/* Correctly render the label */}
      </label>
    ))}
  
  
            {/* Buttons */}
            <div className="dropdown-market-cap-actions">
              <button
                onClick={handleReset}
                  className="dropdown-market-cap-reset"
              >
                Reset
              </button>
              <button 
                onClick={handleDivYieldApply}
                 className="dropdown-market-cap-apply"
              >
                Apply
              </button>
            </div>
          </div>
        )}
  </div>
        {/* Display Filtered Data */}
        <div>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data available for the selected index.</p>
          )}
        </div>
           </div>
      </div>
    {/* Sector Dropdown */}
    <div  className ="indexscreenerbuttonstockcontainar"style={{ position: "relative"}}>
          <button className="indexscreenerbuttonstock"
   onClick={() => toggleDropdown('sector')}
    
  >
    Sectors <RiArrowDropDownLine size={24} />
  </button>
  
  
  
            {/* Dropdown Menu */}
            {dropdowns.sector && (
              <div className="stockindexscreeneropt"
               
              >
               <div className="searchboxindexscreener"
                  
                >
                  <FaSearch style={{ marginRight: "4px", color: "#333" }} />
                  <input
                    type="text"
                    placeholder="Search Sector"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                      border: "none",
                      outline: "none",
                      flex: 1,
                    }}
                  />
                </div>
  
                <div
        className="index-optionsstocks" >
    {filteredSectors.map((sector, index) => (
      <label key={sector}className="index-optionscreener" >
        <input
    type="checkbox"
    checked={selectedSectors.includes(sector)} // Check if the sector is selected
    onChange={(e) => {
      e.stopPropagation();
      setSelectedSectors((prev) => 
        prev.includes(sector) 
          ? prev.filter((s) => s !== sector) 
          : [...prev, sector]
      );
    }}
    style={{ width: "20%" }}
  />
        {sector}
      </label>
    ))}
  </div>
  <div className="resetapplybuttoncontainer">
                    <button className="resetstockscreener"
                    onClick={handleReset}
                   
                  >
                    Reset
                  </button>
                    <button className="applystockscreener"
                    onClick={handlesectorApply}
                    
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data available for the selected index.</p>
          )}
        </div>
        
  

  
         
        <div className="market-cap-filter">
    <div className="dropdown-market-cap-wrapper">
        {/* Filter for each parameter */}
        <div style={{ position: "relative"}}>
      {/* Dropdown Button */}
      <button className="dropdown-market-cap-toggle"
        onClick={() => toggleDropdown('performance')}
        
      >
           Perf% <RiArrowDropDownLine size={24} />
      </button>

      {/* Dropdown Menu */}
      {dropdowns.performance && (
        <div className="dropdown-market-cap-options"
         
        >
          
      
          
           

          {/* Checkbox List */}
         
     
  {perfOptions.map((category) => (
    <label  className="dropdown-market-cap-label" key={category.value}>
      <input
        type="checkbox"
        checked={selectedperf.includes(category.value)} // Check by the category value
        onChange={(e) => {
          e.stopPropagation();
          setSelectedperf((prev) =>
            prev.includes(category.value)
              ? prev.filter((item) => item !== category.value) // Remove category
              : [...prev, category.value] // Add category
          );
        }}
        style={{ width: "30%" }}
      />
      {category.label} {/* Correctly render the label */}
    </label>
  ))}


          {/* Buttons */}
          <div className="dropdown-market-cap-actions">
            <button
              onClick={handleReset}
                className="dropdown-market-cap-reset"
            >
              Reset
            </button>
            <button 
              onClick={handleperfApply}
               className="dropdown-market-cap-apply"
            >
              Apply
            </button>
          </div>
        </div>
      )}
</div>
      {/* Display Filtered Data */}
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No data available for the selected index.</p>
        )}
      </div>
         </div>
    </div>

  {/* Revenue Growth Dropdown */}
  <div className="market-cap-filter">
      <div className="dropdown-market-cap-wrapper">
          {/* Filter for each parameter */}
          <div style={{ position: "relative"}}>
        {/* Dropdown Button */}
        <button className="dropdown-market-cap-toggle"
          onClick={() => toggleDropdown('revenue')}
          
        >
              Revenue Growth <RiArrowDropDownLine size={24} />
        </button>
  
        {/* Dropdown Menu */}
        {dropdowns.revenue  && (
          <div className="dropdown-market-cap-options"
           
          >
            
        
            
             
  
            {/* Checkbox List */}
           
       
    {revenueGrowthOptions.map((category) => (
      <label  className="dropdown-market-cap-label" key={category.value}>
        <input
          type="checkbox"
          checked={selectedrevenuegrowth.includes(category.value)} // Check by the category value
          onChange={(e) => {
            e.stopPropagation();
            setSelectedrevenuegrowth((prev) =>
              prev.includes(category.value)
                ? prev.filter((item) => item !== category.value) // Remove category
                : [...prev, category.value] // Add category
            );
          }}
          style={{ width: "30%" }}
        />
        {category.label} {/* Correctly render the label */}
      </label>
    ))}
  
  
            {/* Buttons */}
            <div className="dropdown-market-cap-actions">
              <button
                onClick={handleReset}
                  className="dropdown-market-cap-reset"
              >
                Reset
              </button>
              <button 
                onClick={handleRevenueGrowthApply}
                 className="dropdown-market-cap-apply"
              >
                Apply
              </button>
            </div>
          </div>
        )}
  </div>
        {/* Display Filtered Data */}
        <div>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data available for the selected index.</p>
          )}
        </div>
           </div>
      </div>
    {/* PEG Dropdown */}
            <div className="market-cap-filter">
       <div className="dropdown-market-cap-wrapper">
           {/* Filter for each parameter */}
           <div style={{ position: "relative"}}>
         {/* Dropdown Button */}
         <button className="dropdown-market-cap-toggle"
           onClick={() => toggleDropdown('peg')}
           
         >
               PEG <RiArrowDropDownLine size={24} />
         </button>
   
         {/* Dropdown Menu */}
         {dropdowns.peg && (
           <div className="dropdown-market-cap-options"
            
           >
             
         
             
              
   
             {/* Checkbox List */}
            
        
     {pegOptions.map((category) => (
       <label  className="dropdown-market-cap-label" key={category.value}>
         <input
           type="checkbox"
           checked={selectedpeg.includes(category.value)} // Check by the category value
           onChange={(e) => {
             e.stopPropagation();
             setSelectedpeg((prev) =>
               prev.includes(category.value)
                 ? prev.filter((item) => item !== category.value) // Remove category
                 : [...prev, category.value] // Add category
             );
           }}
           style={{ width: "30%" }}
         />
         {category.label} {/* Correctly render the label */}
       </label>
     ))}
   
   
             {/* Buttons */}
             <div className="dropdown-market-cap-actions">
               <button
                 onClick={handleReset}
                   className="dropdown-market-cap-reset"
               >
                 Reset
               </button>
               <button 
                 onClick={handlePEGApply}
                  className="dropdown-market-cap-apply"
               >
                 Apply
               </button>
             </div>
           </div>
         )}
   </div>
         {/* Display Filtered Data */}
         <div>
           {filteredData.length > 0 ? (
             filteredData.map((item) => (
               <div key={item.id}>
                 <p>{item.name}</p>
               </div>
             ))
           ) : (
             <p>No data available for the selected index.</p>
           )}
         </div>
            </div>
       </div>
      <div className="market-cap-filter">
          <div className="dropdown-market-cap-wrapper">
              {/* Filter for each parameter */}
              <div style={{ position: "relative"}}>
            {/* Dropdown Button */}
            <button className="dropdown-market-cap-toggle"
            onClick={() => toggleDropdown('roe')}
              
            >
                  ROE <RiArrowDropDownLine size={24} />
            </button>
      
            {/* Dropdown Menu */}
            {dropdowns.roe && (
              <div className="dropdown-market-cap-options"
               
              >
                
            
                
                 
      
                {/* Checkbox List */}
               
           
        {roeOptions.map((category) => (
          <label  className="dropdown-market-cap-label" key={category.value}>
            <input
              type="checkbox"
              checked={selectedroe.includes(category.value)} // Check by the category value
              onChange={(e) => {
                e.stopPropagation();
                setSelectedroe((prev) =>
                  prev.includes(category.value)
                    ? prev.filter((item) => item !== category.value) // Remove category
                    : [...prev, category.value] // Add category
                );
              }}
              style={{ width: "30%" }}
            />
            {category.label} {/* Correctly render the label */}
          </label>
        ))}
      
      
                {/* Buttons */}
                <div className="dropdown-market-cap-actions">
                  <button
                    onClick={handleReset}
                      className="dropdown-market-cap-reset"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleROEApply}
                     className="dropdown-market-cap-apply"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
      </div>
            {/* Display Filtered Data */}
            <div>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                  </div>
                ))
              ) : (
                <p>No data available for the selected index.</p>
              )}
            </div>
               </div>
          </div>
          </div>
          <div className="tab-container">
          <button
          className={`tab-button ${activeTab === "Overview" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Overview");
            navigate('/nifty'); // Navigate to the StockScreenerList page
          }}
        >
          Overview
        </button>

        <button
          className={`tab-button ${activeTab === "Valuation" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Valuation");
            navigate('/netify100valuation'); // Navigate to the ScreenerStockvaluation page
          }}
        >
          Valuation
        </button>

        <button
          className={`tab-button ${activeTab === "Income Statement" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Income Statement");
            navigate('/netify100IncomeStatement'); // Add a route for Income Statement if needed
          }}
        >
          Income Statement
        </button>
        </div>
        <div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>
  <table className="screener-table" style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676' }}>
    <tr>
    <th>Symbol</th>
    <th>
      Revenue
      <button className="screenerbtnlist" onClick={() => handleSort("revenue")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Revenue Growth %
      <button className="screenerbtnlist" onClick={() => handleSort("revenueGrowth")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Gross Profit
      <button className="screenerbtnlist" onClick={() => handleSort("grossProfit")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Operating Income
      <button className="screenerbtnlist" onClick={() => handleSort("operatingIncome")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Net Income
      <button className="screenerbtnlist" onClick={() => handleSort("netIncome")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EBITDA
      <button className="screenerbtnlist" onClick={() => handleSort("ebitda")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EPS Diluted
      <button className="screenerbtnlist" onClick={() => handleSort("epsDil")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EPS Diluted Growth %
      <button className="screenerbtnlist" onClick={() => handleSort("epsDilGrowth")}>
        <PiCaretUpDownFill />
      </button>
    </th>
  </tr>
</thead>


          <tbody>
  {currentData.map((stock, index) => (
    <tr key={index} className="screener-row">
      <td className="symbol-cell">
      <img src={stock.icon} alt={`${stock.symbol} logo`} className="company-icon" />



      <a href={stock.url}>{stock.symbol}</a>
      </td>
      <td>{stock.revenue}</td>
      <td style={{ color: stock.revenueGrowth > 0 ? "#24b676" : "red" }}>
        {stock.revenueGrowth}%
      </td>
      <td>{stock.grossProfit || "-"}</td>
      <td>{stock.operatingIncome}</td>
      <td>{stock.netIncome}</td>
      <td>{stock.ebitda}</td>
      <td>{stock.epsDil}</td>
      <td style={{ color: stock.epsDilGrowth > 0 ? "#24b676" : "red" }}>
        {stock.epsDilGrowth}%
      </td>
                 


              </tr>
            ))}
          </tbody>
          
        </table>
       
  
     
      </div>
       {/* Pagination Section */}
   <div className="pagination-stockcontainer">
        <div className="pagination-info">
          {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${stocks.length} records`}
        </div>

        <div className="pagination-slider">
          <button className="pagination-button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>

          {startPage > 1 && (
            <>
              <button className="pagination-button" onClick={() => handlePageChange(1)}>1</button>
              {startPage > 2 && <span>...</span>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              className={`pagination-button ${currentPage === startPage + i ? "active-page" : ""}`}
              onClick={() => handlePageChange(startPage + i)}
            >
              {startPage + i}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span>...</span>}
              <button className="pagination-button" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </>
          )}

          <button className="pagination-button" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        </div>
      </div>
      <Navbar/>

</div>
 <div className="foooterpagesaupdate">
 <FooterForAllPage/>
 </div>

 </div>
);
};

export default Netify100IncomeStatement;