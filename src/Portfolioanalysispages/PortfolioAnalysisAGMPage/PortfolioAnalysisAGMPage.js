
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hdfc from "../../assest/hdfcbank.png";
import adani from "../../assest/adaniimg.png";
import itc from "../../assest/itc.png";


const PortfolioAnalysisAGMPage = () => {
    const navigate = useNavigate();
    
  const [activeTab, setActiveTab] = useState("AGM / EGM");
  const [isUpcoming, setIsUpcoming] = useState(true);

  const PortfolioAnalysisamgPagedata = [
    {
     logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "25-09-2024",
      agenda: "EGM 25/09/2024",
    },
    {
      logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "25-09-2024",
      agenda:
        "EGM 25/09/2024 We submit herewith the Voting Results of the Extra...",
    },
    {
      logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda: "Outcome of the Board Meeting held on June 20, 2024",
    },
    {
      logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda:
        "Outcome of the Board Meeting held on June 20, 2024 Intimation under SEBI...",
    },
    {
     logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda:
        "Outcome of the Board Meeting held on June 20, 2024 Intimation under SEBI...",
    },
    {
      logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "03-09-2024",
      agenda:
        "EGM 09/03/2024 Notice of EGM dated 09.03.2024 (As Per BSE Announcement...",
    },
    {
     logo: itc,
      company: "ITC Ltd.",
      exDate: "26-07-2024",
      agenda:
        "Recommended Final Dividend off 7.50 per Ordinary Share off 1/- each for...",
    },
  ];

  return (
    <div className="portfolianalysiscorporatepage-table-wrapper">
    <div className="portfolianalysiscorporatepage-table">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Ex-Date</th>
            <th>Agenda</th>
          </tr>
        </thead>
        <tbody>
          {PortfolioAnalysisamgPagedata.map((item, index) => (
            <tr key={index}>
              <td className="portfolianalysiscorporatepage-company">
                <img src={item.logo} alt="Logo" className="logo" />
                <span>{item.company}</span>
              </td>
              <td>{item.exDate}</td>
              <td>
                  {item.agenda} <a href="javascript:void(0)">Read more</a>
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  
  );
};

export default PortfolioAnalysisAGMPage;
