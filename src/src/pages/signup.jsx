import React, { useState } from "react";
import Header from "../components/header";
import Footermobile from "../components/footer-mobile";

function Signup() {
  const [toggleEye, setToggleeye] = useState(false);
  return (
    <div>
      <Header />
      <section className="form" id="form">
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
            {" "}
            <div className="row justify-content-center disable-select">
              <div className="col-lg-6 col-md-12" style={{ marginTop: "7%" }}>
                <h1 className="sptext">Connect.</h1>
                <h1 className="sptext" style={{ color: "#0761d1" }}>
                  Code.
                </h1>
                <h1 className="sptext">Execute.</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
            <form className="row g-2 needs-validation" noValidate>
              <div className="justify-content-center heading ">
                <div className="col-12 col-lg-10 col-md-12 bottom ">
                  <h1 className="sp">Sign Up</h1>
                </div>
              </div>
              <div className=" col-6 col-lg-5 col-md-6 bottom ">
                <div className="form-outline ">
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Frist Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Provide valid Frist Name.
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-5 col-md-6 bottom ">
                <div className="form-outline ">
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Last Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please Provide valid Last Name.
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 col-md-12 bottom">
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
              <div className="col-12 col-lg-10 col-md-12 bottom">
                <div className="input-group mb-2" id="show_hide_password">
                  <input
                    type={!toggleEye ? "password" : "text"}
                    className="form-control"
                    id="pass-input"
                    placeholder="Password"
                    required
                  />
                  <span class="input-group-text ">
                    {" "}
                    <button
                      class="pass-link"
                      type="button"
                      onClick={() => setToggleeye(!toggleEye)}
                    >
                      <i
                        id="pass-show"
                        class={toggleEye ? "fa fa-eye" : "fa fa-eye-slash"}
                        aria-hidden={toggleEye}
                      ></i>
                    </button>
                  </span>
                  <div className="invalid-feedback">
                    Passwords Does not match.
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 col-md-12 bottom">
                <div className="form-outline ">
                  <input
                    type="password"
                    className="form-control"
                    id="validationCustom07"
                    placeholder="Confirm Password"
                    required
                  />
                  <div className="invalid-feedback">
                    Passwords Does not match.
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 col-md-12 bottom">
                <button className="submit-btn btn" type="submit">
                  Sign Up
                </button>
              </div>
              <div className="col-12 col-lg-10 col-md-12 bottom form-link  align-items-center justify-content-center">
                <p>
                  <a href="/login">
                    Already have an account? <span>Log In</span>
                  </a>
                  <br />
                  <a href="terms.html">
                    {" "}
                    By Signing Up you agree with our <span>
                      Terms{" "}
                    </span> and <span>Data Privacy</span>.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footermobile />
    </div>
  );
}

export default Signup;
