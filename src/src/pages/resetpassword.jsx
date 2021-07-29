import React, { useState } from "react";

function Resetpassword() {
  const [toggleEye, setToggleeye] = useState(false);
  return (
    <div>
      {/* Checking user is logged in or not */}
      {sessionStorage.getItem("CS_TOKEN") !== null ? (
        window.history.back()
      ) : (
        <div>
          {/*  Section  */}
          <section className="form" id="form">
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
                {" "}
                <div className="row justify-content-center disable-select">
                  <div
                    className="col-lg-6 col-md-12"
                    style={{ marginTop: "10%" }}
                  >
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
                  style={{ marginTop: "10%" }}
                >
                  <div className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom">
                    <h1 className="sp">Reset Password</h1>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <input
                        type="password"
                        className="form-control"
                        id="validationCustom07"
                        placeholder="New Password"
                        required
                      />
                      <div className="invalid-feedback">
                        Passwords Does not match.
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="input-group mb-2" id="show_hide_password">
                      <input
                        type={!toggleEye ? "password" : "text"}
                        className="form-control"
                        id="pass-input"
                        placeholder="Confirm New Password"
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
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom09"
                        placeholder="Verification Code"
                        required
                      />
                      <div className="invalid-feedback">
                        Invalid Verification Code
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <button
                      className="submit-btn btn"
                      type="submit"
                      onclick="passreset();"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom form-link  align-items-center justify-content-center">
                    <p>
                      Verification code is sent to registered Email Address.{" "}
                      <br />
                      If not in Inbox check spam folders too.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* End Section */}
        </div>
      )}
    </div>
  );
}

export default Resetpassword;
