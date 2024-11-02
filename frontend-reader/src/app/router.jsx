import Navbar from "../components/Navbar.jsx";
import Blog from "../pages/Blog.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Post from "../pages/Post.jsx";
import { Route } from "react-router-dom";

const routes = (
  <Route path="/" element={<Navbar />}>
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:postId" element={<Post />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
  </Route>
);

export default routes;
