import React from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";

function ErrorPage() {
  return (
    <div>
      <Header />
      {/* Hero Section  */}
      <section
        id="hero"
        className="d-flex align-items-center justify-content-center"
      >
        <div className="container">
          <div className="row justify-content-center disable-select">
            <h2 className="sp" style={{ fontSize: "70px" }}>
              500
            </h2>
            <h3 style={{ fontSize: "30px", textAlign: "center" }}>
              {" "}
              Sorry, it's not you. it's us :({" "}
            </h3>
            <h4 style={{ fontSize: "25px", textAlign: "center" }}>
              {" "}
              Please try after some time.{" "}
            </h4>
          </div>
          <a href="/" className="get-started-btn2" style={{ marginTop: "2%" }}>
            {" "}
            Report{" "}
          </a>
        </div>
      </section>
      {/* End Hero */}
      <FooterCredit />
    </div>
  );
}

export default ErrorPage;
