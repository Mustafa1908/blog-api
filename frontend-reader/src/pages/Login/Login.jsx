import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../app/App";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import login from "./Login.module.css";

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
    <main className={login.main}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={login.form}>
        <Input
          inputIdName="username"
          inputType="text"
          placeholderText="Username"
          inputValue={formData.username}
          onChangeFunction={handleLoginChange}
          labelText={"Username"}
        />
        <Input
          inputIdName="password"
          inputType="password"
          placeholderText="Password"
          inputValue={formData.password}
          onChangeFunction={handleLoginChange}
          labelText={"Password"}
        />
        <Button buttonText="Login" buttonColor={"#3b82f6"} />
      </form>
    </main>
  );
};

export default Login;
