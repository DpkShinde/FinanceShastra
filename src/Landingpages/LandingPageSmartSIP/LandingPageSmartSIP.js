import React, {
 
  useContext,
} from "react"
import "./LandingPageSmartSIP.css";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const LandingPageSmartSIP = () => {
   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      title: "What is it?",
      description:
        "A systematic stock investment plan for disciplined, goal-based equity growth.",
    },
    {
      id: 2,
      title: "Key Features",
      description:
        "Personalized portfolios, auto-scheduled investments, dynamic rebalancing, AI-driven insights.",
    },
    {
      id: 3,
      title: "Benefits",
      description:
        "Risk reduction, wealth compounding, and flexible options.",
    },
    {
      id: 4,
      title: "Ideal For",
      description:
        "Beginners, seasoned investors, and goal-focused individuals.",
    },
  ];

  return (
    <div className={darkMode ? "landingpagesmartsipdarkcontainer" :"landingpagesmartsip-container"}>
      <h2 className={darkMode ? "landingpagesmartsip-darktitle" :"landingpagesmartsip-title"}>Stocks SmartSIP Overview</h2>
      <div className="landingpagesmartsip-cards">
        {cards.map((card) => (
          <div key={card.id} className={darkMode ? "landingpagesmartsipdarkcard" :"landingpagesmartsip-card"}>
            <h3 className="landingpagesmartsip-card-title">{card.title}</h3>
            <p className={darkMode ? "landingpagesmartsip-carddarkdescription" :"landingpagesmartsip-card-description"}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <button
        className="landingpagesmartsip-button"
        onClick={() => {
          navigate("/stocksSmartSIPPS"); 
          window.scrollTo(0, 0); // Scroll to top after navigation
        }}
      >
        Learn more
      </button>
    </div>
  );
};

export default LandingPageSmartSIP;
