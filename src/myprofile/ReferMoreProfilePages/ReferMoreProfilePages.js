import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import insta from "../../assest/insta.jpeg";
import lin from "../../assest/linkl.jpeg";
import ximg from "../../assest/ximg.jpeg";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./ReferMoreProfilePages.css";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

const ReferMoreProfilePages = () => {
  const [inputs, setInputs] = useState([
    {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
    },
  ]);
  const navigate = useNavigate();
  //getting jwt token
  const token = Cookies.get("jwtToken");

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = { ...newInputs[index], [name]: value };
      return newInputs;
    });
  };
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      { firstName: "", lastName: "", mobileNumber: "", email: "" },
    ]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const validateField = (input) => {
    const errors = {};

    // Validate first name
    if (!input.firstName) errors.firstName = "First name is required";

    // Validate last name
    if (!input.lastName) errors.lastName = "Last name is required";

    // Validate email (with .com check)
    const isEmailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) &&
      input.email.endsWith(".com");
    if (!input.email) errors.email = "Email is required";
    else if (!isEmailValid)
      errors.email = "Invalid email. It should end with .com";

    // Validate mobile number (example: should be at least 10 characters)
    if (!input.mobileNumber) errors.mobileNumber = "Mobile number is required";
    else if (input.mobileNumber.length < 10)
      errors.mobileNumber = "Mobile number must be at least 10 digits";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValidForm = true;
    const updatedInputs = inputs.map((input) => {
      const validationResults = validateField(input);
      const inputIsValid =
        !validationResults.firstName &&
        !validationResults.lastName &&
        !validationResults.mobileNumber &&
        !validationResults.email;

      if (!inputIsValid) isValidForm = false;

      return {
        ...input,
        touched: true, // Mark fields as touched
        errors: validationResults, // Store validation errors
      };
    });

    setInputs(updatedInputs);

    if (isValidForm) {
      // api call
      try {
        const { firstName, lastName, mobileNumber, email } = inputs[0];
        const url = `${API_BASE_URL}/referrals/send-referral-email`;
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referredFirstName: firstName,
            referredLastName: lastName,
            referredMobileNo: mobileNumber,
            referredEmail: email,
          }),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          alert(data.message);
          setInputs([
            {
              firstName: "",
              lastName: "",
              mobileNumber: "",
              email: "",
            },
          ]);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isFormValid = inputs.every(
    (input) => !input.errors || Object.keys(input.errors).length === 0
  );
  return (
    <div>
    <div className="profilepageee-container">
      <h1 className="profilepage-title" style={{ fontFamily: "Calibri" }}>
        My Referrals
      </h1>

      <div className="profilepage-tabsorderusers">
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/userDetailsupdate")}
        >
          My Account
        </span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/billingSubscriptionPages")}
        >
          Billing & Subscription
        </span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/riskAnalysisDashboard")}
        >
          Risk Profile Report
        </span>
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
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/sessionHistory")}
        >
          Active Devices
        </span>
        <span
          className="profilepage-tabb"
          style={{
            borderBottom: "2px solid #24b676",
            fontWeight: "bold",
            color: "#24b676",
          }}
          onClick={() => navigate("/myReferalPage")}
        >
          My referrals
        </span>
      </div>

      <div className="myreferalpagesss">
        {/* Header Section */}
        <div className="myreferalpagesss-header">
          <div className="myreferalpagesss-header-row">
            <h1>
              Assist your friends in their investment journey and reach
              financial independence faster.
            </h1>
            <a href="#" className="myreferalpagesss-benefits-link">
              View benefits
            </a>
          </div>

          <div className="myreferalpagesss-buttons">
            <button
              className="myreferalpagesss-button "
              onClick={() => navigate("/myReferalPage")}
            >
              Overview
            </button>
            <button
              className="myreferalpagesss-button active"
              onClick={() => navigate("/referMoreProfilePages")}
            >
              Refer More
            </button>
            <button
              className="myreferalpagesss-button "
              onClick={() => navigate("/earningCalculatorProfilePage")}
            >
              Earning Calculator
            </button>
            <button
              className="myreferalpagesss-button"
              onClick={() => navigate("/reffeerralProfilePageSSS")}
            >
              My Referrals
            </button>
          </div>
        </div>
        <div className="refermoreprofilepages-container">
          <div className="refermoreprofilepages-content">
            {/* Left Section */}
            <div className="refermoreprofilepages-left">
              <div className="refermoreprofilepages-share">
                <h3>SHARE</h3>
                <ul>
                  <li>
                    <img src={insta} alt="Instagram" />
                  </li>
                  <li>
                    <img src={lin} alt="LinkedIn" />
                  </li>
                  <li>
                    <img src={ximg} alt="X (Twitter)" />
                  </li>
                  <li>
                    <CiBookmark />
                  </li>
                </ul>
              </div>
            </div>

            {/* "OR" Section */}
            <div className="refermoreprofilepages-or">OR</div>

            {/* Right Section */}
            <div className="refermoreprofilepages-right">
              <h2>
                Provide the information below and send the invite, along with a
                complimentary book.
              </h2>
              <form onSubmit={handleSubmit}>
                {inputs.map((input, index) => {
                  const validationResults = validateField(input);
                  return (
                    <div
                      key={index}
                      className="refermoreprofilepages-input-group"
                    >
                      {/* First Name */}
                      <div
                        className={`refermoreprofilepages-floating-input ${input.touched && validationResults.firstName
                          ? "error"
                          : ""
                          }`}
                      >
                        <label>First name*</label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Type here"
                          value={input.firstName}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {input.touched && validationResults.firstName && (
                          <p className="error-messagerefer">
                            {validationResults.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div
                        className={`refermoreprofilepages-floating-input ${input.touched && validationResults.lastName
                          ? "error"
                          : ""
                          }`}
                      >
                        <label>Last name*</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Type here"
                          value={input.lastName}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {input.touched && validationResults.lastName && (
                          <p className="error-messagerefer">
                            {validationResults.lastName}
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div
                        className={`refermoreprofilepages-floating-input ${input.touched && validationResults.mobileNumber
                          ? "error"
                          : ""
                          }`}
                      >
                        <label>Mobile number*</label>
                        <input
                          type="text"
                          name="mobileNumber"
                          placeholder="Mobile number"
                          value={input.mobileNumber || ""}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {input.touched && validationResults.mobileNumber && (
                          <p className="error-messagerefer">
                            {validationResults.mobileNumber}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div
                        className={`refermoreprofilepages-floating-input ${input.touched && validationResults.email
                          ? "error"
                          : ""
                          }`}
                      >
                        <label>Email id*</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Type here"
                          value={input.email || ""}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {input.touched && validationResults.email && (
                          <p className="error-messagerefer">
                            {validationResults.email}
                          </p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="refermoreprofilepages-button-group">
                        <button
                          type="button"
                          className="refermoreprofilepages-remove-button"
                          onClick={() => handleRemoveInput(index)}
                        >
                          <RiDeleteBinLine />
                        </button>
                        <button
                          type="button"
                          className="refermoreprofilepages-add-button"
                          onClick={handleAddInput}
                        >
                          <CiCirclePlus />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="refermoreprofilepages-submit-button"
                  disabled={!isFormValid}
                >
                  Submit Details
                </button>
              </form>
            </div>
          </div>

          <h3 className="refermoreprofilepagess-email-templateh3">
            Kindly follow the email format provided below.
          </h3>
          <div className="refermoreprofilepagess-email-template">
            <div className="refermoreprofilepagess-email-content">
              <p>Hi ....,</p>
              <p>
                I’ve come to the realization that investing in equities is far
                too important to leave in the hands of others. Financial freedom
                is within reach for anyone who invests successfully. The
                challenge, however, is overcoming my own doubts—understanding
                how to approach investing, what steps to take, and whether I
                have the right resources to make sound decisions. These are
                questions every investor must answer.
              </p>
              <p>
                I found the book{" "}
                <strong>
                  How the Heck to Invest and Reach Nirvana: A 5-Step Journey to
                  Financial Freedom
                </strong>
                by Raymond Moses, founder of FinanceShastra, to be a real
                game-changer.
              </p>
              <p>
                I strongly recommend you get a copy. All you need to do is
                register on FinanceShastra at financeshastra.com, and they will
                send you the book for free, delivered right to your door. They
                will reach out to you via call or message to confirm your
                shipping details.
              </p>
              <p>Simply register at financeshastra.com.</p>
              <p>
                Thanks,
                <br />
                William Rober
              </p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />

     
    </div>
    <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default ReferMoreProfilePages;
