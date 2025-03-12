import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";
import "./SectorWeightageTableniftty50.css";
import Nifty50topheader from "../Nifty50topheader/Nifty50topheader";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";

const SectorWeightageTableniffty50 = () => {
  const initialData = [
    { sector: "Banks", companies: 6, weightage: "20.06%", marketCap: "₹37,64,732.90" },
    { sector: "IT - Software", companies: 5, weightage: "17.62%", marketCap: "₹33,05,809.80" },
    { sector: "Refineries", companies: 2, weightage: "9.49%", marketCap: "₹17,81,265.00" },
    { sector: "Automobiles", companies: 6, weightage: "7.64%", marketCap: "₹14,34,365.50" },
    { sector: "Telecom-Services", companies: 1, weightage: "4.81%", marketCap: "₹9,01,738.70" },
    { sector: "FMCG", companies: 3, weightage: "4.65%", marketCap: "₹8,71,933.00" },
    { sector: "Finance", companies: 3, weightage: "4.15%", marketCap: "₹7,79,626.70" },
    { sector: "Pharmaceuticals", companies: 3, weightage: "3.56%", marketCap: "₹6,68,327.00" },
    { sector: "Power Generation", companies: 2, weightage: "3.27%", marketCap: "₹6,13,540.90" },
    { sector: "Tobacco Products", companies: 1, weightage: "3.19%", marketCap: "₹5,98,426.10" },
    { sector: "Infrastructure Development", companies: 1, weightage: "2.67%", marketCap: "₹5,00,463.80" },
    { sector: "Steel", companies: 2, weightage: "2.14%", marketCap: "₹4,00,678.00" },
    { sector: "Cement", companies: 1, weightage: "1.75%", marketCap: "₹3,28,836.30" },
    { sector: "Crude oil & Natural Gas", companies: 1, weightage: "1.60%", marketCap: "₹3,00,605.80" },
    { sector: "Diamond, Gems & Jewellery", companies: 1, weightage: "1.59%", marketCap: "₹2,97,710.20" },
    { sector: "Insurance", companies: 2, weightage: "1.45%", marketCap: "₹2,72,942.70" },
    { sector: "Trading", companies: 1, weightage: "1.44%", marketCap: "₹2,70,459.60" },
    { sector: "Marine Port & Services", companies: 1, weightage: "1.36%", marketCap: "₹2,55,371.60" },
    { sector: "Retail", companies: 1, weightage: "1.33%", marketCap: "₹2,49,095.40" },
    { sector: "Mining & Mineral Products", companies: 1, weightage: "1.26%", marketCap: "₹2,36,956.90" },
    { sector: "Paints/Varnish", companies: 1, weightage: "1.17%", marketCap: "₹2,19,080.80" },
    { sector: "Aerospace & Defence", companies: 1, weightage: "1.14%", marketCap: "₹2,13,774.50" },
    { sector: "Textiles", companies: 1, weightage: "0.88%", marketCap: "₹1,64,741.60" },
    { sector: "Non Ferrous Metals", companies: 1, weightage: "0.75%", marketCap: "₹1,41,001.60" },
    { sector: "Healthcare", companies: 1, weightage: "0.55%", marketCap: "₹1,04,100.10" },
    { sector: "Plantation & Plantation", companies: 1, weightage: "0.48%", marketCap: "₹89,768.60" },
  ];

  const [sectorData, setSectorData] = useState(initialData);
  const [sortDirection, setSortDirection] = useState(true); // True for ascending, false for descending

  const handleSort = (key) => {
    const sortedData = [...sectorData].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      if (key === "marketCap" || key === "weightage") {
        valA = parseFloat(valA.replace(/[₹,%]/g, "").replace(/,/g, ""));
        valB = parseFloat(valB.replace(/[₹,%]/g, "").replace(/,/g, ""));
      }

      if (key === "sector") {
        return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return sortDirection ? valA - valB : valB - valA;
    });

    setSectorData(sortedData);
    setSortDirection(!sortDirection); // Toggle sort direction
  };

  return (
    <div>
       
         <Nifty50topheader/>
         <Navbar/>
         <div>
  <h1 className="sectorTableHeadingniffty50">Nifty 50 Sector Weightage</h1>
  <div className="sectorTableContainerniffty50" style={{ overflowY: 'auto', height: '410px' }}>
    <table className="NiftySectorWeightage-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead style={{ position: 'sticky', top: -21, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676',height:"30px" }}>
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
          {sectorData.map((item, index) => (
            <tr key={index} className="sectorTableRowniffty50">
               <td className="symbol-cell">{item.sector}</td>
              <td>{item.companies}</td>
              <td>{item.weightage}</td>
              <td>{item.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
   
    <div className="foooterpagesaupdate">
          <FooterForAllPage />
        </div>
  
    </div>
  );
};

export default SectorWeightageTableniffty50;
