import React from "react";
import "./Learncard.css";
import learning1 from "../../../assest/learn1.jpeg";
import learning2 from "../../../assest/learn2.jpeg";
import { LuClock9 } from "react-icons/lu";
import Navbar from '../../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";
import Cookies from 'js-cookie'
// Course Data
const courses = [
  {
    id: 1,
    title: "Trading Psychology: How Positive Mindset Helps in Trading",
    duration: "3:15 Hours",
    description:
      "Mastering trading psychology is essential for success in the stock market, as it impacts every aspect of a trader's decisions, actions, and performance.",
    buttonText: "Signup Now",
    img: learning2,
  },
  {
    id: 2,
    title: "Stock Market Basics Course: Learn Stock Market Basics Online",
    duration: "2:00 Hours",
    description:
      "Our Stock Market Basics course is designed to introduce you to essential concepts such as indices and strategic investments.",
    buttonText: "Signup Now",
    img: learning2,
  },
  {
    id: 3,
    title: "Mutual Fund Course: Free Mutual Fund Course Online",
    duration: "2:30 Hours",
    description:
      "These stock trading courses explain key terms like Equity Funds, NFO, NAV, Debt Fund, Beta, Alpha, and more.",
    buttonText: "Signup Now",
    img: learning2,
  },
  {
    id: 4,
    title: "Fundamental Analysis Course: Learn Fundamental Analysis Online",
    duration: "3:00 Hours",
    description:
      "This thoughtfully crafted stock market beginner course helps learners understand fundamental market concepts and technologies.",
    buttonText: "Signup Now",
    img: learning2,
  },
  {
    id: 5,
    title: "Equity Derivatives Course: Learn Equity Derivatives Online",
    duration: "2:00 Hours",
    description:
      "This online market course provides a deeper understanding of equity and derivative investment strategies.",
    buttonText: "Signup Now",
    img: learning2,
  },
  {
    id: 6,
    title: "Commodity Trading Course: Free Commodity Market Course Online",
    duration: "2:15 Hours",
    description:
      "The Commodity Trading course offers valuable insights into different types, investment methods, and benefits of trading commodities.",
    buttonText: "Signup Now",
    img: learning2,
  },
];

const Learncard = () => {
  const navigate = useNavigate();
  const token = Cookies.get('jwtToken')
  return (
    <div>
      <div className="course-container">
        {/* Header Section */}
        <header className="headerlearn">
          <div className="learntop">
            <h1 className="learnhead">Learn<br /><br />Investment Strategies Learning</h1>
            <p className="learnpara">
              Uncover the top stock market courses that can help you advance in your
              financial career. At FinanceShastra, we provide comprehensive lessons
              on everything you need to know about the stock market.
            </p>
            <p className="learnpara">Take a look at the wide range of stock trading courses
              in India available for you to learn here:</p>
          </div>
          <img src={learning1} alt="Learning" className="headerlearn-image" />
        </header>

        {/* Course Cards */}
        <h1 className="coursetophead">All courses</h1>
        <div className="courses">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <span className="badge">Free</span>
              <h2 >{course.title}</h2>
              <p className="learnduration"><LuClock9 className="durationlearnicon" />{course.duration}</p>
              <p>{course.description}</p>

              {/* Footer Row: Image and Button */}
              <div className="learncard-footer">

                <button
                  className="learnsignup-button"
                  onClick={() => navigate('/learncardaftersignup')}
                >
                  {token ? "Start Learning" : "Signup Now"}
                </button>
                <img src={course.img} alt={course.title} className="course-image" />
              </div>
            </div>
          ))}
        </div>
        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default Learncard;