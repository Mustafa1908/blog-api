import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import register from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userRole: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

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

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    // Validate username length
    if (!formData.username) errors.username = "Username is required.";
    else if (formData.username.length > 50)
      errors.username = "Username cannot exceed 50 characters.";

    if (!formData.email) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return; // If validation fails, don't submit

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
        // If response is not ok, extract the error message from the server
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set the error message to display globally
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred. Please try again."); // Generic error message
    }
  };

  return (
    <main className={register.main}>
      <h1>Register</h1>
      {(formErrors.username ||
        formErrors.email ||
        formErrors.password ||
        errorMessage) && (
        <div className={register.errorContainer}>
          {formErrors.username && (
            <p className={register.formErrorText}>{formErrors.username}</p>
          )}
          {formErrors.email && (
            <p className={register.formErrorText}>{formErrors.email}</p>
          )}
          {formErrors.password && (
            <p className={register.formErrorText}>{formErrors.password}</p>
          )}
          {errorMessage && (
            <p className={register.formErrorText}>{errorMessage}</p>
          )}
        </div>
      )}
      <form className={register.form} onSubmit={handleRegisterSubmit}>
        <Input
          inputIdName="username"
          inputType="text"
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
        <Button buttonText="Register" />
      </form>
    </main>
  );
};

export default Register;
