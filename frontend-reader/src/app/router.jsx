import Navbar from "../components/Navbar/Navbar.jsx";
import Blog from "../pages/Blog/Blog.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Post from "../pages/Post/Post.jsx";
import Posts from "../pages/Posts/Posts.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import { Route } from "react-router-dom";

const routes = (
  <Route path="/" element={<Navbar />} errorElement={<ErrorPage />}>
    <Route path="blog" element={<Blog />} />
    <Route path="blog/post/:postId" element={<Post />} />
    <Route path="post" element={<Posts />}></Route>
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
  </Route>
);

export default routes;
