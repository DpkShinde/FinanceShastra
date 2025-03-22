import React from "react";
import "./IpoComment.css";

const IpoComment = () => {
  return (<div>
    <h2 className="ipocomment-title">Leave a Comment</h2>
      <p className="ipocomment-subtitle">
        Your email address will remain private. Fields marked with * are mandatory.
      </p>
    <div className="ipocomment-container">
      
      <form className="ipocomment-form">
        <div className="iponameemailall">
        <div className="ipocommentt-group">
          <label htmlFor="name">Name*</label><br/>
          <input type="text" id="name" placeholder="Type here" required />
        </div>
        <div className="ipocommentt-group">
          <label htmlFor="email">Email*</label><br/>
          <input type="email" id="email" placeholder="Type here" required />
        </div>
        </div>
        <div className="ipocomment-group">
          <label htmlFor="website">Website</label>
          <input type="url" id="website" placeholder="Type here" />
        </div>
        <div className="ipocomment-group">
          <label htmlFor="comment">Comment*</label>
          <textarea id="comment" placeholder="Comment here" required></textarea>
        </div>
        <div className="ipocomment-checkbox-group">
          <input type="checkbox" id="saveDetails" className="checkbodipo" />
          <label htmlFor="saveDetails">
            Save my details (name, email, and website) for future comments on this browser.
          </label>
        </div>
        <button type="submit" className="ipocomment-button">Add Comment</button>
      </form>
     
    </div>
  
    </div>
  );
};

export default IpoComment;