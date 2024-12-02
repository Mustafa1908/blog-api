import PropTypes from "prop-types";
import button from "./Button.module.css";

const Login = ({
  buttonText,
  buttonColor = "#3b82f6",
  onClickFunction = () => {},
  buttonWidth,
  functionArgument,
}) => {
  const buttonStyles = {
    width: buttonWidth || "auto",
    backgroundColor: buttonColor,
  };

  return (
    <button
      style={buttonStyles}
      type="submit"
      className={button.button}
      onClick={() => onClickFunction(functionArgument)}
    >
      {buttonText}
    </button>
  );
};

Login.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  onClickFunction: PropTypes.func,
  buttonWidth: PropTypes.string,
  functionArgument: PropTypes.any,
};

export default Login;
