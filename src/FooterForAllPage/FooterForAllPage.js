
import "./FooterForAllPage.css";
import finanlog from "../assest/finanlogo.svg";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons
import React, {
 useState,
  useContext,
} from "react"
import { DarkModeContext } from "../Portfoilo/context/DarkModeContext";

const FooterForAllPage = () => {
  const [openSection, setOpenSection] = useState(null);
   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const navigate = useNavigate();
  const footerData = [
    { title: "Stocks", links: ["Stock Screener", "High Growth Stocks", "Nifty 50 Companies", "Small Cap Stocks", "Mid Cap Stocks","Large Cap Stocks"] },
    { title: "Mutual Fund", links: ["Fund Screener", "Best Small Cap Fund", "Best Growth Fund", "Best Flexi Cap Fund", "Best ETF Fund"] },
    { title: "Learn & Insights", links: ["Stock News", "IPO Details","Blogs", "Market Insights", "Quarterly Earnings", "Learn"] },
    { title: "Quick Links", links: ["Plan & Pricing", "Talk to Us", "Disclaimer", "Refund Policy", "Careers"] },
    { title: "About Us", links: ["Who We Are?", "Why FinanceShastra?", "Contact Us"] },
  ];
  const stockRoutes = {
    "Stock Screener": "/StockScreenerList",
    "High Growth Stocks": "/highgrowth",
    "Nifty 50 Companies": "/nifty50pageall",
    "Small Cap Stocks": "/smallcap",
    "Mid Cap Stocks": "/midcap",
    "Large Cap Stocks":"/largecap"
  };
  const mutualRoutes = {
    "Top Rated Funds": "/mutualfund",
    "Fund Screener": "/fundscreenerregular",
    "Best Small Cap Fund": "/bestsmallcapregular",
    "Best Growth Fund": "/bestgrowthregular",
    "Best Flexi Cap Fund": "/flexregular",
    "Best ETF Fund": "/etfregular",
  };
  const learnRoutes = {
    "Stock News": "/stockNewsComponent",
    "IPO Details": "/ipoComponent",
    "Blogs": "/blogsComponent",
   
    "Quarterly Earnings": "/earningsInsightLearn",
    "Learn": "/learncard",
  };
  
  // Mapping object for Quick Links routes
  const quickLinksRoutes = {
    "Plan & Pricing": "/pricehalf",
    "Talk to Us": "/talktous",
    "Disclaimer": "/disclaimer",
    "Refund Policy": "/refundpolicy",
    "Careers": "/careers",
  };
  const AboutRoutes = {
    "Who We Are?": "/whoWeAre",
    "Why FinanceShastra?": "/WhyFinadvanceeducationnn",
    "Contact Us": "/contactUsnew",
   
  
  };
  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const allRoutes = { ...stockRoutes, ...mutualRoutes, ...learnRoutes, ...quickLinksRoutes,...AboutRoutes };
  return (
    <>
      {/* Desktop Footer */}
      
      <footer className={darkMode ? "FooterForAllPagedarkfooter" : "FooterForAllPage-footer"}>
        <div className="FooterForAllPage-top-section">
          <div className="FooterForAllPage-stock-list">
            <div className="FooterForAllPage-stock-letters">
              <span className="FooterForAllPage-stock-title">Stock List</span>
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <span key={letter} className="FooterForAllPage-letter">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="FooterForAllPage-main-section">
          <div className="FooterForAllPage-logo-social">
            <div className="FooterForAllPage-logo">
              <img src={finanlog} alt="FinanceShastra Logo" onClick={() => navigate("/")}style={{cursor:"pointer"}} className="FooterForAllPage-logo-img" />
            </div>
            <div className="FooterForAllPage-social-icons">
              <a href="#" className={darkMode ? "FooterForAllPage-social-darkicon" : "FooterForAllPage-social-icon"}><FaFacebookF /></a>
              <a href="#" className={darkMode ? "FooterForAllPage-social-darkicon" : "FooterForAllPage-social-icon"}><FaTwitter /></a>
              <a href="#" className={darkMode ? "FooterForAllPage-social-darkicon" : "FooterForAllPage-social-icon"}><AiFillInstagram /></a>
              <a href="#" className={darkMode ? "FooterForAllPage-social-darkicon" : "FooterForAllPage-social-icon"}><FaLinkedinIn /></a>
              <a href="#" className={darkMode ? "FooterForAllPage-social-darkicon" : "FooterForAllPage-social-icon"}><FaYoutube /></a>
            </div>
          </div>

          <div className="FooterForAllPage-links-section">
            {[
              { title: "Stocks", links: ["Stock Screener", "High Growth Stocks", "Nifty 50 Companies","Small Cap Stocks", "Mid Cap Stocks","Large Cap Stocks"] },
              { title: "Mutual Fund", links: ["Top Rated Funds","Fund Screener", "Best Small Cap Fund", "Best Growth Fund", "Best Flexi Cap Fund", "Best ETF Fund"] },
              { title: "Learn & Insights", links: ["Stock News", "IPO Details","Blogs", "Quarterly Earnings", "Learn"] },
              { title: "Quick Links", links: ["Plan & Pricing", "Talk to Us", "Disclaimer", "Refund Policy", "Careers"] },
              { title: "About Us", links: ["Who We Are?", "Why FinanceShastra?", "Contact Us"] },
            ].map((section, index) => (
              <div key={index} className="FooterForAllPage-column">
              <h4 className="FooterForAllPage-column-title">{section.title}</h4>
              <ul className={darkMode ? "FooterForAllPage-column-darklist" : "FooterForAllPage-column-list"}>
                {section.links.map((link, linkIndex) => (
                 <li
                 key={linkIndex}
                 onClick={() => {
                   // Navigate if the link has a corresponding route
                   if (allRoutes[link]) {
                    navigate(allRoutes[link]);
                    window.scrollTo(0, 0);
                  }
                }}
                 style={{
                   cursor: allRoutes[link] ? "pointer" : "default",
                 }}
               >
                 {link}
               </li>
                ))}
              </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="FooterForAllPage-bottom-section">
          <p className="FooterForAllPage-copyright">
            Copyright © 2024 FinanceShastra <br /> All Rights Reserved |{" "}
            <a href="/termsAndConditions" className={darkMode ? "FooterForAllPage-darklink" :"FooterForAllPage-link"}>Terms and Conditions</a> |{" "}
            <a href="#" className={darkMode ? "FooterForAllPage-darklink" :"FooterForAllPage-link"}>Privacy Policy</a>
          </p>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className={darkMode ? "footermobileviewdarkpages-footer" :"footermobileviewpages-footer"}>
      <div className={darkMode ? "footermobileviewpages-main-darksection" :"footermobileviewpages-main-section"}>
        {footerData.map((section, index) => (
          <div key={index} className="footermobileviewpages-column">
            <div
              className="footermobileviewpages-column-title"
              onClick={() => toggleSection(index)}
            >
              {section.title}
              <span className="footermobileviewpages-arrow">
                {openSection === index ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </div>
            {openSection === index && (
              <ul className="footermobileviewpages-column-list">
                {section.links.map((link, linkIndex) => (
                  <li
                  key={linkIndex}
                  onClick={() => {
                    // Navigate if the link has a corresponding route
                    if (allRoutes[link]) {
                      navigate(allRoutes[link]);
                    }
                  }}
                  style={{
                    cursor: allRoutes[link] ? "pointer" : "default",
                  }}
                >
                  {link}
                </li>
                ))}
              </ul>
           )}
         </div>
          ))}

          <div className="footermobileviewpages-stock-section">
            
            <div className="footermobileviewpages-stock-letters">
            <p className="footermobileviewpages-stock-title">Stock List</p>
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <span key={letter} className="footermobileviewpages-letter">{letter}</span>
              ))}
            </div>
          </div>

          <div className="footermobileviewpages-social-icons">
            <a href="#" className="footermobileviewpages-social-icon"><FaFacebookF /></a>
            <a href="#" className="footermobileviewpages-social-icon"><FaTwitter /></a>
            <a href="#" className="footermobileviewpages-social-icon"><AiFillInstagram /></a>
            <a href="#" className="footermobileviewpages-social-icon"><FaLinkedinIn /></a>
            <a href="#" className="footermobileviewpages-social-icon"><FaYoutube /></a>
          </div>
          <div className="footermobileviewpages-bottom-section">
  <p className="footermobileviewpages-copyright">
    <span className="copyright-text">Copyright © 2024 FinanceShastra</span>
    <br />
    <span className="rights-text">
      All Rights Reserved |{" "}
      <a href="#" className="footermobileviewpages-link">Terms and Conditions</a> |{" "}
      <a href="#" className="footermobileviewpages-link">Privacy Policy</a>
    </span>
  </p>
</div>

        </div>

        
      </footer>
    </>
  );
};

export default FooterForAllPage;