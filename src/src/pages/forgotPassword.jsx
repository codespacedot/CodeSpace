import React, { useState } from "react";
import Header from "../components/header";
import FooterMobile from "../components/footerMobile";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/toast";
import { invalidEmail, requiredField, regEmail, noAccount } from "../constants";

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const classes = useStyles();

  //Taking environment variables
  const { REACT_APP_CS_API } = process.env;

  //Function to check and validate email
  const checkEmail = (e) => {
    setUsername(e);
    if (e.match(regEmail)) {
      setUsernameError("");
    } else setUsernameError(invalidEmail);
  };

  //send verification code to registered mail
  const sendEmail = () => {
    if (username === "") {
      setUsernameError(requiredField);
    } else if (username.length > 0 && !username.match(regEmail)) {
      setUsernameError(invalidEmail);
    } else {
      setIsLoading(true);
      axios
        .request({
          url: `${REACT_APP_CS_API}/api/users/password/forgot`,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          data: { email: username },
        })
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            window.location = "/reset-password";
          } else {
            setToastVisible(true);
            setToastMessage(noAccount);
            setTimeout(() => {
              setToastVisible(false);
            }, 2500);
          }
        })
        .catch((_) => {
          setIsLoading(false);
          setToastVisible(true);
          setToastMessage(noAccount);
          setTimeout(() => {
            setToastVisible(false);
          }, 2500);
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
                    <input
                      className="submit-btn btn"
                      type="button"
                      value="Send Verification Code"
                      onClick={sendEmail}
                    />
                  </div>
                  {/* Displaying toast for error */}
                  <div>
                    {toastVisible ? (
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
          <FooterMobile />
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
