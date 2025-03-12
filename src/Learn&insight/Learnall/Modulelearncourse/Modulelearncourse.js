import React, { useState } from 'react';
import './Modulelearncourse.css'; // Ensure you have your styles
import moduleIcon from '../../../assest/desktop.jpeg';
import instructorImage from '../../../assest/instructor.jpg';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const ModulecourseDetails = () => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (id) => {
    setOpenModule(openModule === id ? null : id); // Toggle logic
  };

  const modules = [
    {
      id: 1,
      title: 'Introduction to Stock Trading and Technical Analysis',
      duration: '1:00 Hours',
      answer: "Stock trading and technical analysis provide a framework for individuals to navigate the complexities of the stock market. Stock trading and technical analysis provide a framework for individuals to navigate the complexities of the stock market. Technical analysis enables traders to identify trends, patterns, and price movements, while stock trading teaches how to make profits through the buying and selling of stocks."
    },
    {
      id: 2,
      title: 'Identifying Key Breakouts for Trading Opportunities',
      duration: '1:40 Hours',
      answer: "Breakouts in trading refer to the moment when the price of a stock, commodity, or asset moves beyond a defined level of support or resistance, often signaling the start of a new trend. Identifying breakouts early can be highly profitable for traders, as it offers opportunities to capitalize on significant price movements."
    },
    {
      id: 3,
      title: 'Trading with the RSI Indicator',
      duration: '2:20 Hours',
      answer: "The Relative Strength Index (RSI) is one of the most widely used technical indicators in stock trading, designed to measure the speed and change of price movements. It helps traders identify overbought or oversold conditions in a market, providing valuable insights into potential trend reversals and continuation signals."
    },
    {
      id: 4,
      title: 'Risk Management Strategies',
      duration: '1:00 Hours',
      answer: "Risk management is one of the most crucial aspects of successful trading. It involves protecting your trading capital from large  losses by using strategies that ensure you are not overexposed to any single trade or market condition. Effective risk management allows traders to stay in the game long enough to take advantage of profitable opportunities while minimizing the impact of inevitable losses"
    },
  ];

  return (
    <div className="modulelearncourse-container">
      <div className="modulelearncourse-section">
        {modules.map((module) => (
          <div key={module.id} className="modulelearncourse-card">
            <div className='allmoduleaa'>
            <div className="modulelearncourse-icon">
              <img src={moduleIcon} alt="Module Icon" />
            </div>
          
            <div className="modulelearncourse-info">
              <p className="modulelearncourse-title">
                <strong className='moduleid'>Module {module.id} :</strong> <br />{module.title}
              </p>
              <p className="modulelearncourse-duration" onClick={() => toggleModule(module.id)}>
                1 Video • {module.duration}{" "}
                {openModule === module.id ? <FaAngleUp className='moduledownicon'/> : <FaAngleDown className='moduledownicon'/>}
              </p>
            </div>
            </div>
            {/* Answer inside the card */}
            {openModule === module.id && (
              <div className="modulelearncourse-answer">
                <p>{module.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="modulelearncourse-instructor">
        <h3>Meet your instructor</h3>
        <div className="modulelearncourse-instructor-details">
          <img
            className="modulelearncourse-instructor-image"
            src={instructorImage}
            alt="Instructor"
          />
          <div className="modulelearncourse-instructor-info">
            <h4>Nagnath Shinde</h4>
            <p className="modulelearncourse-instructor-role">
              Director - Content, FinanceShastra
            </p>
            <p className="modulelearncourse-instructor-experience">
              10 years of experience
            </p>
            </div><br/>
           
        </div>
      </div>
      <p className="modulelearncourse-instructor-bio">
              Nagnath Shinde is a seasoned stock market professional with more
              than 10 years of experience in equity trading. He is recognized as
              a reliable authority in the investment world, with a strong
              commitment to simplifying complex financial principles and
              guiding individuals toward financial success.
            </p>
          
    </div>
  );
};

export default ModulecourseDetails;
