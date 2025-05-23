import React, { useState, useContext } from "react";
import "./Managealert.css"; // Add your styles here
import Navbar from "../../Navbar/Navbar";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import useSubscriptionStatus from "../../Navbar/Hooks/useSubscriptionStatus";
import AccountBar from "../AccountBar";

const Managealert = () => {
  const navigate = useNavigate();
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
  const [activeNotification, setActiveNotification] = useState(null);
  const [subscribedItems, setSubscribedItems] = useState({});
  const subscriptionData = [
    {
      title: "E-mailers/ SMS",
      items: [
        "Site information/ Feature usage",
        "Site information/ Feature usage Subscribe",
        "Promotional/ Special offers",
        "Investment Shastra Newsletter",
        "Smart Alerts",
      ],
    },
    {
      title: "E-mailers/ SMS Alerts",
      items: [
        "Buy/Sell Price triggers",
        "Right Timing Buy/Sell signals",
        "Stop Loss alerts",
      ],
    },
  ];
  const handleSubscribe = (item) => {
    setSubscribedItems((prevState) => {
      const newState = { ...prevState, [item]: !prevState[item] };
      
      // Notification ke liye state update karna
      setActiveNotification(item);
  
      // Set a timeout for hiding notification
      setTimeout(() => {
        setActiveNotification(null); // Sirf notification hide hoga, subscription state change nahi hogi
      }, 6000);
  
      return newState;
    });
  };
  
  const handleNotificationClose = (item) => {
    setSubscribedItems((prevState) => {
      const newState = { ...prevState };
      delete newState[item]; // Remove the item from the state after the notification
      return newState;
    });
  };

  return (
    <div>
    <div className="managealertalldata">
      <h1 className="profilepage-titleorder">Manage Alert</h1>
      <AccountBar/>
      <p className="descriptionnalert">
        You may unsubscribe from any Email/SMS alerts' category by clicking on
        the <br />
        respective links below. If you have any query, feel free to{" "}
        <a href="/contactus" className="contact-link">
          contact us
        </a>
        .
      </p>
      {subscriptionData.map((category, index) => (
        <div key={index} className="subscription-category">
          <h2 className="category-title">{category.title}</h2>
          {category.items.map((item, idx) => (
            <div key={idx} className="subscription-item">
              <div className="subscriptionitemmboth">
                <span className="item-name">{item}</span>
                {subscribedItems[item] !== undefined && (
                  <div className="notification-alert">
                    {subscribedItems[item] ? (
                      <div className="subscribersuccesful">
                        You have successfully subscribed to "{item}"!
                      </div>
                    ) : (
                      <div className="unsubscribersuccesful">
                        You have successfully unsubscribed from "{item}"!
                      </div>
                    )}
                    <span
                      className="close-notification"
                      onClick={() => handleNotificationClose(item)}
                    ></span>
                  </div>
                )}
              </div>
              <button
                className={
                  subscribedItems[item]
                    ? "unsubscribe-button"
                    : "subscribe-buttonmanage"
                }
                onClick={() => handleSubscribe(item)}
              >
                {subscribedItems[item] ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      ))}
      {
        !isSubscribed && !isLoading  && 
        <div className="subscribe-footerrmanagealert">
        <h1 className="headingmanagealert">Subscribe Now!</h1>
        <h2>Choose a plan that aligns with your investment goals!</h2>
        <button className="footer-subscribe-buttonmanage" onClick={()=>{navigate('/subscription')}} >Subscribe</button>
      </div>
      }
      
      <Navbar />
    
    </div>
    <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default Managealert;
