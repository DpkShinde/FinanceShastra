import React from "react";
import "./Errorpage.css";
import imgerror from'../assest/errorimg.png';
import Navbar from "../Navbar/Navbar";
import FooterForAllPage from "../FooterForAllPage/FooterForAllPage";
const Errorpage = () => {
    return (
        <div>
        <div className="page-container">
          <h1 className="error-heading">OOPS!</h1>
          <div className="error-box">
            <div>
              <img
                src={imgerror}
                alt="Error illustration"
                className="error-image"
              />
            </div>
            <p className="messagepageerror-message">"Oops! We can't seem to find the page you're looking for."</p>
            <button
              className="errorhomepage-button"
              onClick={() => (window.location.href = "/")}
            >
              Go to homepage
            </button>
          </div>
          <Navbar/>
        </div>
        <div className="foooterpagesatt">
        <FooterForAllPage />
      </div>
      </div>
      );
    };
    

export default Errorpage;
