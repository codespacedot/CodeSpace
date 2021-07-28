import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const userData = sessionStorage.getItem("USER_PROFILE");
  const parseUserData = JSON.parse(userData);
  const userToken = sessionStorage.getItem("CS_TOKEN");
  const { REACT_APP_CS_API } = process.env;

  const deleteAccount = () => {
    setisLoading(true);
    axios
      .delete(`${REACT_APP_CS_API}/api/users/delete`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setisLoading(false);
          window.location = "/login";
        }
      });
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
        <div className="row">
          <h2>Welcome user</h2>
          <div className="col">
            <h3>Full Name: {parseUserData.name}</h3>
          </div>
          <div className="col">
            <h3>Username: {parseUserData.email}</h3>
          </div>
          <div className="col">
            <input
              className="btn btn-danger"
              type="button"
              value="Delete Account"
              onClick={deleteAccount}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
