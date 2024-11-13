import { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { getUserInfo } from "../../utils/getUserInfo";
import { UserTokenContext } from "../../app/App";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { token, setToken } = useContext(UserTokenContext);

  const userToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (userToken) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        getUserInfo(setUser);
      }
    }
  }, [userToken, storedUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <Link to={"/blog"}>Go to Blog</Link>
          <p></p>
          <Link to={"/register"}>Register</Link>
          <p></p>
          {user.userRole == "author" && (
            <Link to={"/post"}>View all Posts</Link>
          )}
          <p></p>
          <p>Id: {user.userId}</p>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to={"/blog"}>Go to Blog</Link>
          <p></p>
          <Link to={"/register"}>Register</Link>
          <p></p>
          <Link to={"/login"}>Login</Link>
          <p></p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;
