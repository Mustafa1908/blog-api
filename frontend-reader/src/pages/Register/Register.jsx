import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import FormButton from "../../components/FormButton/FormButton";
import register from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userRole: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        userRole: checked ? value : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    <main className={register.main}>
      <form className={register.form} onSubmit={handleRegisterSubmit}>
        <Input
          inputIdName="username"
          inputType="string"
          placeholderText="Username"
          inputValue={formData.username}
          onChangeFunction={handleChange}
          labelText={"Username"}
        />
        <Input
          inputIdName="email"
          inputType="email"
          placeholderText="Email"
          inputValue={formData.email}
          onChangeFunction={handleChange}
          labelText={"Email"}
        />
        <Input
          inputIdName="password"
          inputType="password"
          placeholderText="Password"
          inputValue={formData.password}
          onChangeFunction={handleChange}
          labelText={"Password"}
        />
        <fieldset className={register.checkboxInputContainer}>
          <label className={register.checkboxLabel} htmlFor="author">
            Author
            <input
              type="checkbox"
              id="author"
              name="userRole"
              value="author"
              className={register.checkboxInput}
              checked={formData.userRole === "author"}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <FormButton buttonText="Register" />
      </form>
    </main>
  );
};

export default Register;
