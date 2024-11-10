import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../app/App";

const Blog = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userRole, setUserRole } = useContext(UserContext);

  useEffect(() => {
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

    const getAllPosts = async () => {
      try {
        const allPosts = await fetch("http://localhost:8000/post");
        if (!allPosts.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await allPosts.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getUserInfo();
    getAllPosts();
  }, []);

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
      <div>
        {posts.map((post) => (
          <a href={`/blog/${post.id}`} key={post.id}>
            <span>{post.postTitle}</span>
            <p> {post.postText}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blog;
