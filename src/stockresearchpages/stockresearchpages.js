import React from 'react'
import StockResearchAnalysisPage from './StockResearchAnalysisPage/StockResearchAnalysisPage'
import StockResearchtablePage from './StockResearchtablePage/StockResearchtablePage'
import Navbar from '../Navbar/Navbar';
import StockResearchReportPage from './StockResearchReportPage/StockResearchReportPage';
import StockResearchFaqPage from './StockResearchFaqPage/StockResearchFaqPage';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';
import Sidebar from '../Sidebar/Sidebar';

function Stockresearchpages({children}) {
  return (
    <div>
      <StockResearchAnalysisPage/>
      <StockResearchtablePage/>
      <StockResearchReportPage/>
      <StockResearchFaqPage/>

      <Navbar/>
      <div className="layout">
      <Sidebar />
      <div className="main-contentover">
        <div className="contentover">{children}</div>
        <FooterForAllPage />
      </div>
    </div>
    </div>
  )
}

export default Stockresearchpages;
