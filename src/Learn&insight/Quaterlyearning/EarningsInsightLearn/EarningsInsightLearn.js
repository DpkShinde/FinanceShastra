import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the sorting icon
import "./EarningsInsightLearn.css";
import Navbar from "../../../Navbar/Navbar";
import { LuShare2 } from "react-icons/lu";
import dayjs from "dayjs";
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";

const EarningsInsightLearn = () => {
    const earningsData = [
            { 
                srNo: 1,
                company: "State Bank of India",
                url: "/quaterelyOverview", 
                type: "Declared Results",
                resultType: "Q2-2024",
                ltp: "₹200.50",
                revenue: "₹1200",
                change: "1.25%",
                tentativeTime: "03 Dec 2024",
                grossProfit: "40%",
                netProfit: "15%",
                seeFinancial: {
                    url: "/quaterelyOverview", 
                    icon: <LuShare2 />
                },
                mcap: "₹5,000 Cr"
            },
            { 
                srNo: 2, 
                company: "Zinka Logistics Solutions", 
                url: "/zinka-logistics-solutions", 
                Type: "Upcoming Results", 
                resultType: "N/A", 
                ltp: "₹501.64", 
                revenue: "₹296", 
                change: "0.72%", 
                tentativeTime: "01 Dec 2024", 
                grossProfit: "-167", 
                netProfit: "25.08%", 
                seeFinancial: {
                    url: "/quaterelyOverview", 
                    icon: <LuShare2 />
                },
                mcap: "₹1,200 Cr"
            },
            { 
                srNo: 3, 
                company: "Globalspace Technologies", 
                url: "/globalspace-technologies", 
                Type: "Declared Results", 
                resultType: "Q2-2024", 
                ltp: "₹17.70", 
                revenue: "₹80", 
                change: "-3.41%", 
                tentativeTime: "02 Dec 2024", 
                grossProfit: "0.54", 
                netProfit: "19.83%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹800 Cr"
            },
            { 
                srNo: 4, 
                company: "Siel Financial Services", 
                url: "/siel-financial-services", 
                Type: "Upcoming Results", 
                resultType: "N/A", 
                ltp: "₹57.85", 
                revenue: "₹1000", 
                change: "4.32%", 
                tentativeTime: "04 Dec 2024", 
                grossProfit: "-0.11", 
                netProfit: "23.45%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹1,500 Cr"
            },
            { 
                srNo: 5, 
                company: "XYZ Corp", 
                url: "/xyz-corp", 
                Type: "Sector Analysis", 
                resultType: "N/A", 
                ltp: "₹1000.00", 
                revenue: "₹3000", 
                change: "2.10%", 
                tentativeTime: "05 Dec 2024", 
                grossProfit: "50%", 
                netProfit: "30%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹10,000 Cr"
            },
            { 
                srNo: 6, 
                company: "MNC Technologies", 
                url: "/mnc-technologies", 
                Type: "Sector Analysis", 
                resultType: "N/A", 
                ltp: "₹120.75", 
                revenue: "₹500", 
                change: "1.50%", 
                tentativeTime: "06 Dec 2024", 
                grossProfit: "40%", 
                netProfit: "25%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹2,000 Cr"
            },
            { 
                srNo: 7, 
                company: "Amkey Products", 
                url: "/amkey-products", 
                Type: "Upcoming Results", 
                resultType: "Q2-2024", 
                ltp: "₹63.00", 
                revenue: "₹500", 
                change: "-2.33%", 
                tentativeTime: "07 Dec 2024", 
                grossProfit: "30.08%", 
                netProfit: "19.25%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹700 Cr"
            },
            { 
                srNo: 8, 
                company: "Techno Solutions", 
                url: "/techno-solutions", 
                Type: "Declared Results", 
                resultType: "Q2-2024", 
                ltp: "₹500.00", 
                revenue: "₹2000", 
                change: "5.00%", 
                tentativeTime: "08 Dec 2024", 
                grossProfit: "35%", 
                netProfit: "20%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹6,000 Cr"
            },
            { 
                srNo: 9, 
                company: "Manjeera Constructions", 
                url: "/manjeera-constructions", 
                Type: "Upcoming Results", 
                resultType: "Q2-2024", 
                ltp: "₹37.12", 
                revenue: "₹100", 
                change: "4.88%", 
                tentativeTime: "09 Dec 2024", 
                grossProfit: "24.14%", 
                netProfit: "16.85%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹350 Cr"
            },
            { 
                srNo: 10, 
                company: "Ashiana Ispat", 
                url: "/ashiana-ispat", 
                Type: "Declared Results", 
                resultType: "Q2-2024", 
                ltp: "₹42.48", 
                revenue: "₹32", 
                change: "-2.41%", 
                tentativeTime: "10 Dec 2024", 
                grossProfit: "-3", 
                netProfit: "14.7%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹400 Cr"
            },
            { 
                srNo: 11, 
                company: "Nova Iron & Steel", 
                url: "/nova-iron-steel", 
                Type: "Declared Results", 
                resultType: "Q2-2024", 
                ltp: "₹18.39", 
                revenue: "₹99", 
                change: "-2.08%", 
                tentativeTime: "11 Dec 2024", 
                grossProfit: "-6", 
                netProfit: "12.58%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹450 Cr"
            },
            { 
                srNo: 12, 
                company: "Sagility India", 
                url: "/sagility-india", 
                Type: "Sector Analysis", 
                resultType: "N/A", 
                ltp: "₹45.17", 
                revenue: "₹1235", 
                change: "2.89%", 
                tentativeTime: "12 Dec 2024", 
                grossProfit: "175", 
                netProfit: "24.57%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹2,500 Cr"
            },
            { 
                srNo: 13, 
                company: "TOYAM SPORTS", 
                url: "/toyam-sports", 
                Type: "Upcoming Results", 
                resultType: "Q2-2024", 
                ltp: "₹2.34", 
                revenue: "₹49", 
                change: "-2.50%", 
                tentativeTime: "14 Dec 2024", 
                grossProfit: "-3", 
                netProfit: "27.58%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹150 Cr"
            },
            { 
                srNo: 14, 
                company: "ACME Solar Holdings", 
                url: "/acme-solar-holdings", 
                Type: "Upcoming Results", 
                resultType: "Q2-2024", 
                ltp: "₹232.95", 
                revenue: "₹260", 
                change: "-2.45%", 
                tentativeTime: "15 Dec 2024", 
                grossProfit: "161", 
                netProfit: "15%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹3,000 Cr"
            },
            { 
                srNo: 15, 
                company: "Niva Bupa Health Insurance", 
                url: "/niva-bupa-health-insurance", 
                Type: "Declared Results", 
                resultType: "Q2-2024", 
                ltp: "₹76.27", 
                revenue: "₹100", 
                change: "-4.40%", 
                tentativeTime: "16 Dec 2024", 
                grossProfit: "27.51%", 
                netProfit: "12.14%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹2,000 Cr"
            },
            { 
                srNo: 16, 
                company: "Aamcol Tools", 
                url: "/aamcol-tools", 
                Type: "Sector Analysis", 
                resultType: "Q2-2024", 
                ltp: "₹269.00", 
                revenue: "₹5", 
                change: "-2.13%", 
                tentativeTime: "17 Dec 2024", 
                grossProfit: "0.18", 
                netProfit: "21.47%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹80 Cr"
            },
            { 
                srNo: 17, 
                company: "BF Utilities", 
                url: "/bf-utilities", 
                Type: "Sector Analysis", 
                resultType: "Q2-2024", 
                ltp: "₹1004.50", 
                revenue: "₹808", 
                change: "-5.00%", 
                tentativeTime: "18 Dec 2024", 
                grossProfit: "0.61", 
                netProfit: "27.28%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹5,000 Cr"
            },
            { 
                srNo: 18, 
                company: "One Global Service Provider", 
                url: "/one-global-service-provider", 
                Type: "Upcoming Results", 
                resultType: "Q2-2024", 
                ltp: "₹331.85", 
                revenue: "₹19", 
                change: "5.00%", 
                tentativeTime: "19 Dec 2024", 
                grossProfit: "3", 
                netProfit: "19.04%", 
                seeFinancial: {
                    url: "/quaterlygraphtop", 
                    icon: <LuShare2 />
                },
                mcap: "₹500 Cr"
            }
        ];
        
    
    
        
    
        const [selectedEarningsTab, setSelectedEarningsTab] = useState("Today");
       
         useState("All");
        const [sortOrder, setSortOrder] = useState({});
       
        const [selectedFilter, setSelectedFilter] =useState("All");
        const [sortedData, setSortedData] = useState([...earningsData]);
        const [selectedMcapOption, setSelectedMcapOption] = useState("Market Cap");
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const [calendarOpen, setCalendarOpen] = useState(false);

    const handleEarningsTabChange = (tab) => {
        setSelectedEarningsTab(tab);
    };

    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    };



    const handleFilterChange = (selectedFilter) => {
        setSelectedFilter(selectedFilter); // Directly update the selected filter state
        
        // Handle the filtering logic based on the selected option
        if (selectedFilter === "Upcoming Results") {
            setSortedData(earningsData.filter(row => row.Type === "Upcoming Results"));
        } else if (selectedFilter === "Declared Results") {
            setSortedData(earningsData.filter(row => row.Type === "Declared Results"));
        } else {
            setSortedData([...earningsData]);  // Show all data if no filter
        }
    };
    

    const handleMcapOptionChange = (option) => {
        setSelectedMcapOption(option);
        const newSortOrder = sortOrder[option] === "asc" ? "desc" : "asc";
        const sorted = [...sortedData].sort((a, b) => {
            if (option === "Market Cap") {
                const valueA = parseFloat(a.mcap.replace('₹', '').replace(',', '').replace(' Cr', ''));
                const valueB = parseFloat(b.mcap.replace('₹', '').replace(',', '').replace(' Cr', ''));
                return newSortOrder === "desc" ? valueA - valueB : valueB - valueA;
            } else if (option === "Name") {
                return newSortOrder === "asc"
                    ? a.company.localeCompare(b.company)
                    : b.company.localeCompare(a.company);
            } else if (option === "Change%") {
                const valueA = parseFloat(a.change.replace('%', ''));
                const valueB = parseFloat(b.change.replace('%', ''));
                return newSortOrder === "desc" ? valueA - valueB : valueB - valueA;
            } else if (option === "Last Price") {
                const valueA = parseFloat(a.ltp.replace('₹', '').replace(',', ''));
                const valueB = parseFloat(b.ltp.replace('₹', '').replace(',', ''));
                return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            return 0;
        });
        setSortedData(sorted);
        setSortOrder((prevSortOrder) => ({
            ...prevSortOrder,
            [option]: newSortOrder,
        }));
    };


    // Generic sorting function for any column
    const handleSort = (column) => {
        const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
        const sorted = [...sortedData].sort((a, b) => {
            // Handle numeric columns like "LTP" and "Revenue (Cr.)"
            if (column === "ltp" || column === "revenue" || column === "mcap") {
                const valueA = parseFloat(a[column].replace('₹', '').replace(',', ''));
                const valueB = parseFloat(b[column].replace('₹', '').replace(',', ''));
                return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            // Handle other columns as strings
            if (newSortOrder === "asc") {
                return a[column] < b[column] ? -1 : 1; // Ascending
            } else {
                return a[column] > b[column] ? -1 : 1; // Descending
            }
        });

        setSortOrder((prevSortOrder) => ({
            ...prevSortOrder,
            [column]: newSortOrder,
        }));
        setSortedData(sorted);
    };

    const renderSortIcon = (column) => {
        return (
            <PiCaretUpDownFill />
        );
    };
    

    const CustomDropdown = ({ label, options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState(value);
    
        const handleOptionClick = (option) => {
            setSelectedOption(option);
            onChange(option);  // Pass the selected option directly to onChange
            setIsOpen(false); // Close the dropdown after selecting an option
        };
    
       
        return (
        
            <div className="customDropdown">
                <label className="dropdownLabel">{label}</label>
                <div className="dropdownSelect" onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption}
                    <span className="dropdownArrow">&#9662;</span>
                </div>
                {isOpen && (
                    <div className="dropdownOptions">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="dropdownOption"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };
    
    const options = [
        "All",
        "Upcoming Results",
        "Declared Results",
        "Sector Analysis",
    ];
    const mcapOptions = ["Market Cap", "Name", "Change%", "Last Price"];



    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Filter data based on the selected date range
        filterData(start, end);
    };

    // Function to filter the data based on the date range
    const filterData = (startDate, endDate) => {
        if (startDate && endDate) {
            const filteredData = earningsData.filter((row) => {
                const rowDate = new Date(row.tentativeTime).toISOString().split('T')[0];
                return rowDate >= startDate.toISOString().split('T')[0] && rowDate <= endDate.toISOString().split('T')[0];
            });
            setSortedData(filteredData);
        }
    };

  
    return (
        <div>
        <div className="earnings-insight-learn-wrapper">
            <header className="earnings-insight-learn-header">
                <h1 className="earnings-insight-learnh1">Quarterly Earning Results</h1>
                <p className="earnings-insight-learnp">
                    Looking for the best growth funds to accelerate your wealth creation? At Value Research, we’ve made the process easier for you. Our in-depth guide to top-performing growth funds
                    <br />
                    across different categories helps you find options that align with your long-term financial goals and maximize your potential for growth.
                </p>
            </header>

            <div className="earnings-insight-learn-controls">
                <div className="earnings-insight-learn-header-row">
                    <div className="earningquterlyrowall">
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
                    <div className="earnings-insight-learn-date-picker">
                        <div className="dateinsight">
                            <label htmlFor="dateRange" className="date-picker-label">Select Date Range: </label>
                            <div className="calendar-icon" onClick={() => setCalendarOpen(!calendarOpen)} >
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
                                     className="custom-date-picker"
                                    calendarClassName="custom-calendar" 
                                    onClickOutside={() => setCalendarOpen(false)}  // Close the calendar if clicked outside
                                />
                            )}
                        </div>
                     
                    
                    </div>
                    <div className="earnings-insight-learn-dropdown">
                    <CustomDropdown
    value={selectedMcapOption}
    onChange={handleMcapOptionChange}
    options={mcapOptions}
/>
                    </div>
                    <div className="earnings-insight-learn-dropdown">
                    <CustomDropdown
                          
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            options={options}
                        />
                    </div>
                </div>
            </div>

            <table className="earnings-insight-learn-table">
                <thead>
                    <tr>
                        <th> Sr.No.</th>
                        <th>Company</th>
                        <th onClick={() => handleSort("resultType")} style={{ cursor: "pointer" }}>
                            Result Type {renderSortIcon("resultType")}
                        </th>
                        <th onClick={() => handleSort("ltp")} style={{ cursor: "pointer" }}>
                            LTP ₹ {renderSortIcon("ltp")}
                        </th>
                        <th onClick={() => handleSort("mcap")} style={{ cursor: "pointer" }}>
    M.CAP (Cr.) {renderSortIcon("mcap")}
</th>
                        <th onClick={() => handleSort("revenue")} style={{ cursor: "pointer" }}>
                            Revenue (Cr.) {renderSortIcon("revenue")}
                        </th>
                        <th onClick={() => handleSort("change")} style={{ cursor: "pointer" }}>
                            Change % {renderSortIcon("change")}
                        </th>
                        <th onClick={() => handleSort("tentativeTime")} style={{ cursor: "pointer" }}>
                            Tentative Time {renderSortIcon("tentativeTime")}
                        </th>
                        <th onClick={() => handleSort("grossProfit")} style={{ cursor: "pointer" }}>
                            Gross Profit (Cr.) {renderSortIcon("grossProfit")}
                        </th>
                        <th onClick={() => handleSort("netProfit")} style={{ cursor: "pointer" }}>
                            Net Profit (Cr.) {renderSortIcon("netProfit")}
                        </th>
                        <th onClick={() => handleSort("seeFinancial")} style={{ cursor: "pointer" }}>
                            See Financials {renderSortIcon("seeFinancial")}
                        </th>
                    </tr>
                </thead>
                <tbody
                >
                    {sortedData.map((row, index) => (
                        <tr key={index}>
                            <td>{row. srNo}</td>
                            <td>
    <a href={row.url}>{row.company}</a>
</td>

                            <td>{row.resultType}</td>
                            <td>{row.ltp}</td>
                            <td>{row.mcap}</td>

                            <td>{row.revenue}</td>
                            <td>{row.change}</td>
                            <td>{row.tentativeTime}</td>
                            <td>{row.grossProfit}</td>
                            <td>{row.netProfit}</td>
                            <td> <a href={row.seeFinancial.url}>
      {row.seeFinancial.icon}
    </a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    <Navbar/>
        </div>
         <div className="foooterpagesaupdate">
         <FooterForAllPage />
       </div>
       </div>
    );
};

export default EarningsInsightLearn;