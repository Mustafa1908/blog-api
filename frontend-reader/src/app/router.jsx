import Blog from "../pages/Blog.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import { Route } from "react-router-dom";

const routes = (
  <Route path="/" element={<Blog />}>
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />}></Route>
  </Route>
);

export default routes;
