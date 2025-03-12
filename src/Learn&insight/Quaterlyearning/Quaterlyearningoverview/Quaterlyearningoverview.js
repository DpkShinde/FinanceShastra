import React from 'react';
import { Container,Typography } from '@mui/material';

import Navbar from '../../../Navbar/Navbar';
import './Quaterlyearningoverview.css'
import { Link, Element } from 'react-scroll';

import QuarterlyEarningsReport from '../Quaterlyearningdetailreport/Quaterlyearningdetailreport';
import Earninginsightheader from '../Earninginsightdetailheader/Earninginsightdetailheader';
import Quaterlygraphtop from '../Quaterlygraphtop/Quaterlygraphtop';
import QuarterlyEarningdetailincome from '../Quaterlyearningincome/Quaterlyearningincome'

import Quarterlybalancesheet from '../Quaterlyearnbalancesheet/Quaterlyearnbalancesheet';
import QuarterlyCashflow from '../Quaterlycashflow/Quaterlycashflow';
import Quarterlyratio from '../Quaterlyratio/Quaterlyratio';
 import Quarterlypeer from '../Quaterlypeer/Quaterlypeer';
 import QuaterlynewsList from '../Quaterlynews/Quaterlynews';
 import Quaterlyabout from '../Quaterlyabout/Quaterlyabout'
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';


function QuaterelyOverview() {
  return (
    <div>
    <Container 
      sx={{
        maxWidth: '200%',
        overflowX: 'hidden', // Prevent horizontal scrolling
        padding: '0 16px', 
        marginTop:'300px'
        
      }}
    >
       <Earninginsightheader/>
      {/* Navbar with scroll links */}
      <Navbar />

      {/* Graph Header */}
    

    

      {/* Navigation Links */}
      <nav>
        <ul>
            <Link to="overview" smooth={true} duration={500}></Link>
         
           
          
            <Link to="financials" smooth={true} duration={500}></Link>
            <Link to="income" smooth={true} duration={500}></Link>
          
            <Link to="valuation" smooth={true} duration={500}></Link>
          
            <Link to="stockanalysis" smooth={true} duration={500}></Link>
          
            <Link to="analysis-notes" smooth={true} duration={500}></Link>
          
          
            <Link to="stockpeer" smooth={true} duration={500}></Link>
         
          
            <Link to="profitloss" smooth={true} duration={500}></Link>
          
          
            <Link to="balance-sheet" smooth={true} duration={500}></Link>
        
         
            <Link to="cashflow" smooth={true} duration={500}></Link>
        
          
            <Link to="ratios" smooth={true} duration={500}></Link>
          
         
            <Link to="news" smooth={true} duration={500}></Link>
        
         
            <Link to="about" smooth={true} duration={500}></Link>
      
        </ul>
      </nav>

      {/* Section: Overview */}
      <Element name="overview">
      <Quaterlygraphtop/>
     
      </Element>
      {/* Section: Stock X-Ray */}
      <Element name="financials">
      <QuarterlyEarningsReport/>
      </Element>

      {/* Section: Quarterly Earnings Report */}
      <Element name="income">
      <QuarterlyEarningdetailincome/>
      </Element>

      {/* Section: Valuation */}
      <Element name="valuation">
      <Quarterlybalancesheet/>
      </Element>

      {/* Section: Financial Dashboard */}
      <Element name="stockanalysis">
      <QuarterlyCashflow/>
      </Element>

      {/* Section: Analysis Notes */}
      <Element name="analysis-notes">
      <Quarterlyratio/>
      </Element>

      {/* Section: Peer Analysis */}
      <Element name="stockpeer">
      <Quarterlypeer/>
      </Element>

      {/* Section: Profit & Loss */}
      <Element name="news">
      <QuaterlynewsList/>
      </Element>

      {/* Section: Balance Sheet */}
      <Element name="about">
      <Quaterlyabout/>
      </Element>

     
    </Container>
    <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
}

export default QuaterelyOverview;







