import React, { useState } from "react";
import Header from "../components/header";
import FooterMobile from "../components/footerMobile";
import axios from "axios";
import { sha256 } from "js-sha256";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/toast";

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));
function ResetPassword() {
  const [toggleEye, setToggleEye] = useState(false);
  const [toggleEye1, setToggleEye1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [code, setCode] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastError, setToastError] = useState("");
  const classes = useStyles();

  //Taking environment variables
  const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;
  //function to check password fields,either matching or not
  const checkPassword = (e) => {
    setConfirmPassword(e);
    if (password !== confirmPassword) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  //function to reset password
  const resetPassword = () => {
    if (
      (password === undefined || password === "") &&
      (confirmPassword === undefined || confirmPassword === "") &&
      (code === undefined || code === "")
    ) {
      setPasswordError("This field is required");
      setConfirmPasswordError("This field is required");
      setVerificationError("This field is required");
    } else if (password === "" && password === undefined) {
      setPasswordError("This field is required");
    } else if (confirmPassword === "" && confirmPassword === undefined) {
      setConfirmPasswordError("This field is required");
    } else if (code === "" || code === undefined) {
      setVerificationError("This field is required");
    } else {
      setIsLoading(true);
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(confirmPassword);
      const encryptedPassword = hash.hex();
      axios
        .request({
          url: `${REACT_APP_CS_API}/api/users/password/reset`,
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            new_password: encryptedPassword,
            verification_code: code,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setToastVisible(true);
            setToastError("Password updated.");
            setTimeout(() => {
              setToastVisible(false);
              window.location = "/login";
            }, 3000);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setToastVisible(true);
          setToastError("Invalid verification code.");
          setTimeout(() => {
            setToastVisible(false);
          }, 3000);
        });
    }
  };
  return (
    <div>
      {/* Checking user is logged in or not */}
      {sessionStorage.getItem("CS_TOKEN") !== null ? (
        window.history.back()
      ) : (
        <div>
          {/* Loader after click on sign up button */}
          <div className={classes.root}>
            <LinearProgress
              color="primary"
              className={isLoading ? "d-block" : "d-none"}
            />
          </div>
          <Header />
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
                      <div className="input-group mb-2">
                        <input
                          type={!toggleEye ? "password" : "text"}
                          className="form-control"
                          style={
                            password.length < 7 && passwordError !== ""
                              ? { borderColor: "#dc3545" }
                              : (password.length > 7 && passwordError === "")
                              ? { borderColor: "#198754" }
                              : null
                          }
                          placeholder="Password"
                          minLength={8}
                          maxLength={12}
                          required
                          onChange={(e) => {
                            if (e.target.value.length > 7) {
                              setPassword(e.target.value);
                              setPasswordError("");
                            } else {
                              setPasswordError(
                                "Password must be greater than 8 characters"
                              );
                            }
                          }}
                        />
                        <span class="input-group-text ">
                          {" "}
                          <button
                            class="pass-link"
                            type="button"
                            onClick={() => setToggleEye(!toggleEye)}
                          >
                            <i
                              id="pass-show"
                              class={
                                toggleEye ? "fa fa-eye" : "fa fa-eye-slash"
                              }
                              aria-hidden={toggleEye}
                            ></i>
                          </button>
                        </span>
                      </div>
                      <div
                        style={passwordError !== "" ? { color: "#dc3545" } : null}
                      >
                        {passwordError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <div className="input-group mb-2">
                        <input
                          type={!toggleEye1 ? "password" : "text"}
                          className="form-control"
                          style={
                            confirmPassword.length < 7 && confirmPasswordError !== ""
                              ? { borderColor: "#dc3545" }
                              : (confirmPassword.length > 7 && confirmPasswordError === "")
                              ? { borderColor: "#198754" }
                              : null
                          }
                          placeholder="Confirm Password"
                          minLength={8}
                          maxLength={12}
                          required
                          onChange={(e) => {
                            if (
                              e.target.value.length > 7 &&
                              password === e.target.value
                            ) {
                              checkPassword(e.target.value);
                              setConfirmPasswordError("");
                            } else {
                              setConfirmPasswordError("Password does not match");
                            }
                          }}
                        />
                        <span class="input-group-text ">
                          {" "}
                          <button
                            class="pass-link"
                            type="button"
                            onClick={() => setToggleEye1(!toggleEye1)}
                          >
                            <i
                              id="pass-show"
                              class={
                                toggleEye1 ? "fa fa-eye" : "fa fa-eye-slash"
                              }
                              aria-hidden={toggleEye1}
                            ></i>
                          </button>
                        </span>
                      </div>
                      <div
                        style={confirmPasswordError !== "" ? { color: "#dc3545" } : null}
                      >
                        {confirmPasswordError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <input
                        type="text"
                        className="form-control"
                        style={
                          verificationError !== "" && code.length < 6
                            ? { borderColor: "#dc3545" }
                            : (verificationError === "" && code.length === 6)
                            ? { borderColor: "#198754" }
                            : null
                        }
                        id="validationCustom09"
                        placeholder="Verification Code"
                        required
                        minLength={6}
                        maxLength={6}
                        onChange={(e) => {
                          if (e.target.value.length === 6) {
                            setVerificationError("");
                            setCode(e.target.value);
                          } else {
                          }
                        }}
                      />
                      <div style={{ color: "#dc3545" }}>
                        {verificationError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <input
                      className="submit-btn btn"
                      type="button"
                      value="Reset Password"
                      onClick={resetPassword}
                    />
                  </div>
                  {/* Displaying toast for error */}
                  <div>
                    {toastVisible && toastError === "Password updated." ? (
                      <div>
                        <Toast
                          open={toastVisible}
                          backgroundColor="#0761d1"
                          type="info"
                          message={toastError}
                        />
                      </div>
                    ) : null}
                    {toastVisible &&
                    toastError === "Invalid verification code." ? (
                      <div>
                        <Toast
                          open={toastVisible}
                          backgroundColor="#e00"
                          type="error"
                          message={toastError}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom form-link  align-items-center justify-content-center">
                    <p>
                      Verification code is sent to email address. <br />
                      Please check spam folder too.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* End Section */}
          <FooterMobile />
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
