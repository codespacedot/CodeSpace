import React, { useState } from "react";
import Header from "../components/header";
import FooterMobile from "../components/footerMobile";
import axios from "axios";
import { sha256 } from "js-sha256";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/toast";
import {
  invalidEmail,
  requiredField,
  regEmail,
  formError,
  formPasswordError,
  passwordNotMatches,
  successAccount,
} from "../constants";

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
  const [isLoading, setIsLoading] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
  const [toggleEye1, setToggleEye1] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const classes = useStyles();

  //Validate form and create user
  const signUpUser = () => {
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      setFirstNameError(requiredField);
      setLastNameError(requiredField);
      setEmailError(requiredField);
      setPasswordError(requiredField);
      setConfirmPasswordError(requiredField);
    } else if (firstName === "") {
      setFirstNameError(requiredField);
    } else if (lastName === "") {
      setLastNameError(requiredField);
    } else if (email === "") {
      setEmailError(requiredField);
    } else if (email.length > 0 && !email.match(regEmail)) {
      setEmailError(invalidEmail);
    } else if (password === "") {
      setPasswordError(requiredField);
    } else if (password.length < 8) {
      setPasswordError(formPasswordError);
    } else if (confirmPassword === "") {
      setConfirmPasswordError(requiredField);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(passwordNotMatches);
    } else {
      setIsLoading(true);
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      //Taking environment variables
      const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(confirmPassword);
      const encryptedPassword = hash.hex();

      //Make api call for student registration
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
            setIsLoading(false);
            setToastVisible(true);
            setToastMessage(successAccount);
            setTimeout(() => {
              setToastVisible(false);
              window.location = "/login";
            }, 2500);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setToastVisible(true);
          if (error.response.data.detail.ERROR === "User already exists.") {
            setToastMessage("Account already exists.");
          } else {
            setToastMessage(formError);
          }
          setTimeout(() => {
            setToastVisible(false);
          }, 2500);
        });
    }
  };
  //function to check email is valid or not
  const checkEmail = (e) => {
    setEmail(e);
    if (e.match(regEmail)) {
      setEmailError("");
    } else setEmailError(invalidEmail);
  };

  //function to check password fields,either matching or not
  const checkPassword = (e) => {
    setConfirmPassword(e);
    if (password !== confirmPassword) {
      setConfirmPasswordError(passwordNotMatches);
    } else {
      setConfirmPasswordError("");
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
                          firstName.length < 1 && firstNameError !== ""
                            ? { borderColor: "#dc3545" }
                            : firstName.length > 0
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        placeholder="First Name"
                        required
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          setFirstNameError("");
                        }}
                      />
                      <div
                        style={
                          firstNameError !== "" ? { color: "#dc3545" } : null
                        }
                      >
                        {firstNameError}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-5 col-md-6 bottom ">
                    <div className="form-outline ">
                      <input
                        type="text"
                        style={
                          lastName.length < 1 && lastNameError !== ""
                            ? { borderColor: "#dc3545" }
                            : lastName.length > 0
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Last Name"
                        required
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setLastNameError("");
                        }}
                      />
                      <div
                        style={
                          lastNameError !== "" ? { color: "#dc3545" } : null
                        }
                      >
                        {lastNameError}
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
                            : email.match(regEmail) && email.length > 0
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
                            password.length < 7 && passwordError !== ""
                              ? { borderColor: "#dc3545" }
                              : password.length > 7 && passwordError === ""
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
                              setPasswordError(formPasswordError);
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
                        style={
                          passwordError !== "" ? { color: "#dc3545" } : null
                        }
                      >
                        {passwordError}
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
                            confirmPassword.length < 7 &&
                            confirmPasswordError !== ""
                              ? { borderColor: "#dc3545" }
                              : confirmPassword.length > 7 &&
                                confirmPasswordError === ""
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
                              setConfirmPasswordError(passwordNotMatches);
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
                        style={
                          confirmPasswordError !== ""
                            ? { color: "#dc3545" }
                            : null
                        }
                      >
                        {confirmPasswordError}
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
                  {/* Displaying toast */}
                  <div>
                    {toastVisible && toastMessage === successAccount ? (
                      <div>
                        <Toast
                          open={toastVisible}
                          backgroundColor="#0761d1"
                          type="success"
                          message={toastMessage}
                        />
                      </div>
                    ) : toastVisible &&
                      (toastMessage === "Account already exists." ||
                        toastMessage === formError) ? (
                      <div>
                        <Toast
                          open={toastVisible}
                          backgroundColor="#e00"
                          type="error"
                          message={toastMessage}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-10 col-md-12 bottom form-link  align-items-center justify-content-center">
                    <p>
                      Already have an account?{" "}
                      <a href="/login">
                        <span>Log In</span>
                      </a>
                      <br />
                      <br />
                      By clicking Sign Up, you agree with our
                      <br />
                      <a href="terms.html">
                        <span>Terms of Service</span>
                      </a>{" "}
                      and{" "}
                      <a href="policy.html">
                        <span>Privacy Policy</span>
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Footer component for signup screen */}
          <FooterMobile />
        </div>
      )}
    </div>
  );
}

export default Signup;
