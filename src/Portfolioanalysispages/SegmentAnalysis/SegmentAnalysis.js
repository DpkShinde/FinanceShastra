import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./SegmentAnalysis.css";
import SizeAnalysis from "../SizeAnalysis/SizeAnalysis";
import PortfolioMetrics from "../PortfolioMetrics/PortfolioMetrics";

const sectorData = [
  { name: "Tobacco Products", value: 29.89, color: "#6DB8FD" },
  { name: "IT - Software", value: 27.06, color: "#1774FF" },
  { name: "FMCG", value: 24.27, color: "#FF9177" },
  { name: "Banks", value: 17.12, color: "#EB5757" },
  { name: "Power Generation & Distribution", value: 1.66, color: "#5ECBC8" },
];

const industryData = [
  { name: "Cigarettes", value: 25.3, color: "#6DB8FD" },
  { name: "Computers - Software - Large", value: 27.8, color: "#1774FF" },
  { name: "Food - Processing - Others", value: 23.3, color: "#FF9177" },
  { name: "Banks - Private Sector", value: 18.7, color: "#EB5757" },
  { name: "Power Generation And Supply", value: 1.7, color: "#5ECBC8" },
];


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function SegmentAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState("Sector");
  const data = selectedCategory === "Sector" ? sectorData : industryData;

  return (
    <div>
     <h2 className="segment-title">Segment Analysis</h2>
    <div className="allsegmsize" >
    <div className="segment-card" style={{ flex: 1 }}>
     
      <div className="dropdowncaharportanana">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="dropdown-selectportana"
        >
          <option value="Sector">Sector</option>
          <option value="Industry">Industry</option>
        </select>
      </div>

      <div className="chartdonutportfolioana">
      <div className="chart-containerportana">
      <PieChart width={322} height={250} style={{ transform: "translateX(-19px)" }}>

  <Pie 
    data={data} 
    dataKey="value" 
    nameKey="name" 
    innerRadius={60} 
    outerRadius={90} 
  >
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip content={<CustomTooltip />} /> 
</PieChart>

      </div>

      <ul className="legend-listprtana">
  {data.map((entry) => (
    <li key={entry.name} className="legend-itemprtana">
      <span
        className="legend-colorprtana"
        style={{
          backgroundColor: entry.color,
          border: `2px solid ${entry.color}`,
          width: entry.name === "Banks" ? "15px" : "15px", // Custom size for Banks
        }}
      ></span>
      {entry.name} : {entry.value}%
    </li>
  ))}
</ul>

    </div>
    </div>
    <div className="size" style={{ flex: 1}}>
    <SizeAnalysis/>
    </div>
    </div>
    <PortfolioMetrics/>
  
    </div>
  );
}
