import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../app/App";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { token, setToken } = useContext(UserTokenContext);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const userLogin = await response.json();
        localStorage.setItem("token", userLogin.token);
        setToken(userLogin.token);
        navigate("/blog");
      } else {
        const errorData = await response.json();
        console.error("Registration error:", errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleLoginChange}
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleLoginChange}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
