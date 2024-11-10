import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { postId } = useParams();

  const getPostComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/blog/${postId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const postComments = await response.json();
      setPostComments(postComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getUserInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(window.atob(token.split(".")[1]));
        setUser(decoded);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/post/${postId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      console.error("Failed to fetch post:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getPost();
    getPostComments();
  }, [postId]);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleEditCommentChange = (event) => {
    setEditCommentText(event.target.value);
  };

  const handleCommentSubmit = async (userId, event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/blog/${userId}/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      getPostComments();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/blog/post/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setPostComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const startEditing = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditCommentText(commentText);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const editComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/blog/${commentId}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userComment: editCommentText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      setEditingCommentId(null);
      setEditCommentText("");
      getPostComments();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div>
      <h1>Blog Post</h1>
      <div>
        <div key={post.id}>
          <span>{post.postTitle}</span>
          <span> {post.createdAt}</span>
          <span> By {post.author?.username || "Unknown Author"}</span>
          <p>{post.postText}</p>
        </div>
      </div>
      <h2>Blog Comments</h2>
      <div>
        {postComments.map((postComment) => (
          <div key={postComment.id}>
            <span>{postComment.createdAt}</span>
            <span> By {postComment.user?.username || "Unknown Author"}</span>
            <span
              className="material-icons"
              onClick={() => deleteComment(postComment.id)}
            >
              delete
            </span>
            <span
              className="material-icons"
              onClick={() => startEditing(postComment.id, postComment.comment)}
            >
              edit
            </span>

            {editingCommentId === postComment.id ? (
              <div>
                <textarea
                  value={editCommentText}
                  onChange={handleEditCommentChange}
                  placeholder="Edit your comment"
                  required
                />
                <button onClick={() => editComment(postComment.id)}>
                  Save
                </button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <p>{postComment.comment}</p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={(event) => handleCommentSubmit(user?.userId, event)}>
        <label htmlFor="comment">Add a comment:</label>
        <textarea
          id="comment"
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Post;
