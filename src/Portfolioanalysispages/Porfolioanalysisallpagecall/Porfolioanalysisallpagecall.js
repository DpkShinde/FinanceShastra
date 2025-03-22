import { useContext } from 'react'
import React from 'react'
import Portfolioanalyticchart from '../Portfolioanalyticchart/Portfolioanalyticchart'
import StockTracker from '../StockTracker/StockTracker'

import PortfolioAnalysisnew from '../PortfolioAnalysisnew/PortfolioAnalysisnew'
import Sidebar from '../../Sidebar/Sidebar'
import Navbar from '../../Navbar/Navbar'
import AnalysisResearchReportblur from '../Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur'
import PortfolioAnalysisCorporatePage from '../PortfolioAnalysisCorporatePage/PortfolioAnalysisCorporatePage'
import FundamentalPortfolioAnalysis from '../FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from '../PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'
function Porfolioanalysisallpagecall({children}) {
  
  return (
    <div>
        <Portfolioanalyticchart/>
        <StockTracker/>
        <PortfolioAnalysisCorporatePage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
    
        <Navbar/>
        <div className="layout">
      <Sidebar/>
      <div className="main-contentover">
        <div className="contentover">{children}</div>
        <FooterForAllPage />
      </div>
    </div>
    </div>
  )
}

export default Porfolioanalysisallpagecall