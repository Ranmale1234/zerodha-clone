import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ email, username, password, mobile }),
      });
      const data = await response.json();
      
      if (data.success) {
        // Redirect to dashboard on success
        window.location.href = "http://localhost:3001";
      } else {
        alert("Error from server: " + data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error: " + error.message + " | " + error.stack);
    }
  };

  return (
    <div className="container p-5 my-5">
      <div className="row align-items-center">
        <div className="col-lg-7 col-12 text-center mb-5 mb-lg-0">
          <img
            src={process.env.PUBLIC_URL + "/media/images/signup.png"}
            alt="Zerodha Signup"
            className="img-fluid"
            style={{ maxWidth: "85%" }}
          />
        </div>
        <div className="col-lg-5 col-12 px-lg-4">
          <h1 className="fs-2 mb-3">Signup now</h1>
          <p className="text-muted mb-4 fs-6">
            Create your account to start trading.
          </p>

          <form onSubmit={handleSignup}>
            <div className="mb-3" style={{ maxWidth: "340px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "340px" }}>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "340px" }}>
              <input
                type="tel"
                className="form-control"
                placeholder="Mobile number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "340px" }}>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 mt-2 fs-6"
              style={{ minWidth: "160px" }}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-muted" style={{ fontSize: "12px" }}>
            By signing up, you agree to our{" "}
            <a href="#" className="text-decoration-none">
              terms &amp; policies
            </a>
            .
          </p>
        </div>
      </div>
      <div className="text-center mt-5 text-muted fs-6">
        <p>
          I authorize Zerodha to contact me even if my number is registered on DND. I
          authorize Zerodha to fetch my KYC information from the C-KYC registry with
          my PAN.<br /> Please visit this article to know more.
        </p>
        <p>
          If you are looking to open a HUF, Corporate, Partnership, or NRI account, you
          have to use the offline forms. For help, click here.
        </p>
      </div>
    </div>
  );
}

export default Signup;



