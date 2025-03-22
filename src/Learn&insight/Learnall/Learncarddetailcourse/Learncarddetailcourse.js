import React from "react";
import './Learncarddetailcourse.css';
import learning2 from "../../../assest/learn2.jpeg";
import { LuClock9 } from "react-icons/lu";
import Navbar from '../../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
// Course Data
const courses = [
   {
      id: 1,
      title: "Trading Psychology: How Positive Mindset Helps in Trading",
      duration: "3:15 Hours",
      description:
        "Mastering trading psychology is essential for success in the stock market, as it impacts every aspect of a trader's decisions, actions, and performance.",
      buttonText: "Start Learning",
      img: learning2,
    },
    {
      id: 2,
      title: "Stock Market Basics Course: Learn Stock Market Basics Online",
      duration: "2:00 Hours",
      description:
        "Our Stock Market Basics course is designed to introduce you to essential concepts such as indices and strategic investments.",
      buttonText: "Start Learning",
      img: learning2,
    },
    {
      id: 3,
      title: "Mutual Fund Course: Free Mutual Fund Course Online",
      duration: "2:30 Hours",
      description:
        "These stock trading courses explain key terms like Equity Funds, NFO, NAV, Debt Fund, Beta, Alpha, and more.",
      buttonText: "Start Learning",
      img: learning2,
    },
]

const Learncarddetailcourse = () => {
  const navigate = useNavigate();
  return (
    <div className="course-containerdetail">

      {/* Course Cards */}
      <h1 className="courseexplorehead">Explore Other Courses</h1>
      <div className="courses">
        {courses.map((course) => (
          <div key={course.id} className="course-cardd">
            <span className="badge">Free</span>
            <h2 >{course.title}</h2>
            <p className="learnduration"><LuClock9 className="durationlearnicon"/>{course.duration}</p>
            <p>{course.description}</p>

            {/* Footer Row: Image and Button */}
            <div className="learncard-footer">
             
            <button className="startlearnsignup-button">{course.buttonText}</button>
              <img src={course.img} alt={course.title} className="course-image" />
            </div>
          </div>
        ))}
      </div>
      <Navbar/>
    </div>
  );
};

export default Learncarddetailcourse;