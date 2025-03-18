import React, { useState } from "react";
import './PerformancePortfolioAnalysis.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import varun from "../../assest/varunlogo.png";
import tcs from '../../assest/tcs.png';
import itc from "../../assest/itc.png";
import hdfc from "../../assest/hdfcbank.png";
import adani from "../../assest/adaniimg.png";


const PerformancePortfolioAnalysis = () => {
    // Define performanceData FIRST before using it in useState
    const performanceData = [
        {
            logo: itc,
            name: "ITC Ltd.",
            netSales: "TBA",
            netProfit: "TBA",
            profitMargin: "TBA",
        },
        {
            logo: hdfc,
            name: "HDFC Bank Ltd.",
            netSales: "₹1,12,193",
            salesChange: "-2.45%",
            salesColor: "red",
            netProfit: "₹18,340",
            profitChange: "+3.51%",
            profitColor: "#24b676",
            profitMargin: "16.35%",
            marginChange: "+6.17%",
            marginColor: "#24b676",
        },
        {
            logo: tcs,
            name: "Tata Consultancy Services Ltd.",
            netSales: "₹65,216",
            salesChange: "+6.14%",
            salesColor: "#24b676",
            netProfit: "₹12,380",
            profitChange: "+11.96%",
            profitColor: "#24b676",
            profitMargin: "18.98%",
            marginChange: "+5.44%",
            marginColor: "#24b676",
        },
        {
            logo: varun,
            name: "Varun Beverages Ltd.",
            netSales: "TBA",
            netProfit: "TBA",
            profitMargin: "TBA",
        },
        {
            logo: adani,
            name: "Adani Green energy Ltd.",
            netSales: "₹2,630",
            salesChange: "-1.68%",
            salesColor: "red",
            netProfit: "₹492",
            profitChange: "+92.19%",
            profitColor: "#24b676",
            profitMargin: "18.71%",
            marginChange: "+95.51%",
            marginColor: "#24b676",
        },
    ];

    // Now, use performanceData safely
    const [filteredstock, setFilteredstock] = useState(performanceData);
    const [sorttDirection, setSorttDirection] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSortresearch = (key) => {
        const sortedstock = [...filteredstock].sort((a, b) => {
            let valA = a[key];
            let valB = b[key];

            if (typeof valA === "string") {
                valA = parseFloat(valA.replace(/[\u20B9,%]/g, ""));
            }

            if (typeof valB === "string") {
                valB = parseFloat(valB.replace(/[\u20B9,%]/g, ""));
            }

            return sorttDirection ? valA - valB : valB - valA;
        });

        setFilteredstock(sortedstock);
        setSorttDirection((prev) => !prev);
    };

    return (
        <div className="stockresearchanalysispagecontainer">
            <div className="performanceportfolioanalysis-header">
                <h2 className="stockresearchatable-title">Performance Tracker</h2>
                <div className="date-pickerperfowrapper">
                <button
                    className="performanceportfolioanalysis-date-btn"
                    onClick={() => setShowDatePicker((prev) => !prev)} // Toggle visibility
                >
                    Select date {selectedDate ? selectedDate.toLocaleDateString() : ""}<FaRegCalendarAlt />
                </button>
                 {/* Date Picker (Hidden until button is clicked) */}
                 {showDatePicker && (
                       <div className="date-pickerperfcontainer">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setShowDatePicker(false); // Hide after selecting
                        }}
                        className="performanceportfolioanalysis-date-picker"
                        inline // Displays inline instead of a dropdown
                    />
                        </div>
                )}
</div>
                {/* Display Selected Date */}
                
            </div>
            <table className="stockresearchanalysispage-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>
                            Net sales
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("netSales")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            Net profit
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("netProfit")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            Profit margin
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("profitMargin")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredstock.map((company, index) => (
                        <tr key={index}>
                             <td>
                            <img src={company.logo} alt={company.name} className="Portfoliodetails-logo" />
                               
                            
                                {company.name}
                            </td>
                            <td>
                                {company.netSales}
                                {company.salesChange && (
                                    <span style={{ color: company.salesColor }}>
                                        {" "}
                                        ({company.salesChange})
                                    </span>
                                )}
                            </td>
                            <td>
                                {company.netProfit}
                                {company.profitChange && (
                                    <span style={{ color: company.profitColor }}>
                                        {" "}
                                        ({company.profitChange})
                                    </span>
                                )}
                            </td>
                            <td>
                                {company.profitMargin}
                                {company.marginChange && (
                                    <span style={{ color: company.marginColor }}>
                                        {" "}
                                        ({company.marginChange})
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="performanceportfolioanalysis-note">
                "The figures shown are for the current quarter compared to the same
                quarter in the previous year (YoY Change)."
            </p>
        </div>
    );
};

export default PerformancePortfolioAnalysis;
