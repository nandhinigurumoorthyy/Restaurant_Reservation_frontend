import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";

function Error() {
  const location = useLocation();
  const errorMessage =
    location.state?.message || "An unexpected error occurred.";
  const errorDetails = location.state?.details || "";

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-light">
        <div>
          <img
            src="https://media.tenor.com/8ND8TbjZqh0AAAAj/error.gif"
            alt="error img"
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <h3>{errorMessage}</h3>
          {errorDetails && <p className="text-danger">{errorDetails}</p>}
        </div>

        <div>
          <form className="d-flex gap-5">
            <Link to="/create" type="button" className="btn btn-danger btn-lg">
              <span>
                <GiDirectionSign />
              </span>{" "}
              SignUp
            </Link>
            <Link to="/login" type="button" className="btn btn-primary btn-lg">
              <span>
                <IoLogIn />
              </span>{" "}
              LogIn
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Error;
