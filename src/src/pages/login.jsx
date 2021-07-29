import React, { useState } from "react";
import Header from "../components/header";
import Footermobile from "../components/footer-mobile";
import axios from "axios";
import { sha256 } from "js-sha256";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
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

function Login() {
  const [toggleEye, setToggleeye] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const regEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const classes = useStyles();

  const checkEmail = (e) => {
    setusername(e);
    if (e.match(regEmail)) {
      setusernameError("");
    } else setusernameError("Please enter valid email address");
  };

  const logInUser = () => {
    if (username === "" && password === "") {
      setusernameError("This field is required");
      setpasswordError("This field is required");
    } else if (username === "") {
      setusernameError("This field is required");
    } else if (password === "") {
      setpasswordError("This field is required");
    } else if (username.length > 0 && !username.match(regEmail)) {
      setusernameError("Please enter valid email address");
    } else {
      setisLoading(true);
      setusernameError("");
      setpasswordError("");
      const { REACT_APP_SHA_KEY, REACT_APP_CS_API } = process.env;
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(password);
      const encryptedPassword = hash.hex();
      const dataForm = new formData();
      dataForm.append("username", username);
      dataForm.append("password", encryptedPassword);
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
                setisLoading(false);
                sessionStorage.setItem("USER_PROFILE", userData);
                window.location = "/profile";
              })
              .catch((error) => {});
          }
        })
        .catch((error) => {
          if (error.response.data.detail.ERROR === "Invalid credentials.") {
            setisLoading(false);
            alert("Invalid credentials. Please check username and password");
          } else {
            setisLoading(false);
            alert("Error ! Please try again");
          }
        });
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <LinearProgress
          color="primary"
          className={isLoading ? "d-block" : "d-none"}
        />
      </div>
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
                        : null ||
                          (username.match(regEmail) && username.length > 0)
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
                    style={usernameError !== "" ? { color: "#dc3545" } : null}
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
                          : null ||
                            (password.length > 7 && passwordError === "")
                          ? { borderColor: "#198754" }
                          : null
                      }
                      placeholder="Password"
                      onChange={(e) => {
                        if (e.target.value.length > 7) {
                          setpassword(e.target.value);
                          setpasswordError("");
                        } else {
                          setpasswordError(
                            "Password must be greater than 8 characters"
                          );
                        }
                      }}
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
                  </div>
                  <div
                    style={passwordError !== "" ? { color: "#dc3545" } : null}
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
