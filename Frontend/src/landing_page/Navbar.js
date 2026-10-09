import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src={process.env.PUBLIC_URL + "/media/images/logo.svg"}
            style={{ width: "130px" }}
            alt="Zerodha Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-muted" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted" to="/support">
                Support
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-outline-primary btn-sm px-3 py-1 mt-1"
                href="https://zerodha-dashboard-live-8dnhxjfba-ranmale1234s-projects.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Kite Dashboard →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
