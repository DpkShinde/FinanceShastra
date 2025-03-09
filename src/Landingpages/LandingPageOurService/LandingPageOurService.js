import React, {
 
  useContext,
} from "react"
import "./LandingPageOurService.css";
import landingimg2 from '../../assest/landingimg2.1.jpeg';
import landingimg3 from '../../assest/landingimg2.2.jpeg';
import landingimg4 from '../../assest/landingimg3.2.jpeg';
import landingimg5 from '../../assest/landingimg3.1.png';
import imgicon1 from '../../assest/landingimgicon1.png';
import imgicon2 from '../../assest/landingimgicon2.png';
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const LandingPageOurService = () => {
   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "landingpageourservicedarkcontainer" :"landingpageourservice-container"}>
      <h2 className={darkMode ? "landingpageourservicedarkheading" :"landingpageourservice-heading"}>Our Services</h2>

 {/* Stock Research Section */}
 <div className={darkMode ? "landingpageourservicedarksection" :"landingpageourservice-section"}>
  <div className="landingpageourservice-images-overlap">
    <img
      src={landingimg2}
      alt="Stock List"
      className="landingpageourservice-image-base"
    />
    <img
      src={landingimg3}
      alt="Stock Research Graph"
      className="landingpageourservice-image-overlay"
    />
  </div>
  <div className="landingpageourservice-text">
    <h3 className={darkMode ? "landingpageourservicedarksubheading" :"landingpageourservice-subheading"}>
      Stock Research and Recommendations
    </h3>
    <img 
      src={imgicon1} 
      alt="Stock Research" 
      className="landingpageourservice-image"
    />
    <ul className={darkMode ? "landingpageourservicedarklist" :"landingpageourservice-list"}>
      <li>
        <strong>StockSIP:</strong> Systematic Investment Planning for individual stocks.
      </li>
      <li>
        <strong>Stock Screener:</strong> Identify potential stocks with advanced filters and criteria.
      </li>
      <li>
        <strong>Research Reports:</strong> Detailed company and market analysis to guide your investment strategy.
      </li>
    </ul>
</div>

</div>




      {/* Educational Resources Section */}
      <div className={darkMode ? "landingpageourservicedarksection" :"landingpageourservice-section"}>
     
        <div className="landingpageourservice-text">
          <h3 className={darkMode ? "landingpageourservicedarksubheadingg" :"landingpageourservice-subheadingg"}>
            Educational Resources
          </h3>
          <img 
      src={imgicon2} 
      alt="Stock Research" 
      className="landingpageourservicee-image"
    />
          <ul className={darkMode ? "landingpageourservicedarklistt" :"landingpageourservice-listt"}>
            <li>
              <strong>Market Insights:</strong> Daily updates on stock market trends and analysis.
            </li>
            <li>
              <strong>Financial News:</strong> Curated news to keep you updated on market movements.
            </li>
            <li>
              <strong>Investment Courses:</strong> Online learning modules for all levels of investors.
            </li>
          </ul>
        </div>
        <div className="landingpageourservice-images-overlapp">
    <img
      src={landingimg4}
      alt="Stock List"
      className="landingpageourservice-image-basee"
    />
    <img
      src={landingimg5}
      alt="Stock Research Graph"
      className="landingpageourservice-image-overlayy"
    />
  </div>
      </div>
    </div>
  );
};

export default LandingPageOurService;
