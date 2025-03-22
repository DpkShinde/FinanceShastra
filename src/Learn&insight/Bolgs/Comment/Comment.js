import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "quill-emoji";
import "./Comment.css";
import { FaUserCircle } from "react-icons/fa";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { text: comment, user: "User", time: "a min ago" },
      ]);
      setComment(""); // Clear the input field
    }
  };

  return (
    <div className="comment-container">
      {/* Comment Input Field with Toolbar Below */}
      <div className="comment-box">
        <div className="quill-wrapper">
          
          <ReactQuill
            theme="snow"
            value={comment}
            onChange={setComment}
            placeholder="Add Comment..."
           
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                ["image", "link"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["emoji"], // Emoji button
                ["clean"],
              ],
              "emoji-toolbar": true,
              "emoji-textarea": false,
              "emoji-shortname": true,
            }}
          />
        </div>
        <button className="comment-btn" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments <span className="comment-count">{comments.length}</span></h3>
        {comments.map((cmt, index) => (
          <div key={index} className="comment">
            <div className="comment-avatar"><FaUserCircle /></div>
            <div className="comment-content">
              <strong>{cmt.user}</strong>
              <p dangerouslySetInnerHTML={{ __html: cmt.text }}></p>
              <span className="comment-time">{cmt.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
