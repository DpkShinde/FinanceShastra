import React from 'react';
import './MyReferalPage.css';
import { FaArrowRight } from 'react-icons/fa';
import referalimg1 from '../../assest/referalimg1.jpg'
import referalimg2 from '../../assest/referalimg2.jpg'
import referalimg3 from '../../assest/referal3.jpg'
import referalimg4 from '../../assest/referalimg4.jpg'
import { useNavigate } from 'react-router-dom';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';
import Navbar from '../../Navbar/Navbar';

const MyReferalPage = () => {
    const navigate = useNavigate();
  return (
    <div className="profilepageee-container">
    <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
    My Referrals</h1>

    <div className="profilepage-tabsorderusers">
        <span className="profilepage-tabb" onClick={() => navigate("/userDetailsupdate")}
       >My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb"  onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb"  onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
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
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb"  style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }} onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>

    <div className="myreferalpagesss">
      {/* Header Section */}
      <div className="myreferalpagesss-header">
      <div className="myreferalpagesss-header-row">
  <h1>Share the gift of investment success with your friends and family.</h1>
  <a href="#" className="myreferalpagesss-benefits-link">View benefits</a>
</div>

<div className="myreferalpagesss-buttons">
          <button className="myreferalpagesss-button active"onClick={() => navigate("/myReferalPage")}>Overview</button>
          <button className="myreferalpagesss-button"onClick={() => navigate("/referMoreProfilePages")}>Refer More</button>
          <button className="myreferalpagesss-button "onClick={() => navigate("/earningCalculatorProfilePage")}>Earning Calculator</button>
          <button className="myreferalpagesss-button"onClick={() => navigate("/reffeerralProfilePageSSS")}>My Referrals</button>
        </div>
      </div>

      {/* Why Refer Section */}
      <section className="myreferalpagesss-why-refer">
  <h2 className="myreferalpagesss-why-referh2">Why Refer to FinanceShastra?</h2>
  <div className="myreferalpagesss-why-refer-content">
    <div className="myreferalpagesss-why-refer-text">
      <p>
        You want to help your loved ones overcome their investment <br/>challenges, but guiding them can feel overwhelming.
      </p>
      <ul>
        <li>They lack a reliable way to secure their financial future.</li>
        <li>They’re making mistakes you’ve already learned to avoid.</li>
      </ul>
      <p>
        FinanceShastra offers a proven path to financial freedom, and as a  <br/>partner, you can support their journey confidently while earning <br/> valuable rewards.
      </p>
    </div>
    <div className="myreferalpagesssimage-section">
    <img
      src={referalimg1}
      alt="Why Refer Illustration"
      className="myreferalpagesss-illustration"
    />
    </div>
  </div>
</section>


      {/* Partner Benefits Section */}
      <section className="myreferalpagesss-partner-benefits">
      <h2 className="myreferalpagesss-partner-benefitsheader">What Do You Gain as a FinanceShastra Partner?</h2>
            <div className="myreferalpagesss-partner-benefitscontent">
                <div className="myreferalpagesss-partner-benefitsimage-section">
                    <img src={referalimg2} alt="Partnership" />
                </div>
                <div className="myreferalpagesss-partner-benefitstext-section">
                    <h3 className='myreferalpagesss-partner-benefitstext-sectionh3'>We aim to make your partnership with us both rewarding and empowering: </h3>
                    <h3 className='myreferalpagesss-partner-benefitstext-sectionh3'>1. Revenue Sharing:</h3>
                    <ul>
                        <li>Earn 15% of the first-year fees paid by your referrals.</li>
                        <li>Refer 9 successful investors to become a Lifelong Partner.</li>
                        <li>Lifelong Partners earn:</li>
                        <ul>
                            <li>15% of first-year fees.</li>
                            <li>10% of renewal fees every year thereafter (excluding GST).</li>
                        </ul>
                    </ul>
                    <h3 className='myreferalpagesss-partner-benefitstext-sectionh3'>2. Exclusive Rewards:</h3>
                    <ul>
                        <li>Recognition as a key contributor to FinanceShastra’s Mission Financial Freedom.</li>
                        <li>Access to premium resources to elevate your investment knowledge.</li>
                    </ul>
                    <button className="myreferalpagesss-partner-benefitsrefer-button"
                     onClick={() => {
                      navigate("/referMoreProfilePages"); 
                      window.scrollTo(0, 0); // Scroll to top after navigation
                    }}>
    Refer Now <FaArrowRight />
</button>

                </div>
            </div>
      </section>
      <section className="how-to-refer-section">
      <h2 className="how-to-refer-header">How to Refer?</h2>
      <div className="how-to-refer-content">
        <div className="how-to-refer-text">
          <ul>
            <li><strong>It's simple:</strong></li>
            <ol>
              <li>Share your friend’s name and phone number.</li>
              <li>
                We’ll send them a <strong>FREE copy</strong> of the book: <br />
                <strong>Rich Dad Poor Dad - <em>by Robert T. Kiyosaki (Author)</em></strong>
              </li>
              <li>Our team will contact them to confirm interest and start their investment journey.</li>
            </ol>
            <li>By referring your network, you help us create a wealthier and more secure India.</li>
          </ul>
        </div>
        <div className="how-to-refer-image">
          <img src={referalimg3} alt="Rich Dad Poor Dad Book" />
        </div>
      </div>
    </section>
    <h2 className="why-financeshastra-header">Why <span>FinanceShastra?</span></h2>
    <section className="why-financeshastra-section">
    
      <div className="why-financeshastra-content">
        {/* Left Side: Image */}
        <div className="why-financeshastra-image">
          <img src={referalimg4} alt="Investment Growth" />
        </div>

        {/* Right Side: Text and Button */}
        <div className="why-financeshastra-text">
          
          <p>
            India's growing economy provides an incredible opportunity for equity investments.
            FinanceShastra is dedicated to helping millions of Indians <br/>achieve financial independence
            by investing wisely.
          </p>
          <button 
  className="why-financeshastrarefer-now-button" 
  onClick={() => {
    navigate("/WhyFinadvanceeducationnn"); 
    window.scrollTo(0, 0); // Scroll to top after navigation
  }}
>
  Refer Now <FaArrowRight />
</button>


        </div>
      </div>
    </section>
    <section className="referral-criteria-section">
      <div className="referral-criteria-content">
        <h2>Referral Criteria</h2>
        <ul>
          <li>You must be an active FinanceShastra subscriber.</li>
          <li>Revenue sharing is calculated on fees (excluding GST).</li>
          <li>
            Rewards are updated in real time and paid on the 15th of each month
            if they exceed ₹5,000.
          </li>
        </ul>
        <h3>Important Notes:</h3>
        <ul>
          <li>Referral benefits do not apply to Elite plans.</li>
          <li>Employees of FinanceShastra are ineligible for referral benefits.</li>
          <li>
            Partners act as independent third parties and cannot offer
            investment advice on behalf of FinanceShastra.
          </li>
        </ul>
        <h2>Start Referring Today!</h2>
        <p>
          Let’s make financial freedom a reality for millions. Together, we can
          create a brighter financial future.
        </p>
        <button className="refer-now-button"
         onClick={() => {
          navigate("/WhyFinadvanceeducationnn"); 
          window.scrollTo(0, 0); // Scroll to top after navigation
        }}>Refer Now <FaArrowRight /></button>
      </div>
    </section>
    </div>
    <Navbar/>
   
    <FooterForAllPage />
 
    </div>
  );
};

export default MyReferalPage;
