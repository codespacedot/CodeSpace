import React from "react";
import Header from "../components/header";
import Footermobile from "../components/footer-mobile";

function Forgotpassword() {
  return (
    <div>
      <Header />
      {/*  Section  */}
      <section className="form" id="form">
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
            {" "}
            <div className="row justify-content-center disable-select">
              <div className="col-lg-6 col-md-12" style={{ marginTop: "15%" }}>
                <h1 className="sptext">Connect.</h1>
                <h1 className="sptext" style={{ color: "#0761d1" }}>
                  Code.
                </h1>
                <h1 className="sptext">Execute.</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-8 d-flex align-items-center justify-content-center center-block">
            <form
              className="row g-2 needs-validation center-block"
              noValidate
              style={{ marginTop: "15%" }}
            >
              <div className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom">
                <h1 className="sp">Forgot Password</h1>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <input
                    type="email"
                    className="form-control"
                    id="validationCustom05"
                    placeholder="Email Address"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid Email Address.
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <button className="submit-btn btn" type="submit">
                  Submit
                </button>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom form-link  align-items-center justify-content-center">
                <p>
                  <a href="/signup">
                    Dont have an account? <span>Sign Up</span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End Section */}
      <Footermobile />
    </div>
  );
}

export default Forgotpassword;
