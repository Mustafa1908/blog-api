import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/post/${postId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
      }
    };

    const getPostComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blog/${postId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPostComments(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
      }
    };

    getPost();
    getPostComments();
  }, [postId]);

  return (
    <div>
      <h1>Blog Post</h1>
      {error && <p>{error}</p>}
      <div>
        <div key={post.id}>
          <span>{post.postTitle}</span>
          <span> {post.createdAt}</span>
          <span> By {post.author?.username || "Unknown Author"}</span>{" "}
          <p>{post.postText}</p>
        </div>
      </div>{" "}
      <h2>Blog Comment</h2>
      <div>
        {postComments.map((postComment) => (
          <div key={postComment.id}>
            <span>{postComment.createdAt}</span>
            <span>
              {" "}
              By {postComment.user?.username || "Unknown Author"}
            </span>{" "}
            <p> {postComment.comment}</p>
          </div> // Adjust based on your post structure
        ))}
      </div>
    </div>
  );
};

export default Post;
