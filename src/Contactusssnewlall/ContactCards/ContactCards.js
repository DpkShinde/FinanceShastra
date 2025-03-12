
import "./ContactCards.css"; // Optional: Add styling in an external CSS file
import emailimg from "../../assest/letter.png";
import chatimg from "../../assest/whatsappp.jpeg";
import headphoneimg from "../../assest/headphone.png";
import contactimg from "../../assest/contactus.png";
import instaimg from "../../assest/intsaa.svg";
import linkimg from "../../assest/linkk.svg";
import twitterimg from "../../assest/twitter.svg";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";
import React, { useState } from "react";
import ChatBox from "../Chatbox/Chatbox";


const ContactCards = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

 
  const [showOptions, setShowOptions] = useState(false);

  const socialLinks = [
    {
      img: linkimg,
      url: "https://www.linkedin.com/company/FinanceShastra",
      label: "LinkedIn",
    },
    {
      img: instaimg,
      url: "https://www.instagram.com/FinanceShastra/",
      label: "Instagram",
    },
    {
      img: twitterimg,
      url: "https://twitter.com/FinanceShastra",
      label: "Twitter",
    },
  ];


  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen); // Toggle the chatbox visibility
  };
  return (
    <div className="contacthelpcarddds">
         <div className="headercontactttimagehelpcenter">
                <div>
                  <h1>Contact US</h1>
                  <h2 className="headerparagraph">
                    Feel free to reach out with any questions about our product,
                    collaborations, or suggestions you might have.
                  </h2>
                </div>
                <div className="contactimageeehelpcenter">
                  <img src={contactimg} alt="Contact Us" />
                </div>
              </div>
      <h2 className="gethelp">Get clarification on all your concerns.</h2>
      <div className="cardshelpcenter">
        {/* Email Us Card */}
        <div className="cardhelpcenter">
          <div className="cardhelpcenter-icon"><img src={emailimg}/></div> {/* Replace with an actual icon component */}
          <h3>Email Us at</h3>
          <h4>info@financeshastra.com</h4>
          <p>Accessible 24/7 for users</p>
          <button
    onClick={() => {
      window.location.href = "mailto:info@financeshastra.com";
    }}
  >
    Send Email →
  </button>
        </div>

        {/* Connect with Us Card */}
        <div className="cardhelpcenter">
          <div className="cardhelpcenter-icon"><img src={chatimg}/></div>
          <h3>Connect with Us</h3>
          <h4>9 AM to 6 PM</h4>
          <p>Monday to Saturday</p>
          <button
    onClick={() => {
      window.location.href = "https://wa.me/9067604020"; //  WhatsApp number
    }}
  >
    Connect to Chat →
  </button>
        </div>

        {/* Call Assistance Card */}
        <div className="cardhelpcenter">
          <div className="cardhelpcenter-icon"><img src={headphoneimg}/></div>
          <h3>Call Assistance</h3>
          <h4>(+91) 9067604020</h4>
          <p>Our support is open from 9:00 AM to 6:00 PM on trading days.</p>
       
        </div>

        {/* Social Media Card */}
        <div className="cardhelpcenter">
          <div className="cardhelpcenter-icon"><img src={instaimg}/>
          <img src={linkimg}/>
          <img src={twitterimg}/></div> 
          <h3>@ FinanceShastra on<br/> Social media</h3>
          <p>Reach out to our social media team for assistance.</p>
          <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowOptions(!showOptions)}
       
      >
        Open App →
      </button>
      {showOptions && (
        <div
          style={{
            position: "absolute",
            top: "130%",
            left: 0,
            backgroundColor: "#FFF",
            border: "1px solid #DDD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            zIndex: 1000,
            width:"170px"
          }}
        >
          
          {socialLinks.map(({ img, url, label }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px",
                textDecoration: "none",
                color: "#333",
              
              }}
              >
              <img
                src={img}
                alt={label}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                }}
              />
              <span>{label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
        </div>
      </div>
      <Navbar/>
      <div className="foooterpagesaupdate">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default ContactCards;
