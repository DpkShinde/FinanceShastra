import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiCaretUpDownFill } from "react-icons/pi"; 
import './NiftysectorWeightage.css'
const NiftySectorWeightage = () => {
  const navigate = useNavigate();

  const [sectorsweightData, setSectorsweightData] = useState([
    { sector: "Banks", companies: 6, weightage: "20.06%", marketCap: "₹37,64,732.90" },
    { sector: "IT - Software", companies: 5, weightage: "17.62%", marketCap: "₹33,05,809.80" },
    { sector: "Refineries", companies: 2, weightage: "9.49%", marketCap: "₹17,81,265.00" },
    { sector: "Automobiles", companies: 6, weightage: "7.64%", marketCap: "₹14,34,365.50" },
    { sector: "Telecom-Services", companies: 1, weightage: "4.81%", marketCap: "₹9,01,738.70" },
    { sector: "FMCG", companies: 3, weightage: "4.65%", marketCap: "₹8,71,933.00" },
    { sector: "Finance", companies: 3, weightage: "4.15%", marketCap: "₹7,79,626.70" },
    { sector: "Pharmaceuticals", companies: 3, weightage: "3.56%", marketCap: "₹6,68,327.00" },
  ]);

  const [sortDirection, setSortDirection] = useState(true); // True for ascending, false for descending

  const handleSort = (key) => {
    const sortedData = [...sectorsweightData].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Clean strings and convert to number for numeric comparison
      if (typeof valA === "string") {
        if (key === "marketCap" || key === "weightage") {
          valA = parseFloat(valA.replace(/[₹,%]/g, "").replace(/,/g, ""));
        }
      }

      if (typeof valB === "string") {
        if (key === "marketCap" || key === "weightage") {
          valB = parseFloat(valB.replace(/[₹,%]/g, "").replace(/,/g, ""));
        }
      }

      // For sector column, sort alphabetically
      if (key === "sector") {
        return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      // For numeric columns, sort numerically
      return sortDirection ? valA - valB : valB - valA;
    });

    setSectorsweightData(sortedData);
    setSortDirection(!sortDirection); // Toggle sort direction
  };
  const handleExploreSectors = () => {
    navigate("/SectorWeightageTableniffty50");
  };

  return (
    <div className="NiftySectorWeightage-weightage-container">
      <div className="NiftySectorWeightage-header">
        <h2 className="NiftySectorWeightage-title">Nifty 50 Sector Weightage</h2>
        <button className="NiftySectorWeightage-explore-btn" onClick={handleExploreSectors}>
          Explore the Sectors
        </button>
      </div>

      <div className="NiftySectorWeightage-table-wrapper">
        <table className="NiftySectorWeightage-table">
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676' }}>
            <tr>
              <th className="symbol-cell">Sectors</th>
              <th>
                Companies
                <PiCaretUpDownFill
                  onClick={() => handleSort("companies")}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              </th>
              <th>
                Weightage
                <PiCaretUpDownFill
                  onClick={() => handleSort("weightage")}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              </th>
              <th>
                Market cap (Cr.)
                <PiCaretUpDownFill
                  onClick={() => handleSort("marketCap")}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sectorsweightData.map((data, index) => (
              <tr key={index}className="screener-row">
                <td className="symbol-cell">{data.sector}</td>
                <td>{data.companies}</td>
                <td>{data.weightage}</td>
                <td>{data.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NiftySectorWeightage;
