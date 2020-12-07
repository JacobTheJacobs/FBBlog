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
