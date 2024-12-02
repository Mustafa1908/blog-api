import PropTypes from "prop-types";
import input from "./Input.module.css";

const Login = ({
  inputIdName,
  inputType,
  placeholderText,
  inputValue,
  onChangeFunction,
  labelText,
}) => {
  return (
    <>
      <label htmlFor={inputIdName} className={input.label}>
        <strong>{labelText}:</strong>
      </label>
      <input
        id={inputIdName}
        name={inputIdName}
        type={inputType}
        value={inputValue}
        onChange={onChangeFunction}
        placeholder={placeholderText}
        className={input.input}
        required
      />
    </>
  );
};

Login.propTypes = {
  inputIdName: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChangeFunction: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
};

export default Login;
