import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/blog"}>Go to Blog</Link>
      <p></p>
      <Link to={"/register"}>Register</Link>
      <p></p>
      <Link to={"/login"}>Login</Link>
      <p></p>
      <Link to={"/post"}>View all Posts</Link>
      <p></p>
      <Outlet />
    </div>
  );
};

export default Navbar;
