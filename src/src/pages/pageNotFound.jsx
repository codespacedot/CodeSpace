import React from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";
function PageNotFound() {
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
              404
            </h2>
            <h3 style={{ fontSize: "30px", textAlign: "center" }}>
              {" "}
              Oops We can't find the page that you are looking for :({" "}
            </h3>
          </div>
          <a href="/" className="get-started-btn2" style={{ marginTop: "2%" }}>
            Go Home{" "}
          </a>
        </div>
      </section>
      {/* End Hero */}
      <FooterCredit />
    </div>
  );
}

export default PageNotFound;
