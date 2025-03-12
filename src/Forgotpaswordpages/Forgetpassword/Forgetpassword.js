import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgetpassword.css";
import logoimg from "../../assest/finanlogo.svg";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

function Forgetpassword() {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const override = {
    display: "block",
    textAlign: "center",
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError(""); // Clear error if valid
      console.log("Form submitted with email:", email);
      // Add API call or navigation here
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setIsResetPasswordStep(false);
  };

  //function to send password reset link on user mail
  const handleForgotPasswordEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = `${API_BASE_URL}/users/forget-password`;
      const token =Cookies.get("jwtToken");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data =await response.json();

      if (response.ok) {
        alert("Password reset link sent to your email!");
        navigate("/openemailforgotpass")
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the request.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleResetPassword = (e) => {
  //   e.preventDefault();
  //   if (!validatePassword(newPassword)) {
  //     setPasswordError(
  //       "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol."
  //     );
  //     return;
  //   }

  //   const userRegistrationData = JSON.parse(localStorage.getItem(email));

  //   if (userRegistrationData) {
  //     userRegistrationData.password = newPassword;
  //     localStorage.setItem(email, JSON.stringify(userRegistrationData));
  //     alert("Your password has been reset successfully.");
  //     setIsForgotPassword(false);
  //     setNewPassword("");
  //   } else {
  //     alert("Email not found. Please register.");
  //   }
  // };
  const handleSuccess = async (response) => {
    const token = response.credential;

    try {
      const res = await fetch("http://localhost:3001/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Backend Response: ", data);
      } else {
        console.error("Authentication failed: ", data);
      }
    } catch (err) {
      console.error("Error sending token to backend: ", err);
    }
  };

  const handleFailure = (error) => {
    console.log("Login Failed: ", error);
  };
  return (
    <div className="login-container">
      <div className="login-leftforget">
        <img src={logoimg} className="logoforgt" onClick={() => {navigate('/login')}} />
      </div>
      <div className="login-right">
        <div className="login-boxforget">
          <h2 className="h2loginpageforgot">Forgot Password</h2>
          <p className="paraforgot">
            No worries! Enter your email address below and we’ll
            <br />
            send you a link to reset your password.{" "}
          </p>

          <form>
            <div className="input-container">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(""); // Remove error when user types
                }}
                className={`email-input ${emailError ? "input-error" : ""}`} // Apply red border on error
              />
              {emailError && (
                <span className="forgeterror-text">{emailError}</span>
              )}
            </div>

            <button
              type="submit"
              className={`sign-in-btn ${email ? "active" : "inactive"}`}
              disabled={!email.trim()}
              onClick={handleForgotPasswordEmailSubmit}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className="paragraphforgett">
            Remember password ?{" "}
            <strong
              style={{ color: "#0349A8", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login instead!
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
