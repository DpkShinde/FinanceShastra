import React, {
 
  useContext,
} from "react"
import "./LandingAboutPage.css";
import landingaboutimg from '../../assest/landingaboutimg.png';
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const LandingAboutPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div className={darkMode ? "landingaboutpage-darkcontainer" :"landingaboutpage-container"}>
      <div className="landingaboutpage-content">
        {/* Left Section: Image */}
        <div className="landingaboutpage-image">
          <img
            src={landingaboutimg} /* Replace with actual image URL */
            alt="Team Collaboration"
          />
        </div>

        {/* Right Section: Text */}
        <div className="landingaboutpage-text">
          <h2 className={darkMode ? "landingaboutpage-darktitle" :"landingaboutpage-title"}>About the company</h2>
          <p className={darkMode ? "landingaboutpage-darkdescription" :"landingaboutpage-description"}>
            At FinanceShastra, we believe in the power of informed financial
            decisions. Our platform is dedicated to helping individuals and
            businesses alike navigate the complexities of personal finance,
            investment strategies, and financial literacy. With over a decade
            of experience in share-market research, data analytics, and
            financial strategy, our team is committed to providing cutting-edge
            insights and tools to simplify your financial journey.
          </p>
          <p className={darkMode ? "landingaboutpage-darkmission" :"landingaboutpage-mission"}>
            Our mission is to transform how 350 million Indians approach their
            finances. Whether you're new to managing money or an experienced
            investor, FinanceShastra offers educational resources, intuitive
            tools, and personalized advice to help you achieve your financial
            goals with confidence.
          </p>
          <button className="landingaboutpage-button"
           onClick={() => {
            navigate("/whoWeAre"); 
            window.scrollTo(0, 0); // Scroll to top after navigation
          }}
        >Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default LandingAboutPage;
