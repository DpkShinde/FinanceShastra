import React from 'react';
import './Learncoursedetail.css'; // Updated CSS file name
import learn1 from '../../../assest/learn2.jpeg';
import ModulecourseDetails from '../Modulelearncourse/Modulelearncourse';
import Navbar from '../../../Navbar/Navbar';
import Learncarddetailcourse from '../Learncarddetailcourse/Learncarddetailcourse';
import FaqDropdown from '../Learnfaq/Learnfaq';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';


const LearnCourseDetails = () => {
  return (
    <div>
    <div className="learncourse-details-container">
      <h1>The Ultimate Stock Trading Course</h1>
      <div className='learncourseall'>
      <div className='learntoppart'>
      <div className="learncourse-summary">
        <div className="learncourse-info">
          <div className="learncourse-info-box">
            <div className='durationlearndetail'><p>Total Duration</p></div>
            <h3>6:00 Hours</h3>
          </div>
          <div className="learncourse-info-box">
          <div className='durationlearndetail'><p>Course Type</p></div>
            <h3>Online</h3>
          </div>
        </div>
        <div className="learncourse-contact-info">
          <p>For more information, please contact:</p>
          <p>
            <strong>Session Coordinator</strong>
          </p>
          <p>+91-98900 24100</p>
          <p>Email: info@financeshastra.com</p>
        </div>
      </div>
      <p className="learncourse-description">
        The Ultimate Stock Trading Course typically refers to an in-depth,
        comprehensive training program designed to teach individuals the ins
        and outs of stock trading, from basic concepts to advanced strategies.
        Such a course is aimed at traders and investors of various experience
        levels, and it may cover a broad range of topics. The "Ultimate" course
        usually indicates that it goes above and beyond basic education,
        offering extensive resources, expert insights, real-world case studies,
        and actionable strategies that can help students not only learn but
        also execute successful trades.
      </p>
      <button className="learncourse-enroll-button">Learn Now</button>
      </div>
      <div className='learndetailimages'>
        <img src={learn1}/>
      </div>
      </div>
      <div className='headercourselearndetail'>
      <h2 className='courselearnheadertwo'>What You Will Learn</h2>
      <p className='courselearnparatwo'>
        Stock market terminology can often seem complex, with terms like IPOs,
        Stock Splits, Market Trends, and Liquidity. But once you understand the
        basics and see how they apply to real-world situations, they become
        much easier to understand. This course will provide a clear,
        beginner-friendly approach to stock market investing, making it ideal
        for those with no prior financial knowledge. You’ll learn how to
        evaluate investments and understand the key principles that drive the
        markets.
      </p>
      <div className='learnlistcourse'>
      <h2 >Skills You Will Gain</h2>
      <ul className="learncourse-skills-list">
        <li>Gain a Fundamental Understanding of Stock Market Mechanics</li>
        <li>Reasons and Strategies for Investing in the Stock Market</li>
        <li>Master Essential Money Management Techniques</li>
        <li>Develop Effective Risk Management Strategies</li>
      </ul>
      </div>
    </div>
    </div>
    <Navbar/>
    <ModulecourseDetails/>
    <FaqDropdown/>
    <Learncarddetailcourse/>
    <div className="foooterpagesaupdate">
      <FooterForAllPage />
    </div>
    </div>
     
  );
};

export default LearnCourseDetails;