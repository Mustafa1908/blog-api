import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import navLink from "./NavLink.module.css";

const Login = ({
  pathName,
  navLinkText,
  onClickFunction,
  navLinkClassName,
}) => {
  return (
    <Link
      className={navLink[navLinkClassName]}
      to={pathName}
      onClick={onClickFunction}
    >
      {navLinkText}
    </Link>
  );
};

Login.propTypes = {
  pathName: PropTypes.string.isRequired,
  navLinkText: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func,
  navLinkClassName: PropTypes.string.isRequired,
};

export default Login;
