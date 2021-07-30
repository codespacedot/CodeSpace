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

//Signup component starts from here
function Signup() {
  //Maintain all states which are used for sign up form validation
  const [isLoading, setisLoading] = useState(false);
  const [toggleEye, setToggleeye] = useState(false);
  const [toggleEye1, setToggleeye1] = useState(false);
  const [fnameError, setfnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [pswdError, setpswdError] = useState("");
  const [cpassError, setcpassError] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [toastVisible, settoastVisible] = useState(false);
  const [toastError, setToastError] = useState("");
  const regEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  const classes = useStyles();

  //To validate form and create user
  const signUpUser = () => {
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === "" &&
      cpassword === ""
    ) {
      setfnameError("This field is required");
      setlnameError("This field is required");
      setemailError("This field is required");
      setpswdError("This field is required");
      setcpassError("This field is required");
    } else if (firstName === "") {
      setfnameError("This field is required");
    } else if (lastName === "") {
      setlnameError("This field is required");
    } else if (email === "") {
      setemailError("This field is required");
    } else if (email.length > 0 && !email.match(regEmail)) {
      setemailError("Please enter valid email address");
    } else if (password === "") {
      setpswdError("This field is required");
    } else if (password.length < 8) {
      setpswdError("Password must be greater than 8 characters");
    } else if (cpassword === "") {
      setcpassError("This field is required");
    } else if (cpassword !== password) {
      setcpassError("Password does not match");
    } else {
      setisLoading(true);
      setfnameError("");
      setlnameError("");
      setemailError("");
      setpswdError("");
      setcpassError("");

      //Taking environment variables
      const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(cpassword);
      const encryptedPassword = hash.hex();

      //To make api call for student registration
      axios
        .request({
          method: "POST",
          url: `${REACT_APP_CS_API}/api/users/create`,
          data: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: encryptedPassword,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setisLoading(false);
            settoastVisible(true);
            setToastError("Account created successfully! Redirecting ...");
            setTimeout(() => {
              settoastVisible(false);
              window.location = "/login";
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.data.detail.ERROR === "User already exists.") {
            setisLoading(false);
            settoastVisible(true);
            setToastError("Email address already registered.");
            setTimeout(() => {
              settoastVisible(false);
            }, 3000);
          } else {
            setisLoading(false);
            setToastError("Error! Please try again.");
            setTimeout(() => {
              settoastVisible(false);
            }, 3000);
          }
        });
    }
  };
  //function to check email is valid or not
  const checkEmail = (e) => {
    setEmail(e);
    if (e.match(regEmail)) {
      setemailError("");
    } else setemailError("Please enter valid email address");
  };

  //function to check password fields,either matching or not
  const checkPassword = (e) => {
    setcpassword(e);
    if (password !== cpassword) {
      setcpassError("Password does not match");
    } else {
      setcpassError("");
    }
  };

  //render of signup
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

          {/* Header component calling */}
          <Header />
          <section className="form" id="form">
            {/* Main sign up form body */}
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
                {" "}
                <div className="row justify-content-center disable-select">
                  <div
                    className="col-lg-6 col-md-12"
                    style={{ marginTop: "7%" }}
                  >
                    <h1 className="sptext">Connect.</h1>
                    <h1 className="sptext" style={{ color: "#0761d1" }}>
                      Code.
                    </h1>
                    <h1 className="sptext">Execute.</h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                <form className="row g-2 needs-validation">
                  <div className="justify-content-center heading ">
                    <div className="col-12 col-lg-10 col-md-12 bottom ">
                      <h1 className="sp">Sign Up</h1>
                    </div>
                  </div>
                  <div className=" col-6 col-lg-5 col-md-6 bottom ">
                    <div className="form-outline">
                      <input
                        type="text"
                        style={
                          firstName.length < 1 && fnameError !== ""
                            ? { borderColor: "#dc3545" }
                            : null || firstName.length > 0
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        placeholder="First Name"
                        required
                        onChange={(e) => {
                          setfName(e.target.value);
                          setfnameError("");
                        }}
                      />
                      <div
                        style={fnameError !== "" ? { color: "#dc3545" } : null}
                      >
                        {fnameError}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-5 col-md-6 bottom ">
                    <div className="form-outline ">
                      <input
                        type="text"
                        style={
                          lastName.length < 1 && lnameError !== ""
                            ? { borderColor: "#dc3545" }
                            : null || lastName.length > 0
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Last Name"
                        required
                        onChange={(e) => {
                          setlName(e.target.value);
                          setlnameError("");
                        }}
                      />
                      <div
                        style={lnameError !== "" ? { color: "#dc3545" } : null}
                      >
                        {lnameError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-10 col-md-12 bottom">
                    <div className="form-outline ">
                      <input
                        type="email"
                        style={
                          emailError !== ""
                            ? { borderColor: "#dc3545" }
                            : null ||
                              (email.match(regEmail) && email.length > 0)
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        placeholder="Email Address"
                        required
                        onChange={(e) => checkEmail(e.target.value)}
                      />
                      <div
                        style={emailError !== "" ? { color: "#dc3545" } : null}
                      >
                        {emailError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-10 col-md-12 bottom">
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
                  <div className="col-12 col-lg-10 col-md-12 bottom">
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
                  <div className="col-12 col-lg-10 col-md-12 bottom">
                    <input
                      className="submit-btn btn"
                      type="button"
                      value="Sign Up"
                      onClick={signUpUser}
                    />
                  </div>
                  {/* Displaying toast for error */}
                  <div>
                    {toastVisible &&
                    toastError ===
                      "Account created successfully! Redirecting ..." ? (
                      <div>
                        <CommonToast
                          open={toastVisible}
                          backgroundColor="#0761d1"
                          type="info"
                          message={toastError}
                        />
                      </div>
                    ) : toastVisible &&
                      toastError === "Email address already registered." ? (
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

          {/* Footer component for signup screen */}
          <Footermobile />
        </div>
      )}
    </div>
  );
}

export default Signup;
