import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 col-12 text-center p-4">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>
        <div className="col-lg-6 col-12 p-lg-5 p-3">
          <h1>{productName}</h1>
          <p className="text-muted mt-3">{productDesription}</p>
          <div className="mt-4">
            <a href={tryDemo || "#"} className="text-decoration-none">
              Try Demo{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
            <a href={learnMore || "#"} className="text-decoration-none ms-5">
              Learn More{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-4">
            <a href={googlePlay || "#"}>
              <img
                src={
                  process.env.PUBLIC_URL + "/media/images/googlePlayBadge.svg"
                }
                alt="Google Play"
              />
            </a>
            <a href={appStore || "#"} className="ms-4">
              <img
                src={process.env.PUBLIC_URL + "/media/images/appstoreBadge.svg"}
                alt="App Store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
