import { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { getUserInfo } from "../../utils/getUserInfo";
import { UserTokenContext } from "../../app/App";
import NavLink from "../../components/NavLink/NavLink";
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
    <>
      <nav className={navbar.navbar}>
        <Link className={navbar.navMainLink} to={"/blog"}>
          Blog
        </Link>
        <section className={navbar.navSection}>
          {user ? (
            <>
              <h2 className={navbar.navbarHeader}>Welcome, {user.username}!</h2>
              {user.userRole == "author" && (
                <>
                  <NavLink
                    pathName="/post"
                    navLinkText="Edit-Posts"
                    navLinkClassName="navLink"
                  />
                  <Link
                    to="/post"
                    className={`${navbar.navIcon} material-icons`}
                  >
                    edit
                  </Link>
                </>
              )}
              <NavLink
                pathName="/blog"
                navLinkText="Logout"
                navLinkClassName="navLink"
                onClickFunction={handleLogout}
              />
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
              <NavLink
                pathName="/register"
                navLinkText="Register"
                navLinkClassName="navbarLink"
              />
              <NavLink
                pathName="/login"
                navLinkText="Login"
                navLinkClassName="navbarLink"
              />
            </>
          )}
        </section>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
