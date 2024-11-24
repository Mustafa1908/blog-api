import PropTypes from "prop-types";
import button from "./Button.module.css";

const Login = ({
  buttonText,
  buttonColor,
  onClickFunction,
  buttonWidth,
  functionArgument,
}) => {
  const buttonStyles = {
    width: buttonWidth || "auto",
    backgroundColor: buttonColor || "gray",
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
  functionArgument: PropTypes.isRequired,
};

Login.defaultProps = {
  buttonColor: "#3b82f6",
  onClickFunction: () => {},
};

export default Login;
