import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import "./PricingTablehalfyear.css";
import DealOfTheYearSection from "../DealOfTheYearSection/DealOfTheYearSection";
import Navbar from '../../Navbar/Navbar';
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const SubscriptionPlans = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleToggle = () => {
    setIsAnnually(!isAnnually);
    if (!isAnnually) {
      navigate("/annualplan"); // Navigate to the annual plan page
    }
  };

  return (
    <div>
      <DealOfTheYearSection />
      <Navbar />
      <div className="subscription-container">
      <h1 className='subscriptionh2'>Choose a plan that aligns with trading goals !</h1>
        <h4 className='subscriptionh4'>It’s now or never—don’t miss your chance at the ultimate deal.</h4>
        <div className="pricing-containertoggle">
        <div className="toggle-switch-container">
  <button
    className="toggle-button active"
    onClick={() => navigate("/pricehalf")}  // Navigate to the Half yearly plan
  >
    Half yearly
  </button>

  <button
    className="toggle-button"
    onClick={() => navigate("/annualplan")}  // Navigate to the Annual plan
  >
    Annually
  </button>
</div>

      <div className="plans-wrapper">
        {/* Elite Plan */}
        <div className="plan-card elite-plan">
        <div className="plan-header">
  <div className="plan-header-content">
    <h2 className="plan-header-titleelite">Elite</h2>
  
    <p className="plan-description">Empower your investment journey with the Elite Plan!</p>
  

             
            <div className="ribbon-price">
  <span className="price-value" >₹2,000</span> 
  <span className="price-valuemonth"> / 6 Month</span>
  <span className="ribbon-price-detailelite">   ₹999 / After 6 Month</span>
 
  <div className="text-black">You save 
  <span className="text-highlight"> ₹6,000</span>
  <span className="text-highlight"> (66%)</span>
  <span className="text-blackyear"> a year</span>
  </div>


             
             
     
           
          
          </div>
          <div className="plan-features">
          <h4 className='plan-featuresh4'>
          <FontAwesomeIcon icon={faCircleCheck} />Features: 
</h4>

    <ul className="plan-featuresul">
        <li className="plan-featuresli">
        <span className='plan-featuresspan'> 50 Stock Recommendations</span> 
            <span className='plan-featuresp'> : Expert recommendations to build a focused and profitable portfolio.</span>
        </li>
        <li className="plan-featuresli">
        <span>Stocks Screener </span> 
            <span className='plan-featuresp'> : Access essential tools to analyze and screen stocks effectively.</span>
        </li>
        <li className="plan-featuresli">
        <span> Research Tool </span> 
            <span className='plan-featuresp'> : Utilize advanced resources for in-depth stock research.</span>
        </li>
        <li className="plan-featuresli">
        <span>  Discover Top-rated Stocks</span> 
            <span className='plan-featuresp'> : Easily find the best-performing stocks.</span>
        </li>
    </ul>
</div>

<div className="plan-additional-benefits">
    <h4 className='plan-featuresh4'> <FontAwesomeIcon icon={faCircleCheck} />Features: Additional Benefits:</h4>
    <ul  className="plan-featuresul">
    <li className="plan-featuresli">
    <span className='plan-featuresspan'> Stock of the Month</span>
            <span className='plan-featuresp'> : One carefully selected stock handpicked by our investment committee every month.</span>
        </li>
        <li className="plan-featuresli">
        <span className='plan-featuresspan'>Research Reports </span> 
            <span className='plan-featuresp'> : Access the real-time research report on any stock.</span>
        </li>
        <li className="plan-featuresli">
        <span className='plan-featuresspan'>Momentum Stocks </span>
            <span className='plan-featuresp'> :Identify and capitalize on the best momentum stocks for any market phase.</span>
        </li>
    </ul>
</div>
<button className="pay-now-btn" onClick={() => navigate('/halfyearlySubscriptionPages')}>
           Subscribe
        </button>
</div>
       
</div>     
</div>

       {/* Most Popular Container */}
<div className="most-popular-container">
  <h2 className="most-popular-text">Most Popular!</h2>


{/* Premium Plan */}
<div className="plan-card permium-plan">
  <div className="plan-header">
    <div className="plan-header-content">
      <h2 className="plan-header-title">Premium</h2>
      <p className="plan-description">
        Invest smarter, invest confidently with the Premium Plan!
      </p>
      <div className="ribbon-price">
        <span className="price-value">₹5,999</span>
        <span className="price-valuemonth"> / 6 Month</span>
        <span className="ribbon-price-detail">₹2,000 / After 6 Month</span>
        <div className="text-black">
          You save
          <span className="text-highlight"> ₹12,000</span>
          <span className="text-highlight"> (60%)</span>
          <span className="text-blacks"> a year</span>
        </div>
      </div>

      <div className="plan-features">
        <h4 className="plan-featuresh4">
          <FontAwesomeIcon icon={faCircleCheck} /> Features:
        </h4>

        <ul className="plan-featuresul">
          <li className="plan-featuresli">
            <span className="plan-featuresspan">150 Stock Recommendations</span>
            <span className="plan-featuresp">
              : Expert recommendations on 150 to optimize your portfolio.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">StockSIP</span>
            <span className="plan-featuresp">
              : Automate your investments with StockSIP for consistent wealth creation.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Premium Screener</span>
            <span className="plan-featuresp">
              : Access advanced tools to filter and analyze stocks tailored to your specific investment strategy.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Q&A Feature</span>
            <span className="plan-featuresp">
              : Get personalized investment advice from our experts.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Discover Top-rated Stocks</span>
            <span className="plan-featuresp">
              : Identify the best-performing stocks based on comprehensive research and analysis.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Premium Actionable Insights</span>
            <span className="plan-featuresp">
              : Stay ahead of the market with exclusive updates and analysis on market trends.
            </span>
          </li>
        </ul>
      </div>

      <div className="plan-additional-benefits">
        <h4 className="plan-featuresh4">
          <FontAwesomeIcon icon={faCircleCheck} /> Additional Benefits:
        </h4>
        <ul className="plan-featuresul">
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Stock Research</span>
            <span className="plan-featuresp">
              : Receive detailed buy/sell/hold recommendations on all stocks, backed by deep, data-driven research.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Stock of the Week</span>
            <span className="plan-featuresp">
              : Gain access to a high-potential stock, carefully handpicked and recommended by our research team.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Research Reports</span>
            <span className="plan-featuresp">
              : Access the real-time research reports on any stock to help you make informed decisions.
            </span>
          </li>
          <li className="plan-featuresli">
            <span className="plan-featuresspan">Momentum Stocks</span>
            <span className="plan-featuresp">
              : Identify and capitalize on the best momentum stocks across any market phase, enhancing your portfolio's growth potential.
            </span>
          </li>
        </ul>
      </div>

      <button
        className="pay-now-btnfooter"
        onClick={() => navigate('/premiumSubscriptionPages')}
      >
        Subscribe
      </button>
      </div>
    </div>
  </div>
</div>

          
        </div>
      </div>
    </div>
    
    <div className="foooterpagesaupdate">
     <FooterForAllPage />
     </div>
    
    </div>
            
          
           
  );
};

export default SubscriptionPlans;