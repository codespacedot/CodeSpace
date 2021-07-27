import React, { useState } from "react";
import Header from "../components/header";
import Footermobile from "../components/footer-mobile";

function Login() {
  const [toggleEye, setToggleeye] = useState(false);
  return (
    <div>
      <Header />
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
            <form className="row g-2 needs-validation center-block" noValidate>
              <div className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom">
                <h1 className="sp">Log In</h1>
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
                    Please provide a valid Password.
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <button className="submit-btn btn" type="submit">
                  Log In
                </button>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom form-link  align-items-center justify-content-center">
                <p>
                  <a href="/signup">
                    Dont have an account? <span>Sign Up</span>
                  </a>
                  <br />
                  <a href="/forgot-password">
                    <span>Forgot Your Password?</span>
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

export default Login;
