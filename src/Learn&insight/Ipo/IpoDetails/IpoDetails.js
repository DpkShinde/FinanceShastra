import React from 'react';
import { MdDateRange } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './IpoDetails.css';
import ipo1 from '../../../assest/ipo1.jpeg';
import {GoDotFill} from "react-icons/go";
import Navbar from '../../../Navbar/Navbar';
import Ipotable from '../Ipotable/Ipotable';
import UpcomingIPOs from '../UpcomingIPOs/UpcomingIPOs';
import IpoRecommendation from '../IpoRecommendation/IpoRecommendation';
import IpoComment from '../IpoComment/IpoComment';
import RecentIPOs from '../RecentIPOs/RecentIPOs';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';


const IpoDetails = () => {

  const ipoDetails = {
    title: "Sanathan Textiles IPO analysis",
    subtitle: "All you need to know about the Sanathan Textiles IPO",
    date: "17 Dec 2024",
    author: "Chandresh Tripathi",
    image: ipo1,
    details: [
      { label: "Opening Date", value: "19 Dec 2024" },
      { label: "Price band (₹)", value: "₹305 - 321" },
      { label: "Closing Date", value: "24-Dec-2024" },
      { label: "Face Value", value: "₹₹10" },
      { label: "Allotment Date", value: "24 Dec 2024" },
      { label: "No. of shares", value: "17,133,956" },
      { label: "Refunds Date", value: "26 Dec 2024" },
      { label: "Offer for sale (₹ cr)", value: "₹150" },
      { label: "Listing Date", value: "27 Dec 2024" },
      { label: "Fresh issue (₹ cr)", value: "₹400" },
      { label: "Lot Size", value: "46" },
      { label: "Offered to Public", value: "5,996,885" },
      { label: "Minimum Investment", value: "₹14,766.00" },
      { label: "Purpose of issue",  value: "Repayment of debt and investment in subsidiary"},
    ],
    content: {
      nutshell: "Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over three financial years from FY22 to FY24. During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 8.3% annually.",
      companyOverview: "Sanathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18% of its revenue).",
      coreStrengths: "Sanathan Textiles has built enduring partnerships with well-known brands like Welspun India and has served over 1,500 customers.",
      limitations: "Sanathan Textiles derived 65% of its revenue from Gujarat, Maharashtra, and Punjab in FY24. Potential disruptions in these states may influence the company’s profitability.",
    },
  };

  return (
    <div>
    <div className="ipoDetailsContainer">
    <Navbar/>
      <h2 className="ipoNewsTitle">{ipoDetails.title}</h2>
      <p className="ipoNewsSubtitle">{ipoDetails.subtitle}</p>
      <div className="datetimecardipo">
        <p className="ipopara">
          <MdDateRange className="dateipocard" /> Published Date: {ipoDetails.date}<GoDotFill style={{color:"green", fontSize:"12px"}}/>
        </p>
        <p className="ipopara">
          <CgProfile className="profileipocard" /> Author: {ipoDetails.author}<GoDotFill style={{color:"green", fontSize:"12px"}}/>
        </p>
      </div>
 
      <div className='iconimageall'>
      <div className="shareIcons">
        <h3>Share</h3>
        <FaFacebookF className="shareIcon" />
        <FaTwitter className="shareIcon" />
        <FaLinkedinIn className="shareIcon" />
        <FaWhatsapp className="shareIcon" />
        <FaEnvelope className="shareIcon" />
      </div>
      <div>
      <img src={ipoDetails.image} alt="Sanathan Textiles IPO" className="ipoImage" /></div>
      <div><RecentIPOs/></div>
      </div>
    
    
      <h2 className="investgg-heading">Sanathan Textiles: Company Overview</h2>
      <p className="investgg-paragraph">
      Sanathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18%
of its revenue). The company also produces technical textiles used in sectors such as automotive, healthcare, construction, sports, and
protective clothing. As of September 30, 2024, it offered over 3,200 active yarn varieties and had the capability to produce a diverse
portfolio of more than 14,000 yarn products. In FY24, it served over 1,500 customers, including prominent names like Welspun, Premco
Global, and Page.
      </p>
      <h2 className="investgg-heading">Sanathan Textiles IPO details</h2>
      <div className='ipodta'>
      <div className="ipoDetails">
        {ipoDetails.details.map((detail, index) => (
          <div key={index} className="ipoDetailItem">
            <span className="ipoDetailLabel">{detail.label}</span>
            <span className="ipoDetailValue">{detail.value}</span>
          </div>
        ))}
      </div>
      </div>
      <div className="ipoContent">
      
      <h2 className="investgg-heading">Sanathan Textiles IPO in brief</h2>
      
        <p><strong className='strongfontipo'>Quality:</strong> Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over the three financial years from FY22 to FY24.</p>
        <p><strong className='strongfontipo'>Growth:</strong> During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 38.6% annually</p>
        <p><strong className='strongfontipo'>Valuation: </strong>The stock is valued at 20.2 times its earnings and 1.6 times its book value at the upper price band of ₹321.</p>
        <p><strong className='strongfontipo'>Overview:</strong> The company stands to gain from geopolitical tensions in Bangladesh, a key exporter to the US and EU, and the reduction in China’s apparel exports to the
US, positioning Indian exporters as a viable alternative for the US, which accounted for 22% of global apparel imports in CY23. However, the highly competitive textile
sector remains a challenge.</p>
     
        <h3>Sanathan Textiles: Company Overview</h3>
        <p>anathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18% of its revenue). The company
also produces technical textiles used in sectors such as automotive, healthcare, construction, sports, and protective clothing. As of September 30, 2024, it offered over
3,200 active yarn varieties and had the capability to produce a diverse portfolio of more than 14,000 yarn products. In FY24, it served over 1,500 customers, including
prominent names like Welspun, Premco Global, and Page.</p>
        <h3>Core Strengths of Sanathan Textiles</h3>
        <p><strong className='strongfontipo'>Established Clientele:</strong> Sanathan Textiles has built enduring partnerships with well-known brands like Welspun India, Techno Sportswear, Page Industries, D'Décor
        Home Fabrics, and Siyaram Silk Mills. Additionally, it has maintained relationships with its top 10 clients for more than 10 years.</p>
        <h3>Limitations of Sanathan Textiles</h3>
        <p><strong className='strongfontipo'>Regional Focus:</strong> Sanathan Textiles derived 65% of its revenue from Gujarat, Maharashtra, and Punjab in FY24. Potential disruptions in these states—due to social,
        political, or economic factors—may influence the company’s profitability.</p>
        <p><strong className='strongfontipo'>Dependence on Distribution Network:</strong> The company relies extensively on its distributors to market and sell its products. In FY24, nearly 94% of its revenue was
        generated through its distribution partners. Consequently, the loss of important distributors could harm the company’s financial performance</p>
      </div>
     
      <Ipotable/>
      <IpoRecommendation/>
      <IpoComment/>
      <UpcomingIPOs/>
     
    </div>
    <div className="foooterpagesaupdate">
     <FooterForAllPage />
   </div>
    </div>
  );
};

export default IpoDetails;