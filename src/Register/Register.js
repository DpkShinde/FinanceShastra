import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Register.css";
import logoimg from "../assest/finanlogo.svg";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import googleimg from "../assest/googleicon.svg";
import linkedinimg from "../assest/lin.png";
import logo from "../assest/Logo design (1).png";
import { API_BASE_URL } from "../config";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const override = {
  display: "block",
  textAlign: "center",
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      let url = `${API_BASE_URL}/users/register`;

      if (referralCode) {
        url += `?referralCode=${referralCode}`;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      console.log(response);

      if (response.status === 200) {
        alert(data.message);
        navigate("/");
      }else if(response.status === 400){
        setEmailError("*User already Exists, Please Login.")
      }
       else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSuccess = async (response) => {
    console.log("Google Login Success:", response);
    const token = response.credential; // Ensure we receive a valid token

    if (!token) {
      console.error("Token not received from Google!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (res.ok) {
        // Store JWT token in cookies
        Cookies.set("jwtToken", data.jwtToken, {
          expires: 7,
          sameSite: "Strict",
        });
        navigate("/home");
      } else {
        console.error("Authentication failed:", data.error);
      }
    } catch (err) {
      console.error("Error sending token to backend:", err);
    }
  };

  const handleFailure = (error) => {
    console.log("Login Failed: ", error);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={logoimg}
          onClick={() => navigate("/")}
          className="logoforgt"
        />
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2 className="h2loginpage">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Name*</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={emailError ? "input-error" : ""}
              />
              {emailError && <span className="error-text-registration">{emailError}</span>}
            </div>
            <div className="input-container">
              <label>Password*</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={passwordError ? "input-error" : ""}
                />
                {formData.password && <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "28px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>}
                
              </div>
              {passwordError && (
                <span className="error-text-registration">{passwordError}</span>
              )}
            </div>
            <button type="submit" className="sign-in-btn">
              Sign Up
            </button>
            <ClipLoader
              cssOverride={override}
              size={35}
              data-testid="loader"
              loading={isLoading}
              speedMultiplier={1}
              color="green"
            />
          </form>
          <div className="login-or">Or Login With</div>
          <div className="sociall-login">
            <GoogleLogin
              variant="contained"
              className="google-btn"
              onSuccess={handleSuccess}
              onError={handleFailure}
              text="Sign in with Google"
              width="150"
              theme="outline"
            />

            <br />

            <Button
              variant="contained"
              className="linkedin-btn"
              startIcon={
                <img
                  src={linkedinimg}
                  alt="LinkedIn Icon"
                  className="btn-icon-small"
                />
              }
              component="a"
              href="https://www.linkedin.com/feed/"
              sx={{ fontSize: "14px" }} // Decrease font size
            >
              Sign in with LinkedIn
            </Button>
          </div>
          <div className="registerContgl">
            <p className="registerContglp">
              By clicking “Continue with Google/LinkedIn” or “Create Account”,
              you agree to Website’s
              <a href="termsAndConditions" className="registerContglblue-text">
                {" "}
                Terms & Conditions
              </a>
              <a href="#" className="registerContglblack-text">
                {" "}
                and
              </a>
              <a href="privacyPolicypage" className="registerContglblue-text">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="register-link">
            <p className="register-linkp">
              Already registered?{" "}
              <a href="#" onClick={handleSignInClick} className="sign-in-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
