import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 col-12 p-lg-5 p-3">
          <h1>{productName}</h1>
          <p className="text-muted mt-3">{productDesription}</p>
          <div className="mt-4">
            <a href={learnMore || "#"} className="text-decoration-none">
              Learn More{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-12 text-center p-4">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
