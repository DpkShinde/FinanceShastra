import React, {
 
  useContext,
} from "react"
import './LandingPageHowToEarn.css';
import howtoearnimg from '../../assest/landinghowtoearnimg.jpeg'
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const LandingPageHowToEarn = () => {
   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "landingpagehowtoearndarkcontainer" :"landingpagehowtoearn-container"}>
      <h3 className={darkMode ? "landingpagehowtoearndarkheading" :"landingpagehowtoearn-heading"}>
        How to Earn with FinanceShastra ?
      </h3>
      <div className="landingpagehowtoearn-content">
        <div className="landingpagehowtoearn-steps">
          <div className={darkMode ? "landingpagehowtoearndarkstep" :"landingpagehowtoearn-step"}>
            1. Invest Smartly with Expert Guidance
          </div>
          <div className={darkMode ? "landingpagehowtoearndarkstep" :"landingpagehowtoearn-step"}>
            2. Affiliate and Referral Program
          </div>
          <div className={darkMode ? "landingpagehowtoearndarkstep" :"landingpagehowtoearn-step"}>
            3. Learn and Profit
          </div>
          <div className={darkMode ? "landingpagehowtoearndarkstep" :"landingpagehowtoearn-step"}>
            4. Become a Partner or Collaborator
          </div>
        </div>
        <div className="landingpagehowtoearn-image">
          <img 
            src={howtoearnimg}
            alt="How to Earn" 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageHowToEarn;
