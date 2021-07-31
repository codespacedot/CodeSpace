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
  invalidCredentials,
  formError,
  formPasswordError,
} from "../constants";
const formData = require("form-data");

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));

//Login component starts from here..
function Login() {
  const [toggleEye, setToggleEye] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const classes = useStyles();

  //Function to check and validate email
  const checkEmail = (e) => {
    setUsername(e);
    if (e.match(regEmail)) {
      setUsernameError("");
    } else setUsernameError(invalidEmail);
  };

  //Function for Login student
  const logInUser = () => {
    //checking all fields are properly filled or not
    if (username === "" && password === "") {
      setUsernameError(requiredField);
      setPasswordError(requiredField);
    } else if (username === "") {
      setUsernameError(requiredField);
    } else if (password === "") {
      setPasswordError(requiredField);
    } else if (username.length > 0 && !username.match(regEmail)) {
      setUsernameError(invalidEmail);
    } else {
      setIsLoading(true);
      setUsernameError("");
      setPasswordError("");

      //Taking environment variables
      const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;

      //Generating hash key for password field
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(password);
      const encryptedPassword = hash.hex();
      const dataForm = new formData();
      dataForm.append("username", username);
      dataForm.append("password", encryptedPassword);

      //Making axios call for login user
      axios
        .request({
          method: "POST",
          url: `${REACT_APP_CS_API}/api/users/login`,
          data: dataForm,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.setItem("CS_TOKEN", res.data.access_token);
            const userToken = sessionStorage.getItem("CS_TOKEN");
            console.log("token is", userToken);
            axios
              .request({
                method: "GET",
                url: `${REACT_APP_CS_API}/api/users/me`,
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Access-Control-Allow-Origin": "*",
                },
              })
              .then((resUser) => {
                const userData = JSON.stringify(resUser.data);
                setIsLoading(false);
                sessionStorage.setItem("USER_PROFILE", userData);
                window.location = "/profile";
              })
              .catch((_) => {});
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.data.detail.ERROR === invalidCredentials) {
            setToastVisible(true);
            setToastMessage(invalidCredentials);
            setTimeout(() => {
              setToastVisible(false);
            }, 2500);
          } else {
            setToastVisible(true);
            setToastMessage(formError);
            setTimeout(() => {
              setToastVisible(false);
            }, 2500);
          }
        });
    }
  };
  //render of login
  return (
    <div>
      {/* Checking user is logged in or not */}
      {sessionStorage.getItem("CS_TOKEN") !== null ? (
        window.history.back()
      ) : (
        <div>
          {/* Calling Loader after click on login button */}
          <div className={classes.root}>
            <LinearProgress
              color="primary"
              className={isLoading ? "d-block" : "d-none"}
            />
          </div>
          {/* Header component calling here */}
          <Header />
          <section className="form" id="form">
            {/* Body of login form */}
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
                {" "}
                <div className="row justify-content-center disable-select">
                  <div
                    className="col-lg-6 col-md-12"
                    style={{ marginTop: "15%" }}
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
                <form className="row g-2 needs-validation center-block">
                  <div className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom">
                    <h1 className="sp">Log In</h1>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <input
                        type="email"
                        style={
                          usernameError !== ""
                            ? { borderColor: "#dc3545" }
                            : username.match(regEmail) && username.length > 0
                            ? { borderColor: "#198754" }
                            : null
                        }
                        className="form-control"
                        id="validationCustom05"
                        placeholder="Email Address"
                        onChange={(e) => checkEmail(e.target.value)}
                        required
                      />
                      <div
                        style={
                          usernameError !== "" ? { color: "#dc3545" } : null
                        }
                      >
                        {usernameError}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <div className="form-outline ">
                      <div className="input-group mb-2">
                        <input
                          type={!toggleEye ? "password" : "text"}
                          className="form-control"
                          minLength={8}
                          maxLength={12}
                          style={
                            password.length < 7 && passwordError !== ""
                              ? { borderColor: "#dc3545" }
                              : password.length > 7 && passwordError === ""
                              ? { borderColor: "#198754" }
                              : null
                          }
                          placeholder="Password"
                          onChange={(e) => {
                            if (e.target.value.length > 7) {
                              setPassword(e.target.value);
                              setPasswordError("");
                            } else {
                              setPasswordError(formPasswordError);
                            }
                          }}
                          required
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
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                    <input
                      className="submit-btn btn"
                      type="button"
                      value="Log In"
                      onClick={logInUser}
                    />
                  </div>
                  {/* Displaying toast for error */}
                  <div>
                    {toastVisible &&
                    toastMessage === "Error! please try again." ? (
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
                  <div>
                    {toastVisible && toastMessage === invalidCredentials ? (
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
                  <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom form-link  align-items-center justify-content-center">
                    <p>
                      Dont have an account?{" "}
                      <a href="/signup">
                        <span>Sign Up</span>
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
          {/* Calling footer for login screen */}
          <FooterMobile />
        </div>
      )}
    </div>
  );
}

export default Login;
