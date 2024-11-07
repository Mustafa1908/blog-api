import { useEffect, useState, useContext } from "react";
import { UserContext } from "../app/App";

const Blog = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { userRole, setUserRole } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = JSON.parse(window.atob(token.split(".")[1]));
          setUser(decoded);
          setUserRole("hey");
          if (decoded.userRole === "author") {
            console.log("hey");
          }
        } catch (error) {
          console.error("Token decoding error:", error);
        }
      }
    };
    const getAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/post");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
      }
    };

    getUserInfo();
    getAllPosts();
  }, [posts]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <h1>Blog Component</h1>
      {user ? (
        <div>
          <p>Id: {user.userId}</p>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Please log in to see your information.</div>
      )}
      <h1>Blog Posts</h1>
      {error && <p>{error}</p>}
      <div>
        {posts.map((post) => (
          <a href={`/blog/${post.id}`} key={post.id}>
            <span>{post.postTitle}</span>
            <p> {post.postText}</p>
          </a> // Adjust based on your post structure
        ))}
      </div>
    </div>
  );
};

export default Blog;
