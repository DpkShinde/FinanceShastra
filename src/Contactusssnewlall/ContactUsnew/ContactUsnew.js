
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import contactimg from "../../assest/contactus.png";
import imgiconss from "../../assest/locaton.svg";
import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import "./ContactUsnew.css";
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

const ContactUsnew = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [errors, setErrors] = useState({ email: "", message: "", name: "" });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const nameField = form.name.value.trim();
    const emailField = form.email.value.trim();
    const messageField = form.message.value.trim();

    const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate form fields
    const newErrors = {
      name: nameField === "" ? "Full name is required" : "",
      email: emailField === "" ? "Email is required" : !emailRegex.test(emailField) ? "Enter a valid email" : "",
      message: messageField === "" ? "Message is required" : "",
    };

    setErrors(newErrors);

    // If there are no errors, consider the form valid
    if (Object.values(newErrors).every((error) => error === "")) {
      setShowPopup(true); // Show popup on success
      form.reset();
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
    <div className="contactus-financeshastra">
      <div className="headercontactttimage">
        <div>
          <h1>Contact US</h1>
          <h3>
            Feel free to reach out with any questions about our product,
            collaborations, or suggestions you might have.
          </h3>
        </div>
        <div className="contactimageee">
          <img src={contactimg} alt="Contact Us" />
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h4 className="icon-header">
            <img src={imgiconss} alt="Location Icon" className="header-icon" /> We are based at
          </h4>
          <h2>FinanceShastra</h2>
          <p>Corporate & Registered Office:</p>
          <p>Pune, Maharashtra 411007, IN</p>
          <div className="contact-detailsneww">
            <p>
              <LuPhone className="contact-iconnnss" /> (+91) 9067604020
            </p>
            <p>
              <MdOutlineMail className="contact-iconnnss" /> info@financeshastra.com
            </p>
            <p>
              <FaGlobe className="contact-icon globe-contact-icon" />
              <a href="https://financeshastra.com/">https://financeshastra.com/</a>
            </p>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Full name*</label>
            <input
              type="text"
              id="name"
              placeholder="Type here"
              required
              className={errors.name ? "validate" : ""}
            />
            {errors.name && <small className="errorcontact-message">{errors.name}</small>}

            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              placeholder="Type here"
              required
              className={errors.email ? "validate" : ""}
            />
            {errors.email && <small className="errorcontact-message">{errors.email}</small>}

            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              placeholder="Type here"
              required
              className={errors.message ? "validate" : ""}
            ></textarea>
            {errors.message && <small className="errorcontact-message">{errors.message}</small>}

            <button type="submit" className="contactsubmit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="issue-resolution">
        <h2>Issue Resolution Hierarchy</h2>
        <table>
          <thead>
            <tr>
              <th>Details of</th>
              <th>Contact No.</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Customer Care</td>
              <td>9067604020</td>
              <td>care@financeshastra.com</td>
            </tr>
            <tr>
              <td>Compliance Officer</td>
              <td>9226608469</td>
              <td>Compliance@financeshastra.com</td>
            </tr>
          </tbody>
        </table>
        <p>
          If you do not receive a response or if your complaint remains unresolved to
          your satisfaction, you may escalate the matter to SEBI or the relevant Exchange (NSE, BSE, MCX, CDSL).
          Please provide your Service Ticket/Complaint Reference Number when filing your complaint on the SEBI SCORES portal,
          Exchange platform, or Depository portal.
        </p>
      </div>

      <div className="additional-help">
        <h2>Have additional questions?</h2>
        <p>
          Our team is ready to provide answers to all your trading and
          investing-related concerns. We’re here to assist you!
        </p>
        <button onClick={() => navigate('/contactCards')}>
      Access further help →
    </button>
      </div>
     
      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlaycontact">
          <div className="popup-contentcontact">
          <button onClick={() => setShowPopup(false)}><RxCross1 /></button>
            <h2>Form Submitted Successfully!</h2>
            <p>Thank you for reaching out. We will get back to you soon.</p>
           
          </div>
        </div>
      )}
     
    </div>
    <Navbar/>
    <div className="foooterpagesaupdate">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default ContactUsnew;
