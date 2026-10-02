import React from "react";

function Universe() {
  const pub = process.env.PUBLIC_URL;
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p className="text-muted mt-2">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/smallcaseLogo.png"}
            alt="Smallcase"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/streakLogo.png"}
            alt="Streak"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Algo &amp; strategy platform
          </p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/sensibullLogo.svg"}
            alt="Sensibull"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/zerodhaFundhouse.png"}
            alt="Zerodha Fundhouse"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/goldenpiLogo.png"}
            alt="GoldenPi"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src={pub + "/media/images/dittoLogo.png"}
            alt="Ditto"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">Insurance</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-4"
          style={{ width: "20%", minWidth: "180px", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
