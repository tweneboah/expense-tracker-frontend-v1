import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/usersSlices";

const PrivateNavbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand">
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
              <li className="nav-item me-4">
                <Link to="/expenses" className="nav-link">
                  Expenses
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/incomes" className="nav-link">
                  Income
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="btn btn-outline-secondary me-2">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="btn btn-outline-secondary me-2"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
            {/* <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 d-lg-none">
              <li className="nav-item me-4">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link">Company</a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link">Services</a>
              </li>
            </ul> */}
            <div className="ms-lg-auto">
              <Link to="/add-expense" className="btn btn-danger me-2">
                New Expense
              </Link>
              <Link to="/add-income" className="btn btn-success me-2">
                New Income
              </Link>
              <button
                onClick={() => dispatch(logoutAction())}
                className="btn btn-warning me-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;
