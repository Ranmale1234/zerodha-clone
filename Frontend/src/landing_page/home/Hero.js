import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src={process.env.PUBLIC_URL + "/media/images/homeHero.png"}
          alt="Zerodha Invest"
          className="mb-5 img-fluid mx-auto"
          style={{ maxWidth: "70%" }}
          onError={(e) => {
            // Fallback to svg if png fails or vice versa
            e.target.onerror = null;
            e.target.src =
              process.env.PUBLIC_URL + "/media/images/homeHero.svg";
          }}
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p className="fs-5 text-muted">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link to="/signup" className="text-decoration-none">
          <button
            className="p-2 btn btn-primary fs-5 mb-5 mt-3"
            style={{ width: "20%", minWidth: "180px", margin: "0 auto" }}
          >
            Signup Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
