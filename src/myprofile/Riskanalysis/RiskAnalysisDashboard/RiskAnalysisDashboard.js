import React from 'react';
import './RiskAnalysisDashboard.css';
import RiskProfileForm from '../RiskProfileForm/RiskProfileForm';
import {useNavigate} from "react-router-dom";
import Navbar from '../../../Navbar/Navbar';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';

const RiskAnalysisDashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="riskreportprofile-container">
                    <h1 className="profilepage-titlesession">Risk Profile Report</h1>
      <div className="profilepage-tabsorderuserss">
        <span className="profilepage-tabb"
        onClick={() => navigate("/userDetailsupdate")}>My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb" onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb" onClick={() => navigate("/riskAnalysisDashboard")}style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}>Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb"
>Active Devices</span>
        <span className="profilepage-tabb" onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>
            <h1>Risk Analysis Dashboard</h1>
            <p>Your investment strategy and the returns you can expect are majorly dependent on your Risk Profile.</p>


           
           <div className='riskreportall'>
         
            <div className="riskreportprofile-factor">
            <h2>Risk Profile of a person is an inherent characteristic which depends on 2 factors</h2>
            <div className='riskheaderheader'>
         
                <h3>Risk taking ability</h3>
                <p>which is determined by your age, income, financial responsibilities etc</p>

                <h3>Risk Willingness</h3>
                <p>which depends on your beliefs, investing experience & knowledge, emotional reaction to loss or gains etc.</p>
                </div>
            </div>
            <div className="riskreportprofile-questions-section">
                <h2>Here are 18 simple questions that will let you know:</h2>
                <div className='riskheader'>
                <ul>
                    <li> 1. Your risk profile & best suited investment strategy</li>
                    <li> 2. Your ideal investment portfolio</li>
                    <li>3. Customised MoneyWorks4Me solution for you so as to maximise your returns in long-term.</li>
                </ul>
                </div>
            </div>
            </div>
            <div className="riskreportprofile-cta-section">
                <p><strong>Only 2 minutes stand between you and your ideal investment portfolio!<br/>
                Answer a few quick questions, and you're all set to start investing smart!</strong></p>
            </div>
            <RiskProfileForm/>
            <div className="subscribe-footerrmanagealerttt">
      <h2 className="headingmanagealert">Subscribe Now!</h2>
        <h3>Choose a plan that aligns with your investment goals!</h3>
        <button className="footer-subscribe-buttonmanage" onClick={()=>{navigate('/pricehalf')}} >Subscribe</button>
      </div>
        </div>
        <Navbar/>
        <div className="foooterpagesaupdate">
      <FooterForAllPage />
      </div>
        </div>
    );
};

export default RiskAnalysisDashboard;