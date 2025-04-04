import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "quill-emoji";
import "./Comment.css";
import { FaUserCircle } from "react-icons/fa";
import { API_BASE_URL } from "../../../config";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns"; // Import date-fns for relative time formatting

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogcomments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("🚀 ~ fetchComments ~ response:", response); // Log response
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched comments:", data.data); // Log fetched comments

          // Update comments and count based on the response structure
          if (Array.isArray(data.data)) {
            setComments(data.data);
            setCommentCount(data.count || 0); // Use the count field from the response
          } else {
            console.error("Unexpected response structure:", data);
            alert("Failed to load comments. Please try again later.");
          }
        } else {
          console.error("Failed to fetch comments.");
          alert("Failed to fetch comments. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        alert("An error occurred while fetching comments. Please try again.");
      }
    };

    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      console.log("Submitting comment:", comment); // Log comment data
      try {
        const token = Cookies.get("jwtToken");
        if (!token) {
          console.error("Token is missing. Ensure the user is logged in.");
          alert("Authentication token is missing. Please log in again.");
          return;
        }
        const response = await fetch(`${API_BASE_URL}/blogcomments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token for authentication
          },
          body: JSON.stringify({ comment }),
        });

        console.log("API response status:", response.status); // Log response status
        if (response.ok) {
          const responseData = await response.json();
          console.log("API response data:", responseData); // Log success response
          setComments([
            ...comments,
            { comment, user_name: "User", created_at: new Date().toISOString() },
          ]);
          setCommentCount(commentCount + 1); // Increment comment count
          setComment(""); // Clear the input field
          alert("Comment submitted successfully!");
        } else {
          const errorData = await response.json();
          console.error("API error response:", errorData); // Log error response
          alert(
            `Failed to submit comment: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error during API call:", error); // Log error
        alert(
          "An error occurred while submitting the comment. Please try again."
        );
      }
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
        <h3>
          Comments <span className="comment-count">{commentCount}</span>
        </h3>
        {comments.map((cmt) => (
          <div key={cmt.id} className="comment">
            <div className="comment-avatar">
              <FaUserCircle />
            </div>
            <div className="comment-content">
              <strong>{cmt.user_name}</strong>
              <p dangerouslySetInnerHTML={{ __html: cmt.comment }}></p>
              <span className="comment-time">
                {formatDistanceToNow(new Date(cmt.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
