import React from "react";
import { Link } from "react-router-dom";
const PublicNavbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i class="bi bi-currency-exchange fs-1 text-success"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav04"
            aria-controls="nav04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav04">
            <ul className="d-none d-lg-flex navbar-nav mx-auto mt-3 mt-lg-0 mb-3 mb-lg-0 position-absolute top-50 start-50 translate-middle">
              <li className="nav-item me-4">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add-expense"
                  className="btn  btn-outline-danger me-2"
                >
                  New Expense
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-income" className="btn btn-outline-primary me-2">
                  Record Income
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 d-lg-none">
              <li className="nav-item me-4">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link">Company</a>
              </li>
            </ul>
            <div className="ms-lg-auto">
              <Link to="/login" className="btn btn-outline-secondary me-2">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
