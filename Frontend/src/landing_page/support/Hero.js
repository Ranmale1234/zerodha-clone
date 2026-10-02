import React from "react";

function Hero() {
  return (
    <section className="container-fluid py-5" id="supportHero">
      <div className="container d-flex justify-content-between align-items-center mb-4">
        <h4>Support Portal</h4>
        <a href="#" className="text-white">
          Track Tickets
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-12 p-3">
            <h1 className="fs-4 mb-4">
              Search for an answer or browse help topics to create a ticket
            </h1>
            <input
              className="form-control mb-3"
              placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
              style={{
                padding: "14px 20px",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
            <div className="d-flex flex-wrap gap-3 mt-3">
              <a href="#" className="text-white">
                Track account opening
              </a>
              <a href="#" className="text-white">
                Track segment activation
              </a>
              <a href="#" className="text-white">
                Intraday margins
              </a>
              <a href="#" className="text-white">
                Kite user manual
              </a>
            </div>
          </div>
          <div className="col-lg-5 col-12 p-3 ps-lg-5">
            <h1 className="fs-4 mb-3">Featured</h1>
            <ol className="ps-3" style={{ lineHeight: "2" }}>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Latest Intraday leverages - MIS &amp; CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
