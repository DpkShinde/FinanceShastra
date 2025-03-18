import React, { useState } from 'react';
import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'; // Import the icon
import './RiskProfileForm.css';
import {useNavigate} from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import Cookies from 'js-cookie'


const RiskProfileForm = () => {
      const [formData, setFormData] = useState({});

      const questions = [
            {
                  id: 1,
                  name: "age_range",
                  question: 'Choose your age range',
                  options: ['Under 30 years', '31–40 years', '41–54 years', '55 years & Above'],
            },
            {
                  id: 2,
                  name: "income_range",
                  question: 'Choose your annual personal income range',
                  options: ['0–2 lakh', '2–5 lakh', '5–10 lakh', '10–20 lakh', '20 lakh & Above'],
            },
            {
                  id: 3,
                  name: "invest_percentage_range",
                  question: 'What percentage of your income can you afford to invest?',
                  options: ['0–10', '11–30', '31–50', '51 & Above'],
            },
            {
                  id: 4,
                  name: "equity_portfolio_size",
                  question: 'What is your approximate equity portfolio size?',
                  options: ['0–5 lakh', '5–10 lakh', '10–20 lakh','20-100 lakh', '100 lakh and above'],
            },
            {
                  id: 5,
                  name: "high_returns_high_risk_investment",
                  question: 'In order to achieve high returns, I am willing to choose high-risk investments.',
                  options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
                  id: 6,
                  name: "major_exp_time_range",
                  question: 'Time period after which first major expenditure is expected',
                  options: ['Less than 1', '1–3', '3–5', '5–10', 'More than 10'],
                  },
            {
                  id: 7,
                  name: "dependents",
                  question: 'Number of people who are financially dependent on you',
                  options: ['0', '1', '2–3', '4–5', 'More than 5'],
            },
            {
                  id: 8,
                  name: "stress",
                  question: 'I get stressed easily.',
                  options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
                  id: 9,
                  name: "car_insurence",
                  question:
                  'Imagine your car insurance has expired. The renewal policy will be effective in 3 days. In the interim period, what would you do?',
                  options: [
                  'I will not drive the car at all the next week. Only use the car when absolutely required.Use the car not as frequently as normal',
                  "I don't care; the chances of an accident in a week are low anyway"
                  ],
            },
            {
                  id: 10,
                  name: "fear",
                  question: 'I fear for the worst.',
                  options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
                  id: 11,
                  name: "risky_investments",
                  question:
                  'Even if I experienced a significant loss on an investment, I would still consider making risky investments.',
                  options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
                  id: 12,
                  name: "max_pro_loss_prepared",
                  question:
                  'What percentage of your portfolio are you comfortable investing on the long term (5 - 10 years) in high risk, high return stocks which can show up and downs in short term?',
                  options: ['0', '1–15%', '16–30%', '31-50%', 'More than 50%'],
            },
            {
                  id: 13,
                  name: "willingToRisk_forGoodReturns",
                  question:
                  'I am willing to risk a significant amount of my investible wealth in order to get a good return.',
                  options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
                  id: 14,
                  name: "max_loss_prepared",
                  question:
                  'Investments can go up or down in value, given the risk-return equation. What is the maximum loss you are prepared to accept on your portfolio?',
                  options: ['0–10%', '11–20%', '21–35%', 'More than 35%'],

            },
            {
            id: 15,
            name: "uncertainty",
            question: 'Uncertainty makes me uneasy, anxious or stressed.',
            options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
            id: 16,
            name: "philosophy",
            question: 'Which of the following statements best describes your investment philosophy and risk tolerance?',
            options: ['I want my investments to be completely  safe and I am happy with the returns equivalent to bank deposits.',
            'want my investments to be safe and I am looking to achieve returns slightly higher than bank deposits.',
            'I aim to preserve my investments while accepting minor short-term losses for returns higher than bank deposits.',
            'I aim to grow my investments and am willing to accept moderate losses for the potential of earning significantly higher returns than bank deposits.'],
            },
            {
            id: 17,
            name: "botheredBy_things",
            question: 'I am not easily bothered by things..',
            options: ['Strongly Agree', 'Strongly Disagree'],
            },
            {
            id: 18,
            name: "risk_taker",
            question: 'I am a financial risk taker.',
            options: ['Strongly Agree', 'Strongly Disagree'],
            },
      ];

      const handleOptionClick = (id, qname, option) => {
            setFormData((prevData) => ({
                  ...prevData,
                  [id]: option,
                  [qname]: option,
            }));
      };

      const keysToKeep = [
            "age_range",
            "income_range",
            "invest_percentage_range",
            "equity_portfolio_size",
            "high_returns_high_risk_investment",
            "major_exp_time_range",
            "dependents",
            "stress",
            "car_insurence",
            "fear",
            "risky_investments",
            "max_pro_loss_prepared",
            "willingToRisk_forGoodReturns",
            "max_loss_prepared",
            "uncertainty",
            "philosophy",
            "botheredBy_things",
            "risk_taker",

      ];
      const navigate = useNavigate();
      const handleSubmit = async (e) => {
            e.preventDefault(); // Prevent the default form submission behavior

            const filteredData = Object.keys(formData)
            .filter((key) => keysToKeep.includes(key))
            .reduce((obj, key) => {
            obj[key] = formData[key];
            return obj;
            }, {});

            const token= (Cookies.get('jwtToken'))

            const geturl= `${API_BASE_URL}/riskanalysis`

            const getoptions={
                  method: "get",
                  headers: {
                        "Authorization": `Bearer ${token}`
                  }
            }
            const res= await fetch(geturl, getoptions)
            const arr= await res.json()

            if (arr.length ===0){
            const options= {
                  method: "POST",
                  body: JSON.stringify(filteredData),
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                  }
            }
            const url= `${API_BASE_URL}/riskanalysis/qanda`
            const response= await fetch(url, options)
            console.log("response:", response)
            if (response.ok){
                  alert('Form Submitted successfully');
            }
            

            }else{
            const options= {
            method: "PUT",
            body: JSON.stringify(filteredData),
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
            }
            const url= `${API_BASE_URL}/riskanalysis/updaterisk`
            const putresponse= await fetch(url, options)
            console.log("putresponse:", putresponse)
            if (putresponse.ok){
                  alert('Form Submitted successfully');
            }
            
            }




            //alert('Form Submitted successfully');
            /*navigate('/profileRiskReportInvestment');*/ // Correct use of the navigate function
      };

      return (
      <form onSubmit={handleSubmit} className="riskProfileFormAll">
      <div className="riskProfileFormpara">
      <h4>**Please note: You can submit this questionnaire only once in 6 months so please answer the questions carefully to get the correct analysis and solution.</h4>
      </div>
      <div className="questions-rowww">
      {questions.map((q, index) => (
      <div key={q.id} className={`question-card ${index % 3 === 2 ? 'last-card' : ''}`}>
      <h4>{q.id}. {q.question}</h4>
      <div className="option-cards"
      style={{
      flexDirection: q.id === 1-30 ? 'column' : 'row', // Column for ID 16, row for others

      gap: '-20px', // Add some spacing between options
      }}
      >

      <div className="option-row"   style={{
      flexDirection: q.id ===16 ? 'column' : 'row', // Column for ID 16, row for others

      gap: '-20px', // Add some spacing between options
      }}
      >
      {q.options.map((option, idx) => (
      <label
      key={idx}
      className={`option-card ${q.id === 16 || q.id === 9 ? 'no-width-padding' : ''}`}
      style={q.id === 16 || q.id === 9 ? { width: 'auto', padding: '0' } : {}}
      onClick={() => handleOptionClick(q.id, q.name, option)}
      >
      {/* Use FaRegSquare or FaRegCheckSquare based on selection */}
      {formData[q.id] === option ? (
      <FaRegCheckSquare
      style={{
      marginRight: '8px',
      fontSize: 
      q.id === 9 && idx === 0
      ? '32px' // Larger icon for the first option of question ID 9
      : q.id === 9 && idx === 1
      ? '17px' // Medium icon for the second option of question ID 9
      : q.id === 16 && idx === 3
      ? '20px' // Custom size for question ID 16, if needed
      : q.id === 16 && idx === 4
      ? '50px'
      : q.id === 16
      ? '20px' // Custom size for all options of question ID 16
      : '15px', // Default icon size for all other options
      }}
      />

      ) : (
      <FaRegSquare
      style={{
      marginRight: '8px',

      fontSize:
      q.id === 9 && idx === 0
      ? '32px' // Larger icon for the first option of question ID 9
      : q.id === 9 && idx === 1
      ? '17px' // Medium icon for the second option of question ID 9
      : q.id === 16 && idx === 3
      ? '20px' // Custom size for question ID 16, if needed
      : q.id === 16 && idx === 4
      ? '50px'
      : q.id === 16
      ? '20px' // Custom size for all options of question ID 16
      : '15px', // Default icon size for all other options
      }}

      />

      )}
      {option}
      </label>
      ))}


      </div>
      </div>
      </div>
      ))}
      </div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      );
};

export default RiskProfileForm