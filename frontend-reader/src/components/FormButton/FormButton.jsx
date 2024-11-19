import PropTypes from "prop-types";
import formButton from "./FormButton.module.css";

const Login = ({ buttonText }) => {
  return (
    <button className={formButton.loginButton} type="submit">
      {buttonText}
    </button>
  );
};

Login.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Login;
