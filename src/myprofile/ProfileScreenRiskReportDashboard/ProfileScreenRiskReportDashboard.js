import React from "react";
import "./ProfileScreenRiskReportDashboard.css";
import Navbar from "../../Navbar/Navbar";

import { FaChevronUp } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import img1risk from '../../assest/hfi.jpg'
import img2risk from '../../assest/tcs.png'
import img3risk from '../../assest/th.jpg';
import img4risk from '../../assest/one97comp.png';
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";


const ProfileScreenRiskReport = () => {
    const notes = [
        {
          title: 'Krsnaa Diagnostics: Annual Report Analysis',
          date: 'Jul 20 - Jan 2022',
        },
        {
          title: 'RateGain: Initiating note',
          date: 'Oct 2015 - Mar 2020',
        },
        {
          title: 'Bandhan Bank: Q1FY25 Quarterly Updated',
          date: 'Sep 2014 - Aug 2015',
        },
        {
          title: 'Indraprastha Gas: Stock Pulse',
          date: 'Sep 2010 - Jul 2013',
        },
      ];
    

      const trending = [
        {
          img: img1risk,
          title: 'Home First Finance Company India Ltd',
          percentage: '6.9%',
        },
        {
          img: img2risk,
          title: 'Tata Technologies',
          percentage: '121.9%',
        },
      
      ];
      
      const trendinggs = [
        {
          img: img4risk,
          title: 'One97 Communications Ltd.',
          percentage: '6.9%',
        },
        
        {
          img: img3risk,
          title: 'Karur Vysya Bank Ltd.',
          percentage: '121.9%',
        },
      ];
    

      const popularScreens = [
        {
          title: 'Best From Nifty 50',
          companies: [
            { name: 'Bajaj Finance', rating: 5 },
            { name: 'Axis Bank', rating: 4 },
            { name: 'Power Grid Corp', rating: 5 },
            { name: 'Kotak Mahindra Bank', rating: 5 },
          ],
        },
        {
          title: '5 Stars Rated Stocks From Nifty 500',
          companies: [
            { name: 'Eicher Motors', rating: 5 },
            { name: 'CreditAccess Grame...', rating: 5 },
            { name: 'Bajaj Finance', rating: 5 },
            { name: 'Sammaan Capital', rating: 5 },
          ],
        },
        {
          title: 'Best From Nifty 500',
          companies: [
            { name: 'Manappuram Finance', rating: 5 },
            { name: 'Indraprastha Gas', rating: 5 },
            { name: 'Gland Pharma', rating: 4 },
            { name: 'United Breweries', rating: 5 },
          ],
        },
      ];
  return (
    <div>
    <div className="ProfileScreenRiskReportDashboard">
      {/* Header Section */}
      <header className="ProfileScreenRiskReportHeader">
        <div>
        <h1>Welcome back, William</h1></div>
        <div className="ProfileScreenRiskReportMarketUpdate">
        
          <div className="datariskreport">
            <p>BSE Sensex: 79,944</p>
            <p style={{color:"#24b676"}}>1436.63<FaChevronUp />1.83%</p>
          </div>
          <div className="datariskreport">
            <p>BSE MidCap: 47,092</p>
            <p style={{color:"#24b676"}}>+416.7 <FaChevronUp />0.89%</p>
          </div>
          <div className="alllriskreport" >
            <p>BSE SmallCap: 56,127</p>
            <p style={{color:"#24b676"}}>+377.14 <FaChevronUp />0.68%</p>
          </div>
         
        </div>
       
       
      </header>
      <div className="datariskallreport">
      <div className="datarisk">
            <p>Market Update</p>
            <p className="allriskpara">02-Jan-2025</p>
           
          </div>
          <div>
      <p >
            Your Risk Profile:<strong style={{color:"rgb(84, 55, 202)"}}> Moderate</strong>
          </p>
          </div>
          </div>
     

      <div className="riskeliteprofileeecontainer">
      <h2 className="riskeliteprofileeeheading">
        Manage your Investing the Most Effective Way with FinanceShastra
      </h2>
      <div className="riskeliteprofileeeplans">
        <div className="eliteriskprofileee">
          <h3 className="riskeliteprofileeeplan-title">Elite</h3>
          <p className="riskeliteprofileeeplan-description">
            Empower your investment journey with the Elite Plan
          </p>
          <button className="riskeliteprofileeeplan-button">Explore</button>
        </div>
        <div className="eliteriskprofileee">
          <h3 className="riskeliteprofileeeplan-title">Premium</h3>
          <p className="riskeliteprofileeeplan-description">
            Invest smarter, invest confidently with the Premium Plan
          </p>
          <button className="riskeliteprofileeeplan-button">Explore</button>
        </div>
      </div>
    </div>
      <div>
        {/* Portfolio Section */}
        <div className="screenriskreport">
        <div className="ProfileScreenRiskReportPortfolio">
            <div className="masterriskheader">
            <div>
          <h2>Master Portfolio</h2></div>
          <div className="masterriskpara">
          <p style={{color:"#24b676"}}>Total: 3.85 lac <strong style={{color:"black"}}>(Gain: 120%)</strong></p></div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Latest Value</th>
                <th>Today's Gain</th>
                <th>Overall Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stocks</td>
                <td>₹3,84,833</td>
                <td>₹3,572 <span style={{color: "#24b676"}}>(0.93%)</span></td>
                <td>₹2,20,814 <span style={{color: "#24b676"}}>(120%)</span></td>
              </tr>
              <tr>
  <td>Equity MF</td>
  <td>₹0</td>
  <td>
    ₹0 <span style={{color: "#24b676"}}>(%)</span>
  </td>
  <td>₹0 <span style={{color: "#24b676"}}>(%)</span></td>
</tr>

              <tr>
                <td>Debt & Cash</td>
                <td>₹0</td>
                <td>₹0 <span style={{color: "#24b676"}}>(%)</span></td>
                <td>₹0 <span style={{color: "#24b676"}}>(%)</span></td>
              </tr>
              <tr>
                <td>Gold & Comm.</td>
                <td>₹0</td>
                <td>₹0 <span style={{color: "#24b676"}}>(%)</span></td>
                <td>₹0 <span style={{color: "#24b676"}}>(%)</span></td>
              </tr>
            </tbody>
          </table>
          <div className="upadeallriskprofile">
          <div>
          <p>Updated on  Dec 07, 2024</p></div>
          <div>
          <button className="buttonriskupadet">Update</button></div>
        </div>
        </div>




        <div className="analysisnoteriskprofilereport-container">
      <h2 className="analysisnoteriskprofilereport-title">Latest Analyst Notes</h2>
      <div className="analysisnoteriskprofilereport-list">
        {notes.map((note, index) => (
          <div key={index} className="analysisnoteriskprofilereport-item">
          
            <div className="analysisnoteriskprofilereport-content">
              <span className="analysisnoteriskprofilereport-titlee">
                {note.title}
              </span>
              <span className="analysisnoteriskprofilereport-date">
                {note.date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="analysisnoteriskprofilereport-viewmore">
        View more
      </a>
    </div>

    </div>




<div className="allpopularriskcompanytrendind">

    <div className="popularscreenriskreport-container">
      <div className="popularscreenriskreport-header">
        <h2>Screens</h2>
        <button className="popularscreenriskreport-create-button"> + Add New </button>
      </div>
      <div className="popularscreenriskreport-no-screen">No Screen created yet</div>
      <h3 className="popularscreenriskreport-title">Popular Screens</h3>
      <div className="popularscreenriskreport-screens">
        {popularScreens.map((screen, index) => (
          <div key={index} className="popularscreenriskreport-card">
            <h4>{screen.title}</h4>
            <ul>
              {screen.companies.map((company, idx) => (
                <li key={idx} className="popularscreenriskreport-company-item">
                    <div className="companyqvpt">
                    <div>
                  <span>{company.name}</span></div>
                
            </div>

                  <span className="popularscreenriskreport-star-rating">
  {"★".repeat(company.rating).split("").map((star, idx) => (
    <span key={idx} style={{ color: "#24b676",fontSize:"20px" }}>{star}</span>
  ))}
  {"☆".repeat(5 - company.rating)}
</span>

                </li>
              ))}
            </ul>
            <div className="viewmorearrowriskall">
        <div>
            <a href="#" className="popularscreenriskreport-view-more">
              View more companies 
            </a></div>
            <div>
            <MdArrowForwardIos  className="viewmorearrowrisk"/></div>
          </div>
          </div>
        ))}
      </div>
      <button className="popularscreenriskreport-other-button">Other Popular Screens</button>
    </div>
        {/* Trending Companies Section */}
        
        <div className="analysisnoteriskprofilereport-containerpopular">
  <h2 className="analysisnoteriskprofilereport-title">Last visited Companies</h2>
  <div className="analysisnoteriskprofilereport-list">
    {trendinggs.map((item, index) => (
      <div key={index} className="analysisnoteriskprofilereport-item">
        <div className="analysisnoteriskprofilereport-contenttt">
          <span className="analysisnoteriskprofilereport-img">
            <img src={item.img} alt={item.title} />
          </span>
          <span className="analysisnoteriskprofilereport-titlee">
            {item.title}
          </span>
          <span className="analysisnoteriskprofilereport-date" style={{color:"#24b676"}}>
            {item.percentage}
          </span>
        </div>
      </div>
    ))}
  </div>
  <a href="#" className="analysisnoteriskprofilereport-viewmore">
  View all visited stocks
  </a>
  <div className="analysisnoteriskprofilereport-list">
    <h3>Trending Companies</h3>
    {trending.map((item, index) => (
      <div key={index} className="analysisnoteriskprofilereport-item">
        <div className="analysisnoteriskprofilereport-contenttt">
          <span className="analysisnoteriskprofilereport-img">
            <img src={item.img} alt={item.title} />
          </span>
          <span className="analysisnoteriskprofilereport-titlee">
            {item.title}
          </span>
          <span className="analysisnoteriskprofilereport-date" style={{color:"#24b676"}}>
            {item.percentage}
          </span>
        </div>
      </div>
    ))}
  </div>
  <a href="#" className="analysisnoteriskprofilereport-viewmore">
  View all visited stocks
  </a>
</div>
</div>
</div>

      <Navbar/>
     
    </div>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default ProfileScreenRiskReport;