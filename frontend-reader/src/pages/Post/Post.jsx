import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authorPost from "./Post.module.css";
import Button from "../../components/Button/Button";

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

  document.title = post.postTitle;
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

      setNewComment("");
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
    <main className={authorPost.main}>
      <article className={authorPost.mainPostContainer}>
        <section className={authorPost.authorContainer}>
          <time className={authorPost.dateText}> {post.createdAt}</time>
          <span className={authorPost.authorText}>
            {" "}
            By {post.author?.username || "Unknown Author"}
          </span>
        </section>
        <section className={authorPost.postContentContainer}>
          <h1 className={authorPost.postHeader}>{post.postTitle}</h1>
          <p className={authorPost.postText}>{post.postText}</p>
        </section>
      </article>
      <h3 className={authorPost.commentHeader}>
        {postComments.length} Comments
      </h3>
      <form
        className={authorPost.newCommentForm}
        onSubmit={(event) => handleCommentSubmit(user?.userId, event)}
      >
        <label className={authorPost.newCommentLabel} htmlFor="comment">
          New comment:
        </label>
        <textarea
          id="comment"
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="Write a comment..."
          className={authorPost.commentTextArea}
          required
        />
        <Button buttonText={"Create Comment"} buttonColor={"#3b82f6"} />
      </form>
      <section className={authorPost.commentContainer}>
        {postComments.map((postComment) => (
          <article className={authorPost.userContainer} key={postComment.id}>
            <span>
              {" "}
              From{" "}
              <strong>
                {postComment.user?.username || "Unknown Author"}{" "}
              </strong>{" "}
            </span>
            <time>on {postComment.createdAt}</time>
            {user.userRole === "author" ? (
              <>
                <span
                  className={`material-icons ${authorPost.commentIcon}`}
                  onClick={() => deleteComment(postComment.id)}
                >
                  delete
                </span>
                <span
                  className={`material-icons ${authorPost.commentIcon}`}
                  onClick={() =>
                    startEditing(postComment.id, postComment.comment)
                  }
                >
                  edit
                </span>
              </>
            ) : null}

            {editingCommentId === postComment.id ? (
              <div className={authorPost.userCommentContainer}>
                <textarea
                  value={editCommentText}
                  onChange={handleEditCommentChange}
                  placeholder="Edit your comment"
                  className={authorPost.editCommentTextarea}
                  required
                />
                <button
                  className={authorPost.saveButton}
                  onClick={() => editComment(postComment.id)}
                >
                  Save
                </button>
                <Button
                  buttonText={"Cancel"}
                  buttonColor={"#c70000"}
                  onClickFunction={cancelEditing}
                  buttonWidth={"10px"}
                />
              </div>
            ) : (
              <>
                <p className={authorPost.userComment}>{postComment.comment}</p>
              </>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Post;
