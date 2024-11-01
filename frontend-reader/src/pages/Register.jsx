import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("react");
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered successfully:", result.message);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration error:", errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
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
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
