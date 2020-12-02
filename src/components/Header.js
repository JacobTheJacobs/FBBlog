import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { isAuth } = props.auth;
  return (
    <div
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/distressed-yellow-wall-texture-background_1017-18217.jpg?size=626&ext=jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <header>
        <nav className="site-header sticky-top py-1">
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            <Link className="logo" to="/" aria-label="Product">
              JJ{" "}
              <img
                src="data:image/png;base64,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"
                style={{ width: "50px", height: "50px" }}
                alt="logo"
              />
            </Link>
            <Link className="mt-4" to="/">
              Home
            </Link>
            <Link className="mt-4" to="/contact">
              Contact
            </Link>
            {isAuth ? (
              <>
                <Link className="mt-4 header_btn" to="/dashboard/posts">
                  Dashboard
                </Link>
                <div onClick={props.logout} className="mt-4 header_btn">
                  Logout
                </div>
              </>
            ) : null}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
