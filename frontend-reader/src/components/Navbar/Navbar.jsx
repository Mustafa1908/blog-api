import { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { getUserInfo } from "../../utils/getUserInfo";
import { UserTokenContext } from "../../app/App";
import navbar from "./Navbar.module.css";

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
    <nav className={navbar.navbar}>
      <Link className={navbar.link} to={"/blog"}>
        Blog
      </Link>
      <section className={navbar.navSection}>
        {user ? (
          <>
            <h2 className={navbar.navbarHeader}>Welcome, {user.username}!</h2>
            {user.userRole == "author" && (
              <>
                <Link className={navbar.navLink} to={"/post"}>
                  Edit-Posts
                </Link>
                <Link to="/post" className={`${navbar.navIcon} material-icons`}>
                  edit
                </Link>
              </>
            )}
            <Link
              to={"/blog"}
              className={navbar.navLink}
              onClick={handleLogout}
            >
              Logout
            </Link>
            <Link
              to={"/blog"}
              className={`${navbar.navIcon} material-icons`}
              onClick={handleLogout}
            >
              logout
            </Link>{" "}
          </>
        ) : (
          <>
            <Link className={navbar.navLink} to={"/register"}>
              Register
            </Link>
            <Link className={navbar.navLink} to={"/login"}>
              Login
            </Link>
          </>
        )}
      </section>
      <Outlet />
    </nav>
  );
};

export default Navbar;
