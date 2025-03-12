import React, { useState, useEffect } from 'react';
import './Mutualfundall.css';
import Mutualxray from './MutualFund10years/MutualFund10years';
import Mutualgraphtop from './Mutualgraphtop/Mutualgraphtop';
import MutualFundsSipCalculator from './MutualFundsSipCalculator/MutualFundsSipCalculator';
import MutualkeyIndicators from './MutualkeyIndicators/MutualkeyIndicators';
import MutualFundsSchemeAllocation from './MutualFundsSchemeAllocation/MutualFundsSchemeAllocation';
import MtuFundDetails from './MtuFundDetails/MtuFundDetails';
import FundContactInfo from './FundContactInfo/FundContactInfo';
import RiskOMeter from './RiskoMutualDashboard/RiskoMutualDashboard';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';

function Mutualfund() {
  const [financialData, setFinancialData] = useState({
    price: "₹127.89",
    percentage: "+0.85%",
    lastUpdated: "05 Dec, 2024",
  });

  // Example: Function to simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new data
      const newPrice = (Math.random() * 100 + 100).toFixed(2);
      const newPercentage = ((Math.random() * 2 - 1) * 1.5).toFixed(2); // Random between -1.5% and +1.5%
      const now = new Date();
      const newLastUpdated = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setFinancialData({
        price: `₹${newPrice}`, // Correct interpolation using backticks
        percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`, // Correct interpolation using backticks
        lastUpdated: newLastUpdated,
      });
      
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <div className="mutualcandletop">
        {/* Left Section */}
        <div className="mutualcandletop__left">
          <h2 className="mutualcandletop__title">ICICI Prudential Technology Fund Growth </h2>
          <div className="mutualcandletop__tags">
            <button className="mutualcandletop__tag">Mid Cap</button>
            <button className="mutualcandletop__tag">Very High</button>
          </div>
        </div>

        <div className="mutualcandletop__right">
          <h2 className="mutualcandletop__price">{financialData.price}</h2>
          <p
            className={`mutualcandletop__percentage ${
              parseFloat(financialData.percentage) >= 0
                ? "mutualcandletop__percentage--positive"
                : "mutualcandletop__percentage--negative"
            }`}
          >
            {financialData.percentage}
          </p>
          <p className="mutualcandletop__last-updated">
            Last updated: {financialData.lastUpdated}
          </p>
        </div>
      </div>

      {/* Flex container for the two components */}
      <div className="mutualfunddflex-container">
        <Mutualgraphtop />
        <MutualFundsSipCalculator />
      </div>

      <MutualkeyIndicators />
      <Mutualxray />
      <MutualFundsSchemeAllocation/>
      <MtuFundDetails/>
      <RiskOMeter/>
      <FundContactInfo/>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
     
  );
}

export default Mutualfund;