import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Blog = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      console.log(JSON.parse(window.atob(token.split(".")[1])));
    };

    getUserInfo();
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
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Please log in to see your information.</div>
      )}
      <Outlet />
    </div>
  );
};

export default Blog;
