import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <Link to="/pricing" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col-2"></div>
        <div className="col-6 mb-5">
          <div className="row text-center">
            <div className="col p-3 border">
              <h1 className="mb-3">₹0</h1>
              <p className="text-muted">
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col p-3 border">
              <h1 className="mb-3">₹20</h1>
              <p className="text-muted">Intraday and F&amp;O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
