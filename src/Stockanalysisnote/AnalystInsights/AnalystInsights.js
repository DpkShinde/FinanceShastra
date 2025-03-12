// AnalystInsights.js
import React from 'react';
import './AnalystInsights.css';
import { useNavigate } from 'react-router-dom';
const AnalystInsights = () => {
  const navigate = useNavigate();
  return (

    <div><h2 className="analystinsightheader">Analyst Insights</h2>
    <div className="analyst-insights">
        
       
      <div className="content-box">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
         Sed cursus ante dapibus diam. Sed nisi.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Sed cursus ante dapibus diam. Sed nisi.</p>
        <div className="premium-feature" onClick={() => navigate('/pricehalf')}>
      This feature is exclusive to premium users. Click here for more details.
    </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
      </div>
      
    </div>
    </div>
  );
};

export default AnalystInsights;