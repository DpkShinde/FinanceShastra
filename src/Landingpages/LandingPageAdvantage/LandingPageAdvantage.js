import React, {
 
  useContext,
} from "react"
import "./LandingPageAdvantage.css";
import advimg1 from '../../assest/advimg1.png';
import advimg2 from '../../assest/advimg2.png';
import advimg3 from '../../assest/advimg3.png';
import advimg4 from '../../assest/advimg4.png';
import advimg5 from '../../assest/advimg5.png';
import advimg6 from '../../assest/advimg6.png';
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const LandingPageAdvantage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const advantages = [
    {
      id: 1,
      imageSrc: advimg1, // Corrected: Removed curly braces
      title: "Expert Research and Insights",
    },
    {
      id: 2,
      imageSrc: advimg2, // Corrected: Removed curly braces
      title: "Growth-Oriented Vision",
    },
    {
      id: 3,
      imageSrc: advimg3, // Corrected: Removed curly braces
      title: "Expert Evolution",
    },
    {
      id: 4,
      imageSrc: advimg4, // Corrected: Removed curly braces
      title: "Comprehensive Tools Offerings",
    },
    {
      id: 5,
      imageSrc: advimg5, // Corrected: Removed curly braces
      title: "Transparency and Trust",
    },
    {
      id: 6,
      imageSrc: advimg6, // Corrected: Removed curly braces
      title: "Innovative",
    },
  ];

  return (
    <div className={darkMode ? "landingpageadvantagedarkcontainer" :"landingpageadvantage-container"}>
      <h2 className={darkMode ? "landingpageadvantagedarktitle" :"landingpageadvantage-title"}>
        Advantage of Investing With FinanceShastra
      </h2>
      <div className="landingpageadvantage-grid">
        {advantages.map((advantage) => (
          <div key={advantage.id} className="landingpageadvantage-card">
            <img
              src={advantage.imageSrc} // Corrected usage
              alt={advantage.title}
              className="landingpageadvantage-icon"
            />
            <p className="landingpageadvantage-text">{advantage.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageAdvantage;
