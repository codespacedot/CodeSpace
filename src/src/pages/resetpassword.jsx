import React, { useState } from "react";
import Header from "../components/header";
import Footermobile from "../components/footer-mobile";
import axios from "axios";
import { sha256 } from "js-sha256";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CommonToast from "../components/commontoast";

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));
function Resetpassword() {
  const [toggleEye, setToggleeye] = useState(false);
  const [toggleEye1, setToggleeye1] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [pswdError, setpswdError] = useState("");
  const [cpassError, setcpassError] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [verificationError, setverificationError] = useState("");
  const [code, setcode] = useState("");
  const [toastVisible, settoastVisible] = useState(false);
  const [toastError, setToastError] = useState("");
  const classes = useStyles();

  //Taking environment variables
  const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;
  //function to check password fields,either matching or not
  const checkPassword = (e) => {
    setcpassword(e);
    if (password !== cpassword) {
      setcpassError("Password does not match");
    } else {
      setcpassError("");
    }
  };

  //function to reset password
  const resetPassword = () => {
    console.log("data", password, cpassword, code);
    if (
      (password === undefined || password === "") &&
      (cpassword === undefined || cpassword === "") &&
      (code === undefined || code === "")
    ) {
      setpswdError("This field is required");
      setcpassError("This field is required");
      setverificationError("This field is required");
    } else if (password === "" && password === undefined) {
      setpswdError("This field is required");
    } else if (cpassword === "" && cpassword === undefined) {
      setcpassError("This field is required");
    } else if (code === "" || code === undefined) {
      setverificationError("This field is required");
    } else {
      setisLoading(true);
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(cpassword);
      const encryptedPassword = hash.hex();
      console.log(password, cpassword, code);
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
          console.log(res.data, res.status);
          if (res.status === 200) {
            setisLoading(false);
            settoastVisible(true);
            setToastError("Password updated.");
            setTimeout(() => {
              settoastVisible(false);
              window.location = "/login";
            }, 3000);
          }
        })
        .catch((error) => {
          setisLoading(false);
          settoastVisible(true);
          setToastError("Invalid verification code.");
          setTimeout(() => {
            settoastVisible(false);
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
                            password.length < 7 && pswdError !== ""
                              ? { borderColor: "#dc3545" }
                              : null ||
                                (password.length > 7 && pswdError === "")
                              ? { borderColor: "#198754" }
                              : null
                          }
                          placeholder="Password"
                          minLength={8}
                          maxLength={12}
                          required
                          onChange={(e) => {
                            if (e.target.value.length > 7) {
                              setpassword(e.target.value);
                              setpswdError("");
                            } else {
                              setpswdError(
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
                            onClick={() => setToggleeye(!toggleEye)}
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
                        style={pswdError !== "" ? { color: "#dc3545" } : null}
                      >
                        {pswdError}
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
                            cpassword.length < 7 && cpassError !== ""
                              ? { borderColor: "#dc3545" }
                              : null ||
                                (cpassword.length > 7 && cpassError === "")
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
                              setcpassError("");
                            } else {
                              setcpassError("Password does not match");
                            }
                          }}
                        />
                        <span class="input-group-text ">
                          {" "}
                          <button
                            class="pass-link"
                            type="button"
                            onClick={() => setToggleeye1(!toggleEye1)}
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
                        style={cpassError !== "" ? { color: "#dc3545" } : null}
                      >
                        {cpassError}
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
                            : null ||
                              (verificationError === "" && code.length === 6)
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
                            setverificationError("");
                            setcode(e.target.value);
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
                        <CommonToast
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
                        <CommonToast
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
          <Footermobile />
        </div>
      )}
    </div>
  );
}

export default Resetpassword;
