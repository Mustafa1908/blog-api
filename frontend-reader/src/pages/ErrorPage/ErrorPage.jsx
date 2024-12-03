import error from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className={error.errorPageContainer}>
      <h1>ERROR 404</h1>
      <p className={error.errorText}>
        It seems like there was an error with the page you wanna see you can go
        back to the blog with the link below
      </p>
      <Link className={error.errorLink} to={"/blog"}>
        Go back to the blog
      </Link>
    </main>
  );
};

export default ErrorPage;
