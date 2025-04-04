import React, { useState } from "react";
import "./IpoComment.css";
import { API_BASE_URL } from "../../../config";
import Cookies from "js-cookie";

const IpoComment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveDetails: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData); // Log form data
    const token = Cookies.get("jwtToken");
    if (!token) {
      console.error("Token is missing. Ensure the user is logged in.");
      alert("Authentication token is missing. Please log in again.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/ipocomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token for authentication
        },
        body: JSON.stringify(formData),
      });

      console.log("API response status:", response.status); // Log response status
      if (response.ok) {
        alert("Comment submitted successfully!");
        setFormData({
          name: "",
          email: "",
          website: "",
          comment: "",
          saveDetails: false,
        });
      } else {
        const errorData = await response.json();
        console.error("API error response:", errorData); // Log error response
        alert("Failed to submit comment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error); // Log error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="ipocomment-title">Leave a Comment</h2>
      <p className="ipocomment-subtitle">
        Your email address will remain private. Fields marked with * are
        mandatory.
      </p>
      <div className="ipocomment-container">
        <form className="ipocomment-form" onSubmit={handleSubmit}>
          <div className="iponameemailall">
            <div className="ipocommentt-group">
              <label htmlFor="name">Name*</label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Type here"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipocommentt-group">
              <label htmlFor="email">Email*</label>
              <br />
              <input
                type="email"
                id="email"
                placeholder="Type here"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="ipocomment-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              placeholder="Type here"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="ipocomment-group">
            <label htmlFor="comment">Comment*</label>
            <textarea
              id="comment"
              placeholder="Comment here"
              value={formData.comment}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="ipocomment-checkbox-group">
            <input
              type="checkbox"
              id="saveDetails"
              className="checkbodipo"
              checked={formData.saveDetails}
              onChange={handleChange}
            />
            <label htmlFor="saveDetails">
              Save my details (name, email, and website) for future comments on
              this browser.
            </label>
          </div>
          <button type="submit" className="ipocomment-button">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default IpoComment;
